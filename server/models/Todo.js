
const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    task:String,
    completed:Boolean,
    tenantId:String,
    userId:String
});

 todoSchema.index({ tenantId: 1, completed: 1 });

module.exports = mongoose.model('Todo',todoSchema);