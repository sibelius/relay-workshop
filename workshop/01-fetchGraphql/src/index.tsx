import React from 'react';
import 'isomorphic-fetch';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');

if (!container) throw new Error('Failed to find the root element');

// Create a root.
const root = createRoot(container);
root.render(<App />);
// hydrateRoot(container, <App />)