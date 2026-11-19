import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'local-api-chat-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const message = parsed.message || '';
                const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

                if (!apiKey) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ reply: "Local AI: GEMINI_API_KEY not found in .env. Please check key name." }));
                  return;
                }

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
  * Intermediate in Computer Science: Aptech · SBTE (Sindh Board of Technical Education) (2026 – 2027, Continuing)
  * Matriculation (Science): Dehli Government Boys Secondary School, Karachi (2020 – 2021)
- Core Tech Stack:
  * Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Responsive UI, Glassmorphism, 3D Canvas
  * Mobile: Flutter, Dart, Cross-platform Mobile Applications
  * Backend: Node.js, Express.js, Python, Flask, PHP, Laravel, C# / .NET, REST APIs
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
2. If the user asks about internship, current role, 10Pearls, work, job, or experience (in English or Roman Urdu): Highlight that Abdul Wasay is currently a MERN Stack Intern at 10Pearls Pakistan (Shine Internship Program Cohort 10, Nov 2026 - Present), working with Node.js, Express, React, and MongoDB.
3. If the user asks about education or studies: Mention his Diploma in Software Engineering at Aptech (2024-2027) and Intermediate SBTE.
4. ONLY answer questions related to Abdul Wasay Ali, his skills, experience, projects, education, hiring, or contact info.
5. If the user asks general or out-of-scope questions, politely redirect them back to Wasay's portfolio.
6. Keep answers concise, professional, friendly, and formatted neatly with bullet points when applicable.
`;

                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
                const apiRes = await fetch(url, {
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
                      temperature: 0.3,
                      maxOutputTokens: 350,
                    },
                  }),
                });

                const data = await apiRes.json();
                const botReply =
                  data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
                  "I'm here to help you explore Wasay's portfolio! Feel free to ask about his skills or projects.";

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: botReply }));
              } catch (err) {
                console.error("Local dev Gemini API error:", err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: "I am specifically tuned to help you explore Abdul Wasay's portfolio. Feel free to ask about his skills or projects!" }));
              }
            });
          });
        },
      },
    ],
  };
});

