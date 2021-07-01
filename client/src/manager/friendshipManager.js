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
            friendship_modify_friend_profile_param_identifier: "940928",
            friendship_modify_friend_profile_param_item: {
                friend_profile_item_remark: "xx",
                friend_profile_item_group_name_array: ["xx"],
            }
        })
    },
    deleteFriend: () => {
        return timRenderInstance.deleteFriend({
            friendship_delete_friend_param_friend_type: 1,
            friendship_delete_friend_param_identifier_array: ["940928"]
        }, "user data")
    },
    checkFriendType: () => {
        return timRenderInstance.checkFriendType({
            friendship_check_friendtype_param_check_type: 0,
            friendship_check_friendtype_param_identifier_array: ["940928"]
        }, "user data")
    },
    createFriendGroup: () => {
        return timRenderInstance.createFriendGroup({
            friendship_create_friend_group_param_name_array: ["ggg1"],
            friendship_create_friend_group_param_identifier_array: ["940928"],
        }, "user data")
    },
    getFriendGroupList: () => {
        return timRenderInstance.getFriendGroupList(["ggg1"], "user data")
    },
    modifyFriendGroup: () => {
        return timRenderInstance.modifyFriendGroup({
            friendship_modify_friend_group_param_name: "ggg1",
            friendship_modify_friend_group_param_delete_identifier_array: ["940928"],
        }, "user data")
    },
    deleteFriendGroup: () => {
        return timRenderInstance.deleteFriendGroup(["ggg1"], "user data")
    },
    addToBlackList: () => {
        return timRenderInstance.addToBlackList(["940928"], "user data")
    },
    getBlackList:  () => {
        return timRenderInstance.getBlackList("user data")
    },
    deleteFromBlackList:() => {
        return timRenderInstance.deleteFromBlackList(["940928"], "user data")
    },
    getPendencyList: () => {
        return timRenderInstance.getPendencyList({
            friendship_get_pendency_list_param_type: 1,
            friendship_get_pendency_list_param_start_seq: 0,
            friendship_get_pendency_list_param_start_time: 0,
            friendship_get_pendency_list_param_limited_size: 10,
        }, "user data")
    },
    deletePendency: () => {
        return timRenderInstance.deletePendency({
            friendship_delete_pendency_param_type: 1,
            friendship_delete_pendency_param_identifier_array: ["test1"]
        }, "user data")
    },
    reportPendencyReaded: () => {
        let timestamp =  Math.floor(+new Date/1000)
        return timRenderInstance.reportPendencyReaded(timestamp, "user data")
    },
    searchFriends: () => {
        return timRenderInstance.searchFriends({
            friendship_search_param_keyword_list: ["940928"],
            friendship_search_param_search_field_list: [1, 2, 4]
        }, "user data")
    },
    getFriendsInfo: () => {
        return timRenderInstance.getFriendsInfo(["940928"], "user data")
    },
    TIMSetOnAddFriendCallback: (callback) => {
        return timRenderInstance.TIMSetOnAddFriendCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    },
    TIMSetOnDeleteFriendCallback: (callback) => {
        return timRenderInstance.TIMSetOnDeleteFriendCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    }, 
    TIMSetUpdateFriendProfileCallback: (callback) => {
        return timRenderInstance.TIMSetUpdateFriendProfileCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    }, 
    TIMSetFriendAddRequestCallback: (callback) => {
        return timRenderInstance.TIMSetFriendAddRequestCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    }, 
    TIMSetFriendApplicationListDeletedCallback: (callback) => {
        return timRenderInstance.TIMSetFriendApplicationListDeletedCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    }, 
    TIMSetFriendApplicationListReadCallback: (callback) => {
        return timRenderInstance.TIMSetFriendApplicationListReadCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    }, 
    TIMSetFriendBlackListAddedCallback: (callback) => {
        return timRenderInstance.TIMSetFriendBlackListAddedCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    }, 
    TIMSetFriendBlackListDeletedCallback: (callback) => {
        return timRenderInstance.TIMSetFriendBlackListDeletedCallback((...args) => {
            const [[data,user_data]] = args;
            callback(JSON.stringify({
                data,user_data
            }))
        })
    },
}

export default friendShipManager;
