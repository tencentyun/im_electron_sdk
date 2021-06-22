import { getFFIPath } from "./utils/utils";
// import StructType from 'ref-struct-napi';

const ffi = require('ffi-napi');
const ref = require('ref-napi');
const ffiPath = getFFIPath();
const Imsdklib = ffi.Library(ffiPath,{
      // timbaseManager start
      // 回调
      // "TIMSetNetworkStatusListenerCallback":[[],['pointer',ref.types.CString]],
      "TIMGetSDKVersion":[ref.types.CString,[]],
      "TIMInit": [ref.types.int,[ref.types.uint64,ref.types.CString]],
      "TIMLogin":[ref.types.int,[ref.types.CString,ref.types.CString,'pointer',ref.types.CString]],

      
      "TIMUninit":[ref.types.int,[]],
      "TIMGetServerTime":[ref.types.uint64,[]],
      "TIMLogout":[ref.types.int,['pointer',ref.types.CString]],
      "TIMGetLoginStatus":[ref.types.int,[]],
      "TIMGetLoginUserID":[ref.types.int,['pointer',ref.types.CString]],
      // timbaseManager end
      // conversationManager start
      "TIMConvCreate":[ref.types.int,[ref.types.CString,ref.types.int,'pointer',ref.types.CString]],
      // conversationManager end
      // groupManager start
      "TIMGroupCreate": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupDelete": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupJoin": [ref.types.int, [ref.types.CString, ref.types.CString, 'pointer', ref.types.CString]],

      
      "TIMGroupQuit": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupInviteMember": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupDeleteMember": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupGetJoinedGroupList": [ref.types.int, ['pointer', ref.types.CString]],
      "TIMGroupGetGroupInfoList": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupModifyGroupInfo": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupGetMemberInfoList": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupModifyMemberInfo": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupGetPendencyList": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupReportPendencyReaded": [ref.types.int, [ref.types.int, 'pointer', ref.types.CString]],
      "TIMGroupHandlePendency": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupGetOnlineMemberCount": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      "TIMGroupSearchGroups": [ref.types.int, [ref.types.CString, 'pointer', ref.types.CString]],
      // groupManager end



      // friendship begin
      "TIMFriendshipGetFriendProfileList": [ref.types.int, ['pointer',ref.types.CString]]
      // friendship end
});

export default Imsdklib;