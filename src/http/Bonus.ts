import request from './request'

class Param {
    'phone': String
    'dataTime': String
}

export const get = (param: any) => {
    return request.request({
        url: '/bonus/get',//请求的接口路径
        method: 'get',//请求方法
        params: param
    })
}