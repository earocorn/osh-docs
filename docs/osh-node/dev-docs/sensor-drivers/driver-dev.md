---
title: Driver Development
sidebar_position: 2
---

# Driver Development
This guide will show example implementation from the `osh-node-dev-template` repository on **OpenSensorHub**'s public GitHub.
Please refer to the [*Development Template*](../dev-template.md) page for setting up this repository, and learning more about what is included in the template.

The example implementation will be under `osh-node-dev-template/sensors/sensorhub-driver-template`.
## Driver Components
In the Java implementation for a *Sensor Driver*, a few java files are required.


| File          | Qty  | Purpose                                                                                                                                                                                          |
|---------------|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Activator     | 1    | Exposes module for ability to be bundled in an OSGi bundle.                                                                                                                                      |
| Descriptor    | 1    | Provides entrypoint (module class) and module config file for this module.                                                                                                                       |
| Config        | 1    | Configuration used for sensor driver/module. This can include connection settings, descriptive information, etc.                                                                                 |
| Sensor/Driver | 1    | Entrypoint or "main" class for your driver. Includes setup/connection, and a way to interface with your sensor.                                                                                  |
| Output        | 1..* | Class used to define output data structures and publish sensor observations/outputs to the OSH event bus.                                                                                        |
| Control       | 0..* | Class used to define command data structures and bridge an interface for commanding a sensor/actuator with OSH command interfaces such as the web UI or other services (Connected Systems, SOS). |

### Activator

### Descriptor

### Config

### Sensor/Driver

### Output

### Control