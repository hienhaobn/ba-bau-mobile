import Toast from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import StackNavigator from 'navigation/Navigation';

import store, { persistor } from 'states';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StackNavigator />
            </PersistGate>
            <Toast ref={(ref) => toast = ref} />
        </Provider>
    );
}

export default App;
