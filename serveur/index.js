const express = require('express');
const app = express();
const cors = require('cors');

//exporte config database 
const connect = require('./config/config.js')

//export route all pages 
const routers = require('./routes/societes');
app.use(express.json());
app.use(cors());
app.use('/',routers)
const port = process.env.port || 3001


//connection database 
connect.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });





app.listen(port ,()=> console.log(`renning in port ${port}`));



