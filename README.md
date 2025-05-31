# Dropship & Affiliate Serverless Toolkit

A full-stack, serverless SaaS built for dropshippers and affiliates to research, analyze, and launch high-performing product campaigns—all without code or a database.

---

## 🎯 Target Audience
- Dropshippers looking for high-demand products by niche
- Affiliates looking for the most profitable programs by topic
- Creators, marketers, solopreneurs launching ecom campaigns

---

## ✅ Core Features

### 🔍 Niche-Based Product & Affiliate Discovery
- Crawls dropshipping websites like CJ Dropshipping, AliExpress, etc.
- Searches web for highest-paying affiliate programs by keyword/topic
- Displays all results visually for user selection

### 📊 Market Intelligence Engine
- Once selections are made, the app fetches:
  - Related keywords
  - Google Trends data
  - Sentiment & search interest
  - Market competition analysis (WIP)
- Outputs a compiled report on screen

### 🎨 Marketing Material Generator
- For selected products/programs:
  - Generates 5 Facebook Ads (headlines + body)
  - Writes 2 promotional articles
  - Generates original product image with DALL·E
  - Suggests relevant upsells / cross-sells / affiliate bundles

---

## 🧱 Tech Stack

| Layer        | Tech                      |
|--------------|---------------------------|
| Frontend     | Next.js                   |
| Backend      | Serverless Functions (Vercel) |
| AI           | OpenAI API (GPT + DALL·E) |
| Trends/SEO   | Google Trends API         |
| Scraping     | Puppeteer / fetch         |
| Storage      | Local JSON (`/assets`)    |

---

## 🔐 Required API Keys

| API           | Purpose                         | How to Get It                                                  |
|---------------|----------------------------------|-----------------------------------------------------------------|
| OpenAI API    | GPT-4 for text + DALL·E for images | [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| Google Trends | Trend & keyword data            | Uses `google-trends-api` (no key needed)                       |

> Place your OpenAI key in a `.env.local` file:
```
OPENAI_API_KEY=sk-...
```

---

## 🚀 Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/dropship-affiliate-app.git
cd dropship-affiliate-app
mv .env.local.example .env.local
npm install
npm run dev
```

---

## 🚢 Vercel Deployment

1. Push project to GitHub
2. Connect Vercel to repo
3. Add `OPENAI_API_KEY` in Vercel environment variables
4. Deploy!

---

## 📁 File Structure

```
/frontend/
  /pages/index.js         ← Dashboard UI
/backend/
  /api/search.js          ← Mock dropshipping search
  /api/affiliates.js      ← High-paying affiliate search
  /api/aiContent.js       ← FB ads via GPT
  /api/articles.js        ← Promo articles
  /api/dalleImage.js      ← AI-generated images
  /api/keywords.js        ← Related keywords
  /api/googleTrends.js    ← Google Trends data
  /api/upsells.js         ← Product bundles/upsells
/assets/                  ← JSON output, images
.env.local.example        ← API keys placeholder
vercel.json               ← Routing and build config
package.json              ← Scripts and deps
README.md                 ← You’re reading it!
```

---

## 📦 Coming Soon (WIP Ideas)

- Real scraping logic for CJ, AliExpress, PartnerStack, etc.
- PDF export of report + campaign assets
- Mobile version
- User login + saved campaigns (via Supabase/Firebase)
