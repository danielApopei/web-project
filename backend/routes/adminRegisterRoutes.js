const {register, authenticateToken, login} = require('../controllers/authenticationController.js');

async function handleRegisterRoutes(req, res) {
  // Handle request
  // print route and method for debug
    console.log(req.url, req.method);
    if(req.url === '/api/register' && req.method === 'POST') {
        register(req, res)
        return true; // Indicate that the request was handled
    } else if(req.url === '/api/login' && req.method === 'POST'){
        login(req, res)
        return true;
    } else if(req.url === '/protected' && req.method === 'GET') {
        const isAuthenticated = await authenticateToken(req, res);
        if(isAuthenticated) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'Protected data'}))
        } else {
            return false;
        }
         // Indicate that the request was handled
    }
    else {
        return false; // Indicate that the request was not handled
    }
}

module.exports = handleRegisterRoutes;