const { Event, EventParticipant } = require('../models/index');
const { Op } = require("sequelize");

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
            user_id: user_id
        }
    });
    return events;
}

const findAllUser = async (event_id) => {
    const participant = await EventParticipant.findAll({
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
            event_id
        },
        order: [[{ model: User, as: 'user' }, 'display_name', 'ASC']]
    });

    return participant;
}

// find all event which club has
const findAllForClub = async (club_id) => {
    const events = await Event.findAll({
        where: {
            club_id: club_id
        }
    });
    return events;
}

const addParticipant = async (insertClause) => {
    return await EventParticipant.create(insertClause);
}

const outEvent = async (event_id, user_id) => {
    return await EventParticipant.destroy({
        where: {
            event_id,
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