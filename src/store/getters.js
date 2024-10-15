const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  
  // 新增
  buttons: state => state.user.buttons,
  menus: state => state.user.menus,
  isFinishedLead: state => state.user.isFinishedLead
}
export default getters
