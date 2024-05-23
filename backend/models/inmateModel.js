const client = require('../config/database')


function findAll(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM inmates';
        client.query(query, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
                resolve(res.rows);
            }
        });
    }
    );
}

function findById(id){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM inmates WHERE id = $1';
        const values = [id];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
                resolve(res.rows[0]);
            }
        });
    }
    )
}

function create(inmate){
    return new Promise((resolve, reject) => { 
        const query = 'INSERT INTO inmates ( name, CNP, convictedFor, sentence, entryDate, releaseDate, birthDate, gender, goods, others) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const newInmate = { ...inmate};
        const values = [newInmate.name, newInmate.CNP, newInmate.convictedFor, newInmate.sentence, newInmate.entryDate, newInmate.releaseDate, newInmate.birthDate, newInmate.gender, newInmate.goods, newInmate.others];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
            }
        });
        resolve(inmate);
    }
    )
}

function remove(id){
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM inmates WHERE id = $1';
        const values = [id];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
            }
        });
        resolve("inmate with id ${id} has been removed");
    }
    )
}

function update(id, inmate){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE inmates SET name = $1, CNP = $2, convictedFor = $3, sentence = $4, entryDate = $5, releaseDate = $6, birthDate = $7, gender = $8, goods = $9, others = $10 WHERE id = $9';
        const values = [inmate.name, inmate.CNP, inmate.convictedFor, inmate.sentence, inmate.entryDate, inmate.releaseDate, inmate.birthDate, inmate.gender, inmate.goods, inmate.others, id];
        client.query(query, values, (err, res) => {
            if(err){
                console.log(err.stack)
            } else {
                console.log(res)
            }
        });
        resolve(inmate);
    }
    )
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}