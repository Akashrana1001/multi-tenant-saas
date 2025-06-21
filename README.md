# 🌐 Multi-Tenant SaaS Admin Dashboard

A powerful full-stack SaaS application built for company heads to manage projects, team members, and clients — with tenant-based data separation, role-based access control, and export-ready dashboards.

🚀 Live Demo: [View on Vercel](https://multi-tenant-saas-one.vercel.app/home)  
🟢 Backend API: [View on Render](https://multi-tenant-saas.onrender.com)

> Built with 💡 scalability, 🛡️ security, and 🔥 modern tech.

---

## ✨ Features

- 🧑‍💼 Admin-based login & JWT authentication  
- 🏢 Multi-Tenant architecture (each company sees only their own data)  
- 📊 Dashboard: Real-time stats (projects, team, clients)  
- 📝 CRUD: Manage Projects, Team Members, and Clients  
- 🔐 Role-based access control (admin-only pages)  
- 📩 Forgot Password / Reset Password via Gmail  
- 📦 Export data as JSON (Projects, Team, Clients)  
- 📁 Organized folder structure (client/server)  
- 💅 Tailwind CSS + responsive UI  
- 🌐 Fully deployed (Vercel + Render + MongoDB Atlas)

---

## 🛠 Tech Stack

| Frontend            | Backend               | Database          | Deployment         |
|---------------------|-----------------------|-------------------|--------------------|
| React (CRA)         | Node.js + Express     | MongoDB Atlas     | Vercel (frontend)  |
| Tailwind CSS        | JWT, Middleware       | Mongoose ODM      | Render (backend)   |
| React Router v6     | Bcrypt + Nodemailer   |                   | .env based config  |

---

## 📂 Folder Structure

```bash
multi-tenant-saas/
├── client/                 # React frontend
│   ├── src/pages/
│   ├── src/components/
│   └── tailwind.config.js
├── server/                 # Node backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
```

---

## 🔐 Admin Auth & Route Protection

- Signup with name, email, password, tenantId  
- Login returns JWT token and user info  
- Protected routes using middleware and tenantId  
- Frontend checks for user roles (admin-only views)

---

## 🧪 API Testing with Postman

- POST /api/auth/signup  
- POST /api/auth/login  
- GET /api/projects  
- GET /api/team  
- GET /api/clients  

Use Bearer Token:
```http
Authorization: Bearer <your_token>
```

---

## 📤 Export Feature

- Export Projects, Team, and Clients as JSON  
- Button-based export on frontend

---

## 🛠 Environment Variables

server/.env:
```env
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
BASE_URL=https://your-vercel-site.vercel.app
```

client/.env:
```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/Akashrana1001/multi-tenant-saas.git
cd multi-tenant-saas

# Start backend
cd server
npm install
npm run dev

# Start frontend
cd ../client
npm install
npm start
```

---

## 🙌 Author

Developed by [Akash Chauhan](https://www.linkedin.com/in/akashrana100)  
📫 Email: sandeepakash537@gmail.com  
📝 License: MIT
