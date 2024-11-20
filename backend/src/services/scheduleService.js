const { Schedule } = require('../models/index');

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

// find all schedule which event has
const findAll = async (event_id, schedule_id) => {
    const schedules = await Schedule.findAll({
        where: {
            event_id: event_id,
            ...(schedule_id && {
                where: {
                    id: schedule_id
                }
            })
        }
    });
    return schedules;
}


module.exports = {
    create, update, drop, findOne, findAll,
};