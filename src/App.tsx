import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';
import "@exuanbo/file-icons-js/dist/css/file-icons.css"

function App() {
  return useRoutes(routes);
}

export default App;
