import { useState, useEffect } from 'react';
import { SECTORS, EARNINGS, BULK_DEALS, MIDCAP, NEWS } from '../lib/data';

export default function StockSearch({ query, onClose }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const relatedNews = NEWS.filter(n =>
      n.stocks.some(s => s.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(s.toLowerCase()))
    );
    const context = JSON.stringify({ sectors: SECTORS, earnings: EARNINGS, fiiBulk: BULK_DEALS, midcap: MIDCAP, relatedNews });

    fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Give me a complete investment analysis for "${query}". Cover: 1) Sector and how it is doing right now 2) FII/DII positioning 3) Recent earnings — beat/miss/guidance update 4) PE and PEG vs sector avg 5) ROE, ROCE and PAT growth trend 6) Management quality — promoter background, track record, key executives, any red flags (pledging, salary, related party) 7) Buy/Hold/Sell signal with price targets 8) Key risks 9) If midcap (Rs2500-7000cr), highlight turnaround thesis and what institutions are watching. Be specific and data-driven.`,
        context,
      }),
    })
      .then(r => r.json())
      .then(d => { setInsight(d.text || d.error || 'No response'); setLoading(false); })
      .catch(() => { setInsight('Could not load analysis.'); setLoading(false); });
  }, [query]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', borderRadius: 16, padding: 24, maxWidth: 640, width: '100%', maxHeight: '80vh', overflow: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{query.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Full AI analysis · NSE/BSE cross-reference</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#f3f4f6', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#6b7280' }}>✕</button>
        </div>

        {loading ? (
          <div style={{ padding: '32px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic', marginBottom: 8 }}>Fetching full analysis…</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Cross-referencing sector data, FII flows, earnings and PE ratios</div>
          </div>
        ) : (
          <div
            style={{ fontSize: 13, color: '#1f2937', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{
              __html: insight
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br/>')
            }}
          />
        )}

        <div style={{ marginTop: 16, fontSize: 11, color: '#9ca3af', borderTop: '0.5px solid #e5e7eb', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>Powered by Claude · MarketLens India</span>
          <span>Data as of today · NSE/BSE filings</span>
        </div>
      </div>
    </div>
  );
}
