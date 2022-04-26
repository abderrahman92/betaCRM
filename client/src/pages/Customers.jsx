import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Badge from '../components/badge/Badge'
import Table from '../components/table/Table'
import StatusCard from '../components/status-card/statusCard_add.jsx'
import statusCards from '../assets/JsonData/status-card-add-data.json'
import customerList from '../assets/JsonData/customers-list.json'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";


function Customers () {
    

    const[ListTest,SetTest]=useState([]);
    const cemeca = UserService.getCemecaBoard()
    const sofitech = UserService.getSofitechBoard()
    const admin = UserService.getAdminBoard()
    const user = AuthService.getCurrentUser()
    useEffect(() =>{
        if(user){
            //afficher cemca
            UserService.getCemecaBoard().then(
                response => {
                    axios.get("http://localhost:8080/cemeca").then((response)=>{
                        SetTest(response.data);
                    })
                },
          

                
              );
               //afficher cemca
            UserService.getSofitechBoard().then(
                response => {
                    axios.get("http://localhost:8080/sofitech").then((response)=>{
                        SetTest(response.data);
                    })
                },
          

                
              );
              
        }

        
    },[]);
       
  
    
    const orderStatus = {
        "adherent": "warning",
        "client": "success",
    }
    
    const customerTableHead = [
        'siren ',
        'nom societes',
        'nom responsable',
        'telephone',
        'code postal',
        'opportunite',
        'Action', 
        'plus'
    ]
    
    const renderHead = (item, index) => <th key={index}>{item}</th>
    
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.siren}</td>
            <td>{item.nom_soc}</td>    
            <td>{item.nom_responsable_soc}</td>
            <td>{item.tel}</td>
            <td>{item.code_postal}</td>
            <td>{item.opportunite}</td>     
                
            <td><a href={item.siren}><button type="button" class="btn btn-success"><i class='bx bx-pencil'></i></button></a></td>
            <td><a href={item.siren}><button type="button" class="btn btn-light"><i class='bx bx-show'></i></button></a></td>
 
        </tr>
    )
    


    
    
    
    return (
        <div>
            <h2 className="page-header">
                sociétés
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <Table
                                limit='11'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={ListTest}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
