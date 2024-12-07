const { User, Reaction } = require("../models/index");
const { Op, where } = require('sequelize');
const { use } = require("../routes/api");


const create = async (insertClause) => {
    const reaction = await Reaction.create(insertClause);
    return reaction;
}

const update = async (id, updateClause) => {
    return await Reaction.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Reaction.destroy({
        where: {
            id
        }
    })
}

const findAllReactInMessage = async (message_id) => {
    const reacts = await Reaction.findAll({
        include: [{
            model: User,
            as: "sender",
            attributes: ['display_name', 'avatar']
        }],
        where: {
            message_id: message_id
        },
        // limit: limit, // Giới hạn số lượng bản ghi trả về
        // offset: offset, // Bỏ qua số bản ghi dựa trên trang hiện tại
        // order: [['createdAt', 'DESC']]
    });
    return reacts;
}

const findOne = async (message_id, user_id) => {
    const react = await Reaction.findOne({
        where: {
            message_id: message_id,
            user_id: user_id
        }
    });
    return react;
}

module.exports = {
    create, update, findAllReactInMessage, findOne, drop
}