import {store,persistor } from './reduxKit/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import Navigation from './routes/Navigation';

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <Navigation/>
       </PersistGate>
    </Provider>
  );
}

