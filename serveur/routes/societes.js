const connect = require('../config/config.js');
const express = require('express');
const route = express.Router();

route.get('/societes',(req,res)=>{
    connect.query('SELECT * FROM `societe`  ',(err,rows)=>{
        if (err) throw err;
        console.log(rows);
        res.json(rows)
 
    })
})

module.exports = route ;
 