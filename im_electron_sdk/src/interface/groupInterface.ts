type Pureobject = {
    key: string;
    value: string;
}

type GroupMemberInfo = {
    identifier: string;
    joinTime?: number;
    memberRole?: string;
    msgFlag?: number;
    msgSeq?: number;
    shutupTime?: number;
    nameCard?: string;
    customInfo?: Array<Pureobject>;
}


interface GroupParams {
    name: string;
    id?: string;
    type?: number;
    memberArray?: Array<GroupMemberInfo>;
    notification?: string;
    introduction?: string;
    faceUrl?: string;
    addOption?: number;
    maxMemberNum?: number;
    customInfo?: Array<Pureobject>
}

interface DeleteGroupParams {
    groupId: string;
    data?: string
}

interface CreateGroupParams {
    params: GroupParams,
    data?: string
}

interface JoinGroupParams {
    groupId: string;
    helloMsg?: string;
    data?: string
}

interface QuitGroupParams extends DeleteGroupParams {}

interface InviteMemberParams {
    params: {
        groupId: string,
        identifierArray: Array<string>,
        userData?: string 
    },
    data?: string
}

interface DeleteMemberParams  extends InviteMemberParams {}

interface GetGroupListParams {
    groupIds: Array<string>,
    data?: string,
}

interface ModifyGroupParams {
    params: {
        groupId: string,
        modifyFlag: number,
        groupName?: string,
        notification?: string,
        introduction?: string,
        faceUrl?: string,
        addOption?: number,
        maxMemberNum?: number,
        visible?: number,
        searchable?: number,
        isShutupAll?: boolean,
        owner?: string,
        customInfo?: Array<Pureobject>
    },
    data?: string
}

interface GetGroupMemberInfoParams {
    params: {
        groupId: string,
        identifierArray?: Array<string>,
        option?: {
            infoFlag?: number,
            roleFlag?: number,
            customArray?: Array<string>
        },
        nextSeq?: number
    },
    data?: string
}

interface ModifyMemberInfoParams {
    params: {
        groupId: string,
        identifier: string,
        modifyFlag?: number,
        msgFlag?: number,
        memberRole?: number,
        shutupTime?: number,
        nameCard?: string,
        customInfo?: Array<Pureobject>
    },
    data?: string,
}

interface GetPendencyListParams {
    params: {
        startTime: number,
        maxLimited: number,
    },
    data?: string,
}

interface ReportParams {
    timeStamp: number,
    data?: string,
}

interface HandlePendencyParams {
    params: {
        isAccept?: boolean,
        handleMsg?: string,
        pendency: {
            groupId: string,
            formIdentifier: string,
            addTime: number,
            toIdentifier: string,
            pendencyType: number,
            handled: number,
            handleResult: number,
            applyInviteMsg: string,
            formUserDefinedData: string,
            approvalMsg: string,
            toUserDefinedData: string,
            authentication: string,
            selfIdentifier: string
        }
    },
    data?: string
}

interface GetOnlineMemberCountParams {
    groupId: string,
    data?: string,
}

export {
    Pureobject,
    GroupMemberInfo,
    GroupParams,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
    QuitGroupParams,
    InviteMemberParams,
    DeleteMemberParams,
    GetGroupListParams,
    ModifyGroupParams,
    GetGroupMemberInfoParams,
    ModifyMemberInfoParams,
    GetPendencyListParams,
    ReportParams,
    HandlePendencyParams,
    GetOnlineMemberCountParams
}