var express = require('express');
var path = require('path');

var fs= require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){res.render('login',{title:"express"})});
// app.get('/pizza',function(req,res){
//   res.render('pizzapage');
// });
// app.post('/pizza',function(req,res){
//   var x= req.body.first;
//   var y= req.body.pass;
//   console.log(x);
//   console.log(y);
// });
// var x={nasme:"ali",age:27};
// var y=JSON.stringify(x);
// fs.writeFileSync("users.json",y);
// var data =fs.readFileSync("users.json");
// var z=JSON.parse(data);
// console.log(z);

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", function(err,client){
  if(err)throw err;
  var db= client.db('MYDB');
  db.collection('firstcollection').insertOne ({id:1,firstName:'ll',lastname:"ff"})
}
  );
  
if(process.env.PORT){
  app.listen(process.env.PORT,function(){console.log('server started')})
}
else {
  app.listen(3000, function(){
    console.log('server started on port 3000')
  })
}