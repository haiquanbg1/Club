const friendService = require("../services/friendService");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

const addFriend = async (req, res) => {
    const { user_id } = req.body;
    const user = req.user;

    try {
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

        return successResponse(res, StatusCodes.OK, "Thành công.", friends);
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