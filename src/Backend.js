import axios from "axios";

export function getUsers() {
  return axios
    .get("https://localhost:5001/api/Employee/Get", {})
    .then((response) => response.data)
    .catch((error) => console.log("get hatası", error));
}

export function postUser(user) {
  return axios
    .post("https://localhost:5001/api/Employee/Add", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("post hatası", error));
}

export function updateUser(user) {
  return axios
    .put("https://localhost:5001/api/Employee/Update", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("put hatası", error));
}

export function deleteUser(id) {
  return axios
    .delete("https://localhost:5001/api/Employee/Delete?id=" + id, {})
    .then((response) => response.data)
    .catch((error) => console.log("delete hatası", error));
}

export function getUserById(id) {
  return axios
    .get("https://localhost:5001/api/Employee/GetById?id=" + id, {})
    .then((response) => response.data)
    .catch((error) => console.log("getbyid hatası", error));
}
