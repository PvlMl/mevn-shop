const http = require('http');
const fs = require('fs');
const busboy = require('busboy');

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'POST') {
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
        let id = ++parsedItems[parsedItems.length-1].id;
        obj.id = id;
        obj["img"] = `${id}.jpg`
        parsedItems.push(obj)
        fs.writeFile("./items.json", JSON.stringify(parsedItems), function(error){
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
}).listen(3000, () => {
  console.log('Listening for requests');
});