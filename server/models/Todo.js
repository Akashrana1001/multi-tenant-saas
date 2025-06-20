
const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    task:String,
    completed:Boolean,
    tenantId:String,
    userId:String
});

module.exports = mongoose.model('Todo',todoSchema);