const { StatusCodes } = require("http-status-codes");
const memberService = require("../services/memberService");
const friendService = require("../services/friendService");
const notificationService = require("../services/notificationService");
const roleService = require("../services/roleService");
const { successResponse, errorResponse } = require("../utils/response");
const roles = require("../utils/role");
const cloudinary = require("../utils/cloudinary");

const addMember = async (req, res) => {
    const { club_id, user_id } = req.body;
    const role_id = roles.user;

    try {
        await memberService.addMember(club_id, user_id, role_id);

        return successResponse(res, StatusCodes.CREATED, "Thêm thành viên thành công.");
    } catch (error) {
        console.log(error.message)
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const listToAddMember = async (req, res) => {
    const user = req.user;
    const { club_id } = req.params;
    // const club_id = 17
    const data = [];

    try {
        const friends = await friendService.findAll(user.id);
        for (let i = 0; i < friends.length; i++) {
            const member = await memberService.findOne(club_id, friends[i].friend_id);

            if (member) {
                continue;
            }

            const image = await cloudinary.getImage("Avatar", friends[i].friend.avatar);

            data.push({
                user_id: friends[i].friend_id,
                display_name: friends[i].friend.display_name,
                avatar: image
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        console.log(error)
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const deleteMember = async (req, res) => {
    const { club_id, user_id } = req.body;

    try {
        await memberService.deleteMember(club_id, user_id);

        return successResponse(res, StatusCodes.OK, "Thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const outMember = async (req, res) => {
    const { club_id } = req.body;
    const user = req.user;

    try {
        await memberService.deleteMember(club_id, user.id);

        const manager = await roleService.findOne({
            role_id: 2,
            club_id
        });
        const notification = await notificationService.create({
            club_id,
            title: "Câu lạc bộ",
            description: `${user.display_name} đã rời khỏi câu lạc bộ.`
        });
        await notificationService.addNotificationForUser(
            manager.user_id,
            notification.id
        );

        return successResponse(res, StatusCodes.OK, "Thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const findUserInClub = async (req, res) => {
    const { club_id } = req.params;
    try {
        const members = await memberService.findAll(club_id);

        const data = [];

        for (let i = 0; i < members.length; i++) {
            const image = await cloudinary.getImage("Avatar", members[i].users.avatar);

            data.push({
                user_id: members[i].user_id,
                display_name: members[i].users.display_name,
                avatar: image,
                role: members[i].roles.name
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    addMember,
    deleteMember,
    outMember,
    findUserInClub,
    listToAddMember
}