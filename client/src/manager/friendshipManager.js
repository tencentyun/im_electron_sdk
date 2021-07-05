import TimRender from "../../../im_electron_sdk";
const timRenderInstance = new TimRender();

const friendShipManager = {
    TIMFriendshipGetFriendProfileList: () => {
        return timRenderInstance.TIMFriendshipGetFriendProfileList({
            user_data: "123"
        });
    },
    TIMFriendshipAddFriend: () => {
        return timRenderInstance.TIMFriendshipAddFriend({ 
            params: {
                friendship_add_friend_param_identifier: "940928",
                friendship_add_friend_param_friend_type: 1,
                friendship_add_friend_param_remark: "xxx2",
                friendship_add_friend_param_group_name: "",
                friendship_add_friend_param_add_source: "Windows",
                friendship_add_friend_param_add_wording: "xxx",
            },
            user_data: "1234"
        });
    },
    TIMFriendshipHandleFriendAddRequest: () => {
        return timRenderInstance.TIMFriendshipHandleFriendAddRequest({
            friend_respone_identifier: "940928",
            friend_respone_action: 1,
            friend_respone_remark: "xx",
            friend_respone_group_name: "xx",
        })
    },
    TIMFriendshipModifyFriendProfile: () => {
        return timRenderInstance.TIMFriendshipModifyFriendProfile({
            friendship_modify_friend_profile_param_identifier: "940928",
            friendship_modify_friend_profile_param_item: {
                friend_profile_item_remark: "xx",
                friend_profile_item_group_name_array: ["xx"], 
            }
        })
    },
    TIMFriendshipDeleteFriend: () => {
        return timRenderInstance.TIMFriendshipDeleteFriend({
            friendship_delete_friend_param_friend_type: 1,
            friendship_delete_friend_param_identifier_array: ["940928"]
        }, "user data")
    },
    TIMFriendshipCheckFriendType: () => {
        return timRenderInstance.TIMFriendshipCheckFriendType({
            friendship_check_friendtype_param_check_type: 0,
            friendship_check_friendtype_param_identifier_array: ["940928"]
        }, "user data")
    },
    TIMFriendshipCreateFriendGroup: () => {
        return timRenderInstance.TIMFriendshipCreateFriendGroup({
            friendship_create_friend_group_param_name_array: ["ggg1"],
            friendship_create_friend_group_param_identifier_array: ["940928"],
        }, "user data")
    },
    TIMFriendshipGetFriendGroupList: () => {
        return timRenderInstance.TIMFriendshipGetFriendGroupList(["ggg1"], "user data")
    },
    TIMFriendshipModifyFriendGroup: () => {
        return timRenderInstance.TIMFriendshipModifyFriendGroup({
            friendship_modify_friend_group_param_name: "ggg1",
            friendship_modify_friend_group_param_delete_identifier_array: ["940928"],
        }, "user data")
    },
    TIMFriendshipDeleteFriendGroup: () => {
        return timRenderInstance.TIMFriendshipDeleteFriendGroup(["ggg1"], "user data")
    },
    TIMFriendshipAddToBlackList: () => {
        return timRenderInstance.TIMFriendshipAddToBlackList(["940928"], "user data")
    },
    TIMFriendshipGetBlackList:  () => {
        return timRenderInstance.TIMFriendshipGetBlackList("user data")
    },
    TIMFriendshipDeleteFromBlackList:() => {
        return timRenderInstance.TIMFriendshipDeleteFromBlackList(["940928"], "user data")
    },
    TIMFriendshipGetPendencyList: () => {
        return timRenderInstance.TIMFriendshipGetPendencyList({
            friendship_get_pendency_list_param_type: 1,
            friendship_get_pendency_list_param_start_seq: 0,
            friendship_get_pendency_list_param_start_time: 0,
            friendship_get_pendency_list_param_limited_size: 10,
        }, "user data")
    },
    TIMFriendshipDeletePendency: () => {
        return timRenderInstance.TIMFriendshipDeletePendency({
            friendship_delete_pendency_param_type: 1,
            friendship_delete_pendency_param_identifier_array: ["test1"]
        }, "user data")
    },
    TIMFriendshipReportPendencyReaded: () => {
        let timestamp =  Math.floor(+new Date/1000)
        return timRenderInstance.TIMFriendshipReportPendencyReaded(timestamp, "user data")
    },
    TIMFriendshipSearchFriends: () => {
        return timRenderInstance.TIMFriendshipSearchFriends({
            friendship_search_param_keyword_list: ["940928"],
            friendship_search_param_search_field_list: [1, 2, 4]
        }, "user data")
    },
    TIMFriendshipGetFriendsInfo: () => {
        return timRenderInstance.TIMFriendshipGetFriendsInfo(["940928"], "user data")
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
