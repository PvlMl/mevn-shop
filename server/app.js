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
        else if(/\/items\/\d+/.test(req.url)){
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          fs.readFile('./items.json', 'utf-8', (err, items) => {
            if(err){
              res.statusCode = 404;
              res.end("Resourse not found!");
            }
            const id = parseInt(req.url.match(/\d+/))
            const parsedItems = JSON.parse(items);
            const itemToSend = parsedItems.find(function(i){return i.id === id})
            res.statusCode = 200;
            res.end(JSON.stringify(itemToSend));
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
        } 
        else if (req.url === '/add'){
          let data = [];
          req.on("data", chunk => {
              data.push(chunk);
              console.log(1)
          });
           req.on("end", () => {
             const image = Buffer.concat(data)
             fs.writeFileSync("./test/111.jpg", image, function(error){
              if(error) throw error; // если возникла ошибка
              console.log("Асинхронная запись файла завершена");
          });
           })
        }
        
         else {
          res.statusCode = 404;
              res.end("Wrong url");
        }
  }).listen(3000);

