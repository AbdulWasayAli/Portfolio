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
- Education: Diploma in Software Engineering at Aptech Computer Education (2023 - Present) & Intermediate (SBTE).
- Core Tech Stack:
  * Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Responsive UI, Glassmorphism, 3D Canvas
  * Mobile: Flutter, Dart, Cross-platform Mobile Applications
  * Backend: Node.js, Express.js, PHP, Laravel, C# / .NET, REST APIs
  * Databases: MongoDB, MySQL, Firebase, SQL Server
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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

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

  // Greetings
  if (q.match(/^(hi|hello|hey|salam|assalam|aoa|greetings)/)) {
    return "👋 Hello! I'm Wasay's AI Companion. How can I help you explore his software engineering portfolio, projects, or skills today?";
  }

  // Skills
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework')) {
    return "Abdul Wasay specializes in:\n• **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, Modern UI\n• **Mobile:** Flutter & Dart\n• **Backend:** Node.js, Express.js, PHP, Laravel, C# / .NET\n• **Databases:** MongoDB, MySQL, Firebase\n\nCheck out the Skills section for a detailed proficiency breakdown!";
  }

  // Hire / Availability
  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('freelance') || q.includes('work') || q.includes('role')) {
    return "✅ **Yes, absolutely!** Abdul Wasay is actively available for:\n• Full-time Software Engineering positions\n• Contract & Freelance projects\n• Startup MVP development\n\nReach him via WhatsApp (+92 3110214934) or email at wasay3105@gmail.com!";
  }

  // Projects
  if (q.includes('project') || q.includes('app') || q.includes('build') || q.includes('portfolio') || q.includes('aquila') || q.includes('eventeast')) {
    return "Here are Wasay's notable builds:\n• **Aquila Labs:** Modern web platform\n• **EventEast:** Full-scale event management & ticket booking system\n• **Currency Converter:** Real-time cross-platform mobile app in Flutter\n\nScroll to the Projects section to explore them!";
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach') || q.includes('call')) {
    return "You can connect with Abdul Wasay directly:\n• 📧 **Email:** wasay3105@gmail.com\n• 📱 **WhatsApp:** +92 3110214934 (or click the green floating button)\n• 💼 **LinkedIn:** linkedin.com/in/abdul-wasay-ali-295480256/\n• 🐙 **GitHub:** github.com/AbdulWasayAli";
  }

  // Out of scope / Irrelevant
  return "I am designed specifically to assist you with Abdul Wasay Ali's portfolio, experience, skills, and projects. Please feel free to ask about his tech stack, featured builds, or how to get in touch!";
}
