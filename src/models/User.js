const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String,
        required: true,
        match: [/^[A-Za-z_]+$/, 'يمكن أن يحتوي اسم المستخدم على الأحرف والشرطات السفلية (_) فقط'],
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    image_url: { 
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Users", userSchema)