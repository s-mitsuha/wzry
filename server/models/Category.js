const mongoose = require('mongoose')
//分类模型
const schema = new mongoose.Schema({
    name: {type: String},
    // 数据类型是模型id，而且必须指明关联的模型
    parent: {type: mongoose.SchemaTypes.ObjectId, ref:"Category"}
})

//导出模型并命名Category
module.exports = mongoose.model('Category',schema)