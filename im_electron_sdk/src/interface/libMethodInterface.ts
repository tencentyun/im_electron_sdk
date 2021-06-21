import { CommonCallbackFun } from "./basicInterface";

interface TIMInitFun {
    (sdkappid:number,sdkconfig:Buffer): number;
}

interface TIMUninitFun {
    (): number;
}

interface TIMLoginFun {
    (userID:Buffer,userSig:Buffer,callback:Buffer,user_data:Buffer): number;
}
interface TIMLogoutFun {
    (callback:Buffer,user_data:Buffer): number;
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

// ==========Interface For Group Start===========
interface TIMGroupCreateFun {
    (params: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}

interface TIMGroupDeleteFun {
    (groupId:Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}

interface TIMGroupJoinFun {
    (groupId:Buffer, hello_msg: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}

// ==========Interface For Group End===========


interface libMethods {
    TIMInit:TIMInitFun,
    TIMLogin:TIMLoginFun,
    TIMUninit:TIMUninitFun,
    TIMGetSDKVersion:TIMGetSDKVersionFun,
    TIMGetServerTime:TIMGetServerTimeFun,
    TIMLogout:TIMLogoutFun,
    TIMGetLoginStatus:TIMGetLoginStatusFun
    TIMGroupCreate: TIMGroupCreateFun,
    TIMGroupDelete: TIMGroupDeleteFun,
    TIMGroupJoin: TIMGroupJoinFun,
}

export {
    libMethods
}