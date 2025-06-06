---
title: System Registry
sidebar_position: 2
---

The **system registry** is one of the main components of OSH middleware, 
whose purpose is to manage all systems (i.e. sensors, actuators, processes...) 
connected to the hub via device or system drivers or other OSH modules. 

Previously you learned about **modules** and the **module registry**,
which is responsible for managing various types of modules that can be loaded into OSH.
However, the **module registry** does **not** provide the structure necessary to represent the complex interactions between modules.

The **system registry** is necessary to register **systems** created by sensor/system drivers and processing modules.
Once they are registered, drivers and processing modules can begin **publishing observations through datastreams** 
and receive **commands on their control/command channels**.

System registration will attach the system to its associated **database**, and register it with the **event bus**.
These are two crucial steps as they allow data/events produced by a **system driver** to be accessible via the **federated database** and **event bus** subscriptions.

## ISystemDriverRegistry
The `ISystemDriverRegistry` interface provides methods for interfacing with a system registry.

This includes the following:
- Registering/unregistering a **system driver module** (with or without **feature of interest**)
- Directly registering a **system, datastream, control stream**
- Registering/unregistering a system's associated **database**

See `ISystemDriverRegistry` <a href="/reference/javadoc/org/sensorhub/api/system/ISystemDriverRegistry.html" target="_blank">API Reference</a>