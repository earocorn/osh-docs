---
title: SosGetResultJson
sidebar_position: 2
---

SosGetResultJson is a specific DataSource to parse JSON data.

The class inherits directly from TimeSeriesDataSource.

There are not specific properties for this DataSource.

### Parser
The time field formatted as String ISO Date is converted into time in milliseconds.

The other fields are keeping as they are and are forwarded to the result object.

```json title="From Server"
{
  "time": "2015-02-16T07:58:52Z",
  "location": {
    "lat": 43.61759959, 
    "lon": 1.42376351, 
    "alt": 195.0
  }
}
```


```json title="After Parsing"
{
    timeStamp: 1424073532000,
    data: {
        "location": {
            "lat": 43.61759959, 
            "lon": 1.42376351, 
            "alt": 195.0
        }              
    }
}  
```


### Example

```js
import SweJson from 'osh-js/core/datasource/SosGetResultJson.js';

const platformLocationDataSource = new SweJson('android-GPS', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1.0
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const locationBroadcastChannel  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + platformLocationDataSource.id);
const locationDivElement = document.getElementById('datasource-gps');

locationBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    locationDivElement.value += JSON.stringify(message.data.values) +'\n';
  }
}

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => platformLocationDataSource.connect();

```