import { sdkconfig } from "../interface/inerface";
import path from "path";
import { nodeStrigToCString } from "../utils/utils";
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
        "sdk_config_log_file_path": path.resolve(__dirname,'sdk-log'),
        "sdk_config_config_file_path": path.resolve(__dirname,'sdk-config')
        });
       return this._sdkconfig.Imsdklib.TIMInit(this._sdkconfig.sdkappid,nodeStrigToCString(sdkconfig));
    }
}
export default TimbaseManager;