export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function incrementCounter(data) {
  return dispatch =>
    dispatch({
      type: INCREMENT,
      payload: data,
    });
}

export function decrementCounter(data) {
  return dispatch =>
    dispatch({
      type: DECREMENT,
      payload: data,
    });
}
