# 🎓 **Club Management System**

A full-stack Club Management System designed to manage college club activities such as members, events, announcements, attendance, bus timings, monitoring, and dashboard analytics.The project is built with a modular backend architecture and is planned to integrate Geo-attendance and Wi-Fi–based attendance as future enhancements.

## 🚀 Features

##### Member Management
* Add, view, and delete club members
* Role-based members (Officers, Year Incharge, Event Managers, Member)

##### Event Management
1. Create and manage club events
2. Track event schedules, venues, and descriptions

##### 

##### Announcements
1. Post important club announcements
2. View and manage announcements centrally

##### Bus Timings
1. Manage college/club-day bus schedules
2. Easy access for students

##### Attendance Management
1. Mark attendance for events
2. Store attendance records per member
3. Designed for future Geo \& Wi-Fi attendance integration

##### Dashboard
1. Total members, events, announcements
2. Role distribution (for charts)
3. Events per month statistics
   
##### Monitoring
1. Monitor absentee records
2. Identify frequently absent members

### 🛠 Tech Stack
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Frontend
* React (Vite)
* Bootstrap / CSS
* Postman – API testing

### 📂 Project Structure

club-management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── announcementController.js
│   │   ├── attendanceController.js
│   │   ├── busController.js
│   │   ├── dashboardController.js
│   │   ├── eventController.js
│   │   ├── memberController.js
│   │   └── monitoringController.js
│   ├── models/
│   │   ├── Announcement.js
│   │   ├── Attendance.js
│   │   ├── Bus.js
│   │   ├── Event.js
│   │   └── Member.js
│   ├── routes/
│   │   ├── announcementRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── busRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── memberRoutes.js
│   │   └── monitoringRoutes.js
│   ├── .env
│   └── server.js
└── frontend/ (React – under development)

### ⚙️ Installation \& Setup

1️⃣ Clone the Repository
git clone https://github.com/your-username/club-management.git

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables
Create a .env file inside backend/:
MONGO\_URI=your\_mongodb\_atlas\_connection\_string
PORT=5000

4️⃣ Run the Server
npm start


### Future Enhancements
Geo-Attendance (GPS based)
Wi-Fi based Attendance (Zone / Venue based)
Mobile-friendly UI
Authentication \& Role-based Access
Advanced analytics \& reports

🎯Project Purpose
This project is developed as an Academic Year Project and aims to provide a scalable, real-world solution for efficiently managing college club activities, events, attendance, announcements, and member coordination through a centralized platform.

***Author***
***Priya Dharshini B***
