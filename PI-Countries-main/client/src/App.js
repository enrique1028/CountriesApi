import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import ActivityCreate from './components/ActivityCreate';
import Detail from './components/Detail';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path = '/' component = {LandingPage}/>
      <Route path = '/home/:id' component = {Detail}/>
      <Route path = '/activities' component = {ActivityCreate}/>
      <Route path = '/home' component = {Home}/>
      <Route path = '/home' component = {SearchBar}/>
      
      
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
