---
title: Usage
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Instantiating OSHConnect
The intended method of interacting with OpenSensorHub is through the main OSHConnect class. 
To do this you must first create an instance of OSHConnect:
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
from oshconnect.oshconnectapi import OSHConnect, TemporalModes

osh_connect = OSHConnect(name='OSHConnect', playback_mode=TemporalModes.REAL_TIME)
```
</TabItem>
  <TabItem value="java" label="Java">
```java
OSHConnect oshConnect = new OSHConnect("OSHConnect");
```
</TabItem>
</Tabs>
:::info
The name parameter is optional, but can be useful for debugging purposes.
:::
## Adding a Node
The next step is to add a Node to the OSHConnect instance. 
A Node is a representation of a server that you want to connect to. 
The OSHConnect instance can support multiple Nodes at once.
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
from oshconnect.oshconnectapi import OSHConnect, TemporalModes
from oshconnect.osh_connect_datamodels import Node

connect_app = OSHConnect(name='OSHConnect', playback_mode=TemporalModes.REAL_TIME)
node = Node(protocol='http', address="localhost", port=8585, username="test", password="test")
connect_app.add_node(node)
```
</TabItem>
  <TabItem value="java" label="Java">
```java
OSHNode node = oshConnect.createNode("localhost:8181/sensorhub", true, "admin", "admin");
```
</TabItem>
</Tabs>

## System Discovery
Once you have added a Node to the OSHConnect instance, you can discover the systems that are available on that Node. 
This is done by calling the system discovery method on the OSHConnect instance.
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
osh_connect.discover_systems()
```
</TabItem>
  <TabItem value="java" label="Java">
```java
oshConnect.discoverSystems();
```
</TabItem>
</Tabs>
## DataStream Discovery
Once you have discovered the systems that are available on a Node, you can discover the datastreams that are available to those systems. 
This is done by calling the datastream discovery method on the OSHConnect instance.
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
osh_connect.discover_datastreams()
```
</TabItem>
  <TabItem value="java" label="Java">
```java
oshConnect.discoverDatastreams();
```
</TabItem>
</Tabs>
## Retrieving Observations
TODO

## Resource Insertion
Other use cases of the OSHConnect library may involve inserting new resources into OpenSensorHub or another Connected Systems API server.
### Systems
The first major step in a common workflow is to add a new system to the OSH Connect instance.
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
from oshconnect.osh_connect_datamodels import System

new_system = app.insert_system(
    System(name="Test System", description="Test System Description", label="Test System",
           urn="urn:system:test"), node)
```
</TabItem>
  <TabItem value="java" label="Java">
```java

```
</TabItem>
</Tabs>
### DataStreams
Once you have a System object, you can add a new datastream to it. 
This is one of the more complex operations in the library as the schema is very flexible by design. 
Luckily, the schemas are validated by the underlying data models, 
so you can be sure that your datastream is valid before inserting it.
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
from oshconnect.osh_connect_datamodels import Datastream

datarecord_schema = DataRecordSchema(label='Example Data Record', description='Example Data Record Description',
                                     definition='www.test.org/records/example-datarecord', fields=[])
time_schema = TimeSchema(label="Timestamp", definition="http://test.com/Time", name="timestamp",
                         uom=URI(href="http://test.com/TimeUOM"))
continuous_value_field = QuantitySchema(name='continuous-value-distance', label='Continuous Value Distance',
                                        description='Continuous Value Description',
                                        definition='www.test.org/fields/continuous-value',
                                        uom=UCUMCode(code='m', label='meters'))
example_text_field = TextSchema(name='example-text-field', label='Example Text Field', definition='www.test.org/fields/example-text-field')
# add the fields to the datarecord schema, these can also be added added to the datarecord when it is created
datarecord_schema.fields.append(time_schema)   # TimeSchema is required to be the first field in the datarecord for OSH
datarecord_schema.fields.append(continuous_value_field)
datarecord_schema.fields.append(example_text_field)
# Add the datastream to the system
datastream = new_system.add_insert_datastream(datarecord_schema)
```
</TabItem>
  <TabItem value="java" label="Java">
```java

```
</TabItem>
</Tabs>
:::info
A TimeSchema is required to be the first field in the DataRecordSchema for OSH.
:::
### Observations
Upon successfully adding a new datastream to a system, it is now possible to send observation data to the node.
<Tabs groupId="oshconnect">
  <TabItem value="python" label="Python">
```python
datastream.insert_observation_dict({
    "resultTime": TimeInstant.now_as_time_instant().get_iso_time(),     # resultTime is required for OSH
    "phenomenonTime": TimeInstant.now_as_time_instant().get_iso_time(), # phenomenonTime is required for OSH
    "result": {
        "timestamp": TimeInstant.now_as_time_instant().epoch_time,
        "continuous-value-distance": 1.0,
        "example-text-field": "Here is some text"
    }
})
```
</TabItem>
  <TabItem value="java" label="Java">
```java

```
</TabItem>
</Tabs>
:::info
The `resultTime` and `phenomenonTime` fields are required for OSH.  
You’ll notice that they are referred to by their name field in the schema as it is the “machine” name of the output.
:::