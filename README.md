# Palmetto Flow PubNub Adapter

The pubnub adapter uses a pubnub channel as the commit log for palmetto flow.

## Install

```
npm i pf-pubnub-adapter -S
```

## Configure

```
var palmetto = require('pf-pubnub-adapter')
var ee = palmetto({
  subscribeKey: '',
  publishKey: '',
  channel: ''
})
```

## Publish Palmetto Flow Event

```
ee.emit('send', event)
```

## Subscribe to Palmetto Flow Events

```
ee.on('location', (event) => handleEvent(event))
```

## Build Development

```
npm run build
```
