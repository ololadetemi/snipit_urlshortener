import express from 'express';
import mongoose from 'mongoose';
import urlRoutes from './Routes/urlRoutes.js';
import dotenv from 'dotenv';
const app = express();


dotenv.config();

//middlewares
app.use(express.json());
//app.use('/', router);
app.use('/api', urlRoutes);


//Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB'))
.catch(err => console.error('Error connecting to database:', err));

console.log("Hello URL Shortener!");

app.get('/', (req, res) => {
    res.send("hello hello");
});









const port = process.env.PORT
app.listen(port, (err) =>{
    if (err) console.log("error listening to server")
    console.log(`server running on port ${port}`)
});