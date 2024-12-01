const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");
const { uploadImage, getImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const formatDate = require("../utils/formatDate");

const changeAvatar = async (req, res) => {
    const user = req.user;
    const image = req.file;
    try {
        const avatar = await uploadImage(image.path);

        await userService.update(user.id, {
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

const findUser = async (req, res) => {
    let { user_id } = req.query;
    let user = req.user;

    if (user_id === "@me") {
        user_id = user.id;
    }

    if (user_id) {
        user = await userService.findOne({
            id: user_id
        });
    }

    try {
        const avatar = await getImage('Avatar', user.avatar);
        return successResponse(res, StatusCodes.OK, "Thành công.", {
            id: user.id,
            display_name: user.display_name,
            email: user.username,
            avatar: avatar,
            birthday: formatDate(user.birthday),
            gender: user.gender
        });
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const update = async (req, res) => {
    const user = req.user;
    const { birthday, gender, display_name } = req.body;

    const updateClause = Object.assign(
        {},
        birthday && { birthday },
        gender && { gender },
        display_name && { display_name }
    );

    try {
        await userService.update(user.id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thông tin thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await userService.findOne({
            id
        });
        await deleteImage("Avatar", user.avatar);

        await user.destroy();

        return successResponse(res, StatusCodes.OK, "Xoá thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const deleteAccount = async (req, res) => {
    const user = req.user;

    try {
        await deleteImage("Avatar", user.avatar);

        await user.destroy();

        return successResponse(res, StatusCodes.OK, "Xoá thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const changePassword = async (req, res) => {
    const { curPass, newPass } = req.body;
    console.log(curPass)
    console.log(newPass)
    const user = req.user;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(newPass, salt);

    try {
        const checkPassword = bcrypt.compareSync(curPass, user.password);
        console.log(curPass, user.password)
        if (!checkPassword) {
            return errorResponse(
                res,
                StatusCodes.BAD_REQUEST,
                "Mật khẩu không chính xác"
            );

        }

        await userService.update(user.id, {
            password: hashPassword
        });

        return successResponse(res, StatusCodes.OK, "Đổi password thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

module.exports = {
    changeAvatar,
    findUser,
    update,
    deleteUser,
    deleteAccount,
    changePassword
}