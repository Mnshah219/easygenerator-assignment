export const getErrorMessage = (error, defaultMsg = 'Something went wrong') => {
    let errMsg = error.response?.data?.message || error.message;
    if (Array.isArray(errMsg)) errMsg = errMsg[0];
    const genericErrMessage = 'Internal server error';
    if (errMsg && errMsg !== genericErrMessage) return errMsg;
    return defaultMsg;
}