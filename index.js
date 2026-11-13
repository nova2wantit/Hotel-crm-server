const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const app = express();
const db = new DatabaseSync('hotel.db');

// lets the server read JSON sent by forms
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, the server is running');
});

app.get('/enquiries', (req, res) => {
  const rows = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
  res.json(rows);
});

app.post('/enquiries', (req, res) => {
  const { name, phone, source, status, check_in, check_out, guests, room, follow_up, notes } = req.body;

  if (!name || !phone || !source) {
    return res.status(400).json({ error: 'name, phone and source are required' });
  }

  const result = db.prepare(`
    INSERT INTO enquiries
      (name, phone, source, status, check_in, check_out, guests, room, follow_up, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name, phone, source,
    status || 'New Enquiry',
    check_in || null, check_out || null,
    guests || null, room || null,
    follow_up || null, notes || null
  );

  const saved = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(saved);
});
app.delete('/enquiries/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }
  res.json({ deleted: id });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});