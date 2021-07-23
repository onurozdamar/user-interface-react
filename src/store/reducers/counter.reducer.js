import * as Actions from '../actions';

const initialState = {
  counter: 0,
};

const counterReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case Actions.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

export default counterReducer;
