import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Shuffle } from "lucide-react";

const presets = [
  {
    name: "Bug Fix",
    role: "Senior software engineer",
    audience: "Intermediate developers",
    tone: "Direct and practical",
    goal: "Identify root cause and propose a fix",
    task: "Analyze error logs and propose patch",
    style: "Bulleted steps with code blocks",
    constraints: "No speculation; cite code lines",
    extras: "Target file: UserRepo.js",
  },
  {
    name: "Lesson Plan",
    role: "Teacher",
    audience: "High school students",
    tone: "Friendly and encouraging",
    goal: "Teach the concept clearly",
    task: "Create a 45-minute lesson plan",
    style: "Outline with numbered steps",
    constraints: "Use real-world examples",
    extras: "Topic: Photosynthesis",
  },
  {
    name: "Marketing Copy",
    role: "Copywriter",
    audience: "Busy professionals",
    tone: "Persuasive and upbeat",
    goal: "Increase click-through rate",
    task: "Write 5 headlines + 3 CTAs",
    style: "Punchy, active voice",
    constraints: "Max 12 words per headline",
    extras: "Product: Habit-tracking app",
  },
];

export default function App() {
  const [fields, setFields] = useState({
    role: "",
    audience: "",
    tone: "",
    goal: "",
    task: "",
    style: "",
    constraints: "",
    extras: "",
  });

  const updateField = (key, value) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const output = `
You are: ${fields.role || "an AI assistant"}.
Audience: ${fields.audience || "general users"}.
Tone: ${fields.tone || "neutral"}.
Goal: ${fields.goal || "help the user"}.

Task:
- ${fields.task || "Answer the query clearly."}

Constraints:
- ${fields.constraints || "Stay factual and concise."}

Style & Format:
- ${fields.style || "Use simple language."}

Extras:
- ${fields.extras || "N/A"}
  `.trim();

  const randomize = () => {
    const p = presets[Math.floor(Math.random() * presets.length)];
    setFields(p);
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(output);
    alert("✅ Prompt copied to clipboard!");
  };

  const downloadPrompt = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-prompt.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-6"
      >
        🚀 AI Prompt Generator
      </motion.h1>

      {/* Presets */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => setFields(p)}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-xl text-sm"
          >
            {p.name}
          </button>
        ))}
        <button
          onClick={randomize}
          className="px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-xl flex items-center gap-1 text-sm"
        >
          <Shuffle className="w-4 h-4" /> Random
        </button>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-4 w-full max-w-4xl">
        {Object.keys(fields).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium mb-1 capitalize">{key}</label>
            <input
              className="p-2 border rounded-xl"
              value={fields[key]}
              onChange={(e) => updateField(key, e.target.value)}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="w-full max-w-4xl mt-8">
        <label className="font-medium mb-2 block">Generated Prompt:</label>
        <textarea
          className="w-full h-60 p-4 border rounded-xl bg-white"
          readOnly
          value={output}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={copyPrompt}
          className="px-4 py-2 bg-green-500 text-white rounded-xl flex items-center gap-2"
        >
          <Copy className="w-4 h-4" /> Copy
        </button>
        <button
          onClick={downloadPrompt}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download
        </button>
      </div>
    </div>
  );
}
