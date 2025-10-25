import express from 'express';

//create express app
const app = express();

///middleware
app.use(express.json());

const PORT = 3000;

try{
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}...`);
    });
}catch(e){
    console.log(e);
}

app.get('/mica', async (request, response) => {
    response.status(200).json({"message": "Hello I'm Mica!"});
});
