var express = require('express');
var path = require('path');
var session =require('express-session');
let alert= require('alert');
var fs= require('fs');
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret:'ssshhhh',
  saveUninitialized:false,
  resave:false
}));
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

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect("mongodb://127.0.0.1:27017", function(err,client){
//   if(err)throw err;
//   var db= client.db('MYDB');
//   //db.collection('traveller').insertOne ({id:1,firstName:'ll',lastname:"ff"})
//   db.collection ('traveller').find().toArray(function(err,results){
//     console.log(results)
//   });
// }
//   );
  
if(process.env.PORT){
  app.listen(process.env.PORT,function(){console.log('server started')})
}
else {
  app.listen(3000, function(){
    console.log('server started on port 3000')
  })
} 
function login(user,res){
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017", function(err,client){
    if(err)throw err;
    var db= client.db('MYDB');
    
    db.collection ('traveller').find({username:user.username,password:user.password}).toArray(function(err,results){
     
      if(results.length==0){
           alert("USERNAME or PASSWORD is incorrect");
             res.render('login');}
        else
             {res.render('home');
          
          }
          
    });
  }
    );
                

 }app.post('/',function(req,res){
  var name= req.body.username;
 var pass= req.body.password;
req.session.username=name;
var user ={username:name, password:pass};
login(user, res);

});