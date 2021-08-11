import TimRender from "../../../im_electron_sdk";
const timRenderInstance = new TimRender();

const advanceMessageManager = {
    TIMMsgSendMessage:() => {
        return timRenderInstance.TIMMsgSendMessage({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: {
                message_elem_array: [{
                    elem_type: 4,
                    // text_elem_content: "123"
                    // image_elem_orig_path: "/home/lexuslin/sucai/111.png",
                    // image_elem_level: 0
                    file_elem_file_path: "/home/lexuslin/sucai/15.zip",
                    file_elem_file_name: "xxxx",
                    file_elem_file_size: 23150412 
                }],
                message_sender: "lexuslin3"
            },
            user_data: "123"
        });
    },
    TIMMsgCancelSend:() => {
        return timRenderInstance.TIMMsgCancelSend({
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "144115225971632901-1625125460-3998758148",
            user_data: "123"
        });
    },
    TIMMsgFindMessages:() => {
        return timRenderInstance.TIMMsgFindMessages({
            json_message_id_array: ["144115225971632901-1625125460-3998758148"],
            user_data: "123"
        });
    },
    TIMMsgReportReaded:() => {
        return timRenderInstance.TIMMsgReportReaded({
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "144115225971632901-1625125460-3998758148",
            user_data: "123"
        });
    },
    TIMMsgRevoke:() => {
        return timRenderInstance.TIMMsgRevoke({
            conv_id: "lexuslin3",
            conv_type: 1,
            message_id: "144115225971632901-1625125460-3998758148",
            user_data: "123"
        });
    },
    TIMMsgFindByMsgLocatorList:() => {
        return timRenderInstance.TIMMsgFindByMsgLocatorList({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: {
                message_locator_is_revoked: false,
                message_locator_time: 123,
                message_locator_seq: 123,
                message_locator_is_self: true,
                message_locator_rand: 123,
                message_locator_unique_id: 123
            },
            user_data: "123"
        });
    },
    TIMMsgImportMsgList:() => {
        return timRenderInstance.TIMMsgImportMsgList({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: [{
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "123"
                }],
                message_sender: "lexuslin3"
            }],
            user_data: "123"
        });
    },
    TIMMsgSaveMsg:() => {
        return timRenderInstance.TIMMsgSaveMsg({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: {
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "123"
                }],
                message_sender: "lexuslin3"
            },
            user_data: "123"
        });
    },
    TIMMsgGetMsgList:() => {
        return timRenderInstance.TIMMsgGetMsgList({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: {
                msg_getmsglist_param_last_msg: null,
                msg_getmsglist_param_count: 100
            },
            user_data: "123"
        });
    },
    TIMMsgDelete:() => {
        return timRenderInstance.TIMMsgDelete({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: {
                msg_delete_param_msg: "144115225971632901-1625125460-3998758148",
                msg_delete_param_is_remble: true
            },
            user_data: "123"
        });
    },
    TIMMsgListDelete:() => {
        return timRenderInstance.TIMMsgListDelete({
            conv_id: "lexuslin3",
            conv_type: 1,
            params: ["144115225971632901-1625125460-3998758148"],
            user_data: "123"
        });
    },
    TIMMsgClearHistoryMessage:() => {
        return timRenderInstance.TIMMsgClearHistoryMessage({
            conv_id: "lexuslin3",
            conv_type: 1,
            user_data: "123"
        });
    },
    TIMMsgSetC2CReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgSetC2CReceiveMessageOpt({
            params: ["lexuslin3"],
            opt: 0,
            user_data: "123"
        });
    },
    TIMMsgGetC2CReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgGetC2CReceiveMessageOpt({
            params: ["lexuslin3"],
            user_data: "123"
        });
    },
    TIMMsgSetGroupReceiveMessageOpt:() => {
        return timRenderInstance.TIMMsgSetGroupReceiveMessageOpt({
            group_id: "1lexuslin127",
            opt: 1,
            user_data: "123"
        });
    },
    TIMMsgDownloadElemToPath:() => {
        return timRenderInstance.TIMMsgDownloadElemToPath({
            params: {
                msg_download_elem_param_flag: 2,
                msg_download_elem_param_type: 2,
                // msg_download_elem_param_id: "1400187352_lexuslin3_c3b94cee5c318b590b5cff79a712af23.MOV",
                // msg_download_elem_param_business_id: 0,
                msg_download_elem_param_url: "https://cos.ap-shanghai.myqcloud.com/0345-1400187352-1303031839/b310-lexuslin3/c3b94cee5c318b590b5cff79a712af23.MOV",
            },
            path: "/home/lexuslin/Downloads/111.mov",
            user_data: "123"
        });
    },
    TIMMsgDownloadMergerMessage:() => {
        return timRenderInstance.TIMMsgDownloadMergerMessage({
            params: {
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "xxx"
                }],
                message_sender: "lexuslin"
            },
            user_data: "123"
        });
    },
    TIMMsgBatchSend:() => {
        return timRenderInstance.TIMMsgBatchSend({
            params: {
                msg_batch_send_param_identifier_array: ["lexuslin3", "13675"],
                msg_batch_send_param_msg: {
                    message_elem_array: [{
                        elem_type: 0,
                        text_elem_content: "xxx"
                    }],
                    message_sender: "lexuslin"
                }
            },
            user_data: "123"
        });
    },
    TIMMsgSearchLocalMessages:() => {
        return timRenderInstance.TIMMsgSearchLocalMessages({
            params: {
                msg_search_param_keyword_array: ["1"],
                msg_search_param_message_type_array: [0],
                msg_search_param_conv_id: "lexuslin3",
                msg_search_param_conv_type: 1,
                // msg_search_param_search_time_position: 0,
                // msg_search_param_search_time_period: 24*60*60*7,
                // msg_search_param_page_index: 0,
                // msg_search_param_page_size: 100,
            },
            user_data: "123"
        });
    },
    TIMAddRecvNewMsgCallback:(callback) => {
        return timRenderInstance.TIMAddRecvNewMsgCallback({
            callback: (...args)=>{
                const [[data,user_data]] = args;
                console.log("收到新消息")
                
            },
            user_data: "TIMAddRecvNewMsgCallback"
        });
    },
    TIMRemoveRecvNewMsgCallback:(callback) => {
        return timRenderInstance.TIMRemoveRecvNewMsgCallback({
            callback: (...args)=>{
                const [[data,user_data]] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                console.log(args)
            },
            user_data: "TIMRemoveRecvNewMsgCallback"
        });
    },
    TIMSetMsgReadedReceiptCallback:(callback) => {
        return timRenderInstance.TIMSetMsgReadedReceiptCallback({
            callback: (...args)=>{
                const [[data,user_data]] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgReadedReceiptCallback"
        });
    },
    TIMSetMsgRevokeCallback:(callback) => {
        return timRenderInstance.TIMSetMsgRevokeCallback({
            callback: (...args)=>{
                const [[data,user_data]] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgRevokeCallback"
        });
    },
    TIMSetMsgElemUploadProgressCallback:(callback) => {
        return timRenderInstance.TIMSetMsgElemUploadProgressCallback({
            callback: (...args)=>{
                console.log(1111, args)
                const [[data,user_data]] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgElemUploadProgressCallback"
        });
    },
    TIMSetMsgUpdateCallback:(callback) => {
        return timRenderInstance.TIMSetMsgUpdateCallback({
            callback :(...args)=>{
                const [[data,user_data]] = args;
                callback(JSON.stringify({
                    data,user_data
                }))
                
            },
            user_data: "TIMSetMsgUpdateCallback"
        });
    }
}

export default advanceMessageManager;