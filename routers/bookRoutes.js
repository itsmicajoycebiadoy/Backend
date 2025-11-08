import * as bookController from '../controllers/bookControllers.js';
import express from 'express'

const bookRoutes = express.Router();

bookRoutes.get('/all', bookController.fetchBooks);
/*bookRoutes.post('/new', bookController.createBook);*/

export default bookRoutes;