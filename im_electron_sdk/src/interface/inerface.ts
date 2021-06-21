interface TIMInitFun {
    (sdkappid:number,sdkconfig:Buffer): number;
}
interface TIMLoginFun {
    (userID:Buffer,userSig:Buffer,callback:Buffer,data:Buffer): number;
}
interface CommonCallbackFun {
    (code:number,desc:Buffer,json_data:Buffer,data:Buffer): number;
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
    TIMLogin:TIMLoginFun
}
interface loginParam {
    userID:string,
    userSig:string,
    callback:CommonCallbackFun,
    data?:string
}
export {
    initConfig,
    sdkconfig,
    libMethods,
    loginParam,
    CommonCallbackFun
}