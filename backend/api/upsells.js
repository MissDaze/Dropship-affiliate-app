import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { product } = req.query;

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "user", content: `Suggest 3 upsell and 3 cross-sell product ideas for this item: "${product}". Also include a short explanation of why each suggestion fits.` }
      ],
      temperature: 0.6
    });

    const ideas = result.data.choices[0].message.content;
    res.status(200).json({ suggestions: ideas });
  } catch (error) {
    res.status(500).json({ error: "Upsell suggestion failed", details: error.message });
  }
}
