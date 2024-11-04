const { StatusCodes } = require("http-status-codes");
const conversationService = require("../services/conversationService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

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

const update = async (req, res) => {
    const { conversation_id, name } = req.body;

    try {
        await conversationService.update(
            conversation_id,
            { name }
        );

        return successResponse(res, StatusCodes.OK, `Tên đoạn chat đã được đổi thành ${name}`);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const drop = async (req, res) => {
    const { conversation_id } = req.body;
    try {
        await conversationService.drop(
            conversation_id
        );

        return successResponse(res, StatusCodes.OK, `Đã xoá đoạn chat.`);
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
        const conversations = await conversationService.findAllForClub(club_id);

        const data = [];

        for (let i = 0; i < conversations.length; i++) {
            data.push({
                conversation_id: conversations[i].id,
                name: conversations[i].name
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

const findAllUser = async (req, res) => {
    const { conversation_id } = req.params;

    try {
        const participants = await conversationService.findAllUser(conversation_id);

        const data = [];

        for (let i = 0; i < participants.length; i++) {
            const image = await cloudinary.getImage("Avatar", participants[i].participant.avatar);

            data.push({
                user_id: participants[i].participant.id,
                display_name: participants[i].participant.display_name,
                avatar: image
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    update,
    drop,
    findAllInClub,
    findAllUser
}