import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import path from "path";
import https from "https";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { product } = req.query;
  if (!product) return res.status(400).json({ error: "Missing product query" });

  try {
    const response = await openai.createImage({
      prompt: `A professional product image for ${product}, suitable for ecommerce marketing`,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data.data[0].url;
    const imagePath = path.join(process.cwd(), 'assets', `${product.replace(/\s+/g, "_")}.png`);
    const file = fs.createWriteStream(imagePath);

    https.get(imageUrl, (stream) => {
      stream.pipe(file);
      file.on('finish', () => {
        file.close();
        res.status(200).json({ success: true, url: imageUrl });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Image generation failed", details: error.message });
  }
}
