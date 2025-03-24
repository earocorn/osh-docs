---
title: Integration
sidebar_position: 1
---

# Integration

OSHConnect-JS, formerly known as osh-js, can be integrated with plain JavaScript or with different module loaders. Below are a few examples of how to load OSHConnect-JS in different environments.


### Plain JavaScript
```html
<script src="path/to/osh-js/dist/osh-js.js"></script>
<script>
    const dataSource = new DataSource({...});
</script>
```

### CommonJS

```js
const DataSource = require('osh-js.js');
const dataSource = new DataSource({...});
```

### Bundlers (Webpack, Rollup, etc)

```jsx
import { DataSource } from 'osh-js.js';

const dataSource = new DataSource({...});
```