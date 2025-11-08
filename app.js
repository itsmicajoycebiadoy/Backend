import express from 'express';
import 'dotenv/config.js';
import studentRoutes from './routers/studentRoutes.js';

//create express app
const app = express();

///middleware
app.use(express.json());



try{
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
}catch(e){
    console.log(e);
}

app.use('/student',studentRoutes);
