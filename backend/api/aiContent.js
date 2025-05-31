import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { niche } = req.query;

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "user", content: `Write 5 Facebook ads for a dropshipping product in the "${niche}" niche. Each ad should include a catchy headline and 2-3 sentence body text.` }
      ],
      temperature: 0.7,
    });

    const ads = result.data.choices[0].message.content;
    res.status(200).json({ ads });
  } catch (error) {
    res.status(500).json({ error: "AI content generation failed", details: error.message });
  }
}
