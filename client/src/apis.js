import ConversationManager from "./manager/conversationManager";
import TimBaseManager from "./manager/timBaseManager";
import TimGroupManager from "./manager/timGroupManager";
import TimFriendshipManager from "./manager/friendshipManager";
import TimAdvanceMessageManager from "./manager/advanceMessageManager";

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
            {
                name:"setKickedOfflineCallback",
                action:(callback)=>{
                    TimBaseManager.TIMSetKickedOfflineCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"setUserSigExpiredCallback",
                action:(callback)=>{
                    TimBaseManager.TIMSetUserSigExpiredCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
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
                name:"TIMConvCreate",
                action:(callback)=>{
                    ConversationManager.TIMConvCreate().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvDelete",
                action:(callback)=>{
                    ConversationManager.TIMConvDelete().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvSetDraft",
                action:(callback)=>{
                    ConversationManager.TIMConvSetDraft().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvGetConvList",
                action:(callback)=>{
                    ConversationManager.TIMConvGetConvList().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvSetDraft",
                action:(callback)=>{
                    ConversationManager.TIMConvSetDraft().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvCancelDraft",
                action:(callback)=>{
                    ConversationManager.TIMConvCancelDraft().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvGetConvInfo",
                action:(callback)=>{
                    ConversationManager.TIMConvGetConvInfo().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvPinConversation",
                action:(callback)=>{
                    ConversationManager.TIMConvPinConversation().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMConvGetTotalUnreadMessageCount",
                action:(callback)=>{
                    ConversationManager.TIMConvGetTotalUnreadMessageCount().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetConvTotalUnreadMessageCountChangedCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvTotalUnreadMessageCountChangedCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"TIMSetConvEventCallback",
                action:(callback)=>{
                    ConversationManager.TIMSetConvEventCallback().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        console.log(err)
                        callback('12312')
                    })
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
        manager: 'friendshipManager',
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
            },
            {
                name: 'TIMSetOnAddFriendCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetOnAddFriendCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetOnDeleteFriendCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetOnDeleteFriendCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetUpdateFriendProfileCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetUpdateFriendProfileCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendAddRequestCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendAddRequestCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendApplicationListDeletedCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendApplicationListDeletedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendApplicationListReadCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendApplicationListReadCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendBlackListAddedCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendBlackListAddedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetFriendBlackListDeletedCallback',
                action: callback => {
                    TimFriendshipManager.TIMSetFriendBlackListDeletedCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            }
        ]
    },
    {
        manager: "advanceMessageManager",
        method: [
            {
                name: 'TIMMsgSendMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSendMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgCancelSend',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgCancelSend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgFindMessages',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgFindMessages().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgReportReaded',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgReportReaded().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgRevoke',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgRevoke().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgFindByMsgLocatorList',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgFindByMsgLocatorList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgImportMsgList',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgImportMsgList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSaveMsg',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSaveMsg().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgGetMsgList',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgGetMsgList().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgDelete',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgDelete().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgListDelete',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgListDelete().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgClearHistoryMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgClearHistoryMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSetC2CReceiveMessageOpt',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSetC2CReceiveMessageOpt().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgGetC2CReceiveMessageOpt',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgGetC2CReceiveMessageOpt().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSetGroupReceiveMessageOpt',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSetGroupReceiveMessageOpt().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgDownloadElemToPath',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgDownloadElemToPath().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgDownloadMergerMessage',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgDownloadMergerMessage().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgBatchSend',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgBatchSend().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMMsgSearchLocalMessages',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMMsgSearchLocalMessages().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMAddRecvNewMsgCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMAddRecvNewMsgCallback(callback).then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMRemoveRecvNewMsgCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMRemoveRecvNewMsgCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgReadedReceiptCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgReadedReceiptCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgRevokeCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgRevokeCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgElemUploadProgressCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgElemUploadProgressCallback().then(data => {
                        callback(JSON.stringify(data))
                    }).catch(err => {
                        callback(err.toString())
                    })
                }
            },
            {
                name: 'TIMSetMsgUpdateCallback',
                action: (callback) => {
                    TimAdvanceMessageManager.TIMSetMsgUpdateCallback().then(data => {
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