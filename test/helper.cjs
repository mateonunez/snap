const Modulo = require('@mateonunez/modulo')
module.exports = (async () => {
  const helper = await Modulo({ path: 'test/helper.js' })()
  return helper
})()
