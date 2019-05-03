import React from 'react';
import Axios from 'axios';

import styles from './ProductsList.module.scss';

import ProductItem from "../ProductItem/ProductItem";
const { URL } = require('../../constans');

class ProductsList extends React.Component {
  state = {
    books: null,
  }

  componentDidUpdate(prevProps) {
    const { books } = this.props;
    if (prevProps.books !== books) {
      this.setState({ books })
    }
  }

  updateBooks = () => {
    this.props.updateBooks();
    this.props.updateCart();
  }

  render() {
    const { books } = this.state;
    
    if (!books) {
      return <p>Loading...</p>;
    }

    return (
      <div className={styles.wrapper}>
          <h1 className={styles.title}>Books</h1>
          <div className="row">
            {
              books.map(({ id, title, author, amount }) => (
                <div className="col-sm-12 col-md-6 col-lg-4" key={id}>
                  <ProductItem
                    bookId={id}
                    title={title}
                    author={author}
                    amount={amount}
                    updateBooks={this.updateBooks}
                  />
                </div>
              ))
            }
          </div>
      </div>
    );
  }
}

export default ProductsList;
