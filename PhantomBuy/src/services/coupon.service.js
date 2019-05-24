/**
 * Created by rdai2 on 2019/5/14.
 */
import {baseService} from './base.service';
export class CouponService {

  constructor() {
    //this.url = baseService.baseURL;
  }

  getUserCouponList(data, sessionId) {
    let url = 'phantombuy/userCoupon/list';
    return baseService.Post(url, data, sessionId);
  }
  
}

export const couponService = new CouponService();
