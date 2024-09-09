const authenticateUser = async (db, username, password) => {
  try {
    const user = await db.query(
      'SELECT user_id, username, email, bio FROM users WHERE username = $1 AND password_hash = $2',
      [username, password]
    );
    
    if (user.rows.length === 0) {
      return null; // No matching user
    }

    return user.rows[0]; // Return user data
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

module.exports = {
  authenticateUser,
};
