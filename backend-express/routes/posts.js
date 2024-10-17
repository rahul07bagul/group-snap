var express = require('express');
const multer = require('multer');
const fs = require('fs');
var router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function generateRandomName(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
}

router.post('/create', upload.single('file'), async (req, res) => {
    try {
        const message = req.body.message;
        const groupId = req.body.groupId;
        const userId = req.body.userId;
        const fileBuffer = req.file ? req.file.buffer : null;

        const anonymousName = generateRandomName();
        const db = req.app.get('db');

        // Insert the message and image as BYTEA into PostgreSQL
        const result = await db.query(
            'INSERT INTO posts (caption, image, group_id, user_id, anonymous_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [message, fileBuffer, groupId, userId, anonymousName]
        );

        res.json(result.data);
    } catch (error) {
        console.error('Error handling the upload:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/fetch/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params; 
        const db = req.app.get('db')

        const result = await db.query(
            'SELECT post_id, image, caption, group_id, user_id, anonymous_name, created_at  FROM posts WHERE group_id = $1 order by created_at desc',
            [groupId]
        );

        if (result.rows.length > 0) {
            const posts = result.rows.map(post => {
                // If image exists, convert to base64
                if (post.image) {
                    post.image = post.image.toString('base64');
                }
                return post;
            });

            res.json(posts);
        } else {
            res.status(404).json({ message: 'No posts found for this group' });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/fetch/user/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params; 
        const db = req.app.get('db')

        const result = await db.query(
            'SELECT post_id, image, caption, group_id, user_id, anonymous_name, created_at  FROM posts WHERE user_id = $1 order by created_at desc',
            [user_id]
        );

        if (result.rows.length > 0) {
            const posts = result.rows.map(post => {
                // If image exists, convert to base64
                if (post.image) {
                    post.image = post.image.toString('base64');
                }
                return post;
            });

            res.json(posts);
        } else {
            res.status(404).json({ message: 'No posts found for this user' });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Post
router.delete('/delete/:id', async (req, res) => {
    const post_id = req.params.id;
  
    try {
      const db = req.app.get('db');
  
      // Delete the group with the given group ID
      const groupResult = await db.query(
        'DELETE FROM posts WHERE post_id = $1 RETURNING *',
        [post_id]
      );
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error('Error deleting group:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;