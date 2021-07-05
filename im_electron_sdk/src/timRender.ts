import { TIMIPCLISTENR } from "./const/const";
import {
    loginParam,
    CreateGroupParams,
    commonResponse,
    logoutParam,
    getLoginUserIDParam,
    GroupAttributeCallbackParams,
    InitGroupAttributeParams,
    DeleteAttributeParams,
    GroupTipsCallbackParams,
    TIMSetNetworkStatusListenerCallbackParam,
    DeleteGroupParams,
    DeleteMemberParams,
    GetGroupListParams,
    GetGroupMemberInfoParams,
    GetOnlineMemberCountParams,
    GetPendencyListParams,
    HandlePendencyParams,
    InviteMemberParams,
    JoinGroupParams,
    ModifyGroupParams,
    ModifyMemberInfoParams,
    QuitGroupParams,
    ReportParams,
    SearchGroupParams,
    SearchMemberParams,
    GetFriendProfileListParams,
    AddFriendParams,
    Json_modify_friend_info_param,
    Json_delete_friend_param,
    Json_check_friend_list_param,
    Json_create_friend_group_param,
    Json_modify_friend_group_param,
    Json_get_pendency_list_param,
    Json_delete_pendency_param,
    Json_search_friends_param,
    TIMSetUserSigExpiredCallbackParam,
    TIMSetKickedOfflineCallbackParam,
    TIMOnAddFriendCallback,
    TIMOnDeleteFriendCallback,
    TIMUpdateFriendProfileCallback,
    TIMFriendAddRequestCallback,
    TIMFriendApplicationListReadCallback,
    TIMFriendBlackListAddedCallback,
    TIMFriendBlackListDeletedCallback,
    Json_value_msg,
    Json_advance_message_param,
    Json_get_msg_param,
    Json_value_msgdelete,
    Json_value_batchsend,
    Json_search_message_param,
    TIMRecvNewMsgCallback,
    TIMMsgReadedReceiptCallback,
    TIMMsgRevokeCallback,
    TIMMsgElemUploadProgressCallback,
    TIMMsgUpdateCallback,
    Json_handle_friend_add_param,
} from "./interface";
import { ipcData, Managers } from "./interface/ipcInterface";
import { ipcRenderer } from "electron";
import {
    convCancelDraft,
    convCreate,
    convDelete,
    convGetConvInfo,
    convGetTotalUnreadMessageCount,
    convPinConversation,
    convSetDrat,
    convTotalUnreadMessageCountChangedCallbackParam,
    getConvList,
    setConvEventCallback,
} from "./interface/conversationInterface";

const getUniKey = (length: number) =>
    Number(Math.random().toString().substr(3, length) + Date.now()).toString(
        36
    );

export default class TimRender {
    static runtime: Map<string, Function> = new Map();
    static isListened = false;
    constructor() {
        if (!TimRender.isListened) {
            ipcRenderer.on("global-callback-reply", (e: any, res: any) => {
                const { callbackKey, responseData } = JSON.parse(res);
                if (TimRender.runtime.has(callbackKey)) {
                    //@ts-ignore
                    TimRender.runtime.get(callbackKey)(responseData);
                }
            });
            TimRender.isListened = true;
        }
    }

    private async call(data: any): Promise<commonResponse> {
        const response = await ipcRenderer.invoke(
            TIMIPCLISTENR,
            JSON.stringify(data)
        );
        return JSON.parse(response);
    }
    TIMConvGetTotalUnreadMessageCount(param: convGetTotalUnreadMessageCount) {
        const formatedData = {
            method: "TIMConvGetTotalUnreadMessageCount",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvPinConversation(param: convPinConversation) {
        const formatedData = {
            method: "TIMConvPinConversation",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvGetConvInfo(param: convGetConvInfo) {
        const formatedData = {
            method: "TIMConvGetConvInfo",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvCancelDraft(param: convCancelDraft) {
        const formatedData = {
            method: "TIMConvCancelDraft",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvSetDraft(param: convSetDrat) {
        const formatedData = {
            method: "TIMConvSetDraft",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvGetConvList(param: getConvList) {
        console.log(param);
        const formatedData = {
            method: "TIMConvGetConvList",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvDelete(param: convDelete) {
        const formatedData = {
            method: "TIMConvDelete",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMConvCreate(param: convCreate) {
        const formatedData = {
            method: "TIMConvCreate",
            manager: Managers.conversationManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMSetConvTotalUnreadMessageCountChangedCallback(
        param: convTotalUnreadMessageCountChangedCallbackParam
    ) {
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvTotalUnreadMessageCountChangedCallback",
            manager: Managers.conversationManager,
            callback: callback,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMSetConvEventCallback(param: setConvEventCallback) {
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvEventCallback",
            manager: Managers.conversationManager,
            callback: callback,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMSetUserSigExpiredCallback(param: TIMSetUserSigExpiredCallbackParam) {
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetUserSigExpiredCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMSetKickedOfflineCallback(param: TIMSetKickedOfflineCallbackParam) {
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetKickedOfflineCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMSetNetworkStatusListenerCallback(
        param: TIMSetNetworkStatusListenerCallbackParam
    ) {
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetNetworkStatusListenerCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMUninit() {
        const formatedData = {
            method: "TIMUninit",
            manager: Managers.timBaseManager,
        };
        return this.call(formatedData);
    }
    TIMGetSDKVersion() {
        const formatedData = {
            method: "TIMGetSDKVersion",
            manager: Managers.timBaseManager,
        };
        return this.call(formatedData);
    }
    TIMGetServerTime() {
        const formatedData = {
            method: "TIMGetServerTime",
            manager: Managers.timBaseManager,
        };
        return this.call(formatedData);
    }
    TIMLogout(param: logoutParam) {
        const formatedData = {
            method: "TIMLogout",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMInit() {
        return this.call({
            method: "TIMInit",
            manager: Managers.timBaseManager,
        });
    }
    TIMGetLoginStatus() {
        const formatedData = {
            method: "TIMGetLoginStatus",
            manager: Managers.timBaseManager,
        };
        return this.call(formatedData);
    }
    TIMGetLoginUserID(param: getLoginUserIDParam) {
        const formatedData = {
            method: "TIMGetLoginUserID",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this.call(formatedData);
    }
    TIMLogin(data: loginParam) {
        const formatedData = {
            method: "TIMLogin",
            manager: Managers.timBaseManager,
            param: data,
        };
        return this.call(formatedData);
    }

    TIMGroupCreate(data: CreateGroupParams) {
        const formatedData: ipcData<CreateGroupParams> = {
            method: "TIMGroupCreate",
            manager: Managers.groupManager,
            // callback,
            param: data,
        };
        return this.call(formatedData);
    }

    TIMGroupInitGroupAttributes(
        initAttributesParams: InitGroupAttributeParams
    ) {
        const formatedData = {
            method: "TIMGroupInitGroupAttributes",
            manager: Managers.groupManager,
            param: initAttributesParams,
        };
        return this.call(formatedData);
    }

    TIMGroupSetGroupAttributes(setAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: "TIMGroupSetGroupAttributes",
            manager: Managers.groupManager,
            param: setAttributesParams,
        };
        return this.call(formatedData);
    }

    TIMGroupDeleteGroupAttributes(
        deleteAttributesParams: DeleteAttributeParams
    ) {
        const formatedData = {
            method: "TIMGroupDeleteGroupAttributes",
            manager: Managers.groupManager,
            param: deleteAttributesParams,
        };
        return this.call(formatedData);
    }

    TIMGroupGetGroupAttributes(getAttributeParams: DeleteAttributeParams) {
        const formatedData = {
            method: "TIMGroupGetGroupAttributes",
            manager: Managers.groupManager,
            param: getAttributeParams,
        };
        return this.call(formatedData);
    }

    TIMSetGroupAttributeChangedCallback(data: GroupAttributeCallbackParams) {
        const callback = getUniKey(10);
        console.log(callback);
        const formatedData = {
            method: "TIMSetGroupAttributeChangedCallback",
            manager: Managers.groupManager,
            callback,
            param: data,
        };

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }

    TIMSetGroupTipsEventCallback(data: GroupTipsCallbackParams) {
        const callback = getUniKey(10);
        console.log(callback);
        const formatedData = {
            method: "TIMSetGroupTipsEventCallback",
            manager: Managers.groupManager,
            callback,
            param: data,
        };

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }

    TIMGroupDelete(data: DeleteGroupParams) {
        const formatedData = {
            method: "TIMGroupDelete",
            manager: Managers.groupManager,
            param: data,
        };

        return this.call(formatedData);
    }

    TIMGroupJoin(joinGroupParams: JoinGroupParams) {
        const formatedData = {
            method: "TIMGroupJoin",
            manager: Managers.groupManager,
            param: joinGroupParams,
        };

        return this.call(formatedData);
    }

    TIMGroupQuit(quitGroupParams: QuitGroupParams) {
        const formatedData = {
            method: "TIMGroupQuit",
            manager: Managers.groupManager,
            param: quitGroupParams,
        };

        return this.call(formatedData);
    }

    TIMGroupInviteMember(inviteMemberParams: InviteMemberParams) {
        const formatedData = {
            method: "TIMGroupInviteMember",
            manager: Managers.groupManager,
            param: inviteMemberParams,
        };

        return this.call(formatedData);
    }

    TIMGroupDeleteMember(deleteMemberParams: DeleteMemberParams) {
        const formatedData = {
            method: "TIMGroupDeleteMember",
            manager: Managers.groupManager,
            param: deleteMemberParams,
        };

        return this.call(formatedData);
    }

    TIMGroupGetJoinedGroupList(data?: string) {
        const formatedData = {
            method: "TIMGroupGetJoinedGroupList",
            manager: Managers.groupManager,
            param: data,
        };

        return this.call(formatedData);
    }

    TIMGroupGetGroupInfoList(getGroupListParams: GetGroupListParams) {
        const formatedData = {
            method: "TIMGroupGetGroupInfoList",
            manager: Managers.groupManager,
            param: getGroupListParams,
        };

        return this.call(formatedData);
    }

    TIMGroupModifyGroupInfo(modifyGroupParams: ModifyGroupParams) {
        const formatedData = {
            method: "TIMGroupModifyGroupInfo",
            manager: Managers.groupManager,
            param: modifyGroupParams,
        };

        return this.call(formatedData);
    }

    TIMGroupGetMemberInfoList(
        getGroupMemberInfoParams: GetGroupMemberInfoParams
    ) {
        const formatedData = {
            method: "TIMGroupGetMemberInfoList",
            manager: Managers.groupManager,
            param: getGroupMemberInfoParams,
        };

        return this.call(formatedData);
    }

    TIMGroupModifyMemberInfo(modifyMemberInfoParams: ModifyMemberInfoParams) {
        const formatedData = {
            method: "TIMGroupModifyMemberInfo",
            manager: Managers.groupManager,
            param: modifyMemberInfoParams,
        };

        return this.call(formatedData);
    }

    TIMGroupGetPendencyList(getPendencyListParams: GetPendencyListParams) {
        const formatedData = {
            method: "TIMGroupGetPendencyList",
            manager: Managers.groupManager,
            param: getPendencyListParams,
        };

        return this.call(formatedData);
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const formatedData = {
            method: "TIMGroupReportPendencyReaded",
            manager: Managers.groupManager,
            param: reportParams,
        };

        return this.call(formatedData);
    }

    TIMGroupHandlePendency(handlePendencyParams: HandlePendencyParams) {
        const formatedData = {
            method: "TIMGroupHandlePendency",
            manager: Managers.groupManager,
            param: handlePendencyParams,
        };

        return this.call(formatedData);
    }

    TIMGroupGetOnlineMemberCount(params: GetOnlineMemberCountParams) {
        const formatedData = {
            method: "TIMGroupGetOnlineMemberCount",
            manager: Managers.groupManager,
            param: params,
        };

        return this.call(formatedData);
    }

    TIMGroupSearchGroups(searchGroupsParams: SearchGroupParams) {
        const formatedData = {
            method: "TIMGroupSearchGroups",
            manager: Managers.groupManager,
            param: searchGroupsParams,
        };

        return this.call(formatedData);
    }

    TIMGroupSearchGroupMembers(searchMemberParams: SearchMemberParams) {
        const formatedData = {
            method: "TIMGroupSearchGroupMembers",
            manager: Managers.groupManager,
            param: searchMemberParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetFriendProfileList(getFriendProfileListParams: GetFriendProfileListParams) {
        const formatedData = {
            method: "TIMFriendshipGetFriendProfileList",
            manager: Managers.friendshipManager,
            param: getFriendProfileListParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipAddFriend(addFriendParams: AddFriendParams) {
        const formatedData = {
            method: "TIMFriendshipAddFriend",
            manager: Managers.friendshipManager,
            param: addFriendParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipHandleFriendAddRequest(
        json_friendship_param: Json_handle_friend_add_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipHandleFriendAddRequest",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipModifyFriendProfile(
        json_friendship_param: Json_modify_friend_info_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendProfile",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeleteFriend(
        json_friendship_param: Json_delete_friend_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriend",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipCheckFriendType(
        json_friendship_param: Json_check_friend_list_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipCheckFriendType",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipCreateFriendGroup(
        json_friendship_param: Json_create_friend_group_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipCreateFriendGroup",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetFriendGroupList(
        json_friendship_param: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendGroupList",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipModifyFriendGroup(
        json_friendship_param: Json_modify_friend_group_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendGroup",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeleteFriendGroup(
        json_friendship_param: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriendGroup",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipAddToBlackList(
        json_friendship_param: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipAddToBlackList",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetBlackList(user_data: string) {
        const formatedData = {
            method: "TIMFriendshipGetBlackList",
            manager: Managers.friendshipManager,
            param: {
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeleteFromBlackList(
        json_friendship_param: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFromBlackList",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetPendencyList(
        json_friendship_param: Json_get_pendency_list_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipGetPendencyList",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeletePendency(
        json_friendship_param: Json_delete_pendency_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipDeletePendency",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipReportPendencyReaded(timestamp: number, user_data: string) {
        const formatedData = {
            method: "TIMFriendshipReportPendencyReaded",
            manager: Managers.friendshipManager,
            param: {
                timestamp,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipSearchFriends(
        json_friendship_param: Json_search_friends_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipSearchFriends",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetFriendsInfo(
        json_friendship_param: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendsInfo",
            manager: Managers.friendshipManager,
            param: {
                json_friendship_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMSetOnAddFriendCallback(
        tIMOnAddFriendCallback: TIMOnAddFriendCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetOnAddFriendCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMOnAddFriendCallback);

        return this.call(formatedData);
    }

    TIMSetOnDeleteFriendCallback(
        tIMOnDeleteFriendCallback: TIMOnDeleteFriendCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetOnDeleteFriendCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMOnDeleteFriendCallback);

        return this.call(formatedData);
    }

    TIMSetUpdateFriendProfileCallback(
        tIMUpdateFriendProfileCallback: TIMUpdateFriendProfileCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetUpdateFriendProfileCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMUpdateFriendProfileCallback);

        return this.call(formatedData);
    }

    TIMSetFriendAddRequestCallback(
        tIMFriendAddRequestCallback: TIMFriendAddRequestCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetFriendAddRequestCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMFriendAddRequestCallback);

        return this.call(formatedData);
    }

    TIMSetFriendApplicationListDeletedCallback(
        tIMOnAddFriendCallback: TIMOnAddFriendCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetFriendApplicationListDeletedCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMOnAddFriendCallback);
        return this.call(formatedData);
    }

    TIMSetFriendApplicationListReadCallback(
        tIMFriendApplicationListReadCallback: TIMFriendApplicationListReadCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetFriendApplicationListReadCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMFriendApplicationListReadCallback);
        return this.call(formatedData);
    }

    TIMSetFriendBlackListAddedCallback(
        tIMFriendBlackListAddedCallback: TIMFriendBlackListAddedCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetFriendBlackListAddedCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMFriendBlackListAddedCallback);
        return this.call(formatedData);
    }

    TIMSetFriendBlackListDeletedCallback(
        tIMFriendBlackListDeletedCallback: TIMFriendBlackListDeletedCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetFriendBlackListDeletedCallback",
            manager: Managers.friendshipManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMFriendBlackListDeletedCallback);
        return this.call(formatedData);
    }

    TIMMsgSendMessage(
        conv_id: string,
        conv_type: number,
        json_advance_message_param: Json_value_msg,
        message_id_buffer: string,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgSendMessage",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                json_advance_message_param,
                message_id_buffer,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgCancelSend(
        conv_id: string,
        conv_type: number,
        message_id: string,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgCancelSend",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                message_id,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgFindMessages(
        json_advance_message_param: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgFindMessages",
            manager: Managers.advanceMessageManager,
            param: {
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgReportReaded(
        conv_id: string,
        conv_type: number,
        message_id: string,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgReportReaded",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                message_id,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgRevoke(
        conv_id: string,
        conv_type: number,
        message_id: string,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgRevoke",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                message_id,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgFindByMsgLocatorList(
        conv_id: string,
        conv_type: number,
        json_advance_message_param: Json_advance_message_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgFindByMsgLocatorList",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgImportMsgList(
        conv_id: string,
        conv_type: number,
        json_advance_message_param: Json_advance_message_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgImportMsgList",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgSaveMsg(
        conv_id: string,
        conv_type: number,
        json_advance_message_param: Json_advance_message_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgSaveMsg",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgGetMsgList(
        conv_id: string,
        conv_type: number,
        json_advance_message_param: Json_get_msg_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgGetMsgList",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgDelete(
        conv_id: string,
        conv_type: number,
        json_advance_message_param: Json_value_msgdelete,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgDelete",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgListDelete(
        conv_id: string,
        conv_type: number,
        message_id_array: [string],
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgListDelete",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                message_id_array,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgClearHistoryMessage(
        conv_id: string,
        conv_type: number,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgClearHistoryMessage",
            manager: Managers.advanceMessageManager,
            param: {
                conv_id,
                conv_type,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgSetC2CReceiveMessageOpt(
        user_id_array: [string],
        opt: number,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgSetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: {
                user_id_array,
                opt,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgGetC2CReceiveMessageOpt(user_id_array: [string], user_data: string) {
        const formatedData = {
            method: "TIMMsgGetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: {
                user_id_array,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgSetGroupReceiveMessageOpt(
        group_id: string,
        opt: number,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgSetGroupReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: {
                group_id,
                opt,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgDownloadElemToPath(
        json_advance_message_param: Json_advance_message_param,
        path: string,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgDownloadElemToPath",
            manager: Managers.advanceMessageManager,
            param: {
                json_advance_message_param,
                path,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgDownloadMergerMessage(
        json_advance_message_param: Json_advance_message_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgDownloadMergerMessage",
            manager: Managers.advanceMessageManager,
            param: {
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgBatchSend(
        json_advance_message_param: Json_value_batchsend,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgBatchSend",
            manager: Managers.advanceMessageManager,
            param: {
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMMsgSearchLocalMessages(
        json_advance_message_param: Json_search_message_param,
        user_data: string
    ) {
        const formatedData = {
            method: "TIMMsgSearchLocalMessages",
            manager: Managers.advanceMessageManager,
            param: {
                json_advance_message_param,
                user_data,
            },
        };

        return this.call(formatedData);
    }

    TIMAddRecvNewMsgCallback(
        tIMRecvNewMsgCallback: TIMRecvNewMsgCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMAddRecvNewMsgCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMRecvNewMsgCallback);
        return this.call(formatedData);
    }

    TIMRemoveRecvNewMsgCallback() {
        const formatedData = {
            method: "TIMRemoveRecvNewMsgCallback",
            manager: Managers.advanceMessageManager,
        };

        return this.call(formatedData);
    }

    TIMSetMsgReadedReceiptCallback(
        tIMMsgReadedReceiptCallback: TIMMsgReadedReceiptCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetMsgReadedReceiptCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMMsgReadedReceiptCallback);
        return this.call(formatedData);
    }

    TIMSetMsgRevokeCallback(
        tIMMsgRevokeCallback: TIMMsgRevokeCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetMsgRevokeCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMMsgRevokeCallback);
        return this.call(formatedData);
    }

    TIMSetMsgElemUploadProgressCallback(
        tIMMsgElemUploadProgressCallback: TIMMsgElemUploadProgressCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetMsgElemUploadProgressCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMMsgElemUploadProgressCallback);
        return this.call(formatedData);
    }

    TIMSetMsgUpdateCallback(
        tIMMsgUpdateCallback: TIMMsgUpdateCallback,
        user_data: string
    ) {
        const callback = getUniKey(10);
        const formatedData = {
            method: "TIMSetMsgUpdateCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: {
                callback,
                user_data,
            },
        };

        TimRender.runtime.set(callback, tIMMsgUpdateCallback);
        return this.call(formatedData);
    }
}
