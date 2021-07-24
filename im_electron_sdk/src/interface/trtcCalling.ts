type CallType = 1 | 2; // 1音频通话 2 视频通话

interface TRTCCallingCallParam {
    userID: string;
    type: CallType;
}
interface TRTCCallingCallGroupParam {
    userIDs: Array<string>;
    type: CallType;
    groupID: string;
}
export { TRTCCallingCallParam, TRTCCallingCallGroupParam };
