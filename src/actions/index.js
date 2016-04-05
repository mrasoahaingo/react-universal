export const INCREMENT = 'INCREMENT'

export const DECREMENT = 'DECREMENT'

export function increment() {
  return {
    type: INCREMENT
  }
}

export function decrement() {
  return {
    type: DECREMENT
  }
}

export function getLatest() {
  return {
    types: ['LOAD', 'LATEST'],
    payload: {
      request:{
        url: '/movie/popular?api_key=61a7fe0a2defc2d41f21253258bf6a4e'
      }
    }
  }
}