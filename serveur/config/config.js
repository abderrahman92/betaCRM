const mysql =require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crm_data'
    
})
module.exports=connection;
