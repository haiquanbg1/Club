const scheduleService = require("../services/scheduleService");
const { successResponse, errorResponse } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const formatDate = require("../utils/formatDate");

const create = async (req, res) => {
    const { event_id, title, description, start_time, end_time, location } = req.body;

    try {
        const schedule = await scheduleService.create({
            event_id,
            title,
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
    const { schedule_id, title, description, start_time, end_time, location } = req.body;
    console.log(schedule_id)
    const updateClause = Object.assign(
        {},
        title && { title },
        description && { description },
        end_time && { end_time },
        start_time && { start_time },
        location && { location }
    );

    try {
        await scheduleService.update(schedule_id, updateClause);

        return successResponse(res, StatusCodes.OK, "Cập nhật thành công.");
    } catch (error) {
        console.log(error.message)
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
            const start_time = formatDate(schedule[i].start_time).split()[0];
            const end_time = formatDate(schedule[i].end_time).split()[0];
            data.push({
                title: schedule[i].title,
                description: schedule[i].description,
                id: schedule[i].id,
                start_time,
                end_time,
                location: schedule[i].location
            })
        }

        return successResponse(res, StatusCodes.OK, "Thành công.", data);
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