import { TIMConvType, TIMElemType } from "../enum";

/**
 * * @brief 创建会话
 * @param conv_id    conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convCreate {
    convId: string;
    convType: TIMConvType;
    userData?: string;
}
/**
 * @param conv_id    conv_id 会话的ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](TIMCloudDef.h)
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convDelete extends convCreate {}
/**
 * @brief 获取最近联系人的会话列表
 *
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
interface getConvList {
    userData?: string;
}
/**
 * @param conv_id   conv_id 会话的ID
 * @param convType  convType参考TIMConvType
 * @param draftParams draftParams参考draftParams
 */
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
/**
 * @param conv_id   conv_id 会话的ID
 * @param convType  convType参考TIMConvType
 */
interface convCancelDraft {
    convId: string;
    convType: TIMConvType;
}
interface convItem {
    get_conversation_list_param_conv_id: string;
    get_conversation_list_param_conv_type: string;
}
/**
 * @param json_get_conv_list_param   json_get_conv_list_param 会话唯一 ID 列表和会话类型的列表
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convGetConvInfo {
    json_get_conv_list_param: Array<convItem>;
    user_data?: string;
}
/**
 * * @param conv_id  conv_id 会话 ID
 * @param conv_type  conv_type 会话类型，请参考[TIMConvType](TIMConvType)
 * @param is_pinned is_pinned是否置顶会话
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convPinConversation {
    convId: string;
    convType: TIMConvType;
    isPinned: boolean;
    user_data?: string;
}
/**
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface convGetTotalUnreadMessageCount {
    user_data?: string;
}

/**
 * @brief 设置会话事件回调
 * @param callback  callback 会话事件回调，请参考convEventCallback
 * @param user_data  user_data用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 */
interface setConvEventCallback {
    callback: convEventCallback;
    user_data?: string;
}
/**
 * @brief 设置会话未读消息总数变更的回调
 * @param callback  callback：convTotalUnreadMessageCountChangedCallback
 * @param user_data  user_data 用户自定义数据，ImSDK只负责传回给回调函数cb，不做任何处理
 *
 */
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
