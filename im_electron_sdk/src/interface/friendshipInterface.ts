import { CommonCallbackFun } from "./basicInterface";
import { TIMFriendType } from "../enum";

interface Json_add_friend_param {
    friendship_add_friend_param_identifier?: string;
    friendship_add_friend_param_friend_type?: TIMFriendType;
    friendship_add_friend_param_remark?: string;
    friendship_add_friend_param_group_name?: string;
    friendship_add_friend_param_add_source?: string;
    friendship_add_friend_param_add_wording?: string;
}

interface ErrorResponse {
    code?: number,
    desc?: String,
    json_params?: String,
    user_data?: String
}



export {
    ErrorResponse,
    Json_add_friend_param,
}