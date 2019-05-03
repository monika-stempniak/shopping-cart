import React from 'react';
import Axios from 'axios';

import styles from './App.module.scss';

import ProductsList from '../ProductsList/ProductsList'
import Cart from '../Cart/Cart'
const URL = require('../../constans');

class App extends React.Component {
  state = {
    books: null,
    cart: null,
    userId: null,
  }

  getBooks = () => {
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

  getCart = () => {
    Axios.get(`${URL}/cart/${this.state.userId}`)
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

  checkUser = (userId) => {
    const id = +userId;
    if (id && typeof id === 'number') {
      this.setState({ userId })
    } else {
      const passedId = prompt('Invalid User ID, please try again');
      this.checkUserID(passedId);
    }
  }

  checkUserID = (userId) => {
    this.checkUser(userId);
  }

  render() {
    const { books, cart, userId } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className={styles.wrapper}>
              <ProductsList 
                books={books} 
                updateCart={this.updateCart} 
                updateBooks={this.updateBooks} 
                userId={userId}
                checkUserID={this.checkUserID}
              />
              <Cart 
                cart={cart} 
                updateBooks={this.updateBooks} 
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
