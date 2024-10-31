const { Report } = require('../models/index');

const create = async (insertClause) => {
    const report = await Report.create(insertClause);
    return report;
}

const update = async (id, updateClause) => {
    return await Report.update(updateClause, {
        where: {
            id
        }
    });
}

const drop = async (id) => {
    return await Report.destroy({
        where: {
            id
        }
    })
}

const findOne = async (whereClause) => {
    const report = await Report.findOne(whereClause);
    return report;
}

// find all report of club 
const findAllOfClub = async (club_id) => {
    const reports = await Report.findAll({
        where: {
            club_id : club_id
        }
    });
    return reports;
}


module.exports = {
    create, update, drop, findOne, findAllOfClub
};
