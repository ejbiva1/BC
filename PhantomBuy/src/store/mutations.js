/**
 * Created by rdai2 on 2019/4/24.
 */
import * as types from './mutation-types'

const mutations = {
  // [方法名](参数1,参数2...){方法}
  [types.SET_OPEN_ID](state, v) {
    state.openId = v
  },

  [types.SET_SETTING_KEY](state, setting_key){
    state.settingKey = setting_key;
  },

  [types.SET_SESSION_ID](state, session_id){
    state.sessionId = session_id;
    console.log(state.sessionId);
  }
}

export default mutations;
