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

export default function count(state = 0, { type }) {
  switch (type) {
    case INCREMENT:
      return state + 1

    case DECREMENT:
      return state - 1

    default:
      return state
  }
}
