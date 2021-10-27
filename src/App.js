import Bar from './Component/Bar'
import Main from './Component/Pages/Main'
import Cart from './Component/Pages/Cart'
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';



function App() {
  return (
    <div className="App">    
     <Router>
      <Bar/>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
     </Router>
    </div>
  );
}

export default App;
