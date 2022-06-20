import React,{useEffect,useState} from 'react'
import axios from 'axios';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import'../components/topnav/topnav.css'
//material ui table 
import EditIcon from '@mui/icons-material/Edit';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
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
    const[ListTest,SetTest]=useState([]);
    const [searchAll, setSearchAll] = useState("");
    const user = AuthService.getCurrentUser()
    //SELECT WHERE SEARCH INPUT 
    const onChangeSearchAll = (e) => {
      const searchAll = e.target.value;
      setSearchAll(searchAll);
      const nom =ListTest.filter((val) => {
        if(val.nom_soc.toLowerCase().includes(searchAll.toLowerCase())){
          return val 
        }
      })
      const code_postal =ListTest.filter((val) => {
        if(String(val.code_postal).includes(searchAll)){
          return val 
        }
      })
      const siret =ListTest.filter((val) => {
        if(String(val.siret).includes(searchAll)){
          return val 
        }
      })
      const siren =ListTest.filter((val) => {
        if(String(val.siren).includes(searchAll)){
          return val 
        }
      })

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
    //SELECT ALL SOCIETES (CEMECA/SOFITECH)
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

    //USE_EFFECT 
    useEffect(() =>{
      retrieveTutorials()     
    },[]);
  
    return (
        <div>
               {/* liste des connections */}
                <div className="card card-container">
                  <div className="list row">
                  <h2 className=" col-md-6 page-`header">Liste des Sociétées</h2> 
                     {/* SEARCH INPUT */}
                    <div className="col-md-4 list">
                        <div className="input-group mb-3">
                          <div className="topnav">
                            <div className="topnav__search">
                                <input  type="text"
                                className="form-control"
                                placeholder="Recherche "
                                value={searchAll}
                                onChange={onChangeSearchAll} 
                                />
                                <i className='bx bx-search'></i>
                            </div>
                          </div> 
                        </div>
                    </div>
                     {/* TABLEAU DES SOCIETES */}
                    <div className="col-md-12 list">
                    
                  
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
                                                <Typography color="textSecondary" variant="body2"> {row.nom_soc}</Typography>
                  
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
