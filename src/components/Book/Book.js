import Axios from 'axios';
import classnames from "classnames";
import React from 'react';

import { API_URL } from '../../constans';

import styles from './Book.module.scss';

class Book extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    const login = localStorage.getItem('login');
    this.setState({
      user: login,
    })
  }

  onAddToCart = async () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    if (!token) {
      alert("You must log in");
    } else {

      const { _id, title, author, series, year, price } = this.props;
  
      const data = {
        user_id: id,
        book_id: _id,
        title,
        author,
        amount: 1,
        series,
        year,
        price,
      }
  
      try {
        await Axios.post(`${API_URL}/cart`, data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  onDelete = async () => {
    const { _id, updateBooks } = this.props;

    try {
      await Axios.delete(`${API_URL}/books/${_id}`);
      updateBooks(_id);
    } catch (error) {
      console.log(error.message);
    }
  }


  render() {
    const { _id, title, author, amount, series, price } = this.props;
    const isDisabled = amount === 0;

    return (
      <div className={styles.item}>
        <div className={styles.imagePlaceholder}>
          {
            series &&
            <p className={styles.placeholderText}>{series}:</p>
          }
          <p className={styles.placeholderText}>{title}</p>
        </div>
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{author}</p>
        <p className={styles.price}>{price} PLN</p>
        {
          this.state.user === "admin" ?
            <button 
              type="button" 
              className={classnames("btn", "btn-outline-danger", styles.button)}
              id={_id}
              onClick={this.onDelete}
              disabled={isDisabled}
            >
              Delete
            </button>
            :
            <button 
              type="button" 
              className={classnames("btn", "btn-outline-dark", styles.button)}
              id={_id}
              onClick={this.onAddToCart}
              disabled={isDisabled}
            >
              Add to cart
            </button>
        }
      </div>
    );
  }
}

export default Book;
