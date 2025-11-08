import * as bookModels from '../models/bookModels.js';

export const fetchBooks = async (req, res) =>{
    try{
        const books = await bookModels.getBooks();
        res.status(200).json({success: true, message: books});
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}