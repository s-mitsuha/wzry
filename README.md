# wzry

## 准备工作

node (自带npm )

```js
//https://nodejs.org/zh-cn/
```

cnpm (自己配)

mongodb 

```js
百度链接：
//https://pan.baidu.com/s/1xhFsENTVvU-tnjK9ODJ7Ag 
密码：ctyy
```

## server

```js
mkdir server 
npm init -y 
//热启动插件
cnpm i nodemon
//package.json 添加启动命令，启动项目用npm run serve
"serve": "nodemon index.js",
//安装express插件，使用express框架
//安装mongoose插件，使用mongodb数据库
//安装cors插件，允许跨域
 cnpm i express@next mongoose cors
```

mongodb数据库

```js
//连接数据库
mongoose.connect(
    'mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify---Mongoose: `findOneAndUpdate()` and `findOneAndDelete()`去掉提示warn
        useFindAndModify: false
})
```

--表格以文件形式存在(这里以item.js)

```js
const schema = new mongoose.Schema({
    //列名:数据格式
    name: {type: String},
    icon: {type: String}
})
//将mongoose的模型Item暴露出去
module.exports = mongoose.model('Item',schema)
```

增删改查

```js
//get请求时获取req的参数时使用
cnpm i body-parse

app.post('路径'async(req,res)=>{
    const Item = require('../../models/Item') 
    
    const res = Item.create(req.body)//增
    const res = Item.findByIdAndDelete(req.params.id)//删
    const res = Item.findByIdAndUpdate(req.params.id,req.body)//改
    const res = Item.find().populate(列名)//查全部,populate(列名)关联查询，findOne({条件})findById(id)
})
```

crud把增删改查通用化

```js
// inflection，处理单词，转换成单数形式，并首字母大写 
cnpm i inflection

app.use(
     '/admin/api/rest/:resourse',
    //中间件，next表示执行后续操作
     async(req,res,next)=>{ 
        const modelName = require('inflection').classify(req.params.resourse)
        req.model = require(`../../models/${modelName}`)
        next()
    },router)
```

上传文件

```js
// multer上传文件的中间件
cnpm i multer

    // 执行multer并传一个路径参数给他
    const upload = require('multer')({
        dest: __dirname+'/../../upload'
    })
    // single()表示上传单个文件，参数是接收的参数名
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        // 拼接url传回给客户端
        file.url = 'http://localhost:3000/upload/'+file.filename
        res.send(file)
    })
```

登录

```js
// bcrypt对密码进行加密
// bcrypt的版本根据官网来
//https://www.npmjs.com/package/bcrypt
cnpm i bcrypt@3.0.6

// jsonwebtoken生成token
cnpm i jsonwebtoken

app.post('/admin/api/login',async(req,res)=>{
        // 解构赋值
        const {username,password} = req.body
        //查用户
        //findOne(Opt)根据条件查找一个用户
        //select(col)将对应字段也查找出来
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422 ,'用户不存在')
        //对密码
        // compare(password,hash)比对明文密文是否一致
        const isvalid = require('bcrypt').compareSync(password,user.password)
        assert(isvalid, 422 ,'密码错误')
        //返token       
        // jwt.sign(唯一的字段,密钥)，这里秘钥以全局变量存储
        const token = jwt.sign({id:user._id},app.get('secret'))
        res.send({token:token,user:username})
    })
```

错误处理

```js
//http-assert生成错误代码
cnpm i http-assert

//可用assert()代替
if(!'要验证的值'){
    res.status('返回的状态码').send({message:'返回的信息'})
}


//使用方法
assert(要验证的值, 返回的状态码 ,返回的信息)
//错误处理函数（捕捉上面的报错信息封装成json返回给前端）
app.use((err,req,res,next)=>{
    if(err.status){          res.status(err.status).send({message:err.message})
    }
})

```

权限校验中间件

```js
async(req,res,next)=>{
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
```

（中间件独立封装作为函数，使用时引入并执行）

## admin

```js
//会把package里的module一并安装
cnpm i

//http.js
//将axios进行封装并暴露成一个http对象，在main.js全局导入

//router/index.js 自己看，有注释

//赋值方法
user:{name:'xxx',id:'xxxxxxxxxx'}
this.model.name = user.name
//显示赋值，当this.model原先是个空对象，直接给对象里面的属性赋值时可以用
this.$set(this.model,'name',user.name)
//解构赋值，等于直接把user的属性拿出来
{name,id} = user

// 路由守卫，前端权限校验
router.beforeEach((to, from, next) => {
  //校验目标地址的权限，这里校验地址meta中是否isPublic
  if (!to.meta.isPublic && !sessionStorage.getItem('token')) next('/login')
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

// 混入公共的vue属性
Vue.mixin({
    data(){
        return{}
    },
    methods:{}
})
```

