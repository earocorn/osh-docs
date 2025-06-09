---
title: Sensor/System Drivers
---

A core component of **OpenSensorHub** is the **sensor/system driver**.
We use both terms **sensor driver** and **system driver** to describe a 
type of module that can connect a data feed (and/or command feed) to **OpenSensorHub's system registry**, 
which allows the connected **sensor or system** to be represented using the [OSH core data model](../../architecture/core-data-model.md).

## Sensor Driver
As noted before, a **Sensor Driver** is used to connect to a data feed, typically via a sensor/device,
or some remote data feed. 

This allows the driver to:
- report the sensor's data outputs via **datastreams**
- expose a command interface via **control streams**
- report a descriptions and updates through **SensorML descriptions**

**Sensor drivers** implement the `ISensorDriver` interface,
which is an extension of `IDataProducer` (to manage outputs), 
`ISystemDriver` (for system descriptions), and
`ICommandReceiver` (to expose command input interfaces).

`osh-core` also provides an `AbstractSensorModule`, which implements common
methods for module lifecycle management, generation of system descriptions/ids,
and helper methods for attaching outputs, command interfaces, and features of interest to the system.

For an example implementation of a sensor driver, please see the [Driver Template Dissection](../sensor-drivers/driver-template.md).

See `ISensorModule`'s (`ISensorDriver` implementing `IModule` for easy integration) <a href="/reference/javadoc/org/sensorhub/api/sensor/ISensorModule.html" target="_blank">API reference</a>.

## System Group Driver
Since systems can have parent/child relationships, 
the **system group driver** is necessary in flexibly 
building this relationship by using **system drivers**.

The `ISystemGroupDriver` is simply an extension of the `ISystemDriver` interface
with a method to expose its **member system drivers**.

See `ISystemGroupDriver`'s <a href="/reference/javadoc/org/sensorhub/api/system/ISystemGroupDriver.html" target="_blank">API reference</a>

### SensorSystem
The default implementation of the `ISystemGroupDriver` interface in **OpenSensorHub**
is the `SensorSystem` class, which provides an implementation for a 
**system group driver** that manages data-producing modules (sensors and processes).

The `SensorSystem` class includes methods for module and **submodule lifecycle management**.
This means that the registration of all member sensor drivers will be handled by the parent
system group driver.

Also, the `SensorSystem` class ensures that member drivers' system descriptions are 
attached to the parent `SensorSystem`'s system description, fulfilling the parent/child relationship
in the OSH core data model.