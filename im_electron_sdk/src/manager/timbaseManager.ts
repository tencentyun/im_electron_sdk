import { loginParam, sdkconfig } from "../interface/inerface";
import path from "path";
import { jsFuncToFFIFun, nodeStrigToCString } from "../utils/utils";

class TimbaseManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * sdk初始化
     */
    initSDK() :number{
        const sdkconfig:string = JSON.stringify({
            "sdk_config_log_file_path": path.resolve(__dirname,'../sdk-log/'),
            "sdk_config_config_file_path": path.resolve(__dirname,'../sdk-config/')
        });
       return this._sdkconfig.Imsdklib.TIMInit(this._sdkconfig.sdkappid,nodeStrigToCString(sdkconfig));
    }
    login(login_param:loginParam) :number{
       const loginCallback = jsFuncToFFIFun(login_param.callback);
       const userID = nodeStrigToCString(login_param.userID);
       const userSig = nodeStrigToCString(login_param.userSig);
       const userData = login_param.data ? nodeStrigToCString(login_param.data): Buffer.from("");
       return this._sdkconfig.Imsdklib.TIMLogin(userID,userSig,loginCallback,userData);
    }   
}
export default TimbaseManager;