const express = require('express') // import express framework

const app = express(); // initalise express server. 
app.set('view engine', 'ejs'); // initialise ejs as the server view engine. 

app.listen(3000); // listen to requests on port 3000 (local host) 

app.get('/', (req, res) => {
    res.render('index')
})




