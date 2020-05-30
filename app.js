const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]

  };

const jsonData = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/0355ebe69f";

var options = {
  method: "POST",
  auth: "himaja:4a80e9f79a71f388bd9537da2a07d2a8-us18"
};
var request = https.request(url,options,function(response){


              response.on("data",function(data){
                console.log(JSON.parse(data));
              });
              });



request.write(jsonData);
request.end();

console.log(res.statusCode);
if(res.statusCode === 200){
  res.sendFile(__dirname+"/success.html");
} else
{
  res.sendFile(__dirname+"/failure.html");
}







});


app.post("/failure",function(req,res){
  req.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});


//4a80e9f79a71f388bd9537da2a07d2a8-us18
//0355ebe69f
