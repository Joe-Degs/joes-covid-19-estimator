const router = require('express').Router();
const toXML = require('xml-js').js2xml;
const fs = require('fs');
const logFile = require('path').join(__dirname, 'logfile');
const estimator = require('./estimator');

router.post('/', (req, res) => {
  const result = estimator(req.body);
  return res.status(200).json(result);
});

router.post('/:resType', (req, res) => {
  const result = estimator(req.body);

  if (req.params.resType === 'xml') {
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const XMLres = toXML(result, options);
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(XMLres);
  }

  return res.status(200).json(result);
});

router.get('/logs', (req, res, next) => {
  fs.readFile(logFile, 'utf8', (err, content) => {
    if (err) return next(err);

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(content);
  });
});


module.exports = router;
