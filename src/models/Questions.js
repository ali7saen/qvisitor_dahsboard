const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    choice_1: { type: String ,required: false, default: null },
    choice_2: { type: String , required: false, default: null },
    choice_3: { type: String, required: false, default: null },
    type: { type: String, required: true },
    age_group: { type: String, required: true },
}, {timestamps : true});

module.exports = mongoose.model("Questions", QuestionSchema)