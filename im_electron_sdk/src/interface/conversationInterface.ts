import { TIMConvType, TIMElemType } from "../enum";

interface convCreate {
    convId:string,
    convType:TIMConvType,
    userData?:string,
}
interface convDelete extends convCreate {

}
interface getConvList{
    userData?:string,
    
}
interface convSetDrat{
    convId:string,
    convType:TIMConvType,
    draftParam:draftParams,
}
interface draftMessage {
    message_elem_array:Array<messageElem>
}
interface draftParams {
    draft_edit_time:number,
    draft_msg:draftMessage,
    draft_user_define:string,
}
interface messageElem {
    elem_type:TIMElemType,
    text_elem_content:string,
}
interface convCancelDraft {
    convId:string,
    convType:TIMConvType,
}
interface convItem {
    get_conversation_list_param_conv_id:string,
    get_conversation_list_param_conv_type:string
}
interface convGetConvInfo {
    json_get_conv_list_param:Array<convItem>,
    user_data?:string, 
}
interface convPinConversation {
    convId:string,
    convType:TIMConvType,
    isPinged:boolean,
    user_data?:string,
}
interface convGetTotalUnreadMessageCount {
    user_data?:string,
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
    convGetTotalUnreadMessageCount
}