const { Report, User } = require('../models/index');

const create = async (insertClause) => {
    const report = await Report.create(insertClause);
    return report;
}

const update = async (id, updateClause) => {
    // Lọc bỏ các trường có giá trị undefined
    updateClause = Object.fromEntries(
        Object.entries(updateClause).filter(([_, value]) => value !== undefined)
    );

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
    const report = await Report.findOne({
        where: whereClause
    });
    return report;
}

// find all report of club 
const findAllOfClub = async (club_id, report_id) => {
    const reports = await Report.findAll({
        where: {
            club_id: club_id,
        },
        ...(report_id && {
            where: {
                id: report_id
            }
        })
    });
    return reports;
}


module.exports = {
    create, update, drop, findOne, findAllOfClub
};
