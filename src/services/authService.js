require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_KEY_SECRET;

function checkApiKey(api_key) {
    const API_KET = process.env.API_KEY;
    if (api_key == API_KET)
        return true;
    else
        return false
}

function assignJwt(id) {
    const token = jwt.sign({
        data: id
    }, JWT_SECRET, { expiresIn: '3d' });
    return token;
}

function verifyJwt(token) {
    try {
        const id = jwt.verify(token, JWT_SECRET);
        return { id: id }
    } catch (error) {
        return { error: error.message }
    }

}

module.exports = {
    checkApiKey,
    assignJwt,
    verifyJwt
}