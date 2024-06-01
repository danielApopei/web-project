const Visit = require('../models/visitModel');
const nodemailer = require('nodemailer');

const { getVisitData } = require('../utils/utils');
const { authenticateToken } = require('./authenticationController');

async function getVisits(req, res){
    // see if req has a token
    console.log("here1");
    const token = req.headers['authorization'];
    console.log("token1: ", token);
    const isAuthenticated = await authenticateToken(req, res);
    if(!isAuthenticated){
        res.writeHead(401, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({message: 'Unauthorized'}))
    }
    try{
        const visits = await Visit.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(visits))
    } catch(error){
        console.log(error)
    }
}

async function getVisit(req, res, id){
    console.log("in getVisit");
    try{
        const visits = await Visit.findById(id);
        console.log("visits: ", visits);
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
        const { visitorName, inmateName, visitorEmail, visitorPhone, visitDate, visitDuration, natureOfVisit, relationship, complete, starting_time, end_time, transcript} = JSON.parse(body)

        const visit = {
            visitorName, 
            inmateName, 
            visitorEmail, 
            visitorPhone, 
            visitDate, 
            visitDuration, 
            natureOfVisit,
            relationship,
            complete,
            starting_time,
            end_time,
            transcript
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: visitorEmail,
            subject: 'Inmate Visit Confirmation',
            text: `Hello!\n\nYou have a new visit scheduled for ${visitDate} with ${inmateName}.\n\nPlease let us know if you have any questions or need to reschedule.\n\nThank you!`
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


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
    getVisit,
    createVisit,
    deleteVisit,
    updateVisit
}