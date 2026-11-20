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
Your name is "Wasay AI" / "Wasay Bot".

LANGUAGE & COMMUNICATION RULES (CRITICAL):
1. MATCH THE USER'S LANGUAGE EXACTLY:
   - If the user greets or speaks in English (e.g. "hello", "hi", "hey", "what are your skills?"): Respond in fluent, polite, professional ENGLISH.
     Do NOT say "Wa Alaikum Assalam" unless the user explicitly said "Salam" or "Assalam o Alaikum". For "hello", say "Hello!" or "Hi there!".
   - If the user speaks in Urdu or Roman Urdu (e.g. "kya haal hai", "salam", "wasay kya karta hai", "internship kahan ki hai"): Respond naturally in polite, friendly ROMAN URDU.
2. ACCURATE & GROUNDED ANSWERS:
   - Always provide direct, accurate answers grounded in Wasay's profile.
   - Keep answers clean, concise, and structured with bullets when answering complex queries.

PORTFOLIO & PERSONA KNOWLEDGE BASE:
- Full Name: Abdul Wasay Ali
- Profession: Software Engineer, Full-Stack Developer & Mobile App Developer based in Karachi, Pakistan.
- Current Role / Experience:
  * MERN Stack Intern at 10Pearls Pakistan (Nov 2026 – Present, Remote): Selected for the competitive 10Pearls Shine Internship Program 2026 (Cohort 10), specializing in Node.js, Express.js, React.js, and MongoDB.
- Education:
  * Diploma in Software Engineering: Aptech Computer Education, Shahrah-e-Faisal (2024 – 2027, Continuing)
  * Intermediate in Computer Science: Aptech · SBTE (Sindh Board of Technical Education) (2026 – 2027, Continuing)
  * Matriculation — Science Group: Dehli Government Boys Secondary School, Karachi (2020 – 2021)
- Core Tech Stack:
  * Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Responsive UI, Framer Motion
  * Mobile: Flutter & Dart (Cross-platform iOS & Android mobile apps)
  * Backend: Node.js, Express.js, Python, Flask, PHP, Laravel, C# / .NET, RESTful APIs
  * Databases: MongoDB, MySQL, Firebase, SQL Server
  * Tools: Git, GitHub, VS Code, Postman, Vite
- Key Projects:
  1. Watch Store (Luxury horology showcase website built with HTML5, CSS3, Bootstrap)
  2. Historical Places Explorer (Tourism & cultural exploration platform)
  3. ElectroShop E-Commerce Platform (Front-end e-commerce with cart, dynamic checkout, PDF bill generation)
  4. EventEast (Event management and ticketing platform)
  5. Currency Converter Mobile Application (Flutter & Dart real-time finance app)
- Contact & Socials:
  * Email: wasay3105@gmail.com
  * Phone/WhatsApp: +92 3110214934
  * Location: Karachi, Pakistan
  * LinkedIn: https://www.linkedin.com/in/abdul-wasay-ali-295480256/
  * GitHub: https://github.com/AbdulWasayAli
- Availability: Open for full-time Software Engineering roles, contract/freelance work, and startup MVP development.

BOUNDARIES:
- ONLY answer questions about Abdul Wasay Ali, his skills, experience, projects, education, hiring, or contact info.
- If asked unrelated questions (politics, cooking, general coding homework, random trivia), politely redirect back to Wasay's portfolio.
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

  // Detect Roman Urdu / Urdu intent
  const isUrdu = q.match(/\b(kya|kaun|kahan|kaise|hai|hain|batao|batayein|salam|assalam|aoa|kuch|chahiye|shukriya|theek|acha)\b/i);
  const isSalam = q.match(/\b(salam|assalam|aoa)\b/i);
  const isEnglishHello = q.match(/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening))\b/i);

  // Greeting prefix builder
  let greetingPrefix = "";
  if (isSalam) {
    greetingPrefix = "👋 Wa Alaikum Assalam!\n\n";
  } else if (isEnglishHello) {
    greetingPrefix = "👋 Hello! ";
  }

  // 1. Experience / Internship / Current Role / 10Pearls
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
    if (isUrdu) {
      return `${greetingPrefix}💼 **Abdul Wasay ka Current Role aur Experience:**\n• **MERN Stack Intern @ 10Pearls Pakistan** (Nov 2026 — Present, Remote)\n  Wasay 10Pearls ke prestigious **Shine Internship Program (Cohort 10)** ka hissa hain, jahan wo **Node.js, Express.js, React.js, aur MongoDB** ke zariye scalable web applications develop kar rahe hain.`;
    }
    return `${greetingPrefix}💼 **Abdul Wasay's Current Role & Experience:**\n• **MERN Stack Intern @ 10Pearls Pakistan** (Nov 2026 — Present, Remote)\n  Selected for the competitive **10Pearls Shine Internship Program 2026 (Cohort 10)**, building production-grade web platforms using **Node.js, Express.js, React.js, and MongoDB**.\n\nHe specializes in clean RESTful API design, database schemas, and responsive full-stack architectures.`;
  }

  // 2. Education / Qualifications
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
    if (isUrdu) {
      return `${greetingPrefix}🎓 **Abdul Wasay ki Education:**\n• **Diploma in Software Engineering:** Aptech Computer Education, Shahrah-e-Faisal (2024 — 2027, Continuing)\n• **Intermediate in Computer Science:** Aptech · SBTE (2026 — 2027, Continuing)\n• **Matriculation (Science):** Dehli Government Boys Secondary School, Karachi (2020 — 2021)`;
    }
    return `${greetingPrefix}🎓 **Abdul Wasay's Education & Qualifications:**\n• **Diploma in Software Engineering:** Aptech Computer Education, Shahrah-e-Faisal (2024 — 2027, Continuing)\n• **Intermediate in Computer Science:** Aptech · SBTE (Sindh Board of Technical Education) (2026 — 2027, Continuing)\n• **Matriculation (Science):** Dehli Government Boys Secondary School, Karachi (2020 — 2021)`;
  }

  // 3. Skills & Tech Stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework') || q.includes('mern') || q.includes('flutter') || q.includes('react') || q.includes('hunar')) {
    if (isUrdu) {
      return `${greetingPrefix}Abdul Wasay **Full-Stack Web aur Mobile App Development** ke specialist hain:\n• **Mobile Apps:** Flutter & Dart (Cross-Platform iOS & Android)\n• **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Framer Motion\n• **Backend & APIs:** Node.js (Express), Python (Flask), PHP (Laravel), C# / .NET\n• **Databases & Tools:** MongoDB, MySQL, Firebase, Git & GitHub, Vite`;
    }
    return `${greetingPrefix}Abdul Wasay specializes in **Full-Stack Web & Cross-Platform Mobile Engineering**:\n• **Mobile Apps:** Flutter & Dart (iOS & Android)\n• **Frontend:** React.js, JavaScript (ES6+), HTML5, Modern CSS, Framer Motion\n• **Backend & APIs:** Node.js (Express), Python (Flask), PHP (Laravel), C# / .NET\n• **Databases & Tools:** MongoDB, MySQL, Firebase, Git, GitHub, Vite`;
  }

  // 4. Hire / Availability
  if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('opportunity') || q.includes('contract')) {
    if (isUrdu) {
      return `${greetingPrefix}✅ **G bilkul!** Abdul Wasay actively available hain:\n• Full-time Software Engineering roles\n• Freelance aur Contract projects\n• Startup MVP aur Mobile Apps development\n\nAap direct WhatsApp par baat kar sakte hain: **+92 3110214934** ya email karein **wasay3105@gmail.com**!`;
    }
    return `${greetingPrefix}✅ **Yes, absolutely!** Abdul Wasay is actively available for:\n• Full-time Software Engineering roles\n• High-impact Contract & Freelance projects\n• Startup MVP & Mobile App development\n\nReach him directly on WhatsApp at **+92 3110214934** or email **wasay3105@gmail.com**!`;
  }

  // 5. Projects
  if (q.includes('project') || q.includes('app') || q.includes('build') || q.includes('portfolio') || q.includes('watch') || q.includes('electro') || q.includes('currency')) {
    if (isUrdu) {
      return `${greetingPrefix}Wasay ke kuch featured projects yeh hain:\n• **Watch Store:** Responsive luxury watch showcase (HTML5, CSS3, Bootstrap)\n• **Historical Places Explorer:** Interactive tourism exploration platform\n• **ElectroShop E-Commerce:** Dynamic cart, checkout aur PDF invoice generation\n• **Currency Converter Mobile App:** Flutter & Dart real-time finance tool\n\nAap Projects section mein inke live demos aur case studies dekh sakte hain!`;
    }
    return `${greetingPrefix}Here are some of Wasay's notable engineering builds:\n• **Watch Store:** Responsive luxury watch showcase (HTML5, CSS3, Bootstrap)\n• **Historical Places Explorer:** Interactive cultural tourism exploration platform\n• **ElectroShop E-Commerce:** Dynamic front-end store with cart and PDF invoice generator\n• **Currency Converter:** Real-time finance mobile app built in Flutter & Dart\n\nCheck out the Projects section on this page to explore their full details and code!`;
  }

  // 6. Contact
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach') || q.includes('call') || q.includes('linkedin') || q.includes('github') || q.includes('rabta')) {
    if (isUrdu) {
      return `${greetingPrefix}Aap Abdul Wasay se rabta kar sakte hain:\n• 📧 **Email:** wasay3105@gmail.com\n• 📱 **WhatsApp:** +92 3110214934\n• 💼 **LinkedIn:** linkedin.com/in/abdul-wasay-ali-295480256/\n• 🐙 **GitHub:** github.com/AbdulWasayAli`;
    }
    return `${greetingPrefix}You can connect with Abdul Wasay directly:\n• 📧 **Email:** wasay3105@gmail.com\n• 📱 **WhatsApp:** +92 3110214934 (or click the floating WhatsApp button)\n• 💼 **LinkedIn:** linkedin.com/in/abdul-wasay-ali-295480256/\n• 🐙 **GitHub:** github.com/AbdulWasayAli`;
  }

  // 7. Standalone Salam
  if (isSalam) {
    return "👋 Wa Alaikum Assalam! Main Wasay ka AI Assistant hoon. Main aapko Abdul Wasay ke **10Pearls MERN Stack Internship**, **Flutter & Web Projects**, **Tech Stack**, ya unse rabte ke baray mein guide kar sakta hoon. Aap kya janna chahte hain?";
  }

  // 8. Standalone English Greeting (Hello / Hi)
  if (isEnglishHello || q.match(/^(hi|hello|hey|greetings)/)) {
    return "👋 Hello! I'm Wasay's AI Assistant. I can help you explore his **10Pearls MERN Stack Internship**, **Flutter & Full-Stack Projects**, **Technical Skills**, or connect you directly with him. What would you like to know?";
  }

  // 9. Out of scope / Irrelevant
  if (isUrdu) {
    return "Main Abdul Wasay Ali ke portfolio, skills, 10Pearls internship aur projects ke baray mein help karne ke liye tayyar hoon. Aap Wasay ke kaam ya unhe hire karne ke baray mein kuch bhi pooch sakte hain!";
  }
  return "I am designed specifically to assist you with Abdul Wasay Ali's software engineering portfolio, experience, skills, and projects. Please feel free to ask about his **10Pearls Internship**, **Tech Stack**, **Projects**, or how to hire him!";
}
