const { Message, User, Conversation } = require('../models/index');

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
            sender_id : user_id, 
            conversation_id : conversation_id
        }
    });
    return messages;
}

// find all mes of conver
const findAllForOneConver = async (conversation_id) => {
    const messages = await Message.findAll({
        where: {
            conversation_id : conversation_id
        }
    });
    return messages;
}

module.exports = {
    create, update, drop, findOne, findAllForOneUserInOneConver, findAllForOneConver
};
