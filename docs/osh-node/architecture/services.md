---
title: Web Services & APIs
sidebar_position: 3
---
# Web Services & APIs

## Sensor Web Enablement
OSH provides full support for the OGC Sensor Web Enablement (SWE) suite of standards, including web services and data models.

## Web Services in OSH
Web services act as a means of exposing internal OSH data models, data streams (and observations), and command streams (and commands) in a format which conforms to a standard API specification.

These services work by querying a chosen database (typically the **Federated Database**), and transcoding this data from the internal data models into the specified format (JSON, XML, etc.).

### Supported Web Services
Web services and APIs supported by **OpenSensorHub** include common OGC standard APIs:
- Connected Systems API
- SensorThings API
- Sensor Observation Service
- Sensor Planning Service