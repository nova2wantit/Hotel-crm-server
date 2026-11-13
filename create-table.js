const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('hotel.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    source TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New Enquiry',
    check_in TEXT,
    check_out TEXT,
    guests INTEGER,
    room TEXT,
    follow_up TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Table ready');