import React from 'react';

import styles from './App.module.scss';

import ProductsList from '../ProductsList/ProductsList'
import Cart from '../Cart/Cart'


class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className={styles.wrapper}>
              <ProductsList />
              <Cart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
