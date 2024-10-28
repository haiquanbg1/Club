const friendService = require("../services/friendService");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../utils/cloudinary");

const addFriend = async (req, res) => {
    const { user_id } = req.body;
    const user = req.user;

    try {
        const is_sent = await friendService.findOne(user.id, user_id, 'pending')

        if (is_sent[0]) {
            return errorResponse(res, StatusCodes.CONFLICT, "Bạn đã gửi yêu cầu cho người này rồi.")
        }

        const is_pending = await friendService.findOne(user_id, user.id, 'pending');

        if (is_pending[0]) {
            return errorResponse(res, StatusCodes.CONFLICT, "Người dùng đã gửi yêu cầu cho bạn, vui lòng kiểm tra danh sách.");
        }

        const friend = await userService.findOne({
            id: user_id
        });

        await friendService.create({
            user_id: user.id,
            friend_id: user_id,
            display_name: friend.display_name,
            status: 'pending'
        });

        return successResponse(res, StatusCodes.CREATED, "Gửi kết bạn thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const acceptFriend = async (req, res) => {
    const { user_id, display_name } = req.body;
    const user = req.user;

    try {
        await friendService.update(user_id, user.id, {
            status: 'accepted'
        });
        await friendService.create({
            user_id: user.id,
            friend_id: user_id,
            display_name,
            status: 'accepted'
        });
        return successResponse(res, StatusCodes.OK, "Hai người đã thành bạn bè.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const getAllPending = async (req, res) => {
    const user = req.user;

    try {
        const friends = await friendService.findAllPending(user.id);

        const data = await friends.map(async friend => {
            const image = await cloudinary.getImage("Avatar", friend.user.avatar);

            return {
                user_id: friend.user_id,
                friend_id: friend.friend_id,
                display_name: friend.display_name,
                avatar: image
            }
        });

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const denyFriend = async (req, res) => {
    const { user_id } = req.body;
    const user = req.user;

    try {
        await friendService.drop(user_id, user.id);

        return successResponse(res, StatusCodes.OK, "Từ chối thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const getAllFriend = async (req, res) => {
    const user = req.user;

    try {
        const friends = await friendService.findAllForOneUser(user.id);

        return successResponse(res, StatusCodes.OK, "Thành công.", friends);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const deleteFriend = async (req, res) => {
    const { user_id } = req.body;
    const user = req.user;

    try {
        await friendService.drop(user_id, user.id);

        await friendService.drop(user.id, user_id);

        return successResponse(res, StatusCodes.OK, "Xoá bạn thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const getFriendStartWith = async (req, res) => {
    const { text } = req.query;
    const user = req.user;

    try {
        const friends = await friendService.findFriendWithKey(user.id, text);

        if (!friends[0]) {
            return errorResponse(res, StatusCodes.NOT_FOUND, "Không tìm thấy.");
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", friends);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    getAllFriend,
    addFriend,
    acceptFriend,
    denyFriend,
    getAllPending,
    deleteFriend,
    getFriendStartWith
}

//"3e5329b9-7161-4228-b12e-f2dbba708e10"
//bbe43b48-ae6b-4484-8e7b-a901dad3735b
//7634079a-1e0e-42d2-92fd-603deca3b778
//f57fe667-1b7b-4ad0-abd2-f1badf006613