module.exports = () =>{
    // 返回一个函数
    return async(req,res,next)=>{
        const assert = require('http-assert')
        // 拿到authorization，如果不存在就设为空
        //以空格为界限分割字符串
        //pop()取数组最后一个元素
        const token = (req.headers.authorization || ' ').split(' ').pop()
        assert(token, 401 ,'请先登录')
        // 把token解码成{id:,iat:}的形式
        const {id} = require('jsonwebtoken').verify(token,req.app.get('secret'))
        assert(id, 401 ,'请先登录')
        const user = require('../models/AdminUser').findById(id)
        assert(user, 401 ,'请先登录')
        await next()
    }
}