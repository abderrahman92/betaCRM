
import React, { useState,useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthSociete from "../services/societe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        champ ne doit pas étre vide !
      </div>
    );
  }
};

const vsiret = value => {
  if (isNaN(value)&&(value.length<9)&&(value.length>13)) {
    return (
      <div className="alert alert-danger" role="alert">
        siret invalide :(.
      </div>
    );
  }
};

const vsiren = value => {
 if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid siren.
      </div>
    );
  }
};

const vnom_soc = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
       nom socitété invalide !.
      </div>
    );
  }
};

const vnom_responsable = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        nom responsable invalide !.
      </div>
    ); 
  }
};

const vdate_creation_soc = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        date invalide !
      </div>
    );
  }
};

const vactivité = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        activité invalide !
      </div>
    );
  }
};
const vadresse = value => {
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        adresse invalide !
      </div>
    );
  }
};
const vpays = value =>{
  if ((value.length<4)) {
    return (
      <div className="alert alert-danger" role="alert">
        pays invalide !
      </div>
    );
  }
}

const cville = value => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        ville invalide !
      </div>
    );
  }
};

const vcode_postal = value => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        code postal invalide !
      </div>
    );
  }
};

const vopportunité = value => {
  if (value.length < 4) {
    return (
      <div className="alert alert-danger" role="alert">
         opportunité invalide !
      </div>
    );
  }
};

const vobservation = value => {
  if (value.length < 4) {
    return (
      <div className="alert alert-danger" role="alert">
         opportunité invalide !
      </div>
    );
  }
};

const vtel = value => {
  if (value.length < 4 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
         télephone invalide !
      </div>
    );
  }
};

const vid_role = value => {
  if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        1 or 2.
      </div>
    );
  }
};


const AddTutorial = () => {
  
  const initialSocieteState = {
    siret: "",
    siren: "",
    nom_soc: "",
    nom_responsable_soc: "",
    date_creation_soc: "",
    activite_soc: "",
    adresse_local: "",
    pays: "",
    ville_soc: "",
    code_postal: "",
    opportunité: "",
    observation: "",
    tel: "",
    app_sofitech: "",
    app_cemeca: "",
    soc_sofitech: "",
    soc_cemeca: "",
    id_role: "",
   
    
  };
  const [Societe, setSociete] = useState(initialSocieteState);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const form = useRef();
  const checkBtn = useRef();
  const handleInputChange = event => {
    const { name, value } = event.target;
    setSociete({ ...Societe, [name]: value });
  };

      const saveSociete = (e) => {
        var data = {
          siret: Societe.siret,
          siren: Societe.siren,
          nom_soc: Societe.nom_soc,
          nom_responsable_soc: Societe.nom_responsable_soc,
          activite_soc: Societe.activite_soc,
          adresse_local: Societe.adresse_local,
          pays: Societe.pays,
          ville_soc: Societe.ville_soc,
          code_postal:Societe.code_postal,
          opportunite: Societe.opportunite,
          observation: Societe.observation,
          tel: Societe.tel,
          date_creation_soc: Societe.date_creation_soc,
          id_role: Societe.id_role,
          message: message.message,
          successful:successful.successful,


        };
      
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          AuthSociete.create(data)
            .then(response => {
              setSociete({
                siren:response.data.siren,
                siret: response.data.siret,
                nom_soc: response.data.nom_soc,
                nom_responsable_soc: response.data.nom_responsable_soc,
                activite_soc: response.data.activite_soc,
                adresse_local: response.data.adresse_local,
                pays: response.data.pays,
                ville_soc: response.data.ville_soc,
                code_postal: response.data.code_postal,
                opportunite: response.data.opportunite,
                observation: response.data.observation,
                tel: response.data.tel,
                date: response.data.date,
                id_role: response.data.id_role
              }
              );
              setSubmitted(true);
              setSuccessful(true);
              setMessage(response.data.message)
              console.log(response.data);
            },
            error => {
              const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
            }
            )
            .catch(e => {
              console.log(e);

            });
        }
      };




  return (
    <div className="submit-form">
      
     

         <Form onSubmit={saveSociete} ref={form}>
         {!successful && (
           <div>

              <div className="form-group">
              
                <label htmlFor="title">siret</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.siret}
                  onChange={handleInputChange}
                  validations={[required,vsiret]}
                  name="siret"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">siren</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.siren}
                  onChange={handleInputChange}
                  validations={[required,vsiren]}
                  name="siren"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">nom de la societe</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.nom_soc}
                  onChange={handleInputChange}
                  validations={[required,vnom_soc]}
                  name="nom_soc"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">nom du responsable</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.nom_responsable_soc}
                  onChange={handleInputChange}
                  validations={[required, vnom_responsable]}
                  name="nom_responsable_soc"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">activité de la societe</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.activite_soc}
                  onChange={handleInputChange}
                  validations={[required,vactivité]}
                  name="activite_soc"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">adresse_local</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.adresse_local}
                  onChange={handleInputChange}
                  validations={[required,vadresse]}
                  name="adresse_local"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">pays</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.pays}
                  onChange={handleInputChange}
                  validations={[required,vpays]}
                  name="pays"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">ville_soc</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.ville_soc}
                  onChange={handleInputChange}
                  validations={[required,cville]}
                  name="ville_soc"
                />
              </div>
              <div className="form-group">
                <label htmlFor="text">code_postale</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.code_postal}
                  onChange={handleInputChange}
                  validations={[required,vcode_postal]}
                  name="code_postal"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">opportunité</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.opportunite}
                  onChange={handleInputChange}
                  validations={[required,vopportunité]}
                  name="opportunite"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">observation</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.observation}
                  onChange={handleInputChange}
                  validations={[required,vobservation]}
                  name="observation"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">telephone responsable</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={Societe.tel}
                  onChange={handleInputChange}
                  validations={[required,vtel]}
                  name="tel"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">date_creation_soc</label>
                <Input
                  type="date"
                  className="form-control"
                  id="date_creation_soc"
                  value={Societe.date_creation_soc}
                  onChange={handleInputChange}
                  validations={[required,vdate_creation_soc]}
                  name="date_creation_soc"
                />
              </div>
              <select  validations={[required,vid_role]}  value={Societe.id_role} onChange={handleInputChange} name="id_role" >
                <option>select une valeur</option>
                <option value="1">cemeca</option>
                <option value="2">sofitech</option>
              </select>
              <button  className="btn btn-success">
                Submit
              </button>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>

        </div>

  );
};

export default AddTutorial;
