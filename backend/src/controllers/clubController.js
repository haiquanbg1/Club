const clubService = require("../services/clubService");
const conversationService = require("../services/conversationService");
const roleService = require("../services/roleService");
const roles = require("../utils/role");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
    const user = req.user;
    const { name, description } = req.body;
    // tạo conversation, club, add member

    try {
        const conversation = await conversationService.create({ name });
        await conversation.addParticipant(user);

        const club = await clubService.create({
            name,
            description,
            conversation_id: conversation.id
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