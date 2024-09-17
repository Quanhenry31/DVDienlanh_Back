const { Voucher } = require("../models");

// [POST] /
const create = async (payload) => {
  try {
    const data = await Voucher.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Voucher.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Voucher.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await Voucher.findAll();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await Voucher.findByPk(id);
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
