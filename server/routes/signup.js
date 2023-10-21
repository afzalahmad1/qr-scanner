const express = require("express")
const router = express();

const {registerUser, loginUser}= require("../controllers/signup")
// const { isAuth } = require("../middlewares/AuthMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;