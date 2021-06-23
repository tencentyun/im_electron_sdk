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

type GroupSearchParams = {
    keywordList: Array<string>,
    fieldList: Array<number>,
}

type MemberSearchParams = {
    groupidList: Array<string>,
    keywordList: Array<string>,
    fieldList: Array<number>,
}

interface SearchGroupParams {
    searchParams: Array<GroupSearchParams>,
    data?: string
}

interface SearchMemberParams {
    searchParams: Array<MemberSearchParams>;
    data?: string;
}

interface InitGroupAttributeParams {
    groupId: string;
    attributes: Array<Pureobject>;
    data?: string
}

interface DeleteAttributeParams {
    groupId: string;
    attributesKey: Array<string>;
    data?: string
}

interface ErrorResponse {
    code?: number,
    desc?: String,
    json_params?: String,
    user_data?: String
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
    GetOnlineMemberCountParams,
    SearchGroupParams,
    SearchMemberParams,
    InitGroupAttributeParams,
    DeleteAttributeParams,
    ErrorResponse
}