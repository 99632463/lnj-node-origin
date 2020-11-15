const loginSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 1
    },
    password: {
      type: "string",
      // "pattern": "^#([0-9a-fA-F]{6}$",
      // "maxLength": 6,
      // "minLength": 6,
      minLength: 1
    },
  },
  required: [
    "username",
    "password"
  ]
}

module.exports = {
  loginSchema
}