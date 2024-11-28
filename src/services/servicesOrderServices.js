const { Services, ServiceCategories } = require("../models");
const { Op } = require("sequelize");
// [POST] /
const create = async (payload) => {
  try {
    const data = await Services.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Services.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Services.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await Services.findAll();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await Services.findByPk(id, {
      include: [
        {
          model: ServiceCategories,
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const searchLoc = async ({ name, page, pageSize }) => {
  try {
    const _page = +page < 1 ? 1 : +page;
    const _pageSize = pageSize || +pageSize || 10;
    const skip = (_page - 1) * _pageSize;

    // Khởi tạo whereConditions
    const whereConditions = {};
    if (name) whereConditions.name = { [Op.like]: `%${name}%` };

    const { count, rows } = await Services.findAndCountAll({
      offset: skip,
      limit: _pageSize,
      where: whereConditions,
      include: [
        {
          model: ServiceCategories,
        },
      ],
    });

    return { count, rows };
  } catch (err) {
    console.log(err);
    throw err; // Ném lỗi để có thể bắt lỗi ở controller
  }
};
module.exports = {
  create,
  update,
  destroy,
  search,
  searchId,
  searchLoc,
};
