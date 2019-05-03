import React from 'react';
import classnames from "classnames";
import Axios from 'axios';

import styles from './CartItem.module.scss';

const { URL } = require('../../constans');

class CartItem extends React.Component {
  state = {
    isInCart: false,
  }

  onDelete = (event) => {
    const id = event.target.id;

    console.log(id);

    // Axios.get(`${URL}/books/${id}`)
    //   .then(response => {
    //     console.log(response.data);
    //     this.setState({
    //       isInCart: true,
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   })
  }

  render() {
    const { bookId, title, author } = this.props;

    return (
      <div className={styles.item}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>{author}</p>
        </div>
        <button 
          type="button" 
          className={classnames("btn", "btn-danger", styles.button)}
          id={bookId}
          onClick={this.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default CartItem;
