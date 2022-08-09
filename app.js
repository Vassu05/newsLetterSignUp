const express = require("express");
const request = require("request");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
    const fname=req.body.firstName;
    const lname=req.body.lastName;
    const eMail=req.body.eMail;
    const data = {
        members:[
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    const url = "https://us18.api.mailchimp.com/3.0/lists/d512f4e6cf";
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    const options= {
        "method": "POST",
        "auth": "vasanthh:61ae715ed96af9b9c36e13e97ba4fe8a-us18"
    }
    // 61ae715ed96af9b9c36e13e97ba4fe8a-us18
    const request = https.request(url,options,function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("The server is running on port: 3000");
})