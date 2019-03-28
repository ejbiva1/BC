/**
 * Created by rdai2 on 2019/3/21.
 */
export class pageDTO {
  constructor() {
    this.pageNo = 1;
    this.pageSize = 10;
  }

  nextPage(entity) {
    return {
      pageNo: entity.pageNo + 1,
      pageSize: entity.pageSize
    };
  }

  previousPage(entity) {
    return {
      pageNo: entity.pageNo - 1 >= 1 ? entity.pageNo - 1 : 1,
      pageSize: entity.pageSize
    };
  }

}
;
