import { getFFIPath } from "./utils/utils";

const ffi = require("ffi-napi");
const ref = require("ref-napi");
const ffiPath = getFFIPath();
const Imsdklib = ffi.Library(ffiPath, {
    // timbaseManager start
    // 回调
    TIMSetNetworkStatusListenerCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetKickedOfflineCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetUserSigExpiredCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMGetSDKVersion: [ref.types.CString, []],
    TIMInit: [ref.types.int, [ref.types.uint64, ref.types.CString]],
    TIMLogin: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],

    TIMUninit: [ref.types.int, []],
    TIMGetServerTime: [ref.types.uint64, []],
    TIMLogout: [ref.types.int, ["pointer", ref.types.CString]],
    TIMGetLoginStatus: [ref.types.int, []],
    TIMGetLoginUserID: [ref.types.int, ["pointer", ref.types.CString]],
    // timbaseManager end
    // conversationManager start
    // 已废弃
    TIMConvCreate: [
        ref.types.int,
        [ref.types.CString, ref.types.int, "pointer", ref.types.CString],
    ],
    TIMConvGetConvList: [ref.types.int, ["pointer", ref.types.CString]],
    TIMConvDelete: [
        ref.types.int,
        [ref.types.CString, ref.types.int, "pointer", ref.types.CString],
    ],
    TIMConvSetDraft: [
        ref.types.int,
        [ref.types.CString, ref.types.int, ref.types.CString],
    ],
    TIMConvCancelDraft: [ref.types.int, [ref.types.CString, ref.types.int]],
    TIMConvGetConvInfo: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMConvPinConversation: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.bool,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMSetConvEventCallback: [ref.types.void, ["pointer", ref.types.CString]],
    TIMConvGetTotalUnreadMessageCount: [
        ref.types.int,
        ["pointer", ref.types.CString],
    ],
    TIMSetConvTotalUnreadMessageCountChangedCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    // conversationManager end
    // groupManager start
    TIMGroupCreate: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupDelete: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupJoin: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],

    TIMGroupQuit: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupInviteMember: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupDeleteMember: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupGetJoinedGroupList: [ref.types.int, ["pointer", ref.types.CString]],
    TIMGroupGetGroupInfoList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupModifyGroupInfo: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupGetMemberInfoList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupModifyMemberInfo: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupGetPendencyList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupReportPendencyReaded: [
        ref.types.int,
        [ref.types.int, "pointer", ref.types.CString],
    ],
    TIMGroupHandlePendency: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupGetOnlineMemberCount: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupSearchGroups: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupSearchGroupMembers: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupInitGroupAttributes: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupSetGroupAttributes: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupDeleteGroupAttributes: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMGroupGetGroupAttributes: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMSetGroupTipsEventCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetGroupAttributeChangedCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    // groupManager end

    // friendship begin
    TIMFriendshipGetFriendProfileList: [
        ref.types.int,
        ["pointer", ref.types.CString],
    ],
    TIMFriendshipAddFriend: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipHandleFriendAddRequest: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipModifyFriendProfile: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipDeleteFriend: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipCheckFriendType: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipCreateFriendGroup: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipGetFriendGroupList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipModifyFriendGroup: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipDeleteFriendGroup: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipAddToBlackList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipGetBlackList: [ref.types.int, ["pointer", ref.types.CString]],
    TIMFriendshipDeleteFromBlackList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipGetPendencyList: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipDeletePendency: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipReportPendencyReaded: [
        ref.types.int,
        [ref.types.uint64, "pointer", ref.types.CString],
    ],
    TIMFriendshipSearchFriends: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMFriendshipGetFriendsInfo: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMMsgSendMessage: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgCancelSend: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgFindMessages: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMMsgReportReaded: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgRevoke: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgFindByMsgLocatorList: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgImportMsgList: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgSaveMsg: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgGetMsgList: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgDelete: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgListDelete: [
        ref.types.int,
        [
            ref.types.CString,
            ref.types.int,
            ref.types.CString,
            "pointer",
            ref.types.CString,
        ],
    ],
    TIMMsgClearHistoryMessage: [
        ref.types.int,
        [ref.types.CString, ref.types.int, "pointer", ref.types.CString],
    ],
    TIMMsgSetC2CReceiveMessageOpt: [
        ref.types.int,
        [ref.types.CString, ref.types.int, "pointer", ref.types.CString],
    ],
    TIMMsgGetC2CReceiveMessageOpt: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMMsgSetGroupReceiveMessageOpt: [
        ref.types.int,
        [ref.types.CString, ref.types.int, "pointer", ref.types.CString],
    ],
    TIMMsgDownloadElemToPath: [
        ref.types.int,
        [ref.types.CString, ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMMsgDownloadMergerMessage: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMMsgBatchSend: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMMsgSearchLocalMessages: [
        ref.types.int,
        [ref.types.CString, "pointer", ref.types.CString],
    ],
    TIMAddRecvNewMsgCallback: [ref.types.void, ["pointer", ref.types.CString]],
    TIMRemoveRecvNewMsgCallback: [ref.types.void, ["pointer"]],
    TIMSetMsgReadedReceiptCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetMsgRevokeCallback: [ref.types.void, ["pointer", ref.types.CString]],
    TIMSetMsgElemUploadProgressCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetOnAddFriendCallback: [ref.types.void, ["pointer", ref.types.CString]],
    TIMSetOnDeleteFriendCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetUpdateFriendProfileCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetFriendAddRequestCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetFriendApplicationListDeletedCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetFriendApplicationListReadCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetFriendBlackListAddedCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetFriendBlackListDeletedCallback: [
        ref.types.void,
        ["pointer", ref.types.CString],
    ],
    TIMSetMsgUpdateCallback: [ref.types.void, ["pointer", ref.types.CString]],
    // friendship end
});

export default Imsdklib;
