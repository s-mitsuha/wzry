import axios from 'axios'

const http = axios.create({
    // 设置基本路径
    // 设置  发布路径 或 开发路径
    baseURL: process.env.VUE_API_APP_URL || '/web/api'
    // baseURL:"http://localhost:3000/web/api"
})


export default http;