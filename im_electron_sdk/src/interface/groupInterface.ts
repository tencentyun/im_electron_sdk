import { CommonCallbackFun } from "./basicInterface";

type Pureobject = {
    key: string;
    value: string;
}

type GroupMemberInfo = {
    identifier: string;
    joinTime?: number;
    role?: string;
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
    member?: Array<GroupMemberInfo>;
    notification?: string;
    introduction?: string;
    faceUrl?: string;
    addOption?: number;
    maxMemberNum?: number;
    customInfo?: Array<Pureobject>
}

interface DeleteGroupParams {
    groupId: string;
    callback: CommonCallbackFun,
    data?: string
}

interface CreateGroupParams {
    params: GroupParams,
    callback: CommonCallbackFun,
    data?: string
}

interface JoinGroupParams {
    groupId: string;
    helloMsg?: string;
    callback: CommonCallbackFun,
    data?: string
}

export {
    GroupParams,
    CreateGroupParams,
    DeleteGroupParams,
    JoinGroupParams,
}