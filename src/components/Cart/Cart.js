import Axios from 'axios';
import classnames from "classnames";
import React from 'react';

import { API_URL } from '../../constans';
import CartItem from "../CartItem/CartItem";

import styles from './Cart.module.scss';
import { timingSafeEqual } from 'crypto';

class Cart extends React.Component {
  state = {
    cart: [],
    id: null,
  }

  componentDidMount() {
    this.getCart();
  }

  componentDidUpdate(prevProps, prevState) {
    const id = localStorage.getItem('id');
    if(prevState.id !== id) {
      this.getCart();
    }
  }

  getCart = async () => {
    const id = localStorage.getItem('id');

    try {
      const response = await Axios.get(`${API_URL}/${id}/cart`);
      const data = await response.data;
      this.setState({
        cart: data,
        id,
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  updateCart = (id) => {
    const { cart } = this.state;

    this.setState({
      cart: cart.filter(c => c._id !== id )
    })
  }

  onDelete = async () => {
    const id = localStorage.getItem('id');

    try {
      const response = await Axios.delete(`${API_URL}/${id}/cart`);
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
        <h1 className={styles.title}>Cart</h1>
        <div className={styles.row}>
          <div className="col-sm-12 col-md-6">
            <div className={styles.cart}>
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
    );
  }
}

export default Cart;
