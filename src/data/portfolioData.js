export const personalInfo = {
  name: "Abdul Wasay Ali",
  title: "Software Engineer",
  subtitle: "Mobile App Developer",
  email: "wasay3105@gmail.com",
  phone: "+92 3110214934",
  location: "C Area, Liaquatabad, Karachi",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/my-picture.jpeg",
  social: {
    github: "https://github.com/AbdulWasayAli",
    linkedin: "https://www.linkedin.com/in/abdul-wasay-ali-295480256/",
    twitter: "https://x.com/AbdulWasayAli09",
    instagram: "https://www.instagram.com/abdulwasayali09?igsh=MXd2bG00dzdmaDZyYw==",
    facebook: "https://www.facebook.com/share/16UkcssCFn/",
  },
};

export const heroData = {
  greeting: "Hi, I'm",
  name: "Abdul Wasay Ali",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Mobile App Developer",
  ],
  description:
    "Turning ideas into high-performance web & cross-platform mobile apps with clean code and intuitive design.",
  cta: {
    primary: "View My Work",
    secondary: "Download Resume",
  },
};

export const aboutData = {
  paragraphs: [
    "I'm a passionate Software Engineering student based in Karachi, Pakistan. Currently pursuing a Diploma in Software Engineering from Aptech, I have developed a strong passion for technology and real-world problem-solving.",
    "I have worked on multiple academic and personal projects that have strengthened my practical understanding of software development. I am always eager to learn, build projects, and collaborate with others.",
    "My goal is to become a skilled software engineer who contributes meaningfully to innovative and impactful technology solutions.",
  ],
  stats: [
    { value: "5+", label: "Projects Completed" },
    { value: "15+", label: "Skills Mastered" },
    { value: "2+", label: "Years Learning" },
  ],
};

export const experienceData = [
  {
    type: "education",
    title: "Diploma in Software Engineering",
    organization: "Aptech Computer Education",
    period: "2023 — Present",
    description:
      "Pursuing comprehensive software engineering diploma covering full-stack development, databases, mobile app development, and software design patterns.",
    icon: "🎓",
  },
  {
    type: "education",
    title: "Intermediate (SBTE)",
    organization: "Aptech Computer Education",
    period: "2023 — Present",
    description:
      "Continuing intermediate studies alongside the diploma program, building a strong foundation in computer science fundamentals.",
    icon: "📚",
  },
];

export const skillsData = {
  categories: [
    {
      title: "Frontend",
      icon: "💻",
      skills: [
        { name: "HTML5", level: 90, icon: "FaHtml5" },
        { name: "CSS3", level: 85, icon: "FaCss3Alt" },
        { name: "JavaScript", level: 80, icon: "FaJs" },
        { name: "Bootstrap", level: 85, icon: "FaBootstrap" },
        { name: "React.js", level: 70, icon: "FaReact" },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 80, icon: "FaNodeJs" },
        { name: "Express.js", level: 75, icon: "SiExpress" },
        { name: "PHP", level: 75, icon: "FaPhp" },
        { name: "Laravel", level: 70, icon: "FaLaravel" },
        { name: "C# / .NET", level: 70, icon: "SiDotnet" },
        { name: "MySQL", level: 75, icon: "SiMysql" },
        { name: "SQL Server", level: 70, icon: "SiMicrosoftsqlserver" },
        { name: "MongoDB", level: 65, icon: "SiMongodb" },
      ],
    },
    {
      title: "Mobile",
      icon: "📱",
      skills: [
        { name: "Dart", level: 75, icon: "SiDart" },
        { name: "Flutter", level: 75, icon: "SiFlutter" },
        { name: "Firebase", level: 70, icon: "SiFirebase" },
      ],
    },
    {
      title: "Tools & Others",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 80, icon: "FaGitAlt" },
        { name: "GitHub", level: 85, icon: "FaGithub" },
        { name: "Figma", level: 70, icon: "FaFigma" },
      ],
    },
  ],
};

export const projectsData = [
  {
    id: 1,
    title: "Watch Store",
    subtitle: "Luxury E-Commerce & Timepiece Showcase",
    description:
      "Responsive watch showcase website built with modern design principles, featuring product displays and smooth animations.",
    overview:
      "A high-end luxury timepiece showcase designed to provide an immersive retail experience. Focused on micro-interactions, responsive fluid grids, and sleek aesthetic visuals tailored for premium horology collectors.",
    image: "/images/watch.png",
    category: "design",
    tags: ["HTML", "CSS", "Bootstrap"],
    keyFeatures: [
      "Dynamic catalog showcasing luxury horology timepieces",
      "Interactive 3D product showcase view and hover zooms",
      "Fully responsive grid architecture adapted for mobile and desktop",
      "Smooth CSS transitions and custom typography layout"
    ],
    architecture: "Lightweight frontend built with semantic HTML5, modern modular CSS3 variables, and customized Bootstrap grid components.",
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Historical Places Explorer",
    subtitle: "Cultural Heritage & Tourism Portal",
    description:
      "A responsive tourism and cultural exploration website showcasing heritage landmarks categorized across regional zones with immersive visual layouts and modern typography.",
    overview:
      "An educational and tourism discovery portal dedicated to preserving and celebrating cultural heritage monuments. Features regional filtering, historical timelines, and curated architectural photo galleries.",
    image: "/images/historical.png",
    category: "design",
    tags: ["HTML5", "CSS3", "Bootstrap", "Responsive Design"],
    keyFeatures: [
      "Interactive regional taxonomy to explore landmarks by province/zone",
      "Detailed architectural background and heritage history summaries",
      "High-resolution visual galleries with optimized lazy loading",
      "Cross-browser fluid responsiveness and intuitive travel guide navigation"
    ],
    architecture: "Built with pure semantic HTML5, Bootstrap 5 responsive utility system, and custom CSS design tokens for timeless cultural aesthetic.",
    github: "https://github.com/AbdulWasayAli/Historical-Places",
    live: "#",
  },
  {
    id: 3,
    title: "ElectroShop — E-Commerce Platform",
    subtitle: "Modern Electronics Store with Client-Side Checkout",
    description:
      "Interactive front-end e-commerce web app featuring category-based product browsing, dynamic cart management, form validation checkout, PDF bill generation, and responsive AOS animations.",
    overview:
      "A feature-rich electronics e-commerce web application engineered with Vanilla JavaScript. Provides real-time cart state management, checkout validation, and client-side printable PDF invoices without requiring heavy frameworks.",
    image: "/images/eletronic.png",
    category: "design",
    tags: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "AOS", "Client-Side Cart"],
    keyFeatures: [
      "Live shopping cart with item quantity adjustments and instant total calculation",
      "Dynamic product filtering by categories, price range, and specs",
      "Automated client-side PDF invoice generation for completed orders",
      "Robust form input validation with user-friendly error indicators",
      "Scroll-triggered visual reveal animations powered by AOS"
    ],
    architecture: "Engineered using native ES6+ JavaScript modules, LocalStorage state persistence, jsPDF for invoice synthesis, and Bootstrap grid styling.",
    github: "https://github.com/AbdulWasayAli/Electronic-Store",
    live: "#",
  },
  {
    id: 4,
    title: "SwiftShip — Courier Management System",
    subtitle: "Enterprise Logistics & Tracking Suite",
    description:
      "Full-stack logistics and shipment management platform built with PHP & MySQL. Features end-to-end parcel tracking, multi-branch agent workflows, customer consignment management, and secure role-based portals.",
    overview:
      "A comprehensive enterprise shipment dispatch and logistics automation platform. Connects branch operators, delivery riders, and recipients through centralized parcel tracking, barcode tracking numbers, and automated status milestones.",
    image: "/images/courier.png",
    category: "development",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "CRUD"],
    keyFeatures: [
      "Real-time consignment status tracking via unique tracking numbers",
      "Role-based access control for Admins, Branch Agents, and Dispatch Riders",
      "Automated weight-based shipping rate calculator and receipt generation",
      "Interactive analytics dashboard tracking on-time delivery metrics",
      "Comprehensive CRUD parcel routing and branch-to-branch manifest logs"
    ],
    architecture: "Full-Stack MVC architecture using Object-Oriented PHP, normalized relational MySQL database schemas, secure prepared statements, and Bootstrap UI.",
    github: "https://github.com/AbdulWasayAli/Courier-Management-System",
    live: "#",
  },
  {
    id: 5,
    title: "E-Greetings — Digital Cards Platform",
    subtitle: "Custom Greetings & Automated Email Scheduling",
    description:
      "Enterprise greeting card web app built with ASP.NET Core MVC & EF Core. Features automated SMTP email delivery, Pro subscription tiers, role-based auth, and an analytics-driven admin reporting dashboard.",
    overview:
      "An automated digital greeting and card customization engine. Users can personalize cards for holidays and milestones, schedule delivery dates in advance, and deliver them directly to recipients via high-reliability SMTP mailing queues.",
    image: "/images/E-Greetings.png",
    category: "development",
    tags: ["ASP.NET Core", "C#", "EF Core", "SQL Server", "SMTP"],
    keyFeatures: [
      "Custom card designer with personalized typography and recipient dedications",
      "Automated background scheduling for scheduled birthday/holiday delivery",
      "Enterprise role management with ASP.NET Core Identity & Pro membership gates",
      "Secure SMTP email integration with HTML card previews",
      "Comprehensive Admin dashboard visualizing card delivery volume and top templates"
    ],
    architecture: "Architected on ASP.NET Core MVC, Entity Framework Core Code-First ORM, Microsoft SQL Server, and Dependency Injection services for SMTP.",
    github: "https://github.com/AbdulWasayAli/Greetings-Project",
    live: "#",
  },
  {
    id: 6,
    title: "EventEase",
    subtitle: "Complete Event Lifecycle Management App",
    description:
      "Full-featured event management mobile app built with Flutter and Firebase, delivering an end-to-end event lifecycle for Attendees, Organizers, and Administrators.",
    overview:
      "A cross-platform mobile application designed to simplify event hosting and ticketing. From discovering local hackathons and workshops to live attendee check-in and QR ticket validation, EventEase manages the entire event journey.",
    image: "/images/mobile1.jpeg",
    category: "mobile",
    tags: ["Flutter", "Dart", "Firebase", "Role-Based Auth"],
    keyFeatures: [
      "Multi-role user authentication supporting Attendees, Hosts, and Super-Admins",
      "Real-time event discovery with category filters, dates, and venue mapping",
      "Instant ticket booking with unique QR codes for on-site check-in",
      "Cloud Firestore real-time synchronization for attendee rosters and seats",
      "Push notifications keeping participants updated on schedule changes"
    ],
    architecture: "Developed with Flutter for cross-platform iOS & Android performance, Dart, Provider/Bloc state management, and Firebase Auth & Cloud Firestore.",
    github: "https://github.com/AbdulWasayAli/EventEast",
    live: "#",
  },
  {
    id: 7,
    title: "CurrenSee",
    subtitle: "Real-Time Multi-Currency Tracker & Converter",
    description:
      "A Flutter currency companion offering real-time exchange rates, instant conversion, rate alerts, market news, and user accounts in a sleek gold-themed UI with dark mode.",
    overview:
      "A sleek fintech mobile application providing travelers, traders, and businesses with instant currency conversion, historical rate trend charts, and customizable rate alerts in an ultra-luxurious gold and dark glass UI.",
    image: "/images/mobile2.jpeg",
    category: "mobile",
    tags: ["Flutter", "Dart", "REST API", "State Management"],
    keyFeatures: [
      "Live exchange rates for 160+ fiat currencies backed by high-frequency REST APIs",
      "Offline conversion mode with cached daily benchmark rates",
      "Historical rate charts and volatility indicators for major currency pairs",
      "Custom rate threshold alerts notifying users of favorable spikes",
      "Luxury dark mode theme with metallic gold accent design language"
    ],
    architecture: "Built with Flutter & Dart, HTTP client networking, local secure caching with Hive/Shared Preferences, and interactive charting libraries.",
    github: "https://github.com/AbdulWasayAli/Currency-Mobile-Application",
    live: "#",
  },
];



export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
