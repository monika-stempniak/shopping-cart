import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Books from '../Books/Books';
import Cart from '../Cart/Cart';
import NewBook from '../NewBook/NewBook';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Books} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/new' component={NewBook} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
