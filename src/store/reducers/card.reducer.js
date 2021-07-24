import * as Actions from "../actions";

const initialState = {
  users: [],
  loading: false,
};

// post, update, delete eklenecek
const cardReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USERS:
      return { ...state, users: action.payload, loading: false };

    case Actions.GET_USERS_ERROR:
      console.log("Kullanıcıları çekerken hata!");
      return { ...state, users: action.payload };

    case Actions.POST_USER:
      state.users.push(action.payload);
      return { ...state, loading: true };

    case Actions.POST_USER_ERROR:
      console.log("Kullanıcı eklerken hata!");
      return state;

    default:
      return state;
  }
};

export default cardReducer;
