import { TIMConvType, TIMReceiveMessageOpt } from "../enum";
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
// ==========Interface For friendship begin===========
interface TIMFriendshipGetFriendProfileListFun {
    (successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipAddFriendFun {
    (json_add_friend_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipHandleFriendAddRequestFun {
    (json_add_friend_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipModifyFriendProfileFun {
    (json_modify_friend_info_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipDeleteFriendFun {
    (json_delete_friend_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipCheckFriendTypeFun {
    (json_check_friend_list_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipCreateFriendGroupFun {
    (json_create_friend_group_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipGetFriendGroupListFun {
    (json_get_friend_group_list_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipModifyFriendGroupFun {
    (json_modify_friend_group_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipDeleteFriendGroupFun {
    (json_delete_friend_group_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipAddToBlackListFun {
    (json_add_to_blacklist_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipGetBlackListFun {
    (successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipDeleteFromBlackListFun {
    (json_delete_from_blacklist_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipGetPendencyListFun {
    (json_get_pendency_list_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipDeletePendencyFun {
    (json_delete_pendency_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipReportPendencyReadedFun {
    (time_stamp?: number, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipSearchFriendsFun {
    (json_search_friends_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMFriendshipGetFriendsInfoFun {
    (json_get_friends_info_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgSendMessageFun {
    (json_add_friend_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgCancelSendFun {
    (json_add_friend_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgFindMessagesFun {
    (json_message_id_array?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgReportReadedFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msg_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgRevokeFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msg_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgFindByMsgLocatorListFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msg_Locator_array?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgImportMsgListFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msg_array?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgSaveMsgFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msg_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgGetMsgListFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_get_msg_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgDeleteFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msgdel_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgListDeleteFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, json_msg_array?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgClearHistoryMessageFun {
    (conv_id?: Buffer, conv_type?: TIMConvType, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgSetC2CReceiveMessageOptFun {
    (json_identifier_array?: Buffer, opt?: TIMReceiveMessageOpt, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgGetC2CReceiveMessageOptFun {
    (json_identifier_array?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgSetGroupReceiveMessageOptFun {
    (group_id?: Buffer, opt?: TIMReceiveMessageOpt, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgDownloadElemToPathFun {
    (json_download_elem_param?: Buffer, path?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgDownloadMergerMessageFun {
    (json_single_msg?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgBatchSendFun {
    (json_batch_send_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}
interface TIMMsgSearchLocalMessagesFun {
    (json_search_message_param?: Buffer, successCallback?: CommonCallbackFun, userData?: Buffer): number;
}

// ==========Interface For friendship End===========


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
    // friendship start
    TIMFriendshipGetFriendProfileList: TIMFriendshipGetFriendProfileListFun,
    TIMFriendshipAddFriend: TIMFriendshipAddFriendFun,
    TIMFriendshipHandleFriendAddRequest: TIMFriendshipHandleFriendAddRequestFun,
    TIMFriendshipModifyFriendProfile: TIMFriendshipModifyFriendProfileFun,
    TIMFriendshipDeleteFriend: TIMFriendshipDeleteFriendFun,
    TIMFriendshipCheckFriendType: TIMFriendshipCheckFriendTypeFun,
    TIMFriendshipCreateFriendGroup: TIMFriendshipCreateFriendGroupFun,
    TIMFriendshipGetFriendGroupList: TIMFriendshipGetFriendGroupListFun,
    TIMFriendshipModifyFriendGroup: TIMFriendshipModifyFriendGroupFun,
    TIMFriendshipDeleteFriendGroup: TIMFriendshipDeleteFriendGroupFun,
    TIMFriendshipAddToBlackList: TIMFriendshipAddToBlackListFun,
    TIMFriendshipGetBlackList: TIMFriendshipGetBlackListFun,
    TIMFriendshipDeleteFromBlackList: TIMFriendshipDeleteFromBlackListFun,
    TIMFriendshipGetPendencyList: TIMFriendshipGetPendencyListFun,
    TIMFriendshipDeletePendency: TIMFriendshipDeletePendencyFun,
    TIMFriendshipReportPendencyReaded: TIMFriendshipReportPendencyReadedFun,
    TIMFriendshipSearchFriends: TIMFriendshipSearchFriendsFun,
    TIMFriendshipGetFriendsInfo: TIMFriendshipGetFriendsInfoFun,
    TIMMsgSendMessage: TIMMsgSendMessageFun,
    TIMMsgCancelSend: TIMMsgCancelSendFun,
    TIMMsgFindMessages: TIMMsgFindMessagesFun,
    TIMMsgReportReaded: TIMMsgReportReadedFun,
    TIMMsgRevoke: TIMMsgRevokeFun,
    TIMMsgFindByMsgLocatorList: TIMMsgFindByMsgLocatorListFun,
    TIMMsgImportMsgList: TIMMsgImportMsgListFun,
    TIMMsgSaveMsg: TIMMsgSaveMsgFun,
    TIMMsgGetMsgList: TIMMsgGetMsgListFun,
    TIMMsgDelete: TIMMsgDeleteFun,
    TIMMsgListDelete: TIMMsgListDeleteFun,
    TIMMsgClearHistoryMessage: TIMMsgClearHistoryMessageFun,
    TIMMsgSetC2CReceiveMessageOpt: TIMMsgSetC2CReceiveMessageOptFun,
    TIMMsgGetC2CReceiveMessageOpt: TIMMsgGetC2CReceiveMessageOptFun,
    TIMMsgSetGroupReceiveMessageOpt: TIMMsgSetGroupReceiveMessageOptFun,
    TIMMsgDownloadElemToPath: TIMMsgDownloadElemToPathFun,
    TIMMsgDownloadMergerMessage: TIMMsgDownloadMergerMessageFun,
    TIMMsgBatchSend: TIMMsgBatchSendFun,
    TIMMsgSearchLocalMessages: TIMMsgSearchLocalMessagesFun,

    // friendship end


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