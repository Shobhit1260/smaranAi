# Learning Management System

A full-stack Learning Management System with role-based access control for students and teachers, built with React, Express.js, and Supabase.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Supabase Account** (for database and authentication)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Internship
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

**How to get Supabase credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL, anon/public key, and service_role key

#### Run Database Migrations

Execute the SQL migration files in your Supabase SQL Editor in this order:
1. `supabase/Migrations/create_profile_table.sql`
2. `supabase/Migrations/create_invitations_table.sql`
3. `supabase/Migrations/create_quizzes_questions_user_attempts.sql`
4. `supabase/Migrations/create_student_daily_progress.sql`
5. `supabase/Migrations/create_functions.sql`
6. `supabase/Migrations/create_dashboard_rpcs.sql`
7. `supabase/Migrations/create_teacher_dashboard_rpcs.sql`
8. `supabase/Migrations/create_rls_policies.sql`

#### Start Backend Server

```bash
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `frontend` folder:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Running Both Applications

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using npm-run-all (Coming Soon)

You can set up a script in the root `package.json` to run both simultaneously.

## 📦 Available Scripts

### Backend Scripts

- `npm start` - Start the backend server
- `npm run dev` - Start with nodemon (auto-restart on changes)

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
Internship/
├── backend/
│   ├── server.js           # Express server entry point
│   ├── package.json
│   └── src/
│       ├── config/         # Configuration files
│       ├── controllers/    # Route controllers
│       ├── middlewares/    # Auth and role middlewares
│       ├── routes/         # API routes
│       ├── services/       # Business logic
│       └── utils/          # Helper utilities
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/     # React components
│       ├── Pages/          # Dashboard pages
│       ├── config/         # Frontend config
│       └── utils/          # Utility functions
│
└── README.md
```

## 🔑 Key Features

### Authentication
- ✅ Email/Password Authentication
- ✅ Google OAuth Integration
- ✅ Email Verification
- ✅ Password Reset/Recovery
- ✅ JWT Token-based Sessions

### Student Features
- 📊 View Personal Progress
- 📝 Take Quizzes
- 📈 View Performance Reports
- 🔄 Track Daily Progress
- 👤 Update Profile

### Teacher Features
- 📊 Dashboard Statistics
- 👥 Student Performance Analytics
- 📋 Individual Student Reports
- 📚 Question Bank Management
- ⚠️ Identify Students Needing Attention
- 🎯 View Most Difficult Questions

### Role-Based Access Control
- 🔒 Protected Routes
- 👨‍🎓 Student Role
- 👨‍🏫 Teacher Role
- 🛡️ Middleware Protection

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **Supabase Client** - Authentication & Database

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **Supabase** - PostgreSQL Database
- **JWT** - Authentication
- **CORS** - Cross-Origin Resource Sharing

## 📚 API Documentation

For detailed API endpoints and routes documentation, see:
- [CONTROLLERS_AND_ROUTES_DOCUMENTATION.md](CONTROLLERS_AND_ROUTES_DOCUMENTATION.md)
- [PROJECT_FLOWCHART.md](PROJECT_FLOWCHART.md)

### Main API Endpoints

#### Authentication (`/api/auth`)
- `POST /signup` - Create new account
- `POST /signin` - Login
- `GET /signin/google` - Google OAuth
- `POST /signout` - Logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password

#### Profile (`/api/profile`)
- `POST /create` - Create profile
- `POST /update` - Update profile
- `GET /` - Get profile

#### Student Dashboard (`/api/student`)
- `GET /progress` - Get progress data
- `GET /quizzes` - Get quizzes
- `GET /reports` - Get reports

#### Teacher Dashboard (`/api/teacher`)
- `GET /stats` - Dashboard statistics
- `GET /students` - All students
- `GET /students/:id` - Individual student report
- `GET /questions/difficult` - Difficult questions
- `GET /students/attention` - Students needing attention

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify all environment variables are set correctly
- Ensure Supabase credentials are valid

### Frontend won't start
- Check if port 5173 is available
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Verify VITE_API_URL points to the correct backend URL

### Database connection issues
- Verify Supabase URL and keys
- Check if migrations are executed
- Ensure RLS policies are properly set up

### CORS errors
- Verify FRONTEND_URL in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of an internship program.

## 📧 Support

For support and queries, please refer to the documentation or contact the development team.

---

**Happy Coding! 🚀**
