import { libMethods, sdkconfig } from "../interface";
import GroupManager from "../manager/groupManager";
import TimbaseManager from "../manager/timbaseManager"
import { nodeStrigToCString } from "../utils/utils";
import  {
    TIMFriendshipGetFriendProfileListParams,
    TIMFriendshipAddFriendParams,
    TIMFriendshipHandleFriendAddRequestParams,
    TIMFriendshipModifyFriendProfileParams,
    TIMFriendshipDeleteFriendParams,
    TIMFriendshipCheckFriendTypeParams,
    TIMFriendshipCreateFriendGroupParams,
    TIMFriendshipGetFriendGroupListParams,
    TIMFriendshipModifyFriendGroupParams,
    TIMFriendshipDeleteFriendGroupParams,
    TIMFriendshipAddToBlackListParams,
    TIMFriendshipGetBlackListParams,
    TIMFriendshipDeleteFromBlackListParams,
    TIMFriendshipGetPendencyListParams,
    TIMFriendshipDeletePendencyParams,
    TIMFriendshipReportPendencyReadedParams,
    TIMFriendshipSearchFriendsParams,
    TIMFriendshipGetFriendsInfoParams
} from "../__mock__/friendshipManagerParams";
import * as resultExpection from "../__mock__/groupManagerExpection";
import TIM from "../tim";

describe("Friendship Manager", () => {
    let groupManagerInstance: GroupManager | null = null;
    const { fakeCreateGroupParams, fakeInviteMemberParams, fakeModifyGroupInfoParams } = fakeParams;
    const { createGroupResult, inviteMemberResult, deleteMemberResult, modifyGroupInfoResult } = resultExpection;
    
    let templateMockFn: jest.Mock<any, any>;
    const tim = new TIM({
        sdkappid: 1400187352
    })
    const friendshipManager = tim.getFriendshipManager()

    beforeAll(async () => {
        tim.getTimbaseManager().TIMInit()
        await new Promise(resolve => {
            setTimeout(() => resolve(1), 1000)
        })
        // 偶尔出现初始化失败？
        await tim.getTimbaseManager().TIMLogin({
            userID: "lexuslin",
            userSig:"eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk", // lexuslin
            // userSig: "eJwtjNEKgjAYhd9l1yH-NreG0IWB1IWIZBh0FzjzR9OlS0bRu2fquTvfdzgfco4zb9Q9CQjzgGzmjoVuLZY440a719Bgy1c5FPXNGCxIQH0AqrZcsMVoZ7DXEwdQMGWhFh9-JpmvpAC*bge8T9-5O2eXSGbVgSsXqS6xo6yT9Bg-96W4VrWj4SlV0Lky3JHvDx6uMp4_", // lexuslin3
            userData:"hahah"
        })
        await new Promise(resolve => {
            setTimeout(() => resolve(1), 1000)
        })
    });

    it("TIMFriendshipGetFriendProfileList", async () => {
        const res = await friendshipManager.TIMFriendshipGetFriendProfileList("")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipAddFriend", async () => {
        const res = await friendshipManager.TIMFriendshipAddFriend(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipHandleFriendAddRequest", async () => {
        const res = await friendshipManager.TIMFriendshipHandleFriendAddRequest(TIMFriendshipHandleFriendAddRequestParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipModifyFriendProfile", async () => {
        const res = await friendshipManager.TIMFriendshipModifyFriendProfile(TIMFriendshipModifyFriendProfileParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipDeleteFriend", async () => {
        const res = await friendshipManager.TIMFriendshipDeleteFriend(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipCheckFriendType", async () => {
        const res = await friendshipManager.TIMFriendshipCheckFriendType(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipCreateFriendGroup", async () => {
        const res = await friendshipManager.TIMFriendshipCreateFriendGroup(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipGetFriendGroupList", async () => {
        const res = await friendshipManager.TIMFriendshipGetFriendGroupList(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipModifyFriendGroup", async () => {
        const res = await friendshipManager.TIMFriendshipModifyFriendGroup(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipDeleteFriendGroup", async () => {
        const res = await friendshipManager.TIMFriendshipDeleteFriendGroup(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipAddToBlackList", async () => {
        const res = await friendshipManager.TIMFriendshipAddToBlackList(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipGetBlackList", async () => {
        const res = await friendshipManager.TIMFriendshipGetBlackList(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipDeleteFromBlackList", async () => {
        const res = await friendshipManager.TIMFriendshipDeleteFromBlackList(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipGetPendencyList", async () => {
        const res = await friendshipManager.TIMFriendshipGetPendencyList(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipDeletePendency", async () => {
        const res = await friendshipManager.TIMFriendshipDeletePendency(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipReportPendencyReaded", async () => {
        const res = await friendshipManager.TIMFriendshipReportPendencyReaded(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipSearchFriends", async () => {
        const res = await friendshipManager.TIMFriendshipSearchFriends(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })
    it("TIMFriendshipGetFriendsInfo", async () => {
        const res = await friendshipManager.TIMFriendshipGetFriendsInfo(TIMFriendshipAddFriendParams, "")
        const arr = JSON.parse(res.json_param ?? "{}")
        const item = arr[0]
        expect(arr.length).toBeGreaterThan(0)
        expect(item.friend_profile_add_source).toMatch(/AddSource_Type/)
        expect(item.friend_profile_add_time).toBeGreaterThan(10000)
        expect(item.friend_profile_user_profile).not.toBeNull()
    })


});