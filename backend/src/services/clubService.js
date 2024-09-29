const { where } = require("sequelize");
const { Club } = require("../models/index");

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

module.exports = {
    create,
    update,
    drop
}