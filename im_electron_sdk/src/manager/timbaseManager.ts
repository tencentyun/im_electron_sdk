import { loginParam, logoutParam, sdkconfig } from "../interface";
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
    uninitSDK() :number{
        return this._sdkconfig.Imsdklib.TIMUninit();
    }
    getSDKVersion() :Buffer{
        return this._sdkconfig.Imsdklib.TIMGetSDKVersion();
    } 
    getServerTime() :number{
        return this._sdkconfig.Imsdklib.TIMGetServerTime();
    }
    login(login_param:loginParam) :number{
        const loginCallback = jsFuncToFFIFun(login_param.callback);
        const userID = nodeStrigToCString(login_param.userID);
        const userSig = nodeStrigToCString(login_param.userSig);
        const userData = login_param.user_data ? nodeStrigToCString(login_param.user_data): Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMLogin(userID,userSig,loginCallback,userData);
    }
    logout(logout_param :logoutParam) :number{
        const logoutCallback = jsFuncToFFIFun(logout_param.callback);
        const userData = logout_param.user_data ? nodeStrigToCString(logout_param.user_data) : Buffer.from("");
        return this._sdkconfig.Imsdklib.TIMLogout(logoutCallback,userData);
    } 
    getLoginStatus():number{
        this._sdkconfig.Imsdklib.TIMGetLoginStatus()
        return 1;
    }
}
export default TimbaseManager;