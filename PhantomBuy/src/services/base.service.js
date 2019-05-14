/**
 * Created by rdai2 on 2019/5/14.
 */
import fly from "../utils/fly";

export class BaseService {
  //protected BaseUrl:

  constructor() {
    this.BaseUrl = fly.config.baseURL;
  }

  Get(url, data) {
    return new Promise((resolve, reject) => {
      fly.get(this.BaseUrl +url, data).then(res => {
        resolve(res.data);
      }).catch(reject);
    });

  }

  Post(url, data, sessionId) {
    return new Promise((resolve, reject) => {
      fly.config.headers["Cookie"] = "JSESSIONID=" + sessionId;
      fly.post(this.BaseUrl+url, data).then(res => {
        resolve(res.data);
      }).catch(reject);
    });

  }


}

export const baseService = new BaseService();
