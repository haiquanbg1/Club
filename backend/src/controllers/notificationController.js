const { StatusCodes } = require("http-status-codes");
const notificationService = require("../services/notificationService");
const memberService = require("../services/memberService");
const { successResponse, errorResponse } = require("../utils/response");
const formatDate = require("../utils/formatDate");

const create = async (req, res) => {
    const { club_id, title, description } = req.body;

    try {
        const notification = await notificationService.create({
            club_id,
            title,
            description
        });

        const users = await memberService.findAll(club_id);
        users.forEach((user) => {
            notificationService.addNotificationForUser(
                user.user.id,
                notification.id
            );
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

const findOne = async (req, res) => {
    const { notification_id } = req.params;
    const user = req.user;

    try {
        // lấy ra 1 noti
        const notification = await notificationService.findOne({
            id: notification_id
        });

        // cập nhật đã xem
        await notificationService.updateSeen(notification_id, user.id);

        return successResponse(res, StatusCodes.OK, "Thành công.", {
            title: notification.title,
            description: notification.description,
            createdAt: formatDate(notification.createdAt)
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const findAllByClub = async (req, res) => {
    const { club_id } = req.params;
    const user = req.user;
    const { page } = req.query;
    try {
        const notifications = await notificationService.findAll(club_id, user.id, page);

        const data = [];

        for (let i = 0; i < notifications.length; i++) {
            data.push({
                id: notifications[i].notification.id,
                title: notifications[i].notification.title,
                description: notifications[i].notification.description,
                status: 1 ? 0 : notifications[i].readAt,
                createdAt: formatDate(notifications[i].notification.createdAt)
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        console.log(error)
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

module.exports = {
    create,
    findAllByClub,
    drop,
    findOne
}