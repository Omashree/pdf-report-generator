# 🚀 PDF Report Generation System
A full-stack web application for generating dynamic PDF reports based on a configuration-driven system. This project is built to demonstrate a scalable and flexible approach to data visualization and reporting for different assessment types.

---

## ✨ Features
* **User Authentication:** 🔒 Secure user registration and login system.
* **Dynamic Report Generation:** 📄 Generate personalized PDF reports on demand based on a unique `session_id`.
* **Configuration-Driven Design:** ⚙️ Easily add new assessment types, modify data mappings, and update classification ranges without changing the core application logic.
* **Real-time Data Fetching:** 📊 Fetches data from a local `data.js` file to populate reports.
* **Modern Tech Stack:** 💻 Built with React, Node.js, and Tailwind CSS for a robust and maintainable application.

---

## 🚀 Technologies
* **Frontend:** `React.js` ⚛️, `Tailwind CSS` 🎨, `http-proxy-middleware`
* **Backend:** `Node.js` 🟩, `Express.js` ⚡, `Puppeteer` 🤖, `jsonwebtoken` 🔑, `body-parser`
* **Database:** `Firebase Firestore` 🔥 (for user authentication)

---

## 🛠️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/Omashree/pdf-report-generator.git
cd pdf-report-generator
```

**2. Backend Setup**
Navigate into the `backend` directory and install the dependencies.

```bash
cd backend
npm install
```

**3. Frontend Setup**
Open a new terminal, navigate into the `frontend` directory and install the dependencies.

```bash
cd ../frontend
npm install
```

---

## 🛠️ Configuration

### Backend

Create a `.env` file in the `backend` directory with the following variables:

```bash
PORT=5000
SECRET_KEY=your_jwt_secret_key
```

### Frontend

Create a `.env` file in the `frontend` directory with the following variables:

```bash
VITE_baseUrl=http://localhost:5000
```

---

## 🏃 Running the Application
Follow these steps to get the project running on your local machine.

1.  **Start the Backend Server:**
Navigate into the `backend` directory and start the server.

```bash
cd backend
node index.js
```

The server will be running at [http://localhost:5000](http://localhost:5000).

2.  **Start the Frontend:**
Navigate into the `frontend` directory and start the development server.

```bash
cd ../frontend
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Configuration System Design
This system's power lies in its configuration-driven architecture. The report generation logic is generic and relies on a configuration object to decide what data to display and how to display it.

### Adding a New Assessment Type
To add a new assessment, a developer only needs to update the `config.js` file and create a corresponding HTML template.

* **1. Update config.js:** Add a new key to the `config` object with a unique `assessment_id`.

```bash
// config.js
const config = {
  "as_new_01": {
    template: 'new_assessment_report.html',
    sections: [
      {
        title: "New Assessment Overview",
        fields: [
          { label: "Patient Name", path: "user.name" },
          { label: "Results", path: "results.final_score" }
        ]
      }
    ]
  },
  // ... existing configurations
};
```

* **2. Create a new HTML template:** Create `new_assessment_report.html` in the `backend/templates` folder with placeholders that match the configuration.

### Modifying Data Field Mappings
To change where data is sourced from, simply update the `path` property in the configuration.

```bash
// config.js
// Old mapping
// { label: "Heart Rate", path: "vitalsMap.vitals.heart_rate" }

// New mapping
{ label: "Heart Rate", path: "summary.cardiac_metrics.heart_rate" }
```

### Updating Classification Ranges
Classification ranges are also defined in the configuration, allowing for easy updates.

```bash
// config.js
{
  label: "Overall Score",
  path: "summary.score",
  ranges: [
    { value: 0, label: "Poor" },
    { value: 50, label: "Good" },
    { value: 90, label: "Excellent" }
  ]
}
```

---

## 📦 Data
The sample data for this project is located in `backend/data.js`. This file contains an array of two assessment data objects, each identified by a unique `session_id`. The backend API uses this ID to retrieve the correct dataset for report generation.

---

## 📁 File Structure

```bash
.
├── backend/
│   ├── reports/
│   ├── templates/
│   │   ├── as_card_01.html
│   │   └── as_hr_02.html
│   ├── config.js
│   ├── data.js
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Authform.jsx
    │   │   └── ReportGenerator.jsx
    │   └── App.jsx
    └── package.json
```

---

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.