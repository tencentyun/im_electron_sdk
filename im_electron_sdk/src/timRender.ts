import { TIMIPCLISTENR } from "./const/const";
import { loginParam, CreateGroupParams, commonResponse, logoutParam, getLoginUserIDParam, GroupAttributeCallbackParams, InitGroupAttributeParams, DeleteAttributeParams, GroupTipsCallbackParams, TIMSetNetworkStatusListenerCallbackParam, DeleteGroupParams, DeleteMemberParams, GetGroupListParams, GetGroupMemberInfoParams, GetOnlineMemberCountParams, GetPendencyListParams, HandlePendencyParams, InviteMemberParams, JoinGroupParams, ModifyGroupParams, ModifyMemberInfoParams, QuitGroupParams, ReportParams, SearchGroupParams, SearchMemberParams, TIMSetKickedOfflineCallbackParam, TIMSetUserSigExpiredCallbackParam } from "./interface";
import { ipcData, Managers, ITimRender } from "./interface/ipcInterface";
import { ipcRenderer } from "electron";
import { convCancelDraft, convCreate, convDelete, convGetConvInfo, convGetTotalUnreadMessageCount, convPinConversation, convSetDrat, convTotalUnreadMessageCountChangedCallbackParam, getConvList, setConvEventCallback } from "./interface/conversationInterface";

const electron = require('electron')

const getUniKey = (length: number) => Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);

export class TimRender implements ITimRender  {
    static runtime:Map<string,Function> = new Map();
    static isListened = false
    constructor() {
        if(!TimRender.isListened){
            ipcRenderer.on('global-callback-reply',(e:any,res:any)=>{
                const { callbackKey, responseData } = JSON.parse(res);
                console.log(TimRender.runtime,'2233')
                if(TimRender.runtime.has(callbackKey)){
                     //@ts-ignore
                     TimRender.runtime.get(callbackKey)(responseData);
                }
            })
            TimRender.isListened = true
        }
    }
    
    private async call(data:any): Promise<commonResponse> {
        const response = await ipcRenderer.invoke(TIMIPCLISTENR, JSON.stringify(data));
        return JSON.parse(response);
    };
    TIMConvGetTotalUnreadMessageCount(param:convGetTotalUnreadMessageCount) {
        const formatedData = {
            method: 'TIMConvGetTotalUnreadMessageCount',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMConvPinConversation(param:convPinConversation){
        const formatedData = {
            method: 'TIMConvPinConversation',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMConvGetConvInfo(param:convGetConvInfo){
        const formatedData = {
            method: 'TIMConvGetConvInfo',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMConvCancelDraft(param:convCancelDraft){
        const formatedData = {
            method: 'TIMConvCancelDraft',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMConvSetDraft(param:convSetDrat){
        const formatedData = {
            method: 'TIMConvSetDraft',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMConvGetConvList(param:getConvList){
        console.log(param)
        const formatedData = {
            method: 'TIMConvGetConvList',
            manager: Managers.conversationManager,
            param: param
        }
        return this.call(formatedData)
    }
    TIMConvDelete(param:convDelete){
        const formatedData = {
            method: 'TIMConvDelete',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMConvCreate(param:convCreate){
        const formatedData = {
            method: 'TIMConvCreate',
            manager: Managers.conversationManager,
            param:param
        }
        return this.call(formatedData)
    }
    TIMSetConvTotalUnreadMessageCountChangedCallback(param:convTotalUnreadMessageCountChangedCallbackParam){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetConvTotalUnreadMessageCountChangedCallback',
            manager: Managers.conversationManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    setConvEventCallback(param:setConvEventCallback){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetConvEventCallback',
            manager: Managers.conversationManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    TIMSetUserSigExpiredCallback(param:TIMSetUserSigExpiredCallbackParam){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetUserSigExpiredCallback',
            manager: Managers.timBaseManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    TIMSetKickedOfflineCallback(param:TIMSetKickedOfflineCallbackParam){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetKickedOfflineCallback',
            manager: Managers.timBaseManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    setNetworkStatusListenerCallback(param:TIMSetNetworkStatusListenerCallbackParam){
        const callback = `${Date.now()}`;
        TimRender.runtime.set(callback,param.callback);
        //@ts-ignore
        param.callback = callback;
        const formatedData = {
            method: 'TIMSetNetworkStatusListenerCallback',
            manager: Managers.timBaseManager,
            callback: callback,
            param: param
        }
        return this.call(formatedData);
    }
    uninit(){
        const formatedData = {
            method: 'TIMUninit',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData);
    }
    getSDKVersion(){
        const formatedData = {
            method: 'TIMGetSDKVersion',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData)
    }
    getServerTime(){
        const formatedData = {
            method: 'TIMGetServerTime',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData)
    }
    logout(param:logoutParam){
        const formatedData = {
            method: 'TIMLogout',
            manager: Managers.timBaseManager,
            param: param,
        }
        return this.call(formatedData)
    }
    init() {
       return this.call({
           method: 'TIMInit',
           manager: Managers.timBaseManager,
       }); 
    }
    getLoginStatus(){
        const formatedData = {
            method: 'TIMGetLoginStatus',
            manager: Managers.timBaseManager,
        }
        return this.call(formatedData)
    }
    getLoginUserID(param:getLoginUserIDParam){
        const formatedData = {
            method: 'TIMGetLoginUserID',
            manager: Managers.timBaseManager,
            param: param,
        }
        return this.call(formatedData)
    }
    login(data: loginParam) {
        const formatedData = {
            method: 'TIMLogin',
            manager: Managers.timBaseManager,
            param: data,
        }
         return this.call(formatedData);
    };

    createGroup(data: CreateGroupParams) {
        const formatedData: ipcData<CreateGroupParams> = {
            method: 'TIMGroupCreate',
            manager: Managers.groupManager,
            // callback,
            param: data,
        }
        return this.call(formatedData);
    };

    initGroupAttribute(initAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: 'TIMGroupInitGroupAttributes',
            manager: Managers.groupManager,
            param: initAttributesParams
        }
        return this.call(formatedData);
    }

    setGroupAttribute(setAttributesParams: InitGroupAttributeParams) {
        const formatedData = {
            method: 'TIMGroupSetGroupAttributes',
            manager: Managers.groupManager,
            param: setAttributesParams
        }
        return this.call(formatedData);
    }

    deleteGroupAttribute(deleteAttributesParams: DeleteAttributeParams) {
        const formatedData = {
            method: 'TIMGroupDeleteGroupAttributes',
            manager: Managers.groupManager,
            param: deleteAttributesParams
        }
        return this.call(formatedData);
    }

    getGroupAttribute(getAttributeParams: DeleteAttributeParams) {
        const formatedData = {
            method: 'TIMGroupGetGroupAttributes',
            manager: Managers.groupManager,
            param: getAttributeParams
        }
        return this.call(formatedData);
    }

    groupAttributeChangedCallback(data: GroupAttributeCallbackParams) {
        const callback = getUniKey(10);
        console.log(callback);
        const formatedData = {
            method: 'TIMSetGroupAttributeChangedCallback',
            manager: Managers.groupManager,
            callback,
            param: data
        }

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }

    
    groupTipsChangedCallback(data: GroupTipsCallbackParams) {
        const callback = getUniKey(10);
        console.log(callback);
        const formatedData = {
            method: 'TIMSetGroupTipsEventCallback',
            manager: Managers.groupManager,
            callback,
            param: data
        }

        TimRender.runtime.set(callback, data.callback);
        return this.call(formatedData);
    }

    deleteGroup(data: DeleteGroupParams) {
        const formatedData = {
            method: 'TIMGroupDelete',
            manager: Managers.groupManager,
            param: data
        }

        return this.call(formatedData);
    }

    joinGroup(joinGroupParams: JoinGroupParams) {
        const formatedData = {
            method: 'TIMGroupJoin',
            manager: Managers.groupManager,
            param: joinGroupParams
        }

        return this.call(formatedData);
    }

    quitGroup(quitGroupParams: QuitGroupParams) {
        const formatedData = {
            method: 'TIMGroupQuit',
            manager: Managers.groupManager,
            param: quitGroupParams
        }

        return this.call(formatedData);
    }

    inviteMember(inviteMemberParams: InviteMemberParams) {
        const formatedData = {
            method: 'TIMGroupInviteMember',
            manager: Managers.groupManager,
            param: inviteMemberParams
        }

        return this.call(formatedData);
    }

    deleteMember(deleteMemberParams: DeleteMemberParams) {
        const formatedData = {
            method: 'TIMGroupDeleteMember',
            manager: Managers.groupManager,
            param: deleteMemberParams
        }

        return this.call(formatedData);
    }

    getJoinedGroupList(data?: string) {
        const formatedData = {
            method: 'TIMGroupGetJoinedGroupList',
            manager: Managers.groupManager,
            param: data
        }

        return this.call(formatedData);
    }

    getGroupInfoList(getGroupListParams: GetGroupListParams) {
        const formatedData = {
            method: 'TIMGroupGetGroupInfoList',
            manager: Managers.groupManager,
            param: getGroupListParams
        }

        return this.call(formatedData);
    }

    modifyGroupInfo(modifyGroupParams: ModifyGroupParams) {
        const formatedData = {
            method: 'TIMGroupModifyGroupInfo',
            manager: Managers.groupManager,
            param: modifyGroupParams
        }

        return this.call(formatedData);
    }

    getGroupMemberInfoList(getGroupMemberInfoParams: GetGroupMemberInfoParams) {
        const formatedData = {
            method: 'TIMGroupGetMemberInfoList',
            manager: Managers.groupManager,
            param: getGroupMemberInfoParams
        }

        return this.call(formatedData); 
    }

    modifyGroupMemberInfo(modifyMemberInfoParams: ModifyMemberInfoParams) {
        const formatedData = {
            method: 'TIMGroupModifyMemberInfo',
            manager: Managers.groupManager,
            param: modifyMemberInfoParams
        }

        return this.call(formatedData); 
    }

    getGroupPendencyList(getPendencyListParams: GetPendencyListParams) {
        const formatedData = {
            method: 'TIMGroupGetPendencyList',
            manager: Managers.groupManager,
            param: getPendencyListParams
        }

        return this.call(formatedData); 
    }

    groupReportPendencyReaded(reportParams: ReportParams) {
        const formatedData = {
            method: 'TIMGroupReportPendencyReaded',
            manager: Managers.groupManager,
            param: reportParams
        }

        return this.call(formatedData); 
    }

    handleGroupPendency(handlePendencyParams: HandlePendencyParams) {
        const formatedData = {
            method: 'TIMGroupHandlePendency',
            manager: Managers.groupManager,
            param: handlePendencyParams
        }

        return this.call(formatedData); 
    }

    getGroupOnlineMemberCount(params: GetOnlineMemberCountParams) {
        const formatedData = {
            method: 'TIMGroupGetOnlineMemberCount',
            manager: Managers.groupManager,
            param: params
        }

        return this.call(formatedData); 
    }

    searchGroups(searchGroupsParams: SearchGroupParams) {
        const formatedData = {
            method: 'TIMGroupSearchGroups',
            manager: Managers.groupManager,
            param: searchGroupsParams
        }

        return this.call(formatedData); 
    }

    searchGroupMembers(searchMemberParams: SearchMemberParams) {
        const formatedData = {
            method: 'TIMGroupSearchGroupMembers',
            manager: Managers.groupManager,
            param: searchMemberParams
        }

        return this.call(formatedData);
    }
}