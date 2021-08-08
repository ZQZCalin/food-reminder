import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// pages
import Home from './pages/Home';
import Account from './pages/Account';
import NewPage from './pages/NewItem';
import NewItemContextProvider from './contexts/NewItemContext';
import UserDataContextProvider from './utils/data';

function App() {

  return (
    <div>
      <UserDataContextProvider>
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
                <Redirect to='/home' />
                <div>
                  Empty Page
                </div>
              </Route>
            </Switch>
          </Router>
        </NewItemContextProvider>
      </UserDataContextProvider>
    </div>
  );
}

export default App;
