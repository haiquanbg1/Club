const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");

const changeAvatar = async (req, res) => {
    const user = req.user;
    const image = req.file;

    try {
        if (user.avatar != image.path) {
            await userService.update(user.id, {
                avatar: image.path
            });
        }

        return successResponse(res, StatusCodes.OK, "Đổi avatar thành công.", {
            avatar: image.path
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

    return successResponse(res, StatusCodes.OK, "Thành công.", {
        display_name: user.display_name,
        email: user.username,
        avatar: user.avatar,
        birthday: user.birthday,
        gender: user.gender
    });
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

module.exports = {
    changeAvatar,
    findUser,
    update,
    deleteUser,
    deleteAccount
}