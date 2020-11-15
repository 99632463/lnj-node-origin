const crypto = require('crypto');

function _md5(password) {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return hash
}

function generatePwd(password) {
  const secret = password + 'dkgjdld'
  return _md5(secret)
}

module.exports = generatePwd

