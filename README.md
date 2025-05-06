
---

# 🎓 EduMosaic – Institutional Arabic Learning Platform

📍 Live Site: [edu-institution.vercel.app](https://edu-institution.vercel.app)
📂 GitHub: [github.com/Muhammed-Salih-PK/edu-institution](https://github.com/Muhammed-Salih-PK/edu-institution)

EduMosaic is a full-stack Arabic learning platform built specifically for educational institutions that teach Arabic language and culture. It empowers administrators, instructors, and students with a centralized, modern web portal for managing courses, submitting applications, and tracking progress.

---

## 🏫 Institutional Overview

Designed for real-world academic deployment, EduMosaic is ideal for Arabic institutes, schools, or organizations that want to:

* Digitize their Arabic curriculum
* Manage instructors, students, and applications from one secure dashboard
* Deliver video-based lessons and track learner engagement
* Handle file submissions (resumes, portfolios) via the cloud

It brings together everything an institution needs to provide an engaging and scalable digital Arabic learning experience.

---

## 🌟 Key Features

* 📝 Course creation with lesson videos and structured content
* 📈 Student progress tracking through curriculum milestones
* 🧑‍💼 Admin dashboard to manage users, courses, and applications
* 💳 Stripe integration for payment collection
* ☁️ Resume/file upload support using Cloudinary
* 📬 Automatic email notifications (Arabic + English support)
* 🔐 Secure login system using JWT and bcrypt

---

## 🛠 Tech Stack

* 🔧 Framework: Next.js (App Router)
* 🎨 Styling: Tailwind CSS + shadcn/ui
* 🗄 Database: MongoDB + Mongoose
* 🔐 Authentication: JWT & bcrypt (no NextAuth)
* ☁️ File Hosting: Cloudinary
* 💳 Payments: Stripe
* 🚀 Deployment: Vercel

---

## 🔐 Authentication & Security

* Fully custom JWT-based login system
* Passwords hashed with bcrypt
* Middleware-based route protection for admin pages
* No third-party auth providers; 100% institutional control

---

## ☁️ Cloudinary Integration

* Resume and media files uploaded securely to Cloudinary
* Stored public IDs in MongoDB for easy access by admin
* "View Resume" feature on admin dashboard
* Fast and scalable media delivery

---

## 🧪 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Muhammed-Salih-PK/edu-institution.git
cd edu-institution
npm install
```

2. Create a .env.local file with the following:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
DB_NAME=Database_name
```

3. Start the development server:

```bash
npm run dev
```

---

## 📈 Feature Upgrades

| Feature        | Old System        | EduMosaic Upgrade                        |
| -------------- | ----------------- | ---------------------------------------- |
| Authentication | next-auth         | JWT + bcrypt-based secure login          |
| Database       | MySQL             | MongoDB with Mongoose                    |
| UI Framework   | Vanilla CSS       | Tailwind CSS + shadcn/ui                 |
| File Handling  | Email Attachments | Cloudinary cloud uploads & resume viewer |
| Deployment     | Shared Hosting    | Vercel + Edge Functions                  |

---

## 📸 Screenshots

You can add relevant screenshots here:

* 🧑‍🎓 Student Dashboard
* 🎓 Course Details
* 📋 Application Form
* 🗃️ Admin Course Management
* 📂 Resume Viewer Modal

---

## 📄 License

MIT © 2025 Muhammed Salih PK

---