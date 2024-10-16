const clubService = require("../services/clubService");
const memberService = require("../services/memberService");
const roles = require("../utils/role");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
    const user = req.user;
    const { name, description } = req.body;
    // tạo club, add member

    try {
        const club = await clubService.create({
            name,
            description,
        });

        await memberService.addMember(club.id, user.id, roles.manager);

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

const changeAvatar = async (req, res) => {
    const image = req.file;
    const { club_id } = req.body;
    try {
        const avatar = await uploadImage(image.path);

        await clubService.update(club_id, {
            avatar: image.filename
        });

        fs.unlinkSync(image.path);

        return successResponse(res, StatusCodes.OK, "Đổi avatar thành công.", {
            avatar: avatar.secure_url
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const findAllClubByUser = async (req, res) => {
    const user = req.user;

    try {
        const club = await clubService.findAll(user.id);

        return successResponse(res, StatusCodes.OK, "Lấy clb thành công.", club);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const update = async (req, res) => {
    const { club_id, name } = req.body;

    try {
        const club = await clubService.update(club_id, {
            name
        });

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.", club);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    findAllClubByUser,
    changeAvatar,
    update
}