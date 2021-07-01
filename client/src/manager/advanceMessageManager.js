import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();

const advanceMessageManager = {
    TIMMsgSendMessage:() => {
        return timRenderInstance.TIMMsgSendMessage("lexuslin3", 1, {
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            message_sender: "940928"
        }, "", "user data");
    },
    TIMMsgCancelSend:() => {
        return timRenderInstance.TIMMsgCancelSend("lexuslin3", 1, "144115224990124941-1625063271-162251704", "user data");
    },
    TIMMsgFindMessages:() => {
        return timRenderInstance.TIMMsgFindMessages(["144115224990124941-1625063271-162251704"], "user data");
    },
    TIMMsgReportReaded:() => {
        return timRenderInstance.TIMMsgReportReaded("lexuslin3", 1, "144115224990124941-1625063271-162251704", "user data");
    },
    TIMMsgRevoke:() => {
        return timRenderInstance.TIMMsgRevoke("1lexuslin127", 2, "lexuslin-1625063271-162251704", "user data");
    },
    TIMMsgFindByMsgLocatorList:() => {
        return timRenderInstance.TIMMsgFindByMsgLocatorList("1lexuslin127", 2, [{
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            // message_conv_id: "lexuslin3",
            message_sender: "lexuslin",
        }], "user data");
    },
    TIMMsgImportMsgList:() => {
        return timRenderInstance.TIMMsgImportMsgList("1lexuslin127", 2, [{
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            // message_conv_id: "lexuslin3",
            message_sender: "lexuslin",
        }], "user data");
    },
    TIMMsgSaveMsg:() => {
        return timRenderInstance.TIMMsgSaveMsg("1lexuslin127", 2, {
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            message_sender: "lexuslin"
        }, "user data");
    },
    TIMMsgGetMsgList:() => {
        return timRenderInstance.TIMMsgGetMsgList("lexuslin3", 1, {
            msg_getmsglist_param_last_msg: "144115225971632901-1624882630-707997467",
            msg_getmsglist_param_count: 100,
            // msg_getmsglist_param_is_remble: false,
            // msg_getmsglist_param_is_forward: true,
            // msg_getmsglist_param_last_msg_seq: 3444972625,
            // msg_getmsglist_param_time_begin: 0,
            // msg_getmsglist_param_time_period: 100000,
        }, "user data");
    },
    TIMMsgDelete:() => {
        return timRenderInstance.TIMMsgDelete("lexuslin3", 1, {
            msg_delete_param_msg: "144115231469886159-1624848680-2873600283",
            msg_delete_param_is_remble: true
        }, "user data");
    },
    TIMMsgListDelete:() => {
        return timRenderInstance.TIMMsgListDelete();
    },
    TIMMsgClearHistoryMessage:() => {
        return timRenderInstance.TIMMsgClearHistoryMessage("lexuslin3", 1, "user data");
    },
    TIMMsgSetC2CReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgSetC2CReceiveMessageOpt(["lexuslin3"], 2, "user data");
    },
    TIMMsgGetC2CReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgGetC2CReceiveMessageOpt(["lexuslin3"], "user data");
    },
    TIMMsgSetGroupReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgSetGroupReceiveMessageOpt("lexuslin3", 2, "user data");
    },
    TIMMsgDownloadElemToPath:() => {
        return timRenderInstance.TIMMsgDownloadElemToPath({
            msg_download_elem_param_flag: 2,
            msg_download_elem_param_type: 2,
            // msg_download_elem_param_id: "1400187352_lexuslin3_c3b94cee5c318b590b5cff79a712af23.MOV",
            // msg_download_elem_param_business_id: 0,
            msg_download_elem_param_url: "https://cos.ap-shanghai.myqcloud.com/0345-1400187352-1303031839/b310-lexuslin3/c3b94cee5c318b590b5cff79a712af23.MOV",
        }, "/home/lexuslin/Downloads/111.mov", "user data");
    },
    TIMMsgDownloadMergerMessage:() => {
        return timRenderInstance.TIMMsgDownloadMergerMessage("144115231469886159-1623751826-4234216750", "user data");
    },
    TIMMsgBatchSend:() => {
        return timRenderInstance.TIMMsgBatchSend();
    },
    TIMMsgSearchLocalMessages:() => {
        return timRenderInstance.TIMMsgSearchLocalMessages({
            msg_search_param_keyword_array: ["1"],
            msg_search_param_message_type_array: [0],
            msg_search_param_conv_id: "lexuslin3",
            msg_search_param_conv_type: 1,
            // msg_search_param_search_time_position: 0,
            // msg_search_param_search_time_period: 24*60*60*7,
            // msg_search_param_page_index: 0,
            // msg_search_param_page_size: 100,
        }, "user data");
    },
    TIMAddRecvNewMsgCallback:(callback) => {
        return timRenderInstance.TIMAddRecvNewMsgCallback((...args)=>{
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
            
        },"TIMAddRecvNewMsgCallback");
    },
    TIMRemoveRecvNewMsgCallback:(callback) => {
        return timRenderInstance.TIMRemoveRecvNewMsgCallback((...args)=>{
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
            
        },"TIMRemoveRecvNewMsgCallback");
    },
    TIMSetMsgReadedReceiptCallback:(callback) => {
        return timRenderInstance.TIMSetMsgReadedReceiptCallback((...args)=>{
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
            
        },"TIMSetMsgReadedReceiptCallback");
    },
    TIMSetMsgRevokeCallback:(callback) => {
        return timRenderInstance.TIMSetMsgRevokeCallback((...args)=>{
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
            
        },"TIMSetMsgRevokeCallback");
    },
    TIMSetMsgElemUploadProgressCallback:(callback) => {
        return timRenderInstance.TIMSetMsgElemUploadProgressCallback((...args)=>{
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
            
        },"TIMSetMsgElemUploadProgressCallback");
    },
    TIMSetMsgUpdateCallback:(callback) => {
        return timRenderInstance.TIMSetMsgUpdateCallback((...args)=>{
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
            
        },"TIMSetMsgUpdateCallback");
    }
}

export default advanceMessageManager;