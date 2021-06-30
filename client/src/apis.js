import ConversationManager from "./manager/conversationManager";
import TimBaseManager from "./manager/timBaseManager";
import TimGroupManager from "./manager/timGroupManager";
import TimFriendshipManager from "./manager/friendshipManager";

let createdGroupId;

const APIS = [
    {
        manager: "timBaseManager",
        method: [
            {
                name: "init",
                action: (callback) => {
                    TimBaseManager.TIMInit().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "login",
                action: (callback) => {
                    TimBaseManager.TIMLogin().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "uninit",
                action: (callback) => {
                    TimBaseManager.uninit().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getServerTime",
                action: (callback) => {
                    TimBaseManager.getServerTime().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getSDKVersion",
                action: (callback) => {
                    TimBaseManager.getSDKVersion().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "logout",
                action: (callback) => {
                    TimBaseManager.logout().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getLoginStatus",
                action: (callback) => {
                    TimBaseManager.getLoginStatus().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getLoginUserID",
                action: (callback) => {
                    TimBaseManager.getLoginUserID().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "setNetworkStatusListenerCallback",
                action: (callback) => {
                    TimBaseManager.setNetworkStatusListenerCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
        ]
    },
    {
        manager: 'conversationManager',
        method: [
            {
                name: "TIMSetConvEventCallback",
                action: (callback) => {
                    try {
                        ConversationManager.TIMSetConvEventCallback().then(data => {
                            callback(JSON.stringify(data))
                        }).catch(err => {
                            console.log(err)
                            callback('12312')
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
        ]
    },
    {
        manager: "groupManager",
        method: [
            {
                name: "createGroup",
                action: (callback) => {
                    TimGroupManager.createGroup().then(res => {
                        const { data: { json_param } } = res
                        const { create_group_result_groupid } = JSON.parse(json_param);
                        createdGroupId = create_group_result_groupid;
                        callback(JSON.stringify(res))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "deleteGroup",
                action: (callback) => {
                    TimGroupManager.deleteGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getJoinedGroup",
                action: (callback) => {
                    TimGroupManager.getJoinedGroupList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getGroupInfoList",
                action: (callback) => {
                    TimGroupManager.getGroupInfoList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "modifyGroupInfo",
                action: (callback) => {
                    TimGroupManager.modifyGroupInfo().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getGroupMemberInfoList",
                action: (callback) => {
                    TimGroupManager.getGroupMemberInfoList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "modifyGroupMemberInfo",
                action: (callback) => {
                    TimGroupManager.modifyGroupMemberInfo().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getGroupPendencyList",
                action: (callback) => {
                    TimGroupManager.getGroupPendencyList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "initGroupAttribute",
                action: (callback) => {
                    TimGroupManager.initGroupAttribute(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "setGroupAttribute",
                action: (callback) => {
                    TimGroupManager.setGroupAttribute(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "deleteGroupAttribute",
                action: (callback) => {
                    TimGroupManager.deleteGroupAttribute(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getGroupAttribute",
                action: (callback) => {
                    TimGroupManager.getGroupAttribute(createdGroupId).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "groupAttributeChangedCallback",
                action: (callback) => {
                    TimGroupManager.groupAttributeChangedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "joinGroup",
                action: (callback) => {
                    TimGroupManager.joinGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "quitGroup",
                action: (callback) => {
                    TimGroupManager.quitGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "groupReportPendencyReaded",
                action: (callback) => {
                    TimGroupManager.groupReportPendencyReaded().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "handleGroupPendency",
                action: (callback) => {
                    TimGroupManager.handleGroupPendency().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "getGroupOnlineMemberCount",
                action: (callback) => {
                    TimGroupManager.getGroupOnlineMemberCount().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "searchGroups",
                action: (callback) => {
                    TimGroupManager.searchGroups().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "searchGroupMembers",
                action: (callback) => {
                    TimGroupManager.searchGroupMembers().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "inviteMember",
                action: (callback) => {
                    TimGroupManager.inviteMember().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "deleteMember",
                action: (callback) => {
                    TimGroupManager.deleteMember().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: "groupTipsChangedCallback",
                action: (callback) => {
                    TimGroupManager.groupTipsChangedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            }
        ]
    },
    {
        name: 'friendshipManager',
        method: [
            {
                name: 'getFriendshipProfileList',
                action: callback => {
                    TimFriendshipManager.getFriendshipProfileList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'addFriend',
                action: callback => {
                    TimFriendshipManager.addFriend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'handleFriendAddRequest',
                action: callback => {
                    TimFriendshipManager.handleFriendAddRequest().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'modifyFriendProfile',
                action: callback => {
                    TimFriendshipManager.modifyFriendProfile().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'deleteFriend',
                action: callback => {
                    TimFriendshipManager.deleteFriend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'checkFriendType',
                action: callback => {
                    TimFriendshipManager.checkFriendType().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'createFriendGroup',
                action: callback => {
                    TimFriendshipManager.createFriendGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'getFriendGroupList',
                action: callback => {
                    TimFriendshipManager.getFriendGroupList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'modifyFriendGroup',
                action: callback => {
                    TimFriendshipManager.modifyFriendGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'deleteFriendGroup',
                action: callback => {
                    TimFriendshipManager.deleteFriendGroup().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'addToBlackList',
                action: callback => {
                    TimFriendshipManager.addToBlackList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'getBlackList',
                action: callback => {
                    TimFriendshipManager.getBlackList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'deleteFromBlackList',
                action: callback => {
                    TimFriendshipManager.deleteFromBlackList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'getPendencyList',
                action: callback => {
                    TimFriendshipManager.getPendencyList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'deletePendency',
                action: callback => {
                    TimFriendshipManager.deletePendency().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'reportPendencyReaded',
                action: callback => {
                    TimFriendshipManager.reportPendencyReaded().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'searchFriends',
                action: callback => {
                    TimFriendshipManager.searchFriends().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'getFriendsInfo',
                action: callback => {
                    TimFriendshipManager.getFriendsInfo().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            }
        ]
    }
]
export default APIS;