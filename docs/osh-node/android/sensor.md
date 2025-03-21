---
title:   Adding a New Sensor
---


# Guide to Adding a new Sensor Driver to OSH Android App

### Prerequisites
- [OSH Android Repository](https://github.com/opensensorhub/osh-android)
- Java 17
- Android Studio 
- 


<!-- **After following the [Build Guide](building.md) and ensuring the Android project is working. We can now add a new driver to the Android app.** -->

### Step 1: Open the project in Android Studio

Before moving to Step 2: determine whether you are:
1. Is the driver an existing driver from osh-addons or another addon-like driver repo or is it android specific?
2. If it is android specific, is it a hardware driver or external device driver? 

**Hardware drivers are drivers that are built into the android device and are accessed through the android API whereas 
external drivers can be things connected through the android device through Bluetooth, USB, WiFi or other means.**


### Step 2: Creating a New Driver directory
1. Right click on the `'sensorhub-android-template'` module and click `Copy` and paste the directory in the top level of the project. 
2. Rename the project to 'sensorhub-android-sensorName'
3. Navigate to the `sensorhub-android-app' build.gradle and include your dependency

```xml title="/res/xml/values/prefs_sensor.xml"
    implementation project(':sensorhub-android-sensorName')
```

4. Sync Gradle after modifying the `build.gradle`

### Step 3: Updating the new Sensor Driver
- Make the necessary modifications to the driver based on the sensor's requirements.

### Step 4: Add Sensor to the Android Preferences
1. Open the `prefs_sensor.xml` file in the `res/xml` directory of `sensorhub-android-app`.
2. Add an entry to enable the sensor in the UI:

```xml title="/res/xml/prefs_sensor.xml"
<SwitchPreference
    android:defaultValue="false"
    android:key="sensor_enabled"
    android:summary="Enable streaming of Sensor"
    android:title="Sensor Data" />

<EditTextPreference
    android:defaultValue="00:00:00:00:00:00"
    android:inputType="text"
    android:key="bluetooth_address"
    android:singleLine="true"
    android:title="Sensor Bluetooth Address" />

<MultiSelectListPreference
    android:key="sensor_options"
    android:title="Sensor Output Options"
    android:summary="Options for pushing sensor data"
    android:entries="@array/sos_option_list"
    android:entryValues="@array/sos_option_values"
    android:defaultValue="@array/sos_option_defaults" />

```


### Step 5: Add the necessary information to the `strings.xml`file
- In this file, you can add the information about the sensor, this may be more in depth depending on the complexity of your sensor. 
1. Open `res/values/strings.xml`
2. Add the sensors display name:

```xml
<string name="sensor_name">Sensor Name</string>
```

### Step 6: Importing Sensor into MainActivity.java
1. Import your sensor at the top of the file
2. Update the `Sensors` enum to include the new sensor name

```java title="/src/org/sensorhub.android/MainActvity.java"
enum Sensors{

    //... rest of sensors
    sensorName,
}

```


3. Modify the `updateConfig` method to check if the sensor is enabled and configure it accordingly:

```java title="/src/org/sensorhub.android/MainActvity.java"
    protected void updateConfig(SharedPreferences prefs, String runName) {

    // rest of code

    enabled = prefs.getBoolean("sensor_enabled", false);

    if (enabled) {
        BleConfig bleConf = new BleConfig();
        bleConf.id = "BLE";
        bleConf.moduleClass = BleNetwork.class.getCanonicalName();
        bleConf.androidContext = this.getApplicationContext();
        bleConf.autoStart = true;(buil)
        sensorhubConfig.add(bleConf);

        SensorConfig config = new SensorConfig();
        config.id = "SENSOR";
        config.name = "Sensor [" + deviceName + "]";
        config.autoStart = true;
        config.networkID = bleConf.id;
        config.btAddress = prefs.getString("sensor_bt_address", null);
        config.androidContext = this.getApplicationContext();
        sensorhubConfig.add(config);
    }
}
```

### Step 7: Build and Test the Integration
<!-- - After completing these steps, follow the [Build Guide](build.md) to compile and test your changes in the OSH Android app. -->
