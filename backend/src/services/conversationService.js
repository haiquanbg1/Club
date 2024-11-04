// const { Conversation } = require("../models/index");
const { Conversation, ConversationParticipant, User } = require("../models/index");

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
    const conversation = await Conversation.findOne(whereClause);
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

const findAllUser = async (conversation_id) => {
    const participant = await ConversationParticipant.findAll({
        include: [
            {
                model: User,
                as: 'participant'
            }
        ],
        where: {
            conversation_id
        }
    });

    return participant;
}

module.exports = {
    create, update, drop, findOne, findAllForClub, findAllForUser,
    findAllUser
}