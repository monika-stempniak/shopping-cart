import React from 'react';
import classnames from "classnames";

import styles from './ProductItem.module.scss';

const ProductItem = ({title, author}) => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>{title}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>{author}</p>
      <button 
        type="button" 
        className={classnames("btn", "btn-dark", styles.button)}
      >Add to cart</button>
    </div>
  );
}

export default ProductItem;
