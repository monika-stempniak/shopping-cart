import React from 'react';
import Axios from 'axios';

import styles from './ProductsList.module.scss';

import ProductItem from "../ProductItem/ProductItem";
const { URL } = require('../../constans');

class ProductsList extends React.Component {
  state = {
    books: null,
  }

  componentDidMount() {
    Axios.get(`${URL}/books`)
      .then(response => {
        this.setState({
          books: response.data,
        })
      })
      .catch((error) => {
        console.log(error.message);
      })
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
              books.map(({ id, title, author }) => (
                <div className="col-sm-6 col-md-4" key={title}>
                  <ProductItem
                    bookId={id}
                    title={title}
                    author={author}
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
