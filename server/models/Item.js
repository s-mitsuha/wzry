const mongoose = require('mongoose')
//分类模型
const schema = new mongoose.Schema({
    name: {type: String},
    icon: {type: String}
})

//导出模型并命名Category
module.exports = mongoose.model('Item',schema)