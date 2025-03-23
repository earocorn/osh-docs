---
title:    Building 
sidebar_position: 2
---
# OpenSensorHub Android Build Guide

### Build
- Building the latest version of the OSH App tested with Gradle v7 and Android Studio Giraffe v2022.3.1

1. Open the directory where the project is located
2. cd 




## Prerequisites
- [OSH Android GitHub Repository](https://github.com/opensensorhub/osh-android)
- [OSH Node GitHub Repository](https://github.com/opensensorhub/osh-node-dev-template)
- [Java v17+](https://www.openlogic.com/openjdk-downloads)
- [Git](https://git-scm.com/downloads)
- [Gradle v7.2](https://gradle.org/install/)
- [Android Studio](https://developer.android.com/studio/install)
- macOS, Windows, and Linux are supported.
- Android Device v13 with Developer Options enabled


## Setup


```sh
git clone --recursive https://github.com/opensensorhub/osh-android.git
cd osh-android
git checkout connected-systems
git submodule update --init --recursive
```

### Verify Submodules

There are two ways to verify the status of your submodules, either through the command line or inside the project IDE. 

Using the command line, you can use the following command:

```sh
git submodule status
```
If successful, you should see the status of both submodules `osh-addons` and `osh-core`.

### Branches

For the project to build properly, we need to ensure we are checking out the correct branches in each project. Here are the following **suggested** branches to ensure the build process runs smoothly. 

For **osh-android**:
- **osh-core** : `Master` or `con-sys-android`
- **osh-addons**: `Master`
- **lib-ogc**: `Master`
- **project** : `Master`


### Build OSH Android App
1. open the terminal to the Android project directory
2.  Run these two commands

 ```sh
 cd osh-android/sensorhub-android-app

 ../gradlew build
 ```


### For more information on Setting up OSH Node build, 
<!-- [click here](LINK) -->



### Viewing Results in Web Admin Panel



