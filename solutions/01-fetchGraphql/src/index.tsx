import React from 'react';
import 'isomorphic-fetch';
import ReactDOM from 'react-dom';

import App from './App.tsx';

const container = document.getElementById('root');

if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container);

root.render(<App />);
