import * as studentModels from '../models/studentModels.js';

export const fetchStudents = async (req, res) =>{
    try{
        const books = await studentModels.getStudents();
        res.status(200).json({success: true, message: books});
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}