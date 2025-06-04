---
title: Driver Template
sidebar_position: 2
toc_max_heading_level: 5
---

# Driver Development
This guide will show example implementation from the `osh-node-dev-template` repository on **OpenSensorHub**'s public GitHub.
Please refer to the [*Development Template*](../dev-template.md) page for setting up this repository, and learning more about what is included in the template.

The example implementation will be under `osh-node-dev-template/sensors/sensorhub-driver-template`.

This guide will cover all parts of the `sensorhub-driver-template`, broken down into smaller subsections to explain the code.
## Driver Components
In the Java implementation for a *Sensor Driver*, a few Java classes are required.


| File                   | Qty  | Purpose                                                                                                                                                                                          |
|------------------------|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Activator              | 1    | Exposes module for ability to be bundled in an OSGi bundle.                                                                                                                                      |
| Descriptor             | 1    | Provides entrypoint (module class) and module config file for this module.                                                                                                                       |
| Config                 | 1    | Configuration used for sensor driver/module. This can include connection settings, descriptive information, etc.                                                                                 |
| Sensor/Driver          | 1    | Entrypoint or "main" class for your driver. Includes setup/connection, and a way to interface with your sensor.                                                                                  |
| Output                 | 1..* | Class used to define output data structures and publish sensor observations/outputs to the OSH event bus.                                                                                        |
| Control                | 0..* | Class used to define command data structures and bridge an interface for commanding a sensor/actuator with OSH command interfaces such as the web UI or other services (Connected Systems, SOS). |
| META-INF/services file | 1    | File used for exposing the driver's **Descriptor** class to OSH                                                                                                                                  |

## Activator Class
`Activator` does not require any implementation. 
The existence of the class exposes it with the ability to build as an OSGi bundle.

```java title="sensorhub-driver-template/src/main/java/com/sample/impl/sensor/drivername/Activator.java"
package com.sample.impl.sensor.drivername;

import org.sensorhub.utils.OshBundleActivator;

@SuppressWarnings("unused")
public class Activator extends OshBundleActivator {
}
```
### OSGi Task in Gradle
For a module to successfully build with OSGi, the path to this `Activator` class must be correct in the module's `build.gradle` under the `osgi` task.

```gradle title="sensorhub-driver-template/build.gradle"
...
osgi {
    manifest {
        attributes ('Bundle-Vendor': 'Botts Inc')
        attributes ('Bundle-Activator': 'com.sample.impl.sensor.drivername.Activator')
    }
}
...
```
:::info
It is not required, but highly recommended to include the `osgi` task for a build.
If you do not wish to use OSGi, you can simply build the OSH node by using 

```gradle
./gradlew build -x test -x osgi
```
This will exclude tests and OSGi from the build process.
:::

## Descriptor Class
```java title="sensorhub-driver-template/src/main/java/com/sample/impl/sensor/drivername/Descriptor.java"
package com.sample.impl.sensor.drivername;

import org.sensorhub.api.module.IModule;
import org.sensorhub.api.module.IModuleProvider;
import org.sensorhub.api.module.ModuleConfig;
import org.sensorhub.impl.module.JarModuleProvider;

public class Descriptor extends JarModuleProvider implements IModuleProvider {
    @Override
    public Class<? extends IModule<?>> getModuleClass() {
        return Sensor.class;
    }

    @Override
    public Class<? extends ModuleConfig> getModuleConfigClass() {
        return Config.class;
    }
}
```
The module descriptor simplifies the act of the module telling **OpenSensorHub** where to start and what configuration is needed.
### Module Class
The module class is your main `Sensor` or `Driver` class that implements `IModule`.
Exposing this module class allows **OpenSensorHub** to create new instances of this module via core APIs used by the Admin UI and other services.
### Module Config Class
The module config class is the main `Config` class for this module.
Exposing the config class allows **OpenSensorHub** to create and link new instances of a configuration to be used with newly created modules.
## Config Class
```java title="sensorhub-driver-template/src/main/java/com/sample/impl/sensor/drivername/Config.java"
package com.sample.impl.sensor.drivername;

import org.sensorhub.api.config.DisplayInfo;
import org.sensorhub.api.sensor.SensorConfig;

public class Config extends SensorConfig {
    
    // The unique identifier for the configured sensor (or sensor platform).
    @DisplayInfo.Required
    @DisplayInfo(desc = "Serial number or unique identifier")
    public String serialNumber = "sensor001";
}
```
### DisplayInfo
The `@DisplayInfo` annotation allows you to specify additional information shown in the Admin UI, as well as additional functionality to populate or validate a field.
### Fields
All `public` fields will be exposed in configuration shown in the Admin UI, as well as the node's `config.json`.
## Sensor/Driver Class
```java title="sensorhub-driver-template/src/main/java/com/sample/impl/sensor/drivername/Sensor.java"
package com.sample.impl.sensor.drivername;

import org.sensorhub.api.common.SensorHubException;
import org.sensorhub.impl.sensor.AbstractSensorModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Driver implementation for the sensor.
 * <p>
 * This class is responsible for providing sensor information, managing output registration,
 * and performing initialization and shutdown for the driver and its outputs.
 */
public class Sensor extends AbstractSensorModule<Config> {
    static final String UID_PREFIX = "urn:osh:template_driver:";
    static final String XML_PREFIX = "TEMPLATE_DRIVER_";

    private static final Logger logger = LoggerFactory.getLogger(Sensor.class);

    Output output;
    Thread processingThread;
    volatile boolean doProcessing = true;

    @Override
    public void doInit() throws SensorHubException {
        super.doInit();

        // Generate identifiers
        generateUniqueID(UID_PREFIX, config.serialNumber);
        generateXmlID(XML_PREFIX, config.serialNumber);

        // Create and initialize output
        output = new Output(this);
        addOutput(output, false);
        output.doInit();
    }

    @Override
    public void doStart() throws SensorHubException {
        super.doStart();
        startProcessing();
    }

    @Override
    public void doStop() throws SensorHubException {
        super.doStop();
        stopProcessing();
    }

    @Override
    public boolean isConnected() {
        return processingThread != null && processingThread.isAlive();
    }

    /**
     * Starts the data processing thread.
     * <p>
     * This method simulates sensor data collection and processing by generating data samples at regular intervals.
     */
    public void startProcessing() {
        doProcessing = true;

        processingThread = new Thread(() -> {
            while (doProcessing) {
                // Simulate data collection and processing
                output.setData(System.currentTimeMillis(), "Sample Data");

                // Simulate a delay between data samples
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        processingThread.start();
    }

    /**
     * Signals the processing thread to stop.
     */
    public void stopProcessing() {
        doProcessing = false;
    }
}
```
The `Sensor` or `Driver` class acts as the "main" class of this entire module.
This is required to include logic for changing the state of the module (`doInit()`, `doStart()`, `doStop()`), 
determining connection status (`isConnected()`), and methods for connecting and interfacing with the sensor.
### State-Change Methods
State change methods are necessary for **OpenSensorHub** to manage the lifecycle of a module.
They are necessary in a *Sensor Driver* to facilitate creation of output/command structures and to connect or disconnect from a sensor.
#### `doInit()`
The `doInit()` method is required to initialize the *Sensor Driver*.
This is used to verify a connection to the sensor and add data outputs and commands to this driver.
At this stage in the driver lifecycle, the driver's configuration should be complete and ready, 
so, this is where we would use values from `Config` to set up the *Sensor Driver*.

The `AbstractSensorModule` class which `Sensor` extends contains helper methods for adding outputs/controls, and generating IDs for the driver (highlighted below).
```java
@Override
    public void doInit() throws SensorHubException {
        super.doInit();

        // Generate identifiers
    // highlight-next-line
        generateUniqueID(UID_PREFIX, config.serialNumber);
    // highlight-next-line
        generateXmlID(XML_PREFIX, config.serialNumber);

        // Create and initialize output
        output = new Output(this);
        // highlight-next-line
        addOutput(output, false);
        output.doInit();
    }
```
#### `doStart()`
Typically, the `doStart()` method will create a connection to the sensor, and begin the publishing of outputs from the physical sensor to the OSH event bus.
As you can see below, the processing of (simulated) data starts with a `startProcessing()` method.
```java
@Override
public void doStart() throws SensorHubException {
    super.doStart();
    startProcessing();
}
```
#### `doStop()`
Opposite of `doStart()`, the `doStop()` method is used to stop the processing of data and close the connection to the sensor.
```java
@Override
public void doStop() throws SensorHubException {
    super.doStop();
    stopProcessing();
}
```
### Other Methods
#### Connection Status
The `isConnected()` method allows **OpenSensorHub** to have an easy way of determining the status of the connection to the sensor.
Drivers will typically have a main thread or client instance for interfacing with the sensor.
It is recommended to keep the implementation of this method simple.
```java
@Override
public boolean isConnected() {
    return processingThread != null && processingThread.isAlive();
}
```
#### Interacting with Sensor
Methods should be created as needed for interfacing with a physical sensor.

Common methods are for connecting to a sensor, retrieving data from a sensor, or sending a command to a sensor/actuator.
These low-level methods for interfacing directly with a sensor are crucial for wrapping OSH data outputs and commands.

In this driver template, you can see that the data processing is done through a basic loop to continuously update an `Output`.
When creating a real driver, you may use a thread to continuously poll data from the sensor, or simply subscribe to a data stream coming from the sensor.
```java
public void startProcessing() {
    doProcessing = true;

    processingThread = new Thread(() -> {
        while (doProcessing) {
            // Simulate data collection and processing
            output.setData(System.currentTimeMillis(), "Sample Data");

            // Simulate a delay between data samples
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    });
    processingThread.start();
}
```
Method to stop simulated data processing.
```java
public void stopProcessing() {
    doProcessing = false;
}
```
## Output Class(es)
A sensor data output must contain the SWE Common Data Model for the output, 
a default encoding for the output, 
an average sampling period, 
and a method for populating and publishing data to the event bus.

It is common to create an initialization method for outputs to create the data structure and encoding.
```java title="sensorhub-driver-template/src/main/java/com/sample/impl/sensor/drivername/Output.java"
package com.sample.impl.sensor.drivername;

import net.opengis.swe.v20.DataBlock;
import net.opengis.swe.v20.DataComponent;
import net.opengis.swe.v20.DataEncoding;
import net.opengis.swe.v20.DataRecord;
import org.sensorhub.api.data.DataEvent;
import org.sensorhub.impl.sensor.AbstractSensorOutput;
import org.vast.swe.helper.GeoPosHelper;

import java.util.ArrayList;

public class Output extends AbstractSensorOutput<Sensor> {
    static final String SENSOR_OUTPUT_NAME = "SensorOutput";
    static final String SENSOR_OUTPUT_LABEL = "Sensor Output";
    static final String SENSOR_OUTPUT_DESCRIPTION = "Sensor output data";

    private static final int MAX_NUM_TIMING_SAMPLES = 10;

    private final ArrayList<Double> intervalHistogram = new ArrayList<>(MAX_NUM_TIMING_SAMPLES);
    private final Object histogramLock = new Object();
    private final Object processingLock = new Object();

    private DataRecord dataRecord;
    private DataEncoding dataEncoding;

    /**
     * Creates a new output for the sensor driver.
     *
     * @param parentSensor Sensor driver providing this output.
     */
    Output(Sensor parentSensor) {
        super(SENSOR_OUTPUT_NAME, parentSensor);
    }

    /**
     * Initializes the data structure for the output, defining the fields, their ordering, and data types.
     */
    void doInit() {
        // Get an instance of SWE Factory suitable to build components
        GeoPosHelper sweFactory = new GeoPosHelper();

        // Create the data record description
        dataRecord = sweFactory.createRecord()
                .name(SENSOR_OUTPUT_NAME)
                .label(SENSOR_OUTPUT_LABEL)
                .description(SENSOR_OUTPUT_DESCRIPTION)
                .addField("sampleTime", sweFactory.createTime()
                        .asSamplingTimeIsoUTC()
                        .label("Sample Time")
                        .description("Time of data collection"))
                .addField("data", sweFactory.createText()
                        .label("Example Data"))
                .build();

        dataEncoding = sweFactory.newTextEncoding(",", "\n");
    }

    @Override
    public DataComponent getRecordDescription() {
        return dataRecord;
    }

    @Override
    public DataEncoding getRecommendedEncoding() {
        return dataEncoding;
    }

    @Override
    public double getAverageSamplingPeriod() {
        synchronized (histogramLock) {
            double sum = 0;
            for (double sample : intervalHistogram)
                sum += sample;

            return sum / intervalHistogram.size();
        }
    }

    /**
     * Sets the data for the output and publishes it.
     */
    public void setData(long timestamp, String data) {
        synchronized (processingLock) {
            DataBlock dataBlock = latestRecord == null ? dataRecord.createDataBlock() : latestRecord.renew();

            updateIntervalHistogram();

            // Populate the data block
            dataBlock.setDoubleValue(0, timestamp / 1000d);
            dataBlock.setStringValue(1, data);

            // Publish the data block
            latestRecord = dataBlock;
            latestRecordTime = timestamp;
            eventHandler.publish(new DataEvent(latestRecordTime, Output.this, dataBlock));
        }
    }

    /**
     * Updates the interval histogram with the time between the latest record and the current time
     * for calculating the average sampling period.
     */
    private void updateIntervalHistogram() {
        synchronized (histogramLock) {
            if (latestRecord != null && latestRecordTime != Long.MIN_VALUE) {
                long interval = System.currentTimeMillis() - latestRecordTime;
                intervalHistogram.add(interval / 1000d);

                if (intervalHistogram.size() > MAX_NUM_TIMING_SAMPLES) {
                    intervalHistogram.remove(0);
                }
            }
        }
    }
}
```
### Data Model & Encoding
The data model for an output should be a single class-level variable of type `DataComponent` (`DataRecord` is an extension of `DataComponent`).
A `DataRecord` can be constructed of multiple `DataComponent`s, those of which include lower-level components such as text, integers, doubles, booleans, arrays, etc.

A default data encoding is required to simplify visualizing and storing this output.
The default data encoding shown below will encode the data as Comma Separated Values (CSV).

The highlighted portion shows the construction of the output's data structure and basic encoding.
The data structure shown in this example has a root-level name of `SensorOutput`, with the fields `sampleTime`, and `data`, along with descriptive information.
```java
static final String SENSOR_OUTPUT_NAME = "SensorOutput";
static final String SENSOR_OUTPUT_LABEL = "Sensor Output";
static final String SENSOR_OUTPUT_DESCRIPTION = "Sensor output data";
private DataRecord dataRecord;
private DataEncoding dataEncoding;

Output(Sensor parentSensor) {
    super(SENSOR_OUTPUT_NAME, parentSensor);
}

void doInit() {
    // Get an instance of SWE Factory suitable to build components
    GeoPosHelper sweFactory = new GeoPosHelper();

    // Create the data record description
    // highlight-start
    dataRecord = sweFactory.createRecord()
            .name(SENSOR_OUTPUT_NAME)
            .label(SENSOR_OUTPUT_LABEL)
            .description(SENSOR_OUTPUT_DESCRIPTION)
            .addField("sampleTime", sweFactory.createTime()
                    .asSamplingTimeIsoUTC()
                    .label("Sample Time")
                    .description("Time of data collection"))
            .addField("data", sweFactory.createText()
                    .label("Example Data"))
            .build();
    
    // Default Comma Separated Value (CSV) encoding
    dataEncoding = sweFactory.newTextEncoding(",", "\n");
    // highlight-end
}

@Override
public DataComponent getRecordDescription() {
    return dataRecord;
}

@Override
public DataEncoding getRecommendedEncoding() {
    return dataEncoding;
}
```
### Sampling Period
If the sampling period of the sensor is configured and/or known, you can simply provide a number in seconds.

In the driver template, a basic algorithm is used for calculating an average based on the rate at which data is published by the `setData()` method.
The `setData()` method publishes data, after calling the `updateIntervalHistogram()` method shown below.
```java
private static final int MAX_NUM_TIMING_SAMPLES = 10;

private final ArrayList<Double> intervalHistogram = new ArrayList<>(MAX_NUM_TIMING_SAMPLES);
private final Object histogramLock = new Object();
private final Object processingLock = new Object();

@Override
public double getAverageSamplingPeriod() {
    synchronized (histogramLock) {
        double sum = 0;
        for (double sample : intervalHistogram)
            sum += sample;

        return sum / intervalHistogram.size();
    }
}

private void updateIntervalHistogram() {
    synchronized (histogramLock) {
        if (latestRecord != null && latestRecordTime != Long.MIN_VALUE) {
            long interval = System.currentTimeMillis() - latestRecordTime;
            intervalHistogram.add(interval / 1000d);

            if (intervalHistogram.size() > MAX_NUM_TIMING_SAMPLES) {
                intervalHistogram.remove(0);
            }
        }
    }
}
```
### Publishing Data
In order to publish data from a sensor, you can create an empty `DataBlock` that takes on the structure of your previously defined `DataRecord`.

For example, our previously created `DataRecord` is a record with the fields `sampleTime` and `data`.
Therefore, the `DataBlock` created from this record will have 2 fields.
This is how elementary data is stored locally in **OpenSensorHub**.

The highlighted portions below show methods of creating an empty `DataBlock`, and populating that `DataBlock` with actual data values.
The last highlighted line shows how to publish this `DataBlock` to the event bus.
```java
public void setData(long timestamp, String data) {
    synchronized (processingLock) {
        // highlight-next-line
        DataBlock dataBlock = latestRecord == null ? dataRecord.createDataBlock() : latestRecord.renew();

        updateIntervalHistogram();

        // Populate the data block
        // highlight-start
        // NOTE: The first parameter is the value's index in the DataBlock
        dataBlock.setDoubleValue(0, timestamp / 1000d);
        dataBlock.setStringValue(1, data);
        // highlight-end
        
        // Publish the data block
        latestRecord = dataBlock;
        latestRecordTime = timestamp;
        // highlight-next-line
        eventHandler.publish(new DataEvent(latestRecordTime, Output.this, dataBlock));
    }
}
```

## Control Class(es)
Although the `sensorhub-driver-template` does not include a `Control` class, we can look at another module from `osh-addons` to see the generic structure of this class.

`Control`s are created and added to a `Sensor` in the same way that `Output`s are added.

This example will be pulled from `osh-addons/sensors/smarthome/sensorhub-driver-domoticz`, as it is a basic implementation of a `Control` class.

This `Control` class will demonstrate an interface for sending a basic command to a Domoticz-compatible smart home switch.
```java
package org.sensorhub.impl.sensor.domoticz;

import java.io.InputStream;
import java.net.URL;
import org.sensorhub.api.command.CommandException;
import org.sensorhub.api.sensor.SensorException;
import org.sensorhub.impl.sensor.AbstractSensorControl;
import org.vast.data.DataChoiceImpl;
import org.vast.swe.SWEHelper;

import net.opengis.swe.v20.DataBlock;
import net.opengis.swe.v20.DataChoice;
import net.opengis.swe.v20.DataComponent;
import net.opengis.swe.v20.Text;


public class DomoticzSwitchControl extends AbstractSensorControl<DomoticzDriver>
{
	DataChoice commandData;

	
	public DomoticzSwitchControl(DomoticzDriver driver)
	{
		super("switchControl", driver);
	}

	
	protected void init()
	{
		SWEHelper sweHelp = new SWEHelper();
		commandData = sweHelp.newDataChoice();
		commandData.setName(getName());
		Text turnOn = sweHelp.newText("http://sensorml.com/ont/swe/property/turnOn", 
        		"On", 
        		"Set switch On");
		commandData.addItem("setOn", turnOn);
		
		Text turnOff = sweHelp.newText("http://sensorml.com/ont/swe/property/turnOff", 
        		"Off", 
        		"Set switch Off");
		commandData.addItem("setOff", turnOff);
		
		Text toggle = sweHelp.newText("http://sensorml.com/ont/swe/property/toggle", 
        		"Toggle", 
        		"Toggle switch");
		commandData.addItem("toggle", toggle);
	}
	
	@Override
	public DataComponent getCommandDescription() {
		return commandData;
	}
    
    @Override
	protected boolean execCommand(DataBlock command) throws CommandException {
    	
    	// associate command data to msg structure definition
        DataChoice commandMsg = (DataChoice) commandData.copy();
        commandMsg.setData(command);
        DataComponent component = ((DataChoiceImpl) commandMsg).getSelectedItem();
        String indexName = component.getName();
        String cmd = "";
        
        if (indexName.equalsIgnoreCase("setOn"))
        	cmd = "On";
        else if (indexName.equalsIgnoreCase("setOff"))
        	cmd = "Off";
        else if (indexName.equalsIgnoreCase("toggle"))
        	cmd = "Toggle";
        
        DataBlock data = component.getData();
        
        String idx = data.getStringValue();
    	
        // send request
        try
        {
        	System.out.println("Setting Switch " + idx + " " + cmd);
			URL optionsURL = new URL(parentSensor.getHostURL() + 
					"type=command&param=switchlight&idx=" + idx + "&switchcmd=" + cmd);
			InputStream is = optionsURL.openStream();
            is.close();
		}
        catch (Exception e)
        {
        	throw new CommandException("Error sending command", e);
		}
        
        return true;
	}
}
```
### Command Data Model
Similar to an `Output` class, a `Control` class will have a defined data structure in the form of a `DataComponent`.
This data structure will be the format of commands sent to this `Control`'s parent sensor/driver class.

The data structure is defined in SWE Common, using the same helper classes and methods used to define the `Output` data structure.

This example shows a `DataChoice` structure, with command choices of `setOn`, `setOff`, and `toggle`.
```java
DataChoice commandData;
	
protected void init()
{
    SWEHelper sweHelp = new SWEHelper();
    commandData = sweHelp.newDataChoice();
    commandData.setName(getName());
    Text turnOn = sweHelp.newText("http://sensorml.com/ont/swe/property/turnOn", 
            "On", 
            "Set switch On");
    commandData.addItem("setOn", turnOn);
    
    Text turnOff = sweHelp.newText("http://sensorml.com/ont/swe/property/turnOff", 
            "Off", 
            "Set switch Off");
    commandData.addItem("setOff", turnOff);
    
    Text toggle = sweHelp.newText("http://sensorml.com/ont/swe/property/toggle", 
            "Toggle", 
            "Toggle switch");
    commandData.addItem("toggle", toggle);
}

@Override
public DataComponent getCommandDescription() {
    return commandData;
}
```
### Command Execution
In the example implementation of the `execCommand()` method shown below,
the selected command is chosen from the `DataBlock` received by the `Control` class,
then the command is sent through an HTTP request to perform the corresponding action.

As you can see, `execCommand()` returns a `boolean` for noting success (true) or failure (false) of the command.
```java
@Override
protected boolean execCommand(DataBlock command) throws CommandException {
    // associate command data to msg structure definition
    DataChoice commandMsg = (DataChoice) commandData.copy();
    commandMsg.setData(command);
    DataComponent component = ((DataChoiceImpl) commandMsg).getSelectedItem();
    String indexName = component.getName();
    String cmd = "";
    
    if (indexName.equalsIgnoreCase("setOn"))
        cmd = "On";
    else if (indexName.equalsIgnoreCase("setOff"))
        cmd = "Off";
    else if (indexName.equalsIgnoreCase("toggle"))
        cmd = "Toggle";
    
    DataBlock data = component.getData();
    
    String idx = data.getStringValue();
    
    // send request
    try
    {
        System.out.println("Setting Switch " + idx + " " + cmd);
        URL optionsURL = new URL(parentSensor.getHostURL() + 
                "type=command&param=switchlight&idx=" + idx + "&switchcmd=" + cmd);
        InputStream is = optionsURL.openStream();
        is.close();
    }
    catch (Exception e)
    {
        throw new CommandException("Error sending command", e);
    }
    
    return true;
}
```

## META-INF/services File
This file located in `/sensorhub-driver-template/src/main/resources/META-INF/services` is required to allow **OpenSensorHub** 
to find the implementation of the driver's `Descriptor` class, which allows OSH to instantiate and use this driver's main module class and config class.

This file should always be named with the classpath of the service being implemented, and contain a list of the implementations of that service.

For example, this driver's `Descriptor` class implements the `IModuleProvider` from `osh-core`, so the file must be named `org.sensorhub.api.module.IModuleProvider`, and the file must contain the line `com.sample.impl.sensor.drivername.Descriptor`.
See below.

```txt title="../resources/META-INF/services/org.sensorhub.api.module.IModuleProvider"
com.sample.impl.sensor.drivername.Descriptor
```