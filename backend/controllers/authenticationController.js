const {getAdminData} = require('../utils/utils.js')
const client = require('../config/database.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
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

async function login(req, res){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {
        console.log("1");
       
          //trim data from body
          
        console.log("2");
        try{
            const {email, password} = JSON.parse(body)
            console.log(email, password)
        

            const result = await client.query("SELECT * FROM admins WHERE email = $1", [email]);       
            if(result.rows.length === 0){
                res.writeHead(400, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: 'Admin does not exist'}))
            }
            console.log("4");
            const admin = result.rows[0]
            const isMatch = await bcrypt.compare(password, admin.password)
            console.log("5");
            if(isMatch){
                const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'})
                res.writeHead(200, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: 'Login successful', token}))
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: 'Invalid credentials'}))
            }
        } catch(error){
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: error.message}))
        }
    });
}

async function sendResetEmail(email) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let token = crypto.randomBytes(20).toString('hex'); // Generate a random token

    // Save the token in the confirmation_tokens table along with email
    await client.query("INSERT INTO confirmation_tokens (token, email) VALUES ($1, $2)", [token, email]);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
         Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
         ${process.env.CLIENT_URL}/select_new_password.html?token=${token}\n\n
         If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
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

async function reset_password(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {
        const { email } = JSON.parse(body);
        console.log("received email: ", email);

        try {
            const result = await client.query("SELECT * FROM admins WHERE email = $1", [email]);       
            if(result.rows.length === 0){
                res.writeHead(400, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: 'Admin does not exist'}))
            }
            admin = result.rows.length;

            if (!admin) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'User not found' }));
            }

            await sendResetEmail(email);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.writeHead(302, { 'Location': '/admin_login.html' });
            return res.end(JSON.stringify({ message: 'A reset link has been sent to your email address' }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            console.log("error: ", error.message);
            return res.end(JSON.stringify({ error: error.message }));
        }
    });
}

async function change_password(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', async () => {
        // get token from
        const { password, token } = JSON.parse(body);
        console.log("received token: ", token);
        console.log("received password: ", password);

        // check in confirmation_tokens table and get the email associated
        const result = await client.query("SELECT * FROM confirmation_tokens WHERE token = $1", [token]);
        if(result.rows.length === 0){
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({message: 'Token does not exist'}))
        }
        const email = result.rows[0].email;
        console.log("email: ", email);

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the password in the admins table
        await client.query("UPDATE admins SET password = $1 WHERE email = $2", [hashedPassword, email]);

        // delete the token from the confirmation_tokens table
        await client.query("DELETE FROM confirmation_tokens WHERE token = $1", [token]);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Password changed successfully' }));
    });
}


module.exports = {
    register,
    authenticateToken,
    login,
    reset_password,
    change_password
};