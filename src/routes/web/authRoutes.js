const router = require("express").Router();
const {login_post, login_get} = require("../../controllers/authController")

router.post("/login", login_post);

router.get("/login", login_get)

module.exports = router;