const { StatusCodes } = require("http-status-codes");
const eventService = require("../services/eventService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");
const formatDate = require("../utils/formatDate");

const create = async (req, res) => {
    const { club_id, name, description, start_time } = req.body;
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
            user_id: user.id,
            status: 'accepted'
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
    const event_id = req.query?.event_id;

    try {
        const events = await eventService.findAllForClub(club_id, event_id);

        const data = [];

        for (let i = 0; i < events.length; i++) {
            data.push({
                event_id: events[i].id,
                name: events[i].name,
                description: events[i].description,
                start_time: formatDate(events[i].start_time),
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

const findEventByStatus = async (req, res) => {
    const { club_id, status } = req.params;
    const user = req.user;

    try {
        const data = [];

        if (status == "joined") {
            const events = await eventService.findEventUserJoined(user.id, club_id);

            for (let i = 0; i < events.length; i++) {
                data.push({
                    event_id: events[i].event.id,
                    name: events[i].event.name,
                    description: events[i].event.description,
                    start_time: formatDate(events[i].event.start_time),
                });
            }
        } else if (status == "unjoined") {
            const eventsUnJoined = await eventService.findEventUserUnJoined(user.id, club_id);
            const eventsPending = await eventService.findEventUserPending(user.id, club_id);

            for (let i = 0; i < eventsUnJoined.length; i++) {
                data.push({
                    event_id: eventsUnJoined[i].event.id,
                    name: eventsUnJoined[i].event.name,
                    description: eventsUnJoined[i].event.description,
                    start_time: formatDate(eventsUnJoined[i].event.start_time),
                    status: "unjoined"
                });
            }

            for (let i = 0; i < eventsPending.length; i++) {
                data.push({
                    event_id: eventsPending[i].id,
                    name: eventsPending[i].name,
                    description: eventsPending[i].description,
                    start_time: formatDate(eventsPending[i].start_time),
                    status: "pending"
                });
            }
        } else {
            return errorResponse(res, StatusCodes.BAD_GATEWAY, "Không tìm thấy.");
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
    const { event_id, status } = req.params;
    const { text } = req.query;

    try {
        const participants = await eventService.findAllUser(event_id, text, status);

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
            status: 'accepted'
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
        await eventService.outEvent(event_id, user_id);

        return successResponse(res, StatusCodes.OK, "Đã xoá người dùng khỏi hoạt động.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const askToJoin = async (req, res) => {
    const user = req.user;
    const { event_id } = req.body;

    try {
        await eventService.askToJoin(user.id, event_id);

        return successResponse(res, StatusCodes.CREATED, "Đã đăng ký tham gia thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        )
    }
}

const acceptPending = async (req, res) => {
    const user = req.user;
    const { event_id } = req.body;

    try {
        await eventService.acceptPending(user.id, event_id);

        return successResponse(res, StatusCodes.CREATED, "Đã đồng ý tham gia.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        )
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
    drop,
    findEventByStatus,
    askToJoin,
    acceptPending
}