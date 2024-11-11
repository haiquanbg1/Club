const { Schedule, ScheduleParticipant, User } = require('../models/index');
const { Op } = require("sequelize");

const create = async (insertClause) => {
    const schedule = await Schedule.create(insertClause);
    return schedule;
}

const update = async (id, updateClause) => {
    return await Schedule.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Schedule.destroy({
        where: {
            id
        }
    })
}

const findOne = async (whereClause) => {
    const schedule = await Schedule.findOne(whereClause);
    return schedule;
}

// find all schedule user sanka 
const findAllForUser = async (user_id) => {
    const schedules = await ScheduleParticipant.findAll({
        include: [
            {
                model: Schedule,
                as: 'schedule'
            }
        ],
        where: {
            user_id: user_id
        }
    });
    return schedules;
}

const findAllUser = async (schedule_id) => {
    const participant = await ScheduleParticipant.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['avatar'],
                where: {
                    display_name: {
                        [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
                    }
                }
            }
        ],
        where: {
            schedule_id
        },
        order: [[{ model: User, as: 'user' }, 'display_name', 'ASC']]
    });

    return participant;
}

// find all schedule which event has
const findAllForClub = async (event_id) => {
    const schedules = await Schedule.findAll({
        where: {
            event_id: event_id
        }
    });
    return schedules;
}

const addParticipant = async (insertClause) => {
    return await ScheduleParticipant.create(insertClause);
}

const outEvent = async (schedule_id, user_id) => {
    return await ScheduleParticipant.destroy({
        where: {
            schedule_id,
            user_id
        }
    });
}


module.exports = {
    create, update, drop, findOne, findAllForClub, findAllForUser,
    addParticipant,
    outEvent,
    findAllUser
};