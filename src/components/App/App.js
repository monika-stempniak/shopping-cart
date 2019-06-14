import Axios from 'axios';
import classnames from "classnames";
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { API_URL } from '../../constans';
import Books from '../Books/Books';
import Cart from '../Cart/Cart';
import NewBook from '../NewBook/NewBook';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';


class App extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    const login = localStorage.getItem('login');

    this.setState({ 
      user: {
        id,
        login,
      }
    })
  }

  checkUserLogin = async (passedLogin) => {
    if (passedLogin) {
      const user = { login: passedLogin };

      try {
        const response = await Axios.post(`${API_URL}/user/login`, user);
        const { id, token } = await response.data;

        localStorage.setItem(`token`, token);
        localStorage.setItem(`id`, id);
        localStorage.setItem(`login`, passedLogin);

        this.setState({ 
          user: {
            id,
            login: passedLogin,
          }
        })
      } catch (error) {
        this.checkUserLoginAgain();
        console.log(error.message);
      }
    }
  }

  checkUserLoginAgain() {
    const login = prompt('Invalid Login, please try again:');
    this.checkUserLogin(login);
  }

  onLogin = () => {
    const login = prompt('Pass your login:');
    this.checkUserLogin(login);
  }

  onLogout = () => {
    localStorage.clear();
    this.setState({ 
      user: null
    })
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <Header user={user}>
          {user && (user.id || user.login)
            ? (
              <React.Fragment>
                <button 
                  type="button" 
                  className={classnames("btn")}
                  onClick={this.onLogout}
                >
                  Logout
                </button>
                <i>Hello, {user.login}!</i>
              </React.Fragment>
            ) : (
              <button 
                type="button" 
                className={classnames("btn")}
                onClick={this.onLogin}
              >
                Login
              </button>
            )
          }
        </Header>
          {
            user && user.login === "admin"
            ? (
              <Switch>
                <Route exact path='/' component={Books} />
                <Route exact path='/new' component={NewBook} />
                <Route component={NotFound} />
              </Switch>
            ) : (
            <Switch>
              <Route exact path='/' component={Books} />
              <Route exact path='/cart' component={Cart} />
              <Route component={NotFound} />
            </Switch>)
          }
      </Router>
    );
  }
}

export default App;
