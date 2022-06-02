const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = 'mongodb+srv://bowiewan:LgkSqja1YDbMBFqX@cluster0.nx3ojnh.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')   //collection to store items in

        app.set('view engine', 'ejs')  //tells express ejs is the template engine to render html

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))       //tell express to make public folder accessible to public
        app.use(bodyParser.json())

        app.get('/', (req,res) => {
            quotesCollection.find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))   
        })

        app.post('/quotes', (req, res) =>{
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
            .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'yoda' },
                {
                  $set: {
                    name: req.body.name,
                    quote: req.body.quote
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
          })

        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))

// MongoClient.connect(connectionString, {
//     useUnifiedTopology: true
//  }, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
// }) 

// Make sure you place body-parser before your CRUD handlers!
//all the USE GET POS LISTEN was moved into the SERVER space. This was currently in the local environment
// app.use(bodyParser.urlencoded({ extended: true }))

// app.listen(3000, function() {
//     console.log('listening on 3000')
// })

// // All your handlers here...
// app.get('/', function (req,res){
//     res.sendFile(__dirname + '/index.html')
// })

// app.post('/quotes', (req, res) =>{
//     console.log(req.body)
// })