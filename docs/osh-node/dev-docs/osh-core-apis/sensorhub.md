---
title: SensorHub
sidebar_position: 0
---
## Overview
The `SensorHub` class is the entrypoint class containing the `main()` method to instantiate and run an **OpenSensorHub** node.

`SensorHub` is the default implementation of the `ISensorHub` interface, 
allowing access to all **OpenSensorHub** components, and methods for starting and shutting down an instance.

All **OpenSensorHub** modules have access to their `ISensorHub` instance through the `IModule`'s `getParentHub()` method.

Through the `ISensorHub` interface, you have access to different management and utility classes, including the OSH `EventBus`.

## OSGi
TODO