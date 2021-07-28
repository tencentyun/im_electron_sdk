type CallType = 1 | 2; // 1音频通话 2 视频通话

interface TRTCCallingCallParam {
    userID: string;
    type: CallType;
    data?: string;
}
interface TRTCCallingCallGroupParam {
    userIDs: Array<string>;
    type: CallType;
    groupID: string;
    data?: string;
}
export { TRTCCallingCallParam, TRTCCallingCallGroupParam };
