import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";




class AuthAction {


  create(data){
    return axios.post(API_URL + "action", data);
  }
 

  findAll(){
    return axios.get(API_URL + "action");

  };
 

 
}

export default new AuthAction();
