import { CommonCallbackFun } from "./basicInterface";
import { TIMFriendType } from "../enum";

interface Json_advance_message_param {
    friendship_add_friend_param_identifier?: string;
    friendship_add_friend_param_friend_type?: TIMFriendType;
    friendship_add_friend_param_remark?: string;
    friendship_add_friend_param_group_name?: string;
    friendship_add_friend_param_add_source?: string;
    friendship_add_friend_param_add_wording?: string;
}

export {
    Json_advance_message_param,
}