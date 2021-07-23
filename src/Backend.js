import axios from "axios";

export function getUsers() {
  return axios
    .get("http://localhost:3000/users", {})
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export function postUser() {
  return axios
    .post("http://localhost:3000/users", {})
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}
