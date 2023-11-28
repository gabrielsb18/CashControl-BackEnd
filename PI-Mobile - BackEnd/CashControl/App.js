import 'react-native-gesture-handler';
import Routes from './src/routers';
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

export default function App() {
  return (
    // <Home/>
    <Routes/>
  );
};