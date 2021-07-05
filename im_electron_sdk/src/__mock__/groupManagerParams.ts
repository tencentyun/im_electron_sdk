import {
    CreateGroupParams,
    DeleteMemberParams,
    InviteMemberParams,
    ModifyGroupParams,
} from "../interface";

export const fakeCreateGroupParams: CreateGroupParams = {
    params: {
        groupName: "test group",
        groupId: "1111",
        groupType: 0,
        groupMemberArray: [
            {
                identifier: "1111",
                joinTime: 1000,
                memberRole: "test member role",
                msgFlag: 1,
                msgSeq: 2,
                shutupTime: 99933,
                nameCard: "test name card",
                customInfo: [{ key: "test key 1", value: "test value1" }],
            },
        ],
        notification: "test notification",
        introduction: "use for test group",
        faceUrl: "https://xxx",
        addOption: 1,
        maxMemberNum: 20,
        customInfo: [{ key: "test key", value: "test value" }],
    },
    data: "test data",
};

export const fakeInviteMemberParams: InviteMemberParams = {
    params: {
        groupId: "111111",
        identifierArray: ["99999"],
        userData: "hahah",
    },
    data: "test data",
};

export const fakeModifyGroupInfoParams: ModifyGroupParams = {
    params: {
        groupId: "111111",
        modifyFlag: 0,
        groupName: "test name",
        notification: "test notification",
        introduction: "test introduction",
        faceUrl: "xxxx",
        addOption: 1,
        maxMemberNum: 20,
        visible: 1,
        searchable: 1,
        isShutupAll: false,
        owner: "9999",
        customInfo: [
            {
                key: "test key",
                value: "test  value",
            },
        ],
    },
    data: "test data",
};
