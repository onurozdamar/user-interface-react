import axios from "axios";

export function getEmployees() {
  return axios
    .get("https://localhost:5001/api/Employee/Get", {})
    .then((response) => response.data)
    .catch((error) => console.log("get hatası", error));
}

export function postEmployee(employee) {
  return axios
    .post("https://localhost:5001/api/Employee/Add", employee)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("post hatası", error));
}

export function updateEmployee(employee) {
  return axios
    .put("https://localhost:5001/api/Employee/Update", employee)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("put hatası", error));
}

export function deleteEmployee(id) {
  return axios
    .delete("https://localhost:5001/api/Employee/Delete?id=" + id, {})
    .then((response) => response.data)
    .catch((error) => console.log("delete hatası", error));
}

export function getEmployeeById(id) {
  return axios
    .get("https://localhost:5001/api/Employee/GetById?id=" + id, {})
    .then((response) => response.data)
    .catch((error) => console.log("getbyid hatası", error));
}
