const { StatusCodes } = require("http-status-codes");
const memberService = require("../services/memberService");
const { successResponse, errorResponse } = require("../utils/response");
const roles = require("../utils/role");

const addMember = async (req, res) => {
    const { club_id } = req.body;
    const user = req.user;
    const role_id = roles.user;

    try {
        await memberService.addMember(club_id, user.id, role_id);

        return successResponse(res, StatusCodes.CREATED, "Thêm thành viên thành công.", {
            name: user.display_name
        });
    } catch {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const deleteMember = async (req, res) => {
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
    const { club_id } = req.body;

    try {
        const member = await memberService.findAll(club_id);

        return successResponse(res, StatusCodes.OK, "Thành công.", member);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    addMember,
    deleteMember,
    findUserInClub
}