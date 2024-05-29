const {getVisits, createVisit, deleteVisit, updateVisit} = require('../controllers/visitController');

function handleVisitRequest(req, res) {
    console.log("here2");
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.url === '/api/visits' && req.method === 'GET') {
        getVisits(req, res)
    } else if(req.url === '/api/visits' && req.method === 'POST') {
        createVisit(req, res)
    } else if(req.url.match(/\/api\/visits\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteVisit(req, res, id)
    }  else if(req.url.match(/\/api\/visits\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateVisit(req, res, id)
    }else {
        return false; // Indicate that the request was not handled
    }
    return true; // Indicate that the request was handled
}

module.exports = handleVisitRequest;