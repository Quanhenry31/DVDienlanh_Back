const { categoriBlogs, Blogs, User, commentBlogs } = require("../models");
const { Op } = require("sequelize");

// [POST] /
const create = async (payload) => {
  try {
    const data = await Blogs.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Blogs.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Blogs.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await Blogs.findByPk(id, {
      include: [
        {
          model: categoriBlogs,
        },
        {
          model: commentBlogs,
          include: [
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const searchLoc = async ({ page, pageSize, name, categoryID }) => {
  try {
    const _page = +page < 1 ? 1 : +page;
    const _pageSize = pageSize || +pageSize || 10;
    const skip = (_page - 1) * _pageSize;

    const whereConditions = {};

    // Thêm các điều kiện lọc
    if (categoryID) whereConditions.categoryID = categoryID;
    if (name) whereConditions.name = { [Op.like]: `%${name}%` };

    // Đếm tổng số lượng sản phẩm không áp dụng điều kiện lọc
    const totalProducts = await Blogs.count();

    const { count, rows } = await Blogs.findAndCountAll({
      where: whereConditions,
      offset: skip,
      limit: _pageSize,
      include: [{ model: categoriBlogs }],
    });

    // Tính tổng số trang
    const totalPages = Math.ceil(totalProducts / _pageSize);
    return { totalProducts, totalPages, count, rows };
  } catch (err) {
    console.log(err);
  }
};

const searchAll = async () => {
  try {
    const data = await Blogs.findAll({
      include: [
        {
          model: categoriBlogs,
        },
      ],
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
  update,
  destroy,
  searchId,
  searchAll,
  searchLoc,
};
