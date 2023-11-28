import {NavigationContainer} from '@react-navigation/native';

import RouterDrawer2 from "./routerDrawerPersonalizada";
import TransacaoProvider from '../Contexts/TransacoesContext';

export default function Routes() {
  return (
    <TransacaoProvider>
      <NavigationContainer>
        <RouterDrawer2/>
      </NavigationContainer>
    </TransacaoProvider>
  );
}