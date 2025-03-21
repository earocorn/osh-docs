---
title:    Configuring
sidebar_position: 5
---

# Configuring an OSH Node

The easiest way to modify the configurations in your project will be within an IDE.

Some later guides may include workflow & project setup in **IntelliJ Idea** but other IDEs can be used as well. 

Once you have cloned the project, open it in your IDE. 

## Including Modules in the Build

Within the project's root directory there will be a project wide **build.gradle** and **settings.gradle**.
:::info
In Java, the "root directory" typically refers to the base or top-level directory of a file system.

In the osh-node-dev-template, the root directory contains subdirectories such as "dist", "include", "processing", "sensors", etc.
:::

To include modules into your build from add-ons, core, or a directory that you build yourself, you must modify both the build.gradle & setting.gradle.

### Settings.gradle
The settings.gradle file is used to configure and define the structure of a multi-project Gradle build. 

It's primarily responsible for defining which projects are included in the build and configuring project-level settings.

It controls which projects are part of the build, typically by including or excluding subprojects.

#### Adding Individual Projects
Open the settings.gradle in the root directory

At the top of the page you will see definitions which will be used as shorthand for adding the paths to specific directories in your project's build: 

```
rootProject.name = 'osh-node'       // Here you can rename the project 
def includeDir = "$rootDir/include"         
def sensorDir = "$includeDir/osh-addons/sensors"      
def persistenceDir = "$includeDir/osh-addons/persistence"
def processDir = "$includeDir/osh-addons/processing"
def serviceDir = "$includeDir/osh-addons/services"

def toolsDir = "$rootDir/tools"
```

Use these definitions to quickly reference the paths to the projects you need to implement.

There is commented-out code giving examples of how to add a project to the build:
``` java 
include '[storage-module-name]'  
project(':[storage-module-name]').projectDir = "$sensorDir/[path]/[storage-module-name]" as File
```
The storage module name is typically something like ```sensorhub-driver-{project-name}``` or ```sensorhub-process-{project-name}```

####  Adding an Entire Root Subdirectory
Toward the bottom of the page you will see a block of code:
   ``` java 
   FileTree subprojects = fileTree("$rootDir/sensors").include('**/build.gradle')
   subprojects.files.each { File f ->
      File projectFolder = f.parentFile
      if (projectFolder != rootDir) {
         String projectName = ':' + projectFolder.name
         include projectName
         project(projectName).projectDir = projectFolder
         }
      }
   ```

This code will include all subprojects from the root-directory/sensors folder.

If you build your project within that directory it will automatically add your project's build.gradle to the build.

:::note
There is also a $rootDir/processing code block. Processes will be described in a later section.

If you decide to build a process, you will be building your project in the "$rootDir/processing" directory & this block will include it in the build.
:::

#### Removing a Sensor from the Build
To ignore project folders you can add an if-statement to the code-block:

``` java
FileTree subprojects = fileTree("$rootDir/sensors").include('**/build.gradle')
subprojects.files.each { File f ->
   File projectFolder = f.parentFile
   if (!projectFolder.name.contains("template")) {
      if (projectFolder != rootDir) {
         String projectName = ':' + projectFolder.name
         include projectName
         project(projectName).projectDir = projectFolder
      }
   }
}
```

:::info
Adding the if-statement``` if (!projectFolder.name.contains("template") ``` excludes any project whose directory name contains **"template"**.

If you need to remove multiple sensors, simply add the logical AND operator "&&":

```if (!projectFolder.name.contains("template") && (!project.name.contains('second-project'))```
:::

### Build.gradle
The build.gradle file is the build script for a single project (either the root project or a subproject). 

It contains the logic for building the project, such as dependencies, plugins, tasks, and other build configurations.

This is where you define how the project will be built and how dependencies are resolved, compiled, tested, and packaged.

#### Adding a Dependency 

Open build.gradle in the root directory.

The dependencies block is shown with some examples commented out.

Add a dependency for the driver you wish to add:

   ``` gradle 
   implementation project(‘:sensorhub-driver-simulation’)
   ``` 

   ``` gradle 
   implmentation project(‘:sensorhub-comms-rxtx’)
   ```