import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const containers = document.getElementById('root')
const root = createRoot(containers)

root.render(<App />)

