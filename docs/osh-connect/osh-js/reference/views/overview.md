---
title: Overview
---
## Overview
The Views are components made for displaying any kind of data. Some are framework based such as Leaflet, Cesium, Openlayers, Charts.js etc. or pure Javascript.

This is the list of actual supported Views in the Toolkit:

- Map
  - Cesium 1.68
  - Leaflet 1.6
  - OpenLayers 6.2.1
- Chart
  - Chart.js 2.9.3
- TimeLine
  - NoUiSlider 14.2.0
- Video
  - MJPEG native view
  - FFMPEG native view based on emscripten 2.0 & FFMPEG.js 4.3
  - VideCodecApi native view

<a href="/reference/jsdoc/View.html" target="_blank">API Reference</a>
## Common Properties
The View class is super class to provide common properties to other subclasses. These properties are as follows:
- container
- css
- layers
### container
The container is the id on which the view will be attached. 
A new child element will be created in the DOM and will be attached to the element corresponding to the id passed as parameter.

Note that this class is DOM Ready, so the document needs to be loaded before being used. 
The View will therefore have a new auto-generated id (UUID) as identifier and will be accessible via its properties.

```js
<div id="container"></div>
const myCustomView = new CustomView({
    container: 'container'
});
```
Results in:
```js
<div id="container">
    <div id="view-1345-4678-7894-45461ab">...</div>
</div>
```
### layers
Views are composed of Layers. 
The Layer allows you to apply a particular style to data that the view displays, 
it can be a point on a map, a polyline, a chart curve, a videoframe, etc.

#### Supported layers
Each view supports one or more layer types, the internal constructor of the view has a property to define which layer types are supported or not. 
Native OSH views already define this property.

If we try to add a layer that is not supported by a view, an exception will be thrown.

The types are defined as follows:
- marker
- polyline
- curve
- draping

## Common Views
TODO