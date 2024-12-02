const scheduleService = require("../services/scheduleService");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
    const { event_id, title, description, start_time, end_time, location } = req.body;

    try {
        const schedule = await scheduleService.create({
            event_id,
            description,
            start_time,
            end_time,
            location
        });

        return successResponse(res, StatusCodes.CREATED, "Tạo lịch trình thành công.")
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const drop = async (req, res) => {
    const { schedule_id } = req.body;
    try {
        await scheduleService.drop(schedule_id);

        return successResponse(res, StatusCodes.OK, "Xoá lịch trình thành công.");
    } catch (error) {
        console.log(error.message)
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const update = async (req, res) => {
    const { schedule_id, description, start_time, end_time, location } = req.body;

    const updateClause = Object.assign(
        {},
        description && { description },
        end_time && { end_time },
        start_time && { start_time },
        location && { location }
    );

    try {
        await scheduleService.update(schedule_id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

const find = async (req, res) => {
    const { schedule_id } = req.query;
    const { event_id } = req.params;

    try {
        const schedule = await scheduleService.findAll(event_id, schedule_id);

        const data = [];

        for (let i = 0; i < schedule.length; i++) {
            data.push({

            })
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", schedule);
    } catch (error) {
        return errorResponse(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        );
    }
}

module.exports = {
    create,
    drop,
    update,
    find
}