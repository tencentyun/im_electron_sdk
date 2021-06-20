import { sdkconfig } from "../interface/inerface";

class GroupManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
}
export default GroupManager;