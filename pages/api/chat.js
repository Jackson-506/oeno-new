import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, history } = req.body;

  const messages = history || [];
  messages.push({ role: "user", content: prompt });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    res.status(200).json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
