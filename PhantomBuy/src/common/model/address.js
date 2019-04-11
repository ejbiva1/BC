/**
 * Created by rdai2 on 2019/4/1.
 */
export class Address {
  constructor(options) {
    this.addressDetail = options.addressDetail !== undefined ? options.addressDetail : undefined;
    this.addressId = options.addressId !== undefined ? options.addressId : undefined;
    this.fileList = options.fileList !== undefined ? options.fileList : [];
    this.idNumber = options.idNumber !== undefined ? options.idNumber : undefined;
    this.isDefault = options.isDefault == undefined ? 1 : 0;
    this.postCode = options.postCode !== undefined ? options.postCode : undefined;
    this.receiver = options.receiver !== undefined ? options.receiver : undefined;
    this.receiverPhone = options.receiverPhone;
  }
}
;

// export const address = new Address();
