const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const controller = require("../../controllers/admin/product-category.controller.js");
const validate = require("../../validates/admin/validate.product-category");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

module.exports = router;
