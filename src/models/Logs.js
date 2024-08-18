const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema({
    
    level: { type: String, enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'], required: true },
    message: { type: String, required: true },
    method: { type: String},
    url: { type: String},
    ip: { type: String},
    stack: { type: String},
    additionalInfo: { type: mongoose.Schema.Types.Mixed },
    requestType: { type: String, required: false, default : "web" }
}, {timestamps : true})



const Log = mongoose.model('Log', logSchema);
module.exports = Log;
