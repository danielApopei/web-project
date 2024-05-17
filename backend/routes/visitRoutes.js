const {getVisits, createVisit, deleteVisit} = require('../controllers/visitController');

function handleVisitRequest(req, res) {
    if(req.url === '/api/visits' && req.method === 'GET') {
        getVisits(req, res)
    } else if(req.url === '/api/visits' && req.method === 'POST') {
        createVisit(req, res)
    } else if(req.url === '/api/visits' && req.method === 'DELETE') {
        deleteVisit(req, res)
    }else {
        return false; // Indicate that the request was not handled
    }
    return true; // Indicate that the request was handled
}

module.exports = handleVisitRequest;