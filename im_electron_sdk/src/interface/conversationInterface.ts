import { TIMConvType, TIMElemType } from "../enum";
import { CommonCallbackFun } from "./basicInterface";

interface convCreate {
    convId: string;
    convType: TIMConvType;
    userData?: string;
}
interface convDelete extends convCreate {}
interface getConvList {
    userData?: string;
}
interface convSetDrat {
    convId: string;
    convType: TIMConvType;
    draftParam: draftParams;
}
interface draftMessage {
    message_elem_array: Array<messageElem>;
}
interface draftParams {
    draft_edit_time: number;
    draft_msg: draftMessage;
    draft_user_define: string;
}
interface messageElem {
    elem_type: TIMElemType;
    text_elem_content: string;
}
interface convCancelDraft {
    convId: string;
    convType: TIMConvType;
}
interface convItem {
    get_conversation_list_param_conv_id: string;
    get_conversation_list_param_conv_type: string;
}
interface convGetConvInfo {
    json_get_conv_list_param: Array<convItem>;
    user_data?: string;
}
interface convPinConversation {
    convId: string;
    convType: TIMConvType;
    isPinged: boolean;
    user_data?: string;
}
interface convGetTotalUnreadMessageCount {
    user_data?: string;
}
interface setConvEventCallback {
    callback: convEventCallback;
    user_data?: string;
}
interface convTotalUnreadMessageCountChangedCallbackParam {
    callback: convTotalUnreadMessageCountChangedCallback;
    user_data?: string;
}
interface convEventCallback {
    (conv_event: number, json_conv_array: string, user_data: string): void;
}
interface convTotalUnreadMessageCountChangedCallback {
    (total_unread_count: number, user_data: string): void;
}

export {
    convCreate,
    getConvList,
    convDelete,
    convSetDrat,
    draftParams,
    draftMessage,
    messageElem,
    convCancelDraft,
    convGetConvInfo,
    convItem,
    convPinConversation,
    convGetTotalUnreadMessageCount,
    setConvEventCallback,
    convEventCallback,
    convTotalUnreadMessageCountChangedCallback,
    convTotalUnreadMessageCountChangedCallbackParam,
};
