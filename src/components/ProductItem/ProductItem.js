import React from 'react';
import classnames from "classnames";
import Axios from 'axios';

import styles from './ProductItem.module.scss';

const { URL } = require('../../constans');

class ProductItem extends React.Component {

  onAddToCart = (event) => {
    const id = event.target.id;

    Axios.post(`${URL}/cart/${id}`)
      .then(response => {
        this.props.updateBooks()
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  render() {
    const { bookId, title, author, amount } = this.props;
    const isDisabled = amount === 0;

    return (
      <div className={styles.item}>
        <div className={styles.image}>{title}</div>
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{author}</p>
        <button 
          type="button" 
          className={classnames("btn", "btn-dark", styles.button)}
          id={bookId}
          onClick={this.onAddToCart}
          disabled={isDisabled}
        >Add to cart</button>
      </div>
    );
  }
}

export default ProductItem;
