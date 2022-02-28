import React,{useEffect,useState} from 'react'
import axios from 'axios';

import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'
console.log(customerList)



function Customers () {
    const[ListTest,SetTest]=useState([]);

    useEffect(() =>{
        axios.get("http://localhost:3001/").then((response)=>{
            SetTest(response.data);
        })
    })
   
    const customerTableHead = [
        '',
        'name',
        'email',
        'phone',
        'total orders',
        'total spend',
        'location'
    ]


    
    
    
    return (
        <div>
            <h2 className="page-header">
                customers
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <tr>
                                <td>siret</td>
                                <td>siren</td>
                                <td>nom client societe</td>
                                <td>ref credit coop</td>
                                <td>activité</td>
                                <td>numero contrat</td>
                                <td>opportunité</td>
                                <td>interlocuteur</td>
                                <td>Actions</td>
                            </tr>
                            
                            {ListTest.map((value,key)=>{
                                return(
                                <tr>
                                    <td>{value.siret}</td>
                                    <td>{value.siren}</td>
                                    <td>{value.nom_client_soc}</td>
                                    <td>{value.ref_credit_coop}</td>
                                    <td>{value.activite_soc}</td>
                                    <td>{value.id_contrat}</td>
                                    <td>{value.opportunité}</td>
                                    <td>{value.id_interlocuteur}</td>
                                    <td></td>
                        

                                </tr>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
