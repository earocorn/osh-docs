---
title:   Overview
sidebar_position: 0
---

# Overview

## What is a Sensor Driver?
A *Sensor Driver* in **OpenSensorHub** is a plugin or module that can be run in an **OpenSensorHub** node to receive live data from a sensor/sensing system, or send commands to actuators/sensors.

*Sensor Drivers* are developed as a bridge from a physical (or non-physical) sensor/sensing system to **OpenSensorHub**'s internal event bus.

Data that is received from a sensor through a *Sensor Driver* is published to **OpenSensorHub**'s event bus, 
which allows this data to be persisted in databases, served via service modules, 
pushed to other nodes/services via client modules, or processed with *SensorML Processing*.

## Development Thought Process
Before developing a *Sensor Driver*, it's helpful to have an idea of what sensor you want to connect to, and what data you want from it. 
Breaking down the development of a *Sensor Driver* into 3 parts will help in the process of actually developing the driver.

- **Connection** - The logic to establish a connection with your sensor/sensing system in Java.
- **Data Models** - Data models of data to be received from a sensor, and commands to be sent to the sensor.
- **Data Retrieval/Push** - Method of actually retrieving or pushing data.

### Connection
Different types of sensors will have different methods of communication.

Java supports interfacing with basic IoT sensors via libraries such as [Pi4J](https://www.pi4j.com/) (on Raspberry Pi), or through common IoT protocols such as MQTT.

Other sensors will use common hardware protocols such as serial/RS232, USB, Bluetooth, ethernet, etc. 
It is also common for sensors to stream their data via a TCP/UDP service, such as when accessing video cameras.

Java is a robust language for connecting to and accessing data over various protocols.
There are also plenty of Java libraries available to perform these connections, 
so please research the best method of connecting to your sensor,
then make sure you can connect to it in Java.

### Data Models
If an interface for retrieving data is already provided from a sensor, the most straightforward way to fetch this data in a *Sensor Driver* is to use the data models provided.

However, sometimes you will have to create a new format for the data if the format isn't clear or if you need a human-readable format.

In **OpenSensorHub**, data models are defined using the [**SWE Common Data Model**](https://www.ogc.org/standards/swecommon/).
**OpenSensorHub** provides Java APIs for creating these data models.
#### Example
For a weather station, you may want to record various types of observations such as rain level, temperature, humidity.

```
timestamp - XX:XX:XXX
weatherData
    rainLevel - X inches
    temperature - X degrees (with unit)
    humidity - X%
```

:::info
As you can see, it is necessary to also note the units of elementary data components.
:::
### Data Retrieval/Push
After establishing a connection with a sensor and building your data models,
you should be using this connection to query or read sensor observations,
which will be populated in a data structure reflected by your data model.

Retrieving data will often be done through a subscription/listening process, or through polling data from a sensor.

In Java, it is common to read this data as a stream from an `OutputStream`, or in a lot of APIs, you may have some request-response method of polling data.