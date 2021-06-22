import { getLoginUserIDParam, loginParam, logoutParam, sdkconfig } from "../interface";
import path from "path";
import { jsFuncToFFIFun, nodeStrigToCString } from "../utils/utils";
import { TIMLoginStatus } from "../enum";

class TimbaseManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * sdk初始化
     */
    TIMInit() :number{
        const sdkconfig:string = JSON.stringify({
            "sdk_config_log_file_path": path.resolve(__dirname,'../sdk-log/'),
            "sdk_config_config_file_path": path.resolve(__dirname,'../sdk-config/')
        });
       return this._sdkconfig.Imsdklib.TIMInit(this._sdkconfig.sdkappid,nodeStrigToCString(sdkconfig));
    }
    TIMUninit() :number{
        return this._sdkconfig.Imsdklib.TIMUninit();
    }
    TIMGetSDKVersion() :Buffer{
        return this._sdkconfig.Imsdklib.TIMGetSDKVersion();
    } 
    TIMGetServerTime() :number{
        return this._sdkconfig.Imsdklib.TIMGetServerTime();
    }
    TIMLogin(param:loginParam) :number{
        const callback = jsFuncToFFIFun(param.callback);
        const userID = nodeStrigToCString(param.userID);
        const userSig = nodeStrigToCString(param.userSig);
        const userData = param.userData ? nodeStrigToCString(param.userData): Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMLogin(userID,userSig,callback,userData);
    }
    TIMLogout(param:logoutParam) :number{
        const callback = jsFuncToFFIFun(param.callback);
        const userData = param.userData ? nodeStrigToCString(param.userData) : Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMLogout(callback,userData);
    }
    TIMGetLoginStatus(): TIMLoginStatus{
        return this._sdkconfig.Imsdklib.TIMGetLoginStatus();
    }
    TIMGetLoginUserID(param:getLoginUserIDParam) :number{
        const callback = jsFuncToFFIFun(param.callback);
        const userData = param.userData?nodeStrigToCString(param.userData):Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMGetLoginUserID(callback,userData);
    }
}
export default TimbaseManager;