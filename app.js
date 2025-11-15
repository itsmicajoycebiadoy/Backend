import express from 'express';
import 'dotenv/config.js';
import studentRoutes from './routers/studentRoutes.js';
import bookRoutes from './routers/bookRoutes.js';
import cors from 'cors'; 

//create express app
const app = express();
console.log(process.env.ORIGIN)
//Enable cors to frontend
let corsOptions = {
    // Ensure ORIGIN is defined correctly in your .env file
    origin: process.env.ORIGIN 
}

///middleware
app.use(express.json());
// 2. Use the imported cors function
app.use(cors(corsOptions)); 

//This is used to log the request on the console
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

try{
    // Ensure process.env.PORT is defined in your .env file
    app.listen(process.env.PORT, () => { 
        console.log(`Listening to port ${process.env.PORT}...`);
    });
}catch(e){
    console.log(e);
}

app.use('/book', bookRoutes);
app.use('/student',studentRoutes);

