const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const otpService = require("../services/otpService");
const bcrypt = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");
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

        return successResponse(res, StatusCodes.OK, "Đăng nhập thành công", {
            user: {
                username: user.username,
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

        return successResponse(res, StatusCodes.CREATED, "Đăng ký thành công", {
            username
        });
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

module.exports = {
    login,
    register,
    logout,
    sendOTP,
    verifyOTP
}