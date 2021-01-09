const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {type: String},
    password: {
        type: String,
        // 不能被搜索，这样前台展示时不会以密文再被存储
        select: false,
        set(val){
            //hashSync()加密的异步方法
            //hashSync(val,diff),val是要加密的参数,diff加密的系数，系数越高，加密越好，耗时越久
            return require('bcrypt').hashSync(val,12)
        }
    }
})

module.exports = mongoose.model('AdminUser',schema)