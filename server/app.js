const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const cors = require("cors");
const busboy = require("busboy"); 

app.use(cors());

const itemScheme = new Schema({
    title: String,
    subtitle: String,
    description: String,
    price: Number
}, {versionKey: false});

const Item = mongoose.model("Item", itemScheme);

mongoose.connect("mongodb://localhost:27017/itemsdb", { useUnifiedTopology: true, useNewUrlParser: true}, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/items", function(req, res){
        
    Item.find({}, function(err, users){
 
        if(err) return console.log(err);
        res.send(users)
    });
});

app.post("/add", function (req,res) {
    const itemData = {}
            const bb = busboy({ headers: req.headers });
            bb.on('field', (name, val) => {
              itemData[name] = val;
            });
            bb.on('close', () => {
               const item = new Item(itemData);
              item.save(function(err){
                if(err) return console.log(err);
                res.send(item);
            });
            });
        req.pipe(bb);
  });