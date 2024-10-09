const { Club, member_role } = require("../models/index");

const findOne = async (whereClause) => {
    const club = await Club.findOne(whereClause);
    return club;
}

const findAll = async (user_id) => {
    const club = await member_role.findAll({
        include: [
            {
                model: Club,
                as: 'clubs'
            }
        ],
        where: {
            user_id
        }
    });
    return club;
}

const create = async (insertClause) => {
    const club = await Club.create(insertClause);
    return club;
}

const update = async (id, updateClause) => {
    return await Club.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Club.destroy({
        where: {
            id
        }
    })
}

const addMember = async (club_id, user_id, role_id) => {
    return await member_role.create({
        club_id,
        user_id,
        role_id
    });
}

module.exports = {
    create,
    update,
    drop,
    addMember,
    findOne,
    findAll
}