---
title: ❌  Deploying
sidebar_position: 4
---

# Deploying an OSH Node

After building the node, you can navigate to the newly generated ``` /osh-node-template/build/distributions``` directory.

You will see the ```osh-node-..*.zip```

Unzip the node. Within the extracted folder execute the launch script for your corresponding OS by either double-clicking or running the script in the command line:
:::note

**Windows**: 

``` cmd 
./launch.bat
```
**Linux**:
``` cmd
 ./launch.sh
```
:::


Open your web browser and navigate to **localhost:8181/sensorhub/admin**


## Default OSH Configuration
With the deployment package, there is a config.json file containing a default configuration of OpenSensorHub. Within this configuration, only default users and services are configured. 

:::info
The default administrative credentials are:

**username**: admin

**password**: admin

:::

The default URL to access the admin panel is ```http://<address>/sensorhub/admin``` where the address is the URL or IP address of the system hosting OpenSensorHub
