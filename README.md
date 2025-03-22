# Fraud Analysis Dashboard

## Table of Contents
- [About Project](#about-project)
- [Installation](#installation)
  - [Clone Repository](#clone-repository)
  - [Install Frontend Requirements](#install-frontend-requirements)
  - [Install Backend Requirements](#install-backend-requirements)
- [Run the Project](#run-the-project)
  - [Run the Backend](#run-the-backend)
  - [Run the Frontend](#run-the-frontend)
- [Features](#features)
- [Contribution](#contribution)
- [License](#license)
- [Contact Me](#contact-me)
- [Acknowledgments](#acknowledgments)

## About Project
The **Fraud Analysis Dashboard** is a web application designed to display fraud analysis results obtained from the **IPQualityScore API**. It provides a user-friendly interface to assess risk levels and analyze fraud data effectively. 

### Tech Stack:
- **Frontend:** React, TypeScript, Shadcn UI, Lucide React
- **Backend:** Node.js, Express.js
- **Visualization:** Recharts (for data visualization)
- **API:** IPQualityScore API (for fraud detection)

## Installation
Follow these steps to set up the project on your local machine.

### Clone Repository
```bash
git clone https://github.com/anandsundaramoorthysa/Fraud-Detection.git
cd Fraud-Detection
```

### Install Frontend Requirements
```bash
cd frontend
npm install  # or yarn install
```

### Install Backend Requirements
```bash
cd ../backend
npm install  # or yarn install
```

## Run the Project
Make sure you have **Node.js** and **npm (or yarn)** installed on your system.

### Run the Backend
```bash
cd backend
npm start  # or yarn start
# If using nodemon for development:
npm run dev  # or yarn dev
```
Ensure your backend is configured correctly with the **IPQualityScore API**. You may need to set up an API key in an environment file.

### Run the Frontend
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm start  # or yarn start
```
This will typically open the application in your web browser at `http://localhost:3000/`.

## Features
- **Overall Risk Assessment:** Displays a visual representation of the fraud risk score.
- **Risk Level Indication:** Categorizes risk levels into **Low, Medium, High, and Critical**.
- **Summary Information:** Provides details like email validity, deliverability, and raw fraud score.
- **Detailed Report:** Displays raw JSON fraud analysis data.
- **User-Friendly Interface:** Uses **Shadcn UI** for a clean and modern design.
- **Iconography:** Implements **Lucide React** icons for better visualization.
- **(Upcoming Feature) Data Visualization:** Integration with **Recharts** for graphical representation.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Submit a **Pull Request**.

## License
This project is licensed under the **MIT License**.

## Contact Me
If you have any questions or would like to collaborate, feel free to reach out:
- **Email:** [sanand03072005@gmail.com](mailto:sanand03072005@gmail.com)
- **LinkedIn:** [Anand Sundaramoorthy](https://www.linkedin.com/in/anandsundaramoorthysa/)
- **GitHub:** [anandsundaramoorthysa](https://github.com/anandsundaramoorthysa)

## Acknowledgments
This project utilizes the following technologies and services:
- [IPQualityScore API](https://www.ipqualityscore.com/) - Fraud Detection API

