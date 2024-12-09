const { StatusCodes } = require("http-status-codes");
const directMessageService = require("../services/directMessageService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { message, message_id } = req.body;
    const sender_id = req.user.id; // Lấy ID người gửi từ middleware xác thực
    const { friend_id } = req.params; // Lấy ID người nhận từ URL
    console.log('id:', message_id);

    try {
        const directMessage = await directMessageService.create({
            sender_id,
            receiver_id: friend_id,
            message,
            id: message_id
        });

        return successResponse(res, StatusCodes.CREATED, `Tạo tin nhắn 1-1 thành công.`, directMessage);
    } catch (error) {
        console.log(error);

        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const drop = async (req, res) => {
    const { message_id } = req.body;
    const id = message_id;
    try {
        await directMessageService.drop(
            id
        );

        return successResponse(res, StatusCodes.OK, `Đã xoá tin nhắn.`);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const getOldMessages = async (req, res) => {
    const user_id = req.user.id; // Lấy ID người gửi từ middleware xác thực
    const { friend_id } = req.params; // Lấy ID người nhận từ URL
    const { offset } = req.query;

    const offsetValue = isNaN(parseInt(offset)) ? 0 : parseInt(offset);

    try {
        const directMessages = await directMessageService.getOldMessages(
            user_id,
            friend_id,
            offsetValue
        );

        // xử lý thời gian
        const data = {

        }

        return successResponse(res, StatusCodes.OK, 'Get Old Mess success', directMessages);

    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const reactChange = async (req, res) => {
    const { react, message_id } = req.body;

    try {
        const message = await directMessageService.reactChange(
            message_id,
            react
        );

        return successResponse(res, StatusCodes.OK, 'React change success', message);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const changeStatus = async (req, res) => {
    const { status, message_id } = req.body;

    try {
        const message = await directMessageService.changeStatus(
            message_id,
            status
        );

        return successResponse(res, StatusCodes.OK, 'Change status success', message);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
};

module.exports = {
    create,
    drop,
    getOldMessages,
    reactChange,
    changeStatus
}