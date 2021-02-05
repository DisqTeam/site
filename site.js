const config = require("./src/config.json");
const path = require("path")
const fs = require("fs")
const express = require("express");

const site = express()
site.use(express.static("build"))
site.get('/:file', (req, res, next) => {
    if(fs.existsSync(path.join(config.imagesFolder, req.params.file))) {
        res.sendFile(path.join(config.imagesFolder, req.params.file))
    } else {
        res.sendFile(path.join(__dirname, "build/index.html"))
    }
})

site.listen(8053, () => {
    console.log(`DisqSite running on port 8053`)
})