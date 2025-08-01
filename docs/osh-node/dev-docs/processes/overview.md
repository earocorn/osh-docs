---
title:    Overview
sidebar_position: 0
---

## What is a Process?
A *SensroML Process* in **OpenSensorHub** is a fundamental building block that transforms inputs into outputs. *Processes* are at the core of connecting sensors to actuators, automating tasks, and chaining sensor drivers, processes, and control streams.

Using the OGC SensorML (Sensor Model Language) standard and XML encoding, *processes* provide machine readable descriptions of any computational or physical procedure. The models and schema within the core SensorML specification provide a “skeletal” framework for describing processes, aggregate processes, and sensor systems.

*Processes* take one or more inputs through the application of well-defined methods and configurable parameters and produce one or more outputs. SensorML processes support explicit linking between processes and thus supports the concept of **Process chains**. 

### Key Components
Inputs, Outputs, Parameters, and Methods are the core components of an atomic process. When designing a process, think of how these data components will interact with each other and what you want from the process.

- **Inputs** - Data linked to the process from a source module. This source module can be either a sensor driver or another process
- **Outputs** - Outputs from the process itself. These outputs can be linked to the inputs of other processes or even a control stream of a sensor driver.
- **Parameters** - Configuration settings that are defined in the process description. These will be set in the SensorML description itself and used to configure the process module.
- **Methods** - Algorithms, transformations or procedures implemented


### SensorML Process Chain Description
A SensorML process chain description is an Aggregate Process composed of inputs, outputs, parameters, components, and connections.
This required SensorML process chain description has a few requirements as listed below.

#### Requirements
- ID - Unique identifier of the process chain
- Outputs - These will be the top-level outputs available from the datastream created by the aggregate process.
- Components - These are chained together to create your final process. Components can be any of the following
- Datastream - Datasource stream to read outputs and connect to other parts of the aggregate process.
- Command stream - Can be used as a destination for process or datastream outputs. Commands will be sent at the rate that the linked output is updated.
- Processes - Process inputs, outputs, and parameters can be chained together once defined as a component.
- Connections - These are explicitly defined connections to link inputs to outputs or vice-versa. Connections can only be between 2 data records that have the same record structure.


<!-- Explain these -->
<!-- Actuator - 
Simple Process- 
Aggregate Process - 
Physcial Component -
Physical System -
Data Component -
Process Chains - -->



<!-- Want to build your first process? See the next section. -->