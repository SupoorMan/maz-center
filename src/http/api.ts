// // api.ts
// import service from './request'
// const baseurl = "http://127.0.0.1:7788/mall"; // 后台地址

// /**
// * 封装get请求
// * @param {string} url 请求连接
// * @param {Object} params 请求参数
// * @param {Object} header 请求的header头
// */
// export const get = (url: string, params: object): object => {
//     return service({
//         url: baseurl + url,
//         method: 'get',
//         params: params,
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     });
// }

// /**
// * 封装post请求
// * @param {string} url 请求连接
// * @param {Object} params 请求参数
// * @param {Object} header 请求的header头
// */
// export const post = (url: string, params: object):object => {
//     return service({
//         url:  baseurl + url,
//         method: 'post',
//         data: params,
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     });
// }


