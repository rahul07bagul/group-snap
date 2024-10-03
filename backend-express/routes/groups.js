var express = require('express');
var router = express.Router();

const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random alphanumeric code of 6 characters
};

/**Get All Groups */
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db'); // Access the pool (database connection)
    const result = await db.query('SELECT * FROM groups');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**Get Groups in which user added */
router.get('/user/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const userId = req.params.id
    const result = await db.query('SELECT g.group_id, g.group_name, g.invite_code, gm.user_id, g.description' +
      ' FROM group_members gm JOIN groups g ON gm.group_id = g.group_id WHERE gm.user_id = $1', [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**Get Group members*/
router.get('/members/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    const groupId = req.params.id
    const result = await db.query('select gm.group_id, us.user_id, us.username, gm.is_admin FROM group_members gm JOIN users us ON gm.user_id = us.user_id WHERE gm.group_id = $1', [groupId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/create', async (req, res) => {
  const { groupName, groupDescription, userId } = req.body;

  try {
    const db = req.app.get('db');

    const inviteCode = generateInviteCode();

    // Insert the new group into the database
    const new_group = await db.query(
      'INSERT INTO groups (group_name, description, invite_code, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [groupName, groupDescription, inviteCode, userId]
    );

    const group_member_result = await db.query(
      'INSERT INTO group_members (group_id, user_id, is_admin) VALUES ($1, $2, $3) RETURNING *',
      [new_group.rows[0].group_id, userId, true]
    );

    // Send back the inserted group with the invite code
    res.status(201).json({
      message: 'Group created successfully',
      group: new_group.rows[0],
      members: group_member_result.rows[0]
    });
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join Group by Invite Code
router.post('/join', async (req, res) => {
  const { inviteCode, userId } = req.body;

  try {
    const db = req.app.get('db');

    // Validate the invite code and get the group ID
    const groupResult = await db.query(
      'SELECT group_id FROM groups WHERE invite_code = $1',
      [inviteCode]
    );

    if (groupResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid invite code' });
    }

    const groupId = groupResult.rows[0].group_id;

    // Check if the user is already a member of the group
    const memberCheck = await db.query(
      'SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2',
      [groupId, userId]
    );

    if (memberCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User is already a member of this group' });
    }

    // Insert the user into the group_members table
    const newMember = await db.query(
      'INSERT INTO group_members (group_id, user_id, is_admin) VALUES ($1, $2, $3) RETURNING *',
      [groupId, userId, false]
    );

    res.status(201).json({
      message: 'Joined group successfully',
      member: newMember.rows[0]
    });
  } catch (err) {
    console.error('Error joining group:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Group
router.delete('/delete/:id', async (req, res) => {
  const groupId = req.params.id;

  try {
    const db = req.app.get('db');

    // Delete the group with the given group ID
    const groupResult = await db.query(
      'DELETE FROM groups WHERE group_id = $1 RETURNING *',
      [groupId]
    );

    // Check if the group was deleted
    if (groupResult.rowCount === 0) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (err) {
    console.error('Error deleting group:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;