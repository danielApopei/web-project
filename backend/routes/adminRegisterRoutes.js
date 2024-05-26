const {register, authenticateToken, login, reset_password, change_password} = require('../controllers/authenticationController.js');

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
    } else if(req.url === '/api/reset_password' && req.method === 'POST') {
        console.log("AAASDQ9DU0Q9DQW9EDQW90W90DUA0W9DU9A0AD");
        console.log("received request to reset password", req.body);
        reset_password(req, res)
        return true;
    } else if(req.url === '/api/reset' && req.method === 'POST') {
        console.log("SERVER: received request on route /api/reset");
        change_password(req, res);
        return true;
    }
    else {
        return false; // Indicate that the request was not handled
    }
}

module.exports = handleRegisterRoutes;