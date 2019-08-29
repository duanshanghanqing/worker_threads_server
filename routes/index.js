var express = require('express');
var router = express.Router();

const longComputation = require('../worker_threads/index/longComputation');
const longComputation2 = require('../worker_threads/index/longComputation2');


/* 使用多线程，不会阻塞其他请求 */
router.get('/', function (req, res, next) {
  longComputation(1e10).then((msg) => {
    res.render('index', { title: msg });
  }, (error) => {
    res.render('index', { title: error });
  });
});


/* 使用多线程，不会阻塞其他请求 */
router.get('/2', function (req, res, next) {
  longComputation2(1e10).then((msg) => {
    res.render('index', { title: msg });
  }, (error) => {
    res.render('index', { title: error });
  });
});


/* 没有使用多线程，会阻塞其他请求 */
router.get('/on', function (req, res, next) {
  const longComputation = (val) => {
    let sum = 0;
    for (let i = 0; i < val; i++) {
      sum += i;
    };
    return sum;
  };
  let p = new Promise((resolve, reject) => {
    resolve(longComputation(1e10));
  });
  p.then((msg) => {
    res.render('index', { title: msg });
  });
});


module.exports = router;
