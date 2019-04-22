const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  enterpriseType: state => state.type.enterpriseType,
  industryType: state => state.type.industryType,
  positionList: state => state.type.positionList
  // name: state => state.user.name,
  // selfInfo: state => state.user.selfInfo
  // avatar: state => state.user.avatar
}
export default getters
