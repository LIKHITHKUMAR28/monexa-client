# 🚀 Monexa – Modern Project Management & Issue Tracker

Monexa is a full-stack web application that helps teams organize work, manage projects, and track issues efficiently – inspired by tools like Jira and Linear.

---

## 🌐 Live URLs

- **Client** (Frontend – React): [https://monexa-client.vercel.app](https://monexa-client.vercel.app)
- **Server** (Backend – Node.js + MongoDB): [https://monexa-server-production.up.railway.app](https://monexa-server-production.up.railway.app)

---

## 🧱 Tech Stack

| Layer      | Tech Used |
|------------|-----------|
| Frontend   | React.js, Tailwind CSS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB (Atlas) |
| Auth       | JWT + Bcrypt |
| Deployment | Vercel (client), Railway (server) |

---

## 🎨 Color Palette

Custom Tailwind theme:

```

\--primary-100: #2563eb;
\--primary-200: #598EF3;
\--primary-300: #D3E6FE;
\--accent-100: #d946ef;
\--accent-200: #fae8ff;
\--text-100: #cbd5e1;
\--text-200: #94a3b8;
\--bg-100: #1e293b;
\--bg-200: #334155;
\--bg-300: #475569;

```

---

## 📦 Features

- 🔐 JWT-based auth (register, login, forgot password)
- 🧑‍💻 Role-based team members (Developer, Manager, Admin, Viewer)
- 📁 Project creation & member management
- 🎫 Ticket creation, Kanban board (drag-and-drop)
- 🗓️ Dashboard with calendar, urgent tasks, project directory
- ✅ Responsive UI with color consistency
- ✨ Polished UI with modern dark-blue theme

---

## 📂 Project Structure

```

monexa/
├── monexa-client/     # React Frontend
└── monexa-server/     # Express Backend

````

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repos

```bash
git clone https://github.com/LIKHITHKUMAR28/monexa-server.git
git clone https://github.com/LIKHITHKUMAR28/monexa-client.git
````

### 2️⃣ Server Setup (Backend)

```bash
cd monexa-server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
```

Start server:

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

### 3️⃣ Client Setup (Frontend)

```bash
cd ../monexa-client
npm install
```

Create `.env` file:

```env
REACT_APP_API_BASE_URL=https://monexa-server-production.up.railway.app
```

Start client:

```bash
npm start
```

Client runs on: `http://localhost:3000`

---

## 🌍 Deployment

| Service           | Repo URL                                                                                           | Notes                             |
| ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------------- |
| Railway (Backend) | [https://monexa-server-production.up.railway.app](https://monexa-server-production.up.railway.app) | Uses Railway for auto-deploy      |
| Vercel (Frontend) | [https://monexa-client.vercel.app](https://monexa-client.vercel.app)                               | Linked to GitHub repo with `.env` |

---

## 📘 Important Files

* `axios.js`: Centralized API handler (client)
* `server.js`: Entry point (backend)
* `authController.js`: Register/login/forgot logic
* `.env`: Contains sensitive credentials (never upload this)

---

## 🙌 Author

Built with 💙 by [Likhith Kumar](https://github.com/LIKHITHKUMAR28)

---

## 📄 License

This project is licensed under the MIT License.

```

---

### ✅ You can copy and place this `README.md`:
- In the **root folder** of a monorepo
- Or inside either repo (`monexa-client/` or `monexa-server/`) for unified documentation.

Let me know if you want badges, screenshots, or a walk-through video demo script added!
```
