const { StatusCodes } = require("http-status-codes");
const roleService = require("../services/roleService");
const { errorResponse } = require("../utils/response");

const managerMiddleware = async (req, res, next) => {
    try {
        const role_id = await roleService.findByUserAndClub(req.club_id, req.user.id);
        if (role_id == 1) {
            return errorResponse(res, StatusCodes.PROXY_AUTHENTICATION_REQUIRED, "Bạn không có quyền này.");
        }
        next();
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = managerMiddleware;