import TimRender from "../../../im_electron_sdk";
// import TimRender from "im_electron_sdk/dist/renderer";
const timRenderInstance = new TimRender();
const TimBaseManager = {
  TIMGroupCreate: () => {
    return timRenderInstance.TIMGroupCreate({
      params: {
        create_group_param_group_name: "test-avchatRoom",
        create_group_param_group_type: 4,
        create_group_param_group_member_array: [{
          identifer: "6666",
          nameCard: "member1"
        }],
        create_group_param_notification: "Pls add name card",
        create_group_param_introduction: "use for dev test",
        create_group_param_face_url: "test face_url",
      },
      data: "ssss"
    });
  },
  TIMGroupDelete: (groupId) => {
    return timRenderInstance.TIMGroupDelete({
      groupId,
      data: "ssss"
    });
  },
  TIMGroupGetJoinedGroupList: () => {
    return timRenderInstance.TIMGroupGetJoinedGroupList();
  },
  TIMGroupGetGroupInfoList: () => {
    return timRenderInstance.TIMGroupGetGroupInfoList({
      groupIds: ["@TGS#a5X7C5HH2"],
      data: 'test data'
    })
  },
  TIMGroupModifyGroupInfo: () => {
    return timRenderInstance.TIMGroupModifyGroupInfo({
      params: {
        group_modify_info_param_group_id: "@TGS#a5X7C5HH2",
        group_modify_info_param_group_name: "modified group name",
        group_modify_info_param_modify_flag: 2,
        group_modify_info_param_notification: "modified notifaction"
      },
      data: 'test data'
    })
  },
  TIMGroupGetMemberInfoList: () => {
    return timRenderInstance.TIMGroupGetMemberInfoList({
      params: {
        group_get_members_info_list_param_group_id: "@TGS#1UHQ3OKHC",
      }
    })
  },
  TIMGroupModifyMemberInfo: () => {
    return timRenderInstance.TIMGroupModifyMemberInfo({
      params: {
        group_modify_member_info_group_id: "@TGS#1UHQ3OKHC",
        group_modify_member_info_identifier: '109442',
        group_modify_member_info_modify_flag: 8,
        group_modify_member_info_name_card: 'Modified Name card 1111'
      },
      data: 'test data'
    })
  },
  TIMGroupGetPendencyList: () => {
    return timRenderInstance.TIMGroupGetPendencyList({
      params: {
        group_pendency_option_start_time: 0,
        group_pendency_option_max_limited: 0,
      },
      data: 'test data'
    })
  },
  TIMGroupReportPendencyReaded: () => {
    return timRenderInstance.TIMGroupReportPendencyReaded({
      timeStamp: 0,
      data: 'test data'
    })
  },
  TIMGroupHandlePendency: () => {
    return timRenderInstance.TIMGroupHandlePendency({
      params: {
        startTime: 0,
        maxLimited: 0,
      },
      data: 'test data'
    })
  },
  TIMGroupInitGroupAttributes: (groupId) => {
    console.log(groupId);
    return timRenderInstance.TIMGroupInitGroupAttributes({
      groupId,
      attributes: [{
        group_atrribute_key: 'attribute1',
        group_atrribute_value: 'hello'
      }],
      data: 'test data'
    })
  },
  TIMGroupSetGroupAttributes: (groupId) => {
    return timRenderInstance.TIMGroupSetGroupAttributes({
      groupId,
      attributes: [{
        group_atrribute_key: 'attribute2',
        group_atrribute_value: 'hello22'
      }],
      data: 'test data'
    })
  },
  TIMGroupDeleteGroupAttributes: (groupId) => {
    return timRenderInstance.TIMGroupDeleteGroupAttributes({
      groupId,
      attributesKey: ["attribute1"],
      data: 'test data'
    })
  },
  TIMGroupGetGroupAttributes: (groupId) => {
    return timRenderInstance.TIMGroupGetGroupAttributes({
      groupId,
      attributesKey: ["attribute1"],
      data: 'test data'
    })
  },
  TIMSetGroupAttributeChangedCallback: (cbk) => {
    return timRenderInstance.TIMSetGroupAttributeChangedCallback({
      callback: (...args) => {
        const [[data,user_data]] = args;
        cbk(JSON.stringify({
            data,user_data
        }))
      },
      data: 'test data'
    })
  },
  TIMGroupJoin: () => {
    return timRenderInstance.TIMGroupJoin({
      groupId: '@TGS#2VUXAAIHW',
      helloMsg: 'hello',
      data: 'test data'
    })
  },
  TIMGroupQuit: () => {
    return timRenderInstance.TIMGroupQuit({
      groupId: '@TGS#2VUXAAIHW',
      data: 'test data'
    })
  },
  TIMGroupGetOnlineMemberCount: () => {
    return timRenderInstance.TIMGroupGetOnlineMemberCount({
      groupId: '@TGS#a4LPQ6HHW',
      data: 'test data'
    })
  },
  TIMGroupSearchGroups: () => {
    return timRenderInstance.TIMGroupSearchGroups({
      searchParams: {
        group_search_params_keyword_list: ['test'],
        group_search_params_field_list: [2]
    },
    data: 'test data'
    })
  },
  TIMGroupSearchGroupMembers: () => {
    return timRenderInstance.TIMGroupSearchGroupMembers({
      searchParams: {
        group_search_member_params_groupid_list: ['@TGS#a5X7C5HH2'],
        group_search_member_params_keyword_list: ['9999'],
        group_search_member_params_field_list: [1]
    },
    data: 'test data'
    })
  },
  TIMGroupInviteMember: () => {
    return timRenderInstance.TIMGroupInviteMember({
      params: {
        group_invite_member_param_group_id: "@TGS#1I2TQ6HHE",
        group_invite_member_param_identifier_array: ['940928'],
      },
      data: 'test data'
    })
  },
  TIMGroupDeleteMember: () => {
    return timRenderInstance.TIMGroupDeleteMember({
      params: {
        group_delete_member_param_group_id: "@TGS#1I2TQ6HHE",
        group_delete_member_param_identifier_array: ['940928'],
      },
      data: 'test data'
    })
  },
  TIMSetGroupTipsEventCallback: (cbk) => {
    return timRenderInstance.TIMSetGroupTipsEventCallback({
      callback:(...args) => {
        const [[data,user_data]] = args;
        cbk(JSON.stringify({
            data,user_data
        }))
      },
      data: 'test data'
    })
  }
}

export default TimBaseManager;