import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();

const friendShipManager = {
    getFriendshipProfileList: () => {
        return timRenderInstance.getFriendshipProfileList();
    },
    addFriend: () => {
        return timRenderInstance.addFriend({
            friendship_add_friend_param_identifier: "940928",
            friendship_add_friend_param_friend_type: 1,
            friendship_add_friend_param_remark: "xxx",
            friendship_add_friend_param_group_name: "",
            friendship_add_friend_param_add_source: "Windows",
            friendship_add_friend_param_add_wording: "xxx",
        }, '123');
    },
    handleFriendAddRequest: () => {
        return timRenderInstance.handleFriendAddRequest({
            friend_respone_identifier: "940928",
            friend_respone_action: 1,
            friend_respone_remark: "xx",
            friend_respone_group_name: "xx",
        })
    },
    modifyFriendProfile: () => {
        return timRenderInstance.modifyFriendProfile({
            friendship_modify_friend_profile_param_identifier: "lexuslin3",
            friendship_modify_friend_profile_param_item: {
                friend_profile_item_remark: "xx",
                friend_profile_item_group_name_array: ["xx"],
                friend_profile_item_custom_string_array: [{
                    friend_profile_custom_string_info_key: "xx",
                    friend_profile_custom_string_info_value: "xx"
                }]
            }
        })
    },
    deleteFriend: () => {
        return timRenderInstance.deleteFriend()
    },
    checkFriendType: () => {
        return timRenderInstance.checkFriendType()
    },
    createFriendGroup: () => {
        return timRenderInstance.createFriendGroup()
    },
    getFriendGroupList: () => {
        return timRenderInstance.getFriendGroupList()
    },
    modifyFriendGroup: () => {
        return timRenderInstance.modifyFriendGroup()
    },
    deleteFriendGroup: () => {
        return timRenderInstance.deleteFriendGroup()
    },
    addToBlackList: () => {
        return timRenderInstance.addToBlackList()
    },
    getBlackList:  () => {
        return timRenderInstance.getBlackList()
    },
    deleteFromBlackList:() => {
        return timRenderInstance.deleteFromBlackList()
    },
    getPendencyList: () => {
        return timRenderInstance.getPendencyList()
    },
    deletePendency: () => {
        return timRenderInstance.deletePendency()
    },
    reportPendencyReaded: () => {
        return timRenderInstance.reportPendencyReaded()
    },
    searchFriends: () => {
        return timRenderInstance.searchFriends()
    },
    getFriendsInfo: () => {
        return timRenderInstance.getFriendsInfo()
    },
    TIMSetOnAddFriendCallback: () => {
        return timRenderInstance.TIMSetOnAddFriendCallback((...args) => {
            console.log(args)
        })
    },
    TIMSetOnDeleteFriendCallback: () => {
        return timRenderInstance.TIMSetOnDeleteFriendCallback((...args) => {
            console.log(args)
        })
    }, 
    TIMSetUpdateFriendProfileCallback: (callback) => {
        return timRenderInstance.TIMSetUpdateFriendProfileCallback((...args) => {
            callback(JSON.stringify(args))
        })
    }, 
    TIMSetFriendAddRequestCallback: () => {
        return timRenderInstance.TIMSetFriendAddRequestCallback((...args) => {
            console.log(args)
        })
    }, 
    TIMSetFriendApplicationListDeletedCallback: () => {
        return timRenderInstance.TIMSetFriendApplicationListDeletedCallback((...args) => {
            console.log(args)
        })
    }, 
    TIMSetFriendApplicationListReadCallback: () => {
        return timRenderInstance.TIMSetFriendApplicationListReadCallback((...args) => {
            console.log(args)
        })
    }, 
    TIMSetFriendBlackListAddedCallback: () => {
        return timRenderInstance.TIMSetFriendBlackListAddedCallback((...args) => {
            console.log(args)
        })
    }, 
    TIMSetFriendBlackListDeletedCallback: () => {
        return timRenderInstance.TIMSetFriendBlackListDeletedCallback((...args) => {
            console.log(args)
        })
    },
}

export default friendShipManager;
