module.exports = app =>{
    const express = require('express')
    //新建子路由
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categories',async(req,res)=>{
        //创建分类
        const category = await Category.create(req.body)
        res.send(category)
    })

    router.put('/categories/:id',async(req,res)=>{
        const category = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(category)
    })

    router.delete('/categories/:id',async(req,res)=>{
        await Category.findByIdAndDelete(req.params.id)
        res.send({
            status: "succeed"
        })
    })

    router.get('/categories',async(req,res)=>{
        //查询分类，限100条
        const category = await Category.find().limit(100)
        res.send(category)
    })
    router.get('/categories/:id',async(req,res)=>{
        const category = await Category.findById(req.params.id)
        res.send(category)
    })

    //将路由挂在app
    app.use('/admin/api',router)
}

