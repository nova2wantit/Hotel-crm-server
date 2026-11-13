const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('hotel.db');

// a date relative to today, written as YYYY-MM-DD
function day(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString('en-CA');
}

// newest first, the same order as the Recent Enquiries list
const samples = [
  ['Rahul Sharma', '9876543210', 'Instagram', 'New Enquiry', '2026-11-25', '2026-11-27', 3, '1 Deluxe Room', day(0), 'Asked for early check-in and valley view.'],
  ['Ananya Verma', '9830112233', 'WhatsApp', 'Follow-up Required', '2026-11-18', '2026-11-21', 2, '1 Honeymoon Suite', day(-2), 'Requested candlelight dinner package.'],
  ['Vikramaditya Sen', '9123456780', 'Website', 'Booking Confirmed', '2026-12-03', '2026-12-06', 4, '2 Executive Rooms', null, 'Advance payment of 50% received.'],
  ['Priya Nair', '9900887766', 'Google Business Profile', 'Contacted', '2026-11-20', '2026-11-22', 2, '1 Premium Cottage', day(0), 'Shared tariff brochure on WhatsApp.'],
  ['Rohan Malhotra', '9811223344', 'Phone Call', 'Follow-up Required', '2026-11-28', '2026-12-01', 6, '1 Family Villa (3 BHK)', day(-1), 'Travelling with senior citizens; needs ground floor.'],
  ['Sneha Kulkarni', '9765432109', 'Facebook', 'Booking Confirmed', '2026-12-08', '2026-12-10', 2, '1 Deluxe Room', null, 'Airport pickup requested.'],
  ['Arjun Chatterjee', '9831098765', 'WhatsApp', 'New Enquiry', '2026-11-23', '2026-11-25', 3, '1 Suite + Extra Bed', day(1), 'Enquired about weekend bonfire availability.'],
  ['Meera Joshi', '9820011223', 'Instagram', 'Cancelled / Lost', '2026-11-16', '2026-11-18', 2, '1 Standard Room', null, 'Postponed trip due to change in dates.'],
];

db.exec('DELETE FROM enquiries');
db.exec("DELETE FROM sqlite_sequence WHERE name = 'enquiries'");

const add = db.prepare(`
  INSERT INTO enquiries
    (name, phone, source, status, check_in, check_out, guests, room, follow_up, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// inserted oldest first, so Rahul ends up with the newest created_at
for (const row of [...samples].reverse()) add.run(...row);

console.log(samples.length, 'sample enquiries added');