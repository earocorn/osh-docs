---
title: Client Requests
sidebar_position: 1
---

## Connected Systems API
**OSHConnect-JS** includes helper classes/methods to query resources from a **Connected Systems API**.

Each class used by the **OSHConnect-JS** interface for interacting with a Connected Systems API server stems from a `ConnectedSystemsApi` class.

This class acts as a tool for querying JSON resources from a Connected Systems API.

The following sections on this page will walk through examples of how to use each client request.
I encourage you to read the linked documentation for each section to see available methods.
## Configuration
All classes derivative of `ConnectedSystemsApi` (all classes below) require configuration
to be able to connect with the server hosting the Connected Systems API.

See <a href="/reference/jsdoc/ConnectedSystemsApi.html" target="_blank">API Reference</a>

The classes require a `networkProperties` object with a few fields to configure:
- **endpointUrl** - Endpoint of Connected Systems API server (e.g. `localhost:8181/sensorhub/api`)
- **tls** - `true` or `false` (for HTTPs/HTTP)
- **connectorOpts** - Authentication configuration
  - **username**
  - **password**
- **streamProtocol** (Optional) - Default is `'ws'`, but `'mqtt'` is also available
- **mqttOpts** (Optional) - MQTT-specific configuration
  - **prefix**
  - **endpointUrl**

Example configuration:
```js
const networkProperties = {
    endpointUrl: `localhost:8181/sensorhub/api`,
    tls: false,
    connectorOpts: {
        username: 'admin',
        password: 'admin',
    }
  };
```

## Systems
See <a href="/reference/jsdoc/Systems.html" target="_blank">API Reference</a>

Retrieving systems from the API is as easy as creating a `Systems` object,
making sure you have the proper configuration.

For the sake of simplicity, all the following examples will use the `networkProperties` object defined above.
```js
import Systems from 'osh-js/source/core/consysapi/system/Systems';
const systems = new Systems(networkProperties);
```
Retrieving all systems:
```js
// Get paginated collection of systems
const systemsCollection = await systems.searchSystems(/*System Filter*/undefined, /*page size*/100);
// Get first page (list) of systems
const firstSystems = await systemsCollection.nextPage();
// Or get all pages
let allSystems = [];
while (systemsCollection.hasNext()) {
    const currSystems = await systemsCollection.nextPage();
    allSystems.push(currSystems);
}
```
Retrieving a system by its `id`:
```js
const system522 = systems.getSystemById("sys522");
```
### SystemFilter
See <a href="/reference/jsdoc/SystemFilter.html" target="_blank">API Reference</a>
`Filter` objects are used to return a filtered list of the queried resource.

All filters should correspond with the query parameters defined in the **OGC API - Connected Systems** specification, which can be found [here](https://ogcapi.ogc.org/connectedsystems/)

Using `SystemFilter` to search for systems:
```js
// Get systems with matching id and use text query parameter
systems.searchSystems(new SystemFilter({ 
  id: "sys522",
  q: "weather"
}), 100);
```
### System
See <a href="/reference/jsdoc/System.html" target="_blank">API Reference</a>

`System` objects should be retrieved from another **OSHConnect-JS** client request.

Example of some queries from a system:
```js
// System retrieved from previous example
const system = firstSystems[0];
// Each of these yields collections of the corresponding type
system.searchSubSystems(); // /api/system/{sysId}/subsystems
system.searchDataStreams(); // /api/systems/{sysId}/datastreams
system.searchSamplingFeatures(); // /api/systems/{sysId}/samplingFeatures
system.searchControlStreams(); // /api/systems/{sysId}/controlstreams
```
:::info
All single resources (`System`, `DataStream`, `Observation`, etc.) will include 
all response fields according to **OGC API - Connected Systems** specification.
These are directly accessible like so: `system.id`, `datastream.outputName`, etc.
:::
## DataStreams
See <a href="/reference/jsdoc/DataStreams.html" target="_blank">API Reference</a>

Querying from all `DataStreams` on server:
```js
const datastreams = new DataStreams(networkProperties);
datastreams.searchDataStreams(/*DataStreamFilter, pageSize*/);
datastreams.getDataStreamById("someDsId123");
```
### DataStreamFilter
See <a href="/reference/jsdoc/DataStreamFilter.html" target="_blank">API Reference</a>
### DataStream
See <a href="/reference/jsdoc/DataStream.html" target="_blank">API Reference</a>

Querying a `DataStream`'s `Observations` and schema:
```js
// Observations
datastream.searchObservations(/*ObservationFilter, pageSize*/);
// DataStream schema
datastream.getSchema();
```

`DataStream` objects can also be used to directly listen for new `Observations`:
```js
datastream.streamObservations(/*ObservationFilter*/undefined, (datablock) => {
    console.log("Data received! ", datablock);
})
```
### DataStream to Data Source
`DataStreams` can also be indirectly converted into `ConSysApi` data source objects:
```js
const datasource = new ConSysApi(datastream.properties.name, {
    protocol: datastream.networkProperties.streamProtocol,
    endpointUrl: datastream.networkProperties.endpointUrl,
    resource: `/datastreams/${datastream.properties.id}/observations`,
    mode: Mode.REAL_TIME,
    tls: false,
    responseFormat: 'application/swe+json',
    connectorOpts: datastream.networkProperties.connectorOpts
});
```
## Observations
See <a href="/reference/jsdoc/Observations.html" target="_blank">API Reference</a>

Querying from all observations on server:
```js
const observations = new Observations(networkProperties);
observations.searchObservations(/*ObservationFilter, pageSize*/);
```
### ObservationFilter
See <a href="/reference/jsdoc/ObservationFilter.html" target="_blank">API Reference</a>
### Observation
See <a href="/reference/jsdoc/Observation.html" target="_blank">API Reference</a>

`Observation` objects are JSON objects described by the **OGC API - Connected Systems** specification.
```js
console.log(observation.result);
console.log(observation.resultTime);
console.log(observation.id);
```
## SamplingFeatures
See <a href="/reference/jsdoc/SamplingFeatures.html" target="_blank">API Reference</a>

Querying from all `SamplingFeatures` on server:
```js
const features = new SamplingFeatures(networkProperties);
features.searchSamplingFeatures(/*SamplingFeatureFilter, pageSize*/);
features.getSamplingFeatureById("someFeatureId123");
```
### SamplingFeatureFilter
See <a href="/reference/jsdoc/SamplingFeatureFilter.html" target="_blank">API Reference</a>
### SamplingFeature
See <a href="/reference/jsdoc/SamplingFeature.html" target="_blank">API Reference</a>

`SamplingFeature` objects are JSON objects described by the **OGC API - Connected Systems** specification.
```js
console.log(feature.type);
console.log(feature.properties);
console.log(feature.geometry);
```
## ControlStreams
See <a href="/reference/jsdoc/ControlStreams.html" target="_blank">API Reference</a>

Querying from all `ControlStreams` on server:
```js
const controlstreams = new ControlStreams(networkProperties);
controlstreams.searchControlStreams(/*ControlStreamFilter, pageSize*/)
controlstreams.getControlStreamById("someControlStreamId123");
```
### ControlStreamFilter
See <a href="/reference/jsdoc/ControlStreamFilter.html" target="_blank">API Reference</a>
### ControlStream
See <a href="/reference/jsdoc/ControlStream.html" target="_blank">API Reference</a>

`ControlStream` objects can be used to search for commands, stream commands, and even send commands.
```js
// Querying commands on a control stream
controlstream.searchCommands(/*CommandFilter, pageSize*/);
// Streaming commands
controlstream.streamCommands(/*CommandFilter*/undefined, (commandData) => {
    console.info("Command has been received! ", commandData);
});
// Posting command to control stream
controlstream.postCommand({
  parameters: {
    pan: 10,
    tilt: 5,
    zoom: 1
  }
});
```
## Commands
See <a href="/reference/jsdoc/Commands.html" target="_blank">API Reference</a>

Querying from all commands on server:
```js
const commands = new Commands(networkProperties);
commands.searchCommands(/*CommandFilter, pageSize*/);
```
### CommandFilter
See <a href="/reference/jsdoc/CommandFilter.html" target="_blank">API Reference</a>
### Command
See <a href="/reference/jsdoc/Command.html" target="_blank">API Reference</a>

`Command` objects can be used to retrieve associated status reports of that command.
```js
command.searchStatus(/*CommandFilter, pageSize*/);
command.streamStatus(/*CommandFilter*/undefined, (status) => {
   console.info("New command status report received! ", status); 
});
```