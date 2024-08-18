const { encryptPassword } = require("../services/userService");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const {logError} = require("../utils/functions")
async function addUser_post(req, res) {
  const user_data = req.body;
  try {
    user_data.password = await encryptPassword(user_data.password);
    await User.create(user_data);
    res.status(200).json({});
  } catch (error) {
    logError(error, req)
    fs.unlinkSync(path.join(__dirname, "../../public", req.body.image_url));

    if (error.code === 11000)
      res.status(400).json({message: "اسم المستخدم مستخدم بالفعل. يرجى اختيار اسم مستخدم آخر.",});

    else if (error.name === "ValidationError")
      res.status(400).json({ message: error.message });

    else
      res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addUser_post,
};
