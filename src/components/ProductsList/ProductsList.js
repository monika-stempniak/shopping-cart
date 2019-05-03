import React from 'react';

import styles from './ProductsList.module.scss';

import ProductItem from "../ProductItem/ProductItem";

class ProductsList extends React.Component {
  render() {
    const { books, updateBooks, updateCart, userId, checkUserID } = this.props;

    if (!books) {
      return <p>Loading...</p>;
    }

    return (
      <main className={styles.wrapper}>
        <h1 className={styles.title}>Books</h1>
          <div className="row">
            {
              books.map(({ id, title, series, author, amount }) => (
                <div className="col-sm-12 col-md-6 col-lg-4" key={id}>
                  <ProductItem
                    bookId={id}
                    title={title}
                    series={series}
                    author={author}
                    amount={amount}
                    updateBooks={updateBooks}
                    updateCart={updateCart}
                    userId={userId}
                    checkUserID={checkUserID}
                  />
                </div>
              ))
            }
        </div>
      </main>
    );
  }
}

export default ProductsList;
