import Axios from 'axios';
import classnames from "classnames";
import React from 'react';

import { API_URL } from '../../constans';

import styles from './CartItem.module.scss';

class CartItem extends React.Component {

  onDelete = async () => {
    const { _id, updateCart } = this.props;

    try {
      await Axios.delete(`${API_URL}/cart/${_id}`);
      updateCart(_id);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { title, author, amount, price } = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.container}>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.author}>{author}</p>
          </div>
          <p className={styles.amount}>x{amount}</p>
          <p className={styles.price}>{price} PLN</p>
        </div>
        <button 
          type="button" 
          className={classnames("btn", "btn-danger", styles.button)}
          onClick={this.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default CartItem;
