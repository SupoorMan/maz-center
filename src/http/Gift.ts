import request from './request'

// 3379
export const getGift = (param: any) => {
    return request.request({
        url: '/gqgVip/get',//请求的接口路径
        method: 'get',//请求方法
        params: param
    })
}

export const addGift = (param: any) => {
    return request.request({
        url: '/gqgVip/update',//请求的接口路径
        method: 'post',//请求方法
        data: param
    })
}