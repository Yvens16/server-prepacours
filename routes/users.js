var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username:"Yvens"},
    {id: 2, username:"Steeven"},
    {id: 3, username:"Marvens"},
  ])
});

module.exports = router;
