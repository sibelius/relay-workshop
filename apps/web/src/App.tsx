import React from 'react';
import { RouterRenderer } from '@workshop/route';

import Providers from './Providers.tsx';

const App = () => {
  return (
    <Providers>
      <RouterRenderer />
    </Providers>
  );
};

export default App;
