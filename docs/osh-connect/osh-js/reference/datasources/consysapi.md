---
title: Connected Systems
sidebar_position: 3
---

The **Connected Systems API datasource** provides a way to render data in **realtime** mode, **replay** mode, or in **batches**.

## ConSysApi
Instantiating a `ConSysApi` object allows you to connect this data source to `Layer` instances, which can be rendered on `View`s.

Key properties for creating a `ConSysApi` data source:
- **protocol** - The protocol to use when connecting to the service (`ws`, `http`, `mqtt`, etc.)
- **endpointUrl** - The endpoint URL hosting the Connected Systems API (e.g. `localhost:8181/sensorhub/api`)
- **resource** - Resource to connect to (e.g. `/datastreams/{id}/observations`)
- **tls** - `true` or `false`
- **connectorOpts** - Basic authentication
  - **username**
  - **password**
- **responseFormat** - Format to request data (JSON, binary, etc.)
- **mode** - `replay`, `batch`, or `realTime`
- **startTime** - Start time of data (used for replay and batch modes)
- **endTime** - End time of data (used for replay and batch modes)

For a more in-depth look,
see the `ConSysApi` data source <a href="/reference/jsdoc/ConSysApi.html" target="_blank">API Reference</a>

Once a datasource is created, you must open a connection to the data source:
```js
datasource.connect();
```

:::note 
A connection from a single data source is not required when using a 
<a href="/reference/jsdoc/DataSynchronizer.html" target="_blank">DataSynchronizer</a>.
When the `DataSynchronizer` connects, it will handle connections of associated data sources.
:::