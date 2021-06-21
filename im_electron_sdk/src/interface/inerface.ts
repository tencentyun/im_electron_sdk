interface TIMInitFun {
    (sdkappid:number,sdkconfig:Buffer): number;
}
interface TIMLoginFun {
    (userID:Buffer,userSig:Buffer,callback:Buffer,user_data:Buffer): number;
}
interface TIMLogoutFun {
    (callback:Buffer,user_data:Buffer): number;
}
interface TIMUninitFun {
    (): number;
}
interface TIMGetLoginStatusFun {
    (): number;
}
interface TIMGetSDKVersionFun {
    (): Buffer;
}
interface TIMGetServerTimeFun {
    (): number;
}
interface CommonCallbackFun {
    (code:number,desc:Buffer,json_data:Buffer,data:Buffer): void;
}
interface initConfig {
    sdkappid:number,
}
interface sdkconfig {
    sdkappid:number,
    consoleTag:string,
    Imsdklib:libMethods
}
interface libMethods {
    TIMInit:TIMInitFun,
    TIMLogin:TIMLoginFun,
    TIMUninit:TIMUninitFun,
    TIMGetSDKVersion:TIMGetSDKVersionFun,
    TIMGetServerTime:TIMGetServerTimeFun,
    TIMLogout:TIMLogoutFun,
    TIMGetLoginStatus:TIMGetLoginStatusFun
}
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
    initConfig,
    sdkconfig,
    libMethods,
    loginParam,
    CommonCallbackFun,
    logoutParam
}