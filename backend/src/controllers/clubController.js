const clubService = require("../services/clubService");
const memberService = require("../services/memberService");
const roles = require("../utils/role");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const { uploadImage, getImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");
const formatDate = require("../utils/formatDate");

const create = async (req, res) => {
    const user = req.user;
    const { name, description } = JSON.parse(req.body.userData)
    const image = req.file
    // tạo club, add member

    try {
        const avatar = await uploadImage(image.path);
        const club = await clubService.create({
            name,
            description,
            avatar: image.filename
        });

        fs.unlinkSync(image.path);
        await memberService.addMember(club.id, user.id, roles.manager);

        return successResponse(res, StatusCodes.CREATED, {
            club: name
        });
    } catch (error) {
        console.log(error)
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const changeAvatar = async (req, res) => {
    const image = req.file;
    const id = req.body.club_id
    try {
        const avatar = await uploadImage(image.path);

        await clubService.update(id, {
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
    const club_id = req.query?.club_id;

    try {
        const clubs = await clubService.findAll(user.id, club_id);

        let data = [];

        for (let i = 0; i < clubs.length; i++) {
            const image = await getImage("Avatar", clubs[i].clubs.avatar);

            data.push({
                id: clubs[i].clubs.id,
                name: clubs[i].clubs.name,
                avatar: image,
                role: clubs[i].roles.name
            });
        }

        return successResponse(res, StatusCodes.OK, "Lấy clb thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const update = async (req, res) => {
    const { club_id, name, description } = req.body;

    try {
        const club = await clubService.update(club_id, {
            name,
            description
        });

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const drop = async (req, res) => {
    const { club_id } = req.body;

    try {
        await clubService.drop(club_id);

        return successResponse(res, StatusCodes.OK, "Xoá clb thành công .");
    } catch (error) {
        console.log(error.message)
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const findOne = async (req, res) => {
    const { club_id } = req.query;

    try {
        const club = await clubService.findOne({
            id: club_id
        });

        const image = await getImage("Avatar", club.avatar);

        const data = {
            club_id: club.id,
            name: club.name,
            description: club.description,
            avatar: image,
            createdAt: formatDate(club.createdAt),
            updatedAt: formatDate(club.updatedAt)
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    findAllClubByUser,
    changeAvatar,
    update,
    drop,
    findOne
}