---
title: SensorML & SWE Common
sidebar_position: 5
toc_max_heading_level: 5
---

**OpenSensorHub** uses standards from **OGC Sensor Web Enablement** to represent static metadata, such as **sensor/process descriptions**,
as well as dynamic data such as **data/command stream schemas**.

The key SWE standards used in OSH are:
- **SensorML** (Sensor Model Language) - For describing sensors, systems, processes, deployments, features of interest, etc.
- **SWE Common Data Model** - For encoding data structures, and defining observation formats

## SMLHelper
`SMLHelper` is a robust utility class for creating SensorML descriptions and SWE Common data models (because it is an extension of `SWEHelper`).

Examples are provided below, but please see the `SMLHelper` 
<a href="/reference/javadoc/org/vast/sensorML/SMLHelper.html" target="_blank">API Reference</a> 
and `SWEHelper`<a href="/reference/javadoc/org/vast/swe/SWEHelper.html" target="_blank">API Reference</a>
for a more in-depth look.

### Examples
#### SWE Common Data Modeling
Basic `DataRecord` with a few components:
```java
SMLHelper helper = new SMLHelper();
DataRecord record = helper.createRecord()
    .addField("time", helper.createTime()
            .asSamplingTimeIsoUTC()
            .build())
    .addField("textField", helper.createText()
            .label("Text Field")
            .definition("https://ontologyrepo.org/TextField1")
            .description("Description for this text field")
            .build())
    .addField("speed", helper.createQuantity()
            .definition("https://ontologyrepo.org/Speed")
            .uom("m/s")
            .addAllowedInterval(0.0, 30.0)
            .build())
    .build();
```
Fixed-size `DataArray`:
```java
SMLHelper helper = new SMLHelper();
DataArray fixedSizeArray = helper.createArray()
    .withFixedSize(100)
    .withElement("sample", helper.createQuantity())
    .build();
```
Variable-sized `DataArray`:
```java
SMLHelper helper = new SMLHelper();
DataRecord recWithVarSizeArray = helper.createRecord()
    .addField("time", helper.createTime()
            .asSamplingTimeIsoUTC()
            .build())
    .addField("numItems", helper.createCount()
        .definition(SWEConstants.DEF_NUM_POINTS)
        .id("NUM_ITEMS_ID")
        .label("Number of Items")
        .build())
    .addField("items", helper.createArray()
        .withVariableSize("NUM_ITEMS_ID")
        .withElement("item", helper.createText())
        .build())
    .build();
```

#### Sensor Description
Editing an existing `PhysicalSystem`:
```java
PhysicalSystem sensorDescription = new PhysicalSystemImpl();
SMLHelper helper = new SMLHelper();
helper.edit(sensorDescription)
        .description("Description of the sensor")
        .name("Test Sensor")
        .addIdentifier(helper.identifiers.serialNumber("123456789"))
        .addCharacteristicList("operating_specs", helper.characteristics.operatingCharacteristics()
                .add("voltage", helper.characteristics.operatingVoltageRange(100.0, 250.0, "V"))
                .add("temperature", helper.conditions.temperatureRange(-20.0, 90.0, "Cel")))
        .build();
```
Creating a new `PhysicalSystem`:
```java
SMLHelper helper = new SMLHelper();
// Building new system
PhysicalSystem newSystem = helper.createPhysicalSystem()
        .addIdentifier(helper.identifiers.author("John Doe"))
        .build();
// Wrapping SensorML system into OSH core system model
SystemWrapper systemWrapper = new SystemWrapper(newSystem);
```
#### SensorML Process Descriptions
`SimpleProcess` example:
```java
SMLHelper helper = new SMLHelper();
SimpleProcess process = helper.createSimpleProcess()
    .uniqueID("urn:osh:process:simple1")
    .name("My Simple Process")
    .description("A description of my simple process")
    .addInput("inputData", record)
    .addOutput("outputData", record)
    .addParameter("paramData", record)
    .build();
```
`AggregateProcess` example:
```java
// Creating a data source based on OSH system UID
StreamDataSource dataSource = new StreamDataSource();
dataSource.getParameterList()
        .getComponent(StreamDataSource.PRODUCER_URI_PARAM)
        .getData()
        .setStringValue("urn:osh:sensor:simulated:001");

// Creating a command sink based on OSH system UID
CommandStreamSink commandSink = new CommandStreamSink();
commandSink.getParameterList()
        .getComponent(CommandStreamSink.SYSTEM_UID_PARAM)
        .getData()
        .setStringValue("urn:osh:sensor:robot:001");
commandSink.getParameterList()
        .getComponent(CommandStreamSink.OUTPUT_NAME_PARAM)
        .getData()
        .setStringValue("moveForward");

// Building process chain (AggregateProcess)
AggregateProcess processChain = helper.createAggregateProcess()
        .uniqueID("urn:osh:process:chain1")
        .name("My Process Chain")
        .description("A description of my process chain")
        .addOutput("outputData", record)
        .addComponent("simpleProcess", process) // Adding our atomic process(es)
        .addComponent("dataSource", (AbstractProcess) dataSource) // Adding OSH data source
        .addComponent("commandSink", (AbstractProcess) commandSink) // Adding OSH command sink
        .build();
// Add connections
processChain.addConnection(new LinkImpl("dataSource/outputs/1", "simpleProcess/inputs/inputData"));
processChain.addConnection(new LinkImpl("simpleProcess/outputs/outputData", "commandSink/inputs/moveForward"));
processChain.addConnection(new LinkImpl("simpleProcess/outputs/outputData", "outputs/outputData"));
```
:::tip
The above code is **extremely** useful in programmatically 
building out process descriptions to be used in **SensorML Processing**.
:::
## Utils
`SMLUtils` provides utility methods for converting SensorML descriptions to/from JSON and XML representations, 
as well as working with executable processes, and verifying the integrity of processes.

Example using `SMLUtils` along with `SMLJsonBindings`.
```java
// Reading XML SensorML description from System.in
SMLUtils smlUtils = new SMLUtils();
AbstractProcess description = smlUtils.readProcess(System.in);

// Printing XML SensorML description to System.out
smlUtils.writeProcess(System.out, processChain, true);

// Or using available JSON bindings
SMLJsonBindings jsonBindings = new SMLJsonBindings();
// Reading JSON SensorML description
JsonReader reader = new JsonReader(new InputStreamReader(System.in));
AbstractProcess processFromJson = jsonBindings.readAggregateProcess(reader);

// Printing JSON SensorML description
JsonWriter writer = new JsonWriter(new OutputStreamWriter(System.out));
jsonBindings.writeDescribedObject(writer, processChain);
writer.flush;
```

## Populating Data Arrays
Typically, each time you update a previous `DataComponent`'s `DataBlock`, you can renew the latest record to recreate your `DataBlock`.
```java
DataBlock dataBlock;
if (latestRecord == null) {
    dataBlock = dataRecord.createDataBlock();
} else {
    dataBlock = latestRecord.renew();
}
```
When working with arrays of variable size, this will not work, as the previous `DataBlock` may be a different size.
Instead, the `DataRecord` must be recreated every time. Replace the above lines with the following:
```java
dataRecord = createDataRecord();
DataBlock dataBlock = dataRecord.createDataBlock();
dataRecord.setData(dataBlock);
```
Note that `dataRecord.setData(dataBlock);` must also be called when manipulating arrays.
**Simple array example**
```java
DataRecord createDataRecord() {
    SWEHelper sweFactory = new SWEHelper();
    return sweFactory.createRecord()
            .name(SENSOR_OUTPUT_NAME)
            .label(SENSOR_OUTPUT_LABEL)
            .description(SENSOR_OUTPUT_DESCRIPTION)
            .addField("sampleTime", sweFactory.createTime()
                    .asSamplingTimeIsoUTC()
                    .description("Time of data collection"))
            .addField("data", sweFactory.createText())
            .addField("arrayCount", sweFactory.createCount()
                    .id("arrayCountID"))
            .addField("arrayData", sweFactory.createArray()
                    .withVariableSize("arrayCountID")
                    .withElement("arrayElement", sweFactory.createText()))
            .build();
}
```
Above is the `createDataRecord()` method, in which the `DataRecord` is created. `arrayData` is the array,
and it has an element called `arrayElement`. Note that there is also an `arrayCount` field which has an ID set,
and that the array uses that ID: `.withVariableSize("arrayCountID")`

```java
dataRecord = createDataRecord();
DataBlock dataBlock = dataRecord.createDataBlock();
dataRecord.setData(dataBlock);

double timestamp = System.currentTimeMillis() / 1000d;

int index = 0;
int numArrayFields = random.nextInt(4);

// sampleTime
dataBlock.setDoubleValue(index++, timestamp);
// data, a single value not part of the array
dataBlock.setStringValue(index++, "Your data here");
// arrayCount, the number of fields in the array
dataBlock.setIntValue(index++, numArrayFields);

// Once the array count has been set, update the size of the array
// Note: This is necessary to ensure the array is properly sized and must occur after setting the arrayCount
var array = ((DataArrayImpl) dataRecord.getComponent("arrayData"));
array.updateSize();

// Set values for each field in the array
for (int i = 0; i < numArrayFields; i++) {
    dataBlock.setStringValue(index++, "Array data " + i);
}
```