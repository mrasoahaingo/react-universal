export const DETAIL = 'DETAIL'
export const DETAIL_SUCCESS = 'DETAIL_SUCCESS'

export function getDetail(movieId) {
  return {
    type: DETAIL,
    payload: {
      request:{
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=61a7fe0a2defc2d41f21253258bf6a4e`
      }
    }
  }
}

export default function detail(state = {}, { type, data }) {
  switch (type) {
    case DETAIL_SUCCESS:
      return data
    default:
      return state
  }
}