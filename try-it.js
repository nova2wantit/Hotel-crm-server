const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('hotel.db');
const count = () => db.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n;

console.log('Before:', count());

const result = db
  .prepare('INSERT INTO enquiries (name, phone, source) VALUES (?, ?, ?)')
  .run('Test Guest', '9000000000', 'Phone Call');
console.log('After adding:', count());

db.prepare('DELETE FROM enquiries WHERE id = ?').run(result.lastInsertRowid);
console.log('After deleting:', count());