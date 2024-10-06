const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/response");

const adminMiddleware = async (req, res, next) => {
    const role_admin = req.user.admin_system;

    try {
        if (role_admin == 1) {
            return errorResponse(res, StatusCodes.PROXY_AUTHENTICATION_REQUIRED, "Bạn không có quyền này.");
        }
        next();
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = adminMiddleware;