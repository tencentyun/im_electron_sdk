interface loginParam {
    userID: string;
    userSig: string;
    userData?: string;
}
interface logoutParam {
    userData?: string;
}
interface getLoginUserIDParam {
    userData?: string;
}

export { loginParam, logoutParam, getLoginUserIDParam };
