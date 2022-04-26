import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";

const create = data => {
  return axios.post(API_URL + "ajouter", data);
};
/*
const getAll = () => {
  return http.get("/tutorials");
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};


const update = (id, data) => {
  return  axios.post(API_URL + `ajouter/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};
*/
const AuthSociete = {

  create
};

export default AuthSociete;
