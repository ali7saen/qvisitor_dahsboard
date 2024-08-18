const {imageValidation, excelValidation} = require("../services/multerService")
const {getRelativePathForImage} = require("../utils/functions");


function validateImage(req, res, next) {
    const result = imageValidation(req);
    if (result.message) 
        res.status(400).json({error : result.message})
    else{
        req.body['image_url'] = getRelativePathForImage(req.file.path);
        next()
    } 
}


function validateExcelFile(req, res, next) {
    const result = excelValidation(req);
    if (result.message) 
        res.status(400).json({error : result.message})
    else{
        req.body['excel_url'] = getRelativePathForImage(req.file.path);
        next()
    } 
}


module.exports = {
    validateImage,
    validateExcelFile
}