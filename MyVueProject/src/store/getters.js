const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  opened: state => {
    if (state.app.opened === 'false') {
      return false
    } else if (state.app.opened === 'true') {
      return true
    }
  }
}

export default getters
