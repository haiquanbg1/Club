const reportService = require("../services/reportService");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCode } = require("http-status-codes");

const create = async (req, res) => {
    const { title, message, club_id } = req.body;
    const user = req.user;

    try {
        const report = await reportService.create({
            title,
            message,
            club_id,
            user_id: user.id
        });

        return successResponse(res, StatusCode.CREATED, "Tạo báo cáo thành công");
    } catch (error) {
        return errorResponse(res, StatusCode.INTERNAL_SERVER_ERROR, error.message);
    }
}

const update = async (req, res) => {
    const { title, message, report_id, status } = req.body;

    try {
        await reportService.update(report_id, {
            title,
            message,
            status
        });

        return successResponse(res, StatusCode.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(res, StatusCode.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    update
}