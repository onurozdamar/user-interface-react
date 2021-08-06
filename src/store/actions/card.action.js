import * as Backend from "../../Backend";

export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const GET_EMPLOYEES_ERROR = "GET_EMPLOYEES_ERROR";
export const POST_EMPLOYEE = "POST_EMPLOYEE";
export const POST_EMPLOYEE_ERROR = "POST_EMPLOYEE_ERROR";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const UPDATE_EMPLOYEE_ERROR = "UPDATE_EMPLOYEE_ERROR";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const DELETE_EMPLOYEE_ERROR = "DELETE_EMPLOYEE_ERROR";
export const GET_EMPLOYEE_BY_ID = "GET_EMPLOYEE_BY_ID";
export const GET_EMPLOYEE_BY_ID_ERROR = "GET_EMPLOYEE_BY_ID_ERROR";
export const SET_LOADING = "SET_LOADING";

export const getEmployees = () => (dispatch) => {
  dispatch(setLoading(true));
  Backend.getEmployees()
    .then((res) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_EMPLOYEES,
        payload: res,
      });
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_EMPLOYEES_ERROR,
        payload: [],
      });
    });
};

export const postEmployee = (employee) => (dispatch) => {
  Backend.postEmployee(employee)
    .then((res) =>
      dispatch({
        type: POST_EMPLOYEE,
        payload: res,
      })
    )
    .catch((e) =>
      dispatch({
        type: POST_EMPLOYEE_ERROR,
        payload: [],
      })
    );
};

export const updateEmployee = (employee) => (dispatch) => {
  Backend.updateEmployee(employee)
    .then((res) =>
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: res,
      })
    )
    .catch((e) =>
      dispatch({
        type: UPDATE_EMPLOYEE_ERROR,
        payload: [],
      })
    );
};

export const deleteEmployee = (id) => (dispatch) => {
  Backend.deleteEmployee(id)
    .then((res) => {
      dispatch(getEmployees());
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: res,
      });
    })
    .catch((e) =>
      dispatch({
        type: DELETE_EMPLOYEE_ERROR,
        payload: [],
      })
    );
};

export const getEmployeeById = (id) => (dispatch) => {
  dispatch(setLoading(true));
  Backend.getEmployeeById(id)
    .then((res) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_EMPLOYEE_BY_ID,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_EMPLOYEE_BY_ID_ERROR,
        payload: {},
      });
    });
};

export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};
