---
title: Process Template
sidebar_position: 2
toc_max_heading_level: 5
---

# Process Development
This guide will show example implementation from the `osh-node-dev-template` repository on **OpenSensorHub**'s public GitHub.
Please refer to the [*Development Template*](../dev-template.md) page for setting up this repository, and learning more about what is included in the template.

The example implementation will be under `osh-node-dev-template/processing/sensorhub-process-template`.

This guide will cover all parts of the `sensorhub-process-template`, broken down into smaller subsections to explain the code.

## Process Components
In the Java implementation for a *Process Driver*, a few Java classes are required and included in the template.


| File                   | Qty  | Purpose                                                                                                                                                                                          |
|------------------------|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Activator              | 1    | Exposes module for ability to be bundled in an OSGi bundle.                                                                                                                                      |
| Descriptor             | 1    | Provides entrypoint (module class) and module config file for this module.                                                                                                                       |
| Process                | 1    | Entrypoint for your process. Includes inputs, outputs, parameters, and process execution.                                                                                                        |
| META-INF/services file | 1    | File used for exposing the processes **Descriptor** class to OSH                                                                                                                                  |
| test/java/ ProcessDescriptionGenerator  | 1    | File used to generate the required XML encoding description.                                                                                                                          |
| test/resources/ process-description.xml | 1    | Example file of structure of XML encoding description.                                                                                                                        |
| test/resources/ process-description.json | 1    |   Example file of structure of JSON encoding description.                                                                                                                    |

## Activator Class
`Activator` does not require any implementation. 
The existence of the class exposes it with the ability to build as an OSGi bundle.

```java title="sensorhub-process-template/src/main/java/com/sample/impl/process/processname/Activator.java"
package com.sample.impl.process.processname;

import org.sensorhub.utils.OshBundleActivator;

@SuppressWarnings("unused")
public class Activator extends OshBundleActivator {
}
```
### OSGi Task in Gradle
For a module to successfully build with OSGi, the path to this `Activator` class must be correct in the module's `build.gradle` under the `osgi` task.

```gradle title="sensorhub-process-template/build.gradle"
...
osgi {
    manifest {
        attributes ('Bundle-Vendor': 'Botts Inc')
        attributes ('Bundle-Activator': 'com.sample.impl.process.processname.Activator')
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
```java title="sensorhub-process-template/src/main/java/com/sample/impl/process/processname/Descriptor.java"
package com.sample.impl.process.processname;

import org.sensorhub.impl.processing.AbstractProcessProvider;

public class Descriptor extends AbstractProcessProvider {

    public Descriptor() {
        addImpl(Process.INFO); 
    } 
}
```
The process descriptor class serves as a registry for **OpenSensorHub** processes. It acts as an entry point that makes your processes discoverable and available through **OpenSensorHub.**

### addImpl
In the constructor, you register each process implementation by calling `addImpl()` with the processes `INFO` object:
```java 
public Descriptor() {
    addImpl(Process.INFO); // registers Process for discovery
} 
```


## Process Class
```java title="sensorhub-process-template/src/main/java/com/sample/impl/process/processname/Process.java"
package com.sample.impl.process.processname;

import net.opengis.swe.v20.Count;
import org.sensorhub.api.processing.OSHProcessInfo;
import org.vast.process.ExecutableProcessImpl;
import org.vast.swe.SWEHelper;

public class Process extends ExecutableProcessImpl {

    // the OSHProcessInfo object serves as the process
    public static final OSHProcessInfo INFO = new OSHProcessInfo("processname", "Process Label", "Description of process", Process.class);

    Count input1;
    Count output1;
    Count parameter1;

    /**
     * Typically, you will initialize your input, output, and parameter data structures in the constructor
     */
    public Process() {
        super(INFO);

        SWEHelper fac = new SWEHelper();

        // Create process inputs, outputs, and parameters
        this.inputData.add("input1", input1 = fac.createCount().build());
        this.outputData.add("output1", output1 = fac.createCount().build());
        this.paramData.add("parameter1", parameter1 = fac.createCount().build()); // Optional
    }

    /**
     * Contains the core processing logic.
     */
    @Override
    public void execute() {
        // retrieve input and param values
        int paramValue = parameter1.getData().getIntValue();
        int inputValue = input1.getData().getIntValue();

        // perform processing logic
        int product = inputValue * paramValue;

        // set output values
        output1.getData().setIntValue(product);
    }
}
```
The `Process()` class extends `ExecutableProcessImpl` and serves as the core implementation for custom OpenSensorHub processing modules. This class handles data transformation, algorithmic processing and real-time computation within the OSH framework.

#### `OSHProcessInfo INFO`
The `OSHProcessInfo` object serves as the process registry entry with four essential parameters:
- Process ID: `"processname"` - unique identifier within OSH
- Display Label: `"Process Label"` - human readable name
- Description: `"Description of process"` - explaination of what the process does
- Implementation Class.: `Process.class` - link to the implementation class
```java
 public static final OSHProcessInfo INFO = new OSHProcessInfo("processname", "Process Label", "Description of process", Process.class);
```


#### `Process()`
The `Process()` constructor follows a standard pattern for all OSH processes and is used to define inputs, outputs, and parameters. 
```java
public Process() {
    super(INFO);

    SWEHelper fac = new SWEHelper();

    // Create process inputs, outputs, and parameters
    this.inputData.add("input1", input1 = fac.createCount().build());
    this.outputData.add("output1", output1 = fac.createCount().build());
    this.paramData.add("parameter1", parameter1 = fac.createCount().build()); // Optional
}
```

#### `execute()`
The `execute()` method contains the core processing logic and is called by the OSH framework. This is where all the data transformation and computatational logic occurs. 
```java
@Override
public void execute() {
  // 1. retrieve input and param values
  int paramValue = parameter1.getData().getIntValue();
  int inputValue = input1.getData().getIntValue();
  
  // 2. perform processing logic
  int product = inputValue * paramValue;
  
  // 3. set output values
  output1.getData().setIntValue(product);
}
```

## META-INF/services File
This file located in `/sensorhub-driver-template/src/main/resources/META-INF/services` is required to allow **OpenSensorHub** 
to find the implementation of the driver's `Descriptor` class, which allows OSH to instantiate and use this driver's main module class and config class.

This file should always be named with the classpath of the service being implemented, and contain a list of the implementations of that service.

For example, this driver's `Descriptor` class implements the `IModuleProvider` from `osh-core`, so the file must be named `org.sensorhub.api.module.IModuleProvider`, and the file must contain the line `com.sample.impl.process.processname.Descriptor`.
See below.

```txt title="../resources/META-INF/services/org.sensorhub.api.module.IModuleProvider"
com.sample.impl.process.processname.Descriptor
```

## src/test/java ProcessDescriptionGenerator.java
The `ProcessDescriptionGenerator` class generates and writes the process descritpion in XML or JSON format.
```java

import com.botts.process.helpers.ProcessHelper;
import net.opengis.sensorml.v20.AggregateProcess;
import org.junit.Test;
import org.vast.data.SWEFactory;
import org.vast.process.ProcessException;
import org.vast.xml.XMLWriterException;

import java.io.IOException;

public class ProcessDescriptionGenerator {
    SWEFactory fac = new SWEFactory();
    ProcessHelper processHelper = new ProcessHelper();

    public AggregateProcess generateDescription() throws ProcessException {
        Process p0 = new Process(); // Creates a new instance of process
        p0.init(); // Initialize the process (creates its data component structure)

        return processHelper.createProcessChain()
                .name("processname") // Name of the process as given in the INFO params
                .uid("urn:osh:process:processname") // Unique identifier of process
                .description("Description of process") // Brief description of what the process does
                .addDataSource("source0", "urn:osh:sensor:sensorname") // Add a component name and link it to a datasource by its unique identifier
                .addOutputList(p0.getOutputList()) 
                .addProcess("process0", p0) // Add the initialized process with a component name
                .addConnection("components/source0/outputs/output", 
                        "components/process0/inputs/input1") // connect datasource output to process input
                .addConnection("components/process0/outputs/output1",
                        "outputs/output") // connect process output to the chain's output
                .build();
    }
    @Test
    public void generateDescJSON() throws ProcessException, IOException {
        // Write JSON process description to System.out
        processHelper.writeProcessJSON(generateDescription(), System.out);
    }

    @Test
    public void generateDescXML() throws ProcessException, XMLWriterException {
        // Write XML process description to System.out
        processHelper.writeProcess(System.out, generateDescription(), true);
    }

}

```

## src/test/resources myprocess-description.xml
This is an example output of the SensorML Process Chain Description in XML that is created using the `ProcessDescriptGenerator`. The outputted XML is used when configuring a `Process` module in the OSH Admin panel.

```xml title="src/test/resources/myprocess-description.xml"
<sml:AggregateProcess xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sml="http://www.opengis.net/sensorml/2.0" xmlns:swe="http://www.opengis.net/swe/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" gml:id="F1">
    <gml:identifier codeSpace="uid">[UUID or URN]</gml:identifier>
    <sml:outputs>
        <sml:OutputList>
            <sml:output name="output1">
                <swe:Count>
                    <swe:label>Output 1</swe:label>
                </swe:Count>
            </sml:output>
        </sml:OutputList>
    </sml:outputs>
    <sml:components>
        <sml:ComponentList>
            <sml:component name="source0">
                <sml:SimpleProcess gml:id="F2">
                    <sml:typeOf xlink:href="urn:osh:process:datasource:stream"/>
                    <sml:configuration>
                        <sml:Settings>
                            <sml:setValue ref="parameters/producerURI">
                                urn:of:system:with:datastream
                            </sml:setValue>
                        </sml:Settings>
                    </sml:configuration>
                </sml:SimpleProcess>
            </sml:component>
            <sml:component name="process0">
                <sml:SimpleProcess gml:id="F3">
                    <sml:typeOf xlink:href="urn:osh:process:myprocessname"/>
                    <sml:inputs>
                        <sml:InputList>
                            <sml:input name="input1">
                                <swe:Count>
                                    <swe:label>Input 1</swe:label>
                                </swe:Count>
                            </sml:input>
                        </sml:InputList>
                    </sml:inputs>
                    <sml:outputs>
                        <sml:OutputList>
                            <sml:output name="output1">
                                <swe:Count>
                                    <swe:label>Output 1</swe:label>
                                </swe:Count>
                            </sml:output>
                        </sml:OutputList>
                    </sml:outputs>
                    <sml:parameters>
                        <sml:ParameterList>
                            <sml:parameter name="param1">
                                <swe:Count>
                                    <swe:label>Parameter 1</swe:label>
                                    <swe:value>12345</swe:value>
                                </swe:Count>
                            </sml:parameter>
                        </sml:ParameterList>
                    </sml:parameters>
                </sml:SimpleProcess>
            </sml:component>
            <sml:component name="control0">
                <sml:SimpleProcess gml:id="F4">
                    <sml:typeOf xlink:href="urn:osh:process:datasink:commandstream"/>
                    <sml:configuration>
                        <sml:Settings>
                            <sml:setValue ref="parameters/systemUID">
                                urn:to:system:with:controlstreams
                            </sml:setValue>
                            <sml:setValue ref="parameters/inputName">
                                controlStream1
                            </sml:setValue>
                        </sml:Settings>
                    </sml:configuration>
                </sml:SimpleProcess>
            </sml:component>
        </sml:ComponentList>
    </sml:components>
    <sml:connections>
        <sml:ConnectionList>
            <sml:connection>
                <sml:Link>
                    <sml:source ref="components/source0/outputs/[outputName]/[fieldName]"/>
                    <sml:destination ref="components/process0/inputs/input1"/>
                </sml:Link>
            </sml:connection>
            <sml:connection>
                <sml:Link>
                    <sml:source ref="components/process0/outputs/output1"/>
                    <sml:destination ref="components/control0/inputs/[controlStream1]/[controlFieldName]"/>
                </sml:Link>
            </sml:connection>
            <sml:connection>
                <sml:Link>
                    <sml:source ref="components/process0/outputs/output1"/>
                    <sml:destination ref="outputs/output1"/>
                </sml:Link>
            </sml:connection>
        </sml:ConnectionList>
    </sml:connections>
</sml:AggregateProcess>
```

## src/test/resources myprocess-description.json
This is an example output of the process description in JSON that is created using the `ProcessDescriptGenerator`.
```json title="src/test/resources/myprocess-description.json"
{
  "type": "AggregateProcess",
  "uniqueId": "[UUID or URN]",
  "label": "Human readable label for composite process",
  "description": "Description of the composite process",
  "outputs": [
    {
      "type": "Count",
      "name": "output1",
      "label": "Output 1"
    }
  ],
  "components": [
    {
      "type": "SimpleProcess",
      "name": "source0",
      "typeOf": {
        "href": "urn:osh:process:datasource:stream"
      },
      "configuration": {
        "setValues": [
          {
            "ref": "parameters/producerURI",
            "value": "urn:of:system:with:datastream"
          }
        ]
      }
    },
    {
      "type": "SimpleProcess",
      "name": "process0",
      "label": "Process Label",
      "description": "Description of my process goes here",
      "typeOf": {
        "href": "urn:osh:process:myprocessname"
      },
      "inputs": [
        {
          "type": "Count",
          "name": "input1"
        }
      ],
      "outputs": [
        {
          "type": "Count",
          "name": "output1"
        }
      ],
      "parameters": [
        {
          "type": "Count",
          "name": "param1",
          "value": 12345
        }
      ]
    },
    {
      "type": "SimpleProcess",
      "name": "control0",
      "typeOf": {
        "href": "urn:osh:process:datasink:commandstream"
      },
      "configuration": {
        "setValues": [
          {
            "ref": "parameters/systemUID",
            "value": "urn:to:system:with:controlstream"
          },
          {
            "ref": "parameters/inputName",
            "value": "controlStreamInputName"
          }
        ]
      }
    }
  ],
  "connections": [
    {
      "source": "components/source0/outputs/[outputName]/[fieldName]",
      "destination": "components/process0/inputs/input1"
    },
    {
      "source": "components/process0/outputs/output1",
      "destination": "components/control0/inputs/[controlStream1]/[controlFieldName]"
    },
    {
      "source": "components/process0/outputs/output1",
      "destination": "outputs/output1"
    }
  ]
}
```