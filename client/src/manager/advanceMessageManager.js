import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();

const advanceMessageManager = {
    TIMMsgSendMessage:() => {
        return timRenderInstance.TIMMsgSendMessage();
    },
    TIMMsgCancelSend:() => {
        return timRenderInstance.TIMMsgCancelSend();
    },
    TIMMsgFindMessages:() => {
        return timRenderInstance.TIMMsgFindMessages();
    },
    TIMMsgReportReaded:() => {
        return timRenderInstance.TIMMsgReportReaded();
    },
    TIMMsgRevoke:() => {
        return timRenderInstance.TIMMsgRevoke();
    },
    TIMMsgFindByMsgLocatorList:() => {
        return timRenderInstance.TIMMsgFindByMsgLocatorList();
    },
    TIMMsgImportMsgList:() => {
        return timRenderInstance.TIMMsgImportMsgList();
    },
    TIMMsgSaveMsg:() => {
        return timRenderInstance.TIMMsgSaveMsg();
    },
    TIMMsgGetMsgList:() => {
        return timRenderInstance.TIMMsgGetMsgList();
    },
    TIMMsgDelete:() => {
        return timRenderInstance.TIMMsgDelete();
    },
    TIMMsgListDelete:() => {
        return timRenderInstance.TIMMsgListDelete();
    },
    TIMMsgClearHistoryMessage:() => {
        return timRenderInstance.TIMMsgClearHistoryMessage();
    },
    TIMMsgSetC2CReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgSetC2CReceiveMessageOpt();
    },
    TIMMsgGetC2CReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgGetC2CReceiveMessageOpt();
    },
    TIMMsgSetGroupReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgSetGroupReceiveMessageOpt();
    },
    TIMMsgDownloadElemToPath:() => {
        return timRenderInstance.TIMMsgDownloadElemToPath();
    },
    TIMMsgDownloadMergerMessage:() => {
        return timRenderInstance.TIMMsgDownloadMergerMessage();
    },
    TIMMsgBatchSend:() => {
        return timRenderInstance.TIMMsgBatchSend();
    },
    TIMMsgSearchLocalMessages:() => {
        return timRenderInstance.TIMMsgSearchLocalMessages();
    },
    TIMAddRecvNewMsgCallback:() => {
        console.log(timRenderInstance)
        return timRenderInstance.TIMAddRecvNewMsgCallback((...args)=>{
            console.log(args)
        },"TIMAddRecvNewMsgCallback");
    },
    TIMRemoveRecvNewMsgCallback:() => {
        return timRenderInstance.TIMRemoveRecvNewMsgCallback();
    },
    TIMSetMsgReadedReceiptCallback:() => {
        return timRenderInstance.TIMSetMsgReadedReceiptCallback();
    },
    TIMSetMsgRevokeCallback:() => {
        return timRenderInstance.TIMSetMsgRevokeCallback();
    },
    TIMSetMsgElemUploadProgressCallback:() => {
        return timRenderInstance.TIMSetMsgElemUploadProgressCallback();
    },
    TIMSetMsgUpdateCallback:() => {
        return timRenderInstance.TIMSetMsgUpdateCallback();
    }
}

export default advanceMessageManager;