import axios from "axios";
import { Message } from 'element-ui'
import store from "@/store";
import { getToken } from '@/utils/auth'
//引用axios

//创建对象
const request = axios.create({
	timeout: 15000,// 请求超时时间
	headers: {
		'Content-Type': "application/json; charset=utf-8"//我们返回的是一个json数据
	},
	// baseURL:'https://grit-api.foxconnedu.com/'//api的url
	baseURL: 'http://localhost:7219' //api的url
})

// 添加请求拦截器
// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，
// request 拦截器
request.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['ec-token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
// http response 拦截器（所有接收到的请求都要从这儿过一次
request.interceptors.response.use(
	response => {

		// console.log("response ->" + response)
		// 2xx 范围内的状态码都会触发该函数。
  	// 对响应数据做点什么
		let res = response.data

		if (res.code === 200) {
			return response
		} else if(res.code === 201 || res.code === 500) {
			Message({
				message: res.msg,
				type: 'warning'
			})
			return response
		} else if(res.code === 402) {
			return 
		} else {				
			return 
		}
	},
  // 对响应错误做点什么
	error => {
		// console.log(error)
		if (error.response.data) {
			error.massage = error.response.data.msg
		}
    //401代表权限不够
		if (error.response.status === 401) {
      
		}
		return 
	}
)

export default request
