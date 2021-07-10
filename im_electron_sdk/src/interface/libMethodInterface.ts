import { TIMConvType, TIMReceiveMessageOpt } from "../enum";
import {
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgUpdateCallbackParams,
    TIMRecvNewMsgCallbackParams,
} from "./advanceMessageInterface";
import {
    TIMFriendAddRequestCallbackParams,
    TIMFriendApplicationListDeletedCallbackParams,
    TIMFriendApplicationListReadCallbackParams,
    TIMFriendBlackListAddedCallbackParams,
    TIMFriendBlackListDeletedCallbackParams,
    TIMOnAddFriendCallbackParams,
    TIMOnDeleteFriendCallbackParams,
    TIMUpdateFriendProfileCallbackParams,
} from "./friendshipInterface";
import {
    CommonCallbackFun,
    TIMSetKickedOfflineCallback,
    TIMSetNetworkStatusListenerCallback,
    TIMSetUserSigExpiredCallback,
} from "./basicInterface";
import {
    convTotalUnreadMessageCountChangedCallback,
    setConvEventCallback,
} from "./conversationInterface";
import {
    GroupTipCallBackFun,
    GroupAttributeCallbackFun,
} from "./groupInterface";

interface TIMInitFun {
    (sdkappid: number, sdkconfig: Buffer): number;
}

interface TIMUninitFun {
    (): number;
}

interface TIMLoginFun {
    (
        userID: Buffer,
        userSig: Buffer,
        callback: Buffer,
        user_data: Buffer
    ): number;
}
interface TIMLogoutFun {
    (callback: Buffer, user_data: Buffer): number;
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
    (callback: Buffer, user_data: Buffer): number;
}

interface TIMSetNetworkStatusListenerCallbackFun {
    (callback: Buffer, user_data: Buffer): number;
}

interface TIMSetKickedOfflineCallbackFun {
    (callback: Buffer, user_data: Buffer): number;
}
interface TIMSetUserSigExpiredCallbackFun {
    (callback: Buffer, user_data: Buffer): number;
}

// ==========Interface For Conversation Start===========
interface TIMConvCreateFun {
    (
        conv_id: Buffer,
        conv_type: number,
        callback: Buffer,
        user_data: Buffer
    ): number;
}
interface TIMConvGetConvListFun {
    (callback: Buffer, user_data: Buffer): number;
}
interface TIMConvSetDraftFun {
    (conv_id: Buffer, conv_type: number, json_draft_param: Buffer): number;
}
interface TIMConvCancelDraftFun {
    (conv_id: Buffer, conv_type: number): number;
}
interface TIMConvDeleteFun extends TIMConvCreateFun {}
interface TIMConvGetConvInfoFun {
    (
        json_get_conv_list_param: Buffer,
        callback: Buffer,
        user_data: Buffer
    ): number;
}
interface TIMConvPinConversationFun {
    (
        conv_id: Buffer,
        conv_type: number,
        is_pinned: boolean,
        callback: Buffer,
        user_data: Buffer
    ): number;
}
interface TIMConvGetTotalUnreadMessageCountFun {
    (callback: Buffer, user_data: Buffer): number;
}
interface TIMSetConvEventCallbackFun {
    (callback: Buffer, user_data: Buffer): number;
}
interface TIMSetConvTotalUnreadMessageCountChangedCallbackFun {
    (callback: Buffer, user_data: Buffer): number;
}
// ==========Interface For Conversation End===========
// ==========Interface For Group Start===========
interface TIMGroupCreateFun {
    (
        params: Buffer,
        successCallback?: CommonCallbackFun,
        userData?: Buffer
    ): number;
}

interface TIMGroupDeleteFun {
    (
        groupId: Buffer,
        successCallback?: CommonCallbackFun,
        userData?: Buffer
    ): number;
}

interface TIMGroupJoinFun {
    (
        groupId: Buffer,
        hello_msg: Buffer,
        successCallback?: CommonCallbackFun,
        userData?: Buffer
    ): number;
}

interface TIMGroupQuitFun extends TIMGroupDeleteFun {}

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
    (
        timeStamp: number,
        successCallback?: CommonCallbackFun,
        userData?: Buffer
    ): number;
}

interface TIMGroupHandlePendencyFun extends TIMGroupCreateFun {}

interface TIMGroupGetOnlineMemberCountFun extends TIMGroupDeleteFun {}

interface TIMGroupSearchGroupsFun extends TIMGroupCreateFun {}

interface TIMGroupSearchGroupMembersFun extends TIMGroupCreateFun {}

interface TIMGroupInitGroupAttributesFun {
    (
        groupId: Buffer,
        params: Buffer,
        successCallback?: CommonCallbackFun,
        userData?: Buffer
    ): number;
}

interface TIMGroupSetGroupAttributesFun
    extends TIMGroupInitGroupAttributesFun {}

interface TIMGroupDeleteGroupAttributesFun
    extends TIMGroupInitGroupAttributesFun {}

interface TIMGroupGetGroupAttributesFun
    extends TIMGroupInitGroupAttributesFun {}

interface TIMSetGroupTipsEventCallbackFun {
    (successCallback: Buffer, userData?: Buffer): void;
}

interface TIMSetGroupAttributeChangedCallbackFun {
    (successCallback: Buffer, userData?: Buffer): void;
}

// ==========Interface For Group End===========
// ==========Interface For friendship begin===========
interface TIMFriendshipGetFriendProfileListFun {
    (successCallback?: Buffer, userData?: Buffer): number;
}
interface TIMFriendshipAddFriendFun {
    (
        json_add_friend_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipHandleFriendAddRequestFun {
    (
        json_add_friend_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipModifyFriendProfileFun {
    (
        json_modify_friend_info_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipDeleteFriendFun {
    (
        json_delete_friend_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipCheckFriendTypeFun {
    (
        json_check_friend_list_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipCreateFriendGroupFun {
    (
        json_create_friend_group_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipGetFriendGroupListFun {
    (
        json_get_friend_group_list_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipModifyFriendGroupFun {
    (
        json_modify_friend_group_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipDeleteFriendGroupFun {
    (
        json_delete_friend_group_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipAddToBlackListFun {
    (
        json_add_to_blacklist_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipGetBlackListFun {
    (successCallback?: Buffer, userData?: Buffer): number;
}
interface TIMFriendshipDeleteFromBlackListFun {
    (
        json_delete_from_blacklist_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipGetPendencyListFun {
    (
        json_get_pendency_list_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipDeletePendencyFun {
    (
        json_delete_pendency_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipReportPendencyReadedFun {
    (time_stamp?: number, successCallback?: Buffer, userData?: Buffer): number;
}
interface TIMFriendshipSearchFriendsFun {
    (
        json_search_friends_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMFriendshipGetFriendsInfoFun {
    (
        json_get_friends_info_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgSendMessageFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_add_friend_param?: Buffer,
        message_id_buffer?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgCancelSendFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        message_id?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgFindMessagesFun {
    (
        json_message_id_array?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgReportReadedFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msg_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgRevokeFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msg_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgFindByMsgLocatorListFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msg_Locator_array?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgImportMsgListFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msg_array?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgSaveMsgFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msg_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgGetMsgListFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_get_msg_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgDeleteFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msgdel_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgListDeleteFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        json_msg_array?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgClearHistoryMessageFun {
    (
        conv_id?: Buffer,
        conv_type?: TIMConvType,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgSetC2CReceiveMessageOptFun {
    (
        json_identifier_array?: Buffer,
        opt?: TIMReceiveMessageOpt,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgGetC2CReceiveMessageOptFun {
    (
        json_identifier_array?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgSetGroupReceiveMessageOptFun {
    (
        group_id?: Buffer,
        opt?: number,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgDownloadElemToPathFun {
    (
        json_download_elem_param?: Buffer,
        path?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgDownloadMergerMessageFun {
    (
        json_single_msg?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgBatchSendFun {
    (
        json_batch_send_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMMsgSearchLocalMessagesFun {
    (
        json_search_message_param?: Buffer,
        successCallback?: Buffer,
        userData?: Buffer
    ): number;
}
interface TIMAddRecvNewMsgCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMRemoveRecvNewMsgCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetMsgReadedReceiptCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetMsgRevokeCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetMsgElemUploadProgressCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetOnAddFriendCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetOnDeleteFriendCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetUpdateFriendProfileCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetFriendAddRequestCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetFriendApplicationListDeletedCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetFriendApplicationListReadCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetFriendBlackListAddedCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetFriendBlackListDeletedCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetMsgUpdateCallbackFun {
    (successCallback?: Buffer, userData?: Buffer): void;
}
interface TIMSetLogCallbackLibFun {
    (callback: Buffer, userData?: Buffer): void;
}
interface TIMSetConfigLibFun {
    (json_config: Buffer, callback: Buffer, user_data: Buffer): number;
}
interface callExperimentalAPIFun {
    (json_param: Buffer, callback: Buffer, user_data: Buffer): number;
}
interface TIMProfileGetUserProfileListFun {
    (json_param: Buffer, callback: Buffer, user_data: Buffer): number;
}

interface TIMProfileModifySelfUserProfileFun {
    (json_param: Buffer, callback: Buffer, user_data: Buffer): number;
}
// ==========Interface For friendship End===========

interface libMethods {
    // timbase start
    TIMInit: TIMInitFun;
    TIMLogin: TIMLoginFun;
    TIMUninit: TIMUninitFun;
    TIMGetSDKVersion: TIMGetSDKVersionFun;
    TIMGetServerTime: TIMGetServerTimeFun;
    TIMLogout: TIMLogoutFun;
    TIMGetLoginStatus: TIMGetLoginStatusFun;
    TIMGetLoginUserID: TIMGetLoginUserIDFun;
    TIMSetNetworkStatusListenerCallback: TIMSetNetworkStatusListenerCallbackFun;
    TIMSetKickedOfflineCallback: TIMSetKickedOfflineCallbackFun;
    TIMSetUserSigExpiredCallback: TIMSetUserSigExpiredCallbackFun;
    TIMSetLogCallback: TIMSetLogCallbackLibFun;
    TIMSetConfig: TIMSetConfigLibFun;
    callExperimentalAPI: callExperimentalAPIFun;
    TIMProfileGetUserProfileList: TIMProfileGetUserProfileListFun;
    TIMProfileModifySelfUserProfile: TIMProfileModifySelfUserProfileFun;
    // timbase end

    // conversation start
    TIMConvCreate: TIMConvCreateFun;
    TIMConvGetConvList: TIMConvGetConvListFun;
    TIMConvDelete: TIMConvDeleteFun;
    TIMConvSetDraft: TIMConvSetDraftFun;
    TIMConvCancelDraft: TIMConvCancelDraftFun;
    TIMConvGetConvInfo: TIMConvGetConvInfoFun;
    TIMConvPinConversation: TIMConvPinConversationFun;
    TIMConvGetTotalUnreadMessageCount: TIMConvGetTotalUnreadMessageCountFun;
    TIMSetConvEventCallback: TIMSetConvEventCallbackFun;
    TIMSetConvTotalUnreadMessageCountChangedCallback: TIMSetConvTotalUnreadMessageCountChangedCallbackFun;
    // converastion end
    // friendship start
    TIMFriendshipGetFriendProfileList: TIMFriendshipGetFriendProfileListFun;
    TIMFriendshipAddFriend: TIMFriendshipAddFriendFun;
    TIMFriendshipHandleFriendAddRequest: TIMFriendshipHandleFriendAddRequestFun;
    TIMFriendshipModifyFriendProfile: TIMFriendshipModifyFriendProfileFun;
    TIMFriendshipDeleteFriend: TIMFriendshipDeleteFriendFun;
    TIMFriendshipCheckFriendType: TIMFriendshipCheckFriendTypeFun;
    TIMFriendshipCreateFriendGroup: TIMFriendshipCreateFriendGroupFun;
    TIMFriendshipGetFriendGroupList: TIMFriendshipGetFriendGroupListFun;
    TIMFriendshipModifyFriendGroup: TIMFriendshipModifyFriendGroupFun;
    TIMFriendshipDeleteFriendGroup: TIMFriendshipDeleteFriendGroupFun;
    TIMFriendshipAddToBlackList: TIMFriendshipAddToBlackListFun;
    TIMFriendshipGetBlackList: TIMFriendshipGetBlackListFun;
    TIMFriendshipDeleteFromBlackList: TIMFriendshipDeleteFromBlackListFun;
    TIMFriendshipGetPendencyList: TIMFriendshipGetPendencyListFun;
    TIMFriendshipDeletePendency: TIMFriendshipDeletePendencyFun;
    TIMFriendshipReportPendencyReaded: TIMFriendshipReportPendencyReadedFun;
    TIMFriendshipSearchFriends: TIMFriendshipSearchFriendsFun;
    TIMFriendshipGetFriendsInfo: TIMFriendshipGetFriendsInfoFun;
    TIMMsgSendMessage: TIMMsgSendMessageFun;
    TIMMsgCancelSend: TIMMsgCancelSendFun;
    TIMMsgFindMessages: TIMMsgFindMessagesFun;
    TIMMsgReportReaded: TIMMsgReportReadedFun;
    TIMMsgRevoke: TIMMsgRevokeFun;
    TIMMsgFindByMsgLocatorList: TIMMsgFindByMsgLocatorListFun;
    TIMMsgImportMsgList: TIMMsgImportMsgListFun;
    TIMMsgSaveMsg: TIMMsgSaveMsgFun;
    TIMMsgGetMsgList: TIMMsgGetMsgListFun;
    TIMMsgDelete: TIMMsgDeleteFun;
    TIMMsgListDelete: TIMMsgListDeleteFun;
    TIMMsgClearHistoryMessage: TIMMsgClearHistoryMessageFun;
    TIMMsgSetC2CReceiveMessageOpt: TIMMsgSetC2CReceiveMessageOptFun;
    TIMMsgGetC2CReceiveMessageOpt: TIMMsgGetC2CReceiveMessageOptFun;
    TIMMsgSetGroupReceiveMessageOpt: TIMMsgSetGroupReceiveMessageOptFun;
    TIMMsgDownloadElemToPath: TIMMsgDownloadElemToPathFun;
    TIMMsgDownloadMergerMessage: TIMMsgDownloadMergerMessageFun;
    TIMMsgBatchSend: TIMMsgBatchSendFun;
    TIMMsgSearchLocalMessages: TIMMsgSearchLocalMessagesFun;
    TIMAddRecvNewMsgCallback: TIMAddRecvNewMsgCallbackFun;
    TIMRemoveRecvNewMsgCallback: TIMRemoveRecvNewMsgCallbackFun;
    TIMSetMsgReadedReceiptCallback: TIMSetMsgReadedReceiptCallbackFun;
    TIMSetMsgRevokeCallback: TIMSetMsgRevokeCallbackFun;
    TIMSetMsgElemUploadProgressCallback: TIMSetMsgElemUploadProgressCallbackFun;
    TIMSetOnAddFriendCallback: TIMSetOnAddFriendCallbackFun;
    TIMSetOnDeleteFriendCallback: TIMSetOnDeleteFriendCallbackFun;
    TIMSetUpdateFriendProfileCallback: TIMSetUpdateFriendProfileCallbackFun;
    TIMSetFriendAddRequestCallback: TIMSetFriendAddRequestCallbackFun;
    TIMSetFriendApplicationListDeletedCallback: TIMSetFriendApplicationListDeletedCallbackFun;
    TIMSetFriendApplicationListReadCallback: TIMSetFriendApplicationListReadCallbackFun;
    TIMSetFriendBlackListAddedCallback: TIMSetFriendBlackListAddedCallbackFun;
    TIMSetFriendBlackListDeletedCallback: TIMSetFriendBlackListDeletedCallbackFun;
    TIMSetMsgUpdateCallback: TIMSetMsgUpdateCallbackFun;
    // friendship end

    // group start
    TIMGroupCreate: TIMGroupCreateFun;
    TIMGroupDelete: TIMGroupDeleteFun;
    TIMGroupJoin: TIMGroupJoinFun;
    TIMGroupQuit: TIMGroupQuitFun;
    TIMGroupInviteMember: TIMGroupInviteMemberFun;
    TIMGroupDeleteMember: TIMGroupDeleteMemberFun;
    TIMGroupGetJoinedGroupList: TIMGroupGetJoinedGroupListFun;
    TIMGroupGetGroupInfoList: TIMGroupGetGroupInfoListFun;
    TIMGroupModifyGroupInfo: TIMGroupModifyGroupInfoFun;
    TIMGroupGetMemberInfoList: TIMGroupGetMemberInfoListFun;
    TIMGroupModifyMemberInfo: TIMGroupModifyMemberInfoFun;
    TIMGroupGetPendencyList: TIMGroupGetPendencyListFun;
    TIMGroupReportPendencyReaded: TIMGroupReportPendencyReadedFun;
    TIMGroupHandlePendency: TIMGroupHandlePendencyFun;
    TIMGroupGetOnlineMemberCount: TIMGroupGetOnlineMemberCountFun;
    TIMGroupSearchGroups: TIMGroupSearchGroupsFun;
    TIMGroupSearchGroupMembers: TIMGroupSearchGroupMembersFun;
    TIMGroupInitGroupAttributes: TIMGroupInitGroupAttributesFun;
    TIMGroupSetGroupAttributes: TIMGroupSetGroupAttributesFun;
    TIMGroupDeleteGroupAttributes: TIMGroupDeleteGroupAttributesFun;
    TIMGroupGetGroupAttributes: TIMGroupGetGroupAttributesFun;
    TIMSetGroupTipsEventCallback: TIMSetGroupTipsEventCallbackFun;
    TIMSetGroupAttributeChangedCallback: TIMSetGroupAttributeChangedCallbackFun;
    // group end
}

export { libMethods };
