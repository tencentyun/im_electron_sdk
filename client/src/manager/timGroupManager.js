import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const TimBaseManager = {
  createGroup: () => {
    return timRenderInstance.createGroup({
      params: {
        groupName: "test-avchatRoom",
        groupType: 4,
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
  }
}

export default TimBaseManager;