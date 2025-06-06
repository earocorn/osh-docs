---
title: Usage
sidebar_position: 3
---

# Usage

**OSHConnect-JS** can be used with ES6 modules, plain JavaScript, and module loaders.

## Visualize GPS Data
To visualize     a datasource, we need to instantiate a `DataSource`, `View`, and `Layer`, as well as an HTML Tag to render the result.

### Create HTML Element
The HTML Element is the anchor of you View.

```html
<div id="leafletMap"></div>
```

### Import Modules
```js
import ConSysApi from 'osh-js/source/core/datasource/consysapi/ConSysApi.datasource'
import PointMarkerLayer from 'osh-js/source/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/source/core/ui/view/map/LeafletView.js';
```

### Create the DataSource
The DataSource is used to define the properties allowing connecting to a OSH server and define the data parser to use.

```js
// create the datasource using Connected Systems API
let gpsDataSource = new ConSysApi("android-gps", {
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/8ni90dbu4uf0g/observations',
    tls: true,
    startTime: '2012-06-29T14:22:00.099333251Z',
    endTime: '2012-06-29T14:37:44.033333251Z',
    mode: Mode.REPLAY,
    prefetchBatchSize: 250
})

```

### Create the Layer Instance
The Layer is used to dynamically style your data before rendering.

```js
// style it with a moving point marker
let pointMarkerLayer = new PointMarkerLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
  }),
  icon: './images/car-location.png',
  iconSize: [32, 64],
  iconAnchor: [16, 65],
  name: 'Car',
  description: 'GPS car Toulouse'
});

```


### Create the View Instance
The View defines the kind of visualization you want for your DataSource. In this example, a map render based on leaflet is used.

```js
// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarkerLayer],
    autoZoomOnFirstMarker:true
});

```


### Start the Stream
Finally, you can start the connection by executing:

```js
//start streaming
gpsDataSource.connect()
```