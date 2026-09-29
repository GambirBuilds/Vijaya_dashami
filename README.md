# 🪔 Bada Dashain — Vijaya Dashami Cultural Hub

<div align="center">

**A modern digital cultural hub for exploring, preserving, and celebrating Nepal's biggest festival — Bada Dashain. 🇳🇵**

</div>

<img width="1899" height="889" alt="image" src="https://github.com/user-attachments/assets/fe6db8ab-7405-49f4-800e-81bb07e89625" />

---

## 🌸 About The Project

**Bada Dashain — Vijaya Dashami Cultural Hub** is an interactive web application designed to bring the traditions, rituals, stories, food, memories, and celebrations of **Nepal's Bada Dashain festival** into one digital platform.

The project combines cultural information with modern web technologies to create an engaging experience where users can:

* 📅 Explore the **15-day Dashain calendar**
* 📜 Learn about the **history and cultural significance** of Dashain
* 📸 Share and manage **festival memories**
* 🍛 Explore **traditional Dashain recipes**
* 🙏 Discover **Dashain greetings and blessings**
* 📂 Organize memories into **shared folders**
* ⭐ Favorite important memories
* 📄 Export selected memories as **PDF reports**
* 📊 View **activity and audit logs**
* 📴 Use the application with **offline local caching**
* ✨ Enjoy festive animations and interactive elements

> **Goal:** Preserve Nepal's living cultural heritage through an accessible, interactive, and modern digital experience.

---

## ✨ Features

### 🗓️ 15-Day Dashain Calendar

Explore important events throughout the Dashain festival, including:

* Ghatasthapana
* Fulpati
* Maha Ashtami
* Maha Navami
* Vijaya Dashami
* Kojagrat Purnima
* Daily rituals and traditions
* Cultural significance
* Auspicious timings
* Traditional mantras

Each festival day contains detailed information about its rituals, significance, and traditions.

---

### 📖 Cultural History

Learn about the background and cultural importance of Bada Dashain through dedicated historical content.

The application focuses on presenting Dashain as a **living cultural tradition** rather than simply a holiday.

---

### 📸 Festival Photo Gallery

Users can create and manage digital memories from Dashain.

Gallery functionality includes:

* Upload festival memories
* Add captions and locations
* Categorize photos
* Like photos
* Favorite memories
* Track views
* Manage privacy levels
* Organize photos into folders

Privacy levels include:

```text
🌎 Public
👨‍👩‍👧 Family
🔒 Private
```

### 📂 Shared Memory Folders

Create organized collections of festival memories.

Folder features include:

* Folder creation
* Descriptions
* Ownership
* Access levels
* Password protection
* Expiration dates
* Contributor/viewer permissions

---

### 🍛 Festive Recipes

Explore traditional Dashain food and recipes with information such as:

* Nepali and English names
* Ingredients
* Preparation time
* Cooking time
* Servings
* Difficulty level
* Step-by-step instructions
* Cultural notes

Recipe categories include:

```text
Mains
Breads
Sides
Pickles
Desserts
```

### 🙏 Greetings & Blessings

Discover traditional Dashain greetings and blessings suitable for:

* Family members
* Elders
* Friends
* Colleagues
* General festive wishes

The section includes Nepali greetings along with their English meanings and cultural context.

---

### 📴 Offline Mode

The application includes an offline-mode simulation using browser local storage.

Users can continue interacting with stored content while offline.

Local persistence is used for:

* Photos
* Shared folders
* Activity logs
* Offline state
* Pending synchronization data

---

### 📊 Activity & Audit Logs

The application records important user interactions and system activities.

Activity records can include:

* Uploads
* Privacy changes
* Folder access
* Sharing
* Exports
* General interactions

Activity logs can also be exported for record keeping.

---

### 📄 PDF Export

Users can generate PDF reports from selected festival memories.

Generated reports can contain:

* Selected memories
* Contributors
* Locations
* Dates
* Categories
* Likes
* Views
* Privacy information

The application also supports **activity log PDF exports**.

---

### 🔍 Global Search

The built-in search interface allows users to quickly find:

* Festival events
* Recipes
* Photos
* Cultural content

---

### 🌼 Festive Interactions

The interface includes small interactive elements designed around the Dashain theme, including:

* Marigold/petal animations
* Festive confetti
* Smooth navigation
* Responsive mobile navigation
* Interactive cards
* Festival-themed visual styling

---

## 🛠️ Tech Stack

| Technology                | Purpose                        |
| ------------------------- | ------------------------------ |
| **React 19**              | Frontend UI                    |
| **TypeScript**            | Type-safe development          |
| **Vite**                  | Development & build tooling    |
| **Tailwind CSS**          | Styling and responsive UI      |
| **Lucide React**          | Interface icons                |
| **Motion**                | UI animations                  |
| **Canvas Confetti**       | Festival effects               |
| **jsPDF**                 | PDF generation                 |
| **LocalStorage**          | Client-side data persistence   |
| **Google Gemini / GenAI** | AI-related integration support |

---

## 📁 Project Structure

```text
bada-dashain-vijaya-dashami/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── dashain_hero_celebration.jpg
│   │       ├── dashain_tika_jamara_ritual.jpg
│   │       ├── dashain_festive_feast_thali.jpg
│   │       └── dashain_linge_ping_swing.jpg
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchModal.tsx
│   │   ├── CountdownBanner.tsx
│   │   ├── CalendarSection.tsx
│   │   ├── HistorySection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── UploadModal.tsx
│   │   ├── SharedFoldersModal.tsx
│   │   ├── RecipesSection.tsx
│   │   ├── GreetingsSection.tsx
│   │   ├── ActivityLogSection.tsx
│   │   └── Footer.tsx
│   │
│   ├── data/
│   │   └── festivalData.ts
│   │
│   ├── utils/
│   │   ├── storage.ts
│   │   └── pdfExport.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Move into the project directory:

```bash
cd YOUR-REPOSITORY
```

---

### 2. Install dependencies

Make sure you have **Node.js** installed.

Then run:

```bash
npm install
```

---

### 3. Configure environment variables

If your project requires Gemini API functionality, create a `.env.local` file in the project root.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

> Never upload your real API key to GitHub.

The `.env.local` file should remain inside `.gitignore`.

---

### 4. Start the development server

Run:

```bash
npm run dev
```

Vite will start the development server.

Open the local URL shown in your terminal, usually:

```text
http://localhost:3000
```

---

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

To check TypeScript:

```bash
npm run lint
```

---

## 💾 Data Storage

This project currently uses **browser LocalStorage** for client-side persistence.

The application stores information such as:

```text
Photos
Shared Folders
Activity Logs
Offline State
Pending Sync State
```

This means the project can demonstrate persistent functionality without requiring a separate database.

> **Note:** The current offline/synchronization system is a client-side implementation and does not represent a production cloud synchronization backend.

---

## 🔐 Privacy & Security

The application includes privacy concepts such as:

* Public memories
* Family-only memories
* Private memories
* Shared folder permissions
* Password-protected folders
* Activity tracking

However, this project is primarily a **frontend demonstration**. LocalStorage should not be treated as secure storage for sensitive or confidential information in a production environment.

---

## 🎨 Design Philosophy

The interface uses a visual language inspired by the colors and atmosphere of Dashain:

```text
🟥 Vermilion Red
🟧 Marigold Orange
🟨 Golden Yellow
🤍 Warm Traditional Backgrounds
```

The design aims to combine:

**Traditional Nepalese culture + Modern Web Design**

The interface is designed to feel:

* Warm
* Festive
* Cultural
* Clean
* Interactive
* Responsive

---

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The navigation automatically adapts for smaller screens using a mobile menu.

---

## 🌏 Cultural Focus

Dashain is one of Nepal's most important festivals and is celebrated through family gatherings, blessings, worship, food, travel, traditions, and community activities.

This project attempts to digitally preserve some of these experiences through:

**Knowledge → Memories → Recipes → Greetings → Community**

The purpose is not only to display information but also to create a digital space where cultural memories can be organized and preserved.

---

## 🔮 Future Improvements

Possible future versions could include:

* ☁️ Real cloud synchronization
* 👤 User authentication
* 🗄️ PostgreSQL / Firebase database
* 📱 Progressive Web App support
* 🔔 Festival notifications
* 🗺️ Dashain celebration map across Nepal
* 👨‍👩‍👧 Real family sharing
* 🤖 AI-powered cultural assistant
* 🌐 Nepali / English language switching
* 🎵 Traditional Dashain music and audio
* 📸 Cloud photo storage
* 🔐 Backend-based authentication and access control
* 📊 Advanced analytics dashboard
  
---

## 📚 Learning Outcomes

This project demonstrates practical experience with:

* React component development
* TypeScript interfaces and types
* State management
* LocalStorage
* Responsive web design
* Reusable components
* Modal interfaces
* Client-side data handling
* PDF generation
* UI animations
* File/image handling
* Search functionality
* Frontend architecture
* Vite development workflow

---

## 📜 License

This project is created for **educational and cultural demonstration purposes**.

You are welcome to study and improve the source code.

---

<div align="center">

### 🪔 जय दशैं! 🇳🇵

**Preserving Heritage. Sharing Memories. Celebrating Dashain.**

⭐ If you find this project interesting, consider giving the repository a star!

</div>
