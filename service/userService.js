const exc = require('../db/mysql')

const getUser = async (username, password) => {
  if(password){
    const sql =  `select * from user where username='${username}' and password='${password}'`;
    const result = await exc(sql)
    return result
  }

  const sql =  `select * from user where username = '${username}'`;
  const result = await exc(sql)
  return result.length
}

const createUser = async data => {
  const { username, password } = data
  const sql = `insert into user (username, password) values ('${username}', '${password}')`;
  const result = await exc(sql)
  return result
}

module.exports = {
  getUser,
  createUser
}

