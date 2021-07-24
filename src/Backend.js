import axios from "axios";

export function getUsers() {
  return axios
    .get("http://localhost:3000/users", {})
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export function postUser(user) {
  return axios
    .post("http://localhost:3000/users", user)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
