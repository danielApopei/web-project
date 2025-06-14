const fs = require('fs');

function writeDataToFile(filename, content){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err)=>{
        if(err){
            console.log(err);
        }
    })
}

function getPostData(req){
    return new Promise((resolve, reject) => {
        try{
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                resolve(body);
            })
        } catch(error){
            reject(error);
        }
    })
}

function getInmateData(req){
    return new Promise((resolve, reject) => {
        try{
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                resolve(body);
            })
        } catch(error){
            reject(error);
        }
    })
}

function getVisitData(req){
    return new Promise((resolve, reject) => {
        try{
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                resolve(body);
            })
        } catch(error){
            reject(error);
        }
    })
}

function getAdminData(req){
    return new Promise((resolve, reject) => {
        try{
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            return body;
        } catch(error){
            reject(error);
        }
    })

}


module.exports = {
    writeDataToFile,
    getPostData,
    getVisitData,
    getInmateData,
    getAdminData
}