---
title:    Configuring
sidebar_position: 4
---

# Configuring the OSH Android Settings
OpenSensorHub allows an Android device to send sensor data to a remote OSH node using the **Connected Systems** or **SOS-T standard**. This guide explains how to configure the sensors through the OSH-Android app.

## Prerequisites
1. A running OSH Node - The node must be actively running to listen to incoming requests from the Android device. If you need help building an OSH Node follow these instructions 
<!-- [here](LINK). -->
2. OSH Android App installed - Ensure the latest version of the app is installed on your Android device. If you need help building an OSH Android app follow these instructions 
<!-- [here](LINK). -->
 


### Configuring the OSH Android App
Step 1. Access the **General Settings** 
    1. Open the OSH Android App
    2. Tap the menu settings (the three dots in the top right corner)
    3. Navigate to  **Settings > General**. 

Step 2. Input OSH Node Connection Details
On the **General Settings** page, you will find the options to configure the connection to the OSH Node. Here is what will need updated:

1. Find the IP Address and Port of the OSH Node
    - The OSH Node will provide its own IP and Port number where it listens to the incoming requests from the Android device.
    - You can locate the IP address by using the command line or by checking the OSH Admin Panel.
    - The port number can be retrieved from the 
    - If you are running the OSH Node on the same device, use the local IP: `127.0.0.1` and the default port `8585`.
2. Update the OSH Android App Configuration
    - IP Address: Enter the IP Address of the OSH Node (e.g. `192.168.1.100` for a local network node).
    - Port Number: Enter the port number where OSH is running ( `8181` by default).
    - Username and Password (If required): Provide the creditentials if authentication is necessary.

3. Select a Client
Choose the following options based on your setup:
    - Connected Systems API (default)
    - SOS-T Standard

4. Enable the Appropriate Services
Choose between the two services options by switching **Connected Systems Service** or **SOS Service**.


For a Connected Systems API:
- Enable Connected Systems Service
- Enable Connected Systems Client

For SOS Standard:
- Enable SOS Service
- Enable SOS-T Client



### Adding Modules to Configuration
To send sensor data from your Android device, you must add sensors to the configuration.

Within the **Sensors** page, you will find a list of all the sensors that can be added to the configuration. Selecting the sensors you want to enable, then when you **Start SensorHub** from the main menu, their data will be streamed to the **SOS** or the **Connected Systems API**. 

1. Tap the menu settings (the three dots in the top right corner).
2. Navigate to **Settings > Sensors**
3. Locate the **Network Location Data** option and toggle it **On**
    - This allows the device to trasnmit location data over the network. 
4. Select additional sensors you want to enable.
    - Once enabled, the selected sensors will start sending data when **Start Sensorhub** is started. 







