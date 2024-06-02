const Visit = require('../models/visitModel');
const nodemailer = require('nodemailer');

const { getVisitData } = require('../utils/utils');
const { authenticateToken } = require('./authenticationController');

async function getVisits(req, res){
    // see if req has a token
    console.log("here1");
    const token = req.headers['authorization'];
    console.log("token1: ", token);
    const req2 = req;
    const res2 = res;
    const isAuthenticated = await authenticateToken(req2, res2);
    let status = 401;
    let content = "unauthorized";
    if (isAuthenticated) {
        status = 200;
        content = await Visit.findAll();
    }
    try{
        res.writeHead(status, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(content))
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

        // get the highest id of database and store it in visitId
        const visits = await Visit.findAll();
        let visitId = 0;
        for (let i = 0; i < visits.length; i++) {
            if (visits[i].id > visitId) {
                visitId = visits[i].id;
            }
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
            html: `
            <main>
            <div style="background-color: #DFF5FF; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #3270b8; text-align: center;">
                <div style="background-color: #378CE7; color: #ffffff; padding: 10px 0;">
                    <h1 style="font-size: 24px;">Detention Admin</h1>
                </div>
                <div style="padding: 20px;">
                    <h2 style="font-size: 20px;">Visit Confirmation</h2>
                    <p>You have a new visit scheduled for ${visitDate} with ${inmateName}.</p>
                    <p>Your visit ID is ${visitId}.</p>
                    <p>You can view info about your visit here: <a href="http://localhost:5501/visit_info.html?id=${visitId}">Visit Info</a></p>
                    <p>Please let us know if you have any questions or need to reschedule.</p>
                    <p>Thank you!</p>
                </div>
            </div>
            </main>`
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