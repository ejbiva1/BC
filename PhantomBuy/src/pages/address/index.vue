<template>
  <div class="animated fadeIn">
    <view class="address_list">
      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text class="phone_padding">12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate" @click="editUserAddress">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>

      <wxc-panel :border="has_border">
        <view class="address_home padding">
          <view class="user_phone">
            <text>刘先生</text>
            <text>12345678909</text>
          </view>
          <view class="address">
            <view class="address_detail">上海市浦东新区纳贤路799号上海市浦东新区纳贤路799号</view>
            <view class="operate">编辑</view>
          </view>
        </view>
      </wxc-panel>
    </view>

    <view class="add_address">
      <view class="button add_new_address">新增收货地址</view>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  //地址列表页
  export default {
    name: 'address',
    data() {
      return {
        has_border: true
      }
    },
    onLoad(){
    },
    created() {
    },
    methods: {
      editUserAddress(){
        console.log('editUserAddress');
        wx.navigateTo({
          url: '/pages/editaddress/main'
        });
      }
    }
  }
</script>

<style>
  .animated {
    background-color: #F7F7F7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .address_list {
    width: 100%;
    margin-bottom: 1.4rem;
  }

  .address_home {
    width: 100%;
  }

  .user_phone {
    font-size: 18px;
    font-weight: bold;
    height: 0.4rem;
    line-height: 0.4rem;
    vertical-align: middle;

  }

  .address {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    font-size: 18px;
  }

  .address_detail {
    width: 80%;
    flex-wrap: nowrap;
  }

  .operate {
    width: 20%;
    text-align: center;
    vertical-align: middle;
    color: red;
  }

  .padding {
    padding: 0.2rem 0.1rem 0.1rem 0.25rem;
  }

  .add_address {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    border-top: 2px solid #eee;
  }

  /*添加地址按钮*/
  .add_address .button {
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    /*width: 2.0rem;*/
    width: 100%;
    height: 1rem;
    color: white;
    font-size: 0.3rem;
    border-radius: 0;
    border: 0;
    vertical-align: middle;
  }

  .add_new_address {
    background-color: #EE5757;
  }

  .phone_padding {
    padding-left: 0.25rem;
  }


</style>

