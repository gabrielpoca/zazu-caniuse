const caniuse = require('./caniuse')

module.exports = (pluginContext) => {
  return (name, env = {}) => {
    return caniuse.query(name)
  }
}
