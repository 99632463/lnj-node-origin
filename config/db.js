let mysql_config = {}

if(process.env.NODE_ENV === 'dev'){
  mysql_config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'demo'
  }
}
else if(process.env.NODE_ENV === 'pro'){
  mysql_config = {
    host: 'https://xxxxx',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'demo'
  }
}

module.exports = mysql_config