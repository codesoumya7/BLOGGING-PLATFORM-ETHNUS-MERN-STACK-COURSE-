# BLOGGING-PLATFORM-ETHNUS-MERN-STACK-COURSE-

A full-stack MERN blogging web app where users can sign up, log in, create blogs, view all blogs, edit and delete their own blogs — all with a clean, responsive UI.

##  Tech Stack

- Frontend: React, Axios, Material UI  
- Backend: Node.js, Express.js  
- Database: MongoDB Compass

##  Local Setup Guide

# How to Run This Project Locally

Follow these steps to run both frontend and backend.

1. Clone the repository or download the ZIP file.

2. Install Server Dependencies:  
   cd server  
   npm install  

   Set up MongoDB locally, or use a cloud service like MongoDB Atlas.
  
   Create a `.env` file in the `server/` folder and add:  
   MONGO_URL=your-mongodb-connection-string  
   PORT=8000  

3. Run the Server:  
   npm start  

   The backend should run on:  
   http://localhost:8000  

4. Install Client Dependencies:  
   Open a new terminal window and run:  
   cd client  
   npm install  

5. Run the React Client:  
   npm run start  

   The frontend runs on:  
   http://localhost:3000
