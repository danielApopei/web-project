const {getAdminData} = require('../utils/utils.js')
const client = require('../config/database.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function register(req, res){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {

        //trim data from body
        const {fullName, phoneNumber, instituteSecretCode, email, password} = JSON.parse(body)

        console.log(fullName, phoneNumber, instituteSecretCode, email, password) 



        try{
            console.log(2) 

            const result = await client.query('SELECT * FROM admins WHERE email = $1', [email])
            console.log(3) 

            if(result.rows.length > 0){
                res.writeHead(400, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: 'Admin already exists'}))
            }

            console.log(fullName, phoneNumber, instituteSecretCode, email, password) 

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(fullName, phoneNumber, instituteSecretCode, email, password)
            await client.query('INSERT INTO admins (fullname, phonenumber, institutesecretcode, email, password) VALUES ($1, $2, $3, $4, $5)', [fullName, phoneNumber, instituteSecretCode, email, hashedPassword])
            console.log(fullName, phoneNumber, instituteSecretCode, email, password)
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'Admin created', token}))
        } catch(error){
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'Server Error'}))
        }
    });
    
}


async function authenticateToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) {
      res.writeHead(401);
      return res.end('Unauthorized');
    }
  
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      return true;
    } catch(err) {
      res.writeHead(403);
      res.end('Forbidden');
      return false;
    }
  }


module.exports = {
    register,
    authenticateToken
};