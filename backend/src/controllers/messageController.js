const { StatusCodes } = require("http-status-codes");
const messageService = require("../services/messageService");
const reactService = require("../services/reactService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { conversation_id, content, id } = req.body;
    const user = req.user;

    try {
        await messageService.create({
            conversation_id,
            sender_id: user.id,
            content,
            id
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
// có thể lắng nghe và drop hoặc change trạng thái của react ở đây luôn
const createReact = async (req, res) => {
    const { message_id, react, user_id, id } = req.body;
    console.log('body:', req.body);

    try {
        const reactExist = await reactService.findOne(message_id, user_id);
        // console.log('reactExist: ', reactExist);
        if (reactExist) {
            if (reactExist.react == react) {
                await reactService.drop(reactExist.id);
                console.log('drop success');
                return successResponse(res, StatusCodes.OK, "Đã xoá phản ứng.");
            } else {
                await reactService.drop(reactExist.id);
                // return successResponse(res, StatusCodes.OK, "Đã thay đổi phản ứng.");
            }
        }
        await reactService.create({
            message_id,
            react,
            user_id,
            id
        });
        console.log('create success');
        return successResponse(res, StatusCodes.CREATED, "Đã tạo phản ứng.");
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
    const user = req.user;
    try {
        const messages = await messageService.findAll(conversation_id, user.id, limit, offset);

        const data = [];

        for (let i = 0; i < messages.length; i++) {
            // const image = cloudinary.getImage("Avatar", messages[i].sender.avatar);
            const image = await cloudinary.getImage("Avatar", messages[i].sender.avatar);

            data.push({
                id: messages[i].id,
                content: messages[i].content,
                react: messages[i].react,
                status: messages[i].status,
                sender_id: messages[i].sender_id,
                display_name: messages[i].sender.display_name,
                createdAt: messages[i].createdAt,
                sender: {
                    avatar: image,
                    display_name: messages[i].sender.display_name
                }
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

const findAllReactInMessage = async (req, res) => {
    const { message_id } = req.query;
    try {
        const reacts = await reactService.findAllReactInMessage(message_id);
        const data = [];

        for (let i = 0; i < reacts.length; i++) {
            const image = await cloudinary.getImage("Avatar", reacts[i].sender.avatar);
            data.push({
                id: reacts[i].id,
                react: reacts[i].react,
                user_id: reacts[i].user_id,
                message_id: message_id,
                sender: {
                    avatar: image,
                    display_name: reacts[i].sender.display_name
                }
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
    // bên này nhận lỗi
    console.log(message_id);
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

const changeStatus = async (req, res) => {
    const { message_id, status } = req.body;

    try {
        await messageService.changeStatus(message_id, status);

        return successResponse(res, StatusCodes.OK, "Đã thay đổi trạng thái tin nhắn.");
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
    findAllByConversation,
    drop,
    changeStatus,
    findAllReactInMessage,
    createReact
}