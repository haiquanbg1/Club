const { StatusCodes } = require("http-status-codes");
const memberService = require("../services/memberService");
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
            const image = await cloudinary.getImage("Avatar", members[i].user.avatar);

            data.push({
                user_id: members[i].user_id,
                display_name: members[i].user.display_name,
                avatar: image
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
    findUserInClub
}