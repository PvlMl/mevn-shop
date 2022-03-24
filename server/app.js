const http = require('http');
const fs = require('fs')

http.createServer((req, res) => {
        if(req.url === '/'){
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
        fs.readFile('./items.json', (err, items) => {
          if(err){
            res.statusCode = 404;
            res.end("Resourse not found!");
          }
          res.statusCode = 200;
          res.end(items);
        })
        }
       else if(/\/images\/\d+\.jpg/.test(req.url)){
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Access-Control-Allow-Origin', '*');
          fs.readFile('.' + req.url, (err, image) => {
            if(err){
              res.statusCode = 404;
              res.end("Resourse not found!");
            }
            res.statusCode = 200;
          res.end(image);
          })
        } else {
          res.statusCode = 404;
              res.end("Wrong url");
        }
  }).listen(3000);

