import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Badge from '../components/badge/Badge'

import StatusCard from '../components/status-card/statusCard_add.jsx'
import statusCards from '../assets/JsonData/status-card-add-data.json'
import customerList from '../assets/JsonData/customers-list.json'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
//material ui table 
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    Divider,
    AddIcon,
    Fab,
  } from '@material-ui/core';
  
 //css
 const useStyles = makeStyles((theme) => ({
    table: {
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 1350
    },
    tableHeaderCell: {
        sx: '4',
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.secondary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        display: 'inline-block'
    }
  }));
function Customers () {
   //liste des users 
   const classes = useStyles();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
 
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
 
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
   };
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
               {/* liste des connections */}
        <div className="card card-container">
          <div className="list row">
            <div className="col-md-12 list">
              <h3>Historique des Authentifications</h3> 
          
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell}>Société</TableCell>
                          <TableCell  className={classes.tableHeaderCell}>Adresse locale</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Nom résponsable</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Date de création</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Syndicat</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Observation</TableCell>Ò
                          <TableCell className={classes.tableHeaderCell}>Action</TableCell>
                         
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ListTest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row.name}>
                            <TableCell>
                                <Grid container >
                                   
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>siret: {row.siret}</Typography>
                                        <Typography color="textSecondary" variant="body2">siren: {row.siren}</Typography>
          
                                    </Grid>
                                </Grid>
                              </TableCell>
                              <TableCell>{row.adresse_local}</TableCell>   
                              <TableCell>{row.nom_responsable_soc}</TableCell>   
                              <TableCell>{row.date_creation_soc}</TableCell>   
  
                            <TableCell>{row.syndicat}</TableCell>   
                            <TableCell>{row.observation}</TableCell>                 
                            <TableCell>
                                <Fab color="primary" aria-label="add">
                                <AddIcon />
                                </Fab>{row.nom_responsable_soc}
                            </TableCell>
                             
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                      </TableFooter>
                    </Table>
                  </TableContainer>
            </div>
          </div>
        </div>
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
