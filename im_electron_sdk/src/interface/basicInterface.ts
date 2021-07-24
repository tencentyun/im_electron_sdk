import {
    TIMErrCode,
    TIMGenderType,
    TIMGroupGetInfoFlag,
    TIMInternalOperation,
    TIMLogLevel,
    TIMProfileAddPermission,
    TIMResult,
} from "../enum";
import { libMethods } from "./libMethodInterface";

interface CommonCallbackFun {
    (code: number, desc: string, json_param: string, user_data: string): void;
}

interface initConfig {
    sdkappid: number;
}

interface sdkconfig {
    sdkappid: number;
    consoleTag: string;
    Imsdklib: libMethods;
}
interface commonResponse {
    code: TIMResult | TIMErrCode;
    desc?: string;
    json_param?: string;
    user_data?: string;
}
interface TIMSetNetworkStatusListenerCallback {
    (status: number, code: number, desc: string, user_data: string): void;
}
interface TIMSetKickedOfflineCallback {
    (user_data: string): void;
}
interface TIMSetUserSigExpiredCallback {
    (user_data: string): void;
}
interface TIMSetNetworkStatusListenerCallbackParam {
    callback: TIMSetNetworkStatusListenerCallback;
    userData: string;
}
interface TIMSetKickedOfflineCallbackParam {
    callback: TIMSetKickedOfflineCallback;
    userData: string;
}
interface TIMSetUserSigExpiredCallbackParam {
    callback: TIMSetUserSigExpiredCallback;
    userData: string;
}
interface TIMLogCallbackFun {
    (level: number, log: string, user_data: string): void;
}
interface TIMSetLogCallbackParam {
    callback: TIMLogCallbackFun;
    user_data?: string;
}
interface GroupGetInfoConfig {
    group_get_info_option_info_flag?: TIMGroupGetInfoFlag;
    group_get_info_option_custom_array?: Array<string>;
}
interface GroupMemberInfoOption {
    group_member_get_info_option_info_flag?: number;
    group_member_get_info_option_role_flag?: number;
    group_member_get_info_option_custom_array?: Array<string>;
}
interface UserConfig {
    user_config_is_read_receipt?: boolean;
    user_config_is_sync_report?: boolean;
    user_config_is_ingore_grouptips_unread?: boolean;
    user_config_is_is_disable_storage?: boolean;
    user_config_group_getinfo_option?: GroupGetInfoConfig;
    user_config_group_member_getinfo_option?: GroupMemberInfoOption;
}
interface HttpProxyInfo {
    http_proxy_info_ip?: string;
    http_proxy_info_port?: number;
    http_proxy_info_username?: string;
    http_proxy_info_password?: string;
}
interface Socks5ProxyInfo {
    socks5_proxy_info_ip?: string;
    socks5_proxy_info_port?: number;
    socks5_proxy_info_username?: string;
    socks5_proxy_info_password?: string;
}
interface JSONCongfig {
    set_config_log_level?: TIMLogLevel;
    set_config_callback_log_level?: TIMLogLevel;
    set_config_is_log_output_console?: boolean;
    set_config_user_config?: UserConfig;
    set_config_user_define_data?: string;
    set_config_http_proxy_info?: HttpProxyInfo;
    set_config_socks5_proxy_info?: Socks5ProxyInfo;
    set_config_is_only_local_dns_source?: boolean;
}
interface ServerAddress {
    server_address_ip: string;
    server_address_port: number;
}
interface PrivatizationInfo {
    longconnection_address_array?: Array<ServerAddress>;
    shortconnection_address_array?: Array<ServerAddress>;
    server_public_key: string;
}
interface callExperimentalAPIJsonParam {
    request_internal_operation: TIMInternalOperation;
    request_set_custom_server_info_param: PrivatizationInfo;
}
interface TIMSetConfigParam {
    json_config: JSONCongfig;
    callback: CommonCallbackFun;
    user_data: string;
}
interface callExperimentalAPIParam {
    json_param: callExperimentalAPIJsonParam;
    user_data: string;
}
interface jsonGetUserProfileListParam {
    friendship_getprofilelist_param_identifier_array: Array<string>;
    friendship_getprofilelist_param_force_update: boolean;
}
interface TIMProfileGetUserProfileListParam {
    json_get_user_profile_list_param: jsonGetUserProfileListParam;
    user_data: string;
}
interface UserProfileCustemStringInfo {
    user_profile_custom_string_info_key: string;
    user_profile_custom_string_info_value: string;
}
interface UserProfileItem {
    user_profile_item_nick_name?: string;
    user_profile_item_gender?: TIMGenderType;
    user_profile_item_face_url?: string;
    user_profile_item_self_signature?: string;
    user_profile_item_add_permission?: TIMProfileAddPermission;
    user_profile_item_location?: number;
    user_profile_item_language?: number;
    user_profile_item_birthday?: number;
    user_profile_item_level?: number;
    user_profile_item_role?: number;
    user_profile_item_custom_string_array?: Array<UserProfileCustemStringInfo>;
}
interface TIMProfileModifySelfUserProfileParam {
    json_modify_self_user_profile_param: UserProfileItem;
    user_data: string;
}
interface cache {
    callback: any;
    cb: any;
}
export {
    initConfig,
    sdkconfig,
    CommonCallbackFun,
    commonResponse,
    TIMSetNetworkStatusListenerCallback,
    TIMSetKickedOfflineCallback,
    TIMSetUserSigExpiredCallback,
    TIMSetNetworkStatusListenerCallbackParam,
    TIMSetKickedOfflineCallbackParam,
    TIMSetUserSigExpiredCallbackParam,
    TIMLogCallbackFun,
    TIMSetLogCallbackParam,
    TIMSetConfigParam,
    callExperimentalAPIParam,
    TIMProfileGetUserProfileListParam,
    TIMProfileModifySelfUserProfileParam,
    cache,
};
