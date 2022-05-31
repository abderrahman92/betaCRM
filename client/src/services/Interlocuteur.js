import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";



class AuthAction {


  create(data){
    return axios.post(API_URL + "interlocuteur", data);
  }
 

  findAll(){
    return axios.post(API_URL + "interlocuteur");

  };
 

 
}

export default new AuthAction();
