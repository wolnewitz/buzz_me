var Sequelize = require('sequelize');

db = new Sequelize('buzzme_db', 'root', '', {
  dialect: 'mysql',
  port: 3306
});

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function(err) {
    console.log('Unable to connect to the database: ', err);
  });
