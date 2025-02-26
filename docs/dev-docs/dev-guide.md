---
title: ❌  Developer's Guide
sidebar_position: 1
description: Learn how to set up a development environment and contribute to OpenSensorHub (OSH).
---

## Introduction

Welcome to the **OpenSensorHub (OSH) Developer's Guide**. This guide will help you set up your development environment using IntelliJ and extend OSH with custom sensor drivers, web services, processes and other components.

We encourage contributions! If you improve the project, consider submitting a **Pull Request** to share your work with the community. While contributing new modules is optional, any modifications to existing source files must be publicly available, as per our licensing terms.



## Developer Options
Choose an option based on your level of involvement:

- **Exploring the Code Online** – Browse the source code directly on GitHub.
- **Getting the Code via Git** – Clone the repositories to work locally.
- **Building from Source** – Use Gradle or Eclipse to build OSH.
- **Contributing** – Submit new features or bug fixes to the project.


## Exploring the Code
You can explore the OSH source code on GitHub:

- **Core Modules:** [osh-core](https://github.com/opensensorhub/osh-core)
- **Add-ons:** [osh-addons](https://github.com/opensensorhub/osh-addons)
  - **Communication Protocols:** [comm](https://github.com/opensensorhub/osh-addons/tree/master/comm)
  - **Sensor Drivers:**  [sensors](https://github.com/opensensorhub/osh-addons/tree/master/sensors)
  - **Processing Modules:** [processing](https://github.com/opensensorhub/osh-addons/tree/master/processing)
  - **Storage Backends:** [persistence](https://github.com/opensensorhub/osh-addons/tree/master/persistence)
  - **External Services:** [services](https://github.com/opensensorhub/osh-addons/tree/master/services)
  - **Security:** [security](https://github.com/opensensorhub/osh-addons/tree/master/security)
- **Android Development:** [osh-android](https://github.com/opensensorhub/osh-android)


## Getting the Code
To clone the OSH repositories using Git, run:

```sh
git clone --recursive https://github.com/opensensorhub/osh-core.git
```

> **Note:** The `--recursive` flag is required because `osh-core` includes submodules.

## Building from Source
OSH can be built using **Gradle** or **Eclipse**. You will need **JDK 17** to build the project.

### Building with Gradle
Using Gradle Wrapper (`gradlew` or `gradlew.bat` on Windows):

```sh
 cd osh-core
 ./gradlew build
```

Artifacts will be generated in `{module-name}/build/libs` and `build/distributions`.

To install artifacts to your local Maven repository:

```sh
./gradlew install
```


> **Notes:**
> 1. The first build may take time due to dependency downloads.
> 2. Ensure port **8888** is free, as some JUnit tests require it.

### Building Core + Add-on Modules
To build add-ons, clone both repositories:

```sh
git clone --recursive https://github.com/opensensorhub/osh-addons.git
```

Build specific add-ons:

```sh
cd osh-addons
./gradlew sensorhub-driver-fakegps:build
./gradlew sensorhub-driver-fakeweather:build
```

Or build all add-ons at once:

```sh
./gradlew build
```

### Building ZIP Distributions
To build an installable ZIP package:

```sh
cd osh-addons/dist/osh-base
./gradlew build
```

Find the package in `osh-base/build/distributions/`.

## Setting Up Eclipse
To develop using Eclipse:

### Prerequisites
- **Eclipse Neon+** (or newer)
- **Egit Plugin** (included in Eclipse IDE for Java Developers)
- **Buildship Plugin v2.0+**

### Importing Source Code
First, clone OSH repositories:

```sh
git clone --recursive https://github.com/opensensorhub/osh-addons
```

Then import the project into Eclipse:

1. Right-click in **Package Explorer** and select **Import**.
2. Choose **Gradle > Existing Gradle Project**.
3. Set the **Project root directory** to your local repository path.
4. Click **Finish**.

### Refreshing Gradle Settings
After modifying Gradle scripts, update Eclipse settings:

1. Right-click on a module.
2. Select **Gradle > Refresh Gradle Project**.

## Contributing
Follow these steps to contribute to OSH:

### Fork the Repository
1. Fork a repository on GitHub.
2. Clone your forked repository locally:

```sh
git clone --recursive https://github.com/yourusername/osh-core.git
```

### Development & Collaboration
- Discuss your planned contributions early to align with project needs.
- Follow existing code styles and add **Javadoc** and comments.

### Keeping Up-to-Date
Sync with the latest OSH changes:

```sh
git remote add upstream https://github.com/opensensorhub/osh-core.git
git pull upstream master
git submodule update
```

> **Note:** If conflicts arise, manually merge changes before continuing.

### Pushing Changes
Stage, commit, and push updates:

```sh
git commit -am "Your commit message"
git push
```

Alternatively, use **Eclipse**:

1. Right-click the project, select **Team > Commit**.
2. Enter a commit message and choose files.
3. Click **Commit and Push**.

### Submitting a Pull Request
When ready, create a **Pull Request (PR)** on GitHub. Include a detailed description of your changes to help maintainers review your contribution efficiently.

---

Thank you for contributing to OpenSensorHub!