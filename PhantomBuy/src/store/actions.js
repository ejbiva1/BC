import * as types from './mutation-types'
// 进行涉及到多个全局变量的复杂计算

export default {
  setOpenId: ({commit}, {id}) => commit(openId, id),
  setSettingKey: ({commit}, {key}) => commit(settingKey, key),
  setSessionId: ({commit}, {session_id}) => commit(sessionId, session_id),
}

