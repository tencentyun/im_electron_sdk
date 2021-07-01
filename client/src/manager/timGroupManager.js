import TimRender from "../../../im_electron_sdk";
const timRenderInstance = new TimRender();
const TimBaseManager = {
  TIMGroupCreate: () => {
    return timRenderInstance.TIMGroupCreate({
      params: {
        groupName: "test-avchatRoom",
        groupType: 0,
        groupMemberArray: [{
          identifer: "6666",
          nameCard: "member1"
        }],
        notification: "Pls add name card",
        introduction: "use for dev test",
        face_url: "test face_url",
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
        groupId: "@TGS#a5X7C5HH2",
        groupName: "modified group name",
        modifyFlag: 2,
        notification: "modified notifaction"
      },
      data: 'test data'
    })
  },
  TIMGroupGetMemberInfoList: (groupId) => {
    return timRenderInstance.TIMGroupGetMemberInfoList({
      params: {
        groupId,
      },
      data: 'test data'
    })
  },
  TIMGroupModifyMemberInfo: () => {
    return timRenderInstance.TIMGroupModifyMemberInfo({
      params: {
        groupId: "@TGS#a5X7C5HH2",
        identifier: '77778',
        modifyFlag: 8,
        nameCard: 'Modified Name card'
      },
      data: 'test data'
    })
  },
  TIMGroupGetPendencyList: () => {
    return timRenderInstance.TIMGroupGetPendencyList({
      params: {
        startTime: 0,
        maxLimited: 0,
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
        key: 'attribute1',
        value: 'hello'
      }],
      data: 'test data'
    })
  },
  TIMGroupSetGroupAttributes: (groupId) => {
    return timRenderInstance.TIMGroupSetGroupAttributes({
      groupId,
      attributes: [{
        key: 'attribute2',
        value: 'hello22'
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
        keywordList: ['test'],
        fieldList: [2]
    },
    data: 'test data'
    })
  },
  TIMGroupSearchGroupMembers: () => {
    return timRenderInstance.TIMGroupSearchGroupMembers({
      searchParams: {
        groupidList: ['@TGS#a5X7C5HH2'],
        keywordList: ['9999'],
        fieldList: [1]
    },
    data: 'test data'
    })
  },
  TIMGroupInviteMember: () => {
    return timRenderInstance.TIMGroupInviteMember({
      params: {
        groupId: "@TGS#1I2TQ6HHE",
        identifierArray: ['940928'],
      },
      data: 'test data'
    })
  },
  TIMGroupDeleteMember: () => {
    return timRenderInstance.TIMGroupDeleteMember({
      params: {
        groupId: "@TGS#1I2TQ6HHE",
        identifierArray: ['940928'],
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