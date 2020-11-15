const Ajv = require('ajv')
const { loginSchema } = require('../validate/userValidate')
const { getUser, createUser } = require('../service/userService')
const { SuccessModel, FailModel } = require('../model/resultModel')
const errorConst = require('../config/errorConst')
const crypto = require('../utils/crypto')

const ajv = new Ajv()

const userValidate = data => {
  const valid = ajv.validate(loginSchema, data);
  return valid
}

const isExist = username => {
  const result = getUser(username)
  return result
}

const register = async data => {
  const valid = userValidate(data)
  const isSign = await isExist(data.username)
  if(!valid){
    return new FailModel(errorConst.userDataFail)
  }
  if (isSign) {
    return new FailModel(errorConst.userExistFail) 
  }

  try{
    await createUser({
      username: data.username,
      password: crypto(data.password)
    })
    return new SuccessModel({ msg: '注册成功' })
  }
  catch(e){
    console.log(e);
    return new FailModel(errorConst.registerFail) 
  }
}

const loginCheck = async (req, res) => {
  const { username, password} = req.body
  const result = await getUser(username, crypto(password))

  if(result.length){
    return new SuccessModel({msg:'登录成功', data: result[0]})
  }
  return new FailModel(errorConst.loginFail)
}

module.exports = {
  userValidate,
  isExist,
  register,
  loginCheck
}