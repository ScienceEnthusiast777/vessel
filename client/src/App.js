import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Furnace from "./components/Furnace";
import Offerings from "./components/Offerings";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route exact path="/offerings" component={Offerings} />
        <Route exact path="/furnace" component={Furnace} />
       
      </Switch>
    </div>
  );
}

export default App;
