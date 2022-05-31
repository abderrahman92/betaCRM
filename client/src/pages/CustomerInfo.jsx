import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";



function Customersinfo () {
  const[ListSociete,SetSociete]=useState([]);
  const user = AuthService.getCurrentUser()
  useEffect(() =>{
    retrieveTutorials()
    
},[]);


const retrieveTutorials = () => {
  if(user){
    //afficher cemca
    UserService.getCemecaBoard().then(
        response => {
            axios.get("http://localhost:8080/cemeca").then((response)=>{
              SetSociete(response.data);
            })
        },

      );
       //afficher sofitech
    UserService.getSofitechBoard().then(
        response => {
            axios.get("http://localhost:8080/sofitech").then((response)=>{
              SetSociete(response.data);
            })
        },
  

        
      );

}

};

console.log(ListSociete)
// Get ID from URL
const params = useParams();
var nb=parseInt(params.id);
const actItem =ListSociete.filter(task=>task.siret===nb)
console.log(actItem)

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const card = (
    <React.Fragment>
      {actItem.map((e)=>
     
      <CardContent>
         <Typography variant="h5" component="div">
         <i class='bx bxs-bank danger'></i>: {e.nom_soc}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          siret : {e.siret}
        </Typography>
        <Typography variant="body2">
         siren : {e.siren}
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          date de creation : {e.date_creation_soc}
        </Typography>
        <Typography variant="body2">
         date enregistré : {e.createdAt}
        </Typography>
        <Typography variant="body2">
          description:{e.observation}

        </Typography>
        <Typography variant="body2">
          code naf : {e.activite_soc}

        </Typography>
        <Typography variant="body2">
          nom résponsable : {e.nom_responsable_soc}

        </Typography>

        <Typography variant="body2">
        adresse postal  : {e.adresse_local} {e.ville_soc} {e.code_postal} 
          
         
        </Typography>
        <Typography variant="body2">
        syndicat : {e.syndicat}

        </Typography>
        <Typography variant="body2">
        observation : {e.observation}

        </Typography>
        <Typography variant="body2">
        telephone : {e.tel}

        </Typography>
       
      </CardContent>
       )}
      <CardActions>
        <Button size="small">modification</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default Customersinfo
