//server.js
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const request = require('request')
var mongoose = require('mongoose')

var promise = mongoose.connect('mongodb://localhost/CRUDApp')

      app.use(express.static('./public'))
      app.use(bodyParser.urlencoded({
        extended: true
      }))
      app.use(bodyParser.json())

      let todoSchema = new mongoose.Schema({
        text: String,
        priority: String
      })

      let todoModel = mongoose.model("todo", todoSchema)

      app.get('/', function(request, response) {
        response.sendFile('./public/index.html', {
          root: './public'
        })
      })

      app.get('/todo', function(req, res) {
          todoModel.find(
            {},
            function(err, docs) {
              if (err) {
                console.log(err)
                res.send('oops, something went wrong.')
              } else {
                res.send(docs)
              }
          })
        })

        app.post('/todo', function(request, response) {
          //receive todo text from form
          new todoModel(request.body).save(function(err, data){
            if (err) {
              console.log(err)
              response.send('oops, something went wrong.')
            } else {
              console.log(request.body);
              response.send(data)
            }
          })
        })

        app.post('/todoRemove', function(request, response) {
          //receive todo text from form
          console.log(request.body)
          todoModel.findByIdAndRemove(request.body._id, function(err, todo){
          response.send("deleted item")
          })
        })

        app.get('/hello', function(request, response) {
          response.send("Hello World");
        })

        app.listen(8080, function() {
          console.log('The app is running on 8080');
        })
