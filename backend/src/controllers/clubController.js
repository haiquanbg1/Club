const clubService = require("../services/clubService");
const roles = require("../utils/role");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
    const user = req.user;
    const { name, description } = req.body;
    // tạo conversation, club, add member

    try {
        const club = await clubService.create({
            name,
            description,
        });

        await clubService.addMember(club.id, user.id, roles.manager);

        return successResponse(res, StatusCodes.CREATED, {
            club: name
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const update = {

}

module.exports = {
    create
}