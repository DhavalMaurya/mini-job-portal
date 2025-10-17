# Mini Job Portal

A full-stack job portal application built with the **MERN stack** (MongoDB, Express, React, Node.js). This app allows users to browse job listings and employers to post jobs, featuring a responsive UI and a RESTful API.

## 🌐 Live Demo

You can view the live project here: **[https://mini-job-portal-wtu3.onrender.com](https://mini-job-portal-wtu3.onrender.com)**

---

## 🚀 Features

- Add new job listings  
- Filter jobs by location, job type, and technology  
- View detailed job information  
- Responsive and clean user interface  
- RESTful API with MongoDB integration
---

## 🛠 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DhavalMaurya/mini-job-portal.git
cd mini-job-portal
```

### 2. Install Dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

### 3. Environment Variables

#### Client

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:3001/api/jobs
```

#### Server

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI.

### 4. Run the Application

#### Start the Server

```bash
cd server
npm start
```

#### Start the Client

Open a new terminal:

```bash
cd client
npm run dev
```

---

## 📁 Folder Structure

```
mini-job-portal/
├── client/      # React frontend (Vite)
└── server/      # Express backend with MongoDB
```

---

## 🧰 Tech Stack

- **MongoDB**
- **Express.js**
- **React** (with Vite)
- **Node.js**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Dhaval Maurya**  
BCA Student | MERN Stack Developer  
[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)
