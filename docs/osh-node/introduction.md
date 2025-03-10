---
title: ❌  Introduction
sidebar_position: 1
---

# User's Guide
<!-- This guide will walk you through basics of using OpenSensorHub. I you haven't installed it on your platform yet, please do so first by following instructions on the [Download](LINK) and [Install](LINK) pages. -->


## Web-based Admin Interface
<!-- The easiest way to use SensorHub is via the web-based interface. However, if something is not available from the UI, you can always edit the configuration file manually (See section [Configuration](LINK) File). -->

When SensorHub is running, you can connect to the following URL to access the administration page:
```
http://localhost:8181/sensorhub/admin
```
This admin page allows you to do the following actions:
- Add and configure new sensors (when proper driver was previously installed)
- Add and configure sensor data storage
- Add and configure SOS and SPS service instances
- Expose data streams and/or storage through SOS
- Expose sensor commands through SPS


## Example Javascript Clients
An example Javascript client that connects to OSH SOS service is included in the core distribution. This client displays GPS position on the map and receives real-time data via websockets. 

You can also look at our other demo clients that are running online directly from our [GitHub Demo Site](https://opensensorhub.github.io/osh-js/dev/showcase/)


## Configuration File
OpenSensorHub's configuration is centralized in a single file. It is in JSON format so it can be easily viewed or modified in any text editor.

This file contains a list of module's configuration that are loaded in order when starting SensorHub.

## Connected Systems Services



## Module State
The internal state of each module is saved in a subfolder of the modules folder whose name is the module's local ID. This folder can contain:

A state.txt file containing a list of key/value pairs corresponding to state properties that the module has saved
Zero or more .dat files that contain arbitrary data saved by the module


### Supported Protocols and Devices