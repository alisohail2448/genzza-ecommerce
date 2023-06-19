const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware.js");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImage.js");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl.js");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);


router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
