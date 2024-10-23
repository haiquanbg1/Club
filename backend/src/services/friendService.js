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

const drop = async (id1, id2) => {
    return await ManageFriend.destroy({
        where: {
            user_id: id1,
            friend_id: id2
        }
    });
}


// find all friend of user 
const findAllForOneUser = async (user_id) => {
    const friends = await ManageFriend.findAll({
        include: [{
            model: User,
            as: 'friend',
            attributes: []
        }],
        where: {
            user_id: user_id,
            status: 'accepted'
        }
    });
    return friends;
}

const findAllPending = async (user_id) => {
    const friends = await ManageFriend.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: []
        }],
        where: {
            friend_id: user_id,
            status: 'pending'
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
                where: {
                    display_name: {
                        [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
                    }
                },
                attributes: []
            }
        ],
        where: {
            user_id
        }
    });

    return friends;
}

module.exports = {
    create, update, drop, findAllForOneUser,
    findAllPending, findFriendWithKey
}