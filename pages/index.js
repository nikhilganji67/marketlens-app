import { useState } from 'react';
import Head from 'next/head';
import StockSearch from '../components/StockSearch';
import { Overview, Sectors, Flows, Signals, Earnings, Global, MidcapGems, Portfolio, NewsTab } from '../components/tabs';

const TABS = [
  { id: 'overview', icon: '📊', label: 'Market overview' },
  { id: 'sectors', icon: '🏭', label: 'Sectors' },
  { id: 'flows', icon: '🔄', label: 'FII / DII flows' },
  { id: 'signals', icon: '📡', label: 'Signals & PE' },
  { id: 'earnings', icon: '📋', label: 'Earnings' },
  { id: 'global', icon: '🌍', label: 'Global & EM' },
  { id: 'midcap', icon: '💎', label: 'Midcap gems' },
  { id: 'portfolio', icon: '💼', label: 'My portfolio' },
  { id: 'news', icon: '📰', label: 'Live news' },
];

export default function Home() {
  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const doSearch = (q) => { if (q?.trim()) setSearchResult(q.trim()); };

  const renderTab = () => {
    switch (tab) {
      case 'overview': return <Overview onSearch={doSearch} />;
      case 'sectors': return <Sectors />;
      case 'flows': return <Flows />;
      case 'signals': return <Signals />;
      case 'earnings': return <Earnings />;
      case 'global': return <Global />;
      case 'midcap': return <MidcapGems onSearch={doSearch} />;
      case 'portfolio': return <Portfolio onSearch={doSearch} />;
      case 'news': return <NewsTab onSearch={doSearch} />;
      default: return <Overview onSearch={doSearch} />;
    }
  };

  return (
    <>
      <Head>
        <title>MarketLens India — Intelligent equity research</title>
        <meta name="description" content="NSE/BSE market intelligence with AI-powered insights on sectors, FII flows, PE/PEG, earnings, and emerging markets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {searchResult && (
        <StockSearch query={searchResult} onClose={() => setSearchResult(null)} />
      )}

      {/* Top bar */}
      <div style={{
        background: 'white', borderBottom: '0.5px solid #e5e7eb',
        padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>
          📈 MarketLens India
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#9ca3af' }}>🔍</span>
          <input
            style={{
              width: '100%', padding: '8px 12px 8px 34px', fontSize: 13,
              border: '0.5px solid #d1d5db', borderRadius: 8, background: '#f9fafb',
              color: '#1f2937', outline: 'none',
            }}
            placeholder="Search any stock, sector, or theme — e.g. RELIANCE, IT sector, pharma bottom…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch(search)}
          />
        </div>
        <button
          onClick={() => doSearch(search)}
          style={{
            padding: '7px 14px', fontSize: 13, borderRadius: 8,
            border: 'none', background: '#1a6fc4', color: 'white',
            cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 500,
          }}
        >
          Analyse ↗
        </button>
        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 99, background: '#e6f7ef', color: '#0e6b3d', fontWeight: 600, whiteSpace: 'nowrap' }}>
          ● NSE Live
        </span>
      </div>

      {/* Tab bar */}
      <div style={{
        background: 'white', borderBottom: '0.5px solid #e5e7eb',
        display: 'flex', overflowX: 'auto', gap: 0, padding: '0 16px',
        position: 'sticky', top: 52, zIndex: 99,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 14px', fontSize: 12,
              fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? '#1a6fc4' : '#6b7280',
              borderBottom: tab === t.id ? '2px solid #1a6fc4' : '2px solid transparent',
              cursor: 'pointer', whiteSpace: 'nowrap',
              background: 'none', border: 'none',
              borderBottom: tab === t.id ? '2px solid #1a6fc4' : '2px solid transparent',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', maxWidth: 1100, margin: '0 auto' }}>
        {renderTab()}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '24px 20px', fontSize: 11, color: '#9ca3af', borderTop: '0.5px solid #f3f4f6' }}>
        MarketLens India · Powered by Claude AI · Data sourced from NSE, BSE, SEBI disclosures · For informational purposes only, not financial advice
      </div>
    </>
  );
}
