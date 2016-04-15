import { DETAIL, DETAIL_SUCCESS } from 'constants/actionTypes'

export const getDetail = (movieId) => {
  return {
    type: DETAIL,
    payload: {
      request:{
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=61a7fe0a2defc2d41f21253258bf6a4e`
      }
    }
  }
}

export default (state = {}, { type, data }) => {
  switch (type) {
    case DETAIL_SUCCESS:
      return data
    default:
      return state
  }
}