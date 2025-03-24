---
title: SosGetResultVideo
sidebar_position: 3
---
SosGetResultVideo is a specific DataSource to parse Video data.

The class inherits directly from TimeSeriesDataSource.

There are specific properties for this DataSource.


### Specific properties
These properties are members of customUrlParams.

*Note: that in case of the video stream, it is very important to define the responseFormat to activate the support of these parameters.*

*Note: these parameters are available only from OSH server >= 1.4.0*


### Parser

The underlaying stream is binary.

The first 8 bytes is the timestamp in millis.

The next 4 bytes define the frame length.

The next bytes are corresponding to a full NAL unit.

|--- 8 bytes timestamp ---|--- 4 bytes frame length ---|--- NAL UNIT ---|

```json title="From Server"
[..binary..data..]
```

```json title="After Parsing"
{
    timeStamp: 1450559070000,
    data: {
      frameData: [..binary..NAL_UNIT...],
      roll: 0    
    } 
}  
```


### Example

```js
import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo';

const videoDataSource = new SosGetResultVideo("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1.0
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const videoBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource.id);
const videoDivElement = document.getElementById('datasource-video');

videoBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    let dataEvent;
    for(let i=0;i < message.data.values.length;i++) {
      dataEvent =  message.data.values[i];
      dataEvent.data.frameData = message.data.values[i].data.frameData.slice(0,10);
      videoDivElement.value += JSON.stringify( [dataEvent]) + '\n';
    }
  }
}

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => videoDataSource.connect();

```