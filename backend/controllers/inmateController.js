const Inmate = require('../models/inmateModel');
const {authenticateToken} = require('./authenticationController');

const { getInmateData } = require('../utils/utils')

async function getInmates(req, res){
    const token = req.headers['authorization'];
    const isAuthenticated = await authenticateToken(req, res);
    if(!isAuthenticated){
        res.writeHead(401, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({message: 'Unauthorized'}))
    }
    try{
        const inmates = await Inmate.findAll()

        // res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(inmates))
    } catch(error){
        console.log(error)
    }
}

async function createInmate(req, res){
    try{
        
        const token = req.headers['authorization'];
        const isAuthenticated = await authenticateToken(req, res);
        if(!isAuthenticated){
            res.writeHead(401, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'Unauthorized'}))
        }

        //get data from body
        const body = await getInmateData(req)

        //trim data from body
        const { name, CNP, convictedFor, sentence, entryDate, releaseDate, birthDate, gender, goods, others, address} = JSON.parse(body)

        const newInmate = {
            name, 
            CNP, 
            convictedFor, 
            sentence, 
            entryDate, 
            releaseDate, 
            birthDate,
            gender,
            goods,
            others,
            address
        }

        const inmate = await Inmate.create(newInmate)
        res.writeHead(201, {'Content-Type': 'application/json'}) // 201 means something was created
        return res.end(JSON.stringify(inmate))
        
    } catch(error){
        console.log(error)
    }
}

async function deleteInmate(req, res, id){
    try{
        await Inmate.remove(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: `Inmate ${id} removed`}))
    } catch(error){
        console.log(error)
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Inmate Not Found'}))
    }
}

async function updateInmate(req, res, id){
    try{
        const inmate = await Inmate.findById(id)
        if(!inmate){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Inmate Not Found'}))
        } else {
            const body = await getInmateData(req)
            const { name, CNP, convictedFor, sentence, entryDate, releaseDate, goods, others} = JSON.parse(body)
            const updatedInmate = {
                name, 
                CNP, 
                convictedFor, 
                sentence, 
                entryDate, 
                releaseDate, 
                goods,
                others
            }
            const newInmate = await Inmate.update(id, updatedInmate)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(newInmate))
        }
    }
    catch(error){
        console.log(error)
    }
}

module.exports = { getInmates, createInmate, deleteInmate, updateInmate }