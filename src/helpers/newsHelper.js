const {default: axios} = require('axios');

async function myAsyncFunction(url) {
  // Asynchronous code using await
  const result = await someAsyncOperation(url);
  // console.log(result);
  return result;
}

function someAsyncOperation(url) {
  return new Promise((resolve, reject) => {
      axios.get(url).then(resp => {
          return resolve(resp.data);
      }).catch(err => {
          return reject(err);
      });
  });
}

module.exports = {myAsyncFunction};