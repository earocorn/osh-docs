---
title: Layers
sidebar_position: 4
---

## Overview
**Layers** allow styling and filtering of data.
They are generic and can be applied to any **View** that supports them.

For example, data can be displayed as:
- text
- icon
- line (graphing)
- point on a map

There are two types of properties of a layer:
- static properties
- dynamic properties

Static properties are defined at creation and cannot be modified. 
Depending on the property, it can be a number, a string, an object etc.

Dynamic properties are defined as a function. 
Thus, each data can be modified individually by going through these functions.

The function can take two forms:
- the simple form as an arrow function
- the complex form defining a dataSource and a separate handler

Thus, for a given layer, we can define a `dataSourceId` for the entire layer or define a specific `dataSourceId` for each function.

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


// or


// add 3D model marker to Cesium view
let pointMarker = new PointMarkerLayer({
    name: "3DR Drone",
    label: "3DR Solo",
    getLocation: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.loc.lon,
                y: rec.loc.lat,
                z: rec.loc.alt - 184 // model offset
            };
        }
    },
    getOrientation: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading: rec.attitude.yaw
            };
        }
    },
    zoomLevel: 18,
    icon: './images/drone.png',
    iconSize: [128,128],
    iconAnchor: [70, 98]
});
```
## Common Layers
Below are brief explanations and examples of the most common types of layers.
### PointMarkerLayer
The PointMarkerLayer allows you to add style to a marker type element.

<a href="/reference/jsdoc/PointMarkerLayer.html" target="_blank">API Reference</a>

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
### PolylineLayer
The PolylineLayer allows you to add style to a polyline type element.

<a href="/reference/jsdoc/PolylineLayer.html" target="_blank">API Reference</a>

```js
// also create a polyline with the last 200 points of the track
let polyline = new PolylineLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    color: 'rgba(0,0,255,0.5)',
    weight: 10,
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "Android Phone GPS Path"
});
```
### CurveLayer
The CurveLayer allows you to add style to a curve type element.

<a href="/reference/jsdoc/CurveLayer.html" target="_blank">API Reference</a>

```js
let windSpeedLayerCurve = new CurveLayer({
    dataSourceId: chartDataSource.id,
    getValues: (rec, timeStamp) => {
        return {
            x: timeStamp,
            y: rec.windSpeed
        }
    },
    name: 'Wind Speed (m/s)'
});
```
### ImageDrapingLayer
The ImageDrapingLayer allows you to add style to an image draping type element.

<a href="/reference/jsdoc/ImageDrapingLayer.html" target="_blank">API Reference</a>

```js
// style it with an image draping
let imageDrapingLayer = new ImageDrapingLayer({
    getPlatformLocation: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.loc.lon,
                y: rec.loc.lat,
                z: rec.loc.alt - 184
            };
        }
    },
    getPlatformOrientation: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    getGimbalOrientation: {
        dataSourceIds: [gimbalOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    cameraModel: {
        camProj: new Matrix3(747.963/1280.,     0.0,       650.66/1280.,
          0.0,        769.576/738.,  373.206/738.,
          0.0,            0.0,          1.0),
        camDistR: new Cartesian3(-2.644e-01, 8.4e-02, 0.0),
        camDistT: new Cartesian2(-8.688e-04, 6.123e-04)
    },
    icon: 'images/car-location.png',
    iconAnchor: [16, 40],
    imageSrc: videoCanvas,
    name: 'Solo draping'
});
```
### VideoDataLayer
VideoLayer allows you to add video to a VideoView.

<a href="/reference/jsdoc/VideoDataLayer.html" target="_blank">API Reference</a>

```js
let videoLayer = new VideoDataLayer({
    dataSourceId: videoSource.id,
    getFrameData: (rec: any) => rec.img,
    getTimestamp: (rec: any) => rec.timestamp,
})
```