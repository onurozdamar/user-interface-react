import * as Actions from "../actions";

const initialState = {
  users: [],
};

// post, update, delete eklenecek
const cardReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USERS:
      return { ...state, users: action.payload };

    case Actions.GET_USERS_ERROR:
      console.log("Kullanıcıları çekerken hata!");
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default cardReducer;
