---
title: Overview
sidebar_position: 0
---

## What is a SensorML Process?
A *SensorML Process* is a fundamental concept in the Open Geospatial Consortium's (OGC) Sensor Model Language (SensorML) standard that provides a framework for describing sensors and systems.

**Processes** are entities that transform one or more inputs using well-defined methods, and configurable parameters to one or more outputs. 

SensorML supports the explicit linking between processes, this phenonmenon is known as `Process Chains`, where the output of one process becomes the input into another. 

<!-- *SensorML Processes* are described as a transformation of inputs into outputs. They are fundamental for connecting sensors to actuators, automating tasks, and chaining sensor drivers, computational modules, and control streams. -->
<!-- 
Using the OGC SensorML standard and XML encoding, *Processes* provide machine readable descriptions of any computational or physical procedure. The models and schema within SensorML offer a skeletal framework for defining individual processes, aggregate processes, and entire sensor systems.

A Process takes one or more inputs, applies well-defined methods and configurable parameters, and produces one or more outputs. SensorML supports **Process Chains**, where the output of one process can feed into another as input.  -->


### Key Components
All processes are defined through their **inputs**, **outputs**, **parameters** and **methods**. When designing a process, consider how these elements interact and what the desired transformation is.

- **Inputs** - Data provided to the process, typically from a sensor driver or another process.
- **Outputs** - The results from the process, which can be linked to other processes or control streams.
- **Parameters** - Configuration settings defined in the SensorML description, used to customize the process behavior.
- **Methods** - The algorithms, functions, or physical actions that transform inputs into outputs



### Process Types
A process model descirbes how data is transformed, generated, or collected, whether that is a from a physical sensor, a simulation, or a computational algorithm.

- **Simple Process** an atomic (non-divisible) process. It represents a transformation or computation that cannot be broken down into smaller sub-processes, and its physical location is of no importance.

- **Aggregate Process** is a composite process made up of multiple sub-processes, each of which can be a Simple, Aggregate or Physical process. It will include its own inputs, outputs and parameters since it is a process. 

- **Physical Component** represents an individual sensor, actuator , or physical device. It is described at the hardware level but can contain embedded processes.

- **Physical System**  is used to model a hardware device as an aggregate process made of one or more components and whose location in the real world is known and of importance.

- **Configurable Process** includes options or choices that can be selected, restricted, or enabled during deployment, operation, or execution of that process. 



### XML Structure and Schema
A SensorML process descrition provides a standardized, machine-readable way to describe any process, system or sensor. 

#### Basic Process Structure
```xml
<sml:SimpleProcess gml:id="process-id"
xmlns:xlink="http://www.w3.org/1999/xlink" 
xmlns:sml="http://www.opengis.net/sensorml/2.0" 
xmlns:swe="http://www.opengis.net/swe/2.0" 
xmlns:gml="http://www.opengis.net/gml/3.2" 
xmlns:gco="http://www.isotc211.org/2005/gco"
xmlns:gmd="http://www.isotc211.org/2005/gmd"
>
  
  <!-- Process Identification -->
  <gml:description>Brief description of the process</gml:description>
  <gml:identifier codeSpace="uid">unique-process-identifier</gml:identifier>
  
  <!-- Process Definition -->
  <sml:typeOf xlink:href="http://example.com/processes/temperature-conversion"/>
  
  <!-- Inputs Definition -->
  <sml:inputs>
    <sml:InputList>
      <sml:input name="temperature">
        <sml:Quantity definition="http://example.com/properties/temperature">
          <sml:uom code="Cel"/>
        </sml:Quantity>
      </sml:input>
    </sml:InputList>
  </sml:inputs>
  
  <!-- Outputs Definition -->
  <sml:outputs>
    <sml:OutputList>
      <sml:output name="temperature_fahrenheit">
        <sml:Quantity definition="http://example.com/properties/temperature">
          <sml:uom code="degF"/>
        </sml:Quantity>
      </sml:output>
    </sml:OutputList>
  </sml:outputs>
  
  <!-- Parameters -->
  <sml:parameters>
    <sml:ParameterList>
      <sml:parameter name="conversion_factor">
        <sml:Quantity definition="http://example.com/properties/conversion-factor">
          <sml:value>1.8</sml:value>
        </sml:Quantity>
      </sml:parameter>
    </sml:ParameterList>
  </sml:parameters>
  
  <!-- Method Definition -->
  <sml:method xlink:href="http://example.com/methods/celsius-to-fahrenheit"/>
  
</sml:SimpleProcess>
```

This is one of the most critical parts of defining a process. To learn more about each section of the XML, see [*SensorML Description*](./sensorml-desc.md) . 