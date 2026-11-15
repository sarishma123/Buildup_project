# 🛡️ Safe Sadak — Women's Safety Platform

**Safe Sadak** is a bilingual women's safety web application designed to help women navigate public spaces more safely in Nepal.

The platform provides access to safety resources, emergency contacts, community-based unsafe-area reporting, and location-based SOS message preparation. It aims to make essential safety information more accessible through a simple, responsive, and user-friendly interface.

> **Note:** Safe Sadak is an educational frontend project. It does not replace official emergency services or guarantee personal safety.

## ✨ Features

- **Bilingual Interface:** Switch between English and Nepali.
- **Interactive Safety Map:** Explore reported unsafe areas in Kathmandu using OpenStreetMap.
- **Unsafe Area Reporting:** Submit reports about locations that may pose safety concerns.
- **SOS Assistance:** Prepare an emergency message with your current location.
- **Emergency Call Shortcut:** Quickly access emergency calling options.
- **Emergency Contacts:** Save an emergency contact locally on your device.
- **Voice-Activated SOS:** Trigger an SOS countdown using voice recognition where browser support is available.
- **Helpline Directory:** Access important women's support and emergency helpline information.
- **Safety Resources:** Explore women's rights information and practical safety tips.
- **Responsive Design:** Access the platform across desktop, tablet, and mobile devices.
- **Accessibility:** Designed with usability and accessibility considerations in mind.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Development server and build tool |
| JavaScript | Application functionality |
| React Leaflet | Interactive map integration |
| Leaflet | Map rendering |
| OpenStreetMap | Map data and geographic information |
| CSS | Styling and responsive layouts |

## 🚀 Getting Started

Follow these steps to run Safe Sadak locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- npm (included with Node.js)
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/sarishma123/Buildup_project.git
```

**2. Navigate to the project directory**

```bash
cd Buildup_project
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 📁 Project Structure

```text
SafeSadak/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The structure above is illustrative. Adjust it to match the actual repository.*

## 🔐 Privacy & Safety Considerations

Safe Sadak is designed with user privacy and responsible safety practices in mind.

- Emergency contacts are stored locally on the user's device.
- Location access requires browser permission.
- SOS messages are prepared for the user rather than automatically sent.
- Voice recognition depends on browser and device support.
- Location and reporting features should be tested before relying on them.

## ⚠️ Important Disclaimer

Safe Sadak is an educational project and is not an officially affiliated emergency response service.

- Reported unsafe areas may not be independently verified.
- Map information may not always be accurate or up to date.
- SOS functionality does not guarantee message delivery or emergency assistance.
- Users should contact official emergency services when immediate assistance is required.

## 🎯 Project Objective

The objective of Safe Sadak is to explore how web technologies, interactive maps, location-based features, and accessible information can contribute to women's safety awareness in Nepal.

## 👩‍💻 Developer

Developed as an educational project to explore frontend development and technology-driven approaches to social challenges.

---

**Built with the goal of making public spaces safer through accessible technology.** 💜