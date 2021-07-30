type CallType = 1 | 2; // 1音频通话 2 视频通话

enum ActionType {
    INVITE = 1,
    CANCEL_INVITE = 2,
    ACCEPT_INVITE = 3,
    REJECT_INVITE = 4,
    INVITE_TIMEOUT = 5,
}
interface TRTCCallingCallParam {
    userID: string;
    senderID: string;
    data?: string;
    roomID?: string;
    timeout?: number;
    groupID?: string;
    callType: CallType;
}
interface TRTCCallingCallGroupParam {
    userIDs: Array<string>;
    senderID: string;
    groupID: string;
    data?: string;
    roomID?: string;
    timeout?: number;
    callType: CallType;
}
interface customDataTpl {
    inviteID: string;
    inviter: string;
    inviteeList: Array<string>;
    callType: CallType;
    timeout?: number;
    groupID?: string;
    actionType: ActionType;
    roomID?: string;
    userID?: string;
}
interface handleParam {
    inviteID: string;
    data?: string;
}

interface signalCallback {
    callback: Function;
}
export {
    TRTCCallingCallParam,
    TRTCCallingCallGroupParam,
    customDataTpl,
    ActionType,
    signalCallback,
    handleParam,
};
