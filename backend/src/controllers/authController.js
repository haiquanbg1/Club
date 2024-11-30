const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const otpService = require("../services/otpService");
const bcrypt = require("bcryptjs");
const { createAccessToken, createRefreshToken, decodeRefreshToken } = require("../utils/jwt");
const { uploadImage, getImage, deleteImage } = require("../utils/cloudinary");
const ms = require("ms");
const otpGenerator = require("otp-generator");
const mail = require("../utils/mail");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userService.findOne({ username });
        if (!user) {
            return errorResponse(res, StatusCodes.NOT_FOUND, "Email không tồn tại");
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return errorResponse(
                res,
                StatusCodes.BAD_REQUEST,
                "Mật khẩu không chính xác"
            );
        }

        const accessToken = createAccessToken({ userId: user.id });
        const refreshToken = createRefreshToken({ userId: user.id });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: false,
            // sameSite: "none",
            maxAge: ms("7 days"),
        });
        res.cookie("isLogin", true, {
            maxAge: ms("7 days"),
        });

        const avatar = await getImage('Avatar', user.avatar);
        return successResponse(res, StatusCodes.OK, "Đăng nhập thành công", {
            user: {
                display_name: user.display_name,
                username: user.username,
                avatar,
                id: user.id
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const register = async (req, res) => {
    const { username, password, birthday, gender, display_name } = req.body;

    const user = await userService.findOne({ username });
    if (user) {
        return errorResponse(res, StatusCodes.NOT_FOUND, "Email đã tồn tại.");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
        const user = await userService.create({
            birthday,
            gender,
            display_name,
            username,
            password: hashPassword,
        });


        return successResponse(res, StatusCodes.CREATED, "Đăng ký thành công");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.clearCookie("isLogin");
        return successResponse(res, StatusCodes.OK, "Đăng xuất thành công");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const sendOTP = async (req, res) => {
    const { username } = req.body;

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true
    });

    try {
        const userExist = await userService.findOne({ username });
        if (userExist) {
            return errorResponse(res, StatusCodes.CONFLICT, "Email đã tồn tại");
        }

        await mail.sendVerificationEmail(username, otp);

        const expire = new Date();
        expire.setMinutes(expire.getMinutes() + 5);

        await otpService.create({
            email: username,
            otp: otp,
            expire
        });

        return successResponse(res, StatusCodes.OK, "Gửi thành công otp.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const verifyOTP = async (req, res) => {
    const { username, otp } = req.body;
    const time = new Date();

    try {
        const otpEx = await otpService.findOne({
            email: username
        });

        if (otpEx.expire < time) {
            return errorResponse(
                res,
                StatusCodes.CONFLICT,
                "OTP đã hết hạn."
            );
        };

        if (otpEx.otp != otp) {
            return errorResponse(
                res,
                StatusCodes.CONFLICT,
                "OTP không đúng."
            );
        }

        return successResponse(res, StatusCodes.OK, "Xác thực OTP thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const verifyCapcha = async (req, res) => {
    const { "cf-turnstile-response": token } = req.body;
    console.log(token)
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    const verificationUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify`;
    try {
        // Gửi yêu cầu đến API của Cloudflare
        const response = await fetch(verificationUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = await response.json(); // Phân tích phản hồi từ API

        if (data.success) {
            // Nếu xác thực thành công
            return res.json({ success: true, message: 'Captcha verified successfully.' });
        } else {
            // Nếu xác thực không thành công
            return res.status(400).json({ success: false, errorCodes: data['error-codes'], messages: data.messages });
        }
    } catch (error) {
        console.error("Error during verification:", error);
        return res.status(500).json({ success: false, message: 'Server error during verification.' });
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshTokenFromCookie = req.cookies?.refreshToken;

        const decodedRefreshToken = decodeRefreshToken(refreshTokenFromCookie);
        if (!decodedRefreshToken) {
            return errorResponse(res, StatusCodes.UNAUTHORIZED, "Invalid token");
        }

        const newAccessToken = createAccessToken({
            userId: decodedRefreshToken.userId,
        });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: ms("7 days"),
        });

        return successResponse(res, StatusCodes.OK, "Refresh token thành công", {
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.log(error)
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

module.exports = {
    login,
    register,
    logout,
    sendOTP,
    verifyOTP,
    verifyCapcha,
    refreshToken
}