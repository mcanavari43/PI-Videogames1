import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail';
import CreateGame from './components/CreateGame/CreateGame'

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/videogame/:id' component={Detail} />
          <Route exact path='/videogame' component={CreateGame}/>
          {/* <Route exact path='/videogames' component={CreateVideogame}/>
          <Route exact path='/videogame/:id' component={Detail}/> */}
      </Switch>
    </div>
  );
}

export default App;
