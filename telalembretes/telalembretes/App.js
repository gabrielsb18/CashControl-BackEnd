import ContatoProvider from './contexts/LembreteContext';
import MainNavigator from './routes/MainNavigator';

const App = () => {
  return(
    <ContatoProvider>
    <MainNavigator/>
    </ContatoProvider>
  );
};

export default App