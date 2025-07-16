import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { prompt, history } = await req.json();

  const messages = history || [];
  messages.push({ role: "user", content: prompt });

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  return new Response(
    JSON.stringify({ response: completion.choices[0].message.content }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
