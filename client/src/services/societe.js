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

*/
const removeAll = () => {
  return axios.delete(`/tutorials`);
};
const findByTitle = siret => {
  return axios.get(`/Societes?siret=${siret}`);
};

const AuthSociete = {

  create,
  findByTitle
};

export default AuthSociete;
