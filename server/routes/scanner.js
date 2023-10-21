const {insert , getAll , deleteById} = require("../controllers/scanner")
const express = require("express");
const { isAuth } = require("../middleware/AuthMiddleware");
const router = express();

router.get("/get", isAuth,  getAll);
router.post("/add",isAuth,  insert);
router.delete("/delete/:id",isAuth,  deleteById);

module.exports = router;