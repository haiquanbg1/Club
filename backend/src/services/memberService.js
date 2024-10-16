const { member_role } = require("../models/index");

const addMember = async (club_id, user_id, role_id) => {
    return await member_role.create({
        club_id,
        user_id,
        role_id
    });
}

const deleteMember = async (club_id, user_id) => {
    return await member_role.destroy({
        where: {
            club_id,
            user_id
        }
    });
}

const findAll = async (club_id) => {
    const member = await member_role.findAll({
        include: [{
            model: 'User',
            as: 'users'
        }],
        where: {
            club_id
        },
        order: [[{ model: User, as: 'users' }, 'display_name', 'ASC']]
    });
}

module.exports = {
    addMember,
    deleteMember,
    findAll
}