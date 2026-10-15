# Abdul Wasay Ali — Full-Stack & Mobile Developer Portfolio

A modern, high-performance, and responsive personal portfolio web application built with **React 19**, **Vite 8**, **React Router v7**, **Framer Motion**, and vanilla **CSS Modules**. Designed with cyber/glassmorphism aesthetics, fluid micro-interactions, an interactive ambient 3D companion robot, custom typography, dark/light theme switching, and an interactive Project Case Study modal system.

---

## 🌐 Live Demo & Repository
- **GitHub Repository:** [https://github.com/AbdulWasayAli/Portfolio](https://github.com/AbdulWasayAli/Portfolio)
- **Developer:** Abdul Wasay Ali ([@AbdulWasayAli](https://github.com/AbdulWasayAli))
- **Live Deployment:** Ready for Vercel / GitHub Pages / Netlify

---

## 🚀 Key Features & Highlights

- **⚡ Blazing Fast Build & HMR:** Powered by Vite 8 with `@vitejs/plugin-react` and React 19 for instantaneous hot module replacement.
- **🎨 Cyber & Glassmorphic Design System:** Custom-crafted design with HSL color tokens, dark/light theme variables, glowing neon accents, and backdrop-blur glass cards.
- **🔬 Interactive Project Case Study Modal (`ProjectModal`):**
  - Animated popups powered by **Framer Motion** with backdrop blur and smooth spring physics.
  - Deep-dive architectural breakdown, key feature checklists, and live tech tags.
  - Responsive visual showcase gallery with screenshot previews and animated coming soon indicators.
  - Keyboard accessibility (ESC to close), auto-scroll reset, and background scroll locking.
- **🛡️ Glassmorphic Quick-Contact Hub (`Contact`):**
  - High-fidelity SVG icons for Email, Phone/WhatsApp, and Location.
  - One-click clipboard copy buttons with instant feedback badges.
  - Live availability status beacons ("OPEN FOR WORK").
  - Integrated contact message form with automated FormSubmit backend integration.
- **⚡ Categorized Skill Matrix (`Skills`):**
  - Custom SVG category badges for Frontend, Backend, Mobile, and Tools & DevOps.
  - Dynamic skill count indicators and neon glass cards.
  - Visual percentage mastery progress bars with stagger scroll reveals.
- **🤖 Interactive Ambient 3D Cyber Companion (`FloatingRobot`):** Pure interactive 3D robot that responds dynamically to mouse coordinate tracking and pupil navigation with reactive hovering states.
- **📱 Responsive Mobile Apps Showcase:** Dedicated mobile showcase preserving portrait device aspect ratios with badges for Flutter and Firebase apps.
- **🎯 Dynamic Typing Animation Hook:** Zero-dependency custom typewriter hook cycling through software engineering titles smoothly.
- **📊 Real-Time Scroll Progress & Reveal Animations:** Intersection Observer powered viewport animations (`reveal`, `reveal-left`, `reveal-right`, `reveal-scale`) and top progress bar.
- **📄 In-Browser Resume Modal & One-Click Download:** Live PDF modal previewer allowing users to view or instantly download `resume.pdf`.
- **🌓 Global Dark / Light Theme:** Context-driven theme switcher with local storage persistence and CSS root class toggles.
- **💬 Floating Controls:** Quick WhatsApp Chat trigger (`+92 3110214934`) and smooth scroll-to-top button with active scroll threshold.
- **🧭 Centralized Data Architecture:** 100% data-driven configuration in `src/data/portfolioData.js` managing personal details, experience, skills, projects, and social handles.
- **🚀 High Quality Code & Linting:** Integrated with **Oxlint** for ultra-fast, modern JavaScript/React linting.

---

## 🛠️ Complete Tech Stack & Tools

### Frontend & Core
| Technology | Version / Spec | Purpose |
|---|---|---|
| **React** | `^19.2.7` | UI library for component architecture |
| **React DOM** | `^19.2.7` | DOM rendering layer |
| **Vite** | `^8.1.1` | Next-gen frontend tooling and bundler |
| **React Router DOM** | `^7.18.1` | Client-side routing and 404 page management |
| **Framer Motion** | `^12.42.2` | Fluid modal animations, spring physics & layout transitions |
| **CSS Modules & Vanilla CSS** | W3C Standard | Scoped, zero-runtime overhead component styling |
| **Oxlint** | `^1.71.0` | High-speed JavaScript & JSX code linter |

### UI, Motion & 3D
| Library / Tool | Version | Usage |
|---|---|---|
| **Framer Motion** | `^12.42.2` | Spring physics, entrance/exit modals & card tilts |
| **@splinetool/react-spline** | `^4.1.0` | 3D scene integration for React |
| **@splinetool/runtime** | `^1.12.98` | Spline 3D web runtime engine |
| **Google Fonts (Outfit / Inter / JetBrains Mono)** | CDN / Web | Clean typography and code styling |

### Developer's Core Engineering Skills (Featured in Portfolio)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap 5.
- **Backend & APIs:** Node.js, Express.js, PHP, Laravel, C# / ASP.NET Core, REST APIs.
- **Databases:** MySQL, Microsoft SQL Server, MongoDB, Firebase Firestore / Realtime DB.
- **Mobile Development:** Flutter, Dart, Firebase, Cross-Platform Android/iOS architectures.
- **Tools & Workflow:** Git, GitHub, Figma, Postman, Vite, VS Code.

---

## 📂 Projects Featured in Portfolio

All projects are loaded directly from `src/data/portfolioData.js` and feature interactive case study modals:

1. **EventEase** *(Mobile)*
   - **Stack:** Flutter, Dart, Firebase, Role-Based Auth
   - **Highlights:** Full-lifecycle event management system with Attendee, Organizer, and Admin portals.
   - **Repo:** [github.com/AbdulWasayAli/EventEast](https://github.com/AbdulWasayAli/EventEast)

2. **CurrenSee** *(Mobile)*
   - **Stack:** Flutter, Dart, REST API, State Management
   - **Highlights:** Real-time multi-currency converter, exchange rate trends, alerts, and gold-themed dark UI.
   - **Repo:** [github.com/AbdulWasayAli/Currency-Mobile-Application](https://github.com/AbdulWasayAli/Currency-Mobile-Application)

3. **SwiftShip — Courier Management System** *(Full-Stack Web)*
   - **Stack:** PHP, MySQL, JavaScript, Bootstrap, CRUD Workflows
   - **Highlights:** Logistics platform with shipment dispatch, tracking numbers, multi-branch agents, and role authentication.
   - **Repo:** [github.com/AbdulWasayAli/Courier-Management-System](https://github.com/AbdulWasayAli/Courier-Management-System)

4. **E-Greetings — Digital Cards Platform** *(Full-Stack Web)*
   - **Stack:** ASP.NET Core MVC, C#, EF Core, SQL Server, SMTP
   - **Highlights:** Greeting cards portal with automated scheduled SMTP email delivery, Pro subscription tiers, and admin reports.
   - **Repo:** [github.com/AbdulWasayAli/Greetings-Project](https://github.com/AbdulWasayAli/Greetings-Project)

5. **ElectroShop — E-Commerce Platform** *(Frontend)*
   - **Stack:** JavaScript (ES6), HTML5, CSS3, Bootstrap, AOS, LocalStorage
   - **Highlights:** Interactive category filtering, client-side cart logic, form-validated checkout, and printable PDF invoices.
   - **Repo:** [github.com/AbdulWasayAli/Electronic-Store](https://github.com/AbdulWasayAli/Electronic-Store)

6. **Historical Places Explorer** *(Frontend / Design)*
   - **Stack:** HTML5, CSS3, Bootstrap 5, Responsive Design
   - **Highlights:** Cultural tourism showcase categorized by geographic regions with rich visual storytelling.
   - **Repo:** [github.com/AbdulWasayAli/Historical-Places](https://github.com/AbdulWasayAli/Historical-Places)

7. **Watch Store** *(Frontend / Design)*
   - **Stack:** HTML5, CSS3, Bootstrap
   - **Highlights:** Elegant modern product showcase for luxury watches featuring smooth transitions and responsive layouts.

---

## 📁 Project Architecture & Directory Structure

```bash
portfolio-react/
├── public/
│   ├── images/
│   │   ├── projects/            # Project showcase screenshots & banners
│   │   └── profile/             # Developer portrait & avatar images
│   ├── favicon.svg              # Custom cyber SVG favicon
│   ├── icons.svg                # Vector SVG sprite sheet
│   └── resume.pdf               # Curriculum Vitae (PDF)
├── src/
│   ├── assets/                  # Static design vectors and assets
│   ├── components/
│   │   ├── About/               # Bio paragraphs, achievements counter & profile visual
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Contact/             # Glassmorphic contact cards, 1-click copy & message form
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.module.css
│   │   ├── CustomCursor/        # Interactive cyber glow cursor trail
│   │   │   ├── CustomCursor.jsx
│   │   │   └── CustomCursor.module.css
│   │   ├── Experience/          # Educational background & certifications timeline
│   │   │   ├── Experience.jsx
│   │   │   └── Experience.module.css
│   │   ├── FloatingControls.jsx # Quick WhatsApp chat & scroll-to-top floating buttons
│   │   ├── FloatingControls.module.css
│   │   ├── FloatingRobot/       # Interactive 3D mouse-tracking ambient companion robot
│   │   │   ├── FloatingRobot.jsx
│   │   │   └── FloatingRobot.module.css
│   │   ├── Footer/              # Social badges, quick navigation links & dynamic branding
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   ├── Hero/                # Dynamic typewriter headline, quick CTAs & resume modal
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.module.css
│   │   ├── Navbar/              # Sticky navigation, mobile drawer & theme switcher
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ThemeToggle.module.css
│   │   ├── Projects/            # Project grid, filter tabs & interactive case study modal
│   │   │   ├── Projects.jsx
│   │   │   ├── Projects.module.css
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectModal.jsx        # Framer Motion case-study popup modal
│   │   │   └── ProjectModal.module.css # Cyber modal styles & gallery showcase
│   │   ├── Skills/              # Categorized skills matrix with tailored SVG badges
│   │   │   ├── Skills.jsx
│   │   │   ├── Skills.module.css
│   │   │   └── TechIcons.jsx
│   │   ├── SplashScreen/        # Initial branded loading intro screen
│   │   │   ├── SplashScreen.jsx
│   │   │   └── SplashScreen.module.css
│   │   └── Testimonials/        # Client reviews & endorsements carousel
│   │       ├── Testimonials.jsx
│   │       └── Testimonials.module.css
│   ├── context/
│   │   └── ThemeContext.jsx     # Global dark/light theme state provider
│   ├── data/
│   │   └── portfolioData.js     # Single Source of Truth (Bio, Skills, Projects, Links, Contacts)
│   ├── hooks/
│   │   └── useScrollReveal.js   # IntersectionObserver-based scroll animation hook
│   ├── pages/
│   │   ├── NotFound.jsx         # 404 error page with navigation back home
│   │   └── NotFound.module.css
│   ├── services/                # API or external messaging services
│   ├── styles/
│   │   ├── globals.css          # CSS resets, utility animations & custom scrollbar
│   │   └── variables.css        # Color tokens, glassmorphic variables & theme radii
│   ├── utils/
│   │   └── soundFx.js           # Audio utilities and sound synthesis helpers
│   ├── App.jsx                  # Main view layout, routes, scroll reveal & progress bar
│   ├── App.css                  # App wrapper styles
│   ├── main.jsx                 # React 19 application entry point
│   └── index.css                # Base stylesheet
├── .oxlintrc.json               # Oxlint configuration
├── package.json                 # Dependencies & run scripts
├── vite.config.js               # Vite build configurations
└── README.md                    # Comprehensive documentation
```

---

## 🚀 Getting Started (Run Locally)

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### 2. Clone & Install
```bash
# Clone the repository
git clone https://github.com/AbdulWasayAli/Portfolio.git

# Navigate into project directory
cd Portfolio

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, minified production build inside the `dist/` directory.

### 5. Run Lint Check
```bash
npm run lint
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Theme & Customization Guide

- **Updating Portfolio Data:** All bio information, skills, social media links, projects, and case-study architectures can be modified in:
  [`src/data/portfolioData.js`](file:///d:/portfolio-react/src/data/portfolioData.js)
- **Changing Colors & Styling:** Update CSS variables in:
  [`src/styles/variables.css`](file:///d:/portfolio-react/src/styles/variables.css)
- **Updating Resume:** Replace the file located at:
  [`public/resume.pdf`](file:///d:/portfolio-react/public/resume.pdf)

---

## 📬 Contact & Connect

- **Developer:** Abdul Wasay Ali
- **Email:** [wasay3105@gmail.com](mailto:wasay3105@gmail.com)
- **Phone / WhatsApp:** [+92 3110214934](https://wa.me/923110214934)
- **Location:** C Area, Liaquatabad, Karachi, Pakistan
- **LinkedIn:** [Abdul Wasay Ali](https://www.linkedin.com/in/abdul-wasay-ali-295480256/)
- **GitHub:** [@AbdulWasayAli](https://github.com/AbdulWasayAli)
- **Twitter (X):** [@AbdulWasayAli09](https://x.com/AbdulWasayAli09)
- **Instagram:** [@abdulwasayali09](https://www.instagram.com/abdulwasayali09)

---

⭐ *If you find this project inspiring, please leave a star on [GitHub](https://github.com/AbdulWasayAli/Portfolio)!*
