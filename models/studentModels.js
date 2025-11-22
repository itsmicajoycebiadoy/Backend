import pool from '../config/db.js';

export const getStudents = async () =>{
    const[rows] = await pool.query("SELECT * FROM tblstudents");
    return rows;
}


//insert
export const insertStudent = async (name, srcode, course) => {
  const [result] = await pool.query (
    "INSERT INTO tblstudents(name, srcode, course) VALUES (?,?,?)", 
    [name, srcode, course]
  );
  return result.insertId;
}

//update
export const updateStudent = async (name, srcode, course, studentId) => {
  const [result] = await pool.query (
    "UPDATE tblstudents SET name= ?, srcode= ?, course= ? WHERE id= ? ",
    [name, srcode, course, studentId]
  );
  return result.affectedRows;
}

//delete
export const deleteStudent = async (studentId) => {
  const [result] = await pool.query (
    "DELETE FROM tblstudents WHERE id= ?", [studentId]
  );
  return result.affectedRows
}
