/**
 * Created by rdai2 on 2019/3/29.
 */
class Common {
  // 添加成功
  showSuccessMsg(msg) {
    return {
      msg: msg,
      icon_type: "yes"
    };
  };

  // 选择商品或添加失败
  showErrorMsg(msg) {
    return {
      msg: msg,
      icon_type: "warning"
    };
  };
}
;

export const common = new Common();
