const express = require('express')

const app = express()
//允许跨域
app.use(require('cors')())
//加入中间件，将请求参数转换成json
app.use(express.json())
// 把/upload注册为静态资源
app.use('/upload',express.static(__dirname+'/upload'))
//注册一个全局变量，作为生成token的密钥
app.set('secret','hickhincnfu')

//引用router/index并执行他，同时把app传给他
require('./routes/admin')(app)
require('./plugins/db.js')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})