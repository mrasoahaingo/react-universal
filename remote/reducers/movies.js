import { LATEST, LATEST_SUCCESS } from 'constants/actionTypes'

export const getLatest = () => {
  return {
    type: LATEST,
    payload: {
      request:{
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=61a7fe0a2defc2d41f21253258bf6a4e'
      }
    }
  }
}

export default (state = [], { type, data }) => {
  switch (type) {
    case LATEST_SUCCESS:
      return data.results
    default:
      return state
  }
}