import * as Actions from "../actions";

const initialState = {
  employees: [],
  loading: false,
  employee: {},
};

const cardReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_EMPLOYEES:
      return { ...state, employees: action.payload };

    case Actions.GET_EMPLOYEES_ERROR:
      console.log("Kullanıcıları çekerken hata!");
      return { ...state, employees: action.payload };

    case Actions.POST_EMPLOYEE:
      state.employees.push(action.payload);
      return { ...state };

    case Actions.POST_EMPLOYEE_ERROR:
      console.log("Kullanıcı eklerken hata!");
      return state;

    case Actions.UPDATE_EMPLOYEE:
      var employee = state.employees.find(
        (emp) => emp.id === action.payload.id
      );
      employee = action.payload;
      return { ...state, employee: employee };

    case Actions.UPDATE_EMPLOYEE_ERROR:
      console.log("Kullanıcı güncellerken hata!");
      return state;

    case Actions.DELETE_EMPLOYEE:
      state.employees.splice(state.employees.indexOf(action.payload));
      return { ...state };

    case Actions.DELETE_EMPLOYEE_ERROR:
      console.log("Kullanıcı silerken hata!");
      return state;

    case Actions.GET_EMPLOYEE_BY_ID:
      return { ...state, employee: action.payload };

    case Actions.GET_EMPLOYEE_BY_ID_ERROR:
      console.log("Kullanıcı id ile çekerken hata!");
      return state;

    case Actions.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default cardReducer;
