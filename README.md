# My Portfolio Website

A full-stack personal portfolio website with a dynamic, database-driven backend — built to move beyond a static site into a real client-server application with working APIs and a functional contact form.

**Stack:** 

Frontend: HTML, CSS, JavaScript

Backend: Node.js with Express.js

Database: MongoDB

## Live Site
https://portfolio-frontend-d7hj.vercel.app

## Backend deployed separately on Render:

https://portfolio-backend-2udn.onrender.com

## Features

- Fully responsive, mobile-first UI with light/dark mode toggle
- Backend-driven dynamic content — profile, skills, and projects are fetched from MongoDB via REST APIs, not hardcoded
- RESTful API endpoints (`/api/profile`, `/api/skills`, `/api/projects`) built with Express
- Real contact form with server-side validation (express-validator), database storage, and automated email notifications via Nodemailer
- MVC-style backend architecture (routes → controllers → models) for clean, maintainable code
- Secure environment variable configuration for database credentials and email secrets
- Smooth scroll-reveal animations and skeleton loading states while data fetches
- Production deployment: frontend on Vercel, backend on Render, database on MongoDB Atlas


## Setup

### Backend
cd portfolio-backend

npm install

npm run dev

### Frontend
Open index.html in your browser
or deploy to Vercel/Netlify
