const fs = require('fs');


// const getArrays = path => (
//   fs.readdirSync(path).filter(i => (/\.js|\.jsx$/g.test(i)))
// );

function getEntries(path) {
  let obj = {};
  const arr = fs.readdirSync(path);
  for (let i = 0; i < arr.length; i += 1) {
    let part = [];
    if (fs.statSync(`${path}/${arr[i]}`).isDirectory()) {
      obj = {
        ...obj,
        ...getEntries(`${path}/${arr[i]}`),
      };
    } else if (/\.js|\.jsx$/g.test(arr[i])) {
      part = [...part, `./${path}/${arr[i]}`];
      obj = {
        ...obj,
        [`${path}/${arr[i].replace(/\.js$|\.jsx$/g, '')}`]: part,
      };
    }
  }
  return obj;
}

module.exports = getEntries;
