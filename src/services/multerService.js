const multer = require("multer");

const path = require("path");



// multer configuration to users image uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../../public/uploads/"))
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        // Accept the file
        callback(null, true);
    } else {
        // Reject the file
        req.fileValidationError = "Only JPG images are allowed.";
        callback(null, false);
    }
}; 
const uploadImage = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB limits for personal image
    },
    fileFilter: fileFilter
});

const imageValidation = (req) => {
    if (!req.file) {
        // Handle the error message from file filter
        if (req.fileValidationError) 
            return{ message: req.fileValidationError };
        return{ message: "No image uploaded." };
        
    }
    const fileSizeInBytes = req.file.size;
    const maxSizeInBytes = 1024 * 1024 * 2; // 2 MB (same as the limit set in Multer)

    if (fileSizeInBytes > maxSizeInBytes) 
        return { message: "Image size exceeds the limit." }

    return {}
}




// multer configuration to excel file uploads
const storage_excel = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../db"))
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});
const excelFilter = (req, file, callback) => {
    if (
        file.mimetype === "application/vnd.ms-excel" || 
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        // Accept the file
        callback(null, true);
    } else {
        // Reject the file
        req.fileValidationError = "Only Excel files are allowed.";
        callback(null, false);
    }
};
const uploadExcel = multer({
    storage : storage_excel,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB limits 
    },
    fileFilter: excelFilter
});

const excelValidation = (req) => {
    if (!req.file) {
        // Handle the error message from file filter
        if (req.fileValidationError) 
            return{ message: req.fileValidationError };
        return{ message: "No excel file uploaded." };
    } 
    else {
        const fileSizeInBytes = req.file.size;
        const maxSizeInBytes = 1024 * 1024 * 5; // 5 MB limits 
    
        if (fileSizeInBytes > maxSizeInBytes) 
            return { message: "excel file size exceeds the limit." }
        return {}
    }
}




module.exports = {
    uploadImage,
    imageValidation,
    uploadExcel,
    excelValidation
}
