const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      todo VARCHAR(255)
      
    );`
    )
    .error(err => {
      console.log(err);
    })

    
    
};