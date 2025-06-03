---
title: System Drivers
sidebar_position: 2
---
# System Drivers

OSH simplifies the development of **sensor and actuator drivers** (referred collectively as *realtime system drivers*) 
by exposing a clean API for pushing **observation data** and **observing system metadata** (via SensorML) to an OSH management layer called the **System Registry**.

A **System Driver** can be used to model different kinds of systems, and with different levels of granularity, such as:

- A hardware device (sensors, actuators)
- A complex system (e.g. a complete robot, a vehicle, a smartphone)
- A logical system (e.g. an executable instance of a process or algorithm)
- A human being or animal implementing a specific procedure

Note that a system is an instance of a procedure implemented by the *IProcedure* interface in OSH. 
For a hardware system, the procedure is typically the system model as described by its datasheet. 
For humans, the procedure is the list of steps that have to be carried to collect a sample and/or make an observation.

## What is a System Driver?
A **real-time system driver** in OSH is similar to a **device driver** for an operating system. 
Its purpose is to convert from/to any custom data feeds or formats (that can be proprietary, standards, or de-facto standards) to/from OSH internal data model based on OGC standards.

Thus, system drivers communicate with the rest of OSH components by providing **system metadata** as 
SensorML, **Datastream** and **Command Stream** descriptions as SWE Common, **Features of Interest** following OGC feature model, 
and **Observation results** as SWE Common encoded records or full-fledged **Observation** events as O&M/OMS.

They also describe accepted commands using the SWE Common format.
## System Registry
Newly installed sensor and actuator drivers can be configured via the web admin interface.

Once properly configured, the driver can be started, which will trigger its registration with the hub's **System Registry**. 
At this point, OSH will connect the driver with the rest of the hub's components via the event-bus and persistent storage, and the driver will start producing data (and potentially accepting commands).

If a database was previously configured to manage the new system, it will immediately start archiving all data produced by the driver, 
system and features of interest metadata as well as observation data and any received tasking data.

Likewise, if a service module was previously configured to expose data from the new sensor, such data will immediately become available through the service interface.