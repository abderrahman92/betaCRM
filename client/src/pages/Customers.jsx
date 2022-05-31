import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Badge from '../components/badge/Badge'
import StatusCard from '../components/status-card/statusCard_add.jsx'
import statusCards from '../assets/JsonData/status-card-add-data.json'
import customerList from '../assets/JsonData/customers-list.json'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import Societe from "../services/societe";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

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
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    Divider,
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
    const [searchAll, setSearchAll] = useState("");
    const cemeca = UserService.getCemecaBoard()
    const sofitech = UserService.getSofitechBoard()
    const admin = UserService.getAdminBoard()
    const user = AuthService.getCurrentUser()
    useEffect(() =>{
      retrieveTutorials()
      
  },[]);
  
 
  const onChangeSearchAll = (e) => {
    const searchAll = e.target.value;
    setSearchAll(searchAll);
  };




  const retrieveTutorials = () => {
    if(user){
      //afficher cemca
      UserService.getCemecaBoard().then(
          response => {
              axios.get("http://localhost:8080/cemeca").then((response)=>{
                SetTest(response.data);
              })
          },
  
        );
         //afficher sofitech
      UserService.getSofitechBoard().then(
          response => {
              axios.get("http://localhost:8080/sofitech").then((response)=>{
                SetTest(response.data);
              })
          },
    
  
          
        );
  
  }
  
  };
  const refreshList = () => {
    retrieveTutorials();
  };

   //recherche , 
   const findByall = () => {
    var nb=parseInt(searchAll);
    console.log(typeof(searchAll))

    const nom =ListTest.filter(task=>task.nom_soc===searchAll)
    const code_postal =ListTest.filter(task=>task.code_postal===nb)
    const siret =ListTest.filter(task=>task.siret===nb)
    const siren =ListTest.filter(task=>task.siren===nb)
    if(nom.length !== 0){
      console.log(nom)
      SetTest(nom);
    }
    if(code_postal.length !== 0){
      console.log(true)
      SetTest(code_postal);
    }
    if(siret.length !== 0){
      console.log(true)
      SetTest(siret);
    }
    if(siren.length !== 0){
      console.log(true)
      SetTest(siren);
    }
    
  
   
    
  };
    
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
            <div className="col-md-4 list">
              
            

                  <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Recherche "
                        value={searchAll}
                        onChange={onChangeSearchAll}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={findByall}
                        >
                          Search
                        </button>
                      </div>
                  </div>
            </div>
            </div>
            
               {/* liste des connections */}
        <div className="card card-container">
          <div className="list row">
            <div className="col-md-12 list">
              <h3>Liste des Sociétées</h3> 
              
          
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell}>Société</TableCell>
                          <TableCell  className={classes.tableHeaderCell}>Adresse postal</TableCell>
                          <TableCell className={classes.tableHeaderCell}>nom responnsable</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Code naf</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Syndicat</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Interlocuteur</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Action</TableCell>
                          <TableCell className={classes.tableHeaderCell}>info</TableCell>
                         
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
                                        <Typography color="textSecondary" variant="body2">nom de la societe: {row.nom_soc}</Typography>
          
                                    </Grid>
                                </Grid>
                            </TableCell>
                            
                              <TableCell>
                              <Grid item lg={10}>
                                        <Typography> {row.adresse_local}</Typography>
                                        <Typography color="textSecondary" variant="body1">{row.code_postal} {row.ville}</Typography>
                                        <Typography >{row.ville_soc}</Typography>
          
                              </Grid>
                              </TableCell>   

                              <TableCell>{row.nom_responsable_soc}</TableCell>   
                              <TableCell>{row.activite_soc}</TableCell>   
  
                            <TableCell>{row.syndicat}</TableCell>      
                            <TableCell>
                              
                                <Fab href={`/Interlocuteur/${row.siret}`} color="primary" aria-label="edit">
                                  <EditIcon />
                                </Fab>
                            
                            </TableCell>            
                            <TableCell>
                                <Fab href={`/Action/${row.siret}`} color="primary" aria-label="edit">
                                <EditIcon />
                                </Fab>
                            
                            </TableCell>
                            <TableCell>
                            
                                <Fab href={`/Societe/${row.siret}`} color="primary" aria-label="assignmentOutlinedIcon">
                                <AssignmentOutlinedIcon />
                                </Fab>
                            
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
      
        </div>
    )
}

export default Customers
