// // getter可充当计算属性
// export const currentSong = (state) => {
//     return state.playlist[state.currentIndex] || {}
// }

// 用gettter取数据到组件里,是数据的映射
export default {
  openId: state => state.openId,
  settingKey: state => state.settingKey,
  sessionId: state => state.sessionId
}
