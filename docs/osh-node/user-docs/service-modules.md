---
title: Service Modules
sidebar_position: 4
---

# Service Modules

Service modules in **OpenSensorHub** are typically used to expose resources via a standard method of communication. 
**OpenSensorHub** exposes resources most commonly through a REST API, or via streaming protocols such as MQTT, etc. 

The default *Service Modules* packaged in an **OpenSensorHub** node are *Connected Systems API Service*, *SOS Service*, and *SPS Service*.

While *SOS Service* and *SPS Service* are mostly deprecated, the *Connected Systems API Service* is the newest and most up-to-date common *Service Module*.

The *Connected Systems API Service Module* allows an **OpenSensorHub** node to expose its resources on a configurable endpoint via **OGC API - Connected Systems**.
:::tip
You can learn more about **OGC API - Connected Systems** [here](https://ogcapi.ogc.org/connectedsystems/) or refer to the **OSH Connect** [documentation](../../osh-connect/introduction) for building **OpenSensorHub** clients using **OGC API - Connected Systems**.
:::
This guide will cover basic configuration of only the *Connected Systems API Service Module*, but you will find that most service modules have similar configuration.

## Connected Systems API Service



