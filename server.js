const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = 'mongodb+srv://bowiewan:LgkSqja1YDbMBFqX@cluster0.nx3ojnh.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedToplogy:
true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.get('/', function (req,res){
            res.sendFile(__dirname + '/index.html')
        })

        app.post('/quotes', (req, res) =>{
            console.log(req.body)
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