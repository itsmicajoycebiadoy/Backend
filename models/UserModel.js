import pool from '../config/db.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (name, email, password) => {
  //step 1: check if empty
  if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
    const error = new TypeError (
        'Name, Email and Password are required.'
    )
    error.statusCode = 400;
    throw error;
  }
   
  if (!validator.isEmail(email)){
    const error = new TypeError ('Invalid email address.')
    error.statusCode = 400;
    throw error;
  }

  if (!validator.isStrongPassword(password)){
    const error = new TypeError ('Password is not strong enough.')
    error.statusCode = 400;
    throw error;
  }
  
  const [user] = await pool.query(
    "Select email FROM usertbl WHERE email = ?", [email]);

    if (user.length === 1) {
        const error = new Error(`The email ${email} is already used.`);
        error.statusCode = 400;
        throw error;
    }  
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const [newUser] = await pool.query ("INSERT INTO usertbl (name, email, password) VALUES (?,?,?)",
        [name, email, hashedPassword]
    );

    return newUser;
}

export const login = async (email, password) => {
    if(email.trim() === '' || password.trim() === ''){
        const error = new Error('Email and Password are required.');
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query(
        "SELECT * FROM usertbl WHERE email = ?", [email]);
    if(user.length === 0){
        const error = new Error(
            `An account with email ${email} does not exist.`)
        error.statusCode = 400;
        throw error;
    }

    if(!bcrypt.compareSync(password, user[0].password)){
        const error = new Error('Incorrect password.');
        error.statusCode = 400;
        throw error;
    }

    const token = jwt.sign(
        {id: user[0].id},
        process.env.SECRET,
        {expiresIn: '1d'});

    return token;
}

export const getUser = async (id) => {
    if(isNaN(parseInt(id))) {
        const error = new Error('Invalid id.');
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query('SELECT * FROM usertbl WHERE id = ?', [id]);
    
    if(user.length === 0){
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
    }
    
    return user[0]; 
}