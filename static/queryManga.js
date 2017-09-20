// const http = require('http');
const util = require('util');

const API = {
  'taici-name': '/api/taici/name',
  'taici-id': '/api/taici/id',
};
// 获取作品信息接口
const getCharacter = (name = '', callback) => {
  name = encodeURIComponent(name)
  fetch(`/api/taici/name?name=${name}`, {
    mode: 'cors',
    method: 'GET',
  })
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    util.log(data);
    callback && callback(data);
  })
  .catch((error) => {
    util.log(error);
  })
  // const opt = {
  //   host: 'zhaiyan.2cys.com',
  //   path: `/api/taici/name?name=${name}`,
  //   // // port: 3001,
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     // 'Access-Control-Allow-Origin': '*',
  //     // Origin: 'https://developer.mozilla.org',
  //   }
  // }
  // const req = http.get(opt, (res) => {
  //   util.log('STATUS:', res.statusCode);
  //   res.setEncoding('utf8');
  //   let resultText = '';
  //   res.on('data', (chunk) => {
  //       resultText += chunk
  //   });
  //   res.on('end', () => {
  //       util.log(resultText)
  //       callback && callback(resultText)
  //   });
  // })
  // req.on('error',e => util.log);
  // util.log('linko sdato!');
  // req.end();
}

export default getCharacter;