import * as Backend from "../../Backend";

export const GET_USERS = "GET_USERS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const POST_USER = "POST_USER";
export const POST_USER_ERROR = "POST_USER_ERROR";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_BY_ID_ERROR = "GET_USER_BY_ID_ERROR";
export const SET_LOADING = "SET_LOADING";

export const getUsers = () => (dispatch) => {
  dispatch(setLoading(true));
  Backend.getUsers()
    .then((res) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_USERS,
        payload: res,
      });
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_USERS_ERROR,
        payload: [],
      });
    });
};

export const postUser = (user) => (dispatch) => {
  Backend.postUser(user)
    .then((res) =>
      dispatch({
        type: POST_USER,
        payload: res,
      })
    )
    .catch((e) =>
      dispatch({
        type: POST_USER_ERROR,
        payload: [],
      })
    );
};

export const updateUser = (user) => (dispatch) => {
  Backend.updateUser(user)
    .then((res) =>
      dispatch({
        type: UPDATE_USER,
        payload: res,
      })
    )
    .catch((e) =>
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: [],
      })
    );
};

export const deleteUser = (id) => (dispatch) => {
  Backend.deleteUser(id)
    .then((res) =>
      dispatch({
        type: DELETE_USER,
        payload: res,
      })
    )
    .catch((e) =>
      dispatch({
        type: DELETE_USER_ERROR,
        payload: [],
      })
    );
};

export const getUserById = (id) => (dispatch) => {
  dispatch(setLoading(true));
  Backend.getUserById(id)
    .then((res) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_USER_BY_ID,
        payload: res,
      });
    })
    .catch((e) => {
      dispatch(setLoading(false));
      dispatch({
        type: GET_USER_BY_ID_ERROR,
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
