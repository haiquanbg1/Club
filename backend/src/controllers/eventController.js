const { StatusCodes } = require("http-status-codes");
const eventService = require("../services/conversationService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { club_id, name, description, start_time } = req.body;

    try {
        await eventService.create({
            club_id,
            name,
            description,
            start_time
        });

        return successResponse(res, StatusCodes.CREATED, "Tạo hoạt động thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const update = async (req, res) => {
    const { event_id, name, description, start_time } = req.body;

    const updateClause = Object.assign(
        {},
        name && { name },
        description && { description },
        start_time && { start_time }
    );

    try {
        await eventService.update(event_id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

module.exports = {
    create,
    update
}