import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const TimBaseManager = {
  createGroup: () => {
    return timRenderInstance.createGroup({
      params: {
        groupName: "test-avchatRoom",
        groupType: 1,
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
  deleteGroup: () => {
    return timRenderInstance.deleteGroup({
      groupId: "@TGS#aL5QC5HHJ",
      data: "ssss"
    });
  },
  getJoinedGroupList: () => {
    return timRenderInstance.getJoinedGroupList();
  },
  getGroupInfoList: () => {
    return timRenderInstance.getGroupInfoList({
      groupIds: ["@TGS#a5X7C5HH2"],
      data: 'test data'
    })
  },
  modifyGroupInfo: () => {
    return timRenderInstance.modifyGroupInfo({
      params: {
        groupId: "@TGS#a5X7C5HH2",
        groupName: "modified group name",
        modifyFlag: 2,
        notification: "modified notifaction"
      },
      data: 'test data'
    })
  },
  getGroupMemberInfoList: () => {
    return timRenderInstance.getGroupMemberInfoList({
      params: {
        groupId: "@TGS#a5X7C5HH2",
      },
      data: 'test data'
    })
  },
  modifyGroupMemberInfo: () => {
    return timRenderInstance.modifyGroupMemberInfo({
      params: {
        groupId: "@TGS#a5X7C5HH2",
        identifier: '77778',
        modifyFlag: 8,
        nameCard: 'Modified Name card'
      },
      data: 'test data'
    })
  },
  getGroupPendencyList: () => {
    return timRenderInstance.getGroupPendencyList({
      params: {
        startTime: 0,
        maxLimited: 0,
      },
      data: 'test data'
    })
  },
  groupReportPendencyReaded: () => {
    return timRenderInstance.groupReportPendencyReaded({
      timeStamp: 0,
      data: 'test data'
    })
  },
  handleGroupPendency: () => {
    return timRenderInstance.handleGroupPendency({
      params: {
        startTime: 0,
        maxLimited: 0,
      },
      data: 'test data'
    })
  },
  initGroupAttribute: (groupId) => {
    console.log(groupId);
    return timRenderInstance.initGroupAttribute({
      groupId,
      attributes: [{
        key: 'attribute1',
        value: 'hello'
      }],
      data: 'test data'
    })
  },
  setGroupAttribute: (groupId) => {
    return timRenderInstance.setGroupAttribute({
      groupId,
      attributes: [{
        key: 'attribute2',
        value: 'hello22'
      }],
      data: 'test data'
    })
  },
  deleteGroupAttribute: (groupId) => {
    return timRenderInstance.deleteGroupAttribute({
      groupId,
      attributesKey: ["attribute1"],
      data: 'test data'
    })
  },
  getGroupAttribute: (groupId) => {
    return timRenderInstance.getGroupAttribute({
      groupId,
      attributesKey: ["attribute1"],
      data: 'test data'
    })
  },
  groupAttributeChangedCallback: (cbk) => {
    return timRenderInstance.groupAttributeChangedCallback({
      callback: (...args) => {
        const [[data,user_data]] = args;
        cbk(JSON.stringify({
            data,user_data
        }))
      },
      data: 'test data'
    })
  },
  joinGroup: () => {
    return timRenderInstance.joinGroup({
      groupId: '@TGS#1I2TQ6HHE',
      helloMsg: 'hello',
      data: 'test data'
    })
  },
  quitGroup: () => {
    return timRenderInstance.quitGroup({
      groupId: '',
      data: 'test data'
    })
  },
  getGroupOnlineMemberCount: () => {
    return timRenderInstance.getGroupOnlineMemberCount({
      groupId: '@TGS#a4LPQ6HHW',
      data: 'test data'
    })
  },
  searchGroups: () => {
    return timRenderInstance.searchGroups({
      searchParams: {
        keywordList: ['test'],
        fieldList: [2]
    },
    data: 'test data'
    })
  },
  searchGroupMembers: () => {
    return timRenderInstance.searchGroupMembers({
      searchParams: {
        groupidList: ['@TGS#a5X7C5HH2'],
        keywordList: ['9999'],
        fieldList: [1]
    },
    data: 'test data'
    })
  },
  inviteMember: () => {
    return timRenderInstance.inviteMember({
      params: {
        groupId: "@TGS#1I2TQ6HHE",
        identifierArray: ['940928'],
      },
      data: 'test data'
    })
  },
  deleteMember: () => {
    return timRenderInstance.deleteMember({
      params: {
        groupId: "@TGS#1I2TQ6HHE",
        identifierArray: ['940928'],
      },
      data: 'test data'
    })
  },
  groupTipsChangedCallback: (cbk) => {
    return timRenderInstance.groupTipsChangedCallback({
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