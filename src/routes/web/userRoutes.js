const router = require("express").Router();
const {validateImage} = require("../../middlewares/multerMiddlewares")
const {addUser_post} = require("../../controllers/userController")
const {uploadImage} = require("../../services/multerService")
const {logout_get} = require("../../controllers/authController")
router.post("/add",uploadImage.single('image'),validateImage, addUser_post)
router.get("/logout", logout_get);


module.exports = router;