const express = require("express");
const { Listing, AddProduct, fetchImg } = require("../controllers/user.controller");
const { upload } = require("../middleware/middleware");

const UserRoutes = express();

UserRoutes.get("/listing", Listing);
UserRoutes.get("/img/:id", fetchImg);
UserRoutes.post("/add", upload.array("attachments"), AddProduct);

module.exports = { UserRoutes };