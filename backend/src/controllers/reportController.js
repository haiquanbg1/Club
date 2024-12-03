const reportService = require("../services/reportService");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

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

        return successResponse(res, StatusCodes.CREATED, "Tạo báo cáo thành công");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
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

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const findAll = async (req, res) => {
    const { report_id } = req.query;
    const { club_id } = req.params;

    try {
        const report = await reportService.findAllOfClub(club_id, report_id);

        const data = [];

        for (let i = 0; i < report.length; i++) {
            data.push({
                title: report[i].title,
                message: report[i].message,
                status: report[i].status
            });
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

const drop = async (req, res) => {
    const { report_id } = req.body;

    try {
        await reportService.drop(report_id);

        return successResponse(res, StatusCodes.OK, "Xoá thành công.");
    } catch (error) {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    create,
    update,
    findAll,
    drop
}