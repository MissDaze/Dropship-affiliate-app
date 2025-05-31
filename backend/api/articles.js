import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { niche } = req.query;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "user", content: `Write 2 engaging blog-style promotional articles for a dropshipping store focused on the "${niche}" niche. Make sure each article is persuasive and includes call-to-action statements.` }
      ],
      temperature: 0.7
    });

    const articles = response.data.choices[0].message.content;
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: "Article generation failed", details: error.message });
  }
}
