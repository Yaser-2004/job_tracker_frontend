## Job Application Tracker

This project is a Job Application Tracker, a web app that helps users manage and track their job applications. Users can add new job applications, update their status, and view insightful statistics through charts and tables.

## Features

- User Authentication: Secure login and registration system.

- Add Job Applications: Submit details of new job applications, including job title, company name, date applied, status, and notes.

- Edit Applications: Update job application details with ease.

- View Statistics: Visualize job application statuses (e.g., Applied, Interviewing, Rejected, Offered) through responsive bar charts.

- Manage Applications: View a list of all job applications in a responsive table with options to edit or delete.

## Tech Stack

## Frontend:

- React.js (with hooks)

- Redux Toolkit (state management)

- Chart.js (data visualization)

- Tailwind CSS (styling)

## Backend:

- Node.js

- Express.js

## Database:

- MongoDB (storing user and job data)

## Setup and Installation

Prerequisites:
- Node.js and npm installed on your machine.

- MongoDB set up locally or in the cloud.

## Steps

- Clone the repository:   git clone https://github.com/your-username/job-application-tracker.git

- Navigate to the project folder:     cd job-application-tracker

- Install dependencies for the backend:

cd backend
npm install

- Set up environment variables in the backend/.env file :

PORT=3000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key

- Start the backend server:   npm start

- Navigate to the frontend folder and install dependencies:

cd ../frontend
npm install

- Start the frontend server:    npm start

- Open the application in your browser at http://localhost:3000.

Project Structure

job-application-tracker/
├── backend/       # Node.js + Express.js API
├── frontend/      # React.js frontend
├── README.md      # Project documentation

## Usage

- Register/Login: Create an account or log in using existing credentials.

- Add a Job: Navigate to the "Add Job" page to create a new job application entry.

- View Applications: See all job applications in a tabular format.

- Edit/Delete: Update or remove existing applications.

- View Insights: Check the "Statistics" section for a bar chart summarizing your application statuses.

## Future Enhancements

- Add email notifications for status updates.

- Enable exporting data as CSV.

- Implement dark mode for improved user experience.