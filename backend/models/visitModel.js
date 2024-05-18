let visits = require('../data/visits.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils/utils');

function findAll(){
    return new Promise((resolve, reject) => {
        resolve(visits);
    });
}

function findById(id){
    return new Promise((resolve, reject) => {
        const visit = visits.find((v) => v.id === id);
        resolve(visit);
    })
}

function create(visit){
    return new Promise((resolve, reject) => {
        const newVisit = {id: uuidv4(), ...visit};
        visits.push(newVisit);
        writeDataToFile('./data/visits.json', visits);
        resolve(newVisit);
    })
}

function remove(id){
    return new Promise((resolve, reject) => {
        visits = visits.filter((v) => v.id !== id);
        writeDataToFile('./data/visits.json', visits);
        resolve("visit with id ${id} has been removed");
    })
}

function update(id, visit){
    return new Promise((resolve, reject) => {
        const index = visits.findIndex((v) => v.id === id);
        visits[index] = {id, ...visit};
        writeDataToFile('./data/visits.json', visits);
        resolve(visits[index]);
    })
}

module.exports = {
    findAll,
    create,
    remove,
    findById
}
