// const { Conversation } = require("../models/index");
const { where } = require("sequelize");
const { Conversation, ConversationParticipant, User } = require("../models/index");
const { Op } = require("sequelize")

const create = async (insertClause) => {
    const conversation = Conversation.create(insertClause);
    return conversation;
}

const update = async (id, updateClause) => {
    return await Conversation.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Conversation.destroy({
        where: {
            id: id
        }
    })
}


const findOne = async (whereClause) => {
    const conversation = await Conversation.findOne({
        where: whereClause
    });
    return conversation;
}

// find all conver in one club
const findAllForClub = async (club_id) => {
    const conversations = await Conversation.findAll({
        where: {
            club_id: club_id
        }
    });
    return conversations;
}

// find all conver in one user từ conver này lọc tiếp theo findAllForClub
const findAllForUser = async (user_id) => {
    const conversations = await ConversationParticipant.findAll({
        include: [
            {
                model: Conversation,
                as: 'conversation'
            }
        ],
        where: {
            user_id: user_id
        }
    });
    return conversations;
}

const findAllUser = async (conversation_id, key) => {
    const participant = await ConversationParticipant.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['avatar', 'id']
            }
        ],
        where: {
            conversation_id,
            display_name: {
                [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
            }
        },
        order: [['display_name', 'ASC']]
    });

    return participant;
}

const addParticipant = async (insertClause) => {
    return await ConversationParticipant.create(insertClause);
}

const outConversation = async (conversation_id, user_id) => {
    return await ConversationParticipant.destroy({
        where: {
            conversation_id,
            user_id
        }
    });
}

module.exports = {
    create, update, drop, findOne, findAllForClub, findAllForUser,
    findAllUser, addParticipant, outConversation
}
