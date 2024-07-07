const express = require('express');
const app = express();
const rooms = [
  { id: '66322c5c760c90a0386dbf84', name: 'Room 1', imageurls: ['http://example.com/image1.jpg'] },
  // Add other rooms here
];

// Endpoint to get a room by ID
app.get('/api/rooms/:id', (req, res) => {
  const room = rooms.find(r => r.id === req.params.id);
  if (room) {
    res.json(room);
  } else {
    res.status(404).send('Room not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
