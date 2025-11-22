import express from 'express';
import 'dotenv/config.js';
import studentRoutes from './routers/studentRoutes.js';
import bookRoutes from './routers/bookRoutes.js';
import UserRoutes from './routers/UserRoutes.js';
import cors from 'cors'; 

const app = express();
console.log(process.env.ORIGIN)

let corsOptions = {
    origin: process.env.ORIGIN 
}

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); 

app.use((req, res, next) => {
    console.log(req.path, req.method); 
    next(); 
});

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

app.use('/book', bookRoutes);
app.use('/student', studentRoutes);
app.use('/user', UserRoutes);

try{
    app.listen(process.env.PORT, () => { 
        console.log(`Listening to port ${process.env.PORT}...`);
    });
}catch(e){
    console.log(e);
}

