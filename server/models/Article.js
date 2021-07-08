const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    title: {type: String},
    body: {type: String}
},{ 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    } 
})

module.exports = mongoose.model('Article',schema)