const { User } = require("../models/index");
const { Op } = require('sequelize');

const findAll = async (whereClause) => {
  return await User.findAll({
    where: whereClause,
  });
};

const findOne = async (whereClause) => {
  return await User.findOne({
    where: whereClause,
  });
};

const findByPk = async (id, options) => {
  return await User.findByPk(id, options);
};

const create = async (insertClause) => {
  return await User.create(insertClause);
};

const drop = async (id) => {
  return await User.destroy({
    where: {
      id: id,
    },
  });
};

const update = async (id, updateClause) => {
  return await User.update(updateClause, {
    where: {
      id: id,
    },
  });
};

const findUserWithKey = async (key) => {
  return await User.findAll({
    where: {
      display_name: {
        [Op.startsWith]: key // Tìm kiếm những display_name bắt đầu bằng cụm từ tìm kiếm
      }
    }
  });
}

module.exports = {
  findAll,
  findOne,
  create,
  drop,
  update,
  findByPk,
  findUserWithKey
};
