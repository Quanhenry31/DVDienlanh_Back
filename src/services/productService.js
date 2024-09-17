const {
  Product,
  Brands,
  ImgDetails,
  Category,
  Size,
  Ncc,
  Comments,
  User,
  Reply,
} = require("../models");
const { Op } = require("sequelize");

// [POST] /
const create = async (payload) => {
  try {
    const data = await Product.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Product.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Product.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const searchLoc = async ({
  page,
  pageSize,
  name,
  categoryID,
  brandID,
  sort,
}) => {
  try {
    const _page = +page < 1 ? 1 : +page;
    const _pageSize = pageSize || +pageSize || 10;
    const skip = (_page - 1) * _pageSize;

    const sortDirection = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const whereConditions = {};

    // Thêm các điều kiện lọc
    if (categoryID) whereConditions.categoryID = categoryID;
    if (brandID) whereConditions.brandID = brandID;
    if (name) whereConditions.name = { [Op.like]: `%${name}%` };

    // Đếm tổng số lượng sản phẩm không áp dụng điều kiện lọc
    const totalProducts = await Product.count();

    const { count, rows } = await Product.findAndCountAll({
      where: whereConditions,
      order: [["price", sortDirection]],
      offset: skip,
      limit: _pageSize,
      include: [
        { model: Brands },
        { model: ImgDetails },
        { model: Category },
        { model: Size },
        { model: Ncc },
      ],
    });

    // Tính tổng số trang
    const totalPages = Math.ceil(totalProducts / _pageSize);
    return { totalProducts, totalPages, count, rows };
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await Product.findByPk(id, {
      include: [
        {
          model: Brands,
        },
        {
          model: ImgDetails,
        },
        {
          model: Category,
        },
        {
          model: Size,
        },
        {
          model: Ncc,
        },
        {
          model: Comments,
          include: [
            {
              model: User,
            },
            {
              model: Reply,
              include: [{ model: User }],
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

const searchAll = async () => {
  try {
    const data = await Product.findAll({
      include: [
        {
          model: Brands,
        },
        {
          model: ImgDetails,
        },
        {
          model: Category,
        },
        {
          model: Size,
        },
        {
          model: Ncc,
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
  searchLoc,
  searchId,
  searchAll,
};
