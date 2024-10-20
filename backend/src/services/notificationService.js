const { Notification, Club } = require('../models/index');

const create = async (insertClause) => {
    const notification = await Notification.create(insertClause);
    return notification;
}

const update = async (id, updateClause) => {
    return await Notification.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Notification.destroy({
        where: {
            id
        }
    })
}

const findOne = async (whereClause) => {
    const notification = await Notification.findOne(whereClause);
    return notification;
}

// find all noti of 1 club
const findAll = async (club_id) => {
    const notifications = await Notification.findAll({
        where: {
            club_id : club_id
        }
    });
    return notifications;
}


module.exports = {
    create, update, drop, findOne, findAll
};