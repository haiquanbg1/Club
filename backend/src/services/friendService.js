const { ManageFriend, User } = require('../models/index');
const { Op } = require('sequelize');

const create = async (insertClause) => {
    const relation = await ManageFriend.create(insertClause);
    return relation;
}

const update = async (user_id, friend_id, updateClause) => {
    return await ManageFriend.update(updateClause, {
        where: {
            user_id,
            friend_id
        }
    });
}

const findOne = async (user_id, friend_id, status) => {
    return await ManageFriend.findAll({
        where: {
            user_id,
            friend_id,
            status
        }
    });
}

const drop = async (id1, id2) => {
    return await ManageFriend.destroy({
        where: {
            user_id: id1,
            friend_id: id2
        }
    });
}


// find all friend of user 
const findAll = async (user_id) => {
    const friends = await ManageFriend.findAll({
        include: [{
            model: User,
            as: 'friend',
            attributes: ['avatar', 'display_name']
        }],
        where: {
            user_id: user_id,
            status: 'accepted'
        }
    });
    return friends;
}

const findAllPending = async (user_id, key = "") => {
    const friends = await ManageFriend.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: ['avatar', 'display_name']
        }],
        where: {
            friend_id: user_id,
            status: 'pending',
            display_name: {
                [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
            }
        }
    });
    return friends;
}

const findFriendWithKey = async (user_id, key) => {
    const friends = await ManageFriend.findAll({
        include: [
            {
                model: User,
                as: 'friend',
                attributes: ['avatar']
            }
        ],
        where: {
            user_id,
            status: 'accepted',
            display_name: {
                [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
            }
        }
    });

    return friends;
}

module.exports = {
    create, update, drop, findAll,
    findAllPending, findFriendWithKey, findOne
}