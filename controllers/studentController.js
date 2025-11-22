import * as studentModels from '../models/studentModels.js';

export const fetchStudents = async (req, res) => {
    try {
        const students = await studentModels.getStudents();
        res.status(200).json({ success: true, data: students });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const createStudent = async (req, res) => {
    const { name, srcode, course } = req.body;
    try {
        const studentId = await studentModels.insertStudent(name, srcode, course);
        res.status(200).json({ success: true, data: studentId });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const editStudent = async (req, res) => {
    const { name, srcode, course } = req.body;
    const { studentId } = req.params;

    try {
        const updatedId = await studentModels.updateStudent(name, srcode, course, studentId);
        res.status(200).json({ success: true, data: updatedId });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const deletedId = await studentModels.deleteStudent(studentId); 
        res.status(200).json({ success: true, data: deletedId });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
