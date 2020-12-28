module.exports = app =>{
    const express = require('express')
    //新建子路由
    const router = express.Router({
        // 合并路由参数
        mergeParams: true
    })
    // const Category = require('../../models/Category')
    router.post('/',async(req,res)=>{
        //创建分类
        const  model = await req.model.create(req.body)
        res.send( model)
    })

    router.put('/:id',async(req,res)=>{
        const  model = await req.model.findByIdAndUpdate(req.params.id,req.body)
        res.send( model)
    })

    router.delete('/:id',async(req,res)=>{
        await req.model.findByIdAndDelete(req.params.id)
        res.send({
            status: "succeed"
        })
    })

    router.get('/',async(req,res)=>{
        //查询分类，限100条
        // populate 关联查询，把关联的值查出来
        const queryOptions = {}
        // model文件上module.exports = mongoose.model('Category',schema)，这里'Category'就是modelName
        const modelName = req.model.modelName
        if(modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        // setOptions({populate:'parent'})添加条件
        const  model = await  req.model.find().setOptions(queryOptions).limit(100)
        res.send( model)
    })
    router.get('/:id',async(req,res)=>{
        const  model = await  req.model.findById(req.params.id)
        res.send( model)
    })

    //将路由挂在app
    // 添加中间件，以路由中的参数找到对应模型，挂载到请求参数列表中
    // next参数指明后续操作，
    // 改动路由添加/rest 以便区分后续添加的路由，这里rest开头的都是使用通用接口
    // 这里改写成CRUD增删改查通用接口
    app.use('/admin/api/rest/:resourse',async(req,res,next)=>{
        // inflection，处理单词，转换成单数形式，并首字母大写
        const modelName = require('inflection').classify(req.params.resourse)
        req.model = require(`../../models/${modelName}`)
        next()
    },router)
}

