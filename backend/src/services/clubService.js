const { Club, member_role } = require("../models/index");

const findOne = async (whereClause) => {
    const club = await Club.findOne(whereClause);
    return club;
}

// find all clubs of one user
const findAll = async (user_id, club_id) => {
    const club = await member_role.findAll({
        include: [
            {
                model: Club,
                as: 'clubs',
                ...(club_id && {
                    where: {
                        id: club_id
                    }
                })
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
    // Lọc bỏ các trường có giá trị undefined
    updateClause = Object.fromEntries(
        Object.entries(updateClause).filter(([_, value]) => value !== undefined)
    );

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

module.exports = {
    create,
    update,
    drop,
    findOne,
    findAll
}