import { useState } from 'react';
import { Badge, Pct, Card, CardTitle, MetricCard, Row, TR, AIInsight, Divider, C } from './ui';
import { MARKET, SECTORS, FII_TODAY, BULK_DEALS, EARNINGS, MIDCAP, EM_MARKETS, PORTFOLIO, NEWS, DATA_UPDATED } from '../lib/data';

// ── Overview ─────────────────────────────────────────────────────────────────
export function Overview({ onSearch }) {
  return (
    <div>
      <Row cols={4}>
        <MetricCard label="Nifty 50" value="24,762" sub={<><Pct val={0.82} /> <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 4 }}>S&P corr: 0.71</span></>} />
        <MetricCard label="Sensex" value="81,403" sub={<><Pct val={0.76} /> <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 4 }}>BSE 500</span></>} />
        <MetricCard label="Nifty Midcap 150" value="18,341" sub={<><Pct val={-0.21} /> <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 4 }}>₹2500–7000 cr</span></>} />
        <MetricCard label="India VIX" value="13.4" sub={<><span style={{ color: C.buy, fontWeight: 500 }}>Low fear</span><span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 4 }}>Avg 18.2</span></>} />
      </Row>

      <Row cols={2}>
        <Card>
          <CardTitle icon="🌐">S&P 500 correlation with Nifty</CardTitle>
          <div style={{ fontSize: 13, color: '#374151', marginBottom: 8 }}>
            Rolling 90-day correlation: <strong style={{ fontSize: 18, color: '#1a6fc4' }}>0.71</strong> — high sync
          </div>
          <Divider />
          {[
            { label: 'S&P 500', val: '5,432', chg: 0.34 },
            { label: 'Nasdaq 100', val: '19,210', chg: 0.58 },
          ].map(r => (
            <TR key={r.label}>
              <span style={{ color: '#6b7280' }}>{r.label}</span>
              <span>{r.val} <Pct val={r.chg} /></span>
            </TR>
          ))}
          <TR><span style={{ color: '#6b7280' }}>S&P signal</span><Badge type="NEUTRAL" /></TR>
          <TR><span style={{ color: '#6b7280' }}>Nifty implied by S&P</span><span style={{ fontWeight: 500 }}>24,400–25,100 range</span></TR>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>High correlation means a US correction poses direct downside risk to Nifty.</div>
        </Card>

        <Card>
          <CardTitle icon="🔔">Top market signals today</CardTitle>
          {[
            { label: 'FII net flow', val: '+₹2,841 cr', sig: 'BUY' },
            { label: 'Advance / Decline', val: '1,420 / 890', sig: 'BUY' },
            { label: 'Nifty RSI (14d)', val: '58 — healthy', sig: 'HOLD' },
            { label: 'Nifty above 200 DMA', val: 'Yes, +4.2%', sig: 'BUY' },
            { label: 'VIX vs avg', val: '13.4 vs 18.2', sig: 'BUY' },
            { label: 'Put/Call ratio', val: '0.82 — bullish', sig: 'BUY' },
          ].map(r => (
            <TR key={r.label}>
              <span style={{ color: '#6b7280' }}>{r.label}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12 }}>{r.val}</span>
                <Badge type={r.sig} />
              </span>
            </TR>
          ))}
        </Card>
      </Row>

      <Card>
        <CardTitle icon="✦">AI market read</CardTitle>
        <AIInsight
          prompt="Give me a sharp top-down market read for Indian equities today. Cover: broad market health (Nifty momentum, VIX, FII stance), which sectors are leading vs lagging, what big players are positioning for, any S&P500-Nifty correlation signals, and what an investor should be doing right now."
          context={{ market: MARKET, sectors: SECTORS, fii: FII_TODAY, news: NEWS.slice(0, 3) }}
          title="broad market"
        />
      </Card>
    </div>
  );
}

// ── Sectors ───────────────────────────────────────────────────────────────────
export function Sectors() {
  return (
    <div>
      <Card>
        <CardTitle icon="🏭">Sector performance & signals</CardTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Sector', '30d chg', 'PE', 'PEG', 'FII 30d (₹cr)', 'Signal', 'Note'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTORS.map(s => (
                <tr key={s.name} style={{ borderBottom: '0.5px solid #f9fafb' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 500 }}>{s.name}</td>
                  <td style={{ padding: '8px 10px' }}><Pct val={s.chg} /></td>
                  <td style={{ padding: '8px 10px' }}>{s.pe}x</td>
                  <td style={{ padding: '8px 10px', color: s.peg < 1 ? C.buy : s.peg > 2 ? C.sell : C.hold, fontWeight: 500 }}>{s.peg}</td>
                  <td style={{ padding: '8px 10px', color: s.fii > 0 ? C.buy : C.sell, fontWeight: 500 }}>
                    {s.fii > 0 ? '+' : ''}{s.fii.toLocaleString()}
                  </td>
                  <td style={{ padding: '8px 10px' }}><Badge type={s.signal} /></td>
                  <td style={{ padding: '8px 10px', color: '#6b7280', fontSize: 12 }}>{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: '#fff9f0', borderRadius: 8, fontSize: 12, color: '#6b7280' }}>
          <strong style={{ color: '#92400e' }}>Bottom formation signals: </strong>
          Pharma (RSI 38, PEG 0.8, FII buying) and Metals (RSI 31, PEG 0.6 — watch for China stimulus trigger). PSU Banks forming base at PE 9x.
        </div>
      </Card>
      <Card>
        <CardTitle icon="✦">AI sector rotation insight</CardTitle>
        <AIInsight
          prompt="Analyze Indian sector rotation. Which sectors have formed bottoms (use RSI, PE, PEG, FII flows)? Which are at peaks with sell signals? Give a 3–6 month sector allocation view. Highlight which sectors institutional money is quietly accumulating vs distributing."
          context={SECTORS}
          title="sector rotation"
        />
      </Card>
    </div>
  );
}

// ── FII / DII Flows ───────────────────────────────────────────────────────────
export function Flows() {
  return (
    <div>
      <Row cols={3}>
        <MetricCard label="FII net today" value="+₹2,841 cr" color={C.buy} sub={<span style={{ fontSize: 11, color: '#6b7280' }}>8th consecutive buy day</span>} />
        <MetricCard label="DII net today" value="−₹1,204 cr" color={C.sell} sub={<span style={{ fontSize: 11, color: '#6b7280' }}>Profit booking</span>} />
        <MetricCard label="FII MTD (June)" value="+₹21,400 cr" color={C.buy} sub={<span style={{ fontSize: 11, color: '#6b7280' }}>Strong EM allocation</span>} />
      </Row>
      <Row cols={2}>
        <Card>
          <CardTitle icon="📊">Sector-level FII flows (30 days)</CardTitle>
          {SECTORS.map(sec => (
            <div key={sec.name} style={{ display: 'flex', alignItems: 'center', padding: '6px 0', borderBottom: '0.5px solid #f9fafb', gap: 10 }}>
              <span style={{ minWidth: 120, fontSize: 13 }}>{sec.name}</span>
              <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, Math.abs(sec.fii) / 150)}%`, background: sec.fii > 0 ? C.buy : C.sell, borderRadius: 3 }} />
              </div>
              <span style={{ color: sec.fii > 0 ? C.buy : C.sell, fontWeight: 500, minWidth: 90, textAlign: 'right', fontSize: 13 }}>
                {sec.fii > 0 ? '+' : ''}{sec.fii.toLocaleString()} cr
              </span>
            </div>
          ))}
        </Card>
        <Card>
          <CardTitle icon="🏦">Big buyer bulk deals</CardTitle>
          {BULK_DEALS.map((d, i) => (
            <div key={i} style={{ padding: '7px 0', borderBottom: '0.5px solid #f9fafb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontWeight: 500, fontSize: 13 }}>{d.buyer}</span>
                <Badge type={d.side} />
              </div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{d.stock} · {d.qty} shares · ₹{d.val} cr</div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>Source: NSE bulk deal disclosures · Today</div>
        </Card>
      </Row>
      <Card>
        <CardTitle icon="✦">AI flow intelligence</CardTitle>
        <AIInsight
          prompt="Analyze FII and DII flows for Indian markets. What is the smart money doing? Which sectors are institutions quietly accumulating? Is the DII selling vs FII buying a concerning divergence or normal? What does the 8-day consecutive FII buying streak historically signal? Give an actionable interpretation."
          context={{ fii: FII_TODAY, sectors: SECTORS, bulkDeals: BULK_DEALS }}
          title="flow intelligence"
        />
      </Card>
    </div>
  );
}

// ── Signals & PE ──────────────────────────────────────────────────────────────
export function Signals() {
  const peTable = [
    { s: 'IT', pe: 28, peg: 1.4, avg: 24, v: 'FAIR' },
    { s: 'Pharma', pe: 22, peg: 0.8, avg: 28, v: 'CHEAP' },
    { s: 'FMCG', pe: 46, peg: 2.1, avg: 38, v: 'EXPENSIVE' },
    { s: 'Pvt Banks', pe: 14, peg: 0.9, avg: 18, v: 'VALUE' },
    { s: 'Auto', pe: 19, peg: 1.1, avg: 17, v: 'FAIR' },
    { s: 'Metals', pe: 9, peg: 0.6, avg: 12, v: 'CHEAP' },
    { s: 'Realty', pe: 52, peg: 3.1, avg: 28, v: 'EXPENSIVE' },
    { s: 'PSU Banks', pe: 9, peg: 0.7, avg: 10, v: 'VALUE' },
  ];
  return (
    <div>
      <Row cols={2}>
        <Card>
          <CardTitle icon="🟢">Active buy signals</CardTitle>
          {SECTORS.filter(s => s.signal === 'BUY').map(s => (
            <div key={s.name} style={{ padding: '7px 0', borderBottom: '0.5px solid #f9fafb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <strong style={{ fontSize: 13 }}>{s.name}</strong><Badge type="BUY" />
              </div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>PE {s.pe}x · PEG {s.peg} · FII: +{s.fii.toLocaleString()} cr · {s.note}</div>
            </div>
          ))}
          <Divider />
          <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Stock-level buy signals</div>
          {[
            { stock: 'INFY', note: 'FII buying ₹2.1k cr, above 200 DMA, PEG 1.1' },
            { stock: 'SUNPHARMA', note: 'Guidance raised, bottom reversal, PEG 0.9' },
            { stock: 'HDFCBANK', note: 'FII accumulating, PE 14x, NIM stable' },
          ].map(s => (
            <TR key={s.stock}>
              <span style={{ fontWeight: 500 }}>{s.stock}</span>
              <span style={{ fontSize: 12, color: '#6b7280', textAlign: 'right', maxWidth: '60%' }}>{s.note}</span>
            </TR>
          ))}
        </Card>

        <Card>
          <CardTitle icon="🔴">Sell / exit signals</CardTitle>
          {[
            { name: 'Realty', pe: 52, peg: 3.1, note: 'PE 52x, PEG 3.1, FII selling ₹5,200 cr, RSI 72' },
            { name: 'FMCG', pe: 46, peg: 2.1, note: 'PE at 10yr peak, volume growth slowing' },
          ].map(s => (
            <div key={s.name} style={{ padding: '7px 0', borderBottom: '0.5px solid #f9fafb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <strong style={{ fontSize: 13 }}>{s.name}</strong><Badge type="SELL" />
              </div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>PE {s.pe}x · PEG {s.peg} · {s.note}</div>
            </div>
          ))}
          <Divider />
          <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Peak indicators</div>
          {[
            { label: 'Realty RSI', val: '72 — overbought' },
            { label: 'Realty PE vs hist avg', val: '52x vs 28x avg' },
            { label: 'FMCG volume growth', val: '3% vs 8% guidance' },
          ].map(r => (
            <TR key={r.label}>
              <span style={{ color: '#6b7280' }}>{r.label}</span>
              <span style={{ color: C.sell, fontWeight: 500 }}>{r.val}</span>
            </TR>
          ))}
        </Card>
      </Row>

      <Card>
        <CardTitle icon="📐">PE / PEG matrix — all sectors</CardTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Sector', 'PE', 'PEG', '10yr avg PE', 'vs Avg', 'Verdict'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peTable.map(r => (
                <tr key={r.s} style={{ borderBottom: '0.5px solid #f9fafb' }}>
                  <td style={{ padding: '7px 10px', fontWeight: 500 }}>{r.s}</td>
                  <td style={{ padding: '7px 10px' }}>{r.pe}x</td>
                  <td style={{ padding: '7px 10px', color: r.peg < 1 ? C.buy : r.peg > 2 ? C.sell : C.hold, fontWeight: 500 }}>{r.peg}</td>
                  <td style={{ padding: '7px 10px', color: '#6b7280' }}>{r.avg}x</td>
                  <td style={{ padding: '7px 10px', color: r.pe < r.avg ? C.buy : C.sell }}>
                    {r.pe < r.avg ? `${r.avg - r.pe}x below avg` : `${r.pe - r.avg}x above avg`}
                  </td>
                  <td style={{ padding: '7px 10px' }}><Badge type={r.v} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle icon="✦">AI signal analysis</CardTitle>
        <AIInsight
          prompt="Based on PE, PEG ratios, FII flows and technical signals, give me a comprehensive buy/sell/hold signal for each major Indian sector. Identify which sectors are at generational buying opportunities vs which to exit now. Also tell me what signals big institutional investors watch to spot sector bottoms and peaks."
          context={SECTORS}
          title="buy & sell signals"
        />
      </Card>
    </div>
  );
}

// ── Earnings ──────────────────────────────────────────────────────────────────
export function Earnings() {
  return (
    <div>
      <Card>
        <CardTitle icon="📋">Earnings tracker — latest results</CardTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Company', 'Actual result', 'vs Estimate', 'Signal', 'Guidance update'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EARNINGS.map((e, i) => (
                <tr key={i} style={{ borderBottom: '0.5px solid #f9fafb' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 500 }}>{e.co}</td>
                  <td style={{ padding: '8px 10px' }}>{e.result}</td>
                  <td style={{ padding: '8px 10px', color: '#6b7280', fontSize: 12 }}>{e.vs}</td>
                  <td style={{ padding: '8px 10px' }}><Badge type={e.signal} /></td>
                  <td style={{ padding: '8px 10px', fontSize: 12, color: e.signal === 'MISS' ? C.sell : e.signal === 'BEAT' ? C.buy : '#6b7280' }}>{e.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 10, padding: '8px 12px', background: '#fef9f0', borderRadius: 8, fontSize: 12 }}>
          <strong style={{ color: '#92400e' }}>Guidance misses to watch: </strong>
          Wipro, Tata Motors, Asian Paints — may face analyst downgrades.
        </div>
      </Card>

      <Card>
        <CardTitle icon="🎙">AGM calendar this week</CardTitle>
        {[
          { co: 'HDFC Bank', date: 'Jun 14', focus: 'NIM outlook, deposit growth' },
          { co: 'ITC', date: 'Jun 15', focus: 'Demerger update, FMCG targets' },
          { co: 'Bajaj Finance', date: 'Jun 16', focus: 'Credit cost, AUM growth guidance' },
          { co: 'Maruti Suzuki', date: 'Jun 17', focus: 'EV roadmap, CNG share' },
          { co: 'Adani Ports', date: 'Jun 18', focus: 'Capex plan, new terminal wins' },
        ].map((a, i) => (
          <TR key={i}>
            <span style={{ fontWeight: 500, minWidth: 130 }}>{a.co}</span>
            <span style={{ fontSize: 12, color: '#6b7280', flex: 1 }}>{a.focus}</span>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{a.date}</span>
          </TR>
        ))}
      </Card>

      <Card>
        <CardTitle icon="✦">AI earnings analysis</CardTitle>
        <AIInsight
          prompt="Analyze the latest earnings season for Indian markets. Which companies missed guidance and what does that signal? Which beat and raised guidance — are they buyable now or priced in? What's the broader earnings growth trajectory for Nifty 50? Give specific stock-level and sector-level implications."
          context={EARNINGS}
          title="earnings season"
        />
      </Card>
    </div>
  );
}

// ── Global & EM ───────────────────────────────────────────────────────────────
export function Global({ onSearch }) {
  const [selectedEM, setSelectedEM] = useState(null);
  const [emInsight, setEmInsight] = useState('');
  const [emLoading, setEmLoading] = useState(false);

  const openEM = async (m) => {
    setSelectedEM(m);
    setEmInsight('');
    setEmLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Give me a detailed investment opportunity analysis for ' + m.country + ' (' + m.name + '). Cover: 1) Why the market is at current levels 2) Macro drivers (currency, rates, commodities) 3) Key sectors to play 4) How an Indian investor can get exposure (ETFs, ADRs, direct) 5) Risk factors 6) 12-month return outlook vs Nifty 7) Comparison with India on PE and growth.',
          context: JSON.stringify({ market: m, indiaContext: { nifty: 24762, niftyPE: 22, fiiFlows: 'positive' } }),
        }),
      });
      const d = await res.json();
      setEmInsight(d.text || 'No response');
    } catch { setEmInsight('Could not load analysis.'); }
    setEmLoading(false);
  };

  const flagEmoji = { BR: '🇧🇷', VN: '🇻🇳', ID: '🇮🇩', KR: '🇰🇷', MX: '🇲🇽', CN: '🇨🇳', TH: '🇹🇭', PH: '🇵🇭' };

  return (
    <div>
      {selectedEM && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setSelectedEM(null)}>
          <div style={{ background: 'white', borderRadius: 16, padding: 24, maxWidth: 640, width: '100%', maxHeight: '80vh', overflow: 'auto' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{flagEmoji[selectedEM.flag]} {selectedEM.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>PE {selectedEM.pe}x · YTD USD return {selectedEM.usd > 0 ? '+' : ''}{selectedEM.usd}% · {selectedEM.signal}</div>
              </div>
              <button onClick={() => setSelectedEM(null)} style={{ border: 'none', background: '#f3f4f6', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#6b7280' }}>x</button>
            </div>
            <div style={{ padding: '8px 12px', background: '#f0f7ff', borderRadius: 8, fontSize: 12, color: '#374151', marginBottom: 12 }}>{selectedEM.note}</div>
            {emLoading
              ? <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic', padding: '16px 0' }}>Analyzing {selectedEM.country} market opportunity...</div>
              : <div style={{ fontSize: 13, color: '#1f2937', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: emInsight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
            }
          </div>
        </div>
      )}

      <Row cols={2}>
        <Card>
          <CardTitle icon="🌍">Emerging market signals · click for deep dive</CardTitle>
          {EM_MARKETS.map(m => (
            <div key={m.name}
              onClick={() => openEM(m)}
              style={{ padding: '8px 10px', borderBottom: '0.5px solid #f9fafb', cursor: 'pointer', borderRadius: 6, transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontWeight: 500, fontSize: 13, color: '#1a6fc4' }}>{flagEmoji[m.flag]} {m.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Pct val={m.chg} />
                  <Badge type={m.signal} />
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>PE {m.pe}x</span>
                </span>
              </div>
              <span style={{ fontSize: 12, color: '#6b7280' }}>{m.note.substring(0, 80)}...</span>
            </div>
          ))}
        </Card>
        <Card>
          <CardTitle icon="📡">DXY and macro signals</CardTitle>
          {[
            { label: 'US Dollar Index (DXY)', val: '103.4', note: 'Weak dollar = EM positive' },
            { label: 'US 10Y yield', val: '4.28%', note: 'Stable, no EM outflow risk' },
            { label: 'Brent Crude', val: '$82.4/bbl', note: 'Elevated, India import watch' },
            { label: 'Gold', val: '$2,341', note: 'Safe haven bid, mild risk-off' },
            { label: 'USD/INR', val: '83.6', note: 'Stable range, RBI managing' },
            { label: 'FII EM flows (global)', val: '+$4.2B MTD', note: 'Risk-on rotation active' },
          ].map(r => (
            <TR key={r.label}>
              <span style={{ color: '#6b7280', fontSize: 12 }}>{r.label}</span>
              <span style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{r.val}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{r.note}</div>
              </span>
            </TR>
          ))}
        </Card>
      </Row>
      <Card>
        <CardTitle icon="✦">AI global opportunity scan</CardTitle>
        <AIInsight
          prompt="Scan global and emerging markets for: 1) Which EM countries have bottomed and offer 12-24 month return opportunity? 2) How does India compare on valuation vs Brazil, Vietnam, Korea? 3) What macro signals (DXY, yields, crude) affect India specifically right now? 4) Is this a good time to be overweight India vs other EMs? Give a definitive allocation view."
          context={{ em: EM_MARKETS, macro: { dxy: 103.4, us10y: 4.28, crude: 82.4, usdInr: 83.6 } }}
          title="global EM opportunity"
        />
      </Card>
    </div>
  );
}


// ── Midcap Gems ───────────────────────────────────────────────────────────────
export function MidcapGems({ onSearch }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'quality'
    ? MIDCAP.filter(m => m.quality)
    : filter === 'turnaround'
    ? MIDCAP.filter(m => m.signal === 'TURNAROUND' || m.signal === 'BOTTOM')
    : MIDCAP;

  return (
    <div>
      <Card highlight>
        <CardTitle icon="💎"><span style={{ color: '#1a6fc4' }}>Midcap gems · Rs2,500-7,000 cr market cap</span></CardTitle>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
          25 curated stocks across quality compounders and turnaround plays. Click any row for full AI analysis including management profile.
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All stocks (' + MIDCAP.length + ')' },
            { key: 'quality', label: 'Quality filter: ROE+ROCE>20%, PAT CAGR>20% (' + MIDCAP.filter(m=>m.quality).length + ')' },
            { key: 'turnaround', label: 'Turnarounds (' + MIDCAP.filter(m=>m.signal==='TURNAROUND'||m.signal==='BOTTOM').length + ')' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 99, border: '0.5px solid ' + (filter === f.key ? '#1a6fc4' : '#d1d5db'), background: filter === f.key ? '#e8f1fc' : 'white', color: filter === f.key ? '#1a6fc4' : '#6b7280', cursor: 'pointer', fontWeight: filter === f.key ? 600 : 400 }}>
              {f.label}
            </button>
          ))}
        </div>

        {filter === 'quality' && (
          <div style={{ padding: '8px 12px', background: '#e6f7ef', borderRadius: 8, fontSize: 12, color: '#0e6b3d', marginBottom: 10 }}>
            Showing stocks with ROE and ROCE both above 20% AND PAT CAGR above 20% over last 5 years — the quality compounder filter used by major institutions.
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Company', 'Mcap', 'Sector', 'PE', 'PEG', 'ROE', 'ROCE', 'PAT CAGR 5yr', 'Signal', 'FII', 'Thesis'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontSize: 10, fontWeight: 600, color: '#6b7280', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.name}
                  style={{ borderBottom: '0.5px solid #f9fafb', cursor: 'pointer', background: m.quality ? '#fafffe' : 'white' }}
                  onClick={() => onSearch(m.name)}
                >
                  <td style={{ padding: '7px 8px', fontWeight: 500, color: '#1a6fc4' }}>{m.name}</td>
                  <td style={{ padding: '7px 8px', whiteSpace: 'nowrap' }}>Rs{m.mcap.toLocaleString()}</td>
                  <td style={{ padding: '7px 8px', fontSize: 11, color: '#6b7280' }}>{m.sector}</td>
                  <td style={{ padding: '7px 8px' }}>{m.pe}x</td>
                  <td style={{ padding: '7px 8px', color: m.peg < 1 ? '#1a9e5c' : '#c07a10', fontWeight: 500 }}>{m.peg}</td>
                  <td style={{ padding: '7px 8px', color: m.roe >= 20 ? '#1a9e5c' : '#c07a10', fontWeight: 500 }}>{m.roe}%</td>
                  <td style={{ padding: '7px 8px', color: m.roce >= 20 ? '#1a9e5c' : '#c07a10', fontWeight: 500 }}>{m.roce}%</td>
                  <td style={{ padding: '7px 8px', color: m.patCagr >= 20 ? '#1a9e5c' : '#c07a10', fontWeight: 500 }}>{m.patCagr}%</td>
                  <td style={{ padding: '7px 8px' }}><Badge type={m.signal} /></td>
                  <td style={{ padding: '7px 8px', fontSize: 11 }}>{m.fii}</td>
                  <td style={{ padding: '7px 8px', fontSize: 11, color: '#6b7280', maxWidth: 160 }}>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
          Click any row for full AI analysis including management profile, promoter holding, and institutional interest.
        </div>
      </Card>

      <Card>
        <CardTitle icon="✦">AI midcap quality compounder analysis</CardTitle>
        <AIInsight
          prompt="Analyze the midcap segment (Rs2500-7000 crore) focusing on quality compounders with ROE and ROCE above 20% and PAT CAGR above 20% for 5 years. Which of these stocks are currently at attractive valuations (PEG below 1)? What sectors within midcap are showing the strongest quality + value combination? Give a framework and top 5 picks with reasoning."
          context={MIDCAP.filter(m => m.quality)}
          title="quality midcap compounders"
        />
      </Card>
    </div>
  );
}


// ── Portfolio ─────────────────────────────────────────────────────────────────
function parseZerodhaCSV(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];
  const header = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
  const col = (row, ...names) => {
    for (const name of names) {
      const idx = header.findIndex(h => h.includes(name));
      if (idx !== -1) return row[idx]?.replace(/"/g, '').trim() || '';
    }
    return '';
  };
  return lines.slice(1).map(line => {
    const row = line.split(',');
    const stock = col(row, 'instrument', 'symbol', 'stock', 'tradingsymbol');
    const qty = parseFloat(col(row, 'quantity', 'qty')) || 0;
    const avg = parseFloat(col(row, 'avg', 'average')) || 0;
    const ltp = parseFloat(col(row, 'ltp', 'last price', 'current')) || avg;
    if (!stock || qty === 0) return null;
    return { stock, qty, avg: Math.round(avg * 100) / 100, ltp: Math.round(ltp * 100) / 100, signal: 'HOLD' };
  }).filter(Boolean);
}

function getStockNews(stock, newsList) {
  return newsList.filter(n => n.stocks.some(s => s.toUpperCase() === stock.toUpperCase()));
}

function getStockFlag(stock, newsList, earnings) {
  const earning = earnings.find(e => e.co.toUpperCase().includes(stock.toUpperCase()));
  if (earning?.signal === 'MISS') return { type: 'MISS', msg: earning.guidance };
  const relNews = getStockNews(stock, newsList);
  if (relNews.length > 0) return { type: 'NEWS', msg: relNews[0].headline };
  return null;
}

export function Portfolio({ onSearch }) {
  const [holdings, setHoldings] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('ml_holdings') : null;
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [savedFileName, setSavedFileName] = useState(() => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem('ml_holdings_name') || '' : '';
    } catch { return ''; }
  });
  const [showUpload, setShowUpload] = useState(false);
  const [portInsight, setPortInsight] = useState('');
  const [portLoading, setPortLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const data = holdings || PORTFOLIO;
  const total = data.reduce((a, p) => a + p.qty * p.ltp, 0);
  const cost = data.reduce((a, p) => a + p.qty * p.avg, 0);
  const pnl = total - cost;

  const handleFile = (file) => {
    setUploadError('');
    if (!file || !file.name.endsWith('.csv')) {
      setUploadError('Please upload a .csv file from Zerodha Console.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseZerodhaCSV(e.target.result);
      if (parsed.length === 0) {
        setUploadError('Could not parse the CSV. Make sure it is the Holdings export from Zerodha Console.');
        return;
      }
      setHoldings(parsed);
      setSavedFileName(file.name);
      setShowUpload(false);
      setPortInsight('');
      try {
        localStorage.setItem('ml_holdings', JSON.stringify(parsed));
        localStorage.setItem('ml_holdings_name', file.name);
      } catch {}
    };
    reader.readAsText(file);
  };

  const clearHoldings = () => {
    setHoldings(null);
    setSavedFileName('');
    setPortInsight('');
    setShowUpload(false);
    try {
      localStorage.removeItem('ml_holdings');
      localStorage.removeItem('ml_holdings_name');
    } catch {}
  };

  const getInsight = async () => {
    setPortLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Analyze this Zerodha portfolio and give actionable insights. Cross-reference each holding with: current sector signal, FII flow, earnings result, PE vs sector avg. Which positions to add to, which to exit, and what is missing? Be specific with rupee targets.',
          context: JSON.stringify({ holdings: data, sectors: SECTORS, earnings: EARNINGS, fii: FII_TODAY, news: NEWS }),
        }),
      });
      const d = await res.json();
      setPortInsight(d.text || d.error || 'No response');
    } catch { setPortInsight('Could not load analysis.'); }
    setPortLoading(false);
  };

  const UploadZone = () => (
    <div>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>
        Export from Zerodha Console &rarr; Portfolio &rarr; Holdings &rarr; Download CSV
      </div>
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById('csv-input').click()}
        style={{ border: '2px dashed ' + (dragOver ? '#1a6fc4' : '#d1d5db'), borderRadius: 10, padding: '20px 16px', textAlign: 'center', background: dragOver ? '#f0f7ff' : '#f9fafb', cursor: 'pointer' }}
      >
        <div style={{ fontSize: 24, marginBottom: 6 }}>📄</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Drop your Zerodha CSV here or click to browse</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>Saved automatically in browser - no re-uploading after first time</div>
        <input id="csv-input" type="file" accept=".csv" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>
      {uploadError && <div style={{ marginTop: 8, fontSize: 12, color: '#d94040', background: '#fce8e8', padding: '8px 12px', borderRadius: 8 }}>{'Warning: ' + uploadError}</div>}
      {holdings && (
        <button onClick={() => setShowUpload(false)} style={{ marginTop: 8, fontSize: 12, padding: '5px 12px', borderRadius: 6, border: '0.5px solid #d1d5db', background: 'white', color: '#6b7280', cursor: 'pointer' }}>
          Cancel
        </button>
      )}
    </div>
  );

  return (
    <div>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <CardTitle icon="📂">Zerodha holdings</CardTitle>
          {holdings && !showUpload && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowUpload(true)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid #1a6fc4', background: '#e8f1fc', color: '#1a6fc4', cursor: 'pointer' }}>
                Update holdings
              </button>
              <button onClick={clearHoldings} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid #d1d5db', background: 'white', color: '#d94040', cursor: 'pointer' }}>
                Clear
              </button>
            </div>
          )}
        </div>

        {holdings && !showUpload ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#e6f7ef', borderRadius: 8 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <div>
              <div style={{ fontSize: 13, color: '#0e6b3d', fontWeight: 500 }}>{savedFileName || 'Holdings'} · {holdings.length} stocks loaded</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Auto-saved in browser · Switch tabs freely, data persists · Click "Update holdings" to refresh</div>
            </div>
          </div>
        ) : (
          <UploadZone />
        )}

        {showUpload && <UploadZone />}

        {!holdings && !showUpload && (
          <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>Showing demo portfolio. Upload your CSV to see real holdings.</div>
        )}
      </Card>

      <Row cols={3}>
        <MetricCard label="Portfolio value" value={'Rs' + (total / 100000).toFixed(1) + 'L'} />
        <MetricCard label="Unrealised P&L" value={(pnl >= 0 ? '+' : '') + 'Rs' + Math.abs(pnl / 1000).toFixed(0) + 'k'} color={pnl >= 0 ? C.buy : C.sell} />
        <MetricCard label="Return %" value={(pnl >= 0 ? '+' : '') + ((pnl / cost) * 100).toFixed(1) + '%'} color={pnl >= 0 ? C.buy : C.sell} />
      </Row>

      <Card>
        <CardTitle icon="💼">Holdings · news · flags · click stock for AI analysis</CardTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Stock', 'Qty', 'Avg', 'LTP', 'P&L', 'Signal', 'News & flags'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => {
                const pl = (p.ltp - p.avg) * p.qty;
                const flag = getStockFlag(p.stock, NEWS, EARNINGS);
                const relNews = getStockNews(p.stock, NEWS);
                return (
                  <tr key={i} style={{ borderBottom: '0.5px solid #f9fafb', background: flag && flag.type === 'MISS' ? '#fff9f9' : 'white' }}>
                    <td style={{ padding: '8px 10px' }}>
                      <span onClick={() => onSearch && onSearch(p.stock)} style={{ fontWeight: 600, color: '#1a6fc4', cursor: 'pointer', textDecoration: 'underline' }}>
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ padding: '8px 10px' }}>{p.qty}</td>
                    <td style={{ padding: '8px 10px', color: '#6b7280' }}>Rs{p.avg}</td>
                    <td style={{ padding: '8px 10px' }}>Rs{p.ltp}</td>
                    <td style={{ padding: '8px 10px', color: pl >= 0 ? C.buy : C.sell, fontWeight: 500 }}>
                      {(pl >= 0 ? '+' : '') + 'Rs' + Math.abs(pl).toLocaleString()}
                    </td>
                    <td style={{ padding: '8px 10px' }}><Badge type={p.signal} /></td>
                    <td style={{ padding: '8px 10px', fontSize: 12 }}>
                      {flag && flag.type === 'MISS' && <div style={{ color: '#d94040', fontWeight: 500, marginBottom: 3 }}>{'Guidance miss: ' + flag.msg}</div>}
                      {relNews.map((n, j) => (
                        <div key={j} style={{ color: '#6b7280', marginBottom: 2 }}>{n.headline + ' · ' + n.time + ' ago'}</div>
                      ))}
                      {!flag && relNews.length === 0 && <span style={{ color: '#9ca3af' }}>No alerts</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <CardTitle icon="✦">Portfolio AI analysis</CardTitle>
          <button onClick={getInsight} disabled={portLoading} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8, border: '0.5px solid #1a6fc4', background: '#e8f1fc', color: '#1a6fc4', cursor: 'pointer', fontWeight: 500 }}>
            {portLoading ? 'Analyzing...' : 'Get AI analysis'}
          </button>
        </div>
        {portLoading && <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>Analyzing your portfolio against live market data...</div>}
        {portInsight
          ? <div style={{ fontSize: 13, color: '#1f2937', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: portInsight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
          : !portLoading && <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>Click "Get AI analysis" for a full cross-referenced read on your holdings.</div>
        }
      </Card>
    </div>
  );
}


// ── News ──────────────────────────────────────────────────────────────────────
export function NewsTab({ onSearch }) {
  return (
    <div>
      <Card>
        <CardTitle icon="📰">Live market news feed</CardTitle>
        {NEWS.map((n, i) => (
          <div key={i} style={{ padding: '8px 0', borderBottom: '0.5px solid #f3f4f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: n.stocks.length ? 6 : 0 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{n.headline}</span>
              <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>{n.time} ago</span>
            </div>
            {n.stocks.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {n.stocks.map(s => (
                  <span
                    key={s}
                    onClick={() => onSearch(s)}
                    style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: '#e8f1fc', color: '#1a6fc4', cursor: 'pointer', fontWeight: 500 }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 10 }}>
          Click any stock ticker to get full AI analysis · Sources: NSE, BSE, Economic Times, MoneyControl, Mint
        </div>
      </Card>
      <Card>
        <CardTitle icon="✦">AI news synthesis</CardTitle>
        <AIInsight
          prompt="Synthesize today's market news and extract the most actionable signals for an equity investor. What are the key macro themes? Which stock/sector-specific news is most impactful? Any news that contradicts current consensus? What should I be watching in the next 48 hours?"
          context={NEWS}
          title="news digest"
        />
      </Card>
    </div>
  );
}
