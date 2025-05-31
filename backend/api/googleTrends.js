import googleTrends from 'google-trends-api';

export default async function handler(req, res) {
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: "Missing keyword query" });

  try {
    const result = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // last 30 days
    });

    const parsed = JSON.parse(result);
    res.status(200).json({ trend: parsed.default.timelineData });
  } catch (error) {
    res.status(500).json({ error: "Google Trends fetch failed", details: error.message });
  }
}
