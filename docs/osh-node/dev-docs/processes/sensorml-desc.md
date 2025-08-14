---
title: SensorML Description
sidebar_position: 4
toc_max_heading_level: 5
---

The SensorML may contain multiple sections which allow a detailed description of the 'stations' metadata. We use the sections `keywords`, `identification`, `classification`, `capabilities`, `contact`, `inputs` and `outputs` to depict the station.

<!-- | SensorML Element    |                    |
|---------------------|--------------------------------------|
| Name | |
| Description | |
| Keywords | |
| Identifiers | |
| Classification | |
| Characteristics | |
| Capabilities | |
| Contacts | |
| Position | |
| Components | |
| Connections | | -->


### Header
The header information describes the schema and namespaces. Except for the *gml:id* value and the element type (i.e. *SimpleProcess*, *AggregateProcess*, *PhysicalComponent*, or *PhysicalSystem*) , it will be the same for all SensorML documents. 

```xml title=Aggregate Process
<sml:AggregateProcess gml:id="scaleAndClip01" 
// highlight-start
xmlns:xlink="http://www.w3.org/1999/xlink" 
xmlns:sml="http://www.opengis.net/sensorml/2.0" 
xmlns:swe="http://www.opengis.net/swe/2.0" 
xmlns:gml="http://www.opengis.net/gml/3.2" 
xmlns:gco="http://www.isotc211.org/2005/gco"
xmlns:gmd="http://www.isotc211.org/2005/gmd" 
 // highlight-end
>
</sml:AggregateProcess>
```

### Metadata: Description, Name, Identifiers, and Keywords
The `gml-identifier` is **required** and must contain a unique ID of some sort (a UUID, URN, URL or simple text). This ID is used to identify any service or resource associated with this object. The `gml-description` should at a minimum tell "what it measures" and "where it is" and provides a textual description for the feature. The `gml:name` is a common name for the object described. The `sml:keywords` provides a list of keywords that may assist a user to search for the object being described. 

```xml title="Example of a name section"
<gml:name>PROCESS NAME EXAMPLE</gml:name>
```

```xml title="Example of a description section"
<gml:description>
A process that does this, and measures that.
</gml:description>
```

```xml title="Example of a keyword section"
<keywords>
    <KeywordList>
        <keyword>weather station</keyword>
        <keyword>precipitation</keyword>
        <keyword>wind speed</keyword>
        <keyword>temperature</keyword>
    </KeywordList>
</keywords>
```

```xml title="Example of a identifier section"
<gml:identifier codeSpace="uniqueID">urn:myCompany:swe:process:PROCESS_EXAMPLE<gml:identifier>
```

### Classification
The `classification` section gives more information about the type of system. 

```xml title=Example of a classification section
<classification>
    <ClassifierList>
        <classifier name="intendedApplication">
            <Term definition="urn:ogc:def:classifier:OGC:1.0:application">
                <value>weather</value>
            </Term>
        </classifier>
        <classifier name="sensorType">
            <Term definition="urn:ogc:def:classifier:OGC:1.0:sensorType">
                <value>thermometer</value>
            </Term>
        </classifier>
 </ClassifierList>

```

<!-- ### ValidTime
The `validTime` section provides information about the time period in which a sensor description is valid.

```xml title=Example of a validTime section
<validTime>
    <gml:TimePeriod>
        <gml:beginPosition>2025-01-15</gml:beginPosition>
        <gml:endPosition>2026-01-20</gml:endPosition>
    </gml:TimePeriod>
</validTime>
``` -->

### Capabilities

```xml title=Example of a capabilities section
<capabilities>
    <swe:DataRecord definition="urn:ogc:def:property:capabilities">
        <swe:field name="status">
            <swe:Text definition="urn:ogc:def:property:OGC:1.0:status">
            <gml:description>The operating status of the system.
            </gml:description>
            <swe:value>active</swe:value>
            </swe:Text>
        </swe:field>
        <swe:field name="observedBBOX">
            <swe:Envelope definition="urn:ogc:def:property:OGC:1.0:observedBBOX">
                <swe:lowerCorner>
                    <swe:Vector>
                        <swe:coordinate name="easting">
                            <swe:Quantity axisID="x">
                                <swe:uom code="m"/>
                                <swe:value>2592308.332</swe:value>
                            </swe:Quantity>
                        </swe:coordinate>
                        <swe:coordinate name="northing">
                                <swe:Quantity axisID="y">
                                    <swe:uom code="m"/>
                                    <swe:value>5659592.542</swe:value>
                                </swe:Quantity>
                        </swe:coordinate>
                    </swe:Vector>
                </swe:lowerCorner>
            <swe:upperCorner>
            <swe:Vector>
                <swe:coordinate name="easting">
                    <swe:Quantity axisID="x">
                        <swe:uom code="m"/>
                        <swe:value>2592308.332</swe:value>
                    </swe:Quantity>
                </swe:coordinate>
                <swe:coordinate name="northing">
                    <swe:Quantity axisID="y">
                        <swe:uom code="m"/>
                        <swe:value>5659592.542</swe:value>
                    </swe:Quantity>
                </swe:coordinate>
                </swe:Vector>
            </swe:upperCorner>
            </swe:Envelope>
        </swe:field>
    </swe:DataRecord>
</capabilities>

```

### Contact

```xml title=Example of a contact section
<contact>
    <ResponsibleParty gml:id="WWU_IfGI_weather_station_contact">
        <organizationName>Westfaelische Wilhelms-Universitaet Muenster, Institute for Geoinformatics, Sensor Web and Simulation Lab</organizationName>
        <contactInfo>
            <address>
                <electronicMailAddress>swsl-ifgi@listserv.unimuenster.de</electronicMailAddress>
            </address>
        </contactInfo>
    </ResponsibleParty>
</contact>

```

### Inputs

```xml title=Example of a input section
<inputs>
    <InputList>
        <input name="precipitation">
            <swe:ObservableProperty definition="urn:ogc:def:property:OGC:1.0:precipitation"/>
        </input>
        <input name="wind">
            <swe:ObservableProperty definition="urn:ogc:def:property:OGC:1.0:wind"/>
        </input>
        <input name="atmosphericTemperature">
            <swe:ObservableProperty definition="urn:ogc:def:property:OGC:1.0:temperature"/>
        </input>
    </InputList>
</inputs>

```

### Outputs

```xml title=Example of a output section
<outputs>
    <OutputList>
        <output name="precipitation">
            <swe:Quantity definition="urn:ogc:def:property:OGC:1.0:precipitation">
                <swe:uom code="mm"/>
            </swe:Quantity>
        </output>
        <output name="windDirection">
            <swe:Quantity definition="urn:ogc:def:property:OGC:1.0:windDirection">
                <swe:uom code="deg"/>
            </swe:Quantity>
        </output>
        <output name="windSpeed">
            <swe:Quantity definition="urn:ogc:def:property:OGC:1.0:windSpeed">
                <swe:uom code="m/s"/>
            </swe:Quantity>
        </output>
        <output name="temperature">
            <swe:Quantity definition="urn:ogc:def:property:OGC:1.0:temperature">
                <swe:uom code="Cel"/>
            </swe:Quantity>
        </output>
    </Output
 </outputs>
```

### Position

```xml title=Example of a position section
<position name="stationPosition">
    <swe:Position referenceFrame="urn:ogc:def:crs:EPSG:6.14:31466">
        <swe:location>
            <swe:Vector gml:id="SYSTEM_LOCATION">
                <swe:coordinate name="easting">
                    <swe:Quantity axisID="x">
                        <swe:uom code="m"/>
                        <swe:value>2592308.332</swe:value>
                    </swe:Quantity>
                </swe:coordinate>
                <swe:coordinate name="northing">
                    <swe:Quantity axisID="y">
                        <swe:uom code="m"/>
                        <swe:value>5659592.542</swe:value>
                    </swe:Quantity>
                </swe:coordinate>
                <swe:coordinate name="altitude">
                    <swe:Quantity axisID="z">
                        <swe:uom code="m"/>
                        <swe:value>297.0</swe:value>
                    </swe:Quantity>
                </swe:coordinate>
            </swe:Vector>
        </swe:location>
    </swe:Position>
</position>
```

### Components
The `components` property takes a `ComponentList` as its value, that is a list of nested `AbstractProcess` instances. 
```xml title=Example of a components section
<components>
    <ComponentList>
        <component name="rainGauge" xlink:href="http://mySensorMLregistry.com?object=98765"/>
        <component name="anemoneter" xlink:href="http://mySensorMLregistry.com?object=33333"/>
        <component name="thermometer" >
            <component>
            … <!-- inline description of Component -->
            </component>
        </component>
    </ComponentList>
</components>
```

### Connections
The `connections` property takes a `ConnectionList` as its value, that is a list of nested `Link` instances that specify the source and destination of each connection.





## Examples
 This example shows an Aggregate Process which performs a scaling and clipping of data values. The two components are a LinearInterpolator process referred to as the 'scale' and a Threshold process referred to as the 'clip'.


<!-- ### Header
The header information describes the schema and namespaces. Except for the *gml:id* value and the element type (i.e. *SimpleProcess*, *AggregateProcess*, *PhysicalComponent*, or *PhysicalSystem*) , it will be the same for all SensorML documents. 

```xml title=Aggregate Process
<sml:AggregateProcess gml:id="scaleAndClip01" 
// highlight-start
xmlns:xlink="http://www.w3.org/1999/xlink" 
xmlns:sml="http://www.opengis.net/sensorml/2.0" 
xmlns:swe="http://www.opengis.net/swe/2.0" 
xmlns:gml="http://www.opengis.net/gml/3.2" 
xmlns:gco="http://www.isotc211.org/2005/gco"
xmlns:gmd="http://www.isotc211.org/2005/gmd" 
 // highlight-end
>
</sml:AggregateProcess>
``` -->

<!-- ### Metadata - Description, Name, Keywords and Unique IDs
The `gml-identifier` is **required** and must contain a unique ID of some sort (a UUID, URN, URL or simple text). This ID is used to identify any service or resource associated with this object. The `gml-description` should at a minimum tell "what it measures" and "where it is" and provides a textual description for the feature. The `gml:name` is a common name for the object described. The `sml:keywords` provides a list of keywords that may assist in discoverying this object.

```xml
<!-- ============================= -->
<!--       Descriptions            -->
<!-- ============================= -->
<!-- <gml:description>
    A simple aggregate process that scales according to linear equation y = 2.3x + 1.76 and then clips if below 15.0
    In this example all processes are defined inline with no configuration settings. Parameter values are set inline.
</gml:description>
// highlight-start
<gml:identifier codeSpace="uniqueID">urn:myCompany:swe:process:scaleAndClip01<gml:identifier>
// highlight-end
<gml:name>Scale and Clip Aggregate Process 01</gml:name>

<sml:keywords>
    <sml:KeywordList>
        <sml:keyword>linear interpolation</sml:keyword>
        <sml:keyword>keyword2</sml:keyword>
    </sml:KeywordList>
</sml:keywords> -->
<!-- ```  -->


### Observed 

```xml Inputs
<!-- ============================= -->
<!--  Aggregate Process Inputs    -->
<!-- ============================= -->
<sml:inputs>
    <sml:InputList>
        <sml:input name="valueIn">
            <swe:Quantity definition="http://sensorml.com/ont/swe/property/SimpleDN">
                <swe:uom code="any"/>
            </swe:Quantity>
        </sml:input>
    </sml:InputList>    
</sml:inputs>

```

```xml Outputs
    <!-- ============================= -->
    <!--  Aggregate Process Outputs    -->
    <!-- ============================= -->
    <sml:outputs>
        <sml:OutputList>
            <sml:output name="valueOut">
                <swe:Quantity definition="http://sensorml.com/ont/swe/property/DN">
                    <swe:uom code="any"/>
                </swe:Quantity>                
            </sml:output>
         </sml:OutputList>     
     </sml:outputs>
```

### Capabilities
The *Capabailities* property

```xml

```

### Characteristics
The *Characteristics* property 


### Components
The **Components** element is made up of a list, **ComponentsList**, where each item in the list is 
```xml
<!-- ======================================= -->
<!--  Aggregate process components declared   -->
<!-- ======================================== -->
  <sml:components>
        <sml:ComponentList >
         
            <!-- Component 1 - Linear Interpolator -->
            <sml:component name="scale">    
                <sml:SimpleProcess gml:id="linearInterpolator01"
                    definition="http://sensorml/ont/swe/process/LinearInterpolator">
                    <!-- ============================= -->
                    <!-- Linear Interpolator Descriptions  -->
                    <!-- ============================= -->
                    <gml:description>A linear interpolator based on equation y = mx + b </gml:description>
                    <gml:identifier codeSpace="uid">urn:myCompany:process:8755d73ab</gml:identifier>
                    <gml:name>Linear Equation 01</gml:name>
                    <!-- ============================= -->
                    <!--  Linear Interpolator Inputs    -->
                    <!-- ============================= -->
                    <sml:inputs>
                        <sml:InputList>
                            <sml:input name="x">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/DN">
                                    <swe:uom code="any"/>
                                </swe:Quantity>
                            </sml:input>
                        </sml:InputList>    
                    </sml:inputs>
                    <!-- ============================= -->
                    <!--  Linear Interpolator Outputs  -->
                    <!-- ============================= -->
                    <sml:outputs>
                        <sml:OutputList>
                        <!-- scaled output value -->
                            <sml:output name="y">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/DN">
                                    <swe:uom code="any"/>
                                </swe:Quantity>                
                            </sml:output>
                        </sml:OutputList>     
                     </sml:outputs>
                    <!-- ============================= -->
                    <!--         Linear Interpolator Parameters        -->
                    <!-- ============================= -->
                    <sml:parameters>
                        <sml:ParameterList>
                            <sml:parameter name="slope-intercept">
                                <swe:DataRecord>
                                    <swe:field name="slope">
                                        <swe:Quantity definition="http://sensorml.com/ont/swe/property/LinearSlope">
                                            <swe:uom code="any"/>
                                            <!-- slope value set inline -->
                                            <swe:value>2.3</swe:value>
                                        </swe:Quantity>
                                    </swe:field>
                                    <swe:field name="intercept">
                                        <swe:Quantity definition="http://sensorml.com/ont/swe/property/LinearAxisIntercept">
                                            <!-- y-intercept value set inline -->
                                            <swe:uom code="any"/>
                                            <swe:value>1.76</swe:value>
                                        </swe:Quantity>
                                    </swe:field>
                                </swe:DataRecord>                
                            </sml:parameter>
                        </sml:ParameterList>       
                    </sml:parameters>
                </sml:SimpleProcess>        
            </sml:component>
             
 
            <!-- Component 2 - Threshold clipper -->
            <sml:component name="clip"> 
                <sml:SimpleProcess gml:id="thresholdClipper"
                    definition="http://sensorml.com/ont/swe/process/thresholdClipper">
                    <!-- ============================= -->
                    <!-- Threshold Clipper  Descriptions -->
                    <!-- ============================= -->
                    <gml:description>
                        A process that clips anything below threshold; 
                        values higher than threshold to passValue output;
                        Values below threshold sent to failValue output</gml:description>
                    <gml:identifier codeSpace="uid">urn:myCompany:swe:process:65d74a65c</gml:identifier>
                    <gml:name>Threshold Clipper  01</gml:name>
                    <!-- ============================= -->
                    <!-- Threshold Clipper Inputs      -->
                    <!-- ============================= -->
                    <sml:inputs>
                        <sml:InputList>
                            <sml:input name="valueIn">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/SimpleDN">
                                    <swe:uom code="any"/>
                                </swe:Quantity>
                            </sml:input>
                        </sml:InputList>    
                    </sml:inputs>
                    <!-- ============================= -->
                    <!--  Threshold Clipper Outputs    -->
                    <!-- ============================= -->
                    <sml:outputs>
                        <sml:OutputList>
                        <!-- output for values that pass -->
                            <sml:output name="passValue">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/PassValue">
                                    <swe:uom code="any"/>
                                </swe:Quantity>                
                            </sml:output>
                            <!-- output for values that fail -->
                            <sml:output name="failValue">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/FailValue">
                                    <swe:uom code="any"/>
                                </swe:Quantity>                
                            </sml:output>
                        </sml:OutputList>     
                     </sml:outputs>
                    <!-- ============================= -->
                    <!--  Threshold Clipper Parameters  -->
                    <!-- ============================= -->
                    <sml:parameters>
                        <sml:ParameterList>
                            <sml:parameter name="threshold">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/LowerThreshold">
                                    <swe:uom code="any"/>
                                    <!-- threshold value set inline -->
                                    <swe:value>15.0</swe:value>
                                </swe:Quantity>
                            </sml:parameter>
                        </sml:ParameterList>       
                    </sml:parameters>
                </sml:SimpleProcess>        
            </sml:component>
             
        </sml:ComponentList>
    </sml:components>

```

#### Inputs, Outputs, and Parameters
sml:input and sml:output elements define the properties that are measured by processes

An example of inputs, outputs, and parameters from a particular process is given below. 
```xml title=Threshold Clipper Inputs  
<sml:inputs>
    <sml:InputList>
        <sml:input name="valueIn">
            <swe:Quantity definition="http://sensorml.com/ont/swe/property/SimpleDN">
                <swe:uom code="any"/>
            </swe:Quantity>
        </sml:input>
    </sml:InputList> 
</sml:inputs>
```

```xml title=Threshold Clipper Outputs  
<sml:outputs>
    <sml:OutputList>
        <!-- output for values that pass -->
        <sml:output name="passValue">
            <swe:Quantity definition="http://sensorml.com/ont/swe/property/PassValue">
                <swe:uom code="any"/>
            </swe:Quantity>                
        </sml:output>
        <!-- output for values that fail -->
        <sml:output name="failValue">
            <swe:Quantity definition="http://sensorml.com/ont/swe/property/FailValue">
                <swe:uom code="any"/>
            </swe:Quantity>                
        </sml:output>
    </sml:OutputList>     
</sml:outputs>
```

```xml title=Threshold Clipper Parameters
<sml:parameters>
    <sml:ParameterList>
        <sml:parameter name="threshold">
            <swe:Quantity definition="http://sensorml.com/ont/swe/property/LowerThreshold">
                <swe:uom code="any"/>
                <!-- threshold value set inline -->
                <swe:value>15.0</swe:value>
            </swe:Quantity>
        </sml:parameter>
    </sml:ParameterList>       
</sml:parameters>
```



### Connections
The Connection . THe *Link* element defines a connection between properties of a process, it typically conencts inputs, outputs, and parameters. There are rules between the sources of data (provided by the *Source* property) and destination for data (provided by the *Destination* property) of the *Link* element. Typical data flow is from an aggregate processes input to one or more component’s input, from a component output to another component’s input, or from a component’s output to an output of the aggregate process.
```xml
<sml:connections>
    <sml:ConnectionList>

        <!-- Connect AggregateProcess input to LinearInterpolator (scale) input -->
        <sml:connection>
            <sml:Link>
                <sml:source ref="inputs/valueIn"/>
                <sml:destination ref="components/scale/inputs/x"/>
            </sml:Link>
        </sml:connection>
            
        <!-- Connect LinearInterpolator (scale) output to ThresholdClipper (clip) input -->
        <sml:connection>
            <sml:Link>
                <sml:source ref="components/scale/outputs/y"/>
                <sml:destination ref="components/clip/inputs/valueIn"/>
            </sml:Link>
        </sml:connection>

        <!-- Connect ThresholdClipper (clip) passValue output to AggregateProcess passValue output -->
        <sml:connection>
            <sml:Link>
                <sml:source ref="components/clip/outputs/passValue"/>
                <sml:destination ref="outputs/valueOut"/>
            </sml:Link>
        </sml:connection>

        <!-- Note: ThresholdClipper (clip) failValue output is ignored in this example -->

    </sml:ConnectionList>
</sml:connections>
```



### Full Example XML
```xml
<sml:AggregateProcess gml:id="scaleAndClip01"
    xmlns:sml="http://www.opengis.net/sensorml/2.0"
    xmlns:swe="http://www.opengis.net/swe/2.0"
    xmlns:gml="http://www.opengis.net/gml/3.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xsi:schemaLocation="http://www.opengis.net/sensorml/2.0 http://schemas.opengis.net/sensorml/2.0/sensorML.xsd"
    definition="http://sensors.ws/process/linearInterpolator">
    <!-- ============================= -->
    <!--       Descriptions            -->
    <!-- ============================= -->
    <gml:description>
        A simple aggregate process that scales according to linear equation y = 2.3x + 1.76 and then clips if below 15.0
        In this example all processes are defined inline with no configuration settings. Parameter values are set inline.
    </gml:description>
    <gml:identifier codeSpace="uniqueID">urn:myCompany:swe:process:scaleAndClip01</gml:identifier>
    <gml:name>Scale and Clip Aggregate Process 01</gml:name>
    <!-- ============================= -->
    <!--            Aggregate Process Inputs            -->
    <!-- ============================= -->
    <sml:inputs>
        <sml:InputList>
            <sml:input name="valueIn">
                <swe:Quantity definition="http://sensorml.com/ont/swe/property/SimpleDN">
                    <swe:uom code="any"/>
                </swe:Quantity>
            </sml:input>
        </sml:InputList>    
    </sml:inputs>
    <!-- ============================= -->
    <!--            Aggregate Process Outputs            -->
    <!-- ============================= -->
    <sml:outputs>
        <sml:OutputList>
            <sml:output name="valueOut">
                <swe:Quantity definition="http://sensorml.com/ont/swe/property/DN">
                    <swe:uom code="any"/>
                </swe:Quantity>                
            </sml:output>
         </sml:OutputList>     
     </sml:outputs>
  
     <!-- ======================================= -->
    <!--         Aggregate process components declared             -->
    <!-- ======================================== -->
    <sml:components>
        <sml:ComponentList >
         
            <!-- Component 1 - Linear Interpolator -->
            <sml:component name="scale">    
                <sml:SimpleProcess gml:id="linearInterpolator01"
                    definition="http://sensorml/ont/swe/process/LinearInterpolator">
                    <!-- ============================= -->
                    <!--       Linear Interpolator Descriptions            -->
                    <!-- ============================= -->
                    <gml:description>A linear interpolator based on equation y = mx + b </gml:description>
                    <gml:identifier codeSpace="uid">urn:myCompany:process:8755d73ab</gml:identifier>
                    <gml:name>Linear Equation 01</gml:name>
                    <!-- ============================= -->
                    <!--            Linear Interpolator Inputs            -->
                    <!-- ============================= -->
                    <sml:inputs>
                        <sml:InputList>
                            <sml:input name="x">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/DN">
                                    <swe:uom code="any"/>
                                </swe:Quantity>
                            </sml:input>
                        </sml:InputList>    
                    </sml:inputs>
                    <!-- ============================= -->
                    <!--            Linear Interpolator Outputs           -->
                    <!-- ============================= -->
                    <sml:outputs>
                        <sml:OutputList>
                        <!-- scaled output value -->
                            <sml:output name="y">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/DN">
                                    <swe:uom code="any"/>
                                </swe:Quantity>                
                            </sml:output>
                        </sml:OutputList>     
                     </sml:outputs>
                    <!-- ============================= -->
                    <!--         Linear Interpolator Parameters        -->
                    <!-- ============================= -->
                    <sml:parameters>
                        <sml:ParameterList>
                            <sml:parameter name="slope-intercept">
                                <swe:DataRecord>
                                    <swe:field name="slope">
                                        <swe:Quantity definition="http://sensorml.com/ont/swe/property/LinearSlope">
                                            <swe:uom code="any"/>
                                            <!-- slope value set inline -->
                                            <swe:value>2.3</swe:value>
                                        </swe:Quantity>
                                    </swe:field>
                                    <swe:field name="intercept">
                                        <swe:Quantity definition="http://sensorml.com/ont/swe/property/LinearAxisIntercept">
                                            <!-- y-intercept value set inline -->
                                            <swe:uom code="any"/>
                                            <swe:value>1.76</swe:value>
                                        </swe:Quantity>
                                    </swe:field>
                                </swe:DataRecord>                
                            </sml:parameter>
                        </sml:ParameterList>       
                    </sml:parameters>
                </sml:SimpleProcess>        
            </sml:component>
             
 
            <!-- Component 2 - Threshold clipper -->
            <sml:component name="clip"> 
                <sml:SimpleProcess gml:id="thresholdClipper"
                    definition="http://sensorml.com/ont/swe/process/thresholdClipper">
                    <!-- ============================= -->
                    <!--      Threshold Clipper  Descriptions            -->
                    <!-- ============================= -->
                    <gml:description>
                        A process that clips anything below threshold; 
                        values higher than threshold to passValue output;
                        Values below threshold sent to failValue output</gml:description>
                    <gml:identifier codeSpace="uid">urn:myCompany:swe:process:65d74a65c</gml:identifier>
                    <gml:name>Threshold Clipper  01</gml:name>
                    <!-- ============================= -->
                    <!--             Threshold Clipper Inputs            -->
                    <!-- ============================= -->
                    <sml:inputs>
                        <sml:InputList>
                            <sml:input name="valueIn">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/SimpleDN">
                                    <swe:uom code="any"/>
                                </swe:Quantity>
                            </sml:input>
                        </sml:InputList>    
                    </sml:inputs>
                    <!-- ============================= -->
                    <!--            Threshold Clipper Outputs            -->
                    <!-- ============================= -->
                    <sml:outputs>
                        <sml:OutputList>
                        <!-- output for values that pass -->
                            <sml:output name="passValue">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/PassValue">
                                    <swe:uom code="any"/>
                                </swe:Quantity>                
                            </sml:output>
                            <!-- output for values that fail -->
                            <sml:output name="failValue">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/FailValue">
                                    <swe:uom code="any"/>
                                </swe:Quantity>                
                            </sml:output>
                        </sml:OutputList>     
                     </sml:outputs>
                    <!-- ============================= -->
                    <!--        Threshold Clipper Parameters            -->
                    <!-- ============================= -->
                    <sml:parameters>
                        <sml:ParameterList>
                            <sml:parameter name="threshold">
                                <swe:Quantity definition="http://sensorml.com/ont/swe/property/LowerThreshold">
                                    <swe:uom code="any"/>
                                    <!-- threshold value set inline -->
                                    <swe:value>15.0</swe:value>
                                </swe:Quantity>
                            </sml:parameter>
                        </sml:ParameterList>       
                    </sml:parameters>
                </sml:SimpleProcess>        
            </sml:component>
             
        </sml:ComponentList>
    </sml:components>
 
     <!-- ======================================= -->
    <!--         Aggregate process links declared             -->
    <!-- ======================================== -->
    <sml:connections>
        <sml:ConnectionList>
 
            <!-- Connect AggregateProcess input to LinearInterpolator (scale) input -->
            <sml:connection>
                <sml:Link>
                    <sml:source ref="inputs/valueIn"/>
                    <sml:destination ref="components/scale/inputs/x"/>
                </sml:Link>
            </sml:connection>
             
            <!-- Connect LinearInterpolator (scale) output to ThresholdClipper (clip) input -->
            <sml:connection>
                <sml:Link>
                    <sml:source ref="components/scale/outputs/y"/>
                    <sml:destination ref="components/clip/inputs/valueIn"/>
                </sml:Link>
            </sml:connection>
 
            <!-- Connect ThresholdClipper (clip) passValue output to AggregateProcess passValue output -->
            <sml:connection>
                <sml:Link>
                    <sml:source ref="components/clip/outputs/passValue"/>
                    <sml:destination ref="outputs/valueOut"/>
                </sml:Link>
            </sml:connection>
 
            <!-- Note: ThresholdClipper (clip) failValue output is ignored in this example -->
 
        </sml:ConnectionList>
    </sml:connections>
 
</sml:AggregateProcess>
```






 ### XML Structure
```xml
<sml:AggregateProcess gml:id="process-id"
    xmlns:sml="http://www.opengis.net/sensorml/2.0"
    xmlns:swe="http://www.opengis.net/swe/2.0"
    xmlns:gml="http://www.opengis.net/gml/3.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xsi:schemaLocation="http://www.opengis.net/sensorml/2.0 http://schemas.opengis.net/sensorml/2.0/sensorML.xsd"
    >

    <!-- Description -->
    <gml:description>The process description</gml:description>
    <!-- Identification -->
    <gml:identifier codeSpace="uniqueID"></gml:identifier>
    <!-- Name -->
    <gml:name>Process Name</gml:name>

    <keywords></keywords>

    <!-- Characeristics -->
    <sml:characeristics name=""> </sml:characeristics>

    <!-- Capabilities -->
    <sml:capabilities name=""> </sml:capabilities>

    <!-- Contacts -->
    <sml:contacts> </sml:contacts>

    <!-- Position -->
    <sml:postition> </sml:position>

    <!-- Components -->
    <sml:components></sml:components>
    
    <!-- Connections -->
    <sml:connections></sml:connections>
 
</sml:AggregateProcess>
```