import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import urlRoutes from './Routes/urlRoutes.js';
//import indexRouter from './routes/index.js';
import dotenv from 'dotenv';
const app = express();


dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
//app.use('/', indexRouter);
app.use('/api', urlRoutes);


//Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB'))
.catch(err => console.error('Error connecting to database:', err));


console.log("Hello URL Shortener!");
console.log("Base URL:", process.env.BASE_URL);


app.get('/', (req, res) => {
    res.send("hello hello");
});

// Add a 404 error handler for unknown routes
app.use((req, res, next) => {
    console.log(`404 Error: ${req.method} ${req.originalUrl}`);
    res.status(404).send('404 Not Found');
});

// Add a general error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
});










const port = process.env.PORT
app.listen(port, (err) =>{
    if (err) console.log("error listening to server")
    console.log(`server running on port ${port}`)
});