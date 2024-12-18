const { Conversation, DeletedMessage, User } = require("../models/index"); 
const createDeleteOtherMessage = async (insertClause) => {
    const deleted_message =  await DeletedMessage.create(insertClause);
    return deleted_message;
}

const findAllForConversation = async (conversation_id, user_id) => {
    const deleted_message = await DeletedMessage.findAll({
        attributes: ['message_id'],
        where: {
            conversation_id: conversation_id,
            user_id: user_id
        }
    });
    return deleted_message.map(message => message.message_id);
};

module.exports = {
    createDeleteOtherMessage,
    findAllForConversation
};