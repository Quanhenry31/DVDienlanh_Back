const Service = require("../services/productService");
const { Op } = require("sequelize");

class Controller {
  // [POST] /users
  create = async (req, res) => {
    try {
      const data = await Service.create({ ...req.body });
      res.json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the product." });
    }
  };

  // [PUT] /users/:id
  update = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Service.update({ ...req.body }, id);
      res.json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the product." });
    }
  };

  // [DELETE] /users/:id
  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Service.destroy(id);
      res.json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the product." });
    }
  };

  // [GET] /loc/ALL
  findLoc = async (req, res) => {
    try {
      const data = await Service.searchLoc({
        page: +req.query.page,
        pageSize: +req.query.pageSize,
        name: req.query.name,
        categoryID: +req.query.categoryID,
        brandID: +req.query.brandID,
        sort: req.query.sort,
      });
      return res.json(data);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching products." });
    }
  };

  // [GET] //:id
  findId = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Service.searchId(id);
      return res.json({ data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching the product." });
    }
  };
  // [GET] //:id
  findProductLQ = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Service.searchLQ(id);
      return res.json({ data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching the product." });
    }
  };
  // [GET] /tim kiem tat ca/ALL
  findAll = async (req, res) => {
    const data = await Service.searchAll();
    return res.json({
      data,
    });
  };
}

module.exports = new Controller();
