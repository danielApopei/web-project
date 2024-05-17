const http = require('http')
const handleProductRequest = require('./routes/productRoutes')
const handleVisitRequest = require('./routes/visitRoutes')


const server = http.createServer((req, res) => {
    if(!handleProductRequest(req, res) && !handleVisitRequest(req, res)){
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route Not Found'}));
    }   
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));