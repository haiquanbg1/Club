// const { Conversation } = require("../models/index");
const { Conversation } = require("../models/index");

const create = async (insertClause) => {
    const conversation = Conversation.create(insertClause);
    return conversation;
}

module.exports = {
    create,
}