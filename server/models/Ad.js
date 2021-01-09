const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {type: String},
    ads:[{
        url:{type:String},
        img:{type:String}
    }]
})

module.exports = mongoose.model('Ad',schema)