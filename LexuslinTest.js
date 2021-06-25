const TIM = require('./im_electron_sdk/dist/index.umd')

let tim = null;

class LexuslinTest {
    constructor(tim) {
        this.tim = tim;
        this.friendshipManager = tim.getFriendshipManager();
        this.advanceMessageManager = tim.getAdvanceMessageManager();
    }
    async start() {
        try {
            let res = await this.TIMFriendshipGetFriendProfileList()
            // let res = await this.TIMFriendshipAddFriend()
            // let res = await this.TIMFriendshipHandleFriendAddRequest()
            // let res = await this.TIMFriendshipModifyFriendProfile()
            // let res = await this.TIMFriendshipDeleteFriend()
            // let res = await this.TIMFriendshipCheckFriendType()
            // let res = await this.TIMFriendshipCreateFriendGroup()
            // let res = await this.TIMFriendshipGetFriendGroupList()
            // let res = await this.TIMFriendshipModifyFriendGroup()
            // let res = await this.TIMFriendshipDeleteFriendGroup()
            // let res = await this.TIMFriendshipAddToBlackList()
            // let res = await this.TIMFriendshipGetBlackList()
            // let res = await this.TIMFriendshipDeleteFromBlackList()
            // let res = await this.TIMFriendshipGetPendencyList()
            // let res = await this.TIMFriendshipDeletePendency()
            // let res = await this.TIMFriendshipReportPendencyReaded()
            // let res = await this.TIMFriendshipSearchFriends()
            // let res = await this.TIMFriendshipGetFriendsInfo()
            // let res = await this.TIMMsgSendMessage()
            // let res = await this.TIMMsgCancelSend()
            // let res = await this.TIMMsgFindMessages()
            // let res = await this.TIMMsgReportReaded()
            // let res = await this.TIMMsgRevoke()
            // let res = await this.TIMMsgFindByMsgLocatorList()
            // let res = await this.TIMMsgImportMsgList()
            // let res = await this.TIMMsgSaveMsg()
            // let res = await this.TIMMsgGetMsgList()
            // let res = await this.TIMMsgDelete()
            // let res = await this.TIMMsgListDelete()
            // let res = await this.TIMMsgClearHistoryMessage()
            // let res = await this.TIMMsgSetC2CReceiveMessageOpt()
            // let res = await this.TIMMsgGetC2CReceiveMessageOpt()
            // let res = await this.TIMMsgSetGroupReceiveMessageOpt()
            // let res = await this.TIMMsgDownloadElemToPath()
            // let res = await this.TIMMsgDownloadMergerMessage()
            // let res = await this.TIMMsgBatchSend()
            // let res = await this.TIMMsgSearchLocalMessages()

            this.TIMAddRecvNewMsgCallback()  
            // this.TIMRemoveRecvNewMsgCallback()
            // this.TIMSetMsgReadedReceiptCallback()
            // this.TIMSetMsgRevokeCallback()
            // this.TIMSetMsgElemUploadProgressCallback()
            // this.TIMSetOnAddFriendCallback()
            // this.TIMSetOnDeleteFriendCallback()
            // this.TIMSetUpdateFriendProfileCallback()
            // this.TIMSetFriendAddRequestCallback()
            // this.TIMSetFriendApplicationListDeletedCallback()
            // this.TIMSetFriendApplicationListReadCallback()
            // this.TIMSetFriendBlackListAddedCallback()
            // this.TIMSetFriendBlackListDeletedCallback()
            // this.TIMSetMsgUpdateCallback()

            console.log("==========> 成功了：", res.json_params === "" ? "none" : JSON.parse(res.json_params))
        } catch(e) {
            console.log("==========> 出错了：", e)
        }
    }

    TIMFriendshipGetFriendProfileList() {
        return this.friendshipManager.TIMFriendshipGetFriendProfileList("user data")
    }
    TIMFriendshipAddFriend() {
        return this.friendshipManager.TIMFriendshipAddFriend({
            friendship_add_friend_param_identifier: "lexuslin3",
            friendship_add_friend_param_friend_type: 1,
            friendship_add_friend_param_remark: "xxx",
            friendship_add_friend_param_group_name: "g1",
            friendship_add_friend_param_add_source: "Windows",
            friendship_add_friend_param_add_wording: "xxx",
        }, "user data")
    }
    TIMFriendshipHandleFriendAddRequest() {
        return this.friendshipManager.TIMFriendshipHandleFriendAddRequest({
            friend_respone_identifier: "lexuslin3",
            friend_respone_action: 1,
            friend_respone_remark: "xx",
            friend_respone_group_name: "xx",
        }, "user data")
    }
    TIMFriendshipModifyFriendProfile() {
        return this.friendshipManager.TIMFriendshipModifyFriendProfile({
            friendship_modify_friend_profile_param_identifier: "lexuslin3",
            friendship_modify_friend_profile_param_item: {
                friend_profile_item_remark: "xx",
                friend_profile_item_group_name_array: ["xx"],
                friend_profile_item_custom_string_array: [{
                    friend_profile_custom_string_info_key: "xx",
                    friend_profile_custom_string_info_value: "xx"
                }]
            }
        }, "user data")
    }
    TIMFriendshipDeleteFriend() {
        return this.friendshipManager.TIMFriendshipDeleteFriend({
            friendship_delete_friend_param_friend_type: 1,
            friendship_delete_friend_param_identifier_array: ["lexuslin3"]
        }, "user data")
    }
    TIMFriendshipCheckFriendType() {
        return this.friendshipManager.TIMFriendshipCheckFriendType({
            friendship_check_friendtype_param_check_type: 0,
            friendship_check_friendtype_param_identifier_array: ["lexuslin3"]
        }, "user data")
    }
    TIMFriendshipCreateFriendGroup() {
        return this.friendshipManager.TIMFriendshipCreateFriendGroup({
            friendship_create_friend_group_param_name_array: ["ggg1"],
            friendship_create_friend_group_param_identifier_array: ["lexuslin3"],
        }, "user data")
    }
    TIMFriendshipGetFriendGroupList() {
        return this.friendshipManager.TIMFriendshipGetFriendGroupList(["ggg1"], "user data")
    }
    TIMFriendshipModifyFriendGroup() {
        return this.friendshipManager.TIMFriendshipModifyFriendGroup({
            friendship_modify_friend_group_param_name: "ggg1",
            friendship_modify_friend_group_param_new_name: "ggg2",
            friendship_modify_friend_group_param_delete_identifier_array: ["lexuslin3"],
            friendship_modify_friend_group_param_add_identifier_array: ["lexuslin3"]
        }, "user data")
    }
    TIMFriendshipDeleteFriendGroup() {
        return this.friendshipManager.TIMFriendshipDeleteFriendGroup(["lexuslin3"], "user data")
    }
    TIMFriendshipAddToBlackList() {
        return this.friendshipManager.TIMFriendshipAddToBlackList(["lexuslin3"], "user data")
    }
    TIMFriendshipGetBlackList() {
        return this.friendshipManager.TIMFriendshipGetBlackList("user data")
    }
    TIMFriendshipDeleteFromBlackList() {
        return this.friendshipManager.TIMFriendshipDeleteFromBlackList(["lexuslin3"], "user data")
    }
    TIMFriendshipGetPendencyList() {
        return this.friendshipManager.TIMFriendshipGetPendencyList({
            friendship_get_pendency_list_param_type: 1,
            friendship_get_pendency_list_param_start_seq: 0,
            friendship_get_pendency_list_param_start_time: 0,
            friendship_get_pendency_list_param_limited_size: 10,
        }, "user data")
    }
    TIMFriendshipDeletePendency() {
        return this.friendshipManager.TIMFriendshipDeletePendency({
            friendship_delete_pendency_param_type: 1,
            friendship_delete_pendency_param_identifier_array: ["lexuslin3"]
        }, "user data")
    }
    TIMFriendshipReportPendencyReaded() {
        return this.friendshipManager.TIMFriendshipReportPendencyReaded(+new Date, "user data")
    }
    TIMFriendshipSearchFriends() {
        return this.friendshipManager.TIMFriendshipSearchFriends({
            friendship_search_param_keyword_list: ["lexus"],
            friendship_search_param_search_field_list: [1, 2, 4]
        }, "user data")
    }
    TIMFriendshipGetFriendsInfo() {
        return this.friendshipManager.TIMFriendshipGetFriendsInfo(["lexuslin3"], "user data")
    }
    // TODOs：Invalid sender or receiver identifier
    TIMMsgSendMessage() {
        return this.advanceMessageManager.TIMMsgSendMessage("lexuslin3", 1, {
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            message_conv_id: "lexuslin3",
            message_sender: "lexuslin",
            message_client_time: +new Date,
            message_server_time: +new Date
        }, "", "user data")
    }
    TIMMsgCancelSend() {
        return this.advanceMessageManager.TIMMsgCancelSend("lexuslin3", 1, "144115231469886159-1623751826-4234216750", "user data") // TIMConvType: 0无效1个人2群组3系统会话
    }
    // 1
    TIMMsgFindMessages() {
        return this.advanceMessageManager.TIMMsgFindMessages(["144115231469886159-1623751826-4234216750"], "user data")
    }
    // 1
    TIMMsgReportReaded() {
        return this.advanceMessageManager.TIMMsgReportReaded("lexuslin3", 1, "144115231469886159-1623751826-4234216750", "user data")
    }
    // error: package not valid
    TIMMsgRevoke() {
        return this.advanceMessageManager.TIMMsgRevoke("lexuslin3", 1, "144115231469886159-1623751826-4234216750", "user data")
    }
    // TODOs, 先用TIMMsgFindMessages
    TIMMsgFindByMsgLocatorList() {
        return this.advanceMessageManager.TIMMsgFindByMsgLocatorList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }

    TIMMsgImportMsgList() {
        return this.advanceMessageManager.TIMMsgImportMsgList("lexuslin3", 1, [{
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            // message_conv_id: "lexuslin3",
            message_sender: "lexuslin",
            message_client_time: +new Date,
            message_server_time: +new Date
        }], "user data")
    }
    TIMMsgSaveMsg() {
        return this.advanceMessageManager.TIMMsgSaveMsg({
            message_elem_array: [{
                elem_type: 0,
                text_elem_content: "xxx"
            }],
            message_sender: "lexuslin"
        }, "user data")
    }
    TIMMsgGetMsgList() {
        // 所有参数选填
        return this.advanceMessageManager.TIMMsgGetMsgList("lexuslin3", 1, {
            msg_getmsglist_param_last_msg: "144115231469886159-1623751826-4234216750",
            msg_getmsglist_param_count: 100,
            msg_getmsglist_param_is_remble: false,
            msg_getmsglist_param_is_forward: true,
            msg_getmsglist_param_last_msg_seq: 466379130,
            msg_getmsglist_param_time_begin: "x",
            msg_getmsglist_param_time_period: "x",
        }, "user data")
    }
    TIMMsgDelete() {
        return this.advanceMessageManager.TIMMsgDelete({
            msg_delete_param_msg: "144115231469886159-1623751826-42342167503333333333",
            msg_delete_param_is_remble: true
        }, "user data")
    }
    TIMMsgListDelete() {
        return this.advanceMessageManager.TIMMsgListDelete(["144115231469886159-1623751826-42342167503333333333"], "user data")
    }
    TIMMsgClearHistoryMessage() {
        return this.advanceMessageManager.TIMMsgClearHistoryMessage("lexuslin3", 1, "user data")
    }
    TIMMsgSetC2CReceiveMessageOpt() {
        // TIMReceiveMessageOpt
        return this.advanceMessageManager.TIMMsgSetC2CReceiveMessageOpt(["lexuslin3"], 0, "user data")
    }
    TIMMsgGetC2CReceiveMessageOpt() {
        return this.advanceMessageManager.TIMMsgGetC2CReceiveMessageOpt(["lexuslin3"], "user data")
    }
    TIMMsgSetGroupReceiveMessageOpt() {
        return this.advanceMessageManager.TIMMsgSetGroupReceiveMessageOpt("ggg1", 1, "user data")
    }
    TIMMsgDownloadElemToPath() {
        // 参数在消息元素里面取出来
        return this.advanceMessageManager.TIMMsgDownloadElemToPath({
            msg_download_elem_param_flag: "x",
            msg_download_elem_param_type: "x",
            msg_download_elem_param_id: "x",
            msg_download_elem_param_business_id: "x",
            msg_download_elem_param_url: "x",
        }, "/usr/xxx", "user data")
    }
    TIMMsgDownloadMergerMessage() {
        return this.advanceMessageManager.TIMMsgDownloadMergerMessage("144115231469886159-1623751826-4234216750", "user data")
    }
    TIMMsgBatchSend() {
        return this.advanceMessageManager.TIMMsgBatchSend({
            msg_batch_send_param_identifier_array: ["lexuslin3"],
            msg_batch_send_param_msg: {
                message_elem_array: [{
                    elem_type: 0,
                    text_elem_content: "xxx"
                }],
                message_sender: "lexuslin"
            }
        }, "user data")
    }
    TIMMsgSearchLocalMessages() {
        return this.advanceMessageManager.TIMMsgSearchLocalMessages({
            msg_search_param_keyword_array: ["xx"],
            msg_search_param_message_type_array: [1],
            msg_search_param_conv_id: "lexuslin3",
            msg_search_param_conv_type: 1,
            msg_search_param_search_time_position: 0,
            msg_search_param_search_time_period: 24*60*60*7,
            msg_search_param_page_index: 0,
            msg_search_param_page_size: 100,
        }, "user data")
    }
    // 1
    TIMAddRecvNewMsgCallback() {
        this.advanceMessageManager.TIMAddRecvNewMsgCallback((json_msg_array, user_data) => {
            console.log(json_msg_array)
        }, "user data")
    }
    // TODO:设置无效
    TIMRemoveRecvNewMsgCallback() {
        this.advanceMessageManager.TIMRemoveRecvNewMsgCallback()
    }
    TIMSetMsgReadedReceiptCallback() {
        this.advanceMessageManager.TIMSetMsgReadedReceiptCallback((json_msg_readed_receipt_array, user_data) => {
            console.log(json_msg_readed_receipt_array)
        }, "user data")
    }
    TIMSetMsgRevokeCallback() {
        this.advanceMessageManager.TIMSetMsgRevokeCallback((json_msg_locator_array, user_data) => {
            console.log(json_msg_locator_array)
        }, "user data")
    }
    TIMSetMsgElemUploadProgressCallback() {
        this.advanceMessageManager.TIMSetMsgElemUploadProgressCallback((json_msg, index, cur_size, total_size, user_data) => {
            console.log(json_msg, index, cur_size, total_size)
        }, "user data")
    }
    TIMSetOnAddFriendCallback() {
        this.friendshipManager.TIMSetOnAddFriendCallback((json_identifier_array, user_data) => {
            console.log(json_identifier_array)
        }, "user data")
    }
    TIMSetOnDeleteFriendCallback() {
        this.friendshipManager.TIMSetOnDeleteFriendCallback((json_identifier_array, user_data) => {
            console.log(json_identifier_array)
        }, "user data")
    }
    TIMSetUpdateFriendProfileCallback() {
        this.friendshipManager.TIMSetUpdateFriendProfileCallback((json_friend_profile_update_array, user_data) => {
            console.log(json_friend_profile_update_array)
        }, "user data")
    }
    TIMSetFriendAddRequestCallback() {
        this.friendshipManager.TIMSetFriendAddRequestCallback((json_friend_add_request_pendency_array, user_data) => {
            console.log(json_friend_add_request_pendency_array)
        }, "user data")
    }
    TIMSetFriendApplicationListDeletedCallback() {
        this.friendshipManager.TIMSetFriendApplicationListDeletedCallback((json_identifier_array, user_data) => {
            console.log(json_identifier_array)
        }, "user data")
    }
    TIMSetFriendApplicationListReadCallback() {
        this.friendshipManager.TIMSetFriendApplicationListReadCallback((user_data) => {
            console.log("TIMSetFriendApplicationListReadCallback")
        }, "user data")
    }
    TIMSetFriendBlackListAddedCallback() {
        this.friendshipManager.TIMSetFriendBlackListAddedCallback((json_friend_black_added_array, user_data) => {
            console.log(json_friend_black_added_array)
        }, "user data")
    }
    TIMSetFriendBlackListDeletedCallback() {
        this.friendshipManager.TIMSetFriendBlackListDeletedCallback((json_identifier_array, user_data) => {
            console.log(json_identifier_array)
        }, "user data")
    }
    TIMSetMsgUpdateCallback() {
        this.advanceMessageManager.TIMSetMsgUpdateCallback((json_msg_array, user_data) => {
            console.log(json_msg_array)
        }, "user data")
    } 
}

module.exports = {
    LexuslinTest
}