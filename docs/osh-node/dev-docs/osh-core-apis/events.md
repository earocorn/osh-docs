---
title: Events
sidebar_position: 3
---

The **Event Bus** is the heart of **OpenSensorHub**, enabling highly concurrent communication between OSH modules.
Nearly every OSH module interacts with the **Event Bus**, by publishing events or subscribing to events from other modules/systems.

## Main Event Types
These are the two most common event types in OSH.
Others may be created to suit various needs during multi-module development.
### Module Events
**Module Events** are used to notify listeners of changes in a module's state, configuration, status, etc.

The `ModuleEvent` class contains each type of basic module event, as well as each possible `ModuleState`.
### System Events
**System Events** include all events produced by systems, including events produced by datastreams and control/command streams of those systems.

**Systems**, **datastreams**, **control/command streams** all have associated events used to notify a change in their state.
For instance, some of these events include `SystemAddedEvent`, `DataStreamAddedEvent`, `SystemChangedEvent`, `CommandStreamRemovedEvent`, etc.

#### Data Stream Events
Events derived from `DataStreamEvent` include events unique to datastreams, such as `DataEvent` (used to carry data from data producers) and `ObsEvent` (used to carry observations).

#### Command Stream Events
Events derived from `CommandStreamEvent` include events unique to command streams, such as `CommandEvent` (used to carry command data to a command receiver) and `CommandStatusEvent` (used to carry status data of a command).

## Event Publishers
Any component in OSH can retrieve a publisher instance with a unique "event source ID."
The publisher provides a channel for the component to publish events into, 
and deliver them to other components that have subscribed to it.

### Publisher Groups
Event producer groups allow multiple event producers to publish their events under a common group, 
meaning that all events will be made available to a single publisher instance, 
with the intent of saving memory.

## Event Subscribers
OSH components can subscribe to events by calling the event-bus interface using a powerful filtering language.

Event filters allow one to select:
- One or more data/event source (one/multiple modules, multiple systems/datastreams, etc.)
- Filter by event type
- Filter on content using a predicate

## EventUtils
`EventUtils` provides utility methods for creating topic IDs which can be used when creating an event subscription.

## Examples

```java
IEventBus eventBus = new EventBus(); // Or retrieve from ISensorHub instance using hub.getEventBus();
// Creating publisher with group "myGroup", and source "source1"
IEventPublisher publisher = eventBus.getPublisher("myGroup", "source1");

// Publishing events
publisher.publish(someEvent);

// Creating subscription to subscribe to all "myGroup" events
Subscription subscription;
eventBus.newSubscription()
    .withTopicID("myGroup")
    .consume(e -> System.out.println("Event received!"))
    .thenAccept(s -> subscription = s);

// Filtering by event type and using EventUtils to get a topic ID
eventBus.newSubscription(ObsEvent.class)
    .withTopicID(EventUtils.getDataStreamDataTopicID("urn:osh:sensor:simulated:001", "temperature"))
    .subscribe(e -> System.out.println("Temperature observation received!"));
```

hub.getEventBus().newSubscription()
.withTopicID(ModuleRegistry.EVENT_GROUP_ID)
.consume(this::handleEvent)
.thenAccept(s -> moduleEventsSub = s);