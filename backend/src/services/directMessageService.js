const { DirectMessage, User } = require("../models/index");
const { Op } = require('sequelize');

// tạo tin nhắn khi 2 thằng chat với nhau
const create = async (insertClause) => {
    const directMessage = await DirectMessage.create(insertClause);
    return directMessage;
}

// xóa tin nhắn
const drop = async (message_id) => {
    return await DirectMessage.destroy({
        where: {
            id: message_id
        }
    });
}

// tìm tin nhắn của user và bạn user
const getOldMessages = async (user_id, friend_id, offset, limit = 12) => {
    const whereClause = {
        [Op.or]: [
            { sender_id: user_id, receiver_id: friend_id },
            { sender_id: friend_id, receiver_id: user_id }
        ]
    };

    // Nếu có cursor (tin nhắn cũ hơn thời điểm này) thì thêm vào whereClause
    // if (cursor) {
    //     whereClause.createdAt =
    //     {
    //         [Op.lt]: new Date(cursor)
    //     };
    // }

    const directMessages = await DirectMessage.findAll({
        where: whereClause,
        include: [
            {
                model: User,
                as: 'sender',
                attributes: ['avatar', 'display_name']
            },
            {
                model: User,
                as: 'receiver',
                attributes: ['avatar', 'display_name']
            }
        ],
        order: [['createdAt', 'DESC']], // Tin nhắn mới nhất trước
        limit: parseInt(limit),
        offset: offset
        // offset: parseInt(offset)
        // cursor: cursor
    });

    return directMessages;
}

module.exports = {
    create, drop, getOldMessages
}