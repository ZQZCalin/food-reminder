import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import Home from './pages/Home';
import Account from './pages/Account';
import NewPage from './pages/NewItem';
import NewItemContextProvider from './contexts/NewItemContext';

function App() {

  return (
    <NewItemContextProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>

          <Route path='/new-item'>
            <NewPage />
          </Route>

          <Route path='/account'>
            <Account />
          </Route>

          <Route path='/'>
            <div>
              Empty Page
            </div>
          </Route>
        </Switch>
      </Router>
    </NewItemContextProvider>
  );
}

export default App;
