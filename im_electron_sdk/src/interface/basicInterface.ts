
import { libMethods } from "./libMethodInterface"

interface CommonCallbackFun {
    (code: number, desc: string, json_param: string, user_data: string): void;
}

interface initConfig {
    sdkappid: number,
}

interface sdkconfig {
    sdkappid: number,
    consoleTag: string,
    Imsdklib: libMethods,

}
interface commonResponse {
    code: number,
    desc?: string,
    json_param?: string,
    user_data?: string
}
interface TIMSetNetworkStatusListenerCallback {
    (status:number,code:number,desc:string,user_data:string):void;
}
interface TIMSetKickedOfflineCallback {
    (user_data:string):void;
}
interface TIMSetUserSigExpiredCallback{
    (user_data:string):void;
}
interface TIMSetNetworkStatusListenerCallbackParam {
    callback:TIMSetNetworkStatusListenerCallback,
    userData:string,
}
interface TIMSetKickedOfflineCallbackParam {
    callback:TIMSetKickedOfflineCallback,
    userData:string,
}
interface TIMSetUserSigExpiredCallbackParam {
    callback:TIMSetUserSigExpiredCallback,
    userData:string,
}
export {
    initConfig,
    sdkconfig,
    CommonCallbackFun,
    commonResponse,
    TIMSetNetworkStatusListenerCallback,
    TIMSetKickedOfflineCallback,
    TIMSetUserSigExpiredCallback,
    TIMSetNetworkStatusListenerCallbackParam,
    TIMSetKickedOfflineCallbackParam,
    TIMSetUserSigExpiredCallbackParam
}