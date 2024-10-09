const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");
const { uploadImage, getImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");
const bcrypt = require("bcryptjs");

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
    const user = req.user;

    try {
        const avatar = await getImage('Avatar', user.avatar);

        return successResponse(res, StatusCodes.OK, "Thành công.", {
            display_name: user.display_name,
            email: user.username,
            avatar: avatar,
            birthday: user.birthday,
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
    const options = req.body;

    try {
        await userService.update(user.id, options);

        return successResponse(res, StatusCodes.OK, "Cập nhật thông tin thành công.", options);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const deleteUser = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await userService.findOne({
            username
        });
        await deleteImage("Avatar", user.avatar);

        await user.destroy();

        return successResponse(res, StatusCodes.GONE, "Xoá thành công.");
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

        return successResponse(res, StatusCodes.GONE, "Xoá thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(newPassword, salt);

    try {
        const checkPassword = bcrypt.compareSync(oldPassword, user.password);
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