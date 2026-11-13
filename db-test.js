const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('hotel.db');
const row = db.prepare('SELECT sqlite_version() AS version').get();

console.log('SQLite is working, version', row.version);