var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
      const db = req.app.get('db'); // Access the pool (database connection)
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
      const db = req.app.get('db'); // Access the pool (database connection)
      const userId = req.params.id
      const result = await db.query('SELECT user_id, username, email, bio FROM users WHERE user_id = $1', [userId]);
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

router.get('/profile_image/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const userId = req.params.id;
    
    // Fetch the profile image from the database
    const result = await db.query('SELECT profile_image FROM users WHERE user_id = $1 LIMIT 1', [userId]);
    
    if (result.rows.length > 0 && result.rows[0].profile_image) {
      const profileImage = result.rows[0].profile_image;
      const base64Image = profileImage.toString('base64');
      
      res.json({ image: base64Image });
    } else {
      res.status(404).send('No profile image found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
