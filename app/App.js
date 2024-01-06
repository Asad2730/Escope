import {store,persistor } from './reduxKit/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
     
       </PersistGate>
    </Provider>
  );
}

