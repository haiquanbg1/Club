const { otp } = require("../models/index");

const findOne = async (whereClause) => {
    return await otp.findOne({
        where: whereClause,
        order: [
            ['createdAt', 'desc']
        ]
    });
};

const create = async (insertClause) => {
    return await otp.create(insertClause);
};

module.exports = {
    findOne,
    create,
};
