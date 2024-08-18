const User = require("../models/User")
const {comparePassword} = require("../services/userService")
const {assignJwt} = require("../services/authService")
const {logError} = require("../utils/functions")

async function login_post(req, res) {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username : username})
        if (user) {
            const isPasswordCorrect = await comparePassword(user.password, password);
            if (isPasswordCorrect) {
                const token = assignJwt(user._id);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                });
                res.status(200).json({ id: user._id });
            }else {
                logError("Unauthenticated", req)
                res.status(401).json({message : "Unauthenticated"})
            }
        } 
        else {
            logError("Unauthenticated", req)
            res.status(401).json({message : "Unauthenticated"})
        }
            
    } catch (error) {
        logError(error, req)
        res.status(500).json({message : "Internal Server Error"})
    }
}

function logout_get(req, res) {
    res.cookie("jwt", '', { maxAge: 1 });
    res.status(200).redirect("/questions")
}


function login_get(req, res) {
    const view_data = {
        title : "تسجيل الدخول"
    }
    res.render("./login/get", view_data)
}

module.exports = {
    login_post ,
    logout_get , 
    login_get
}