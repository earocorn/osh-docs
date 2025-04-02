---
title: Configure Raspberry Pi and Remote Connect Using SSH
sidebar_position: 4
---


<div style={{ color:"#039dfc", fontWeight:"bold" }} >Training Module 03</div>

# Configure Raspberry Pi and Remote Connect Using SSH
### Requirements
- Completed [Training Module 01: Choosing a Sensor](01_Choosing_A_Sensor.md)
- Monitor
- Mouse
- Keyboard
- Wifi connection
- Personal Computer
- Operating Raspberry Pi set up as an interactive computer

### Objective
In this module, we will connect our operating Raspberry Pi to our Wifi network. Afterwards, we will connect remotely to the Raspberry Pi from our personal computer using <a href="https://en.wikipedia.org/wiki/Secure_Shell">Secure Shell Protocol (SSH)</a>. 
:::tip
If this is the first time the Raspberry Pi you intend to use has been operated on, or you prefer to start from scratch, set up your Raspberry Pi using the <a href="https://www.raspberrypi.com/documentation/computers/getting-started.html">Getting Started with your Raspberry Pi</a> tutorial.
:::

## Getting Started
<div style={{ fontStyle:"italic",  fontSize:"10px", marginBottom:"10px" }} >Reference: <a href="https://www.raspberrypi.com/documentation/computers/getting-started.html#power-supply">Raspberry Pi: Getting Started</a></div>

First, make sure your Raspberry Pi is properly connected to the Power Supply. Plug your power suppy into the port makred "PWR IN":

<img style={{ maxHeight:"250px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/peripherals/cable-power.png?hash=e8b191aea5a4fc3076f6cb60907adf9d" />

Next, plug in the keyboard...

<img style={{ maxHeight:"250px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/peripherals/cable-key.png" />

Then, plug in the mouse...

<img style={{ maxHeight:"250px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/peripherals/cable-mouse.png" />

Finally, connect your monitor...
<img style={{ maxHeight:"250px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/peripherals/cable-hdmi.png?hash=2637781a125e514c99878ba9e092ff32" />


## Connect Raspberry to Wifi
<div style={{ fontStyle:"italic",  fontSize:"10px", marginBottom:"10px" }} >Reference: <a href="https://www.raspberrypi.com/documentation/computers/configuration.html">Raspberry Pi: Configuration</a></div>

With everything plugged into the Raspberry Pi, you should be able to access the desktop screen. To connect the wifi, access Network Manager via the network icon at the rightHand end of the menu bar. If you are using a Raspberry Pi with built-in wireless connectivity, or if a wireless dongle is plugged in, click this icon to bring up a list of available wireless networks.

<img style={{ maxHeight:"600px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/wifi2.png?hash=139dbad7ec82cf5390eaf1d06cef2e82" />

The icons on the right show whether a network is secured or not, and give an indication of signal strength. Click the network that you want to connect to. If the network is secured, a dialogue box will prompt you to enter the network key:

<img style={{ maxHeight:"600px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/key.png?hash=3ebe83ff09d9e64e63578965a6b7eeb9" />

Enter the key and click OK, then wait a couple of seconds. The network icon will flash briefly to show that a connection is being made. When connected, the icon will stop flashing and show the signal strength.

## Obtain IP Address of Raspberry Pi
<div style={{ fontStyle:"italic",  fontSize:"10px", marginBottom:"10px" }} >Reference: <a href="https://www.raspberrypi.com/documentation/computers/remote-access.html" >Raspberry Pi: Remote Access</a></div>

Now that you're Raspberry Pi is connected to your network, we will begin shifting our focus to your personal computer. However, to remotely connect to your Raspberry Pi, you will first need to obtain the IP Address associated your Raspberry Pi. Here are a couple ways to do this:

### Desktop
If you still have access to the R-Pi's Desktop, Hover over the network icon in the system tray, and a tooltip will appear. This tooltip displays the name of the network you’re currently connected to and your IP address. Copy this down and save for later.

<img style={{ maxHeight:"600px", display:"flex", margin:"auto", marginBottom:"10px" }} src="https://www.raspberrypi.com/documentation/computers/images/network-tooltip.png?hash=802d425394eaf91869e2b3c29af37e39" />

### Remotely with mDNS
Raspberry Pi OS supports multicast DNS as part of the Avahi service.

If your device supports mDNS, you can reach your Raspberry Pi in the terminal of your personal computer by using its hostname and the <em>.local</em> suffix (as longa as both your computer and the Raspberry Pi are connected to the same network). The default hostname on a fresh Raspberry Pi OS install is raspberrypi, so by default any Raspberry Pi running Raspberry Pi OS responds to:

```bash
ping raspberrypi.local
```

If the Raspberry Pi is reachable, ping will show its IP address:

```bash
PING raspberrypi.local (192.168.1.131): 56 data bytes
64 bytes from 192.168.1.131: icmp_seq=0 ttl=255 time=2.618 ms
```
Copy this IP Address down

## Remote Connect using SSH
You can access the terminal of a Raspberry Pi remotely from another computer on the same network using the <a href="https://en.wikipedia.org/wiki/Secure_Shell" >Secure Shell (SSH) protocol</a>.
:::tip 
This can only be done if SSH is enabled on the Raspberry Pi OS. If this is the first time the R-Pi is being used, you will need to enable it. Following these <a href="https://www.raspberrypi.com/documentation/computers/remote-access.html#enable-theSshServer">Enable the SSH server</a> instructions.
:::

To connect to an SSH server, open a terminal window on your computer and enter the following command, replacing the <em>\<ip address></em> placeholder with the IP address of the Raspberry Pi you’re trying to connect to and \<username> with your username. If no username was setup, the devaul username is <em>pi</em> and the default password is <em>raspberry</em>

```bash
ssh <username>@<ip address>

@Example:
ssh pi@192.168.1.8
```

When the connection works, you will see a security warning. Type yes to continue. You will only see this warning the first time you connect.

Enter your account password when prompted.

You should now see the Raspberry Pi command prompt:

```<username>@<hostname> ~ $```

You are now connected to the Raspberry Pi remotely, and can execute commands.

# Recap
Congratulations, in this module, you configured your Raspberry Pi to accept a remote connection from your personal computer using SSH. In the next module, we write a sample code to read our sensor and output to the terminal.

### Next Module: Build Isolated Driver as a Java Class
