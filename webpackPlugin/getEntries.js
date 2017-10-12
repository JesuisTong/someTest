const path = require('path');
const fs = require('fs');

function getEntries(url) {
  if (!fs.statSync(url).isDirectory()) {
    console.error('this is not a directory');
    return null;
  }
  let obj = {};
  const subPathArray = fs.readdirSync(url);

  // console.log(subPathArray, 'blue');
  if (subPathArray.some(i => (/\.jsx?$/g.test(i)))) {
    obj = {
      ...obj,
      [path.join(url)]: subPathArray.filter(subPath => (!fs.statSync(path.resolve(url, subPath)).isDirectory() && /\.jsx?$/g.test(subPath))).map(i => (i && path.resolve(url, i))),
    };
  }
  subPathArray.filter(subPath => (fs.statSync(path.resolve(url, subPath)).isDirectory())).forEach((i) => {
    if (!i) return;
    obj = {
      ...obj,
      ...getEntries(path.join(url, i)),
    };
  });
  return obj;
}

// const q = getEntries(path.resolve('webApp/Views'));
// console.log(JSON.stringify(q, null, 4))

module.exports = getEntries;
