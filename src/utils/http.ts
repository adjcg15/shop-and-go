function isClientErrorHTTPCode(code: number) {
    return code >= 400 && code < 500;
}

export {
    isClientErrorHTTPCode
};