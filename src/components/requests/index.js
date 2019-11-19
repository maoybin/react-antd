import axios from 'axios'

import {message} from 'antd'

const isDev = process.env.NODE_ENV ==='development'

const servers = axios.create({

    // http://rap2api.taobao.org/app/mock/236029/api/v1/articleList

    baseURL:isDev ? 'http://rap2api.taobao.org/app/mock/236029' :''
})

const servers1 = axios.create({

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


    console.log(resp)


    if(resp.data.code === 200){

        return resp.data.data;

    }else{

        console.log('错误了')

        //全局错误处理
        message.error(resp.data.errMsg)
    }

   
})

// 获取文章列表
export const getArticalList  = (offset=0,limited=10) => {

    return servers.post('/api/v1/articleList',{

        offset,
        limited

    })
}   


// 获取文章列表
export const articalDelete  = (id) => {

    return servers.post(`/api/v1/articalDelete/:${id}`)
}


// 获取文章信息
export const getArticalDetail  = (id) => {

    return servers.post(`/api/v1/getArtical/:${id}`)
}


// 保存文章
export const saveArticle  = (id,data) => {

    return servers.post(`/api/v1/article/:${id}`,data)
}

// 保存文章
export const getArticleAmount  = () => {

    return servers.post(`/api/v1/articalAmount`)
}


// 获取通知列表
export const getNotifications  = () => {

    return servers.post(`/api/v1/notification`)
}

// 获取通知列表
export const loginRequest  = (userInfo) => {

    // console.log(userInfo)

    return servers1.post(`/api/v1/login`,userInfo)
}












