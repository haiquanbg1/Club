const { StatusCodes } = require("http-status-codes");
const eventService = require("../services/eventService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { club_id, name, description, start_time } = req.body;
    console.log(req.body)
    const user = req.user;

    try {
        const event = await eventService.create({
            club_id,
            name,
            description,
            start_time
        });

        await eventService.addParticipant({
            event_id: event.id,
            user_id: user.id
        });

        return successResponse(res, StatusCodes.CREATED, "Tạo hoạt động thành công.");
    } catch (error) {
        console.log(error);

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

const drop = async (req, res) => {
    const { event_id } = req.body;
    try {
        await eventService.drop(
            event_id
        );

        return successResponse(res, StatusCodes.OK, `Đã xoá hoạt động.`);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const findAllInClub = async (req, res) => {
    const { club_id } = req.params;

    try {
        const events = await eventService.findAllForClub(club_id);

        const data = [];

        for (let i = 0; i < events.length; i++) {
            data.push({
                event_id: events[i].id,
                name: events[i].name
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

const findAllUserWithKey = async (req, res) => {
    const { event_id } = req.params;
    const { text } = req.query;

    try {
        const participants = await eventService.findAllUser(event_id, text);

        const data = [];

        for (let i = 0; i < participants.length; i++) {
            const image = await cloudinary.getImage("Avatar", participants[i].user.avatar);

            data.push({
                user_id: participants[i].user.id,
                display_name: participants[i].user.display_name,
                avatar: image
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const addParticipant = async (req, res) => {
    const { event_id, user_id } = req.body;

    try {
        await eventService.addParticipant({
            event_id,
            user_id,
            display_name: user.display_name
        });

        return successResponse(res, StatusCodes.CREATED, "Thêm thành viên thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const outEvent = async (req, res) => {
    const user = req.user;
    const { event_id } = req.body;

    try {
        await eventService.outEvent(event_id, user.id);

        return successResponse(res, StatusCodes.OK, "Rời hoạt động thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const kick = async (req, res) => {
    const { event_id, user_id } = req.body;

    try {
        await eventService.outevent(event_id, user_id);

        return successResponse(res, StatusCodes.OK, "Đã xoá người dùng khỏi hoạt động.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    update,
    kick,
    outEvent,
    findAllInClub,
    findAllUserWithKey,
    addParticipant,
    drop
}