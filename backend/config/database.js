//import nececary packages
const {Client} = require('pg');
const fs = require('fs');

//create a new client and connect to the database
const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'inmate_admin_database',
    port: 5432
});

// const client = new Client({
//     host: 'my-db-instance.cj22i4600phr.eu-north-1.rds.amazonaws.com',
//     user: 'postgres',
//     password: 'password',
//     database:'admin_inmate_info_db',
//     port: 5432
// });

client.connect(err => {
    if(err){
        console.error('connection error', err.stack);
    } else{
        console.log('connected');
    }
});

module.exports = client;


