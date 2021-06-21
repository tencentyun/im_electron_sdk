import { CommonCallbackFun} from "./basicInterface";

interface loginParam {
    userID:string,
    userSig:string,
    callback:CommonCallbackFun,
    user_data?:string
}
interface logoutParam {
    callback:CommonCallbackFun,
    user_data?:string
}

export {
    loginParam,
    logoutParam
}