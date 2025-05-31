import googleTrends from 'google-trends-api';

export default async function handler(req, res) {
  const { niche } = req.query;
  if (!niche) return res.status(400).json({ error: "Missing niche query" });

  try {
    const results = await googleTrends.relatedQueries({ keyword: niche });
    const parsed = JSON.parse(results);
    const topRelated = parsed.default.rankedList[0]?.rankedKeyword || [];
    res.status(200).json({ keywords: topRelated });
  } catch (error) {
    res.status(500).json({ error: "Keyword research failed", details: error.message });
  }
}
