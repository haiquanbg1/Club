const { StatusCodes } = require("http-status-codes");
const roleService = require("../services/roleService");
const { successResponse, errorResponse } = require("../utils/response");

const addManager = async (req, res) => {
    const { user_id, club_id } = req.body;

    try {
        await roleService.shareManager(club_id, user_id);

        return successResponse(res, StatusCodes.CREATED, "Thêm quyền quản trị thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = {
    addManager
}