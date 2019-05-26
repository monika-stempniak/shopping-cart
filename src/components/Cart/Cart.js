import Axios from 'axios';
import classnames from "classnames";
import React from 'react';

import { API_URL } from '../../constans';
import CartItem from "../CartItem/CartItem";

import styles from './Cart.module.scss';

class Cart extends React.Component {
  state = {
    cart: [],
  }

  componentDidMount() {
    this.getCart();
  }

  getCart = async () => {
    try {
      const response = await Axios.get(`${API_URL}/cart`);
      const data = await response.data;
      this.setState({
        cart: data,
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  updateCart = (id) => {
    const { cart } = this.state;

    this.setState({
      cart: cart.filter(book => book._id !== id )
    })
  }

  onDelete = async () => {
    try {
      const response = await Axios.delete(`${API_URL}/cart`);
      const data = await response.data;
      data && this.setState({ cart: [] })
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { cart } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className="container">
          <h1 className={styles.title}>Cart</h1>
          <div className="row">
            <div className="col-12">
              <div className={styles.container}>
                {
                  cart.length === 0
                  ? <p className={styles.emptyCart}>No items</p>
                  : cart.map((cart) => (
                    <CartItem
                      key={cart._id}
                      {...cart}
                      updateCart={this.updateCart}
                    />
                  ))
                }
              </div>
              {
                cart.length !== 0 &&
                <button 
                  type="button" 
                  className={classnames("btn", "btn-outline-danger", styles.button)}
                  onClick={this.onDelete}
                >
                  Cancel shopping
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
