import request from './request'

// 3379
export const getMusicList = (param: any) => {
    return request.request({
        url: '/music/group/list',//请求的接口路径
        method: 'get',//请求方法
        params: param
    })
}