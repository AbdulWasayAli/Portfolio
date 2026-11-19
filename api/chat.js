// ========================================================
// Vercel Serverless Function: /api/chat
// Professional Gemini AI Chatbot Engine for Abdul Wasay Ali
// ========================================================

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Strict System Prompt Grounding — Only answers regarding Abdul Wasay Ali's portfolio
  const systemInstruction = `
You are the official AI Assistant Mascot on Abdul Wasay Ali's developer portfolio website.
Your name is "Wasay Bot" / "AI Companion".

PORTFOLIO & PERSONA KNOWLEDGE BASE:
- Full Name: Abdul Wasay Ali
- Profession: Software Engineer, Full-Stack Developer & Mobile App Developer based in Karachi, Pakistan.
- Current Role / Experience:
  * MERN Stack Intern at 10Pearls Pakistan (Nov 2026 – Present, Remote): Selected for the competitive 10Pearls Shine Internship Program 2026 (Cohort 10), specializing in Node.js, Express.js, React.js, and MongoDB.
- Education:
  * Diploma in Software Engineering: Aptech Computer Education, Shahrah-e-Faisal (2024 – 2027, Continuing)
  * Intermediate: Aptech Computer Education, Shahrah-e-Faisal · SBTE (Sindh Board of Technical Education) (2026 – 2027, Continuing)
  * Matriculation — Science Group (Biology): Dehli Government Boys Secondary School, Karachi (2020 – 2021)
- Core Tech Stack:
  * Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Responsive UI, Glassmorphism, 3D Canvas
  * Mobile: Flutter, Dart, Cross-platform Mobile Applications
  * Backend: Python, Flask, Node.js, Express.js, PHP, Laravel, C# / .NET, REST APIs
  * Data & Analytics: R Programming, MySQL, MongoDB, Firebase, SQL Server
  * Tools: Git, GitHub, VS Code, Postman, Vite
- Key Projects:
  1. Aquila Labs (High-performance web platform)
  2. EventEast (Event management and ticket booking ecosystem)
  3. Currency Converter Mobile Application (Flutter & Dart real-time finance app)
  4. Multiple full-stack and mobile applications on GitHub (https://github.com/AbdulWasayAli)
- Contact & Socials:
  * Email: wasay3105@gmail.com
  * Phone/WhatsApp: +92 3110214934
  * Location: Karachi, Pakistan
  * LinkedIn: https://www.linkedin.com/in/abdul-wasay-ali-295480256/
  * GitHub: https://github.com/AbdulWasayAli
- Availability: Open for full-time Software Engineering roles, contract/freelance work, and startup MVP development.

RULES & BOUNDARIES:
1. Greet politely if the user says hello, hi, salam, etc.
2. ONLY answer questions related to Abdul Wasay Ali, his skills, experience, projects, education, hiring, or contact info.
3. If the user asks general, out-of-scope, or irrelevant questions (e.g. general coding homework, politics, world trivia, math puzzles, recipes, unrelated chit-chat), politely decline and redirect them back to Wasay's portfolio:
   Example: "I am specifically tuned to help you explore Abdul Wasay's software engineering portfolio, skills, projects, and work opportunities. Feel free to ask about his tech stack or how to hire him!"
4. Keep answers concise, professional, friendly, and formatted neatly with bullet points when applicable.
`;

  // If no Gemini API key is configured yet, gracefully return a safe grounded response
  if (!apiKey) {
    const fallbackAnswer = generateLocalGroundedReply(message);
    return res.status(200).json({ reply: fallbackAnswer });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemInstruction}\n\nUser Question: "${message}"\nProvide a concise, helpful response adhering strictly to the rules:`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3, // Low temperature for high accuracy and sticking to facts
          maxOutputTokens: 350,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API call returned non-200:', response.status);
      const fallback = generateLocalGroundedReply(message);
      return res.status(200).json({ reply: fallback });
    }

    const data = await response.json();
    const botReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      generateLocalGroundedReply(message);

    return res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error invoking Gemini:', error);
    const fallback = generateLocalGroundedReply(message);
    return res.status(200).json({ reply: fallback });
  }
}

// Client-Side Grounded Guardrail Fallback
function generateLocalGroundedReply(input) {
  const q = input.toLowerCase().trim();

  // 1. Specific Query Checks First (Even if prefixed with Salam/Hi)
  const isGreetingPrefixed = q.match(/^(hi|hello|hey|salam|assalam|aoa|greetings)\b/);
  const greetingPrefix = isGreetingPrefixed ? "👋 Wa Alaikum Assalam / Hello!\n\n" : "";

  // Experience / Internship / Current Role / 10Pearls
  if (
    q.includes('intern') || 
    q.includes('10pearl') || 
    q.includes('role') || 
    q.includes('experience') || 
    q.includes('company') || 
    q.includes('organization') || 
    q.includes('shine') || 
    q.includes('kaam') || 
    q.includes('job')
  ) {
    return `${greetingPrefix}💼 **Abdul Wasay's Current Role & Experience:**\n• **MERN Stack Intern @ 10Pearls Pakistan** (Nov 2026 — Present, Remote)\n  Selected for the competitive **10Pearls Shine Internship Program 2026 (Cohort 10)**, building production-ready web platforms using **Node.js, Express.js, React.js, and MongoDB**.\n\nHe has a strong focus on clean code, RESTful API development, and responsive architectures.`;
  }

  // Education / Qualifications / Degrees
  if (
    q.includes('education') || 
    q.includes('study') || 
    q.includes('degree') || 
    q.includes('aptech') || 
    q.includes('diploma') || 
    q.includes('school') || 
    q.includes('matric') || 
    q.includes('intermediate') || 
    q.includes('sbte') || 
    q.includes('parhai')
  ) {
    return `${greetingPrefix}🎓 **Abdul Wasay's Education & Qualifications:**\n• **Diploma in Software Engineering:** Aptech Computer Education, Shahrah-e-Faisal (2024 — 2027, Continuing)\n• **Intermediate in Computer Science:** Aptech · SBTE (Sindh Board of Technical Education) (2026 — 2027, Continuing)\n• **Matriculation (Science):** Dehli Government Boys Secondary School, Karachi (2020 — 2021)`;
  }

  // Skills & Tech Stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework') || q.includes('mern') || q.includes('flutter') || q.includes('react')) {
    return `${greetingPrefix}Abdul Wasay specializes in **Full-Stack Web & Cross-Platform Mobile Engineering**:\n• **Frontend:** React.js, JavaScript (ES6+), HTML5, Modern CSS, Framer Motion\n• **Mobile Apps:** Flutter & Dart (iOS & Android)\n• **Backend & APIs:** Node.js (Express), Python (Flask), PHP (Laravel), C# / .NET\n• **Databases & Tools:** MongoDB, MySQL, Firebase, Git, GitHub, Vite\n\nExplore the interactive Skills section for full proficiencies!`;
  }

  // Hire / Availability
  if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('opportunity') || q.includes('contract')) {
    return `${greetingPrefix}✅ **Yes, absolutely!** Abdul Wasay is actively available for:\n• Full-time Software Engineering roles\n• High-impact Contract & Freelance projects\n• Startup MVP & Mobile App development\n\nReach him directly on WhatsApp at **+92 3110214934** or email **wasay3105@gmail.com**!`;
  }

  // Projects
  if (q.includes('project') || q.includes('app') || q.includes('build') || q.includes('portfolio') || q.includes('aquila') || q.includes('eventeast') || q.includes('currency')) {
    return `${greetingPrefix}Here are some of Wasay's notable engineering builds:\n• **Aquila Labs:** High-performance modern web ecosystem\n• **EventEast:** Comprehensive event management & ticket booking platform\n• **Currency Converter Mobile App:** Real-time cross-platform finance app built in Flutter & Dart\n\nCheck out the Projects section on this page to explore their full case studies!`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach') || q.includes('call') || q.includes('linkedin') || q.includes('github')) {
    return `${greetingPrefix}You can connect with Abdul Wasay directly:\n• 📧 **Email:** wasay3105@gmail.com\n• 📱 **WhatsApp:** +92 3110214934 (or click the green floating button)\n• 💼 **LinkedIn:** linkedin.com/in/abdul-wasay-ali-295480256/\n• 🐙 **GitHub:** github.com/AbdulWasayAli`;
  }

  // Standalone Greetings (Only when NO specific question is asked)
  if (isGreetingPrefixed || q.match(/^(hi|hello|hey|salam|assalam|aoa|greetings|morning|evening)/)) {
    return "👋 Wa Alaikum Assalam / Hello! I'm Wasay's AI Companion. I can guide you through his **10Pearls MERN Stack Internship**, **Flutter & Full-Stack Projects**, **Technical Skills**, or connect you directly with him. What would you like to explore?";
  }

  // Out of scope / Irrelevant
  return "I am designed specifically to assist you with Abdul Wasay Ali's software engineering portfolio, experience, skills, and projects. Please feel free to ask about his **10Pearls Internship**, **Tech Stack**, **Projects**, or how to hire him!";
}
