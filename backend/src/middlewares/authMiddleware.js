const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/response");
const { decodeAccessToken, decodeRefreshToken, createAccessToken } = require("../utils/jwt");
const userService = require("../services/userService");
const ms = require("ms");

const logout = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isLogin");
}

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    try {
        const decodedAccessToken = decodeAccessToken(accessToken);

        req.user = await userService.findOne({
            id: decodedAccessToken.userId
        });
        next();
    } catch (error) {
        // Trường hợp access token hết hạn
        if (error?.message?.includes("jwt expired") || error?.message?.includes("jwt malformed")) {
            // Kiểm tra xem refresh token có tồn tại không
            if (!refreshToken) {
                logout(res);

                return errorResponse(
                    res,
                    StatusCodes.UNAUTHORIZED,
                    "Refresh token not found. Please log in again."
                );
            }

            try {
                // Giải mã và xác thực refresh token
                const decodedRefreshToken = decodeRefreshToken(refreshToken);

                // Kiểm tra xem refresh token có hợp lệ không (thông qua userId hoặc bất kỳ thông tin nào trong token)
                req.user = await userService.findOne({ id: decodedRefreshToken.userId });

                if (!req.user) {
                    logout(res);

                    return errorResponse(
                        res,
                        StatusCodes.UNAUTHORIZED,
                        "Refresh token is invalid. Please log in again."
                    );
                }

                // Nếu refresh token hợp lệ, cấp lại access token mới
                const newAccessToken = createAccessToken({
                    userId: req.user.id
                }); // Hàm tự tạo access token mới
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    maxAge: ms("7 days"),
                });

                // Tiếp tục với yêu cầu hiện tại
                next();
            } catch (refreshTokenError) {
                console.log("Error from refreshToken validation: ", refreshTokenError);

                logout(res);
                // Trường hợp refresh token hết hạn hoặc không hợp lệ
                return errorResponse(
                    res,
                    StatusCodes.UNAUTHORIZED,
                    "Refresh token expired. Please log in again."
                );
            }
        } else {
            // Trường hợp lỗi khác, không phải là lỗi hết hạn token
            console.log(error);

            logout(res);

            return errorResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                "Unauthorized! Please log in again."
            );
        }
    }
};

module.exports = authMiddleware;
