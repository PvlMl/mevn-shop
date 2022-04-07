const express = require("express");
const app = express();
const items = require("./items.json");
const busboy = require("busboy"); 
const cors = require("cors");
const fs = require("fs");

app.use(cors());

app.get("/",function (req, res) {
  res.send(items)
});

app.get("/images/*.jpg", function (req, res) {
  res.sendFile(__dirname + req.url);
});

app.get("/items/:id",function (req, res) {
  res.send(items.find(i => i.id == req.params.id));
});

app.post("/add", function (req,res) {
  const arr = [];
  const obj = {id: null}
          const bb = busboy({ headers: req.headers });
          bb.on('field', (name, val) => {
            obj[name] = val;
          });
          bb.on('file', (name, file) => {
            file.on('data', (data) => {
              arr.push(data);
            })
          });
          bb.on('close', () => {
            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end();
              const parsedItems = items;
              let id = parsedItems[parsedItems.length-1].id+1 || 1;
              obj.id = id;
              obj.img = `${id}.jpg`
              parsedItems.push(obj)
              fs.writeFile("./items.json", JSON.stringify(parsedItems,"",4), function(error){
                if(error) throw error;
            });
            fs.writeFileSync(`./images/${id}.jpg`, Buffer.concat(arr), function(error){
              if(error) throw error;
          });
          });

      req.pipe(bb);
});

app.delete('/delete/:id', function (req, res) {
  let parsedItems = items;
  parsedItems = parsedItems.filter(i => i.id != req.params.id)
  fs.writeFile("./items.json", JSON.stringify(parsedItems,"",4), function(error){
    if(error) throw error;
});
  res.send('Got a DELETE request at /user');
});

app.listen(3000);