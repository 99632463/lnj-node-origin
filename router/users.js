const {
  USER_LOGIN,
  USER_REGISTER,
  USER_INFO,
} = require('./router-const')
const { SuccessModel } = require('../model/resultModel')
const { register, loginCheck } = require('../controller/userController')

const usersRouteHandle = async (req, res) => {
  if(req.method === 'post' && req.path === USER_LOGIN){
    const result = await loginCheck(req, res)
    return result
  }
  else if(req.method === 'post' && req.path === USER_REGISTER){
    const result = await register(req.body)
    return result
  }
  else if(req.method === 'get' && req.path === USER_INFO){
    return new SuccessModel('获取用户信息成功', {name:'www', age: 20})
  }
}

module.exports = usersRouteHandle
