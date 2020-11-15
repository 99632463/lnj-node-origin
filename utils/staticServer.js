const path = require('path')
const fs = require('fs')
const mine = require('./mine.json')

function readFile(req, res, rootPath) {
  const file = path.join(rootPath, req.url)
  const extname = path.extname(req.url)
  if(extname) {
    const type = mine[extname]
    type && res.writeHead(200, {
      'Content-Type': type
    })

    return new Promise(resolve => {
      fs.readFile(file, (err, content) => {
        if(err) {
          res.end('Server Error')
        }
        res.end(content)
        resolve()
      })
    })
  }
}

module.exports = readFile