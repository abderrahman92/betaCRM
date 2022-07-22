import React,{useEffect,useState} from 'react'
import axios from 'axios';
import SvgIcon from '@mui/material/SvgIcon';
import PropTypes from 'prop-types';
import UserService from "../services/user.service";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import'../components/topnav/topnav.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
    const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
      const { icon } = props;
    
      const {
        icon: [width, height, , , svgPathData],
      } = icon;
    
      return (
        <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
          {typeof svgPathData === 'string' ? (
            <path d={svgPathData} />
          ) : (
            /**
             * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
             * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
             * of a duotone icon. 40% is the default opacity.
             *
             * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
             */
            svgPathData.map((d, i) => (
              <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
            ))
          )}
        </SvgIcon>
      );
    });
    
    FontAwesomeSvgIcon.propTypes = {
      icon: PropTypes.any.isRequired,
    };
    

  

function Customers () {



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                          <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
                            <TableHead>
                              <TableRow>
                              
                                  <TableCell>Société</TableCell>
                                  <TableCell align='left' style={{ minWidth:110}}>Adresse postal</TableCell>
                                
                                  <TableCell align='left' style={{ minWidth:80}}>Code naf</TableCell>
                                  <TableCell align='left' style={{ minWidth:50}}>Syndicat</TableCell>
                                  <TableCell  align='left' style={{ minWidth:50}}>Interlocuteur</TableCell>
                                  <TableCell  align='left' style={{ minWidth:50}}>info</TableCell>
                                  <TableCell  align='left' style={{ minWidth:50}}>Action</TableCell>
                      
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {ListTest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                  <TableRow key={row.name}>
                                    <TableCell  align='left' style={{ minWidth:175}}>
                                        <Grid container >
                                            <Grid item lg={10}>
                                              <Typography className={classes.name} color="textSecondary" variant="body2"><i class='bx bxs-bank'></i>:{row.nom_soc}</Typography>
                                              <Typography  variant="body3" >{row.siret}</Typography>
                                              <Typography color="textSecondary" variant="body2">{row.siren}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                      
                                    <TableCell align='left' style={{ minWidth:150}}>
                                        <Grid >
                                          <Typography style={{ minWidth:50}}> {row.adresse_local}</Typography>
                                          <Typography color="textSecondary" variant="body2">{row.code_postal} {row.ville_soc}</Typography>
                                        </Grid>
                                    
                                    </TableCell>   

                                   

                                    <TableCell>{row.activite_soc}</TableCell> 

                                    <TableCell>{row.syndicat}</TableCell>     

                                    <TableCell align='left' style={{ minWidth:50}}>
                                      <Button startIcon={<FontAwesomeIcon icon={faUser} />} href={`/Interlocuteur/${row.siret}`} variant="outlined" size="small"> +
                                      </Button>
                                    </TableCell>  

                                    <TableCell align='left' style={{ minWidth:50}}>     
                                      <IconButton aria-label="Example"  href={`/Societe/${row.siret}`} >
                                        <FontAwesomeSvgIcon icon={faFile} /> 
                                      </IconButton>
                                    </TableCell> 

                                    <TableCell align='left' style={{ minWidth:50}}>
                                      <IconButton aria-label="Example"  href={`/Action/${row.siret}`} >
                                        <FontAwesomeSvgIcon icon={faEllipsisV} />
                                      </IconButton>
                                    </TableCell>
                                    
                                                    
                              </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={ListTest.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>

                    </div>
                  </div>
                </div>
        </div>
    )
}

export default Customers
