🏢 HostelHelp - AI-Powered Hostel Complaint Management System

HostelHelp is a modern, MERN-stack web application designed to streamline maintenance and facility requests in university student hostels. By integrating Google's Gemini AI, the system automatically triages incoming complaints and uses semantic vector search to prevent duplicate tickets, saving hours of administrative overhead.

✨ Key Features

🤖 AI-Driven Automation (Powered by Gemini)

Automated Priority Triage: Every submitted complaint is silently analyzed by gemini-1.5-flash to determine its urgency, automatically assigning it a High, Medium, or Low priority level.

Semantic Deduplication: Before submission, text is converted into a 768-dimensional vector using gemini-embedding-001. The backend calculates Cosine Similarity to check active database records. If an 80%+ match is found, the user is prompted to upvote the existing ticket instead of creating a duplicate.

👥 Resident Workflows

Public vs. Private Complaints: Students can choose to make their issues public for the hostel community to see, or keep them private between themselves and the incharge.

Community Upvoting: Residents can upvote public complaints. The backend uses atomic MongoDB operators ($addToSet) to manage concurrent voting safely.

Personal Dashboard: Students can track the status of their own tickets (Pending, In Progress, Resolved) without seeing hidden administrative data (like AI priority scores).

👑 Admin / Incharge Dashboard

Smart Sorting: The admin view automatically sorts incoming tickets by AI Priority (High -> Medium -> Low), ensuring critical safety or facility emergencies are addressed first.

Status Management: Admins can transition tickets through their lifecycle, keeping residents updated in real-time.

🛠️ Tech Stack

Frontend: React.js, React Router, CSS/Tailwind (or your styling framework)

Backend: Node.js, Express.js

Database: MongoDB & Mongoose

AI Integration: Google Gemini API (gemini-1.5-flash, gemini-embedding-001)

Authentication: JSON Web Tokens (JWT) & bcryptjs

🚀 Getting Started

Prerequisites

Node.js (v16 or higher)

MongoDB (Local instance or MongoDB Atlas cluster)

A free Google Gemini API Key from Google AI Studio

Environment Variables

Create a .env file in the root of your backend directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key


Installation

Clone the repository:

git clone https://github.com/vikashmain/HostelHelp.git
cd HostelHelp


Install Backend Dependencies:

cd backend
npm install


Install Frontend Dependencies:

cd ../frontend
npm install


Run the Application:

Start the backend server: npm run dev (from the backend folder)

Start the React development server: npm run dev (from the frontend folder)

🧠 System Architecture Highlight: Vector Search

To solve the issue of students reporting the same problem using different vocabulary (e.g., "Fan is broken" vs. "Ceiling ventilator making noise"), HostelHelp utilizes an internal vector search engine.

User drafts a complaint.

The Node.js server generates a 768-dimension mathematical embedding of the text.

The server compares this array against all active complaints in MongoDB using a custom Cosine Similarity algorithm.

If similarity > 0.80 (80% semantic match), the UI interrupts the submission and reroutes the user to the existing ticket.

🗺️ Roadmap (Upcoming Features)

Hotspot Detection: Automatically clustering similar complaints by floor or wing to detect structural issues.

Event-Driven Notifications: Real-time push notifications when an admin changes a ticket's status.

Service Level Agreements (SLAs): Automated analytics tracking how often High-priority tickets are resolved on time.
