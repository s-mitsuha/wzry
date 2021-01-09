const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    title: {type: String},
    body: {type: String},
    date: {type:String}
})

module.exports = mongoose.model('Article',schema)