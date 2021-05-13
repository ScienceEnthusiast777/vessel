import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Furnace from './components/Furnace'


function App() {
  return (
    <div className="App">
        <NavBar/>
     <Route exact path='/furnace' component={Furnace} />
    </div>
  );
}

export default App;
