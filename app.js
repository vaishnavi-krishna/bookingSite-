/*
Assignment :  Making a Booking Site Application using NodeJS and MongoDB 
Developer  :  Vaishnavi Bandlamudi
Mentor     :  Thenarasi Rajendran
Start Date :  28 Feb 2020
Update Date:  02 Mar 2020
*/

//Importing the pacakges.....

const express= require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require('path');

//Creating database and collections

const db = require("./db");
const collection = "credentials";

//Redirection to index.html file

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

//Display the data....

app.get('/getResult',(req,res)=>{
     db.getDB().collection(collection).find({}).toArray((err,documents)=>{
         if(err)
           console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
     });
});

//update the Data...

app.put('/:id',(req,res)=>{
     const userID = req.params.id;
     const userInput = req.body;

     db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(userID)},{$set : {user : userInput.user}},{returnValue : false},(err,result)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.json(result);
        }
     });

});


//Insert the Data...

app.post('/',(req,res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else{
          res.json({result : result,document : result.ops[0]});
      }
    });

});

//Connecting and verification of Database

db.connect((err)=>{
    if(err)
    {
        console.log('Opps!!! unable to connect to database');
        process.exit(1);

    }
    else
    {
        app.listen(8080,()=>{
            console.log('Connected to database, current port number is 8080');
           
        });
    }
})
