import { useState } from 'react';

export default function Dashboard() {
  const [niche, setNiche] = useState('');
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState('');
  const [articles, setArticles] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [upsells, setUpsells] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`/api/search?niche=${niche}`);
    const data = await res.json();
    setProducts(data.data || []);
  };

  const handleAds = async () => {
    const res = await fetch(`/api/aiContent?niche=${niche}`);
    const data = await res.json();
    setAds(data.ads);
  };

  const handleArticles = async () => {
    const res = await fetch(`/api/articles?niche=${niche}`);
    const data = await res.json();
    setArticles(data.articles);
  };

  const handleImage = async () => {
    const res = await fetch(`/api/dalleImage?product=${product}`);
    const data = await res.json();
    setImageUrl(data.url);
  };

  const handleKeywords = async () => {
    const res = await fetch(`/api/keywords?niche=${niche}`);
    const data = await res.json();
    setKeywords(data.keywords || []);
  };

  const handleUpsells = async () => {
    const res = await fetch(`/api/upsells?product=${product}`);
    const data = await res.json();
    setUpsells(data.suggestions);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Dropship & Affiliate Dashboard</h1>

      <input value={niche} onChange={e => setNiche(e.target.value)} placeholder="Enter niche" />
      <button onClick={handleSearch}>Search Products</button>
      <button onClick={handleAds}>Generate Facebook Ads</button>
      <button onClick={handleArticles}>Generate Articles</button>
      <button onClick={handleKeywords}>Get Keyword Ideas</button>

      <h2>Products</h2>
      <ul>
        {products.map((item, index) => (
          <li key={index} onClick={() => setProduct(item.name)}>
            {item.name} – {item.price} ({item.site})
          </li>
        ))}
      </ul>

      <h2>Selected Product: {product}</h2>
      <button onClick={handleImage}>Generate Image</button>
      <button onClick={handleUpsells}>Get Upsell Ideas</button>

      {imageUrl && <img src={imageUrl} alt="Generated Product" width="200" style={{ marginTop: 10 }} />}

      <h2>Facebook Ads</h2>
      <pre>{ads}</pre>

      <h2>Articles</h2>
      <pre>{articles}</pre>

      <h2>Keyword Suggestions</h2>
      <ul>
        {keywords.map((kw, i) => (
          <li key={i}>{kw.query}</li>
        ))}
      </ul>

      <h2>Upsell / Cross-sell Ideas</h2>
      <pre>{upsells}</pre>
    </div>
  );
}
