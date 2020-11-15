const url = require('url')
const queryString = require('querystring')
const goodsRouteHandle = require('./router/goods')
const usersRouteHandle = require('./router/users')
const readFile = require('./utils/staticServer')
const { promises } = require('fs')

const SESSION_CONTAINER = {}

const getCookieExpire = () => {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
  return date.toGMTString()
}

// 处理请求方式，请求路径，请求参数
const initParams = (req, res) => {
  const reqParse = url.parse(req.url, true)
  req.path = reqParse.pathname
  req.method = req.method.toLowerCase()

  return new Promise(resolve => {
    if (req.method === 'get') {
      req.query = reqParse.query
      resolve()
    } else {
      let params = ''
      req.on('data', chunk => {
        params += chunk
      })
      req.on('end', () => {
        req.body = queryString.parse(params)
        resolve()
      })
    }
  })
}

// 这里面做的事情就是让 req.session 设置值有效
const handleCookie = (req, res) => {
  // 接受到客户端 cookie
  req.cookie = {}
  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach(item => {
      const keyvalue = item.split('=')
      req.cookie[keyvalue[0]] = keyvalue[1]
    })
  }
  // 获取用户的唯一标识
  const userId = req.cookie.userId
  if(!userId){
    req.userId = `${Date.now()}_${Math.random()}`
    // 给当前用户分配一个容器
    SESSION_CONTAINER[req.userId] = {}
    res.setHeader('Set-Cookie', `name=${req.userId}; path=/; httpOnly; expires=${getCookieExpire()};`);
  }

  if(!SESSION_CONTAINER[req.userId]){
    // 给当前用户分配一个容器
    SESSION_CONTAINER[req.userId] = {}
  }

  // 把当前容器赋给 req.session
  req.session = SESSION_CONTAINER[req.userId]
  console.log(123, req.session);
}

const setEnd = (res, data) => {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  })
  res.end(JSON.stringify(data))
}

module.exports = async (req, res) => {
  // handleCookie(req, res)

  await readFile(req, res, 'public')
  res.setEnd = setEnd
  await initParams(req, res)

  const goodsData = goodsRouteHandle(req, res)
  if(goodsData){
    return res.setEnd(res, goodsData)
  }

  const usersData = await usersRouteHandle(req, res)
  if(usersData){
    return res.setEnd(res, usersData)
  }

  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
  res.end('404 Not Found')
}