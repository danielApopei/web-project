const {getInmates, createInmate, deleteInmate, updateInmate} = require('../controllers/inmateController')


function handleInmateRequest(req, res) {
  // Handle request
    if(req.url === '/api/inmates' && req.method === 'GET') {
        getInmates(req, res)
        // res.writeHead(200, {'Content-Type': 'application/json'})
        // res.end(JSON.stringify({message: `Get all inmates`}))
        return true; // Indicate that the request was handled
    } else if(req.url === '/api/inmates' && req.method === 'POST') {
        createInmate(req, res)
        // res.writeHead(200, {'Content-Type': 'application/json'})
        // res.end(JSON.stringify({message: `Create new inmate`}))
        return true; // Indicate that the request was handled
    } else if(req.url.match(/\/api\/inmates\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteInmate(req, res, id)
        // res.writeHead(200, {'Content-Type': 'application/json'})
        // res.end(JSON.stringify({message: `Delete inmate ${id}`}))
        // return true; // Indicate that the request was handled
        return true;
    } else if(req.url.match(/\/api\/inmates\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateInmate(req, res, id)
        // res.writeHead(200, {'Content-Type': 'application/json'})
        // res.end(JSON.stringify({message: `Update inmate ${id}`}))
        return true; // Indicate that the request was handled
    }else {
        return false; // Indicate that the request was not handled
    }
}

module.exports = handleInmateRequest;