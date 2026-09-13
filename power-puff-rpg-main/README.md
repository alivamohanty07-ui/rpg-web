# Power Puff RPG ⚔️✨
> **Gamified RPG Productivity Web App**

Turn daily tasks into epic RPG quests, level up your character attributes, join personality houses, team up in guild lounges, and customize your visual realm with dynamic themes.

---

## 🌟 Tech Stack Architecture

### Frontend (`frontend/`)
- **Core**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **Visuals & Motion**: [Framer Motion](https://www.framer.com/motion/) for floating RPG graphics & smooth modal spring physics
- **Celebration Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti) for quest completions & level-ups
- **Icons**: [Lucide React](https://lucide.dev/)
- **Networking**: [Axios](https://axios-http.com/) with preconfigured `/api` proxy

### Backend (`backend/`)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) + [Uvicorn](https://www.uvicorn.org/)
- **Database ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/)
- **Database Engine**: PostgreSQL (`psycopg2-binary`) with automatic local SQLite fallback (`sqlite:///./powerpuff.db`) for immediate offline operation
- **Authentication**: JWT Bearer Tokens ([python-jose](https://github.com/mpdavis/python-jose)) & [bcrypt](https://github.com/pyca/bcrypt) password hashing
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/) + `email-validator`
- **CORS**: Configured for local development (`http://localhost:5173`, etc.)

---

## 🎨 4-Theme Dynamic Engine System

The app features a custom dynamic theme context (`ThemeContext.jsx`) that injects semantic CSS variables directly into the document root:

1. 🏰 **Dark Dungeon**: Slate background (`#0f172a`), arcane purple accents (`#a855f7`), mystic runes glow.
2. ⚡ **Cyberpunk Neon**: High-tech dark background (`#090d16`), electric neon cyan (`#06b6d4`), and yellow highlights (`#facc15`).
3. 🌸 **Cozy Pinkish**: Soft rose background (`#1f1216`), warm pastel pink accents (`#fb7185`), cute blossom aura.
4. 👑 **Billionaire Gold**: Ultra-prestige pitch black (`#000000`), radiant polished 24k gold brilliance (`#eab308`).

Themes persist in `localStorage` and can be switched dynamically from the Navbar or Home page.

---

## 🛡️ Database Models & Schema

### `Users`
- `id`: Integer Primary Key
- `username`: String (Unique)
- `email`: String (Unique)
- `hashed_password`: String
- `selected_theme`: String (e.g. `'dark-dungeon'`)
- `personality_house`: String (`'Blossom Leader'`, `'Bubbles Empath'`, `'Buttercup Brawler'`)
- `character_avatar`: String
- `level`, `xp`, `gold`, `streak`: Integer progression counters
- `intellect`, `strength`, `vitality`, `mind`: Core RPG attribute matrix
- `created_at`: DateTime

### `Tasks`
- `id`: Integer Primary Key
- `user_id`: ForeignKey to `users.id`
- `title`, `description`, `map_location`: Quest details
- `difficulty`, `xp_reward`, `gold_reward`: Gamified incentives
- `is_completed`: Boolean
- `created_at`: DateTime

### `Lounges`
- `id`: Integer Primary Key
- `name`: String
- `is_private`: Boolean
- `invite_code`: String (Unique)
- `creator_id`: ForeignKey to `users.id`

---

## 🚀 Running the Project

### 1. Start the FastAPI Backend
```bash
cd backend

# Virtual environment is already set up at backend/venv
source venv/bin/activate

# Run FastAPI with uvicorn (auto-reloads on changes)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- Interactive Swagger API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

### 2. Run Backend Tests
```bash
cd backend
./venv/bin/python test_backend.py
```

### 3. Start the Frontend
```bash
cd frontend

# Install packages (once Node.js is installed)
npm install

# Start Vite dev server
npm run dev
```
- Open `http://localhost:5173` in your browser!
