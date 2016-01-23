'use strict';

var _require = require('events');

var EventEmitter = _require.EventEmitter;

var PubNub = require('pubnub');

var _require2 = require('ramda');

var allPass = _require2.allPass;
var has = _require2.has;

var ee = new EventEmitter();

var valid = allPass([has('subscribeKey'), has('publishKey'), has('channel')]);

var adapter = function adapter(config) {
  if (!valid(config)) throw new Error('config is not valid!');

  var pubnub = PubNub({
    ssl: true,
    publish_key: config.publishKey,
    subscribe_key: config.subscribeKey
  });

  pubnub.subscribe({
    channel: config.channel,
    callback: function callback(msg) {
      return ee.emit(msg.to, msg);
    }
  });

  var publish = function publish(event) {
    pubnub.publish({
      channel: config.channel,
      message: event
    });
  };

  ee.on('send', publish);

  return ee;
};

module.exports = adapter;