const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String},
    title: {type: String},
    categories:[{type: mongoose.SchemaTypes.ObjectId,ref: "Category"}],
    scores:{
        difficult:{type:Number},
        skill:{type:Number},
        attack:{type:Number},
        survive:{type:Number}
    },
    skin:{type:String},
    skills:[
        {
            skill:{
                name:{type:String},
                icon:{type:String},
                cooling:{type:String},
                cost:{type:String},
                decoration:{type:String}
            },
            tip:{type:String}
        }
    ],
    tailWindItems:[{type:mongoose.SchemaTypes.ObjectId,ref:"Item"}],
    headWindItems:[{type:mongoose.SchemaTypes.ObjectId,ref:"Item"}],
    usageTip:{type:String},
    battleTip:{type:String},
    teamTip:{type:String}
})
module.exports = mongoose.model('Hero',schema)