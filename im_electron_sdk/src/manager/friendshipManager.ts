import { sdkconfig } from "../interface/inerface";

class  FriendshipManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
}
export default FriendshipManager;