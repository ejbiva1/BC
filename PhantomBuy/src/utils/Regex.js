/**
 * Created by rdai2 on 2019/4/1.
 */
class Regex {
  // 验证电话号码


  // 验证收件人姓名


  // 验证校验码
  checkCode(id_number) {
    let regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let weight = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);    //十七位数字本体码权重
    let parity = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');    //mod11,对应校验码字符值
    let code = id_number.substring(17);

    if (regex.test(id_number)) {
      let sum = 0;
      for (let i = 0; i < id_number.length - 1; i++) {
        sum = sum + parseInt(id_number.charAt(i)) * weight[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  }


  // 验证出生日期
  checkDate(id_number) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(id_number)) {
      var year = id_number.substring(0, 4);
      var month = id_number.substring(4, 6);
      var date = id_number.substring(6, 8);
      var date2 = new Date(year + "-" + month + "-" + date);
      if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
        return true;
      }
    }
    return false;
  };

  // 验证省份
  checkProvince(id_number) {
    var pattern = /^[1-9][0-9]/;
    var provs = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门"
    };
    if (pattern.test(id_number)) {
      if (provs[id_number]) {
        return true;
      }
    }
    return false;


  };


  // 验证身份证号
  validateUserIDCard(id_number) {
    if (this.checkCode(id_number)) {
      let date = id_number.substring(6, 14);
      if (this.checkDate(date)) {
        if (this.checkProvince(id_number.substring(0, 2))) {
          return true;
        }
      }
    }

    return false;
  };


  //验证手机号
  validatePhone(phone) {
    var regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!regex.test(phone)) {
      return false;
    }
    return true;
  }


  // 页面只显示 身份证 前4位 + 后4位
  showIdNumber(obj) {
    return (obj).replace(/(\w)/g, function (a, b, c, d) {
      return ((c > 1 && c < 6) || c > (obj.length - 5)) ? '*' : a
    });
    ;
  }


  // 页面显示  手机号
  showPhoneNo(obj) {
    return (obj).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }


}

export const regex = new Regex();
