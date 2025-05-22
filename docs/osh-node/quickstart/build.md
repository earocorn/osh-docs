---
title: Build
sidebar_position: 3
---

# How to Build an OSH Node

This page guides you through building an OSH Node from source using the command line.

## Getting the Code
The `git` command is used to download the code from the GitHub repositories hosting **OpenSensorHub**. 

For example, you can download the code for an OSH Node Development Template using the following command:

```git 
git clone --recursive https://github.com/opensensorhub/osh-node-dev-template.git
```

:::note
The `--recursive` flag is required because the repository contains submodules.
:::

## Building from the Command Line
You can the build the code from source using Gradle on the command line.

Change into the directory where you cloned the repository:

```sh
cd osh-node-dev-template
```
:::warning
In order to build using Java 21, you must use an up-to-date Gradle version. 
The Gradle wrapper version can be changed in `/osh-node-dev-template/gradle/wrapper/gradle-wrapper.properties`.
```gradle title="/osh-node-dev-template/gradle/wrapper/gradle-wrapper.properties"
#Wed May 06 18:14:44 CDT 2020
// We can change from 7.3.3 to 8.10.2, to match the Gradle version used by osh-core
// highlight-next-line
distributionUrl=https\://services.gradle.org/distributions/gradle-7.3.3-bin.zip
distri...
```
:::
To build, run the following:   
```sh
./gradlew build -x test
```
:::note
`-x test` excludes unit tests from the build process 
:::


The result OSH node will build in:

`/osh-node-dev-template/build/distributions/osh-node-..*.zip`
