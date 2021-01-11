module.exports = () =>{
    return async(req,res,next)=>{
        // inflection，处理单词，转换成单数形式，并首字母大写
        const modelName = require('inflection').classify(req.params.resourse)
        req.model = require(`../models/${modelName}`)
        next()
    }
}