import 'isomorphic-fetch';
import React from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';

import Root from './Root';

createRoot(document.getElementById('root')).render(<Root />);
