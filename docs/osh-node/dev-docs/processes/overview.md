---
title:    Overview
sidebar_position: 1
---

Processing in OpenSensorHub is a crucial component to many sensor systems. Processes in OpenSensorHub are at the core of connecting sensors to actuators, automating tasks, and chaining sensor drivers, processes, and control streams.


### Key Components

Inputs, Outputs, and Parameters are the core components of an atomic process. When designing a process, think of how these data components will interact with each other and what you want from the process.

- **Inputs** - Data linked to the process from a source module. This source module can be either a sensor driver or another process

- **Outputs** - Outputs from the process itself. These outputs can be linked to the inputs of other processes or even a control stream of a sensor driver.

- **Parameters** - Configuration settings that are defined in the process description. These will be set in the SensorML description itself and used to configure the process module.


Want to build your first process? See [Creating a Process](first-process.md).