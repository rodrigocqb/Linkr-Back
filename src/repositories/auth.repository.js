import connection from "../database/database.js";

async function updateExpiredSession(token) {
  return connection.query(
    `UPDATE sessions SET "valid" = $1 WHERE "token" = $2;`,
    [false, token]
  );
}

async function getSession({ userId, token }) {
  return connection.query(
    `SELECT * FROM sessions WHERE user_id = $1
    AND token = $2 AND valid = TRUE`,
    [userId, token]
  );
}

async function getUserByEmail(email) {
  return connection.query(
  `SELECT * FROM users WHERE email = $1`, [ email ]
  );
  }
  
  async function createUser(email, password, username, image) {
  return connection.query(
  `INSERT INTO users (email, username, password, image)
  VALUES ($1, $2, $3, $4)`, [ email, username, password, image ]
  );
  }

  async function createSession(id, token) {
    return connection.query(
      `INSERT INTO sessions (user_id, token)
      VALUES ($1, $2, $3)`, [id, token]
    );
  }

export { 
  updateExpiredSession, 
  getSession,
  getUserByEmail,
  createUser,
  createSession
};
