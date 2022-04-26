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
                
            <td><button type="button" class="btn btn-success"><i class='bx bx-pencil'></i></button></td>
            <td><a href={item.siren}><button  type="button" class="btn btn-light"><i class='bx bx-show'></i></button></a></td>
 
        </tr>
    )
    


    
    
    
    return (
        <div>
            <h2 className="page-header">
                sociétés
            </h2>
            
            <div className="row">
            <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>

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
