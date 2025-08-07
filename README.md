# 📝 Medium Blogging App (Full Stack)

A full-stack Medium-style blogging platform built using **React**, **TypeScript**, **Node.js**, and **Prisma**. This project supports user authentication, blog publishing, viewing, and editing with a modern frontend UI and a robust backend.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up & Sign In)  
- ✍️ Create, Read, Update blogs  
- 📰 Blog listing with full content view  
- ⚙️ Modern tech stack: Vite, React, Node.js, Prisma, Zod  
- 📦 Modular folder structure with shared types  

---

## 📁 Folder Structure
Medium-App/
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── routes/ # Route definitions (blogs, users)
│ │ ├── blogs.ts # Blog logic
│ │ ├── user.ts # User auth logic
│ │ └── index.ts # Entry point
│ ├── prisma/ # Prisma schema & migrations
│ ├── .env # Environment variables
│ └── package.json # Backend dependencies
│
├── common/ # Shared types and schemas
│ └── src/
│ └── index.ts # Zod validation for blog/auth inputs
│
├── frontend/ # React + TypeScript + Vite frontend
│ ├── public/
│ ├── src/
│ │ ├── pages/ # Route pages (Signup, Signin, Publish, Blogs)
│ │ ├── components/ # Reusable UI components (Appbar, Skeletons)
│ │ ├── hooks/ # Custom hooks
│ │ └── index.tsx # Main entry point
│ └── package.json # Frontend dependencies

---

## ⚙️ Tech Stack

| Layer     | Technology                        |
|-----------|---------------------------------|
| Frontend  | React, TypeScript, Vite         |
| Backend   | Node.js, Express, Prisma ORM    |
| Validation| Zod                             |
| Database  | PostgreSQL (or any SQL DB)      |
| Styling   | CSS Modules / Tailwind (optional) |
| Auth      | Custom Token-based authentication |

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

git clone https://github.com/pravi7072/Medium-App.git
cd Medium-App


---

### 2. Backend Setup

- cd backend
- npm install


- Set environment variables in `.env` file:

  - `DATABASE_URL`: Your database connection URL  
  - `JWT_SECRET`: Your JWT secret key

- Generate Prisma client and run migrations:

- npx prisma generate
= npx prisma migrate dev --name init


- Start the backend development server:

npm run dev



---

### 3. Frontend Setup

In a new terminal window/tab, run:

- cd ../frontend
- npm install
- npm run dev


---

## 🙋‍♂️ Author

Pravi7072

Feel free to contribute, raise issues, or suggest improvements to enhance this platform!

---
