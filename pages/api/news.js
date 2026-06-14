// Cache news in memory - refreshes every 60 minutes
let cache = { data: null, fetchedAt: 0 };
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Stock symbols to auto-tag in headlines
const STOCK_TAGS = [
  'RELIANCE','INFY','TCS','HDFCBANK','ICICIBANK','KOTAKBANK','HINDUNILVR','BAJFINANCE',
  'SBIN','BHARTIARTL','AXISBANK','LT','ASIANPAINT','MARUTI','TITAN','SUNPHARMA',
  'WIPRO','HCLTECH','TATAMOTORS','TATASTEEL','JSWSTEEL','HINDALCO','ONGC','NTPC',
  'POWERGRID','COALINDIA','TECHM','DIVISLAB','DRREDDY','CIPLA','ADANIPORTS',
  'ULTRACEMCO','NESTLEIND','BAJAJFINSV','INDUSINDBK','GRASIM','HDFCLIFE','SBILIFE',
  'DLF','GODREJPROP','MTAR','GABRIEL','AARTIDRUGS','PRAJIND','OLECTRA','TANLA',
  'THYROCARE','SYRMA','CHOLA','TUBEINVEST','GARWARE','SUPRAJIT','ALKYLAMINE',
  'ELECON','AETHER','PITTI','SHYAMET','ANUPAMR','SANDUR','SHIVALIK','KAYNES',
  'SUPRIYA','TARSONS','EPIGRAL','GLAND',
];

function tagStocks(headline) {
  const upper = headline.toUpperCase();
  return STOCK_TAGS.filter(s => upper.includes(s));
}

async function fetchRSS(url, sourceName) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MarketLens/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();

    // Parse RSS items
    const items = [];
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/gi);
    for (const match of itemMatches) {
      const block = match[1];
      const title = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim() || '';
      const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1]?.trim() || '';
      const link = block.match(/<link>(.*?)<\/link>/i)?.[1]?.trim() ||
                   block.match(/<link\s[^>]*href="([^"]+)"/i)?.[1]?.trim() || '';

      if (!title || title.length < 10) continue;

      // Parse time
      let timeAgo = 'recent';
      if (pubDate) {
        const diff = Date.now() - new Date(pubDate).getTime();
        const mins = Math.floor(diff / 60000);
        const hrs = Math.floor(mins / 60);
        const days = Math.floor(hrs / 24);
        if (mins < 60) timeAgo = mins + 'm';
        else if (hrs < 24) timeAgo = hrs + 'h';
        else timeAgo = days + 'd';
      }

      items.push({
        headline: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
        source: sourceName,
        time: timeAgo,
        link: link,
        stocks: tagStocks(title),
        pubDate: pubDate ? new Date(pubDate).getTime() : Date.now(),
      });

      if (items.length >= 15) break;
    }
    return items;
  } catch (e) {
    console.error('RSS fetch error for', sourceName, e.message);
    return [];
  }
}

async function fetchNSEAnnouncements() {
  try {
    const res = await fetch('https://www.nseindia.com/api/corporate-announcements?index=equities', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.nseindia.com/',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = (data || []).slice(0, 10).map(a => ({
      headline: (a.desc || a.subject || 'NSE Announcement') + (a.symbol ? ' (' + a.symbol + ')' : ''),
      source: 'NSE Filing',
      time: 'today',
      link: '',
      stocks: a.symbol ? [a.symbol] : [],
      pubDate: Date.now(),
    }));
    return items;
  } catch (e) {
    return [];
  }
}

const RSS_FEEDS = [
  { url: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms', name: 'Economic Times' },
  { url: 'https://www.moneycontrol.com/rss/MCtopnews.xml', name: 'MoneyControl' },
  { url: 'https://www.livemint.com/rss/markets', name: 'Mint Markets' },
  { url: 'https://feeds.feedburner.com/ndtvprofit-latest', name: 'NDTV Profit' },
  { url: 'https://www.business-standard.com/rss/markets-106.rss', name: 'Business Standard' },
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Return cache if fresh
  if (cache.data && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return res.status(200).json({ news: cache.data, cachedAt: cache.fetchedAt, fromCache: true });
  }

  // Fetch all sources in parallel
  const results = await Promise.allSettled([
    ...RSS_FEEDS.map(f => fetchRSS(f.url, f.name)),
    fetchNSEAnnouncements(),
  ]);

  let allNews = [];
  for (const r of results) {
    if (r.status === 'fulfilled') allNews = allNews.concat(r.value);
  }

  // Sort by time, deduplicate similar headlines
  allNews.sort((a, b) => b.pubDate - a.pubDate);
  const seen = new Set();
  allNews = allNews.filter(n => {
    const key = n.headline.substring(0, 40).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Keep top 60
  allNews = allNews.slice(0, 60);

  // Fallback if everything failed
  if (allNews.length === 0) {
    allNews = [
      { headline: 'Live news unavailable - RSS feeds temporarily blocked. Try refreshing.', source: 'System', time: 'now', stocks: [], link: '' },
    ];
  }

  cache = { data: allNews, fetchedAt: Date.now() };
  return res.status(200).json({ news: allNews, cachedAt: cache.fetchedAt, fromCache: false });
}
