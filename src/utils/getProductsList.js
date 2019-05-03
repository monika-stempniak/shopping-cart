const { readFileSync } = require('fs');

function getProductsList(fileName) {
  const response = readFileSync(`./${fileName}.json`, 'utf8');
  
  return response;
}

module.exports = getProductsList;
