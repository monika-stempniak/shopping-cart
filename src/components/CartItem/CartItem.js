import React from 'react';
import classnames from "classnames";
import Axios from 'axios';

import styles from './CartItem.module.scss';

const URL = require('../../constans');

class CartItem extends React.Component {

  onDelete = (event) => {
    const id = event.target.id;
    const { userId } = this.props;

    Axios.delete(`${URL}/cart/${userId}/${id}`)
      .then(response => {
        this.props.updateCart(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  render() {
    const { bookId, title, author, amount } = this.props;

    const amountOfBooks = (amount + 1) - amount;

    return (
      <div className={styles.item}>
        <div className={styles.container}>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.author}>{author}</p>
          </div>
          <p className={styles.amount}>x{amountOfBooks}</p>
        </div>
        <button 
          type="button" 
          className={classnames("btn", "btn-danger", styles.button)}
          id={bookId}
          onClick={this.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default CartItem;
