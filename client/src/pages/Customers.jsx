import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Badge from '../components/badge/Badge'
import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'
console.log(customerList)



function Societes () {
    
    const[ListTest,SetTest]=useState([]);
    useEffect(() =>{
        axios.get("http://localhost:8081/").then((response)=>{
            SetTest(response.data);
            
        }) 
    },[]);
    const orderStatus = {
        "adherent": "warning",
        "client": "success",
    }
     
    const customerTableHead = [
        'siret',
        'nom responsable ',
        'reference credit ',
        'numero societes',
        'opportinites',
        'numero de contrat',
        'action',
        'plus'
    ]
    
    const renderHead = (item, index) => <th key={index}>{item}</th>
    
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.siret}</td>
            <td>{item.nom_client_soc}</td>    
            <td>{item.ref_credit_coop}</td>
            <td>{item.num_soc}</td>
            <td><Badge type={orderStatus[item.opportunite]} content={item.opportunite}/></td>
            <td>{item.id_contrat}</td>
           
            <td>action</td>
            <td>plus info</td>

          
        </tr>
    )
    


    
    
    
    return (
        <div>
            <h2 className="page-header">
                customers
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <Table
                                limit='9'
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

export default Societes
