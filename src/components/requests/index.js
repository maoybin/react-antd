import axios from 'axios'

import {message} from 'antd'

const isDev = process.env.NODE_ENV ==='development'

const servers = axios.create({

    // http://rap2api.taobao.org/app/mock/236029/api/v1/articleList

    baseURL:isDev ? 'http://rap2api.taobao.org/app/mock/236029' :''
})

servers.interceptors.request.use((config)=>{

    config.data=Object.assign({},config.data,{
        // authToken:window.localStorage.getItem('authToken')
        authToken:'ljkjklgakgjdslglsajglasjglaslkgj'
    })

    return config;
})


servers.interceptors.response.use((resp)=>{


    // console.log(resp)


    if(resp.data.code === 200){

        return resp.data.data;

    }else{



        //全局错误处理
        message.error(resp.data.errMsg)
    }

   
})

export const getArticalList  = (offset=0,limited=10) => {

    return servers.post('/api/v1/articleList',{

        offset,
        limited

    })
}   


