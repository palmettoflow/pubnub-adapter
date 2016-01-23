var { EventEmitter } = require('events')
var PubNub = require('pubnub')
var { allPass, has } = require('ramda')

var ee = new EventEmitter()

const valid = allPass([
  has('subscribeKey'),
  has('publishKey'),
  has('channel')
])

const adapter = (config) => {
  if (!valid(config)) throw new Error('config is not valid!')

  var pubnub = PubNub({
      ssl           : true,
      publish_key   : config.publishKey,
      subscribe_key : config.subscribeKey
  })

  pubnub.subscribe({
    channel: config.channel,
    callback: (msg) => ee.emit(msg.to, msg)
  })

  const publish = (event) => {
    pubnub.publish({
      channel: config.channel,
      message: event
    })
  }

  ee.on('send', publish)

  return ee
}

module.exports = adapter
