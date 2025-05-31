import { writeFileSync } from 'fs'

export default async function handler(req, res) {
  const { niche } = req.query;

  try {
    // Mock response for niche scraping
    const products = [
      { name: "Smart Water Bottle", price: "$29.99", site: "AliExpress" },
      { name: "Posture Corrector", price: "$15.95", site: "CJ Dropshipping" }
    ];

    writeFileSync('./assets/products.json', JSON.stringify(products));
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed", details: error.message });
  }
}
