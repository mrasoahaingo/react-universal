export default (state = {}, {type, data}) => {
  switch (type) {
    case 'UPDATE_STATE':
      console.log('[BROWSER] reduce app state', Object.assign({}, state, data.app))
      return Object.assign({}, state, data.app)
    default:
      return state
  }
}