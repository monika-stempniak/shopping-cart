import Axios from 'axios';
import React from 'react';
import classnames from "classnames";

import { API_URL } from '../../constans';

import styles from './NewBook.module.scss';

class NewBook extends React.Component {
  state = {
    newBook: {
      title: "Who Moved My Cheese?",
      author: "Spencer Johnson",
      amount: 1,
      series: "",
      year: "1998",
      price: 1,
    }
  }

  addNewBook = async () => {
    const newBook = this.state;

    try {
      await Axios.post(`${API_URL}/books/new`, newBook);
    } catch (error) {
      console.log(error.message);
    }  
  }

  render() {
    const newBook = this.state;

    return (
      <div className={styles.wrapper}>
        <pre>{JSON.stringify(newBook, null, 2)}</pre>
        <div className={styles.buttonWrapper}>
          <button 
            type="button" 
            className={classnames("btn", "btn-warning", styles.button)}
            onClick={this.addNewBook}
          >
            Add book
          </button>
        </div>
      </div>
    );
  }
}

export default NewBook;
