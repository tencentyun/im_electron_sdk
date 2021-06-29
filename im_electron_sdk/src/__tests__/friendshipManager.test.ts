import { libMethods, sdkconfig } from "../interface";
import GroupManager from "../manager/groupManager";
import TimbaseManager from "../manager/timbaseManager"
import { nodeStrigToCString } from "../utils/utils";
import  * as fakeParams from "../__mock__/groupManagerParams";
import * as resultExpection from "../__mock__/groupManagerExpection";
import TIM from "../tim";

describe("Friendship Manager", () => {
    let groupManagerInstance: GroupManager | null = null;
    const { fakeCreateGroupParams, fakeInviteMemberParams, fakeModifyGroupInfoParams } = fakeParams;
    const { createGroupResult, inviteMemberResult, deleteMemberResult, modifyGroupInfoResult } = resultExpection;
    
    let templateMockFn: jest.Mock<any, any>;
    const obj = {}
    const arr: Array<number> = []
    const tim = new TIM({
        sdkappid: 1400187352
    })

    beforeAll(async () => {
        tim.getTimbaseManager().TIMInit()
        await new Promise(resolve => {
            setTimeout(() => resolve(1), 1000)
        })
        console.log(11111)
        await tim.getTimbaseManager().TIMLogin({
            userID: "lexuslin",
            userSig:"eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk", // lexuslin
            // userSig: "eJwtjNEKgjAYhd9l1yH-NreG0IWB1IWIZBh0FzjzR9OlS0bRu2fquTvfdzgfco4zb9Q9CQjzgGzmjoVuLZY440a719Bgy1c5FPXNGCxIQH0AqrZcsMVoZ7DXEwdQMGWhFh9-JpmvpAC*bge8T9-5O2eXSGbVgSsXqS6xo6yT9Bg-96W4VrWj4SlV0Lky3JHvDx6uMp4_", // lexuslin3
            userData:"hahah"
        })
        console.log(222222)
        await new Promise(resolve => {
            setTimeout(() => resolve(1), 1000)
        })
        console.log(3333333)
    });

    it("TIMFriendshipGetFriendProfileList", async () => {
        console.log(4444444444)
        const res = await tim.getFriendshipManager().TIMFriendshipGetFriendProfileList("")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        // expect(item.friend_profile_item_custom_string_array.length).toBeGreaterThan(0)
        expect(item.friend_profile_user_profile).not.toBeNull()
    });


    // it("TIMGroupInviteMember", () => {
    //     groupManagerInstance?.TIMGroupInviteMember(fakeInviteMemberParams);
    //     const expected = nodeStrigToCString(inviteMemberResult);
    //     const result = templateMockFn.mock.calls[0][0];
    //     expect(result).toContain(expected);
    // });

});