import axios from "axios";

export function getUsers() {
  return axios
    .get("http://localhost:3000/users", {})
    .then((response) => response.data)
    .catch((error) => console.log("get hatası", error));
}

export function postUser(user) {
  return axios
    .post("http://localhost:3000/users", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("post hatası", error));
}

export function updateUser(user, id) {
  return axios
    .put("http://localhost:3000/users" + (id ? "/" + id : ""), user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("put hatası", error));
}

export function deleteUser(user) {
  return axios
    .delete("http://localhost:3000/users/" + user.id, user)
    .then((response) => response.data)
    .catch((error) => console.log("delete hatası", error));
}
