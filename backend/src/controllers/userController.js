const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");
const { successResponse } = require("../utils/response");

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

module.exports = {
    changeAvatar,
    findUser
}