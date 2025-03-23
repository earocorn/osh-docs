---
title: Connected Systems
sidebar_position: 2
---
# Connected Systems

## What is OGC API - Connected Systems?
OGC API - Connected Systems, also known as the Connected Systems API, is built upon standardized web formats such as GeoJSON as well as existing OGC information models such as:
- SensorML
- Observations and Measurements (O&M) (now called Observations, Measurements, and Samples)
- SWE Common Data Model
- Semantic Sensor Network Ontology (SOSA/SSN)

## OpenSensorHub and Connected Systems

**OpenSensorHub** has the most supported implementation of OGC API - Connected Systems. The Connected Systems API is the primary means of communication from **OpenSensorHub** node to **OpenSensorHub** node, as well as between some client application and an **OpenSensorHub** node or various nodes.

**OpenSensorHub** nodes are prepackaged with a running implementation of the Connected Systems API, which exposes all sensing systems, actuators, features, etc. on the **OpenSensorHub** node.

## Understanding Parts 1 and 2

### Feature Resources
Part 1 of OGC API - Connected Systems conforms to [OGC API - Features](https://ogcapi.ogc.org/features/).

Resources in Part 1 of the API are used to describe sensing systems, geographic features, both deployments and methodologies of systems, and other domain features.

**Part 1 Feature Resources**
| Resource Name | Description |
| ------------- | ----------- |
| *Systems* | Systems are used to expose meta data about sensors, actuators, samplers, processes, platforms, etc.
| *Subsystems* | Subsystems can be used for complex, hierarchical descriptions of systems. These are *Systems* that are exposed through a sub-collection of a parent *System*.
| *Deployments* | Deployments provide information about the deployment of one or more *Systems* for a specific purpose.
| *Subdeployments* | Subdeployments can be used to describe complex, hierarchical descriptions of deployments. These are *Deployments* that are exposed through a sub-collection of a parent *Deployment*.
| *Procedures* | Procedures provide specifications or methodology implemented by a *System* to accomplish its task(s).
| *Sampling Features* | Sampling Features provide information about a sampling strategy used when observing a *Feature of Interest*. Sampling Features are also used to identify the part of a *Feature of Interest* that is affected by an actuator or process in response to a command.
| *Property Definitions* | Properties specify observable properties, controllable properties, and system properties.

:::tip
The most commonly used Feature Resources you will find as part of an **OpenSensorHub** node are *Systems*, *Subsystems*, and *Sampling Features*.
:::


### Dynamic Data Resources 
Part 2 of OGC API - Connected Systems defines resource types that allow the provision of dynamic data for hardware components and processes which includes data from sensors, platforms, robots, human observers, forecase models, computer simulations, etc. 

The dynamic data resources primarily focus on *Observations* of *DataStreams* and *Commands* of *ControlStreams*.

**Part 2 Dynamic Data**
| Resource Name | Description |
| ------------- | ----------- |
| *DataStreams* | A DataStream represents data produced by an observing *System* feature. DataStreams expose real-time and archived data.
| *Observations* | Observations are strictly associated to *DataStreams* as a single instance of an observation recorded from an observing *System*, described by the Observation's *DataStream*.
| *ControlStreams* | A ControlStream represents a control channel used to change the state of a Feature Resource, such as a *System*. ControlStreams represent real-time control channels, but also expose archived commands.
| *Command* | Commands are strictly associated to *ControlStreams*, representing a command that has been sent to its *ControlStream*, to task the *ControlStream's* corresponding Feature Resource.
| *CommandStatus* | CommandStatus represents a status report describing the status of a *Command* at any point in time. Synchronously executed *Commands* will report `COMPLETED`, `REJECTED`, or `FAILED`.
| *SystemEvents* | SystemEvents are used to notify users of changes to one or more *Systems*

## OSHConnect

Now that we have covered the basics of OGC API - Connected Systems, we can revisit the idea of **OSHConnect**.

Again, **OSHConnect** is a family of client libraries that provides support for interfacing with an **OpenSensorHub** instance or instances via the Connected Systems API. Therefore, **OSHConnect** provides client tools and helper methods to access *Systems*, *DataStreams* / *Observations*, *ControlStreams* / *Commands*, while giving you the flexibility to subscribe to real-time streams or retrieve archived data.

**OSHConnect** also provides helper methods to create Feature and Dynamic Data Resources that you can push to **OpenSensorHub** nodes via the Connected Systems RESTful interface.

## Hands-on Guide and Examples

These examples will be using the **GeoRobotix** test node, which is an **OpenSensorHub** node used for testing and client examples.

The Connected Systems API for this test server is accessible at 

[`
https://api.georobotix.io/ogc/t18/api
`](https://api.georobotix.io/ogc/t18/api)

:::tip
**OpenSensorHub** offers an easily navigable web interface to explore the Connected Systems API. Try visiting the API in your browser!
:::

When querying Feature Resources such as *Systems* or *Sampling Features*, we can ask for these resources in JSON, encoded with SensorML or GeoJSON.

Dynamic Data Resources are modeled with the [SWE Common Data Model](https://www.ogc.org/publications/standard/swecommon/#:~:text=The%20Sensor%20Web%20Enablement%20(SWE,Web%20Enablement%20(SWE)%20framework.))

### Systems

Sending an `HTTP` `GET` request to the following endpoint will yield us a list of all systems exposed through the API.

[`https://api.georobotix.io/ogc/t18/api/systems`](https://api.georobotix.io/ogc/t18/api/systems)

The request will return the following:

```json
{
  "items": [
    {
      "type": "Feature",
      "id": "b2rju765gua3c",
      "properties": {
        "uid": "urn:osh:sensor:uas:predator001-RT",
        "featureType": "http://www.w3.org/ns/ssn/System",
        "name": "Predator UAV (MISB simulated RT)",
        "validTime": [
          "2023-05-14T15:22:00Z",
          "now"
        ]
      }
    },
    {
      "type": "Feature",
      "id": "kk8p16lbvqvdo",
      "properties": {
        "uid": "urn:osh:system:uas:predator001",
        "featureType": "http://www.w3.org/ns/ssn/System",
        "name": "Predator UAS (data loader)",
        "validTime": [
          "2022-06-08T21:00:00Z",
          "now"
        ]
      }
    },
  ]
}
```

As you can see, each system has an `id` property. This identifier is used to access *System* descriptions, along with associated *DataStreams* and *ControlStreams*.

| Request | Description |
| ------- | ----------- |
| `/api/systems/{systemId}` | *System* Description
| `/api/systems/{systemId}/datastreams` | *System*'s associated *DataStreams*
| `/api/systems/{systemId}/controlstreams` | *System*'s associated *ControlStreams*

```http
/api/systems/{systemId}
```

Using the first system as an example:

[`https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c`](https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c)

Response:

```json
{
  "type": "Feature",
  "id": "b2rju765gua3c",
  "properties": {
    "uid": "urn:osh:sensor:uas:predator001-RT",
    "featureType": "http://www.w3.org/ns/ssn/System",
    "name": "Predator UAV (MISB simulated RT)",
    "validTime": [
      "2023-05-14T15:22:00Z",
      "now"
    ]
  },
  "links": [
    {
      "rel": "details",
      "title": "Detailed system specsheet in SensorML format",
      "href": "https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c/details"
    },
    {
      "rel": "members",
      "title": "List of subsystems",
      "href": "https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c/members"
    },
    {
      "rel": "datastreams",
      "title": "List of system datastreams",
      "href": "https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c/datastreams"
    },
    {
      "rel": "fois",
      "title": "List of system sampling features",
      "href": "https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c/featuresOfInterest"
    }
  ]
}
```

:::tip
This response also yields us links to other related *System* resources such as *Subsystems*, *DataStreams*, and *SamplingFeatures*.
:::

### DataStreams

*DataStream* resources can be queried at the collection endpoint for *DataStreams*, or through referencing a particular *System*'s *DataStreams*.

```http
/api/datastreams
```
and
```http
/api/systems/{systemId}/datastreams
```

We can use our previous *System* as an example of how to query and select a particular *DataStream*.

[`https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c/datastreams`](https://api.georobotix.io/ogc/t18/api/systems/b2rju765gua3c/datastreams)

Response:
