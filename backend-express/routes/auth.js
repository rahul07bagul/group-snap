const express = require('express');
const router = express.Router();
const { authenticateUser } = require('./authService');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = req.app.get('db');
    const user = await authenticateUser(db, username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In the future, you will return a token or session here
    return res.json({
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        bio: user.bio,
      },
      message: 'Login successful',
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
