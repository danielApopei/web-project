const http = require('http')
const handleProductRequest = require('./routes/productRoutes')
const handleVisitRequest = require('./routes/visitRoutes')
const handleInmateRequest = require('./routes/inmateRoutes')
const client = require('./config/database')

//Check the database connection
client.query('SELECT NOW()', (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res.rows[0])
    }
})

//create the tables
client.query('Create table if not exists visits ( id serial primary key, visitorName varchar(255), inmateName varchar(255), visitorEmail varchar(255), visitorPhone varchar(255), visitDate date, visitDuration varchar(255), natureOfVisit varchar(255), relationship varchar(255))' , (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res)
    }
});

client.query('create table if not exists inmates( id serial primary key, name varchar(255), CNP varchar(255), convictedFor varchar(255), sentence varchar(255), entryDate date, releaseDate date, birthDate date, gender varchar(255) ,goods varchar(255), others varchar(255))', (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res)
    }
});
    


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        res.writeHead(200); // Respond with 200 OK
        res.end();
        return;
    }

    if(!handleProductRequest(req, res) && !handleVisitRequest(req, res) && !handleInmateRequest(req, res)){
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route Not Found'}));
        return
    }   
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
