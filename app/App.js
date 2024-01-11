

import { Provider } from 'react-redux';
import { store,persistor } from './reduxKit/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './routes/Navigation';


 function App() {

  return (
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
          <Navigation/>
       </PersistGate>
    </Provider>
  );
}

export default App;
