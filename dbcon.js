var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: '[user_name]',     // replace with your credientials
  password: '[password]',           // replace with your credientials
  database: 'cs340_glowackp'  // replace with your credientials
});

module.exports.pool = pool;
