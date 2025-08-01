---
title: Gradle Configuration
sidebar_position: 1
---

# Gradle Configuration

The module used in this example can be found in `osh-node-dev-template/processing/sensorhub-process-template`.

## Build Config
In a module's `build.gradle`, you will find configuration for the module's metadata, dependencies, osgi manifest, and maven info.

An example `build.gradle` from `sensorhub-process-template` is shown below

```gradle title="sensorhub-process-template/build.gradle"
description = 'Put your description here' // Module's name (e.g. Weather Station Process)
ext.details = "Details here" // Details about the module (model #, description, etc.)
version = '1.0.0' // Current version of the module

// Dependencies required by this module
dependencies {
    // This will almost always be required to use osh-core APIs
    implementation 'org.sensorhub:sensorhub-core:' + oshCoreVersion
    // For unit testing
    testImplementation('junit:junit:4.13.1')
    
    
    implementation project(':sensorhub-process-helpers') // Helpers for writing XML Process descriptions

    // Additional dependencies can be included here
}

test {
    // Default test runner
    useJUnit()
}

// OSGi manifest information
osgi {
    manifest {
        attributes ('Bundle-Vendor': 'Organization Name') // Organization or company distributing this module
        attributes ('Bundle-Activator': 'com.sample.impl.process.processname.Activator') // This must be correct for the module to build
    }
}

// Maven pom information
ext.pom >>= {
    developers {
        developer {
            id 'some id' // Username or email
            name 'Your name' // First and last name
            organization '' // Organization or company
            organizationUrl '' // Website of organization or company
        }
    }
}
```

### Dependencies
In order to add and use a subproject of in a module, you must declare this subproject in your root-level Gradle configuration.

Please see the Quickstart Guide's section about [Build Configuration](../../quickstart/build-configuration.md) for using subprojects.
### OSGi Manifest
Information for an OSGi manifest must be filled out for Gradle to complete a build that includes the `osgi` task.

All that's required for this part is a vendor name (company or organization name), and the path to the module's `Activator` class.
### Maven Info
The Maven POM info is necessary for crediting this module, so please fill out the corresponding information when creating a module.