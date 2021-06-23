import { sdkconfig } from "../interface";
import { convCreate, convDelete, getConvList, convSetDrat, convCancelDraft } from "../interface/conversationInterface";
import { jsFuncToFFIFun, nodeStrigToCString } from "../utils/utils";

class ConversationManager {

    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
    TIMConvCreate(param:convCreate) :number{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const callback = jsFuncToFFIFun(param.callback);
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMConvCreate(convId,convType,callback,userData);
    }
    TIMConvDelete(param:convDelete) :number{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const callback = jsFuncToFFIFun(param.callback);
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMConvDelete(convId,convType,callback,userData);
    }
    TIMConvGetConvList(param:getConvList) :number{
        const callback = jsFuncToFFIFun(param.callback);
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMConvGetConvList(callback,userData);
    }
    TIMConvSetDraft(param:convSetDrat) :number{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const draftParam = nodeStrigToCString(JSON.stringify(param.draftParam))
        return this._sdkconfig.Imsdklib.TIMConvSetDraft(convId,convType,draftParam);
    }
    TIMConvCancelDraft(param:convCancelDraft) :number{
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        return this._sdkconfig.Imsdklib.TIMConvCancelDraft(convId,convType);
    }
}
export default ConversationManager;