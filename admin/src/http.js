import axios from 'axios'

const http = axios.create({
    //设置基本路径
    baseURL:"http://localhost:3000/admin/api"
})

export default http;