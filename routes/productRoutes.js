const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
  getProductsByCategory,
} = require("../controllers/productController");
const { adminMiddleware } = require("../middleware/authMiddleware");
const upload = require("../utilities/uploadImg");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get('/category/:category', getProductsByCategory);
router.post("/", addProduct , upload.single('image'));
router.patch("/:id", updateProduct ,adminMiddleware);
router.delete("/:id", deleteProduct);

module.exports = router;
