const { StatusCodes } = require("http-status-codes");
const reactService = require("../services/reactService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { conversation_id, content } = req.body;
    const user = req.user;

    try {
        await messageService.create({
            conversation_id,
            sender_id: user.id,
            content
        });

        return successResponse(res, StatusCodes.CREATED, "Đã tạo tin nhắn.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const findAllByConversation = async (req, res) => {
    const { conversation_id } = req.params;
    const offset = parseInt(req.query.offset) 
    const limit = 10;

    try {
        const messages = await messageService.findAll(conversation_id, limit, offset);

        const data = [];

        for (let i = 0; i < messages.length; i++) {
            const image = cloudinary.getImage("Avatar", messages[i].sender.avatar);

            data.push({
                id: messages[i].id,
                content: messages[i].content,
                react: messages[i].react,
                status: messages[i].status,
                user_id: messages[i].sender_id,
                display_name: messages[i].sender.display_name,
                createdAt: messages[i].createdAt,
                avatar: image
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
    const { message_id } = req.body;

    try {
        await messageService.drop(message_id);

        return successResponse(res, StatusCodes.OK, "Đã xoá tin nhắn.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const update = async () => {

}

module.exports = {
    create,
    findAllByConversation,
    drop,
    update
}