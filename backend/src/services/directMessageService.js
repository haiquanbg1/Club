const { DirectMessage, User } = require("../models/index");
const { Op } = require('sequelize');

// tạo tin nhắn khi 2 thằng chat với nhau
const create = async (insertClause) => {
    const directMessage = await DirectMessage.create(insertClause);
    return directMessage;
}

// xóa tin nhắn
const drop = async (id) => {
    return await DirectMessage.destroy({
        where: {
            id
        }
    });
}

const getOldMessages = async (user_id, friend_id, offset, limit = 11) => {
    const whereClause = {
        [Op.and]: [
            { [Op.or]: [
                { sender_id: user_id, receiver_id: friend_id },
                { sender_id: friend_id, receiver_id: user_id }
            ] },
            { [Op.or]: [
                { status: 'show' },
                { status: 'hided', sender_id: user_id }
            ] }
        ]
    };

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

const reactChange = async (message_id, react) => {
    try {
        console.log(message_id, react);
        return await DirectMessage.update({
            react: react
        }, {
            where: {
                id: message_id
            }
        });
    } catch (error) {
        console.log(error);
    }

}

const changeStatus = async (message_id, status) => {
    try {
        return await DirectMessage.update({
            status: status
        }, {
            where: {
                id: message_id
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create, drop, getOldMessages, reactChange, changeStatus
}