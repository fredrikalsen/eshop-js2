const express = require('express');
const router = express.Router();


router.post('/send-message', (req, res) => {

  const { name, email, message } = req.body;

    if (!name || !email || !message) {

    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }
  
  res.status(200).json({ message: 'Message sent successfully' });
});

module.exports = router;
