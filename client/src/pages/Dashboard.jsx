import React,{useEffect,useState} from 'react'

import axios from 'axios';

import AuthService from "../services/auth.service";

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Moment from 'react-moment';




import 'moment/locale/fr';


//table class

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import UserService from "../services/user.service";

import AuthAction from  "../services/Action";


const chartOptions = {
    series: [{
        name: 'nombre action ',
        data: [40,70,20,90,36,80,30,91,60]
    },
    {
        name: 'nombre adherent ajouté ',
        data: [20,40,50,10,46,20,80,71,30]
    }, {
        name: 'nombre contrat signé',
        data: [40, 30, 20, 60, 40, 16, 40, 20, 51]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

console.log(AuthAction.findAll)


const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)


const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)



const Dashboard = () => {


  //afficher nombre d'action




 
    const[ListTest,SetTest]=useState([]);
    const[Cemeca,SetIscemeca]=useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const[Action,SetAction]=useState([]);

    useEffect(()=>{
        const user = AuthService.getCurrentUser();
            if (user){
                //ACTION 
                AuthAction.findAll().then((response) => {
                        SetAction(response.data)
                    })
                .catch((e) => {
                    console.log(e);
                });

                 
                setCurrentUser(user) 
                   //afficher cemca
            UserService.getCemecaBoard().then(
                response => {
                    axios.get("http://localhost:8080/cemeca").then((response)=>{
                        SetTest(response.data);
                        SetIscemeca(true)
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
     },[]) 
     const Action_util =Action.filter(task=>task.id_utili===currentUser.id)
    
//action
const statusCards =[
    {
        "icon": "bx bx-bar-chart-alt",
        "count": Action.length,
        "title": "nombres d'action "
    },
    {
        "icon": "bx bx-bar-chart-alt",
        "count": Action_util.length,
        "title": "action utilisateur"
    }
]

    const latestOrders = {
        header: [
            "siret",
            "code naf",
            "nom responnsable",
            "tel",
            "société"
        ],
        
    }
    const renderOrderBody = (item, index) => (
        <tr key={index}>
            <td>{item.siret}</td>
            <td>{item.activite_soc}</td>
            <td>{item.nom_responsable_soc}</td>
    
            <td>{item.tel}</td>
            {Cemeca? (
                <td>Cemeca</td>
            ) : (
                <td>Sofitech</td>
            )}
           
        </tr>
    ) 
    console.log()
       
    const themeReducer = useSelector(state => state.ThemeReducer.mode)

        return (
            
            <div>
                {currentUser ?(
                    <div>
                        <h2 className="page-header">tableau de bord</h2>
                        <div className="row">
                            <div className="col-6">
                                <div className="row">
                                   
                                    {
                                        statusCards.map((item, index) => (
                                            <div className="col-6" key={index}>
                                                 <a href="Action/32143789900057">
                                                <StatusCard
                                                    icon={item.icon}
                                                    count={item.count}
                                                    title={item.title}
                                                />
                                                 </a>
                                            </div>
                                        ))
                                    }
                                   
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card full-height">
                                    {/* chart */}
                                    <Chart
                                        options={themeReducer === 'theme-mode-dark' ? {
                                            ...chartOptions.options,
                                            theme: { mode: 'dark'}
                                        } : {
                                            ...chartOptions.options,
                                            theme: { mode: 'light'}
                                        }}
                                        series={chartOptions.series}
                                        type='line'
                                        height='100%'
                                    />
                                </div>
                            </div>
                         
                            <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Dernières Sociétés crées</h3>
                                    </div>
                                    <div className="card__body">
                                        
                                      
                                    <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>siret</TableCell>
                                            <TableCell align="right">nom_soc</TableCell>
                                            <TableCell align="right">observation</TableCell>
                                            <TableCell align="right">adresse postal</TableCell>
                                            <TableCell align="right">date ajouté</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {ListTest.map((row) => (
                                            <TableRow
                                            key={row.siret}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {row.siret}
                                            </TableCell>
                                            <TableCell align="right">{row.nom_soc}</TableCell>
                                            <TableCell align="right">{row.observation}</TableCell>
                                            <TableCell align="right">{row.adresse_local}</TableCell>
                                            <TableCell align="right"> <Moment fromNow>{row.createdAt}</Moment></TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                        
                                    </div>
                                    <div className="card__footer">
                                        <Link to='Societes'>view all</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ): (
                    <div  className="sidebar__item">
                        <div  disabled  className={`sidebar__item-inner `}>
                        <i class='bx bxs-user-x' ></i>
                            <span >
                            pas connecter
                            </span>
                        </div>
                        
                    </div>
                )}
            </div>
        )
        }

export default Dashboard
