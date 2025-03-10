---
title: ❌ Your First Driver
sidebar_position: 7
---

# How to Write an OSH Driver


### Requirements
- Git
- IntelliJ (Reccomended IDE)
- Java 17 SDK
- Gradle 7.1.1+
- osh-node-dev-template 
- osh-addons & osh-core Submodules




### Open Existing Project
- After cloning the osh-node-dev-template open the project in your preferred IDE.


## Updating Version and Distribution Name

### Version Name
![updating package name](../assets/osh/sensor-dev/package-name.png)

1. Open project wide build.gradle
2. Change the version 
3. Refresh Gradle

### Distribution Name
![updating package name](../assets/osh/sensor-dev/package-name.png)

1. Open project wide build.gradle
2. Change 'distributionBaseName'
3. Refresh Gradle
4. Open project wide settings.gradle
5. Change rootProject.name
6. Refresh Gradle

### Testing Version and Distribution Changes
![updating package name](../assets/osh/sensor-dev/package-name.png)

1. Execute a 'build task'
    - Click the 'gradle' on the right side of the screen
    - Under osh-node-dev-tempalte(root), right click the 'Tasks> Build> build'
    - Click the 'Edit Run Configuration'
    - in the 'Run' input box, type in 'build -x test -x osgi' and click 'OK'
    - Then Click the Green Run Button on the top toolbar to run the new Build
2. Check the console 
3. Target - if build succeeds, it will create 'build/distributions/ [name]-[version].zip'


### Creating Driver Framework 
![updating package name](../assets/osh/sensor-dev/package-name.png)

1. Copy the Driver Template
2. Paste Template back into the 'Sensors' directory
3. Rename Module
    - Assign a new Name to the module
    - Click OK button
4. Successfully created Module
    - Add files if to be managed by Git, otherwise cancel

### Updating Package Name

![updating package name](../assets/osh/sensor-dev/package-name.png)

1. Navigate to the Driver Package
2. Update the package name
3. Click 'Refactor' button

### Updating Driver Build Scripts
1. Open the 'sensorhub-driver-[name]/build.gradle'
2. Edit the description
- This field contains the name that will be assigned to your driver and visibile in the OpenSensorHub Admin Panel. 
3. Edit the ext.details
- This field contains the description assigned to your driver and visible in OpenSensorHub Admin Panel
4. Update the Manifest Details
- Edit the derails within the 'ext.pom' code block
    - id: nickname , email, etc
    - name
    - organization
    - organizationUrl


### Adding Sensor Driver to Build Target
1. Open the project wide build.gradle
2. In the dependencies block they are examples commented out on how to format your additions
3. Add dependency for driver
```gradle
    "implementation project(':sensorhub-driver-[name]')"
```
4. Open the settings.gradle
5. Uncomment FileTree Builder
6. Modify FileTree Builder
    - Update the FileTree Builder to ignore project folders that have 'template' in the name
7. Refresh Gradle
8. Your new driver is ready to be built!
    - Execute a 'build task'
        - Click the 'gradle' on the right side of the screen
        - Under osh-node-dev-tempalte(root), right click the 'Tasks> Build> build'
        - Click the 'Edit Run Configuration'
        - in the 'Run' input box, type in 'build -x test -x osgi' and click 'OK'
        - Then Click the Green Run Button on the top toolbar to run the new Build
    - Check the console 
    - Target - if build succeeds, it will create 'build/distributions/ [name]-[version].zip'


# Adding SensorML Description Programmatically

## Introduction
This guide explains how to add a SensorML description programmatically using the OpenSensorHub API.

## API: AbstractSensorModule
The `AbstractSensorModule` class provides a default implementation of common sensor API methods. It generates default values for:
- A random Unique ID using a UUID.
- A short XML ID.
- A default SensorML description including IDs, temporal validity, I/Os, and position (location + orientation).
- A feature of interest if the sensor configuration provides a static location.

All these defaults can be overridden by derived classes, which also gain access to helper methods for automatic reconnection.

## Extending AbstractSensorModule
To implement a sensor, extend the `AbstractSensorModule` class:

```java
package com.sample.impl.sensor.simulated;

import org.sensorhub.api.common.SensorHubException;
import org.sensorhub.impl.sensor.AbstractSensorModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Sensor driver providing sensor description, output registration,
 * and initialization/shutdown of driver and outputs.
 */
public class Sensor extends AbstractSensorModule<Config> {
    private static final Logger logger = LoggerFactory.getLogger(Sensor.class);
}
```

## updateSensorDescription
This method should be called whenever the sensor description needs to be regenerated.

Default implementaion reads the base description from the SensorML file if provided and then appends the unique sensor identifier, time validity and the description of all registered outputs and control inputs. 

Override method to provide sensor description programmatically

1. Navigate to 'Sensor.java' and Open the file
2. Override 'updateSensorDescription'

### Building the description
All sensor description operations should be performed within

```java
 synchronized (sensorDescLock) {

         super.updateSensorDescription();

  }
```
Make sure to call method on parent via 'super'

