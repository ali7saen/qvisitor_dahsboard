require("dotenv").config();
const User = require("../models/User");
const {checkApiKey, verifyJwt} = require("../services/authService")


function authenticateApiKey (req, res, next){
    // get auth headers and check if it send
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    } 

    
    const api_key = authHeader.split(" ")[1]
    const isValid = checkApiKey(api_key)

    if (!isValid) {
        return res.status(403).json({ error: 'Invalid API key' });
    }
    next();
}

async function authenticateJwt(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = verifyJwt(token);
        if(decoded.id) {
            const user = await User.findById(decoded.id.data);
            if (user) {
                res.locals.user = user;
                next();
            } else {
                res.redirect("/auth/login");
            }
        }
        else
            res.redirect("/auth/login");
    } 
    else 
        res.redirect("/auth/login");
}

async function is_login (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = verifyJwt(token);
        if(decoded.id) {
            const user = await User.findById(decoded.id.data);
            if (user) 
                res.redirect("/questions");
            else 
                next();
            
        }
        else 
            next();   
    } else {
        next();
    }
}


module.exports = {
    authenticateApiKey,
    authenticateJwt,
    is_login
}