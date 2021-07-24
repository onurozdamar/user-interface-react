import * as Backend from "../../Backend";

export const GET_USERS = "GET_USERS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const POST_USER = "POST_USER";
export const POST_USER_ERROR = "POST_USER_ERROR";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

export const getUsers = () => (dispatch) => {
  Backend.getUsers()
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res,
      })
    )
    .catch((e) =>
      dispatch({
        type: GET_USERS,
        payload: [],
      })
    );
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

export const deleteUser = (user) => (dispatch) => {
  Backend.deleteUser(user)
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
