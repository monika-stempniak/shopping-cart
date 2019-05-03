const { readFileSync } = require('fs');

function getCart(userId) {
  const cart = readFileSync('./cart.json', 'utf8');

  let userBooks = null;
  if (cart) {
    userBooks = JSON.parse(cart).filter(book => book.userId === +userId);
  }

  return userBooks;
}

module.exports = getCart;
