import { sdkconfig } from "../interface";

class  FriendshipManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
}
export default FriendshipManager;