const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY || 'powerpuff_secret_rpg_key_gamified_2026_super_secure';

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_u5ksWne1RThm@ep-broad-grass-aehsd8tf-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

// -------------------------------------------------------------
// 1. CORS CONFIGURATION (Enabled for http://localhost:5173 with credentials)
// -------------------------------------------------------------
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// -------------------------------------------------------------
// 2. DATABASE INITIALIZATION & SEEDING (PostgreSQL)
// -------------------------------------------------------------
async function initDb() {
  try {
    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        personality_house VARCHAR(255) DEFAULT 'Blossom Leader',
        character_avatar VARCHAR(255) DEFAULT 'ren',
        selected_theme VARCHAR(255) DEFAULT 'cyberpunk-neon',
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        gold INTEGER DEFAULT 100,
        streak INTEGER DEFAULT 1,
        intellect INTEGER DEFAULT 10,
        strength INTEGER DEFAULT 10,
        vitality INTEGER DEFAULT 10,
        mind INTEGER DEFAULT 10,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Quests Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        map_location VARCHAR(255) DEFAULT 'Town Square',
        difficulty VARCHAR(255) DEFAULT 'Medium',
        attribute VARCHAR(255) DEFAULT 'Intellect',
        xp_reward INTEGER DEFAULT 50,
        gold_reward INTEGER DEFAULT 20,
        is_completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Bounties Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bounties (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        target_house VARCHAR(255) DEFAULT 'All',
        bounty_type VARCHAR(255) DEFAULT 'Daily Sprint',
        xp_reward INTEGER DEFAULT 100,
        gold_reward INTEGER DEFAULT 75,
        is_claimed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default hero user if none exists
    const userRes = await pool.query('SELECT COUNT(*) as count FROM users');
    if (parseInt(userRes.rows[0].count) === 0) {
      const salt = 'rpg_salt_2026';
      const hash = hashPassword('SecretPassword123!', salt);
      await pool.query(`
        INSERT INTO users (username, email, hashed_password, salt, personality_house, character_avatar, selected_theme, level, xp, gold, streak, intellect, strength, vitality, mind)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, ['BlossomHero', 'blossom@powerpuff.io', hash, salt, 'Blossom Leader', 'ren', 'cyberpunk-neon', 1, 0, 100, 1, 14, 12, 12, 16]);
    }

    // Seed default quests if none exist
    const questRes = await pool.query('SELECT COUNT(*) as count FROM quests');
    if (parseInt(questRes.rows[0].count) === 0) {
      const defaultQuests = [
        ['Deep Work Sprint: Banish Procrastination', '25-minute focused sprint without notifications or distraction.', 'Town Square', 'Medium', 'Intellect', 60, 35],
        ['Physical Armor Conditioning (30m Workout)', 'Engage in physical resistance or high-intensity body workout.', 'Town Square', 'Hard', 'Strength', 75, 40],
        ['Hydration & Mindful Recharge Ritual', 'Drink 500ml water, stretch spine, and breathe deeply.', 'Blossom Sanctuary', 'Easy', 'Vitality', 40, 20],
        ['Refactor Legacy Code / Polish Architecture', 'Confront the most formidable boss engineering quest of the day.', 'Neon Citadel', 'Boss', 'Intellect', 90, 50]
      ];
      for (const q of defaultQuests) {
        await pool.query(`
          INSERT INTO quests (title, description, map_location, difficulty, attribute, xp_reward, gold_reward, is_completed)
          VALUES ($1, $2, $3, $4, $5, $6, $7, 0)
        `, q);
      }
    }

    // Seed default bounties if none exist
    const bountyRes = await pool.query('SELECT COUNT(*) as count FROM bounties');
    if (parseInt(bountyRes.rows[0].count) === 0) {
      const defaultBounties = [
        ['Bounty: Morning Procrastination Specter', 'Slay your toughest task before 11:00 AM.', 'House Buttercup', 'Daily Grit', 120, 100],
        ['Bounty: Codebase Fortification Raid', 'Complete 3 Pomodoro sprints with zero browser tab distractions.', 'House Blossom', 'Deep Focus', 150, 120],
        ['Bounty: Radiant Sanctuary Recharge', 'Log 8 hours of restorative sleep and hit 2L hydration goal.', 'House Bubbles', 'Vitality Ritual', 100, 80]
      ];
      for (const b of defaultBounties) {
        await pool.query(`
          INSERT INTO bounties (title, description, target_house, bounty_type, xp_reward, gold_reward, is_claimed)
          VALUES ($1, $2, $3, $4, $5, $6, 0)
        `, b);
      }
    }
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
}

// -------------------------------------------------------------
// 3. CRYPTOGRAPHY & JWT HELPERS
// -------------------------------------------------------------
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

function generateToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ detail: 'Authorization Bearer token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const result = await pool.query('SELECT * FROM users WHERE id = $1 OR username = $2', [payload.sub, payload.username]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ detail: 'Adventurer account not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ detail: 'Invalid or expired token' });
  }
}

function sanitizeUser(user) {
  const { salt, hashed_password, ...safe } = user;
  return safe;
}

// -------------------------------------------------------------
// 4. API ROUTES
// -------------------------------------------------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Power Puff RPG Backend (Node.js/Express + PostgreSQL)',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Power Puff RPG API! 🎮✨',
    health: '/api/health',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'GET /api/quests',
      'GET /api/bounties',
      'GET /api/character/stats'
    ]
  });
});

// --- AUTH: REGISTER / SIGNUP ---
const handleRegister = async (req, res) => {
  try {
    const { username, email, password, guild_selection, personality_house, character_avatar, selected_theme } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ detail: 'Hero username, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ detail: 'Password must be at least 6 characters long.' });
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingRes = await pool.query('SELECT id FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)', [cleanUsername, cleanEmail]);
    if (existingRes.rows.length > 0) {
      return res.status(400).json({ detail: 'Hero username or email is already registered.' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hashed_password = hashPassword(password, salt);
    const house = guild_selection || personality_house || 'Blossom Leader';

    const insertRes = await pool.query(`
      INSERT INTO users (username, email, hashed_password, salt, personality_house, character_avatar, selected_theme, level, xp, gold, streak, intellect, strength, vitality, mind)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 1, 0, 100, 1, 10, 10, 10, 10)
      RETURNING *
    `, [cleanUsername, cleanEmail, hashed_password, salt, house, character_avatar || 'ren', selected_theme || 'cyberpunk-neon']);
    
    const newUser = insertRes.rows[0];
    const token = generateToken(newUser);

    return res.status(201).json({
      access_token: token,
      token_type: 'bearer',
      user: sanitizeUser(newUser)
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: 'Internal server error during registration.' });
  }
};

app.post('/api/auth/register', handleRegister);
app.post('/api/auth/signup', handleRegister);

// --- AUTH: LOGIN ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username_or_email, password } = req.body;

    if (!username_or_email || !password) {
      return res.status(400).json({ detail: 'Username/email and password are required.' });
    }

    const identifier = username_or_email.trim().toLowerCase();
    const result = await pool.query('SELECT * FROM users WHERE LOWER(username) = $1 OR LOWER(email) = $2', [identifier, identifier]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ detail: 'Invalid credentials. Hero not found.' });
    }

    const computedHash = hashPassword(password, user.salt);
    if (computedHash !== user.hashed_password) {
      return res.status(401).json({ detail: 'Invalid password. Please check your credentials.' });
    }

    const token = generateToken(user);
    return res.json({
      access_token: token,
      token_type: 'bearer',
      user: sanitizeUser(user)
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: 'Internal server error during login.' });
  }
});

// --- AUTH: GET CURRENT HERO (/api/auth/me) ---
app.get('/api/auth/me', authMiddleware, (req, res) => {
  return res.json(sanitizeUser(req.user));
});

// --- AUTH: UPDATE THEME ---
app.patch('/api/auth/theme', authMiddleware, async (req, res) => {
  try {
    const { selected_theme } = req.body;
    let updatedUser = req.user;
    if (selected_theme) {
      const result = await pool.query('UPDATE users SET selected_theme = $1 WHERE id = $2 RETURNING *', [selected_theme, req.user.id]);
      if (result.rows.length > 0) updatedUser = result.rows[0];
    }
    return res.json(sanitizeUser(updatedUser));
  } catch (err) {
    return res.status(500).json({ detail: 'Internal server error.' });
  }
});

// --- CHARACTER & STATS: GET & UPDATE ---
const handleUpdateStats = async (req, res) => {
  try {
    const { xp_gain, gold_gain, streak, intellect, strength, vitality, mind } = req.body;
    
    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    let user = userRes.rows[0];
    if (!user) return res.status(404).json({ detail: 'User not found' });

    let newXp = (user.xp || 0) + (xp_gain || 0);
    let newGold = (user.gold || 0) + (gold_gain || 0);
    let newLevel = 1 + Math.floor(newXp / 100);
    let newStreak = streak !== undefined ? streak : user.streak;
    let newInt = intellect !== undefined ? intellect : user.intellect;
    let newStr = strength !== undefined ? strength : user.strength;
    let newVit = vitality !== undefined ? vitality : user.vitality;
    let newMnd = mind !== undefined ? mind : user.mind;

    const updatedRes = await pool.query(`
      UPDATE users 
      SET xp = $1, gold = $2, level = $3, streak = $4, intellect = $5, strength = $6, vitality = $7, mind = $8
      WHERE id = $9
      RETURNING *
    `, [newXp, newGold, newLevel, newStreak, newInt, newStr, newVit, newMnd, req.user.id]);

    return res.json(sanitizeUser(updatedRes.rows[0]));
  } catch (err) {
    return res.status(500).json({ detail: 'Internal server error updating stats.' });
  }
};

app.patch('/api/auth/stats', authMiddleware, handleUpdateStats);
app.patch('/api/character/stats', authMiddleware, handleUpdateStats);

app.get('/api/character/stats', authMiddleware, (req, res) => {
  const user = req.user;
  return res.json({
    level: user.level || 1,
    xp: user.xp || 0,
    maxXp: (user.level || 1) * 100,
    gold: user.gold || 100,
    streak: user.streak || 1,
    intellect: user.intellect || 10,
    strength: user.strength || 10,
    vitality: user.vitality || 10,
    mind: user.mind || 10,
    personality_house: user.personality_house || 'Blossom Leader',
    character_avatar: user.character_avatar || 'ren',
    selected_theme: user.selected_theme || 'cyberpunk-neon'
  });
});

// --- QUESTS: GET, CREATE, COMPLETE, DELETE ---
app.get('/api/quests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quests ORDER BY id ASC');
    return res.json(result.rows.map(q => ({ ...q, is_completed: Boolean(q.is_completed) })));
  } catch (err) {
    return res.status(500).json({ detail: 'Error fetching quests' });
  }
});

app.post('/api/quests', authMiddleware, async (req, res) => {
  try {
    const { title, description, map_location, difficulty, attribute, xp_reward, gold_reward } = req.body;
    if (!title) {
      return res.status(400).json({ detail: 'Quest title is required.' });
    }

    const result = await pool.query(`
      INSERT INTO quests (user_id, title, description, map_location, difficulty, attribute, xp_reward, gold_reward, is_completed)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0)
      RETURNING *
    `, [
      req.user.id,
      title,
      description || '',
      map_location || 'Town Square',
      difficulty || 'Medium',
      attribute || 'Intellect',
      xp_reward || 50,
      gold_reward || 20
    ]);

    return res.status(201).json({ ...result.rows[0], is_completed: false });
  } catch (err) {
    return res.status(500).json({ detail: 'Error creating quest' });
  }
});

app.post('/api/quests/:id/complete', authMiddleware, async (req, res) => {
  try {
    const questId = parseInt(req.params.id, 10);
    const questRes = await pool.query('SELECT * FROM quests WHERE id = $1', [questId]);
    const quest = questRes.rows[0];
    
    const xpGain = quest ? quest.xp_reward : 50;
    const goldGain = quest ? quest.gold_reward : 25;

    if (quest) {
      await pool.query('UPDATE quests SET is_completed = 1 WHERE id = $1', [questId]);
    }

    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = userRes.rows[0];
    const newXp = (user.xp || 0) + xpGain;
    const newGold = (user.gold || 0) + goldGain;
    const newStreak = (user.streak || 0) + 1;
    const newLevel = 1 + Math.floor(newXp / 100);

    await pool.query('UPDATE users SET xp = $1, gold = $2, streak = $3, level = $4 WHERE id = $5', [
      newXp, newGold, newStreak, newLevel, req.user.id
    ]);

    return res.json({
      success: true,
      message: 'Quest conquered! Real-life stats calibrated.',
      xp_awarded: xpGain,
      gold_awarded: goldGain,
      current_level: newLevel,
      total_gold: newGold
    });
  } catch (err) {
    return res.status(500).json({ detail: 'Error completing quest' });
  }
});

app.delete('/api/quests/:id', authMiddleware, async (req, res) => {
  try {
    const questId = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM quests WHERE id = $1', [questId]);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ detail: 'Error deleting quest' });
  }
});

// --- BOUNTIES: GET & CLAIM ---
app.get('/api/bounties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bounties ORDER BY id ASC');
    return res.json(result.rows.map(b => ({ ...b, is_claimed: Boolean(b.is_claimed) })));
  } catch (err) {
    return res.status(500).json({ detail: 'Error fetching bounties' });
  }
});

app.post('/api/bounties/:id/claim', authMiddleware, async (req, res) => {
  try {
    const bountyId = parseInt(req.params.id, 10);
    const bountyRes = await pool.query('SELECT * FROM bounties WHERE id = $1', [bountyId]);
    const bounty = bountyRes.rows[0];

    if (bounty && bounty.is_claimed) {
      return res.status(400).json({ detail: 'Bounty already claimed today!' });
    }

    const xpGain = bounty ? bounty.xp_reward : 100;
    const goldGain = bounty ? bounty.gold_reward : 75;

    if (bounty) {
      await pool.query('UPDATE bounties SET is_claimed = 1 WHERE id = $1', [bountyId]);
    }

    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = userRes.rows[0];
    const newXp = (user.xp || 0) + xpGain;
    const newGold = (user.gold || 0) + goldGain;
    const newLevel = 1 + Math.floor(newXp / 100);

    await pool.query('UPDATE users SET xp = $1, gold = $2, level = $3 WHERE id = $4', [
      newXp, newGold, newLevel, req.user.id
    ]);

    return res.json({
      success: true,
      message: 'Guild Bounty claimed! XP & Gold added to your treasury.',
      xp_awarded: xpGain,
      gold_awarded: goldGain,
      current_level: newLevel,
      total_gold: newGold
    });
  } catch (err) {
    return res.status(500).json({ detail: 'Error claiming bounty' });
  }
});

// -------------------------------------------------------------
// 5. SERVER STARTUP
// -------------------------------------------------------------
initDb();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🗡️  POWER PUFF RPG BACKEND (PostgreSQL) RUNNING ON PORT ${PORT}`);
    console.log(`🎮 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS Enabled for origins`);
    console.log(`====================================================`);
  });
}

module.exports = app;
