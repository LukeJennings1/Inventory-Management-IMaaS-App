const express = require('express') // import express framework
const mongoose = require('mongoose')
const InventoryItems = require('/Users/mac1/Node.JS/Inventory-Management-IMaaS-App/models/inventory.js')

const app = express(); // initalise express server. 
app.set('view engine', 'ejs'); // initialise ejs as the server view engine.

app.use(express.static('/Users/mac1/Node.JS/Inventory-Management-IMaaS-App/public')); // use static files from public folder (css)
app.use(express.urlencoded()); // enables the use of the req.body;


// app.listen(3000); // listen to requests on port 3000 (local host) 

//connect to MongoDB database
const DBURI = 'mongodb+srv://admin:password12345@projectcluster.pdzilih.mongodb.net/Inventory?retryWrites=true&w=majority'
mongoose.connect(DBURI).then((result) => {
    console.log('dataBase connected')
    app.listen(3000); // connect to dataBase then listen for requests. 
}).catch((error) => { // catch any errors
    console.log(error)
})

let dataBaseDownload = [];

function dataBaseDownloader() {
    InventoryItems.find().then((result) => { // makees an initial copy of the database. 
    dataBaseDownload = result
}).catch((err) => {console.log(err)})
}
dataBaseDownloader() // makes a new instance of the database when called. 

// app.get('/testAdd', (req, res) => { // this is testing the ability to add an item to the DB. CONFIRMED WORKING 
//     const newItem = new InventoryItems({
//         name: 'ToothPaste',
//         description: 'its toothPaste',
//         category: 'Medical',
//         price: 1.50,
//         numInStock: 64,
//         url: "https://www.colgate.com/en-gb"
//     })
//     newItem.save()
// })

app.post('/addItem', (req, res) => {
    const newItem = new InventoryItems({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                numInStock: req.body.numInStock,
                url: req.body.numInStock,
                delButton: req.body.id
    })

    newItem.save()
    dataBaseDownload.push(newItem)
    res.redirect('/')
});
app.get('/addItem', (req,res) => {
    res.render('addItem')
});
app.post('/index/:id', async (req,res) => {
    console.log(req.params.id)
      
    await InventoryItems.deleteOne({_id: req.params.id}).then(() => {
        InventoryItems.find().then((result) => { // makees an initial copy of the database. 
            console.log(result)
            dataBaseDownload = result
            res.redirect('/')
        })
        })
})

app.get('/', (req, res) => { // home page
    res.render('index', {dataBaseDownload: dataBaseDownload})
})
app.use((req,res) => { // 404 error handler
    res.status(404).render('404')
})


