var palmetto = require('../lib')

var ee = palmetto({
  subscribeKey: 'demo',
  publishKey: 'demo',
  channel: 'demo'
})

ee.on('/foobar', function (e) {
  console.log(e)
})

ee.emit('send', { to: '/foobar' })
