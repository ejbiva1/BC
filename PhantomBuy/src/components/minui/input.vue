<template>
  <view class="input-wrap">
    <wxc-input type="number"
               src="https://s10.mogucdn.com/mlcdn/c45406/171025_7abllhkc011ka5kici7532af6202g_28x40.png"
               value="mobileNumber"
               placeholder="请输入充值手机号码"
               maxlength="11"
               data-type="mobile"
               bind:input="onInput"
               bind:blur="onBlur">
    </wxc-input>
    <view class="tips">
      <text v-if="mobileTip" class="warn-tip">请输入正确的手机号码</text>
      <view v-if="mobileNumber && mobileNumber.length" class="clear-wrap" data-type="mobile" bindtap="clearInput">
        <icon type="clear" size="14" color="#ccc"/>
      </view>
    </view>
  </view>
  <view class="input-wrap">
    <wxc-input type="number"
               src="https://s10.mogucdn.com/mlcdn/c45406/171024_4dk50g015la22946k786bi8je3j3d_60x60.png"
               value="qqNumber"
               placeholder="请输入充值QQ号码"
               maxlength="11"
               data-type="qq"
               bind:input="onInput"
               bind:blur="onBlur">
    </wxc-input>
    <view class="tips">
      <text v-if="qqTip" class="warn-tip">请输入正确的QQ号码</text>
      <view v-if="qqNumber && qqNumber.length" class="clear-wrap" data-type="qq" bindtap="clearInput">
        <icon type="clear" size="14" color="#ccc"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    config: {
      usingComponents: {
        'wxc-input': '@minui/wxc-input'
      }
    },
    data: {
      mobileNumber: '12655324',
      qqNumber: '01223',
      mobileTip: true,
      qqTip: true
    },
    /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
    methods: {
      onInput(e) {
        let type = e.target.dataset.type;
        let number = e.detail.value;

        this.setData({
          [type + 'Number']: number
        });
        this.validate(number, type);
      },
      onBlur(e) {
        let type = e.target.dataset.type;
        let number = e.detail.value;
        this.validate(number, type);
      },
      clearInput(e) {
        let type = e.currentTarget.dataset.type;
        this.setData({
          [type + 'Number']: "",
          [type + 'Tip']: false
        });
      },
      validate(number, type) {
        if (type === "mobile") {
          this.validateTelephone(number);
        }

        if (type === "qq") {
          this.validateQQ(number);
        }
      },
      validateTelephone(number) {
        let regPhone = /^1(3|4|5|7|8)\d{9}$/;
        let tip = false;
        if (!regPhone.test(number) && number.length > 0) {
          // 输入7位以上开始校验手机号码
          tip = true;
        }
        this.setData({
          mobileTip: tip
        });
      },
      validateQQ(number) {
        let tip = false;
        let regQQ = /^[1-9]\d{4,10}$/;
        if (!regQQ.test(number) && number.length > 0) {
          // 输入4位以上开始qq号码
          tip = true;
        }
        this.setData({
          qqTip: tip
        });
      }
    }
  }
</script>

<style>
  .input-wrap {
    position: relative;
    margin: 0.20rem 0.10rem 0 0.10rem;
  }

  .tips {
    display: flex;
    position: absolute;
    top: 50%;
    right: 0;
    font-size: 0;
    transform: translate(0, -50%);
    -webkit-transform: -webkit-translate(0, -50%);
    z-index: 100;
  }

  .clear-wrap {
    display: flex;
    width: 0.40rem;
    height: 1.04rem;
    align-items: center;
    justify-content: flex-end;
  }

  .warn-tip {
    line-height: 1.04rem;
    font-size: 0.28rem;
    color: #ff5777;
  }
</style>
