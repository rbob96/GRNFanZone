var app  = require('express')();
var http = require('http').Server(app);

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

//Lets start our server
http.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
