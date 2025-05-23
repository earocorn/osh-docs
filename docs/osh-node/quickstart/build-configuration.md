---
title: Build Configuration
sidebar_position: 5
---

# Configuring an OSH Node

The easiest way to modify the configurations in your project will be within an IDE.

Some later guides may include workflow & project setup in **IntelliJ Idea** but other IDEs can be used as well. 

Once you have cloned the project, open it in your IDE. 

## Including Modules in the Build

Within the project's root directory there will be a project wide `build.gradle` and `settings.gradle`.
:::info
In Java, the "root directory" typically refers to the base or top-level directory of a file system.

In the `osh-node-dev-template`, the root directory contains subdirectories such as `dist`, `include`, `processing`, `sensors`, etc.
:::

To include modules into your build from `osh-addons`, `osh-core`, or a directory that you build yourself, you must modify both the `build.gradle` & `settings.gradle`.

### settings.gradle
The `settings.gradle` file is used to configure and define the subprojects of a multi-project Gradle build. 

It's primarily responsible for defining which subprojects are included in the build and configuring project-level settings.

It controls which projects are part of the build, typically by including or excluding subprojects.

OpenSensorHub uses `settings.gradle` to define subprojects that we either use in our build or to resolve dependencies of other subprojects.

#### Adding Individual Projects
Open the `settings.gradle` in the root directory

At the top of the page you will see definitions which will be used as shorthand for adding the paths to specific directories in your project's build: 

```gradle title="/osh-node-dev-template/settings.gradle"
rootProject.name = 'osh-node'       // Here you can rename the project 
def includeDir = "$rootDir/include"         
def sensorDir = "$includeDir/osh-addons/sensors"      
def persistenceDir = "$includeDir/osh-addons/persistence"
def processDir = "$includeDir/osh-addons/processing"
def serviceDir = "$includeDir/osh-addons/services"

def toolsDir = "$rootDir/tools"
```

Use these definitions to quickly reference the paths to the projects you need to implement.

An example of adding a subproject to our `settings.gradle`. This project will be available to your `build.gradle` and all subproject `build.gradle`s that are included in this build.
```gradle title="/osh-node-dev-template/settings.gradle"
include '[module-name]'  
project(':[module-name]').projectDir = "$sensorDir/[path]/[module-name]" as File
```
The module name is typically something like `sensorhub-driver-{name}` (for sensor drivers) or `sensorhub-process-{name}` (for processing modules)

####  Adding all submodules in a directory
Toward the bottom of the page you will see a block of code:
``` gradle title="/osh-node-dev-template/settings.gradle"
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

This code will include all subprojects from the `/osh-node-dev-template/sensors`. However, we can also use this method for including all submodules in a subdirectory.
For example, using the `osh-addons` directory, we can include all sensors from `osh-addons` by referencing `"$sensorDir"` which includes modules from `/osh-node-dev-template/include/osh-addons/sensors`

If you build your project within that directory it will automatically add your project's build.gradle to the build.

#### Removing a Sensor from the Build
To ignore submodules, you can add an if-statement to the code-block:

``` gradle title="/osh-node-dev-template/settings.gradle"
FileTree subprojects = fileTree("$rootDir/sensors").include('**/build.gradle')
subprojects.files.each { File f ->
   File projectFolder = f.parentFile
   // highlight-next-line
   if (!projectFolder.name.contains("template")) {
      if (projectFolder != rootDir) {
         String projectName = ':' + projectFolder.name
         include projectName
         project(projectName).projectDir = projectFolder
      }
   }
}
```

### build.gradle
The `build.gradle` file is the build script for a single project (either the root project or a subproject). 

It contains the logic for building the project, such as dependencies, plugins, tasks, and other build configurations.

This is where you define how the project will be built and how dependencies are resolved, compiled, tested, and packaged.

#### Adding a Dependency 

Open `build.gradle` in the root directory.

The dependencies block is shown with some examples commented out.

Add a dependency for the driver you wish to add:

```gradle title="/osh-node-dev-template/build.gradle"
implementation project(':sensorhub-driver-fakeweather')
``` 

```gradle title="/osh-node-dev-template/build.gradle"
implementation project(':sensorhub-process-geoloc')
```

Upon adding these dependencies to your `build.gradle`, your **OpenSensorHub** node will build with these drivers/processes/modules installed and ready to run.