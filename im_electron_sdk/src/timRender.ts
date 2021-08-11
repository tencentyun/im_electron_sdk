import { TIMIPCLISTENR } from "./const/const";
import { v4 as uuidv4 } from "uuid";
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
    TIMOnAddFriendCallbackParams,
    TIMOnDeleteFriendCallbackParams,
    TIMUpdateFriendProfileCallbackParams,
    TIMFriendAddRequestCallbackParams,
    TIMFriendApplicationListDeletedCallbackParams,
    TIMFriendApplicationListReadCallbackParams,
    TIMFriendBlackListAddedCallbackParams,
    TIMFriendBlackListDeletedCallbackParams,
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
    TIMRecvNewMsgCallbackParams,
    TIMMsgReadedReceiptCallbackParams,
    TIMMsgRevokeCallbackParams,
    TIMMsgElemUploadProgressCallbackParams,
    TIMMsgUpdateCallbackParams,
    TIMSetConfigParam,
    TIMSetLogCallbackParam,
    callExperimentalAPIParam,
    TIMProfileModifySelfUserProfileParam,
    TIMProfileGetUserProfileListParam,
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
import {
    ActionType,
    customDataTpl,
    handleParam,
    signalCallback,
    TRTCCallingCallGroupParam,
    TRTCCallingCallParam,
} from "./interface/trtcCalling";
import { TIMConvType } from "./enum";
const deepClone = (obj: object) => {
    if (!obj) {
        return false;
    }
    // 先简单实现
    return JSON.parse(JSON.stringify(obj));
};

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
    private _callingInfo: Map<string, any> = new Map();
    constructor() {
        if (!TimRender.isListened) {
            ipcRenderer.on("global-callback-reply", (e: any, res: any) => {
                try {
                    const { callbackKey, responseData } = JSON.parse(res);
                    if (TimRender.runtime.has(callbackKey)) {
                        //@ts-ignore
                        TimRender.runtime.get(callbackKey)(responseData);

                        // 处理信令的逻辑

                        if (callbackKey === "TIMAddRecvNewMsgCallback") {
                            //收到消息
                            this._handleMessage(responseData[0]);
                        }
                    }
                } catch (err) {
                    console.error("全局回调异常", err);
                }
            });
            TimRender.isListened = true;
        }
    }
    private async _handleMessage(message: any) {
        if (message) {
            try {
                const messageItems = JSON.parse(message);
                for (let j = 0; j < messageItems.length; j++) {
                    const { message_elem_array } = messageItems[j];
                    for (let i = 0; i < message_elem_array.length; i++) {
                        const { elem_type } = message_elem_array[i];
                        if (elem_type === 3) {
                            // 自定义消息
                            const { custom_elem_data } = message_elem_array[i];
                            try {
                                const parasedData =
                                    JSON.parse(custom_elem_data);
                                if (parasedData) {
                                    const { inviteID, actionType } =
                                        parasedData;
                                    if (inviteID) {
                                        // 是信令消息
                                        switch (actionType) {
                                            case ActionType.INVITE:
                                                this._onInvited(
                                                    inviteID,
                                                    parasedData,
                                                    message
                                                );
                                                break;
                                            case ActionType.ACCEPT_INVITE:
                                                this._onAccepted(
                                                    inviteID,
                                                    parasedData,
                                                    message
                                                );
                                                break;
                                            case ActionType.CANCEL_INVITE:
                                                this._onCanceled(
                                                    inviteID,
                                                    parasedData,
                                                    message
                                                );
                                                break;
                                            case ActionType.INVITE_TIMEOUT:
                                                this._onTimeouted(
                                                    inviteID,
                                                    parasedData,
                                                    message
                                                );
                                                break;
                                            case ActionType.REJECT_INVITE:
                                                this._onRejected(
                                                    inviteID,
                                                    parasedData,
                                                    message
                                                );
                                                break;
                                        }
                                    }
                                }
                            } catch (err) {}
                        }
                    }
                }
            } catch (err) {
                console.error("解析消息失败：", err);
            }
        }
    }
    private async _call(data: any): Promise<commonResponse> {
        const response = await ipcRenderer.invoke(
            TIMIPCLISTENR,
            JSON.stringify(data)
        );
        return JSON.parse(response);
    }
    private _removeFormArr = (arr: any[], target: any) => {
        for (let i = 0; i < arr.length; i++) {
            if ((arr[i] = target)) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    };
    testDoc(param: TestInterface) {}

    private async _onInvited(inviteID: string, parsedData: any, message: any) {
        //@ts-ignore
        const userID = (await this.TIMGetLoginUserID({})).data.json_param;
        const { inviteeList } = parsedData;
        if (inviteeList && inviteeList.length && inviteeList.includes(userID)) {
            if (TimRender.runtime.get("TIMOnInvited")) {
                //@ts-ignore
                TimRender.runtime.get("TIMOnInvited")(message);
                this._callingInfo.set(inviteID, parsedData);
            }
        }
    }
    private async _onRejected(inviteID: string, parsedData: any, message: any) {
        const callInfo = deepClone(this._callingInfo.get(inviteID));
        if (callInfo) {
            //@ts-ignore
            const userID = (await this.TIMGetLoginUserID({})).data.json_param;
            const { inviteeList, inviter } = parsedData;
            const { message_sender } = JSON.parse(message)[0];
            if (
                (inviteeList &&
                    inviteeList.length &&
                    inviteeList.includes(userID)) ||
                inviter === userID
            ) {
                if (TimRender.runtime.get("TIMOnRejected")) {
                    //@ts-ignore
                    TimRender.runtime.get("TIMOnRejected")(message);
                    // 收到拒绝，要把人从inviteList里去掉
                    const { inviteeList } = callInfo;
                    const newInviteeList = this._removeFormArr(
                        inviteeList,
                        message_sender
                    );
                    if (newInviteeList.length > 0) {
                        callInfo.inviteeList = newInviteeList;
                        this._callingInfo.set(inviteID, callInfo);
                    } else {
                        this._callingInfo.delete(inviteID);
                    }
                }
            }
        }
    }
    private async _onAccepted(inviteID: string, parsedData: any, message: any) {
        const callInfo = deepClone(this._callingInfo.get(inviteID));
        if (callInfo) {
            //@ts-ignore
            const userID = (await this.TIMGetLoginUserID({})).data.json_param;
            const { inviteeList, inviter } = parsedData;
            const { message_sender } = JSON.parse(message)[0];
            if (
                (inviteeList &&
                    inviteeList.length &&
                    inviteeList.includes(userID)) ||
                inviter === userID
            ) {
                if (TimRender.runtime.get("TIMOnAccepted")) {
                    //@ts-ignore
                    TimRender.runtime.get("TIMOnAccepted")(message);
                    // 收到拒绝，要把人从inviteList里去掉
                    const { inviteeList } = callInfo;
                    const newInviteeList = this._removeFormArr(
                        inviteeList,
                        message_sender
                    );
                    if (newInviteeList.length > 0) {
                        callInfo.inviteeList = newInviteeList;
                        this._callingInfo.set(inviteID, callInfo);
                    } else {
                        this._callingInfo.delete(inviteID);
                    }
                }
            }
        }
    }
    private async _onCanceled(inviteID: string, parsedData: any, message: any) {
        //@ts-ignore
        const userID = (await this.TIMGetLoginUserID({})).data.json_param;
        const { inviteeList, inviter } = parsedData;
        if (
            (inviteeList &&
                inviteeList.length &&
                inviteeList.includes(userID)) ||
            inviter === userID
        ) {
            if (TimRender.runtime.get("TIMOnCanceled")) {
                //@ts-ignore
                TimRender.runtime.get("TIMOnCanceled")(message);
                this._callingInfo.delete(inviteID);
            }
        }
    }
    private async _onTimeouted(
        inviteID: string,
        parsedData: any,
        message: any
    ) {
        //@ts-ignore
        const userID = (await this.TIMGetLoginUserID({})).data.json_param;
        const { inviteeList, inviter } = parsedData;
        if (
            (inviteeList &&
                inviteeList.length &&
                inviteeList.includes(userID)) ||
            inviter === userID
        ) {
            if (TimRender.runtime.get("TIMOnTimeout")) {
                //@ts-ignore
                TimRender.runtime.get("TIMOnTimeout")(message);
                this._callingInfo.delete(inviteID);
            }
        }
    }
    TIMOnInvited(param: signalCallback) {
        return new Promise(resolve => {
            TimRender.runtime.set("TIMOnInvited", param.callback);
            resolve({});
        });
    }
    TIMOnRejected(param: signalCallback) {
        return new Promise(resolve => {
            TimRender.runtime.set("TIMOnRejected", param.callback);
            resolve({});
        });
    }
    TIMOnAccepted(param: signalCallback) {
        return new Promise(resolve => {
            TimRender.runtime.set("TIMOnAccepted", param.callback);
            resolve({});
        });
    }
    TIMOnCanceled(param: signalCallback) {
        return new Promise(resolve => {
            TimRender.runtime.set("TIMOnCanceled", param.callback);
            resolve({});
        });
    }
    TIMOnTimeout(param: signalCallback) {
        return new Promise(resolve => {
            TimRender.runtime.set("TIMOnTimeout", param.callback);
            resolve({});
        });
    }
    TIMConvGetTotalUnreadMessageCount(param: convGetTotalUnreadMessageCount) {
        const formatedData = {
            method: "TIMConvGetTotalUnreadMessageCount",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvPinConversation(param: convPinConversation) {
        const formatedData = {
            method: "TIMConvPinConversation",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvGetConvInfo(param: convGetConvInfo) {
        const formatedData = {
            method: "TIMConvGetConvInfo",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvCancelDraft(param: convCancelDraft) {
        const formatedData = {
            method: "TIMConvCancelDraft",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvSetDraft(param: convSetDrat) {
        const formatedData = {
            method: "TIMConvSetDraft",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvGetConvList(param: getConvList) {
        const formatedData = {
            method: "TIMConvGetConvList",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvDelete(param: convDelete) {
        const formatedData = {
            method: "TIMConvDelete",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMConvCreate(param: convCreate) {
        const formatedData = {
            method: "TIMConvCreate",
            manager: Managers.conversationManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMSetConvTotalUnreadMessageCountChangedCallback(
        param: convTotalUnreadMessageCountChangedCallbackParam
    ) {
        const callback = `TIMSetConvTotalUnreadMessageCountChangedCallback`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvTotalUnreadMessageCountChangedCallback",
            manager: Managers.conversationManager,
            callback: callback,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMSetConvEventCallback(param: setConvEventCallback) {
        const callback = `TIMSetConvEventCallback`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetConvEventCallback",
            manager: Managers.conversationManager,
            callback: callback,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMSetUserSigExpiredCallback(param: TIMSetUserSigExpiredCallbackParam) {
        const callback = `TIMSetUserSigExpiredCallback`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetUserSigExpiredCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMSetKickedOfflineCallback(param: TIMSetKickedOfflineCallbackParam) {
        const callback = `TIMSetKickedOfflineCallback`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetKickedOfflineCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMSetNetworkStatusListenerCallback(
        param: TIMSetNetworkStatusListenerCallbackParam
    ) {
        const callback = `TIMSetNetworkStatusListenerCallback`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetNetworkStatusListenerCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMSetLogCallback(param: TIMSetLogCallbackParam) {
        const callback = `TIMSetLogCallback`;
        TimRender.runtime.set(callback, param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: "TIMSetLogCallback",
            manager: Managers.timBaseManager,
            callback: callback,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMUninit() {
        const formatedData = {
            method: "TIMUninit",
            manager: Managers.timBaseManager,
        };
        return this._call(formatedData);
    }
    TIMSetConfig(param: TIMSetConfigParam) {
        const formatedData = {
            method: "TIMSetConfig",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMGetSDKVersion() {
        const formatedData = {
            method: "TIMGetSDKVersion",
            manager: Managers.timBaseManager,
        };
        return this._call(formatedData);
    }
    TIMGetServerTime() {
        const formatedData = {
            method: "TIMGetServerTime",
            manager: Managers.timBaseManager,
        };
        return this._call(formatedData);
    }
    TIMLogout(param: logoutParam) {
        const formatedData = {
            method: "TIMLogout",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMInit() {
        return this._call({
            method: "TIMInit",
            manager: Managers.timBaseManager,
        });
    }
    TIMGetLoginStatus() {
        const formatedData = {
            method: "TIMGetLoginStatus",
            manager: Managers.timBaseManager,
        };
        return this._call(formatedData);
    }
    TIMGetLoginUserID(param: getLoginUserIDParam) {
        const formatedData = {
            method: "TIMGetLoginUserID",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call(formatedData);
    }
    callExperimentalAPI(param: callExperimentalAPIParam) {
        const formatedData = {
            method: "callExperimentalAPI",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMLogin(data: loginParam) {
        const formatedData = {
            method: "TIMLogin",
            manager: Managers.timBaseManager,
            param: data,
        };
        return this._call(formatedData);
    }
    TIMProfileGetUserProfileList(param: TIMProfileGetUserProfileListParam) {
        const formatedData = {
            method: "TIMProfileGetUserProfileList",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call(formatedData);
    }
    TIMProfileModifySelfUserProfile(
        param: TIMProfileModifySelfUserProfileParam
    ) {
        const formatedData = {
            method: "TIMProfileModifySelfUserProfile",
            manager: Managers.timBaseManager,
            param: param,
        };
        return this._call(formatedData);
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
        return this._call(formatedData);
    }

    TIMGroupInitGroupAttributes(
        initAttributesParams: InitGroupAttributeParams
    ) {
        const formatedData = {
            method: "TIMGroupInitGroupAttributes",
            manager: Managers.groupManager,
            param: initAttributesParams,
        };
        return this._call(formatedData);
    }

    TIMGroupSetGroupAttributes(setAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: "TIMGroupSetGroupAttributes",
            manager: Managers.groupManager,
            param: setAttributesParams,
        };
        return this._call(formatedData);
    }

    TIMGroupDeleteGroupAttributes(
        deleteAttributesParams: DeleteAttributeParams
    ) {
        const formatedData = {
            method: "TIMGroupDeleteGroupAttributes",
            manager: Managers.groupManager,
            param: deleteAttributesParams,
        };
        return this._call(formatedData);
    }

    TIMGroupGetGroupAttributes(getAttributeParams: DeleteAttributeParams) {
        const formatedData = {
            method: "TIMGroupGetGroupAttributes",
            manager: Managers.groupManager,
            param: getAttributeParams,
        };
        return this._call(formatedData);
    }

    TIMSetGroupAttributeChangedCallback(data: GroupAttributeCallbackParams) {
        const callback = "TIMSetGroupAttributeChangedCallback";
        const formatedData = {
            method: "TIMSetGroupAttributeChangedCallback",
            manager: Managers.groupManager,
            callback,
            param: data,
        };

        TimRender.runtime.set(callback, data.callback as unknown as Function);
        return this._call(formatedData);
    }

    TIMSetGroupTipsEventCallback(data: GroupTipsCallbackParams) {
        const callback = "TIMSetGroupTipsEventCallback";
        const formatedData = {
            method: "TIMSetGroupTipsEventCallback",
            manager: Managers.groupManager,
            callback,
            param: data,
        };

        TimRender.runtime.set(callback, data.callback as unknown as Function);
        return this._call(formatedData);
    }

    TIMGroupDelete(data: DeleteGroupParams) {
        const formatedData = {
            method: "TIMGroupDelete",
            manager: Managers.groupManager,
            param: data,
        };

        return this._call(formatedData);
    }

    TIMGroupJoin(joinGroupParams: JoinGroupParams) {
        const formatedData = {
            method: "TIMGroupJoin",
            manager: Managers.groupManager,
            param: joinGroupParams,
        };

        return this._call(formatedData);
    }

    TIMGroupQuit(quitGroupParams: QuitGroupParams) {
        const formatedData = {
            method: "TIMGroupQuit",
            manager: Managers.groupManager,
            param: quitGroupParams,
        };

        return this._call(formatedData);
    }

    TIMGroupInviteMember(inviteMemberParams: InviteMemberParams) {
        const formatedData = {
            method: "TIMGroupInviteMember",
            manager: Managers.groupManager,
            param: inviteMemberParams,
        };

        return this._call(formatedData);
    }

    TIMGroupDeleteMember(deleteMemberParams: DeleteMemberParams) {
        const formatedData = {
            method: "TIMGroupDeleteMember",
            manager: Managers.groupManager,
            param: deleteMemberParams,
        };

        return this._call(formatedData);
    }

    TIMGroupGetJoinedGroupList(data?: string) {
        const formatedData = {
            method: "TIMGroupGetJoinedGroupList",
            manager: Managers.groupManager,
            param: data,
        };

        return this._call(formatedData);
    }

    TIMGroupGetGroupInfoList(getGroupListParams: GetGroupListParams) {
        const formatedData = {
            method: "TIMGroupGetGroupInfoList",
            manager: Managers.groupManager,
            param: getGroupListParams,
        };

        return this._call(formatedData);
    }

    TIMGroupModifyGroupInfo(modifyGroupParams: ModifyGroupParams) {
        const formatedData = {
            method: "TIMGroupModifyGroupInfo",
            manager: Managers.groupManager,
            param: modifyGroupParams,
        };

        return this._call(formatedData);
    }

    TIMGroupGetMemberInfoList(
        getGroupMemberInfoParams: GetGroupMemberInfoParams
    ) {
        const formatedData = {
            method: "TIMGroupGetMemberInfoList",
            manager: Managers.groupManager,
            param: getGroupMemberInfoParams,
        };

        return this._call(formatedData);
    }

    TIMGroupModifyMemberInfo(modifyMemberInfoParams: ModifyMemberInfoParams) {
        const formatedData = {
            method: "TIMGroupModifyMemberInfo",
            manager: Managers.groupManager,
            param: modifyMemberInfoParams,
        };

        return this._call(formatedData);
    }

    TIMGroupGetPendencyList(getPendencyListParams: GetPendencyListParams) {
        const formatedData = {
            method: "TIMGroupGetPendencyList",
            manager: Managers.groupManager,
            param: getPendencyListParams,
        };

        return this._call(formatedData);
    }

    TIMGroupReportPendencyReaded(reportParams: ReportParams) {
        const formatedData = {
            method: "TIMGroupReportPendencyReaded",
            manager: Managers.groupManager,
            param: reportParams,
        };

        return this._call(formatedData);
    }

    TIMGroupHandlePendency(handlePendencyParams: HandlePendencyParams) {
        const formatedData = {
            method: "TIMGroupHandlePendency",
            manager: Managers.groupManager,
            param: handlePendencyParams,
        };

        return this._call(formatedData);
    }

    TIMGroupGetOnlineMemberCount(params: GetOnlineMemberCountParams) {
        const formatedData = {
            method: "TIMGroupGetOnlineMemberCount",
            manager: Managers.groupManager,
            param: params,
        };

        return this._call(formatedData);
    }

    TIMGroupSearchGroups(searchGroupsParams: SearchGroupParams) {
        const formatedData = {
            method: "TIMGroupSearchGroups",
            manager: Managers.groupManager,
            param: searchGroupsParams,
        };

        return this._call(formatedData);
    }

    TIMGroupSearchGroupMembers(searchMemberParams: SearchMemberParams) {
        const formatedData = {
            method: "TIMGroupSearchGroupMembers",
            manager: Managers.groupManager,
            param: searchMemberParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipGetFriendProfileList(
        getFriendProfileListParams: GetFriendProfileListParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendProfileList",
            manager: Managers.friendshipManager,
            param: getFriendProfileListParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipAddFriend(addFriendParams: AddFriendParams) {
        const formatedData = {
            method: "TIMFriendshipAddFriend",
            manager: Managers.friendshipManager,
            param: addFriendParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipHandleFriendAddRequest(
        handleFriendAddParams: HandleFriendAddParams
    ) {
        const formatedData = {
            method: "TIMFriendshipHandleFriendAddRequest",
            manager: Managers.friendshipManager,
            param: handleFriendAddParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipModifyFriendProfile(
        modifyFriendProfileParams: ModifyFriendProfileParams
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendProfile",
            manager: Managers.friendshipManager,
            param: modifyFriendProfileParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipDeleteFriend(deleteFriendParams: DeleteFriendParams) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriend",
            manager: Managers.friendshipManager,
            param: deleteFriendParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipCheckFriendType(checkFriendTypeParams: CheckFriendTypeParams) {
        const formatedData = {
            method: "TIMFriendshipCheckFriendType",
            manager: Managers.friendshipManager,
            param: checkFriendTypeParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipCreateFriendGroup(
        createFriendGroupParams: CreateFriendGroupParams
    ) {
        const formatedData = {
            method: "TIMFriendshipCreateFriendGroup",
            manager: Managers.friendshipManager,
            param: createFriendGroupParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipGetFriendGroupList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendGroupList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipModifyFriendGroup(
        modifyFriendGroupParams: ModifyFriendGroupParams
    ) {
        const formatedData = {
            method: "TIMFriendshipModifyFriendGroup",
            manager: Managers.friendshipManager,
            param: modifyFriendGroupParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipDeleteFriendGroup(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFriendGroup",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipAddToBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipAddToBlackList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipGetBlackList(getBlackListParams: GetBlackListParams) {
        const formatedData = {
            method: "TIMFriendshipGetBlackList",
            manager: Managers.friendshipManager,
            param: getBlackListParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipDeleteFromBlackList(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipDeleteFromBlackList",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipGetPendencyList(
        friendshipGetPendencyListParams: FriendshipGetPendencyListParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetPendencyList",
            manager: Managers.friendshipManager,
            param: friendshipGetPendencyListParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipDeletePendency(deletePendencyParams: DeletePendencyParams) {
        const formatedData = {
            method: "TIMFriendshipDeletePendency",
            manager: Managers.friendshipManager,
            param: deletePendencyParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipReportPendencyReaded(
        reportPendencyReadedParams: ReportPendencyReadedParams
    ) {
        const formatedData = {
            method: "TIMFriendshipReportPendencyReaded",
            manager: Managers.friendshipManager,
            param: reportPendencyReadedParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipSearchFriends(searchFriendsParams: SearchFriendsParams) {
        const formatedData = {
            method: "TIMFriendshipSearchFriends",
            manager: Managers.friendshipManager,
            param: searchFriendsParams,
        };

        return this._call(formatedData);
    }

    TIMFriendshipGetFriendsInfo(
        friendshipStringArrayParams: FriendshipStringArrayParams
    ) {
        const formatedData = {
            method: "TIMFriendshipGetFriendsInfo",
            manager: Managers.friendshipManager,
            param: friendshipStringArrayParams,
        };

        return this._call(formatedData);
    }

    TIMSetOnAddFriendCallback(params: TIMOnAddFriendCallbackParams) {
        const callback = "TIMSetOnAddFriendCallback";
        const formatedData = {
            method: "TIMSetOnAddFriendCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);

        return this._call(formatedData);
    }

    TIMSetOnDeleteFriendCallback(params: TIMOnDeleteFriendCallbackParams) {
        const callback = "TIMSetOnDeleteFriendCallback";
        const formatedData = {
            method: "TIMSetOnDeleteFriendCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);

        return this._call(formatedData);
    }

    TIMSetUpdateFriendProfileCallback(
        params: TIMUpdateFriendProfileCallbackParams
    ) {
        const callback = "TIMSetUpdateFriendProfileCallback";
        const formatedData = {
            method: "TIMSetUpdateFriendProfileCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);

        return this._call(formatedData);
    }

    TIMSetFriendAddRequestCallback(params: TIMFriendAddRequestCallbackParams) {
        const callback = "TIMSetFriendAddRequestCallback";
        const formatedData = {
            method: "TIMSetFriendAddRequestCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);

        return this._call(formatedData);
    }

    TIMSetFriendApplicationListDeletedCallback(
        params: TIMFriendApplicationListDeletedCallbackParams
    ) {
        const callback = "TIMSetFriendApplicationListDeletedCallback";
        const formatedData = {
            method: "TIMSetFriendApplicationListDeletedCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMSetFriendApplicationListReadCallback(
        params: TIMFriendApplicationListReadCallbackParams
    ) {
        const callback = "TIMSetFriendApplicationListReadCallback";
        const formatedData = {
            method: "TIMSetFriendApplicationListReadCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMSetFriendBlackListAddedCallback(
        params: TIMFriendBlackListAddedCallbackParams
    ) {
        const callback = "TIMSetFriendBlackListAddedCallback";
        const formatedData = {
            method: "TIMSetFriendBlackListAddedCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMSetFriendBlackListDeletedCallback(
        params: TIMFriendBlackListDeletedCallbackParams
    ) {
        const callback = "TIMSetFriendBlackListDeletedCallback";
        const formatedData = {
            method: "TIMSetFriendBlackListDeletedCallback",
            manager: Managers.friendshipManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMMsgSendMessage(msgSendMessageParams: MsgSendMessageParams) {
        const formatedData = {
            method: "TIMMsgSendMessage",
            manager: Managers.advanceMessageManager,
            param: msgSendMessageParams,
        };

        return this._call(formatedData);
    }

    TIMMsgCancelSend(msgCancelSendParams: MsgCancelSendParams) {
        const formatedData = {
            method: "TIMMsgCancelSend",
            manager: Managers.advanceMessageManager,
            param: msgCancelSendParams,
        };

        return this._call(formatedData);
    }

    TIMMsgFindMessages(msgFindMessagesParams: MsgFindMessagesParams) {
        const formatedData = {
            method: "TIMMsgFindMessages",
            manager: Managers.advanceMessageManager,
            param: msgFindMessagesParams,
        };

        return this._call(formatedData);
    }

    TIMMsgReportReaded(msgReportReadedParams: MsgReportReadedParams) {
        const formatedData = {
            method: "TIMMsgReportReaded",
            manager: Managers.advanceMessageManager,
            param: msgReportReadedParams,
        };

        return this._call(formatedData);
    }

    TIMMsgRevoke(msgRevokeParams: MsgRevokeParams) {
        const formatedData = {
            method: "TIMMsgRevoke",
            manager: Managers.advanceMessageManager,
            param: msgRevokeParams,
        };

        return this._call(formatedData);
    }

    TIMMsgFindByMsgLocatorList(
        msgFindByMsgLocatorListParams: MsgFindByMsgLocatorListParams
    ) {
        const formatedData = {
            method: "TIMMsgFindByMsgLocatorList",
            manager: Managers.advanceMessageManager,
            param: msgFindByMsgLocatorListParams,
        };

        return this._call(formatedData);
    }

    TIMMsgImportMsgList(msgImportMsgListParams: MsgImportMsgListParams) {
        const formatedData = {
            method: "TIMMsgImportMsgList",
            manager: Managers.advanceMessageManager,
            param: msgImportMsgListParams,
        };

        return this._call(formatedData);
    }

    TIMMsgSaveMsg(msgSaveMsgParams: MsgSaveMsgParams) {
        const formatedData = {
            method: "TIMMsgSaveMsg",
            manager: Managers.advanceMessageManager,
            param: msgSaveMsgParams,
        };

        return this._call(formatedData);
    }

    TIMMsgGetMsgList(msgGetMsgListParams: MsgGetMsgListParams) {
        const formatedData = {
            method: "TIMMsgGetMsgList",
            manager: Managers.advanceMessageManager,
            param: msgGetMsgListParams,
        };

        return this._call(formatedData);
    }

    TIMMsgDelete(msgDeleteParams: MsgDeleteParams) {
        const formatedData = {
            method: "TIMMsgDelete",
            manager: Managers.advanceMessageManager,
            param: msgDeleteParams,
        };

        return this._call(formatedData);
    }

    TIMMsgListDelete(msgListDeleteParams: MsgListDeleteParams) {
        const formatedData = {
            method: "TIMMsgListDelete",
            manager: Managers.advanceMessageManager,
            param: msgListDeleteParams,
        };

        return this._call(formatedData);
    }

    TIMMsgClearHistoryMessage(
        msgClearHistoryMessageParams: MsgClearHistoryMessageParams
    ) {
        const formatedData = {
            method: "TIMMsgClearHistoryMessage",
            manager: Managers.advanceMessageManager,
            param: msgClearHistoryMessageParams,
        };

        return this._call(formatedData);
    }

    TIMMsgSetC2CReceiveMessageOpt(
        msgSetC2CReceiveMessageOptParams: MsgSetC2CReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgSetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgSetC2CReceiveMessageOptParams,
        };

        return this._call(formatedData);
    }

    TIMMsgGetC2CReceiveMessageOpt(
        msgGetC2CReceiveMessageOptParams: MsgGetC2CReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgGetC2CReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgGetC2CReceiveMessageOptParams,
        };

        return this._call(formatedData);
    }

    TIMMsgSetGroupReceiveMessageOpt(
        msgSetGroupReceiveMessageOptParams: MsgSetGroupReceiveMessageOptParams
    ) {
        const formatedData = {
            method: "TIMMsgSetGroupReceiveMessageOpt",
            manager: Managers.advanceMessageManager,
            param: msgSetGroupReceiveMessageOptParams,
        };

        return this._call(formatedData);
    }

    TIMMsgDownloadElemToPath(
        msgDownloadElemToPathParams: MsgDownloadElemToPathParams
    ) {
        const formatedData = {
            method: "TIMMsgDownloadElemToPath",
            manager: Managers.advanceMessageManager,
            param: msgDownloadElemToPathParams,
        };

        return this._call(formatedData);
    }

    TIMMsgDownloadMergerMessage(
        msgDownloadMergerMessageParams: MsgDownloadMergerMessageParams
    ) {
        const formatedData = {
            method: "TIMMsgDownloadMergerMessage",
            manager: Managers.advanceMessageManager,
            param: msgDownloadMergerMessageParams,
        };

        return this._call(formatedData);
    }

    TIMMsgBatchSend(msgBatchSendParams: MsgBatchSendParams) {
        const formatedData = {
            method: "TIMMsgBatchSend",
            manager: Managers.advanceMessageManager,
            param: msgBatchSendParams,
        };

        return this._call(formatedData);
    }

    TIMMsgSearchLocalMessages(
        msgSearchLocalMessagesParams: MsgSearchLocalMessagesParams
    ) {
        const formatedData = {
            method: "TIMMsgSearchLocalMessages",
            manager: Managers.advanceMessageManager,
            param: msgSearchLocalMessagesParams,
        };

        return this._call(formatedData);
    }

    TIMAddRecvNewMsgCallback(params: TIMRecvNewMsgCallbackParams) {
        const callback = "TIMAddRecvNewMsgCallback";
        const formatedData = {
            method: "TIMAddRecvNewMsgCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMRemoveRecvNewMsgCallback() {
        const formatedData = {
            method: "TIMRemoveRecvNewMsgCallback",
            manager: Managers.advanceMessageManager,
        };

        return this._call(formatedData);
    }

    TIMSetMsgReadedReceiptCallback(params: TIMMsgReadedReceiptCallbackParams) {
        const callback = "TIMSetMsgReadedReceiptCallback";
        const formatedData = {
            method: "TIMSetMsgReadedReceiptCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMSetMsgRevokeCallback(params: TIMMsgRevokeCallbackParams) {
        const callback = "TIMSetMsgRevokeCallback";
        const formatedData = {
            method: "TIMSetMsgRevokeCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMSetMsgElemUploadProgressCallback(
        params: TIMMsgElemUploadProgressCallbackParams
    ) {
        const callback = "TIMSetMsgElemUploadProgressCallback";
        const formatedData = {
            method: "TIMSetMsgElemUploadProgressCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }

    TIMSetMsgUpdateCallback(params: TIMMsgUpdateCallbackParams) {
        const callback = "TIMSetMsgUpdateCallback";
        const formatedData = {
            method: "TIMSetMsgUpdateCallback",
            manager: Managers.advanceMessageManager,
            callback,
            param: params,
        };

        TimRender.runtime.set(callback, params.callback);
        return this._call(formatedData);
    }
    private _getSignalCustomData(param: customDataTpl) {
        const {
            inviter,
            inviteID,
            actionType,
            inviteeList,
            timeout = 30,
            groupID = "",
            data,
        } = param;
        const tpl = {
            onlineUserOnly: false,
            businessID: 1,
            inviteID: inviteID,
            inviter: inviter,
            actionType: actionType,
            inviteeList: inviteeList,
            data: data,
            timeout: timeout,
            groupID: groupID,
        };
        return tpl;
    }
    private _setCallingTimeout(inviteID: string) {
        const callInfo = deepClone(this._callingInfo.get(inviteID));
        if (callInfo) {
            const { timeout } = callInfo;
            const timmer = setTimeout(() => {
                clearTimeout(timmer);
                this._timeout(inviteID);
            }, timeout * 1000);
        }
    }
    private async _timeout(inviteID: string) {
        const callInfo = deepClone(this._callingInfo.get(inviteID));
        if (callInfo) {
            const { userID, groupID } = callInfo;
            callInfo.actionType = ActionType.INVITE_TIMEOUT;
            callInfo.handleID = ( // @ts-ignore
                await this.TIMGetLoginUserID({})
            ).data.json_param;

            const {
                //@ts-ignore
                data: { code, json_params },
            } = await this._sendCumtomMessage(
                groupID ? groupID : userID,
                callInfo.handleID,
                callInfo,
                groupID ? true : false
            );
            if (code === 0) {
                this._onTimeouted(inviteID, callInfo, json_params); // 让自己也知道超时了
                this._callingInfo.delete(inviteID);
            }
        }
    }
    private async _sendCumtomMessage(
        userID: string,
        senderID: string,
        customData: object,
        isGroup?: boolean
    ) {
        return this.TIMMsgSendMessage({
            conv_id: userID,
            conv_type: isGroup
                ? TIMConvType.kTIMConv_Group
                : TIMConvType.kTIMConv_C2C,
            params: {
                message_elem_array: [
                    {
                        elem_type: 3, // 自定义消息
                        custom_elem_data: JSON.stringify(customData),
                        custom_elem_desc: "",
                        custom_elem_ext: "",
                        custom_elem_sound: "",
                    },
                ],
                message_sender: senderID,
            },
        });
    }
    // TRTCCalling start
    TIMInvite(param: TRTCCallingCallParam) {
        return new Promise(async (resolve, reject) => {
            const {
                userID,
                senderID,
                timeout = 30,
                data = JSON.stringify({}),
            } = param;
            const inviteID = uuidv4();
            const customData = this._getSignalCustomData({
                inviter: senderID,
                inviteeList: [userID],
                actionType: ActionType.INVITE,
                inviteID,
                timeout,
                data,
            });
            const res = await this._sendCumtomMessage(
                userID,
                senderID,
                customData
            );
            // @ts-ignore
            const { code } = res.data;
            if (code === 0) {
                this._callingInfo.set(inviteID, customData);
                if (timeout > 0) {
                    this._setCallingTimeout(inviteID);
                }
                resolve({
                    inviteID,
                    ...res,
                });
            } else {
                reject(res);
            }
        });
    }

    TIMInviteInGroup(param: TRTCCallingCallGroupParam) {
        return new Promise(async (resolve, reject) => {
            const { userIDs, senderID, timeout = 30, groupID, data } = param;
            const inviteID = uuidv4();
            const customData = this._getSignalCustomData({
                inviter: senderID,
                inviteeList: userIDs,
                actionType: ActionType.INVITE,
                inviteID,
                timeout,
                groupID,
                data,
            });
            const res = await this._sendCumtomMessage(
                groupID,
                senderID,
                customData,
                true
            );
            // @ts-ignore
            const { code } = res.data;
            if (code === 0) {
                this._callingInfo.set(inviteID, customData);
                if (timeout > 0) {
                    this._setCallingTimeout(inviteID);
                }
                resolve({
                    inviteID,
                    ...res,
                });
            } else {
                reject(res);
            }
        });
    }

    TIMAcceptInvite(param: handleParam) {
        return new Promise(async (resolve, reject) => {
            const { inviteID, data } = param;
            const callInfo = deepClone(this._callingInfo.get(inviteID));
            if (callInfo) {
                const { groupID, inviter } = callInfo;
                callInfo.actionType = ActionType.ACCEPT_INVITE;
                callInfo.data = data;
                // @ts-ignore
                const senderID = (await this.TIMGetLoginUserID({})).data
                    .json_param;
                const res = await this._sendCumtomMessage(
                    groupID ? groupID : inviter,
                    senderID,
                    callInfo,
                    groupID ? true : false
                );
                // @ts-ignore
                const { code } = res.data;
                if (code === 0) {
                    resolve({
                        inviteID,
                        ...res,
                    });
                } else {
                    reject(res);
                }
            } else {
                resolve({
                    code: 8010,
                    desc: "inviteID is invalid or invitation has been processed",
                });
            }
        });
    }
    TIMRejectInvite(param: handleParam) {
        return new Promise(async (resolve, reject) => {
            const { inviteID, data } = param;
            const callInfo = deepClone(this._callingInfo.get(inviteID));
            if (callInfo) {
                const { groupID, inviter } = callInfo;
                callInfo.actionType = ActionType.REJECT_INVITE;
                callInfo.data = data;
                // @ts-ignore
                const sendID = (await this.TIMGetLoginUserID({})).data
                    .json_param;

                const res = await this._sendCumtomMessage(
                    groupID ? groupID : inviter,
                    sendID,
                    callInfo,
                    groupID ? true : false
                );
                // @ts-ignore
                const { code } = res.data;
                if (code === 0) {
                    this._callingInfo.delete(inviteID);
                    resolve({
                        inviteID,
                        ...res,
                    });
                } else {
                    reject(res);
                }
            } else {
                reject({
                    code: 8010,
                    desc: "inviteID is invalid or invitation has been processed",
                });
            }
        });
    }
    TIMCancelInvite(param: handleParam) {
        return new Promise(async (resolve, reject) => {
            const { inviteID, data } = param;
            const callInfo = deepClone(this._callingInfo.get(inviteID));
            if (callInfo) {
                const { inviteeList, groupID } = callInfo;
                callInfo.actionType = ActionType.CANCEL_INVITE;
                callInfo.data = data;
                // @ts-ignore
                const senderID = (await this.TIMGetLoginUserID({})).data
                    .json_param;

                const res = await this._sendCumtomMessage(
                    groupID ? groupID : inviteeList[0],
                    senderID,
                    callInfo,
                    groupID ? true : false
                );
                // @ts-ignore
                const { code } = res.data;
                if (code === 0) {
                    resolve({
                        inviteID,
                        ...res,
                    });
                } else {
                    reject(res);
                }
            } else {
                reject({
                    code: 8010,
                    desc: "inviteID is invalid or invitation has been processed",
                });
            }
        });
    }
}
