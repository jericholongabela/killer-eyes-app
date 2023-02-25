import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { Context, Provider } from './components/globalcontext';
import Navigator from './components/navigator';

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}