import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const ConversationManager = {
    TIMSetConvEventCallback:()=>{
        return timRenderInstance.setConvEventCallback({
            user_data:"TIMSetConvEventCallback",
            callback:(data)=>{
                console.log(data,'TIMSetConvEventCallback');
            }
        })
    }
}
export default ConversationManager;