import pool from '../config/db.js';


//read
export const getBooks = async () => {
  const [rows] = await pool.query("SELECT * FROM tblbook"); //frm database
  return rows; 
};

//insert
export const insertBook = async (title, genre, status) => {
  const [result] = await pool.query (
    "INSERT INTO tblbook(title, genre, status) VALUES (?,?,?)", 
    [title,genre, status]
  );
  return result.insertId;
}

//update
export const updateBook = async (title, genre, status, bookId) => {
  const [result] = await pool.query (
    "UPDATE tblbook SET title= ?, genre= ?, status= ? WHERE id= ? ",
    [title,genre, status, bookId]
  );
  return result.affectedRows;
}

//delete
export const deleteBook = async (bookId) => {
  const [result] = await pool.query (
    "DELETE FROM tblBook WHERE id= ?", [bookId]
  );
  return result.affectedRows
}
