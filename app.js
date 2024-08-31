const express = require('express');

const app = express();


require('dotenv').config();

console.log("Hello URL Shortener!");

app.get('/', (req, res) => {
    res.send("hello hello");
});









const port = process.env.PORT
app.listen(port, (err) =>{
    if (err) console.log("error listening to server")
    console.log(`server running on port ${port}`)
});