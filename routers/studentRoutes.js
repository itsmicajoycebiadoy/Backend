import * as studentController from '../controllers/studentController.js';
import express from 'express'

const studentRoutes = express.Router();

studentRoutes.get('/all', studentController.fetchStudents);
/*bookRoutes.post('/new', bookController.createBook);*/

export default studentRoutes;