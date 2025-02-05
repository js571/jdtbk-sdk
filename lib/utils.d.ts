declare const md5: (s: string) => string;
declare const YYYYMMDDHHmmss: (iptDate?: Date, options?: {
    dateSep: string;
    timeSep: string;
}) => string;
declare const sign: (params: Record<string, any>, secret: string) => string;
declare const getApiResponseName: (apiName: string) => string;
export { md5, YYYYMMDDHHmmss, sign, getApiResponseName };
