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
            // let res = await this.TIMFriendshipGetFriendProfileList()
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
            let res = await this.TIMMsgRevoke()
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

            console.log("==========> 成功了：", JSON.parse(res.json_params))
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
    // TODOs
    TIMMsgSendMessage() {
        return this.advanceMessageManager.TIMMsgSendMessage({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgCancelSend() {
        return this.advanceMessageManager.TIMMsgCancelSend("c2c_lexuslin3", 1, "msg_id", "user data") // TIMConvType: 0无效1个人2群组3系统会话
    }
    TIMMsgFindMessages() {
        return this.advanceMessageManager.TIMMsgFindMessages(["144115231469886159-1623751826-4234216750"], "user data")
    }
    // TODOs: 支持上报单条消息，目前msg_id无效
    TIMMsgReportReaded() {
        return this.advanceMessageManager.TIMMsgReportReaded("c2c_lexuslin3", 1, "msg_id", "user data")
    }
    TIMMsgRevoke() {
        return this.advanceMessageManager.TIMMsgRevoke("lexuslin3", 1, "144115231469886159-1623751826-4234216750", "user data")
    }
    TIMMsgFindByMsgLocatorList() {
        return this.advanceMessageManager.TIMMsgFindByMsgLocatorList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgImportMsgList() {
        return this.advanceMessageManager.TIMMsgImportMsgList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgSaveMsg() {
        return this.advanceMessageManager.TIMMsgSaveMsg({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgGetMsgList() {
        return this.advanceMessageManager.TIMMsgGetMsgList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgDelete() {
        return this.advanceMessageManager.TIMMsgDelete({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgListDelete() {
        return this.advanceMessageManager.TIMMsgListDelete({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgClearHistoryMessage() {
        return this.advanceMessageManager.TIMMsgClearHistoryMessage({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgSetC2CReceiveMessageOpt() {
        return this.advanceMessageManager.TIMMsgSetC2CReceiveMessageOpt({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgGetC2CReceiveMessageOpt() {
        return this.advanceMessageManager.TIMMsgGetC2CReceiveMessageOpt({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgSetGroupReceiveMessageOpt() {
        return this.advanceMessageManager.TIMMsgSetGroupReceiveMessageOpt({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgDownloadElemToPath() {
        return this.advanceMessageManager.TIMMsgDownloadElemToPath({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgDownloadMergerMessage() {
        return this.advanceMessageManager.TIMMsgDownloadMergerMessage({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgBatchSend() {
        return this.advanceMessageManager.TIMMsgBatchSend({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgSearchLocalMessages() {
        return this.advanceMessageManager.TIMMsgSearchLocalMessages({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
}

module.exports = {
    LexuslinTest
}