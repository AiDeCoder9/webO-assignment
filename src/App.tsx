import React from 'react';

import '../src/assets/scss/main.scss';
import PrivateRoute from './routes';
import routes from './routes/routes';

function App() {
  return <PrivateRoute appRoutes={routes} redirectPath={[{ from: '*', to: '/' }]} />;
}

export default App;
