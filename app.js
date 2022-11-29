const express = require('express') // import express framework
const mongoose = require('mongoose')

const app = express(); // initalise express server. 
app.set('view engine', 'ejs'); // initialise ejs as the server view engine.

app.use(express.static('/Users/mac1/Node.JS/Inventory-Management-IMaaS-App/public')); // use static files from public folder (css)


// app.listen(3000); // listen to requests on port 3000 (local host) 


//connect to MongoDB database
const DBURI = 'mongodb+srv://admin:password12345@projectcluster.pdzilih.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DBURI).then(() => {
    console.log('dataBase connected')
    app.listen(3000); // connect to dataBase then listen for requests. 
}).catch((error) => { // catch any errors
    console.log(error)
})




app.get('/', (req, res) => {    
    res.render('index')
})




