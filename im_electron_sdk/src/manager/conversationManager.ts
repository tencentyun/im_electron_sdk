import { convCreate, sdkconfig } from "../interface";
import { jsFuncToFFIFun, nodeStrigToCString } from "../utils/utils";

class ConversationManager {

    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
    TIMConvCreate(param:convCreate){
        const convId = nodeStrigToCString(param.convId);
        const convType = param.convType
        const callback = jsFuncToFFIFun(param.callback);
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        this._sdkconfig.Imsdklib.TIMConvCreate(convId,convType,callback,userData);
    }
}
export default ConversationManager;