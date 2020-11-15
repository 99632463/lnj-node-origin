const http = require('http')
const serverHandle = require('../app')

const PORT = 3000 

http.createServer(serverHandle).listen(PORT)
