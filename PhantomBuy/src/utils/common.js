/**
 * Created by rdai2 on 2019/3/29.
 */
class Common {
  // 添加成功
  showSuccessMsg(msg) {
    return {
      msg: msg,
      icon_type: "yes",
      show_toast: true
    };
  };

  // 选择商品或添加失败
  showErrorMsg(msg) {
    return {
      msg: msg,
      icon_type: "warning",
      show_toast: true
    };
  };


  isEmptyObject(obj) {
    for (var i in obj) { // 如果不为空，则会执行到这一步，返回true
      return true
    }
    return false // 如果为空,返回false
  };
}
;

export const common = new Common();
