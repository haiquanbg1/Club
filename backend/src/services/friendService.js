const { ManageFriend } = require('../models/index');

const create = async (insertClause) => {
    const relation = await ManageFriend.create(insertClause);
    return relation;
}

const update = async (id, updateClause) => {
    return await ManageFriend.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id1, id2) => {
    return await ManageFriend.destroy({
        where: {
            user_id : id1,
            friend_id : id2
        }
    })
}


// find all friend of user 
const findAllForOneUser = async (user_id) => {
    const friends = await ManageFriend.findAll({
        where: {
            user_id : user_id
        }
    });
    return friends;
}

module.exports = {
    create, update, drop, findAllForOneUser
}