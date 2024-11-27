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
const findEventUserJoined = async (user_id, club_id) => {
    const events = await EventParticipant.findAll({
        include: [
            {
                model: Event,
                as: 'event',
                where: {
                    club_id
                }
            }
        ],
        where: {
            user_id: user_id
        }
    });
    return events;
}

const findEventUserUnJoined = async (user_id, club_id) => {
    // Lấy danh sách tất cả các sự kiện mà người dùng đã tham gia
    const eventsUserJoined = await EventParticipant.findAll({
        include: [
            {
                model: Event,
                as: 'event',
                where: {
                    club_id
                }
            }
        ],
        where: {
            user_id: user_id
        },
        attributes: ['event_id']  // Lấy chỉ ID sự kiện
    });

    // Lấy mảng các event_id mà user đã tham gia
    const eventIdsUserJoined = eventsUserJoined.map(event => event.event_id);

    // Tìm các sự kiện mà người dùng không tham gia
    const eventsNotJoined = await Event.findAll({
        where: {
            id: {
                [Op.notIn]: eventIdsUserJoined  // Lọc những sự kiện không có trong danh sách
            }
        }
    });

    return eventsNotJoined;
}

const findAllUser = async (event_id, key, status) => {
    const participant = await EventParticipant.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['avatar'],
                where: {
                    ...(key && {
                        where: {
                            display_name: {
                                [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
                            }
                        }
                    })
                }
            }
        ],
        where: {
            event_id,
            status
        },
        order: [[{ model: User, as: 'user' }, 'display_name', 'ASC']]
    });

    return participant;
}

// find all event which club has
const findAllForClub = async (club_id, event_id) => {
    const events = await Event.findAll({
        where: {
            club_id: club_id,
            ...(event_id && {
                where: {
                    id: event_id
                }
            })
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

const askToJoin = async (user_id, event_id) => {
    return await EventParticipant.create({
        user_id,
        event_id,
        status: 'pending'
    });
}

const acceptPending = async (user_id, event_id) => {
    return await EventParticipant.update({
        status: "accepted"
    }, {
        where: {
            user_id,
            event_id
        }
    })
}

module.exports = {
    create, update, drop, findOne, findAllForClub, findEventUserJoined,
    findEventUserUnJoined,
    addParticipant,
    outEvent,
    findAllUser,
    askToJoin,
    acceptPending
};