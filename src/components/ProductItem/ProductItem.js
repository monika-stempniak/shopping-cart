import React from 'react';
import classnames from "classnames";
import Axios from 'axios';

import styles from './ProductItem.module.scss';

const { URL } = require('../../constans');

class ProductItem extends React.Component {
  state = {
    isInCart: false,
  }

  onAddToCart = (event) => {
    const id = event.target.id;

    Axios.get(`${URL}/books/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          isInCart: true,
        })
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  render() {
    const { bookId, title, author } = this.props;
    const { isInCart } = this.state;

    const text = isInCart ? "In cart" : "Add to cart";

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
          disabled={isInCart}
        >{text}</button>
      </div>
    );
  }
}

export default ProductItem;
