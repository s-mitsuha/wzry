module.exports = {
    lintOnSave: true, //是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    outputDir: __dirname + '/../server/admin', //打包到指定文件夹
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin'
    : '/'       //判断编译环境，发布环境下就打包路径加上'/admin'否则以'/'打包
}