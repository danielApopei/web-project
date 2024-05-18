const http = require('http')
const handleProductRequest = require('./routes/productRoutes')
const handleVisitRequest = require('./routes/visitRoutes')
const client = require('./config/database')

//Check the database connection
client.query('SELECT NOW()', (err, res) => {
    if(err){
        console.log(err.stack)
    } else {
        console.log(res.rows[0])
    }
})


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if(!handleProductRequest(req, res) && !handleVisitRequest(req, res)){
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route Not Found'}));
    }   
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
