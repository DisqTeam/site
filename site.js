const config = require("./src/config.json");
const path = require("path")
const fs = require("fs")
const { parse } = require('url')
const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      
      if (pathname.split("/").slice(1).length == 1) {
        if(!pathname.includes(".")) return handle(req, res);
        let imgPath = path.join(config.imagesFolder, pathname.slice(1))
        if(fs.existsSync(imgPath)) { 

          let stat = fs.statSync(imgPath)
          res.writeHead(200, {
            'Content-Length': stat.size
          });
        
          let read_stream = fs.createReadStream(imgPath);
          read_stream.pipe(res);

        } 
        else { handle(req, res) }
      } else {
        handle(req, res, parsedUrl)
      }
    }).listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
})