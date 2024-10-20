const { Event, EventParticipant } = require('../models/index');

const create = async (insertClause) => {
    const event = await Event.create(insertClause);
    return event;
}

const update = async (id, updateClause) => {
    return await Event.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Event.destroy({
        where: {
            id
        }
    })
}

const findOne = async (whereClause) => {
    const event = await Event.findOne(whereClause);
    return event;
}

// find all event user sanka 
const findAllForUser = async (user_id) => {
    const events = await EventParticipant.findAll({
        include: [
            {
                model: Event,
                as: 'event'
            }
        ],
        where: {
            user_id : user_id
        }
    });
    return events;
}

// find all event which club has
const findAllForClub = async (club_id) => {
    const events = await Event.findAll({
        where: {
            club_id : club_id
        }
    });
    return events;
}


module.exports = {
    create, update, drop, findOne, findAllForClub, findAllForUser
};