const config = require("./src/config.json");
const path = require("path")
const fs = require("fs")
const mmm = require('mmmagic'), Magic = mmm.Magic;
const { parse } = require('url')
const { createServer } = require('http')
const next = require('next')

const magic = new Magic(mmm.MAGIC_MIME_TYPE);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: false })
const handle = app.getRequestHandler()


app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      
      if (pathname.split("/").slice(1).length == 1) {
        if(!pathname.includes(".")) return handle(req, res);
        let imgPath = path.join(config.imagesFolder, pathname.slice(1))
        if(fs.existsSync(imgPath)) { 
          magic.detectFile(imgPath, function(err, mime) {
            if (err) throw err;
            let stat = fs.statSync(imgPath)
            
            res.writeHead(200, {
              'Content-Type': mime,
              'Content-Length': stat.size
            });
          
            let read_stream = fs.createReadStream(imgPath);
            read_stream.pipe(res);
          });
        } 
        else { handle(req, res) }
      } else {
        handle(req, res, parsedUrl)
      }
    }).listen(8053, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
})