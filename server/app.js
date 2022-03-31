const http = require('http');
const fs = require('fs');
const busboy = require('busboy');

http.createServer((req, res) => {
       res.setHeader('Access-Control-Allow-Origin', '*');
       res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
       res.setHeader('Access-Control-Allow-Headers', '*');
        if(req.url === '/'){
          res.setHeader('Content-Type', 'application/json');
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
          fs.readFile('.' + req.url, (err, image) => {
            if(err){
              res.statusCode = 404;
              res.end("Resourse not found!");
            }
            res.statusCode = 200;
          res.end(image);
          })
        } 
        else if (req.method === 'POST' && req.url === '/add') {
          console.log('POST request');
          const bb = busboy({ headers: req.headers });
          bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            console.log(
              `File [${name}]: %j, %j, %j`,
              filename,
              encoding,
              mimeType
            );
            
            file.on('data', (data) => {
              console.log(`File [${name}] got ${data.length} bytes`);
              arr.push(data);
            }).on('close', () => {
              console.log(`File [${name}] done`);
            });
          });
          let arr = [];
          let obj = {};
          bb.on('field', (name, val) => {
            obj.id = null;
            obj[name] = val;
          });
          bb.on('close', () => {
            console.log('Done parsing form!');
            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end();
            fs.readFile('./items.json', 'utf-8', (err, items) => {
              if(err){
                res.statusCode = 404;
                res.end("Resourse not found!");
              }
              const parsedItems = JSON.parse(items);
              let id = parsedItems[parsedItems.length-1].id+1;
              obj.id = id;
              obj["img"] = `${id}.jpg`
              parsedItems.push(obj)
              fs.writeFile("./items.json", JSON.stringify(parsedItems,"",4), function(error){
                if(error) throw error;
            });
            fs.writeFileSync(`./images/${id}.jpg`, Buffer.concat(arr), function(error){
              if(error) throw error; // если возникла ошибка
              console.log("Асинхронная запись файла завершена");
          });
            })
          });
          req.pipe(bb);
        } 
        else if(req.method === 'POST' && req.url === '/delete'){
            let idToDelete = null;
            req.on('data', function (data) {
              idToDelete = data;
          });
          req.on('end', function () {
            fs.readFile('./items.json', 'utf-8', (err, items) => {
              if(err){
                res.statusCode = 404;
                res.end("Resourse not found!");
              }
              let parsedItems = JSON.parse(items);
              parsedItems = parsedItems.filter(i => i.id != idToDelete)
              fs.writeFile("./items.json", JSON.stringify(parsedItems,"",4), function(error){
                if(error) throw error;
            });
            })
        });
        }
      }).listen(3000);

