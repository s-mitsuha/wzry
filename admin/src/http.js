import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    //设置基本路径
    baseURL:"http://localhost:3000/admin/api"
})

//添加一个请求拦截器
// Add a request interceptor
http.interceptors.request.use( async (config)=> {
  // Do something before request is sent
  const token = await sessionStorage.getItem('token')
  if(token){
    config.headers.Authorization = 'Beare ' + token
  }
  return config;
}, (error)=> {
  // Do something with request error
  return Promise.reject(error);
});



//添加一个响应拦截器
// Add a response interceptor
http.interceptors.response.use(res=> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
  }, err=> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(err.response.data.message){
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
      console.log(err.response)
      if(err.response.status === 401){
        router.push('/login')
      }
    }
    
    return Promise.reject(err);
  });

export default http;