import Axios from 'axios';
import React from 'react';

import { API_URL } from '../../constans';
import Book from "../Book/Book";

import styles from './Books.module.scss';

class Books extends React.Component {
  state = {
    books: null,
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    try {
      const response = await Axios.get(`${API_URL}/books`);
      const data = await response.data;

      this.setState({
        books: data,
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  updateBooks = (id) => {
    const { books } = this.state;

    this.setState({
      books: books.filter(book => book._id !== id )
    })
  }

  render() {
    const { books } = this.state;

    if (!books) {
      return <p>Loading...</p>;
    }

    return (
      <main className={styles.wrapper}>
        <div className="container">
          <h1 className={styles.title}>Books</h1>
          <div className="row">
            {
              books.map((book) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book._id}>
                  <Book
                    {...book}
                    updateBooks={this.updateBooks}
                  />
                </div>
              ))
            }
        </div>
        </div>
      </main>
    );
  }
}

export default Books;
