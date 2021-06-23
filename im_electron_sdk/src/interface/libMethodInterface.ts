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
interface TIMConvGetConvListFun {
    (callback:Buffer,user_data:Buffer):number;
}
interface TIMConvSetDraftFun {
    (conv_id:Buffer,conv_type:number,json_draft_param:Buffer):number;
}
interface TIMConvCancelDraftFun {
    (conv_id:Buffer,conv_type:number):number;
}
interface TIMConvDeleteFun extends TIMConvCreateFun {

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

interface TIMGroupQuitFun  extends TIMGroupDeleteFun{};

interface TIMGroupInviteMemberFun extends TIMGroupCreateFun {}

interface TIMGroupDeleteMemberFun extends TIMGroupCreateFun {}

interface TIMGroupGetJoinedGroupListFun {
    (successCallback?: CommonCallbackFun, userData?: Buffer): number;
}

interface TIMGroupGetGroupInfoListFun extends TIMGroupCreateFun {}

interface TIMGroupModifyGroupInfoFun extends TIMGroupCreateFun {}

interface TIMGroupGetMemberInfoListFun extends TIMGroupCreateFun {}

interface TIMGroupModifyMemberInfoFun extends TIMGroupCreateFun {}

interface TIMGroupGetPendencyListFun extends TIMGroupCreateFun {}

interface TIMGroupReportPendencyReadedFun {
    (timeStamp: number, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}

interface TIMGroupHandlePendencyFun  extends TIMGroupCreateFun {}

interface TIMGroupGetOnlineMemberCountFun extends TIMGroupDeleteFun {}

interface TIMGroupSearchGroupsFun extends TIMGroupCreateFun {}

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
    TIMConvGetConvList:TIMConvGetConvListFun,
    TIMConvDelete:TIMConvDeleteFun,
    TIMConvSetDraft:TIMConvSetDraftFun
    TIMConvCancelDraft:TIMConvCancelDraftFun,
    // converastion end


    // group start
    TIMGroupCreate: TIMGroupCreateFun,
    TIMGroupDelete: TIMGroupDeleteFun,
    TIMGroupJoin: TIMGroupJoinFun,
    TIMGroupQuit: TIMGroupQuitFun,
    TIMGroupInviteMember: TIMGroupInviteMemberFun,
    TIMGroupDeleteMember: TIMGroupDeleteMemberFun,
    TIMGroupGetJoinedGroupList: TIMGroupGetJoinedGroupListFun,
    TIMGroupGetGroupInfoList: TIMGroupGetGroupInfoListFun,
    TIMGroupModifyGroupInfo: TIMGroupModifyGroupInfoFun,
    TIMGroupGetMemberInfoList: TIMGroupGetMemberInfoListFun,
    TIMGroupModifyMemberInfo: TIMGroupModifyMemberInfoFun,
    TIMGroupGetPendencyList: TIMGroupGetPendencyListFun,
    TIMGroupReportPendencyReaded: TIMGroupReportPendencyReadedFun,
    TIMGroupHandlePendency: TIMGroupHandlePendencyFun,
    TIMGroupGetOnlineMemberCount: TIMGroupGetOnlineMemberCountFun,
    TIMGroupSearchGroups: TIMGroupSearchGroupsFun
    // group end
}

export {
    libMethods
}