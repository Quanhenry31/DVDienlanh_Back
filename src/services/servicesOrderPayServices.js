const { ServicesOrderPays } = require("../models");
const { Op } = require("sequelize");
// [POST] /
const create = async (payload) => {
  try {
    const data = await ServicesOrderPays.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await ServicesOrderPays.update(
      { ...payload },
      { where: { id } }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await ServicesOrderPays.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await ServicesOrderPays.findAll();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await ServicesOrderPays.findByPk(id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
  update,
  destroy,
  search,
  searchId,
};
