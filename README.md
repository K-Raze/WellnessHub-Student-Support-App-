🎓 Student Support Platform

A student-focused mental health web application providing anonymous peer forums, AI chatbot support, counselor bookings, and secure community engagement — built with a vision to empower students in a stigma-free space.

⸻

🟦 Current Status: Frontend (React.js Web App)

This repository contains the frontend only, developed with React + Vite + TypeScript + Tailwind + shadcn/ui.
The UI is designed for students, counselors, and admins.

✨ Frontend Features

👩‍🎓 Student Side
• Login/Register with option for anonymous profile.
• AI Chatbot Page → conversational interface with supportive replies.
• Booking Page → calendar view to book appointments with counselors.
• Peer Forum Page → post, comment, like, and report posts in a moderated community.

👩‍⚕️ Counselor Side
• Appointments Dashboard → view and manage booked sessions.

👨‍💻 Admin Side
• Analytics Dashboard → charts showing anonymized mental health trends.
• Forum Moderation Panel → review and manage flagged posts.

⸻

🟩 Planned Backend (Node.js + Express.js + Database)

The backend will provide secure APIs and database management for all features.

🔑 Core Modules 1. Authentication
• JWT-based login/signup.
• Student anonymity (store alias instead of real name). 2. Booking System
• APIs for creating, updating, canceling appointments.
• Store counselor availability in DB. 3. Peer Forum
• CRUD APIs for posts/comments.
• Report/flag system for moderation. 4. Admin Dashboard APIs
• Collect anonymized chatbot + booking data.
• Provide analytics endpoints (JSON for charts).

📊 Database Choice
• MongoDB → flexible for unstructured JSON-like data.
• PostgreSQL → structured, relational alternative.

⸻

🟥 Planned AI/ML Integration

The platform will feature an AI-powered chatbot + analytics engine integrated into the backend.

🤖 Chatbot Logic
• Hybrid of rule-based and NLP-based responses.
• Uses Hugging Face / spaCy / TensorFlow Lite for intent detection.

🔥 AI Features 1. AI First-Aid Support
• Coping strategies (deep breathing, journaling, meditation).
• Auto-suggest counselor booking for severe cases. 2. Screening Tools
• PHQ-9 and GAD-7 scoring built in.
• Store anonymized results for analytics. 3. Sentiment & Risk Detection
• Detect “red-flag” words (e.g., suicide, hopelessness).
• Trigger emergency counselor alert. 4. Analytics Engine
• Aggregate anonymized chatbot usage.
• Provide insights on mental health trends for admins.

⸻

🛠️ Tech Stack

Frontend:
• React (Vite)
• TypeScript
• Tailwind CSS
• shadcn/ui

Planned Backend:
• Node.js + Express.js
• MongoDB or PostgreSQL

Planned AI/ML:
• Hugging Face / spaCy / TensorFlow Lite

⸻

🚀 Getting Started (Frontend Only)

Prerequisites
• Node.js (via nvm recommended)
• npm (comes with Node.js)

Installation

# Step 1: Clone the repo

git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git

# Step 2: Enter project folder

cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies

npm install

# Step 4: Start development server

npm run dev

Your app runs locally at: http://localhost:5173

⸻

📜 License

This project is licensed under the MIT License – free to use and adapt.


