const {
  Order,
  User,
  Payment,
  OrderDetail,
  Product,
  Category,
  ImgDetails,
  Brands,
  Size,
  Ncc,
} = require("../models");

// [POST] /
const create = async (payload) => {
  try {
    const data = await Order.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Order.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Order.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await Order.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Payment,
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await Order.findByPk(id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET]exportOrder
const searchOrder = async (id) => {
  try {
    const data = await Order.findAll({
      include: [
        {
          model: Payment,
        },
        {
          model: User,
          attributes: [
            "id",
            "userName",
            "email",
            "phone",
            "address",
            "image",
            "type",
          ],
        },
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Category,
                },
                {
                  model: ImgDetails,
                },
                {
                  model: Brands,
                },
              ],
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
// [GET] ProductPopular
const searchProductPopular = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Payment,
        },
        {
          model: User,
          attributes: [
            "id",
            "userName",
            "email",
            "phone",
            "address",
            "image",
            "type",
          ],
        },
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Category,
                },
                {
                  model: ImgDetails,
                },
                {
                  model: Brands,
                },
                {
                  model: Size,
                },
                {
                  model: Ncc,
                },
              ],
            },
          ],
        },
      ],
    });

    // Lấy danh sách productID và tổng số lượng bán được từ OrderDetails
    const productSales = {};
    orders.forEach((order) => {
      order.OrderDetails.forEach((detail) => {
        const productID = detail.productID;
        const quantitySold = detail.quantity; // Số lượng bán từ OrderDetails
        productSales[productID] = (productSales[productID] || 0) + quantitySold;
      });
    });

    // Chuyển object thành mảng và sắp xếp theo số lượng bán giảm dần
    const sortedProducts = Object.entries(productSales)
      .map(([productID, totalQuantity]) => ({
        productID: parseInt(productID),
        totalQuantity,
      }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity);

    // Trả về danh sách sản phẩm phổ biến kèm thông tin
    const popularProducts = await Product.findAll({
      where: {
        id: sortedProducts.map((item) => item.productID),
      },
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

    // Map dữ liệu và sắp xếp giảm dần theo totalQuantitySold
    return popularProducts
      .map((product) => ({
        id: product.id,
        name: product.name,
        title: product.title,
        price: product.price,
        year: product.year,
        categoryID: product.categoryID,
        brandID: product.brandID,
        quantityInStock: product.quantity, // Số lượng tồn kho
        view: product.view,
        status: product.status,
        Category: product.Category,
        ImgDetails: product.ImgDetails,
        Brand: product.Brand,
        Sizes: product.Sizes,
        Nccs: product.Nccs,
        totalQuantitySold:
          sortedProducts.find((item) => item.productID === product.id)
            ?.totalQuantity || 0, // Tổng số lượng đã bán
      }))
      .sort((a, b) => b.totalQuantitySold - a.totalQuantitySold); // Sắp xếp giảm dần
  } catch (err) {
    console.error("Error fetching product popular:", err);
    throw err;
  }
};

module.exports = {
  create,
  update,
  destroy,
  search,
  searchId,
  searchOrder,
  searchProductPopular,
};
