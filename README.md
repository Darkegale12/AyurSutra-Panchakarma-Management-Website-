# AyurSutra – Smart Panchakarma Management System

### A Next-Generation Ayurvedic Care Platform

AyurSutra is a comprehensive web platform designed to streamline the **Panchakarma therapy management process** for Ayurvedic practitioners and patients.  
It integrates **smart scheduling, treatment tracking, doctor verification, and unified medical record management** — delivering a seamless experience powered by modern full-stack technologies.

---

## 🧠 Key Highlights
- 🚀 **Top 8 Finalist** in *Smart India Hackathon (SIH) Internal 2025* out of 120 teams.
- 💡 Combines **Ayurvedic expertise** with **digital intelligence** for efficient, transparent, and secure patient care.
- 🔒 Backed by a secure architecture with **Spring Boot (backend)**, **React + Next.js (frontend)**, and **MySQL database**.

---

## ⚙️ Core Features

- 🗓️ **Smart Scheduling** – Auto-manages appointments for pre- and post-Panchakarma treatments.  
- 💊 **Medication Tracking** – Keeps logs of medicines, dosages, and durations for each phase.  
- 💬 **Feedback System** – Collects patient feedback at every stage to improve service quality.  
- 🧾 **Treatment Roadmap View** – Visual representation of the complete therapy lifecycle.  
- 🧑‍⚕️ **Doctor Verification via AyurGrid** – Ensures practitioner authenticity and transparency.  
- 🗂️ **Centralized Medical Reports** – Stores prescriptions, test reports, and summaries securely.  
- 📧 **Smart Notifications** – Sends timely updates and reminders through email.  
- 📄 **Unified Health Summary PDF** – Generates a consolidated medical history document.

---

## 🏗️ System Architecture

![System Architecture](assets/architecture.png)

### **Backend – Spring Boot (Java 17)**
- Layered structure ensures modularity and maintainability:
  - **Controller Layer:** Handles HTTP requests/responses via REST APIs.  
  - **Service Layer:** Contains core business logic and validation.  
  - **DAO / Repository Layer:** Manages database operations through JPA/Hibernate.  
- **Database:** MySQL for relational data management.  
- **Security:** Spring Security + JWT authentication (extendable).  
- **Build Tool:** Maven.  

### **Frontend – React + Next.js**
- Responsive UI for patients and practitioners.  
- API integration with backend using Axios/Fetch.  
- Dynamic pages for scheduling, treatment roadmaps, and report visualization.  
- Integrated state management for smooth navigation.  

---

## 🖼️ Project Screenshots

![Project Screenshot](assets/screenshot.png)

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React JS • Next.js • HTML5 • CSS3 • JavaScript (ES6+) |
| **Backend** | Java 17 • Spring Boot • Spring Data JPA • Hibernate |
| **Database** | MySQL |
| **Build Tools** | Maven • npm/yarn |
| **Version Control** | Git • GitHub |
| **Hosting/Deployment** | Vercel / Render / AWS (optional) |
| **Other Integrations** | AyurGrid API • Mail Notification Service • PDF Generator (iText / PDFBox) |

---


# Run the application
mvn spring-boot:run
