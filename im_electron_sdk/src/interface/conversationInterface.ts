import { TIMConvType, TIMElemType } from "../enum";
import { CommonCallbackFun } from "./basicInterface";

interface convCreate {
    convId:string,
    convType:TIMConvType,
    callback:CommonCallbackFun,
    userData?:string,
}
interface convDelete extends convCreate {

}
interface getConvList{
    callback:CommonCallbackFun,
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
export {
    convCreate,
    getConvList,
    convDelete,
    convSetDrat,
    draftParams,
    draftMessage,
    messageElem,
    convCancelDraft
}