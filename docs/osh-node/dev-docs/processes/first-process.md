---
title: Process Development
sidebar_position: 2
---


# Creating a Process

SensorML processes require a process implementation in Java as well as a process description in SensorML to define data sources, output structures, and parameters.


## Java Implementation

### Required Files

The OSH module containing the processing implementation should include at least **3** files. These files are:

- **Activator** - OSGi bundle activator, this is the same as any OSH module

- **ProcessDescriptor** - Descriptor to add your process implementation to OSH’s process manager

- (Process Implementation) - Process implementation as an extension of **ExecutableProcessImpl**

### Typical OSH Module Files

- org.sensorhub.api.processing.IProcessProvider - Provider to allow OSH to find the executable process

- build.gradle


```java title="Activator.java"
public class Activator extends OshBundleActivator implements BundleActivator
{}
```

```java title="ProcessDescriptor.java"
public class ProcessDescriptors extends AbstractProcessProvider {

  public ProcessDescriptors() {
    // Adds the process implementation to the process manager using the ProcessInfo defined in the implementation
    addImpl(MyProcess.INFO);
  }
}
```

Replace the below with the path to your **Descriptor**
```txt title="../src/main/resources/META-INF/services/org.sensorhub.api.processing.IProcessProvider"
classpath.to.ProcessDescriptors
``` 

```java title="MyProcess.java"
public class MyProcess extends ExecutableProcessImpl {

  // Required process information 
  public static final OSHProcessInfo INFO = new OSHProcessInfo("myprocessname", "An example process", null, MyProcess.class);
  
  Count input1;
  Count output1;
  Count parameter1;
  
  public MyProcess() {
    super(INFO);
  
    SWEHelper fac = new SWEHelper();
  
    // Initialize inputs, outputs, params
    inputData.add("input1", input1 = fac.createCount().build());
    outputData.add("output1", output1 = fac.createCount().build());
    paramData.add("param1", parameter1 = fac.createCount().build());
  }
  
  @Override
  public void execute() throws ProcessException {
    // Use inputs and params to update outputs
    int paramValue = parameter1.getData().getIntValue();
    int inputValue = input1.getData().getIntValue();
  
    int equation = inputValue * paramValue;
  
    output1.getData().setIntValue(equation);
  }
}
```

### Executing the Process

Ensure that your process module is included in the project’s `build.gradle`. 
In order to execute the created process, a SensorML process description must be provided to pass to the **SensorML Stream Process Module** in OSH.


### SensorML Process Chain Description
A SensorML process chain description is an *Aggregate Process* composed of inputs, outputs, parameters, components, and connections.

This required SensorML process chain description has a few requirements as listed below.

**Requirements**

- ID - Unique identifier of the process chain

- Outputs - These will be the top-level outputs available from the datastream created by the aggregate process.

- Components - These are chained together to create your final process. Components can be any of the following

  - Datastream - Datasource stream to read outputs and connect to other parts of the aggregate process.

  - Command stream - Can be used as a destination for process or datastream outputs. Commands will be sent at the rate that the linked output is updated.

  - Processes - Process inputs, outputs, and parameters can be chained together once defined as a component.

- Connections - These are explicitly defined connections to link inputs to outputs or vice-versa. Connections can only be between 2 data records that have the same record structure.



This description will use the previous Java implementation as the sample process.

```xml title="Example SensorML Description"

    <sml:AggregateProcess xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sml="http://www.opengis.net/sensorml/2.0" xmlns:swe="http://www.opengis.net/swe/2.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmd="http://www.isotc211.org/2005/gmd" gml:id="F1">
       <gml:identifier codeSpace="uid">UUID OR URN</gml:identifier>
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
                               <sml:setValue ref="parameters/producerURI">urn:of:system:with:datastream</sml:setValue>
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
                               <sml:setValue ref="parameters/systemUID">urn:to:system:with:controlstreams</sml:setValue>
                               <sml:setValue ref="parameters/inputName">controlStream1</sml:setValue>
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
                       <sml:source ref="components/source0/outputs/GenericOutput/anyOutputMatchingInput1Struct"/>
                       <sml:destination ref="components/process0/inputs/input1"/>
                   </sml:Link>
               </sml:connection>
               <sml:connection>
                   <sml:Link>
                       <sml:source ref="components/process0/outputs/output1"/>
                       <sml:destination ref="components/control0/inputs/controlStream1/anyInputMatchingOutput1Struct"/>
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

## Process Description Helpers
TODO