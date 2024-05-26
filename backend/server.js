const http = require('http')
const handleProductRequest = require('./routes/productRoutes')
const handleVisitRequest = require('./routes/visitRoutes')
const handleInmateRequest = require('./routes/inmateRoutes')
const handleRegistrationRequest = require('./routes/adminRegisterRoutes')
const client = require('./config/database')

//Check the database connection
client.query('SELECT NOW()', (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res.rows[0])
    }
})

console.log("checkpoint 1");

//create the tables
client.query('Create table if not exists visits ( id serial primary key, visitorName varchar(255), inmateName varchar(255), visitorEmail varchar(255), visitorPhone varchar(255), visitDate date, visitDuration varchar(255), natureOfVisit varchar(255), relationship varchar(255))' , (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res)
    }
});

console.log("checkpoint 2");

client.query('create table if not exists inmates( id serial primary key, name varchar(255), CNP varchar(255), convictedFor varchar(255), sentence varchar(255), entryDate date, releaseDate date, birthDate date, gender varchar(255) ,goods varchar(255), others varchar(255))', (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res)
    }
});

client.query('create table if not exists admins( id serial primary key, fullName varchar(255), phoneNumber varchar(255), instituteSecretCode varchar(255), email varchar(255), password varchar(255))', (err, res) => {
    if(err){
        console.log(err.stack)
    }
    else{
        console.log(res)
    }
});

// create table for confirmation_token
client.query('create table if not exists confirmation_tokens( id serial primary key, token varchar(255), email varchar(255))', (err, res) => {
    if(err){
        console.log(err.stack)
    }
    else{
        console.log(res)
    }
});
    
console.log("checkpoint 3");

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    console.log("checkpoint 4");

    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        res.writeHead(200); // Respond with 200 OK
        res.end();
        return;
    }

    if(!handleProductRequest(req, res) 
        && !handleVisitRequest(req, res) 
        && !handleInmateRequest(req, res)
        && !handleRegistrationRequest(req, res)){
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route Not Found'}));
        return
    }   
})

const PORT = process.env.PORT || 5000
console.log("checkpoint 5");
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
