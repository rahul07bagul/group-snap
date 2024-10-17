var express = require('express');
var router = express.Router();

router.get('/user/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const userId = req.params.id
    const result = await db.query(
      'SELECT ps.image, ps.group_id, ps.user_id, ps.created_at, gr.group_name FROM posts ps JOIN groups gr ON ps.group_id = gr.group_id WHERE ps.user_id = $1 order by created_at desc',
      [userId]
    );
    // Convert image buffer to base64 if necessary
    const images = result.rows.map(row => {
      const base64Image = row.image ? Buffer.from(row.image).toString('base64') : null;
      return {
        ...row,
        image: base64Image  // Attach base64 image string
      };
    });

    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;