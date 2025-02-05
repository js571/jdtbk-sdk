import axios from 'axios';

import { YYYYMMDDHHmmss, sign, getApiResponseName } from './utils';
import { stringify } from 'qs';

// 防止主应用修改axios默认配置
const axiosInstance = axios.create({});

class TbkService {
  private appKey: string;
  private secret: string;
  private endpoint: string;
  constructor(
    appKey: string,
    secret: string,
    endpoint = 'https://api.jd.com/routerjson'
  ) {
    this.appKey = appKey;
    this.secret = secret;
    this.endpoint = endpoint;
  }
  async request<T = any>(apiName: string, params: Record<string, any>) {
    const args: any = {
      method: apiName,
      app_key: this.appKey,
      timestamp: YYYYMMDDHHmmss(),
      format: 'json',
      v: '1.0',
      sign_method: 'md5',
      '360buy_param_json': JSON.stringify(params),
    };
    args.sign = sign(args, this.secret);
    const url = `${this.endpoint}?${stringify(args)}`;
    try {
      const res = await axiosInstance({
        method: 'post',
        url: url,
      });
      if (res.status !== 200) {
        const err: any = new Error('NetWork-Error');
        err.name = 'NetWork-Error';
        err.code = 15;
        err.sub_code = '0';
        err.sub_msg = '网络错误';
        return Promise.reject(err);
      }
      if (res.data.error_response) {
        const error = res.data.error_response;
        const errData = {
          code: parseInt(error.code),
          message: error.zh_desc,
        };
        return Promise.reject(errData);
      }
      const respField = res.data[getApiResponseName(apiName)];
      const respData: T = JSON.parse(
        respField.getResult || respField.queryResult || respField.result
      );
      return respData;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
export default TbkService;
