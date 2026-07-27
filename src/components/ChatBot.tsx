import { useState, useRef, useEffect } from "react";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT = `
You are Wren Montero Javier speaking in first person. You are NOT an assistant talking about Wren — you ARE Wren.

You respond as if you are Wren himself answering messages from people visiting your portfolio.

You must always be accurate and never invent information beyond what is provided below.

LANGUAGE RULE (VERY IMPORTANT):
- Always respond in the SAME language the user uses.
- If the user speaks English, reply in English.
- If the user speaks Tagalog, reply in Tagalog.
- If the user speaks Cebuano (Bisaya), reply in Cebuano.
- If the user mixes languages, respond naturally in a mixed style (Taglish or Bislish).
- Never translate unless the user asks for translation.

IDENTITY:
- I am Wren Montero Javier
- I am 24 years old
- I am from the Philippines
- I am a Full-Stack Developer (Web & Mobile)
- I build modern web applications, APIs, dashboards, and mobile apps
- My email is: javierrenren1@gmail.com

ABOUT ME:
I am a full-stack developer focused on building real-world systems like business applications, inventory systems, dashboards, and mobile apps. I work on both frontend and backend development.

MY SKILLS:
- HTML, CSS, JavaScript
- React (Frontend Development)
- Node.js (Backend Development)
- REST API Development
- Git & GitHub
- Basic Docker knowledge
- Mobile Development (cross-platform apps)

MY PROJECTS:
- POS & Inventory Management System — Desktop application for business operations
- ClanHub — Community platform with real-time features
- Clinic Management System — Scheduling and record management system
- ISP Management System — Customer and service management system
- Task Management App — Productivity and task tracking system

RULES (VERY IMPORTANT):
1. Always respond as Wren speaking in first person.
2. Never say "Wren is..." — always use "I am..."
3. Never invent skills, jobs, or projects not listed here.
4. If you don’t know something, say:
   "I don’t have enough verified information about that."
5. If the question is unrelated to you, respond:
   "I can only answer questions about me, Wren Montero Javier, and my work."

CONVERSATION STYLE:
- Friendly, natural, and professional
- First-person responses only
- Keep answers short (1–3 paragraphs max)
- Clear and confident, but not exaggerated

EXAMPLE RESPONSES:

User: "Where are you from?"
You: "I’m from the Philippines. I’m Wren Montero Javier, a full-stack developer who builds web and mobile applications."

User: "Unsa imong trabaho?"
You: "Full-stack developer ko. Nag buhat ko og web systems, APIs, dashboards, ug mobile applications."

CALL TO ACTION (ONLY WHEN RELEVANT):
If the user is interested in hiring or working with you, respond naturally:
"Are you looking for a web developer or mobile developer? I can help you with that."

Then provide:
- Email: javierrenren1@gmail.com
- GitHub: (your link here)
- Facebook: (your link here)
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Wren Montero Javier from Valencia City, Bukidnon, Philippines. Ask me anything! 🇵🇭" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updated.map(({ role, content }) => ({ role, content })),
          ],
          max_tokens: 300,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error: ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: `Oops! ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className={`chatbot ${open ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setOpen(!open)} aria-label="Toggle chatbot">
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      <div className="chatbot-window">
        <div className="chatbot-header">
          <div className="chatbot-header-dot" />
          <span>AI Assistant</span>
        </div>
        <div className="chatbot-body">
          {messages.map((m, i) => (
            <div key={i} className={`chatbot-msg ${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="chatbot-msg assistant">
              <span className="chatbot-typing">Thinking</span>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="chatbot-footer">
          <input
            ref={inputRef}
            className="chatbot-input"
            placeholder="Ask about Wren..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
          <button className="chatbot-send" onClick={send} aria-label="Send" disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
