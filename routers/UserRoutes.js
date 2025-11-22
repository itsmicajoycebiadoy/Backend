import * as UserController from '../controllers/UserController.js';
import authHandler from '../middleware/authHandler.js'; 
import express from 'express'

const UserRoutes = express.Router();


UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);

UserRoutes.use(authHandler);   


export default UserRoutes;