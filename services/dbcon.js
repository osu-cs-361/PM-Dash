var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs361_glowackp',     // replace with your credientials
  password: '4956',           // replace with your credientials
  database: 'cs361_glowackp'  // replace with your credientials
});

module.exports.pool = pool;
