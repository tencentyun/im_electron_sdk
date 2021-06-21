import { sdkconfig, libMethods, GroupParams, CreateGroupParams, DeleteGroupParams, JoinGroupParams } from "../interface";
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";

const underLineTransform = (str: string): string => str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
const addPrefix = (prefix: string, key: string): string => `${prefix}${key}`;


const formateParams = (groupParams: GroupParams) =>
    () =>
        Object.entries(groupParams).reduce((acctualResult, [key, value]) => {
            // if(key === 'member') {
            //     value.map(item => )
            // }

            // if(key === 'customInfo') {

            // }
            const formatedKey = addPrefix('create_group_param_group_', underLineTransform(key));
            return {
                ...acctualResult,
                [formatedKey]: value
            }
        }, {});


class GroupManager {
    private _sdkconfig: sdkconfig;
    private _imskdLib: libMethods;

    constructor(config: sdkconfig) {
        this._sdkconfig = config;
        this._imskdLib = config.Imsdklib;
    }

    private stringFormator = (str: string | undefined): Buffer => str ? nodeStrigToCString(str) : Buffer.from("");

    createGroup( createGroupParams: CreateGroupParams) {
        const { params, callback, data } = createGroupParams;
        const formatedParams = formateParams(params)();
        const successCallback = jsFuncToFFIFun(callback);
        const paramsForCString = nodeStrigToCString(JSON.stringify(formatedParams));
        const userData = this.stringFormator(data);

        return this._imskdLib.TIMGroupCreate(paramsForCString, successCallback, userData);
    }

    deleteGroup(deleteParams: DeleteGroupParams): number {
        const { groupId, callback, data} = deleteParams;
        const groupID = nodeStrigToCString(groupId);
        const successCallback = jsFuncToFFIFun(callback);
        const userData = this.stringFormator(data);

        return this._imskdLib.TIMGroupDelete(groupID, successCallback, userData)
    }

    joinGroup(JoinGroupParams: JoinGroupParams): number {
        const { groupId, helloMsg, callback, data} = JoinGroupParams;
        const groupID = nodeStrigToCString(groupId);
        const successCallback = jsFuncToFFIFun(callback);
        const userData = this.stringFormator(data);
        const msg = this.stringFormator(helloMsg);

        return this._imskdLib.TIMGroupJoin(groupID, msg, successCallback, userData)
    }
}
export default GroupManager;