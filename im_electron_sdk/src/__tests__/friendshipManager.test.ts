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
    const tim = new TIM({
        sdkappid: 1400187352
    })
    
    const friendshipManager = tim.getFriendshipManager()

    beforeAll(async () => {
        tim.getTimbaseManager().TIMInit()
        await tim.getTimbaseManager().TIMLogin({
            userID: "lexuslin",
            userSig:"eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk", // lexuslin
            // userSig: "eJwtjNEKgjAYhd9l1yH-NreG0IWB1IWIZBh0FzjzR9OlS0bRu2fquTvfdzgfco4zb9Q9CQjzgGzmjoVuLZY440a719Bgy1c5FPXNGCxIQH0AqrZcsMVoZ7DXEwdQMGWhFh9-JpmvpAC*bge8T9-5O2eXSGbVgSsXqS6xo6yT9Bg-96W4VrWj4SlV0Lky3JHvDx6uMp4_", // lexuslin3
            userData:"hahah"
        })
    });

    // it("TIMFriendshipGetFriendProfileList", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipGetFriendProfileList(user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //             "friend_profile_add_source": expect.stringMatching(/^AddSource_Type/),
    //             "friend_profile_add_time": expect.any(Number),
    //             "friend_profile_add_wording": expect.any(String),
    //             "friend_profile_group_name_array": expect.any(Array),
    //             "friend_profile_identifier": expect.any(String),
    //             "friend_profile_custom_string_array": expect.any(Array),
    //             "friend_profile_remark": expect.any(String),
    //             "friend_profile_user_profile": expect.objectContaining({
    //                 "user_profile_add_permission": expect.any(Number),
    //                 "user_profile_birthday": expect.any(Number),
    //                 "user_profile_face_url": expect.any(String),
    //                 "user_profile_gender": expect.any(Number),
    //                 "user_profile_identifier": expect.any(String),
    //                 "user_profile_custom_string_array": expect.any(Array),
    //                 "user_profile_language": expect.any(Number),
    //                 "user_profile_level": expect.any(Number),
    //                 "user_profile_location": expect.any(String),
    //                 "user_profile_nick_name": expect.any(String),
    //                 "user_profile_role": expect.any(Number),
    //                 "user_profile_self_signature": expect.any(String)
    //             })
    //         })])
    //     })
    // })
    it("TIMFriendshipAddFriend", async () => { 
        const user_data = "user data"
        const res = await friendshipManager.TIMFriendshipAddFriend(TIMFriendshipAddFriendParams, user_data)
        res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
        console.log(res)
        expect(res).toMatchObject({
            code: expect.any(Number),
            desc: expect.any(String),
            user_data: user_data,
            json_param: expect.objectContaining({
                "friend_result_code" : 0,
                "friend_result_desc" : expect.any(String),
                "friend_result_identifier" : expect.any(String)
            })
        })
    })
    // it("TIMFriendshipHandleFriendAddRequest", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipHandleFriendAddRequest(TIMFriendshipHandleFriendAddRequestParams, "")
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.objectContaining({
    //             "friend_result_code" : 0,
    //             "friend_result_desc" : expect.any(String),
    //             "friend_result_identifier" : expect.any(String)
    //         })
    //     })
    // })
    // it("TIMFriendshipModifyFriendProfile", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipModifyFriendProfile(TIMFriendshipModifyFriendProfileParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: ""
    //     })
    // })
    // it("TIMFriendshipDeleteFriend", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipDeleteFriend(TIMFriendshipDeleteFriendParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.objectContaining({
    //             "friend_result_code" : 0,
    //             "friend_result_desc" : expect.any(String),
    //             "friend_result_identifier" : expect.any(String)
    //         })
    //     })
    // })
    // it("TIMFriendshipCheckFriendType", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipCheckFriendType(TIMFriendshipCheckFriendTypeParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.objectContaining({
    //             "friendship_check_friendtype_result_code" : 0,
    //             "friendship_check_friendtype_result_desc" : "",
    //             "friendship_check_friendtype_result_identifier" : expect.any(String),
    //             "friendship_check_friendtype_result_relation" : expect.any(Number)
    //         })
    //     })
    // })
    // it("TIMFriendshipCreateFriendGroup", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipCreateFriendGroup(TIMFriendshipCreateFriendGroupParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //            "friend_result_code" : 0,
    //            "friend_result_desc" : "",
    //            "friend_result_identifier" : expect.any(String)
    //         })])
    //     })
    // })
    // it("TIMFriendshipGetFriendGroupList", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipGetFriendGroupList(TIMFriendshipGetFriendGroupListParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //             "friend_group_info_count" : expect.any(Number),
    //             "friend_group_info_identifier_array" : expect.any(Array),
    //             "friend_group_info_name" : expect.any(String)
    //         })])
    //     })
    // })
    // it("TIMFriendshipModifyFriendGroup", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipModifyFriendGroup(TIMFriendshipModifyFriendGroupParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //             "friend_result_code" : expect.any(Number),
    //             "friend_result_desc" : expect.any(String),
    //             "friend_result_identifier" : expect.any(String)
    //         })])
    //     })
    // })
    // it("TIMFriendshipDeleteFriendGroup", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipDeleteFriendGroup(TIMFriendshipDeleteFriendGroupParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: ""
    //     })
    // })
    // it("TIMFriendshipAddToBlackList", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipAddToBlackList(TIMFriendshipAddToBlackListParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({    
    //             "friend_result_code" : 0,
    //             "friend_result_desc" : "OK",
    //             "friend_result_identifier" : expect.any(String)
    //         })])
    //     })
    // })
    // it("TIMFriendshipGetBlackList", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipGetBlackList(user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //             "friend_profile_add_source": expect.stringMatching(/^AddSource_Type/),
    //             "friend_profile_add_time": expect.any(Number),
    //             "friend_profile_add_wording": expect.any(String),
    //             "friend_profile_group_name_array": expect.any(Array),
    //             "friend_profile_identifier": expect.any(String),
    //             "friend_profile_remark": expect.any(String),
    //             "friend_profile_user_profile": expect.objectContaining({
    //                 "user_profile_add_permission": expect.any(Number),
    //                 "user_profile_birthday": expect.any(Number),
    //                 "user_profile_face_url": expect.any(String),
    //                 "user_profile_gender": expect.any(Number),
    //                 "user_profile_identifier": expect.any(String),
    //                 "user_profile_language": expect.any(Number),
    //                 "user_profile_level": expect.any(Number),
    //                 "user_profile_location": expect.any(String),
    //                 "user_profile_nick_name": expect.any(String),
    //                 "user_profile_role": expect.any(Number),
    //                 "user_profile_self_signature": expect.any(String)
    //             })
    //         })])
    //     })
    // })
    // it("TIMFriendshipDeleteFromBlackList", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipDeleteFromBlackList(TIMFriendshipDeleteFromBlackListParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({    
    //             "friend_result_code" : 0,
    //             "friend_result_desc" : "OK",
    //             "friend_result_identifier" : expect.any(String)
    //         })])
    //     })
    // })
    // it("TIMFriendshipGetPendencyList", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipGetPendencyList(TIMFriendshipGetPendencyListParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({    
    //             "friend_add_pendency_info_add_source" : expect.stringMatching(/^AddSource_Type/),
    //             "friend_add_pendency_info_add_time" : expect.any(Number),
    //             "friend_add_pendency_info_add_wording" : expect.any(String),
    //             "friend_add_pendency_info_idenitifer" : expect.any(String),
    //             "friend_add_pendency_info_nick_name" : expect.any(String),
    //             "friend_add_pendency_info_type" : expect.any(Number)
    //         })])
    //     })
    // })
    // it("TIMFriendshipDeletePendency", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipDeletePendency(TIMFriendshipDeletePendencyParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({    
    //             "friend_result_code" : 0,
    //             "friend_result_desc" : "OK",
    //             "friend_result_identifier" : expect.any(String)
    //         })])
    //     })
    // })
    // it("TIMFriendshipReportPendencyReaded", async () => {
    //     const timestamp = Math.floor(+new Date / 1000)
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipReportPendencyReaded(timestamp, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: ""
    //     })
    // })
    // it("TIMFriendshipSearchFriends", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipSearchFriends(TIMFriendshipSearchFriendsParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //             "friend_profile_add_source": expect.stringMatching(/^AddSource_Type/),
    //             "friend_profile_add_time": expect.any(Number),
    //             "friend_profile_add_wording": expect.any(String),
    //             "friend_profile_group_name_array": expect.any(Array),
    //             "friend_profile_identifier": expect.any(String),
    //             "friend_profile_item_custom_string_array": expect.any(String),
    //             "friend_profile_remark": expect.any(String),
    //             "friend_profile_user_profile": expect.objectContaining({
    //                 "user_profile_add_permission": expect.any(Number),
    //                 "user_profile_birthday": expect.any(Number),
    //                 "user_profile_face_url": expect.any(String),
    //                 "user_profile_gender": expect.any(Number),
    //                 "user_profile_identifier": expect.any(String),
    //                 "user_profile_item_custom_string_array": expect.any(Array),
    //                 "user_profile_language": expect.any(Number),
    //                 "user_profile_level": expect.any(Number),
    //                 "user_profile_location": expect.any(String),
    //                 "user_profile_nick_name": expect.any(String),
    //                 "user_profile_role": expect.any(Number),
    //                 "user_profile_self_signature": expect.any(String)
    //             })
    //         })])
    //     })
    // })
    // it("TIMFriendshipGetFriendsInfo", async () => {
    //     const user_data = "user data"
    //     const res = await friendshipManager.TIMFriendshipGetFriendsInfo(TIMFriendshipGetFriendsInfoParams, user_data)
    //     res.json_param = res.json_param === "" ? "" : JSON.parse(res.json_param ?? "{}")
    //     expect(res).toMatchObject({
    //         code: expect.any(Number),
    //         desc: expect.any(String),
    //         user_data: user_data,
    //         json_param: expect.arrayContaining([expect.objectContaining({
    //             "friend_profile_add_source": expect.stringMatching(/^AddSource_Type/),
    //             "friend_profile_add_time": expect.any(Number),
    //             "friend_profile_add_wording": expect.any(String),
    //             "friend_profile_group_name_array": expect.any(Array),
    //             "friend_profile_identifier": expect.any(String),
    //             "friend_profile_item_custom_string_array": expect.any(String),
    //             "friend_profile_remark": expect.any(String),
    //             "friend_profile_user_profile": expect.objectContaining({
    //                 "user_profile_add_permission": expect.any(Number),
    //                 "user_profile_birthday": expect.any(Number),
    //                 "user_profile_face_url": expect.any(String),
    //                 "user_profile_gender": expect.any(Number),
    //                 "user_profile_identifier": expect.any(String),
    //                 "user_profile_item_custom_string_array": expect.any(Array),
    //                 "user_profile_language": expect.any(Number),
    //                 "user_profile_level": expect.any(Number),
    //                 "user_profile_location": expect.any(String),
    //                 "user_profile_nick_name": expect.any(String),
    //                 "user_profile_role": expect.any(Number),
    //                 "user_profile_self_signature": expect.any(String)
    //             })
    //         })])
    //     })
    // })
});