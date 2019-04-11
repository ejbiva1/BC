<template>
  <div class="my">

    <div class="headerTab"  style="font-size: small;z-index:1001;">
      <div class="animated fadeIn">
        <div class="product_tabs">
          <div class="product_tabsNav">
            <div
              :class="{'selected':tab === 1,'product_tabs_active':true}"
              @click="changTab(1)" style="text-align:center"
            >全部
            </div>
            <div
              :class="{'selected':tab === 2,'product_tabs_active':true}"
              @click="changTab(2)" style="text-align:center"
            >已付款
            </div>
            <div
              :class="{'selected':tab === 3,'product_tabs_active':true}"
              @click="changTab(3)" style="text-align:center"
            >已发货
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="noList" v-bind:style="{display: displayData}">
        尚未存在订单
      </div>
      <div class="date">2019年3月4日</div>
      <div class="dataBlock">
        <div class="brand">Coach</div>
        <div class="itemBlock">
          <div class="row">
            <div class="itemImage"><image src="/static/images/test2.jpg" class="titleImage" mode="widthFix"/></div>
            <div class="itemDetail">
              <div class="itemName paddingButton10">Sutton Hobo手提包</div>
              <div class="row paddingButton10 grayFont">
                <div class="itemColorTitle">颜色：</div>
                <div class="itemColorDetail">Navy</div>
              </div>
              <div class="row paddingButton10 grayFont">
                <div class="itemPriceTitle">价格：</div>
                <div class="itemPriceDetail">980</div>
              </div>
            </div>
          </div>

        </div>
        <div class="payPrice row">
          <div class="totalTitle">支付金额：</div>
          <div class="totalPrice">980</div>
          <div class="totalUnit">元</div>
        </div>
      </div>
    </div>
    <!--
      <wxc-tab
        @click="onClick"
      :default-index="4"
      active-text-color="#108ee9"
      active-line-color="#108ee9"
      component-id="c1"
      :animate="true"
    >
      <wxc-tab-panel  :wx:for="tabs" wx:for-item="tab" :wx:key="tab.content"
                      :tab-index="index" :tabID="tab.tabID" :label="tab.title" component-id="c1" >
      </wxc-tab-panel>
      <wxc-tab-panel :tab-index="index" component-id="c1" label="全部"></wxc-tab-panel>
      <wxc-tab-panel :tab-index="index" component-id="c1" label="已付款"></wxc-tab-panel>
      <wxc-tab-panel :tab-index="index" component-id="c1" label="已发货"></wxc-tab-panel>
    </wxc-tab>
    -->

  </div>
</template>

<script type="text/ecmascript-6">
  import fly from '../../utils/fly'
  var settingKey = ''
  export default {
    props: {
      product: {
        type: Object
      }
    },
    onLoad() {
      this.showList(1)
    },
    data () {
      return {
        tab: 1,
        order_list: [],
        displayData: 'block'
      }
      /*
      tabs: [
        {title: '全部', content: '内容一', tabID: 1},
        {title: '已付款', content: '内容二', tabID: 2},
        {title: '已发货', content: '内容三', tabID: 3}
      ]}
      */
    },
    methods: {
      onClick: function (e) {
        console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`)
      },
      changTab (index) {
        this.tab = index
        console.log('ComponentId:' + index)
        this.showList(this.tab)
        // 修改参数，重新刷新接口，显示不同的列表
      },
      showList (state) {
        /*
        * 这段getSettingKey需要复用
        * */
        const self = this
        wx.getStorage({
          key: 'settingKey',
          success: function (data) {
            console.log(data)
            settingKey = data.data
            if (settingKey === '1'){
              // 已经授权调用所需接口
              /*
              * 修改此处，调用所需使用的接口函数
              * */
              // self.getCartList();
              var sessionId = null
              wx.getStorage({
                key: 'cookieKey',
                success: function (data) {
                  console.log(data)
                  const cookieSession = String(data.data)
                  sessionId = cookieSession.split('=')[1].split(';')[0]
                  fly.config.headers['Cookie'] = 'JSESSIONID=' + sessionId
                  /*
                  * 此处修改需要调用的接口
                  * */
                  let json = {entityDTO: {}}
                  if (state === 2) {
                    // 已付款 代号3
                    json = {entityDTO: {status: 3}}
                  } else if (state === 3) {
                    // 已发货 代号51
                    json = {entityDTO: {status: 51}}
                  }
                  fly.post('phantombuy/orderMain/list', json).then((res) => {
                    if (res.data.code === `888`) {
                      // 跳转授权页
                      console.log(`请先登录:`, res)
                      wx.navigateTo({
                        url: '/pages/login/main'
                      })
                    } else if (res.data.code === `1`) {
                      if (res.data.data.records.length > 0) {
                        this.order_list = res.data.data.records
                      }
                    } else {
                      // Todo: 列表为空 应该要展示一个空的蒙版
                      this.displayData = 'block'
                      console.log(`我的订单数据:`, res)
                    }
                  }).catch(err => {
                    console.log(`api请求出错:`, err)
                  })
                },
                fail: function (err) {
                  console.log(err)
                  wx.navigateTo({
                    url: '/pages/login/main'
                  })
                }
              })
            } else if (settingKey === '0' ) {
              // 未授权，跳转授权页面
              wx.navigateTo({
                url: '/pages/login/main'
              })
            } else {
              self.getSettingKey()
            }
          },
          // 没有获得到SettingKey的时候重复调用本函数
          fail: function (err) {
            self.getSettingKey()
          }
        })
      },

    }
  }
</script>

<style scoped>
  .noList{
    background-color: white;
    height:100%;
    width:100%;
    position:fixed;
    z-index:1000;
    font-color:black;
    padding-top:200rpx;
    text-align: center;
  }
  .my{
    background-color:#F7F7F7;
    position: fixed;
    height:100%;
    width:100%;
  }
  .block{
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .date{
    font-size:small;
    margin-top:20rpx;
    margin-bottom: 20rpx;
    margin-left: 46rpx;
  }
  .dataBlock{
    margin-left:46rpx;
    margin-right: 46rpx;
    background-color: white;
    padding-top:20rpx;
    padding-left:20rpx;
    padding-right:20rpx;
    padding-bottom: 50rpx;
  }
  .brand{
    font-size: small;
    margin-bottom: 18rpx;
  }
  .itemImage {
    width:17%;
  }
  .titleImage{
    width:100%;
  }
  .itemDetail{
    margin-left:18rpx;
    font-size: small;
  }
  .paddingButton10{
    padding-bottom: 10rpx;
  }
  .grayFont{
    color:gray;
  }
  .payPrice{
    float: right;
    font-size: small;
  }
  .product_tabs {
    width: 100%;
  }
  .product_tabs .product_tabsNav {
    padding-left:0.2rem;
    /*height: 0.8rem;*/
    /*width:38%;*/
    line-height: 0.8rem;
    display: flex;
  }
  .product_tabs .product_tabs_active {
    flex: 1;
  }
  .product_tabsNav .selected {
    color: #87caee;
    border-bottom: 1px solid #87caee;
  }
  .tabs_container{
    position: relative;
  }
</style>
