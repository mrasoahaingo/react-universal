export const DETAIL = 'DETAIL'
export const DETAIL_SUCCESS = 'DETAIL_SUCCESS'

export function getDetail(movieId) {
  return {
    type: DETAIL,
    payload: {
      request:{
        url: `/movie/${movieId}?api_key=61a7fe0a2defc2d41f21253258bf6a4e`
      }
    }
  }
}

export default function detail(state = {}, { type, payload }) {
  switch (type) {
    case DETAIL_SUCCESS:
      return payload.response.data
    default:
      return state
  }
}