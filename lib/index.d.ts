declare class TbkService {
    private appKey;
    private secret;
    private endpoint;
    constructor(appKey: string, secret: string, endpoint?: string);
    request<T = any>(apiName: string, params: Record<string, any>): Promise<T>;
}
export default TbkService;
