import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

// Checks both standard Node envs and modern bundlers like Vite
const isDev = process.env.NODE_ENV === 'development' || import.meta.env?.DEV;

if (isDev) {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}