---
title: Introduction
sidebar_position: 1
---


# Introduction to OSHConnect-JS (osh-js)

## What is it?
**OSHConnect-JS**, formerly known as **osh-js** is the most supported client toolkit used for interacting with **OpenSensorHub** nodes via OGC API - Connected Systems for the purposes of web-based visualizations.


**OSHConnect-JS** is a pure JavaScript framework and does not require third party libraries. However, external libraries are available to build visualizations such as Leafley, OpenLayer, Cesium, Chart.js, and more.

## Supported Features 
- Data parsing
    - Video data with codecs H.265, H.264, VP9, VP8
    - Any SWE Common generic such as GPS, Quaternion, etc.
    - Spectrogram, ImageDraping, Nexrad
- Data Synchronization
- WebSocket and HTTP connectors
- Dedicated visualization techniques
    - OpenLayer, Leaflet, and Cesium for map data
    - FFmpeg for video data
    - Chart.js for variety observations
    - Spectrogram
- Prebuilt Vue.js components

## Supported Interfaces
- **OGC API - Connected Systems**
- Older Sensor Web Enablement (SWE) Interfaces
    - **Sensor Observation Service (SOS)**
    - **Sensor Planning Service (SPS)**
    - **SWE API**