const { Message, User, Conversation, Reaction } = require('../models/index');
const { Op } = require("sequelize")
const deleteMesService = require('./deleteMesService');

const create = async (insertClause) => {
    const message = await Message.create(insertClause);
    return message;
}

const update = async (id, updateClause) => {
    return await Message.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Message.destroy({
        where: {
            id
        }
    })
}

const findOne = async (whereClause) => {
    const message = await Message.findOne(whereClause);
    return message;
}

// find all mes of user in one cover
const findAllForOneUserInOneConver = async (user_id, conversation_id) => {
    const messages = await Message.findAll({
        where: {
            sender_id: user_id,
            conversation_id: conversation_id
        }
    });
    return messages;
}

const buildWhereClause = async (conversation_id, user_id) => {
    // Lấy danh sách message_id từ DeletedMessage
    const deletedMessageIds = await deleteMesService.findAllForConversation(conversation_id, user_id);
    
    console.log('deletedMessageIds:', deletedMessageIds);
    // Xây dựng whereClause
    const whereClause = {
      [Op.and]: [
        { conversation_id },
        {
          [Op.or]: [
            { status: 'show' },
            { status: 'hided', sender_id: user_id },
          ],
        },
        {
          // Lọc các tin không nằm trong message_id đã bị xóa
          id: {
            [Op.notIn]: deletedMessageIds,
          },
        },
      ],
    };
    return whereClause;
}

// find all mes of conver
const findAll = async (conversation_id, user_id, limit = 10, offset) => {
    const whereClause = await buildWhereClause(conversation_id, user_id);
    const messages = await Message.findAll({
        include: [
            {
                model: User,
                as: 'sender',
                attributes: ['avatar', 'display_name']
            }, {
                model: Reaction,
                as: 'react',
                attributes: ['react', 'user_id', 'message_id'],
            }
        ],
        where: whereClause,
        limit: limit, // Giới hạn số lượng bản ghi trả về
        offset: offset, // Bỏ qua số bản ghi dựa trên trang hiện tại
        order: [['createdAt', 'DESC']]
    });
    return messages;
}

const changeStatus = async (message_id, status) => {
    return await Message.update({ status }, {
        where: {
            id: message_id
        }
    });
}

const deleteOtherMessage = async (conversation_id, user_id, message_id) => {
    return await deleteMesService.createDeleteOtherMessage({
        conversation_id,
        user_id,
        message_id
    });
}

module.exports = {
    create, update, drop, findOne, findAllForOneUserInOneConver, findAll, changeStatus, deleteOtherMessage
};
