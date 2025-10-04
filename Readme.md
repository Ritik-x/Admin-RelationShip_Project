# Admin-Relationship (MERN Stack Internship Assignment)

## Description
This is a MERN-stack project created as part of a machine test.  
Admin can:
- Login securely using JWT
- Create, update, delete, and list agents
- Upload CSV contact lists
- Automatically distribute contacts equally among agents
- View tasks per agent on a dashboard

---

## Features
- Admin authentication (JWT + HttpOnly cookie)
- Agent management (CRUD)
- Upload CSV & auto-distribute contacts
- Task dashboard with per-agent stats
- Simple, responsive frontend using React + Tailwind CSS

---

## Tech Stack
- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT, Multer
- **Database:** MongoDB

---

## Installation & Run

### Backend
1. Go to the server folder:
```bash
cd server
npm install

````

Create .env:
```bash

MONGODB_URI=<your_mongo_uri>
JWT_SECRET=<your_secret>
PORT=3000

```


Start server:
```bash

npm start

```

Frontend

```bash

cd ../client
npm install
npm run dev
```
Open: http://localhost:5173

---

Usage

Login as Admin

Create ≥5 agents

Upload CSV file (Columns: FirstName, Phone, optional Notes)

View distributed tasks on Dashboard










