import React from 'react';
import Axios from 'axios';

import styles from './Cart.module.scss';

import CartItem from "../CartItem/CartItem";
const { URL } = require('../../constans');

class Cart extends React.Component {
  state = {
    cart: null,
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    if (prevProps.cart !== cart) {
      this.setState({ cart })
    }
  }

  updateCart = (updatedCart) => {
    this.setState({
      cart: updatedCart,
    })
    this.props.updateBooks();
  }

  render() {
    const { cart } = this.state;

    console.log(cart);
  
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Cart</h1>
            {
              !cart
              ? <p>No items</p>
              : cart.map(({ id, title, author, amount }, index) => (
                <CartItem
                  key={`${id}${index}`}
                  bookId={id}
                  title={title}
                  author={author}
                  amount={amount}
                  updateCart={this.updateCart}
                />
              ))
            }
          </div>
      </div>
    );
  }
}

export default Cart;
