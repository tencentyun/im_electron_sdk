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
            let res = await this.TIMFriendshipCheckFriendType()
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
            friend_respone_identifier: "xx",
            friend_respone_action: 1,
            friend_respone_remark: "xx",
            friend_respone_group_name: "xx",
        }, "user data")
    }
    TIMFriendshipModifyFriendProfile() {
        return this.friendshipManager.TIMFriendshipModifyFriendProfile({
            friendship_modify_friend_profile_param_identifier: "xx",
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
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
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
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipGetFriendGroupList() {
        return this.friendshipManager.TIMFriendshipGetFriendGroupList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipModifyFriendGroup() {
        return this.friendshipManager.TIMFriendshipModifyFriendGroup({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipDeleteFriendGroup() {
        return this.friendshipManager.TIMFriendshipDeleteFriendGroup({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipAddToBlackList() {
        return this.friendshipManager.TIMFriendshipAddToBlackList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipGetBlackList() {
        return this.friendshipManager.TIMFriendshipGetBlackList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipDeleteFromBlackList() {
        return this.friendshipManager.TIMFriendshipDeleteFromBlackList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipGetPendencyList() {
        return this.friendshipManager.TIMFriendshipGetPendencyList({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipDeletePendency() {
        return this.friendshipManager.TIMFriendshipDeletePendency({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipReportPendencyReaded() {
        return this.friendshipManager.TIMFriendshipReportPendencyReaded({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipSearchFriends() {
        return this.friendshipManager.TIMFriendshipSearchFriends({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMFriendshipGetFriendsInfo() {
        return this.friendshipManager.TIMFriendshipGetFriendsInfo(["lexuslin3"], "user data")
    }
    TIMMsgSendMessage() {
        return this.advanceMessageManager.TIMMsgSendMessage({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgCancelSend() {
        return this.advanceMessageManager.TIMMsgCancelSend({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgFindMessages() {
        return this.advanceMessageManager.TIMMsgFindMessages({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgReportReaded() {
        return this.advanceMessageManager.TIMMsgReportReaded({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
    }
    TIMMsgRevoke() {
        return this.advanceMessageManager.TIMMsgRevoke({
            attr1: "xxxx",
            attr1: "xxxx",
            attr1: "xxxx"
        }, "user data")
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