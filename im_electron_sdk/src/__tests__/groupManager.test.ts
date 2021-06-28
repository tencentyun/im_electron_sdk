import { libMethods, sdkconfig } from "../interface";
import GroupManager from "../manager/groupManager";
import { nodeStrigToCString } from "../utils/utils";
import  * as fakeParams from "../__mock__/groupManagerParams";
import * as resultExpection from "../__mock__/groupManagerExpection";

describe("Group Manager", () => {
    let groupManagerInstance: GroupManager | null = null;
    const { fakeCreateGroupParams, fakeInviteMemberParams, fakeModifyGroupInfoParams } = fakeParams;
    const { createGroupResult, inviteMemberResult, deleteMemberResult, modifyGroupInfoResult } = resultExpection;
    
    let templateMockFn: jest.Mock<any, any>;

    beforeAll(() => {
        const fakeSdkConfig: sdkconfig = {
            sdkappid: 123333302222333,
            consoleTag: 'test console Tag',
            Imsdklib: new Proxy({}, {
                get: function() {
                    templateMockFn = jest.fn();
                    return templateMockFn
                }
            }) as unknown as libMethods
        }
        groupManagerInstance = new GroupManager(fakeSdkConfig);
    });

    it("TIMGroupCreate", () => {
        groupManagerInstance?.TIMGroupCreate(fakeCreateGroupParams);
        const transformedValue = nodeStrigToCString(createGroupResult);
        const result = templateMockFn.mock.calls[0][0];
        expect(result).toContain(transformedValue);
    });

    it("TIMGroupInviteMember", () => {
        groupManagerInstance?.TIMGroupInviteMember(fakeInviteMemberParams);
        const expected = nodeStrigToCString(inviteMemberResult);
        const result = templateMockFn.mock.calls[0][0];
        expect(result).toContain(expected);
    });

    it("TIMGroupDeleteMember", () => {
        groupManagerInstance?.TIMGroupDeleteMember(fakeInviteMemberParams);
        const transformedValue = nodeStrigToCString(deleteMemberResult);
        const result = templateMockFn.mock.calls[0][0];
        expect(result).toContain(transformedValue);
    });

    it("TIMGroupModifyGroupInfo", () => {
        groupManagerInstance?.TIMGroupModifyGroupInfo(fakeModifyGroupInfoParams);
        expect(templateMockFn.mock.calls[0][0]).toContain(nodeStrigToCString(modifyGroupInfoResult));
    })
});