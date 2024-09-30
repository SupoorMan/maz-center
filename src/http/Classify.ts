import request from './request'

class Param {

}

export const classifyList = () => {
    return request.request({
        url: '/classify/manageList',//请求的接口路径
        method: 'get',//请求方法
    })
}
