export const personalInfo = {
  name: "Abdul Wasay Ali",
  title: "Software Engineer",
  subtitle: "Mobile App Developer",
  email: "wasay3105@gmail.com",
  phone: "+92 3110214934",
  location: "House No. 14/15, C Area, Liaquatabad, Karachi",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/my-picture.jpeg",
  social: {
    github: "https://github.com/WasayAli3105",
    linkedin: "https://www.linkedin.com/in/abdul-wasay-ali-295480256/",
    twitter: "https://x.com/WasayAli1957728?t=2xm4HzrteL68q2AISbcDPQ&s=09",
    instagram: "https://www.instagram.com/abdulwasayali09?igsh=MXd2bG00dzdmaDZyYw==",
    facebook: "https://www.facebook.com/share/16UkcssCFn/",
  },
};

export const heroData = {
  greeting: "Hi, I'm",
  name: "Abdul Wasay Ali",
  roles: [
    "Software Engineer",
    "Mobile App Developer",
    "Front-End Developer",
    "Back-End Developer",
  ],
  description:
    "Specialized in creating modern websites & mobile applications with clean code and pixel-perfect designs.",
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
    description:
      "Responsive watch showcase website built with modern design principles, featuring product displays and smooth animations.",
    image: "/images/watch.png",
    category: "design",
    tags: ["HTML", "CSS", "Bootstrap"],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Historical Places",
    description:
      "Responsive website featuring famous landmarks and historical places with engaging layouts and interactive elements.",
    image: "/images/historical.png",
    category: "design",
    tags: ["HTML", "CSS", "Bootstrap"],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "Electronic Store",
    description:
      "Group project for an online electronics shop with dynamic product loading, cart functionality, and modern UI.",
    image: "/images/eletronic.png",
    category: "design",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "JSON"],
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "Courier Management",
    description:
      "Full-stack parcel tracking and admin management system with CRUD operations and status tracking.",
    image: "/images/courier.png",
    category: "development",
    tags: ["PHP", "MySQL", "Bootstrap"],
    github: "#",
    live: "#",
  },
  {
    id: 5,
    title: "E-Greetings",
    description:
      "Dynamic greeting cards platform with admin panel control, built using ASP.NET MVC architecture.",
    image: "/images/E-Greetings.png",
    category: "development",
    tags: [".NET", "C#", "SQL Server", "ASP.NET MVC"],
    github: "#",
    live: "#",
  },
  {
    id: 6,
    title: "Mobile App (Coming Soon)",
    description:
      "Cross-platform mobile application developed with Flutter and Firebase integration.",
    image: null,
    category: "mobile",
    tags: ["Flutter", "Dart", "Firebase", "REST API"],
    github: "#",
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
