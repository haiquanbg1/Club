const { StatusCodes } = require("http-status-codes");
const conversationService = require("../services/conversationService");
const userService = require("../services/userService");
const roleService = require("../services/roleService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { club_id, name } = req.body;
    const user = req.user;

    try {
        const conversation = await conversationService.create({
            club_id,
            name
        });

        await conversationService.addParticipant({
            conversation_id: conversation.id,
            user_id: user.id,
            display_name: user.display_name
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
    const user = req.user;

    try {
        const conversations = await conversationService.findAllForUser(user.id, club_id);

        const data = [];

        for (let i = 0; i < conversations.length; i++) {
            data.push({
                conversation_id: conversations[i].conversation.id,
                name: conversations[i].conversation.name
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
    const { conversation_id } = req.params;
    const text = req.query?.text || "";

    try {
        const participants = await conversationService.findAllUser(conversation_id, text);

        const conversation = await conversationService.findOne({ id: conversation_id });
        const manager = await roleService.findAll({
            role_id: 2,
            club_id: conversation.club_id
        });
        const users = manager.map((user) => {
            return user.user_id
        });

        const data = [];

        for (let i = 0; i < participants.length; i++) {
            const image = await cloudinary.getImage("Avatar", participants[i].user.avatar);

            data.push({
                user_id: participants[i].user.id,
                display_name: participants[i].display_name,
                avatar: image,
                role: users.includes(participants[i].user.id) ? 2 : 1
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const addParticipant = async (req, res) => {
    const { conversation_id, user_id } = req.body;

    try {
        const isInConversation = await conversationService.isInConversation(user_id, conversation_id);
        if (isInConversation) {
            return errorResponse(res, StatusCodes.CONFLICT, "Người này đã trong đoạn chat.");
        }

        const user = await userService.findOne({
            id: user_id
        });

        await conversationService.addParticipant({
            conversation_id,
            user_id,
            display_name: user.display_name
        });

        return successResponse(res, StatusCodes.CREATED, "Thêm thành viên thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const outConversation = async (req, res) => {
    const user = req.user;
    const { conversation_id } = req.body;

    try {
        await conversationService.outConversation(conversation_id, user.id);

        return successResponse(res, StatusCodes.OK, "Rời nhóm chat thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const kick = async (req, res) => {
    const { conversation_id, user_id } = req.body;

    try {
        await conversationService.outConversation(conversation_id, user_id);

        return successResponse(res, StatusCodes.OK, "Đã xoá người dùng khỏi nhóm chat.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    update,
    drop,
    findAllInClub,
    findAllUserWithKey,
    addParticipant,
    outConversation,
    kick
}