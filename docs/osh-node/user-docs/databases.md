---
title: Databases
sidebar_position: 2
---

# Databases

**OpenSensorHub** databases are used to persist data from sensor outputs, process outputs, or other nodes via *Service Modules*.

**OpenSensorHub** comes pre-packaged with a basic H2 database module, and a *System Driver Database*, which uses the basic H2 database, but with additional features.

## Federated Database

The federated database will always appear at the top of the *Databases* tab, and contains data from all running databases on the **OpenSensorHub** node.
It features a search bar and the ability to check any system's observations.

If a *Sensor Driver*, *Process Module*, or *Service Module* do not have an associated database, then only the latest observations produced by these modules will be shown in the federated database.
![federated.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fdatabases%2Ffederated.png)

## Basic H2 Database

The H2 database module is the most basic module for interfacing between a database file and **OpenSensorHub**.

### Configuration

For an H2 database module to run, a storage path, or path to the database file is required. Once specifying this path, 
The other default configuration options will be sufficient for most use cases.

![h2db.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fdatabases%2Fh2db.png)

The H2 database module wrapped inside the *System Driver Database*, the configuration of the actual H2 database used by the *System Driver Database* will appear as it would in an H2 database module.

### Usage

The H2 database module can be used as a store that *Service Modules* can write to, or it can be used to load **OpenSensorHub**-compatible database files from another node.

## System Driver Database

*System Driver Databases* are used as a means of capturing data from *Sensor Drivers* or *Process Modules* for long-term storage. 
This is different from the standalone H2 database, as it has a mechanism for pulling data directly from sensors or processes without having to edit the *Sensor Driver* or *Process Module* configuration.

#### Configuration

Below, you will see the default configuration of a *System Driver Database*.
There are 3 important parts of the *System Driver Database* configuration.

| Configuration          | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| System UIDs            | A list of system UIDs or UID patterns (i.e. `urn:osh:sensor:*`) to persist. |
| Database Config        | H2 database configuration. See previous section.                            |
| Automatic Purge Policy | A list of policies used to regularly purge data from the database.          |

---

![systemdriverdb.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fdatabases%2Fsystemdriverdb.png)

### System UIDs

Upon adding system UIDs to your *System Driver Database*, you will see those systems appear below the *System Driver Database* configuration.
You will also notice that their observations will start being persisted in the table below *Database Content*. 
This means that your sensor or process is publishing outputs, and your database is storing those observations.

If you want to add a *Sensor System* and its subsystems to a *System Driver Database*, you only need to put the UID of the parent system. This will typically look like `urn:osh:system:<parent id>`

:::info
Click *Apply Changes* after all module configuration updates!
:::

![systemuids.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fdatabases%2Fsystemuids.png)

:::tip
You may use a UID pattern to specify all UIDs with a certain prefix. For example, `urn:osh:sensor:*` will add all *Sensor Drivers* to the *System Driver Database*.
:::

### Database Config

The *System Driver Database* is built on top of the basic H2 database module. 
This means that you will need to specify a database file path to use, as well as any other lower-level configuration as needed.
Please refer back to the previous section about the basic H2 database module to learn more.

![systemdbconfig.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fdatabases%2Fsystemdbconfig.png)

### Automatic Purge Policy

Automatic purge policies will instruct the *System Driver Database* module to purge specified systems from the database routinely.

Here, we can specify a few things
- Which systems are purged via their UIDs or a UID pattern. This is `*` by default, which means **ALL** systems will be purged.
- How often these systems are purged from the database (in seconds).
- The maximum age of data to be kept in the database (in seconds).

![purgepolicy.png](..%2F..%2Fassets%2Fosh%2Fadminui%2Fdatabases%2Fpurgepolicy.png)