import { CommonCallbackFun } from "./basicInterface";

interface loginParam {
    userID:string,
    userSig:string,
    callback:CommonCallbackFun,
    userData?:string
}
interface logoutParam {
    callback:CommonCallbackFun,
    userData?:string
}
interface getLoginUserIDParam {
    callback:CommonCallbackFun,
    userData?:string
}

export {
    loginParam,
    logoutParam,
    getLoginUserIDParam,
}