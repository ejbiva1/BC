/**
 * Created by rdai2 on 2019/4/1.
 */
export class Address {
  constructor(options) {
    this.addressDetail = options.addressDetail;
    this.fileList = options.fileList !== undefined ? options.fileList : [];
    this.idNumber = options.idNumber;
    this.isDefault = options.isDefault == undefined ? 1 : 0;
    this.postCode = options.postCode;
    this.receiver = options.receiver;
    this.receiverPhone = options.receiverPhone;
  }
}
;

// export const address = new Address();
