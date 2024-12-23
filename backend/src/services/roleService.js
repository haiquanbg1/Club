const { Role, member_role } = require("../models/index");

const findOne = async (whereClause) => {
    const role = await member_role.findOne({
        where: whereClause
    });
    return role;
}

const findAll = async (whereClause) => {
    return await member_role.findAll({
        where: whereClause
    });
}

const findByUserAndClub = async (club_id, user_id) => {
    return await member_role.findOne({
        where: {
            club_id,
            user_id
        }
    });
}

const shareManager = async (club_id, user_id) => {
    return await member_role.update({
        role_id: 2
    }, {
        where: {
            club_id,
            user_id
        }
    });
}

module.exports = {
    findOne,
    findByUserAndClub,
    shareManager,
    findAll
}