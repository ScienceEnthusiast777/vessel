import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
      </header>
    </div>
  );
}

export default App;
