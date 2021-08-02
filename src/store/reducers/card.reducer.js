import * as Actions from "../actions";

const initialState = {
  users: [],
  loading: false,
  refresh: false,
};

const cardReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USERS:
      return { ...state, users: action.payload, refresh: false };

    case Actions.GET_USERS_ERROR:
      console.log("Kullanıcıları çekerken hata!");
      return { ...state, users: action.payload };

    case Actions.POST_USER:
      state.users.push(action.payload);
      return { ...state, refresh: true };

    case Actions.POST_USER_ERROR:
      console.log("Kullanıcı eklerken hata!");
      return state;

    case Actions.UPDATE_USER:
      var user = state.users.find((user) => user.id === action.payload.id);
      user = action.payload;
      return { ...state, refresh: true };

    case Actions.UPDATE_USER_ERROR:
      console.log("Kullanıcı güncellerken hata!");
      return state;

    case Actions.DELETE_USER:
      state.users.splice(state.users.indexOf(action.payload));
      return { ...state, refresh: true };

    case Actions.DELETE_USER_ERROR:
      console.log("Kullanıcı silerken hata!");
      return state;

    case Actions.GET_USER_BY_ID:
      return action.payload;

    case Actions.GET_USER_BY_ID_ERROR:
      console.log("Kullanıcı id ile çekerken hata!");
      return state;

    case Actions.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default cardReducer;
