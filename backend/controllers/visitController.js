const Visit = require('../models/visitModel');

const { getVisitData } = require('../utils/utils')

async function getVisits(req, res){
    try{
        const visits = await Visit.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(visits))
    } catch(error){
        console.log(error)
    }
}

async function createVisit(req, res){
    try{
        
        //get data from body
        const body = await getVisitData(req)

        //trim data from body
        const { visitorName, inmateName, visitorEmail, visitorPhone, visitDate, visitDuration, natureOfVisit, relationship} = JSON.parse(body)

        const visit = {
            visitorName, 
            inmateName, 
            visitorEmail, 
            visitorPhone, 
            visitDate, 
            visitDuration, 
            natureOfVisit,
            relationship
        }

        const newVisit = await Visit.create(visit)
        res.writeHead(201, {'Content-Type': 'application/json'}) // 201 means something was created
        return res.end(JSON.stringify(newVisit))
        
    } catch(error){
        console.log(error)
    }
}

async function deleteVisit(req, res, id){
    try{
        const visit = await Visit.findById(id)
        if(!visit){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Visit Not Found'}))
        } else{
            await Visit.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Visit ${id} removed`}))
        }
    } catch(error){
        console.log(error)
    }
}

async function updateVisit(req, res, id){
    try{
        const visit = await Visit.findById(id)

        if(!visit){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Visit Not Found'}))
        } else {
            //get data from body
            const body = await getVisitData(req)

            //trim data from body
            const { visitorName, inmateName, visitorEmail, visitorPhone, visitDate, visitDuration, natureOfVisit, relationship} = JSON.parse(body)

            const visitData = {
                visitorName : visitorName || visit.visitorName, 
                inmateName : inmateName || visit.inmateName, 
                visitorEmail : visitorEmail || visit.visitorEmail, 
                visitorPhone : visitorPhone || visit.visitorPhone, 
                visitDate : visitDate || visit.visitDate, 
                visitDuration : visitDuration || visit.visitDuration, 
                natureOfVisit : natureOfVisit || visit.natureOfVisit,
                relationship : relationship || visit.relationship
            }

            const updatedVisit = await Visit.update(id, visitData)
            res.writeHead(200, {'Content-Type': 'application/json'}) // 201 means something was created
            return res.end(JSON.stringify(updatedVisit))
        }
    } catch(error){
        console.log(error)
    }
}



module.exports = {
    getVisits,
    createVisit,
    deleteVisit,
    updateVisit
}