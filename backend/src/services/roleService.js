const { Role, member_role } = require("../models/index");

const findOne = async (whereClause) => {
    const role = await member_role.findOne({
        where: whereClause
    });
    return role;
}

const findByUserAndClub = async (club_id, user_id) => {
    return await member_role.findOne({
        where: {
            club_id,
            user_id
        }
    });
}

module.exports = {
    findOne,
    findByUserAndClub
}