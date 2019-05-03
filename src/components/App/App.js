import React from 'react';
import Axios from 'axios';

import styles from './App.module.scss';

import ProductsList from '../ProductsList/ProductsList'
import Cart from '../Cart/Cart'
const { URL } = require('../../constans');

class App extends React.Component {
  state = {
    books: null,
    cart: null,
  }

  getBooks() {
    Axios.get(`${URL}/books`)
      .then(response => {
        this.setState({
          books: response.data,
        })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  getCart() {
    Axios.get(`${URL}/cart`)
      .then(response => {
        this.setState({
          cart: response.data,
        })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  componentDidMount() {
    this.getBooks();
    this.getCart();
  }

  updateBooks = () => {
    this.getBooks();
  }

  updateCart = () => {
    this.getCart();
  }

  render() {
    const { books, cart } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className={styles.wrapper}>
              <ProductsList books={books} updateCart={this.updateCart} updateBooks={this.updateBooks} />
              <Cart cart={cart} updateBooks={this.updateBooks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
