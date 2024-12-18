const { Notification, Club, UserNotification } = require('../models/index');

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

const addNotificationForUser = async (user_id, notification_id) => {
    return await UserNotification.create({
        user_id,
        notification_id
    });
}

const findOne = async (whereClause) => {
    const notification = await Notification.findOne(whereClause);
    return notification;
}

// find all noti of 1 club for user
const findAll = async (club_id, user_id, page) => {
    // add limit, offset, order by
    const limit = 7;
    const offset = page * limit;

    const notifications = await UserNotification.findAll({
        include: [
            {
                model: Notification,
                as: 'notification',
                where: {
                    club_id
                }
            }
        ],
        where: {
            user_id
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
    });
    return notifications;
}

const updateSeen = async (notification_id, user_id) => {
    return await UserNotification.update({
        read_at: new Date.now()
    }, {
        where: {
            user_id,
            notification_id
        }
    });
}

module.exports = {
    create, update, drop, findOne, findAll, updateSeen, addNotificationForUser
};