import React from 'react';

import styles from './ProductsList.module.scss';

import books from "../../books.json";
import ProductItem from "../ProductItem/ProductItem"

class ProductsList extends React.Component {
  state = {
    books: null,
  }

  componentDidMount() {
    this.setState({
      books: books,
    })
  }

  render() {
    const { books } = this.state;
    
    if (!books) {
      return (<p>Loading...</p>);
    }
    
    console.log(books);

    return (
      <div className="container">
        <h1 className={styles.title}>Books</h1>
        <div className="row">
          {
            books.map(({ title, author }) => (
              <div className="col-sm-6 col-md-4" key={title}>
                <ProductItem
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
