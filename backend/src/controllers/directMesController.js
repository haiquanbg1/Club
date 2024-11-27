const { StatusCodes } = require("http-status-codes");
const directMessageService = require("../services/directMessageService");
const { successResponse, errorResponse } = require("../utils/response");
const cloudinary = require("../utils/cloudinary");

const create = async (req, res) => {
    const { message } = req.body;
    const sender_id = req.user.id; // Lấy ID người gửi từ middleware xác thực
    const { friend_id } = req.params; // Lấy ID người nhận từ URL

    console.log(req.body)

    try {
        const directMessage = await directMessageService.create({
            sender_id,
            receiver_id: friend_id,
            message
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
    const { message_id } = req.params;
    try {
        await directMessageService.drop(
            message_id
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
        )
        return successResponse(res, StatusCodes.OK, 'Get Old Mess success', directMessages);

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
    drop,
    getOldMessages
}