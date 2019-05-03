import React from 'react';
import Axios from 'axios';

import styles from './Cart.module.scss';

import CartItem from "../CartItem/CartItem";
const { URL } = require('../../constans');

class Cart extends React.Component {
  state = {
    cart: [],
  }

  componentDidMount() {
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

  render() {
    const { cart } = this.state;
  
    return (
      <div className={styles.wrapper}>
          <h1 className={styles.title}>Cart</h1>
          {
            cart.length === 0
            ? <p>No items</p>
            : cart.map(({ id, title, author }) => (
              <CartItem
                key={title}
                bookId={id}
                title={title}
                author={author}
              />
            ))
          }
      </div>
    );
  }
}

export default Cart;
