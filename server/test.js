 const { MongoClient, ObjectId: objectId } = require("mongodb");
const express = require("express");
const app = express();
const busboy = require("busboy"); 
const cors = require("cors");

app.use(cors());
    
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);
let dbClient;
  
mongoClient.connect((err, client) => {
   if(err) return console.log(err);
   dbClient = client;
   app.locals.collection = client.db("usersdb").collection("items");
   app.listen(3000, function(){
       console.log("Сервер ожидает подключения...");
   });
});

app.get("/", (req, res) => {
   const collection = app.locals.collection;
   collection.find({}).toArray((err, items) => {
       if(err) console.log(err);
       res.send(items);
   })
});

app.get("/items/:id", (req, res) => {
   const id = new objectId(req.params.id);
   const collection = req.app.locals.collection;
   collection.find({_id: id}).toArray((err, items) => {
       if(err) console.log(err);
       res.send(items[0]);
   })
});

app.post('/add', function (req, res) {
   const collection = app.locals.collection;
   const item = {};
   const bb = busboy({ headers: req.headers });
   bb.on('field', (name, val) => {
       item[name] = val;
   });
   bb.on('close', () => {
      collection.insertOne(item, function(err, result){
         if(err){ 
             return console.log(err);
         }
         console.log(result);
         console.log(item);
     })
       res.writeHead(303, { Connection: 'close', Location: '/' });
       res.end();
     });
   req.pipe(bb);
})

process.on("SIGINT", () => {
   dbClient.close();
   process.exit();
});
