

var express = require('express');
var app = express();
var http = require('http').Server(app);

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response


//app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});
/*app.get('/styles/style.css',function(req,res){
  res.sendFile(__dirname + "/styles/style.css");
});*/
app.use(express.static(__dirname + '/'));

//Lets start our server
http.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
