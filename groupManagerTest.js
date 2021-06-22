let tim = null;

const createGroup = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const fakeParams = {
            name: "test-name",
            memberArray: [{
                identifer: "123",
                customInfo: [
                    { key: "test1", value: "111" },
                    { key: "test2", value: "222" }
                ]
            }],
            customInfo: [
                { key: "group test1", value: "111" },
                { key: "group test2", value: "222" }
            ]
        };
        const res = await groupManager.TIMGroupCreate({
            params: fakeParams,
            data: "{a:1, b:2}"
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
};

const joinGroup = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupJoin({
            groupId: '@TGS#2DPBSMHHG',
            helloMsg: "Hello",
            data: "{a:1, b:2}"
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const deleteGroup = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupDelete({
            groupId: '@TGS#2DPBSMHHG',
            data: "{a:1, b:2}"
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const quitGroup = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupQuit({
            groupId: '@TGS#2CTYSMHHB',
            data: "{a:1, b:2}"
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const getJoinedGroup = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupGetJoinedGroupList();
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const getGroupInfoList = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupGetGroupInfoList({
            groupIds: ["@TGS#2DOLQMHHN"],
            data: 'test data'
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const modifyGroupInfo = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupModifyGroupInfo({
            params: {
                groupId: "@TGS#2DOLQMHHN",
                groupName: "modified group name",
                modifyFlag: 3,
                notification: "modified notifaction"
            },
            data: 'test data'
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const getGroupMemberInfo = async () => {
    const groupManager = tim.getGroupManager();
    try {
        const res = await groupManager.TIMGroupGetMemberInfoList({
            params: {
                groupId: "@TGS#2DOLQMHHN",
            },
            data: 'test data'
        });
        console.log("==========res===========", res);
    } catch (e) {
        console.log("=========error===", e)
    }
}

const testGroupManager = data => {
    tim = data;
    // createGroup();
    // joinGroup();
    // deleteGroup();
    // quitGroup();
    // getJoinedGroup();
    // modifyGroupInfo();
    // getGroupInfoList();
    // getGroupMemberInfo();
}

module.exports = {
    testGroupManager
}