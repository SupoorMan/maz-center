import request from './request'

export const getKey = () => {
    return request.request({
        url: '/auth/getKey',//请求的接口路径
        method: 'post',//请求方法
    })
}

export const doKey = (param:string) => {
    return request.request({
        url: '/auth/doKey',//请求的接口路径
        method: 'get',//请求方法
        params: {param}
    })
}

export const encodeRsa = (param:string) => {
    return request.request({
        url: '/auth/encodeRsa',//请求的接口路径
        method: 'get',//请求方法
        params: {param}
    })
}

export const decodeRsa = (param:string,param1:string) => {
    return request.request({
        url: '/auth/decodeRsa',//请求的接口路径
        method: 'get',//请求方法
        params: {param,param1}
    })
}