const fs = require('fs');

fs.copyFile('db.json', 'temp-db.json', (err) => {
  if (err) throw err;
  console.log('db.json was copied to temp-db.json');
});