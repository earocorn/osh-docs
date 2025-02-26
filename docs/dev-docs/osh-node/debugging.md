---
title: Debugging
sidebar_position: 6
---


## Setup and Run Debugger for OSH in IntelliJ

These are instructions on how to run the debugger for an OSH Node in IntelliJ. This allows you to:
- Build and run OSH node without having to go through the process of full build, unzip, launch and configure. The OSH Node will build and run in the IDE with a configuration that can be saved between builds.
- Allows for breakpoints to be utilized in driver and core code for solving / insight into issues in drivers. 

### SensorHub Test Module
- Open your project directory, and check if your project contains the `sensorhub-test` module. This module will be located in the `tools` directory. 

1. Edit the build.gradle
- In the `sensorhub-test` module, edit the build.gradle to include the drivers you want in the debug build.

2. Add debug task
- Navigate to the `TestSensorHub` class in the `sensorhub-test` directory. Within that class, there should be several green arrows on the lines. These indicate available test methods.
- Right click on the `main` method inside `TestSensorHub` and select `Run 'TestSensorHub.main()'`. 

3. Set BreakPoints
- Open any driver or module that you included in the `sensorhub-test` build.gradle that you want to inpect the execution of. 
- Click on any line number where you want to pause the execution and add a breakpoint (a red dot should appear).

4. Modify and Rebuild
- Any changes made to the driver code can be rebuilt within IntelliJ without the need to go through a full build, unzip and launch process.
- After any modifcations, restart the debug session to apply changes and continue testing. 

5. Checking Endpoint
- The `sensorhub-test` default port is 8282. To navigate to the `Admin Panel` you can open any supported browser, and go to `https://localhost:8282/sensorhub/admin` and follow the steps to configure a module 
<!-- [here](LINK).  -->