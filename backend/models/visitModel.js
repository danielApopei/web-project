let visits = require('../data/visits.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils/utils');
const client = require('../config/database')



function findAll(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM visits';
        client.query(query, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
                resolve(res.rows);
            }
        });
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM visits WHERE id = $1';
        const values = [id];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
                resolve(res.rows[0]);
            }
        });
    })
}

function create(visit){
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO visits ( visitorName, inmateName, visitorEmail, visitorPhone, visitDate, visitDuration, natureOfVisit, relationship, complete, starting_time, end_time, transcript) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
        const newVisit = { ...visit};
        // convert starting_date and end_date to timestamp for postgresql
        newVisit.starting_time = new Date(newVisit.starting_time).toISOString();
        newVisit.end_time = new Date(newVisit.end_time).toISOString();
        const values = [newVisit.visitorName, newVisit.inmateName, newVisit.visitorEmail, newVisit.visitorPhone, newVisit.visitDate, newVisit.visitDuration, newVisit.natureOfVisit, newVisit.relationship, newVisit.complete, newVisit.starting_time, newVisit.end_time, newVisit.transcript];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
            }
        });
        resolve(visit);
    })
}

function remove(id){
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM visits WHERE id = $1';
        const values = [id];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
            }
        }
        );
        resolve("visit with id ${id} has been removed");
    })
}

function update(id, visit){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE visits SET visitorName = $1, inmateName = $2, visitorEmail = $3, visitorPhone = $4, visitDate = $5, visitDuration = $6, natureOfVisit = $7, relationship = $8 WHERE id = $9';
        const newVisit = { ...visit};
        const values = [newVisit.visitorName, newVisit.inmateName, newVisit.visitorEmail, newVisit.visitorPhone, newVisit.visitDate, newVisit.visitDuration, newVisit.natureOfVisit, newVisit.relationship, id];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
            }
        });
        resolve({id, ...visit})
    })
}

module.exports = {
    findAll,
    create,
    remove,
    findById,
    update
}
