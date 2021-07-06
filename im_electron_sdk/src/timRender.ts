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
    // JoinGroupParams,
    ModifyGroupParams,
    ModifyMemberInfoParams,
    QuitGroupParams,
    ReportParams,
    SearchGroupParams,
    SearchMemberParams,
    GetFriendProfileListParams,
    AddFriendParams,
    DeleteFriendParams,
    ModifyFriendProfileParams,
    CheckFriendTypeParams,
    CreateFriendGroupParams,
    FriendshipStringArrayParams,
    GetBlackListParams,
    HandleFriendAddParams,
    ModifyFriendGroupParams,
    FriendshipGetPendencyListParams,
    DeletePendencyParams,
    ReportPendencyReadedParams,
    SearchFriendsParams,
    TIMSetUserSigExpiredCallbackParam,
    TIMSetKickedOfflineCallbackParam,
    TIMOnAddFriendCallback,
    TIMOnDeleteFriendCallback,
    TIMUpdateFriendProfileCallback,
    TIMFriendAddRequestCallback,
    TIMFriendApplicationListReadCallback,
    TIMFriendBlackListAddedCallback,
    TIMFriendBlackListDeletedCallback,
    MsgSendMessageParams,
    MsgCancelSendParams,
    MsgFindMessagesParams,
    MsgReportReadedParams,
    MsgRevokeParams,
    MsgFindByMsgLocatorListParams,
    MsgImportMsgListParams,
    MsgSaveMsgParams,
    MsgGetMsgListParams,
    MsgDeleteParams,
    MsgListDeleteParams,
    MsgClearHistoryMessageParams,
    MsgSetC2CReceiveMessageOptParams,
    MsgGetC2CReceiveMessageOptParams,
    MsgSetGroupReceiveMessageOptParams,
    MsgDownloadElemToPathParams,
    MsgDownloadMergerMessageParams,
    MsgBatchSendParams,
    MsgSearchLocalMessagesParams,
    TIMRecvNewMsgCallback,
    TIMMsgReadedReceiptCallback,
    TIMMsgRevokeCallback,
    TIMMsgElemUploadProgressCallback,
    TIMMsgUpdateCallback,
    TIMSetConfigParam,
    TIMSetLogCallbackParam,
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

interface JoinGroupParams {
    groupId: string;
    helloMsg?: string;
    data?: string;
}

interface TestInterface {
    a: string;
    b: string;
}

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

    testDoc(param: TestInterface) {}

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
    TIMSetLogCallback(param: TIMSetLogCallbackParam) {
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetLogCallback",
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
    TIMSetConfig(param: TIMSetConfigParam) {
        const formatedData = {
            method: "TIMSetConfig",
            manager: Managers.timBaseManager,
            param: param,
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

    /**
     * @param data  Comment for parameter ´text´.
     */

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

    TIMFriendshipGetFriendProfileList(
        getFriendProfileListParams: GetFriendProfileListParams
    ) {
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
        handleFriendAddParams: HandleFriendAddParams
    ) {
        const formatedData = {
            method: "TIMFriendshipHandleFriendAddRequest",
            manager: Managers.friendshipManager,
            param: handleFriendAddParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendProfile",
            manager: Managers.friendshipManager,
            param: modifyFriendProfileParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeleteFriend(deleteFriendParams: DeleteFriendParams) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriend",
            manager: Managers.friendshipManager,
            param: deleteFriendParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipCheckFriendType(checkFriendTypeParams: CheckFriendTypeParams) {
        const formatedData = {
            method: "TIMFriendshipCheckFriendType",
            manager: Managers.friendshipManager,
            param: checkFriendTypeParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ) {
        const formatedData = {
            method: "TIMFriendshipCreateFriendGroup",
            manager: Managers.friendshipManager,
            param: createFriendGroupParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendGroupList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendGroup",
            manager: Managers.friendshipManager,
            param: modifyFriendGroupParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriendGroup",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipAddToBlackList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetBlackList(getBlackListParams: GetBlackListParams) {
        const formatedData = {
            method: "TIMFriendshipGetBlackList",
            manager: Managers.friendshipManager,
            param: getBlackListParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFromBlackList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetPendencyList",
            manager: Managers.friendshipManager,
            param: friendshipGetPendencyListParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipDeletePendency(deletePendencyParams: DeletePendencyParams) {
        const formatedData = {
            method: "TIMFriendshipDeletePendency",
            manager: Managers.friendshipManager,
            param: deletePendencyParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ) {
        const formatedData = {
            method: "TIMFriendshipReportPendencyReaded",
            manager: Managers.friendshipManager,
            param: reportPendencyReadedParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipSearchFriends(searchFriendsParams: SearchFriendsParams) {
        const formatedData = {
            method: "TIMFriendshipSearchFriends",
            manager: Managers.friendshipManager,
            param: searchFriendsParams,
        };

        return this.call(formatedData);
    }

    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendsInfo",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
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

    TIMMsgSendMessage(msgSendMessageParams: MsgSendMessageParams) {
        const formatedData = {
            method: "TIMMsgSendMessage",
            manager: Managers.advanceMessageManager,
            param: msgSendMessageParams,
        };

        return this.call(formatedData);
    }

    TIMMsgCancelSend(msgCancelSendParams: MsgCancelSendParams) {
        const formatedData = {
            method: "TIMMsgCancelSend",
            manager: Managers.advanceMessageManager,
            param: msgCancelSendParams,
        };

        return this.call(formatedData);
    }

    TIMMsgFindMessages(msgFindMessagesParams: MsgFindMessagesParams) {
        const formatedData = {
            method: "TIMMsgFindMessages",
            manager: Managers.advanceMessageManager,
            param: msgFindMessagesParams,
        };

        return this.call(formatedData);
    }

    TIMMsgReportReaded(msgReportReadedParams: MsgReportReadedParams) {
        const formatedData = {
            method: "TIMMsgReportReaded",
            manager: Managers.advanceMessageManager,
            param: msgReportReadedParams,
        };

        return this.call(formatedData);
    }

    TIMMsgRevoke(msgRevokeParams: MsgRevokeParams) {
        const formatedData = {
            method: "TIMMsgRevoke",
            manager: Managers.advanceMessageManager,
            param: msgRevokeParams,
        };

        return this.call(formatedData);
    }

    TIMMsgFindByMsgLocatorList(
        msgFindByMsgLocatorListParams: MsgFindByMsgLocatorListParams
    ) {
        const formatedData = {
            method: "TIMMsgFindByMsgLocatorList",
            manager: Managers.advanceMessageManager,
            param: msgFindByMsgLocatorListParams,
        };

        return this.call(formatedData);
    }

    TIMMsgImportMsgList(msgImportMsgListParams: MsgImportMsgListParams) {
        const formatedData = {
            method: "TIMMsgImportMsgList",
            manager: Managers.advanceMessageManager,
            param: msgImportMsgListParams,
        };

        return this.call(formatedData);
    }

    TIMMsgSaveMsg(msgSaveMsgParams: MsgSaveMsgParams) {
        const formatedData = {
            method: "TIMMsgSaveMsg",
            manager: Managers.advanceMessageManager,
            param: msgSaveMsgParams,
        };

        return this.call(formatedData);
    }

    TIMMsgGetMsgList(msgGetMsgListParams: MsgGetMsgListParams) {
        const formatedData = {
            method: "TIMMsgGetMsgList",
            manager: Managers.advanceMessageManager,
            param: msgGetMsgListParams,
        };

        return this.call(formatedData);
    }

    TIMMsgDelete(msgDeleteParams: MsgDeleteParams) {
        const formatedData = {
            method: "TIMMsgDelete",
            manager: Managers.advanceMessageManager,
            param: msgDeleteParams,
        };

        return this.call(formatedData);
    }

    TIMMsgListDelete(msgListDeleteParams: MsgListDeleteParams) {
        const formatedData = {
            method: "TIMMsgListDelete",
            manager: Managers.advanceMessageManager,
            param: msgListDeleteParams,
        };

        return this.call(formatedData);
    }

    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ) {
        const formatedData = {
            method: "TIMMsgClearHistoryMessage",
            manager: Managers.advanceMessageManager,
            param: msgClearHistoryMessageParams,
        };

        return this.call(formatedData);
    }

    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgSetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgSetC2CReceiveMessageOptParams,
        };

        return this.call(formatedData);
    }

    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgGetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgGetC2CReceiveMessageOptParams,
        };

        return this.call(formatedData);
    }

    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgSetGroupReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgSetGroupReceiveMessageOptParams,
        };

        return this.call(formatedData);
    }

    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ) {
        const formatedData = {
            method: "TIMMsgDownloadElemToPath",
            manager: Managers.advanceMessageManager,
            param: msgDownloadElemToPathParams,
        };

        return this.call(formatedData);
    }

    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ) {
        const formatedData = {
            method: "TIMMsgDownloadMergerMessage",
            manager: Managers.advanceMessageManager,
            param: msgDownloadMergerMessageParams,
        };

        return this.call(formatedData);
    }

    TIMMsgBatchSend(msgBatchSendParams: MsgBatchSendParams) {
        const formatedData = {
            method: "TIMMsgBatchSend",
            manager: Managers.advanceMessageManager,
            param: msgBatchSendParams,
        };

        return this.call(formatedData);
    }

    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ) {
        const formatedData = {
            method: "TIMMsgSearchLocalMessages",
            manager: Managers.advanceMessageManager,
            param: msgSearchLocalMessagesParams,
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
