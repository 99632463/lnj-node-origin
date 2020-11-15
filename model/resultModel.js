class ResultModel {
  constructor({ code, msg, data }){
    this.code = code
    this.msg = msg
    this.data = data || {}
  }
}

class SuccessModel extends ResultModel{
  constructor({ code, msg, data }) {
    super({ code, msg, data })
    this.code = 200
  }
}

class FailModel extends ResultModel{
  constructor({ code, msg, data }) {
    super({ code, msg, data })
    this.code = -1
  }
}

module.exports = {
  SuccessModel,
  FailModel
}