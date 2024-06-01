const {getVisits, getVisit, createVisit, deleteVisit, updateVisit} = require('../controllers/visitController');

function handleVisitRequest(req, res) {
    console.log("here22222");
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.url === '/api/visits' && req.method === 'GET') {
        getVisits(req, res);
    } else if(req.url === '/api/visits' && req.method === 'POST') {
        createVisit(req, res);
    } else if(req.url.match(/\/api\/visits\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteVisit(req, res, id);
    }  else if(req.url.match(/\/api\/visits\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateVisit(req, res, id);
    } // api/visit?inmateName=John
    else if(req.url.match(/\/api\/visit\?id=([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('=')[1];
        getVisit(req, res, id);
    }else {
        console.log("handleVisitRequest: Request not handled");
        return false; // Indicate that the request was not handled
    }
    return true; // Indicate that the request was handled
}

module.exports = handleVisitRequest;