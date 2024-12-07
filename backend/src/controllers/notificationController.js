const { StatusCodes } = require("http-status-codes");
const notificationService = require("../services/notificationService");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
    const { club_id, title, description } = req.body;

    try {
        await notificationService.create({
            club_id,
            title,
            description
        });

        return successResponse(res, StatusCodes.CREATED, "Đã tạo thông báo.");
    } catch (error) {
        console.log(error.message)
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const findAllByClub = async (req, res) => {
    const { club_id } = req.params;

    try {
        const notifications = await notificationService.findAll(club_id);

        const data = [];

        for (let i = 0; i < notifications.length; i++) {
            data.push({
                id: notifications[i].id,
                title: notifications[i].title,
                description: notifications[i].description,
                status: notifications[i].status
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const drop = async (req, res) => {
    const { notification_id } = req.body;

    try {
        await notificationService.drop(notification_id);

        return successResponse(res, StatusCodes.OK, "Đã xoá thông báo.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const updateStatus = async (req, res) => {
    const { notification_id } = req.body;

    try {
        await notificationService.update(notification_id, {
            status: 1
        });

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
    findAllByClub,
    drop,
    updateStatus
}