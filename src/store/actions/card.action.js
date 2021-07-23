import * as Backend from "../../Backend";

export const GET_USERS = "GET_USERS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const POST_USER = "POST_USER";

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

export function postUser(data) {
  return (dispatch) =>
    dispatch({
      type: POST_USER,
      payload: data,
    });
}
