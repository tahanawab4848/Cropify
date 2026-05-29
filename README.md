# Cropify

**A premium, modern web application for agricultural data management**



## Table of Contents

| Section | Link |
|---|---|
| ✨ Overview | [Overview](#overview) |
| 📦 Features | [Features](#features) |
| 🛠️ Tech Stack | [Tech‑Stack](#tech-stack) |
| 🚀 Getting Started | [Installation](#installation) |
| ▶️ Usage | [Running‑the‑App](#running-the-app) |
| 📜 Scripts | [NPM‑Scripts](#npm-scripts) |
| 🔧 Environment Variables | [Env‑Variables](#environment-variables) |
| 🤝 Contributing | [Contributing](#contributing) |
| 📄 License | [License](#license) |
| 🙏 Acknowledgements | [Acknowledgements](#acknowledgements) |

---

## Overview

Cropify empowers farmers, agronomists, and agricultural analysts with a sleek dashboard that centralises **farm data**, **weather insights**, **real‑time chat**, and **visual analytics**. Built with a dark glassmorphism UI, subtle micro‑animations, and responsive design, Cropify feels premium on both desktop and mobile devices.

---

## Features

- User authentication (email/password + session handling)
- Role‑based dashboards – separate views for *farmers* and *admins*
- Real‑time chat & forum for community support
- Weather integration (via OpenWeather API)
- Dynamic charts (Recharts) for crop yields, expenses, and market trends
- Responsive layout – works on laptops, tablets, and phones
- Dark‑mode ready with smooth transitions
- Docker ready (optional) for easy deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Front‑end** | React 18, Vite, Tailwind CSS, Radix UI, Recharts, Framer Motion |
| **Back‑end** | Node 18, Express, TypeScript, tsx, cross‑env |
| **Database** | PostgreSQL (via Drizzle ORM) |
| **Auth** | Passport + express‑session |
| **Dev Tools** | ESLint, Prettier, TypeScript, npm, cross‑env |
| **Deployment** | Docker (optional), Vite static build, Node server |

---

## Installation

```bash
# 1️⃣ Clone the repo
git clone https://github.com/tahanawab4848/Cropify.git
cd Cropify

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables (see below)

# 4️⃣ Run the development server
npm run dev
```

> **Tip:** The `dev` script uses `cross‑env` so it works on Windows, macOS, and Linux.

---

## Running the App

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite + tsx server in **development** mode (hot‑reload). |
| `npm run build` | Bundles the client with Vite and the server with esbuild for production. |
| `npm start` | Runs the compiled production build (`NODE_ENV=production`). |
| `npm run db:push` | Executes `drizzle‑kit push` to sync the DB schema. |
| `npm run check` | Runs `tsc` type‑checking. |

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## NPM Scripts

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "cross-env NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

- `cross-env` ensures the `NODE_ENV` variable works on Windows.
- `tsx` runs the TypeScript server without a pre‑compile step.

---

## Environment Variables

Create a `.env` file in the project root:

```dotenv
# Server
PORT=5000
SESSION_SECRET=your‑super‑secret‑string

# PostgreSQL
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/cropify

# OpenWeather API (for weather widgets)
WEATHER_API_KEY=your‑openweather‑key
```

> **Security note:** Never commit `.env` to the repository. It’s already listed in `.gitignore`.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make your changes, adhering to the **Airbnb TypeScript style guide** (ESLint config already included).
4. Run `npm run check` to ensure type safety.
5. Commit with a clear message and push.
6. Open a Pull Request targeting `main`.

All contributions are welcome – from UI polish to new data visualisations!

---

## License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## Acknowledgements

- **Radix UI** – accessible component primitives.
- **Recharts** – beautiful charting library.
- **Tailwind CSS** – utility‑first styling.
- **Cross‑env** – reliable environment variable handling across OSes.

> Built with love by **TAHA** and the Web Innovators community.

---

*Feel free to open an issue if you encounter bugs or have ideas for new features!*
