---
title: Audio
sidebar_position: 5
---

# SosGetResultAudio

SosGetResultVideo is a specific DataSource to parse Audio data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are specific properties for this DataSource.

## Parser

The underlaying stream is binary.
 
The first 8 bytes is the timestamp in millis.
 
The next 4 bytes define the sampleRate.

The next 4 bytes define the number of samples.

The next 4 bytes define the data compressed size.

The next bytes are corresponding to an audio frame.


|--- 8 bytes timestamp ---|--- 4 bytes sampleRate ---|--- 4 bytes number of samples ---|--- 4 bytes data compressed size ---|--- AUDIO FRAME ---|

**From Server:**

```json
[..binary..data..]
```

**After Parsing:**

```json
{
    timeStamp: 1450559070000,
    data: {
      frameData: [..binary..AUDIO FRAME...],
      sampleRate: 11025,
      nbSamples: 750,
      pktLength: 1024
    } 
}  
```

## Example

```js

import SosGetResultAudio from "osh-js/core/datasource/SosGetResultAudio";

let audioDataSource = new SosGetResultAudio("alex-audio", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
  startTime: "2021-04-12T10:48:45Z",
  endTime: "2021-04-12T10:49:45Z",
  replaySpeed: 1.0,
  bufferingTime: 1000
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const audioBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + audioDataSource.id);
const divElement = document.getElementById('datasource-audio');

audioBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    let dataEvent;
    for(let i=0;i < message.data.values.length;i++) {
      dataEvent =  message.data.values[i];
      dataEvent.data.frameData = message.data.values[i].data.frameData.slice(0,10);
      divElement.value += JSON.stringify( [dataEvent]) + '\n';
    }
  }
}

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => audioDataSource.connect();

```
