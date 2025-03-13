import React from 'react';
import Systems from 'osh-js/source/core/consysapi/system/Systems.js';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  Systems,
};

export default ReactLiveScope;
