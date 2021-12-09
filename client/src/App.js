import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Details from './components/Detail';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/videogame' component={VideogameCreate}/>
        <Route path='/home/:id' component={Details}/> 
        
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
