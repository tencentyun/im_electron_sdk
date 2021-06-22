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
interface TIMGetLoginUserIDFun {
    (callback:CommonCallbackFun,user_data:Buffer):number;
}
interface TIMSetNetworkStatusListenerCallbackFun {
    (callback:CommonCallbackFun,user_data:Buffer):number;
}
interface TIMConvCreateFun {
    (conv_id:Buffer,conv_type:number,callback:Buffer,user_data:Buffer):number;
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
    // timbase start
    TIMInit: TIMInitFun,
    TIMLogin: TIMLoginFun,
    TIMUninit: TIMUninitFun,
    TIMGetSDKVersion: TIMGetSDKVersionFun,
    TIMGetServerTime: TIMGetServerTimeFun,
    TIMLogout: TIMLogoutFun,
    TIMGetLoginStatus: TIMGetLoginStatusFun,
    TIMGetLoginUserID: TIMGetLoginUserIDFun,
    TIMSetNetworkStatusListenerCallback:TIMSetNetworkStatusListenerCallbackFun,
    // timbase end

    // conversation start
    TIMConvCreate:TIMConvCreateFun,
    // converastion end


    // group start
    TIMGroupCreate: TIMGroupCreateFun,
    TIMGroupDelete: TIMGroupDeleteFun,
    TIMGroupJoin: TIMGroupJoinFun,
    // group end
}

export {
    libMethods
}