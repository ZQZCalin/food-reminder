import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// pages
import Home from './pages/Home';
import Account from './pages/Account';
import NewPage from './pages/NewItem';
import NewItemContextProvider from './contexts/NewItemContext';
import UserDataContextProvider, { UserDataContext } from './utils/data';
import Login from './pages/Login';
import { useContext } from 'react';
import AuthContextProvider from './contexts/AuthContext';

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <UserDataContextProvider>
        <AuthContextProvider>
          <NewItemContextProvider>
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

              <Route path='/login'>
                <Login />
              </Route>

              <Route path='/'>
                <Redirect to='/login' />
              </Route>
            </Switch>
          </NewItemContextProvider>
        </AuthContextProvider>
      </UserDataContextProvider>
    </Router>
  );
}

export default App;
