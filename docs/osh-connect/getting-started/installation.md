---
title: Installation 
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

OSHConnect can be installed in Python and Java, using *pip* (or *poetry*) for Python, and *gradle* for Java.

**Installing OSHConnect**

**OSHConnect-Python**

[*Link to the GitHub Repository*](https://github.com/Botts-Innovative-Research/OSHConnect-Python)

<Tabs>
    <TabItem value="pip" label="pip" default>
    ```py
    pip install git+https://github.com/Botts-Innovative-Research/OSHConnect-Python.git
    ```
    </TabItem>
    <TabItem value="poetry" label="poetry">
    ```py
    poetry add git+https://github.com/Botts-Innovative-Research/OSHConnect-Python.git
    ```
    </TabItem>
</Tabs>

**OSHConnect-Java**

[*Link to the GitHub Repository*](https://github.com/Botts-Innovative-Research/OSHConnect-Java)

Please clone/download the git repository for OSHConnect-Java and include it as a submodule in your gradle project.

```gradle title="settings.gradle"
includeBuild('path/to/OSHConnect-Java')
```