---
title: "01: Choosing A Sensor"
sidebar_position: 2
---

<div style={{ color: "#039dfc", fontWeight: "bold" }}>Training Module 01</div>

# Sensor Selection

<div style={{ width: "100%", backgroundColor: "white", marginBottom: "20px" }}>
    <img 
        src="https://img.kwcdn.com/product/fancy/bc90eeac-57bf-4c37-842f-e7fd02902185.jpg?imageView2/2/w/1300/q/90/format/webp" 
        alt="Arduino Sensor Kit"
        style={{ aspectRatio: "auto", width: "200px", display: "block", margin: "auto" }}
    />
</div>

For this training, the first step is to _select a sensor_. While you have the option to pick any of the (37) Arduino sensors provided, it is recommended to use the [KY-032 Infrared Obstacle Avoidance Sensor](https://arduinomodules.info/ky-032-infrared-obstacle-avoidance-sensor-module/) if this is your first time developing a driver for a sensor, as the remaining modules will reference the setup of this specific sensor. Once you understand the basics, setting up other sensors will be much easier.

<div style={{ width: "100%", backgroundColor: "#ccedd5", padding: "5px", borderRadius: "5px", color: "#40694b" }}>
   <div style={{ fontWeight: "bold" }}>Note:</div>
   <div>
       For your convenience, please reference the 
       [Sensor Guide](https://docs.google.com/spreadsheets/d/1KxU92dxuTOQo6dTAHtTmTw2lgRNJ9GxAE7kaZTy7Gfs/edit?usp=drive_link) 
       for more information when selecting a sensor. This guide was created as a centralized location to provide an 
       overview of each sensor. It is recommended to start with a Digital Sensor instead of an Analog Sensor.
   </div>
</div>

## The KY-032 Infrared Obstacle Avoidance Sensor

<div style={{ display: "inline-flex", width: "100%", backgroundColor: "white", justifyContent: "center" }}>
    <img 
        src="https://arduinomodules.info/wp-content/uploads/KY-032_IR_obstacle_avoidance_sensor_custom_part_image-86x240.png"
        alt="KY-032 Sensor"
    />
    <img 
        src="https://arduinomodules.info/wp-content/uploads/KY-032_IR_obstacle_avoidance_sensor_module_arduino-240x240.jpg"
        alt="KY-032 Sensor with Arduino"
    />
</div>

Before developing a driver for a sensor, it's always best to obtain as much information as you can about the sensor. Let's start by accessing the [KY-032 Specifications](https://arduinomodules.info/ky-032-infrared-obstacle-avoidance-sensor-module/).

Upon reviewing the specifications, some important takeaways are:

- The KY-032 Sensor has (4) Pins: GND, +, S, and EN.
- The Working Voltage (or _Operating Voltage_) is 3.3V - 5V DC.
- The Output Signal is TTL.
- The module uses (2) knobs to adjust the detection distance (Left Knob) and the frequency of the IR pulse (Right Knob).

### What does this mean?

Let's translate the above specifications into a visual representation (reference the image below). To operate, the sensor needs 3.3V to 5V.

<div style={{ width: "100%", backgroundColor: "#f7e0b7", padding: "5px", borderRadius: "5px", color: "#966612" }}>
   <div style={{ fontWeight: "bold" }}>Important:</div>
   <div>If left unhindered, the output voltage of the sensor when operating at normal capacity would also be 3.3V - 5V.</div>
</div>

<div style={{ width: "100%", backgroundColor: "white", padding: "5px", color: "#966612", margin: "auto" }}>
    ![test](../../../static/img/KY032.png)
</div>

## Recap

For this module, you selected a KY-032 Sensor. You learned how to find the specifications for this sensor and the basic anatomy of how the sensor will operate.

