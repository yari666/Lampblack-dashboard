import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "http://test.soot.xhs-sz.com:9065/api/v1"
// http://test.soot.xhs-sz.com:9065/api/v1/screenDisplay/
// http://test.soot.xhs-sz.com:9065/api/v1/user/authrization

// get请求
export default {
    login(params) {
        return http.post(`${resquest}/user/authrization`, params)
    },
    companyForMap(params) {
        return http.get(`${resquest}/screenDisplay/companyForMap`, params)
    }
}