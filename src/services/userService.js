const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

async function comparePassword (hashPassword, password) {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
}

module.exports = {
    encryptPassword,
    comparePassword
}
