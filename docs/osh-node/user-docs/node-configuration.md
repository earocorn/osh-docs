---
title: General Node Configuration
sidebar_position: 3
---

# General Configuration

While you will be mainly configuring **OpenSensorHub** nodes via the Admin UI, there are some important things to know about the node configuration,
as well as configuration for important **OpenSensorHub** modules.

## Config File
OpenSensorHub's configuration is centralized in a single file. It is in JSON format, so it can be easily viewed or modified in any text editor.

This file contains a list of modules' configuration that are loaded in order when starting **OpenSensorHub**.

This file will be found at the root of your node's directory and is named `config.json`

### Backups
Each time your node's configuration is updated, a backup of the previous configuration will be stored in the node's directory.

## Network Config
Under the *Network* tab, you can see the **OpenSensorHub** node's HTTP server configuration.
![networkconfig.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fnetwork%2Fnetworkconfig.png)
This is useful for configuring authentication, CORS, HTTPS/SSL, and static content directory/URL.


## Security Config
Under the *Security* tab, you will find a basic security module that includes an interface for managing users, roles, and permissions.

You will see some default users and roles. 
Permissions are used to enable granular access-control to different modules.
The standard set of permissions cover the *Connected Systems API Service Module*, the *SOS Service Module*, and the *AdminUI Module*, which enables access-control of the Admin web interface.

config.json
network
security
roles