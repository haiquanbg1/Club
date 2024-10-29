const { StatusCodes } = require("http-status-codes");
const conversationService = require("../services/conversationService");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
    const { club_id, name } = req.body;

    try {
        const conversation = await conversationService.create({
            club_id,
            name
        });

        return successResponse(res, StatusCodes.CREATED, `Tạo đoạn chat ${name} thành công.`, {
            club_id,
            name
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

// const update = async

module.exports = {
    create
}