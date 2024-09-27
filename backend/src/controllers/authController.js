const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const User = require("../services/userService");
const bcrypt = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");
const ms = require("ms");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
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
    const { username, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
        const userExist = await User.findOne({ username });
        if (userExist) {
            return errorResponse(res, StatusCodes.CONFLICT, "Email đã tồn tại");
        }
        const user = await User.create({
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
        return successResponse(res, StatusCodes.OK, "Đăng xuất thành công");
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
    logout
}