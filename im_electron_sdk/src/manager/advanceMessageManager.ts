import { sdkconfig } from "../interface/inerface";

class AdvanceMessageManage {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
}
export default AdvanceMessageManage;