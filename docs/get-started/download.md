---
title: "Download"
sidebar_position: 1
---


# How to Download


## Releases
Binary and Source distribution archives are located in the **Releases Section* of the OSH Github.

There are pre-configured distributions for the most common devices:
- **Android**
- **Raspberry Pi**
- **Desktop Linux**
- **Windows**

See the [Install Section](LINK) for instructions on how to setup **OSH** on your device. 


## Using Maven
To include **OpenSensorHub** in your own project, you can use the dependency to add the following in your `POM.xml`:

```xml
<dependency>
   <groupId>org.sensorhub</groupId>
   <artifactId>sensorhub-core</artifactId>
   <version>1.3.2</version>
   <type>pom</type>
</dependency> 
```

Since **OpenSensorHub** is not available on **Maven Central** yet, you also need to include the following:

```xml
<repositories>
   <repository>
      <id>sensiasoft</id>
      <url>https://dl.bintray.com/sensiasoft/osh/</url>
   </repository>
</repositories>
```