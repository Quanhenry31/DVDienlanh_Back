const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const advRouter = require("./advertisement");
const paymentRouter = require("./payment");
const bannerRouter = require("./banner");
const categoryRouter = require("./category");
const imageRouter = require("./image");
const nccRouter = require("./ncc");
const noiRouter = require("./notification");
const orderRouter = require("./order");
const orderDetailRouter = require("./orderDetail");
const shipRouter = require("./shiptype");
const sizeRouter = require("./size");
const voucherRouter = require("./voucher");
const brandRouter = require("./brand");
const exportRouter = require("./export");
const productDetailRouter = require("./productDetail");
const commentRouter = require("./comment");
const replyRouter = require("./reply");
const addressRouter = require("./address");
const userChatRouter = require("./userChats");
const categoriBlogRouter = require("./categoriBlog");
const blogsRouter = require("./blog");
const commentBlogRouter = require("./commentBlog");

const servicesOrderRouter = require("./servicesOrder");
const servicesCategoriesRouter = require("./servicesCategories");
const servicesOrderPayRouter = require("./servicesOrderPay");

const servicesUsuallyRouter = require("./servicesUsually");
const serviceCategoriesUsuallyRouter = require("./serviceCategoriesUsually");
const servicesTimeUsuallyRouter = require("./servicesTimeUsually");
const servicesOrderPaysUsuallyRouter = require("./servicesOrderPaysUsually");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/advs", advRouter);
router.use("/payments", paymentRouter);
router.use("/banners", bannerRouter);
router.use("/categorys", categoryRouter);
router.use("/images", imageRouter);
router.use("/nccs", nccRouter);
router.use("/nois", noiRouter);
router.use("/orders", orderRouter);
router.use("/orderDetails", orderDetailRouter);
router.use("/ships", shipRouter);
router.use("/sizes", sizeRouter);
router.use("/vouchers", voucherRouter);
router.use("/brands", brandRouter);
router.use("/productDetails", productDetailRouter);
router.use("/comments", commentRouter);
router.use("/replys", replyRouter);
router.use("/address", addressRouter);
router.use("/userChats", userChatRouter);
router.use("/categoriBlogs", categoriBlogRouter);
router.use("/blogs", blogsRouter);
router.use("/commentBlogs", commentBlogRouter);

router.use("/servicesOrder", servicesOrderRouter);
router.use("/servicesCategories", servicesCategoriesRouter);
router.use("/servicesOrderPays", servicesOrderPayRouter);

router.use("/servicesUsually", servicesUsuallyRouter);
router.use("/serviceCategoriesUsually", serviceCategoriesUsuallyRouter);
router.use("/servicesTimeUsually", servicesTimeUsuallyRouter);
router.use("/servicesOrderPaysUsually", servicesOrderPaysUsuallyRouter);

router.use("/exports", exportRouter);

module.exports = router;
