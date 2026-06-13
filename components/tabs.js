import { useState } from 'react';
import { Badge, Pct, Card, CardTitle, MetricCard, Row, TR, AIInsight, Divider, C } from './ui';
import { MARKET, SECTORS, FII_TODAY, BULK_DEALS, EARNINGS, MIDCAP, EM_MARKETS, PORTFOLIO, NEWS } from '../lib/data';

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
export function Global() {
  return (
    <div>
      <Row cols={2}>
        <Card>
          <CardTitle icon="🌍">Emerging market signals</CardTitle>
          {EM_MARKETS.map(m => (
            <div key={m.name} style={{ padding: '7px 0', borderBottom: '0.5px solid #f9fafb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontWeight: 500, fontSize: 13 }}>{m.flag} {m.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Pct val={m.chg} />
                  <Badge type={m.signal} />
                </span>
              </div>
              <span style={{ fontSize: 12, color: '#6b7280' }}>{m.note}</span>
            </div>
          ))}
        </Card>
        <Card>
          <CardTitle icon="📡">DXY & macro signals</CardTitle>
          {[
            { label: 'US Dollar Index (DXY)', val: '103.4', note: '↓ Weak dollar = EM positive' },
            { label: 'US 10Y yield', val: '4.28%', note: 'Stable — no EM outflow risk' },
            { label: 'Brent Crude', val: '$82.4/bbl', note: 'Elevated — India import watch' },
            { label: 'Gold', val: '$2,341', note: 'Safe haven bid — mild risk-off' },
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
          prompt="Scan global and emerging markets for: 1) Which EM countries have bottomed and offer 12–24 month return opportunity? 2) How does India compare on valuation vs Brazil, Vietnam, Korea? 3) What macro signals (DXY, yields, crude) affect India specifically right now? 4) Is this a good time to be overweight India vs other EMs?"
          context={{ em: EM_MARKETS, macro: { dxy: 103.4, us10y: 4.28, crude: 82.4, usdInr: 83.6 } }}
          title="global EM opportunity"
        />
      </Card>
    </div>
  );
}

// ── Midcap Gems ───────────────────────────────────────────────────────────────
export function MidcapGems({ onSearch }) {
  return (
    <div>
      <Card highlight>
        <CardTitle icon="💎"><span style={{ color: '#1a6fc4' }}>Midcap gems · ₹2,500–7,000 cr market cap</span></CardTitle>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
          Turnaround stories, sector bottom plays, and under-radar compounders. Click any row for full AI analysis.
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Company', 'Mcap (cr)', 'Sector', 'PE', 'PEG', 'Signal', 'FII stance', 'Thesis'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MIDCAP.map(m => (
                <tr key={m.name}
                  style={{ borderBottom: '0.5px solid #f9fafb', cursor: 'pointer' }}
                  onClick={() => onSearch(m.name)}
                >
                  <td style={{ padding: '8px 10px', fontWeight: 500, color: '#1a6fc4' }}>{m.name}</td>
                  <td style={{ padding: '8px 10px' }}>₹{m.mcap.toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontSize: 12, color: '#6b7280' }}>{m.sector}</td>
                  <td style={{ padding: '8px 10px' }}>{m.pe}x</td>
                  <td style={{ padding: '8px 10px', color: m.peg < 1 ? C.buy : C.hold, fontWeight: 500 }}>{m.peg}</td>
                  <td style={{ padding: '8px 10px' }}><Badge type={m.signal} /></td>
                  <td style={{ padding: '8px 10px', fontSize: 12 }}>{m.fii}</td>
                  <td style={{ padding: '8px 10px', fontSize: 12, color: '#6b7280' }}>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle icon="🔍">Turnaround filters</CardTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['PE below sector avg', 'PEG < 1', 'FII accumulating', 'Promoter buying', 'Guidance raised', '52w low to breakout', 'Sector tailwind', 'Strong order book', 'Margin expansion'].map(t => (
            <span key={t} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 99, border: '0.5px solid #d1d5db', color: '#374151', background: '#f9fafb' }}>{t}</span>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon="✦">AI midcap turnaround picks</CardTitle>
        <AIInsight
          prompt="Analyze the midcap segment (₹2500–7000 crore) for turnaround stories and hidden compounders in India. Which sectors within this range are bottoming? What do institutions look for in small/midcap turnarounds? Give a framework for picking midcap turnarounds and highlight the most compelling candidates — consider promoter buying, FII entry, order book recovery, and margin expansion."
          context={MIDCAP}
          title="midcap turnarounds"
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

  // Map common Zerodha column names
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
    const pnl = parseFloat(col(row, 'p&l', 'pnl', 'unrealised')) || (ltp - avg) * qty;
    if (!stock || qty === 0) return null;
    return { stock, qty, avg: Math.round(avg * 100) / 100, ltp: Math.round(ltp * 100) / 100, pnl: Math.round(pnl), signal: 'HOLD', alert: 'Upload complete — AI analysis pending.' };
  }).filter(Boolean);
}

export function Portfolio() {
  const [holdings, setHoldings] = useState(null); // null = show demo
  const [portInsight, setPortInsight] = useState('');
  const [portLoading, setPortLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [fileName, setFileName] = useState('');

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
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseZerodhaCSV(e.target.result);
      if (parsed.length === 0) {
        setUploadError('Could not parse the CSV. Make sure it is the Holdings export from Zerodha Console.');
        return;
      }
      setHoldings(parsed);
      setPortInsight('');
    };
    reader.readAsText(file);
  };

  const getInsight = async () => {
    setPortLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Analyze this Zerodha portfolio and give actionable insights. Cross-reference each holding with: current sector signal, FII flow, earnings result, PE vs sector avg. Which positions to add to, which to exit, and what is missing from my portfolio? Be specific with ₹ targets.',
          context: JSON.stringify({ holdings: data, sectors: SECTORS, earnings: EARNINGS, fii: FII_TODAY, news: NEWS }),
        }),
      });
      const d = await res.json();
      setPortInsight(d.text || d.error || 'No response');
    } catch (e) {
      setPortInsight('Could not load analysis.');
    }
    setPortLoading(false);
  };

  return (
    <div>
      {/* Upload card */}
      <Card style={{ marginBottom: 14 }}>
        <CardTitle icon="📂">Import Zerodha holdings</CardTitle>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
          Export from <strong>Zerodha Console</strong> → Portfolio → Holdings → Download CSV, then upload below.
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          style={{
            border: `2px dashed ${dragOver ? '#1a6fc4' : '#d1d5db'}`,
            borderRadius: 10,
            padding: '24px 16px',
            textAlign: 'center',
            background: dragOver ? '#f0f7ff' : '#f9fafb',
            transition: 'all 0.15s',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('csv-input').click()}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>
            {fileName ? `✅ ${fileName} uploaded` : 'Drop your Zerodha CSV here or click to browse'}
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Supports Zerodha Console holdings export (.csv)</div>
          <input
            id="csv-input"
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files[0])}
          />
        </div>

        {uploadError && (
          <div style={{ marginTop: 10, fontSize: 12, color: '#d94040', background: '#fce8e8', padding: '8px 12px', borderRadius: 8 }}>
            ⚠ {uploadError}
          </div>
        )}

        {holdings && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#1a9e5c', fontWeight: 500 }}>✅ {holdings.length} holdings loaded from your CSV</span>
            <button
              onClick={() => { setHoldings(null); setFileName(''); setPortInsight(''); }}
              style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid #d1d5db', background: 'white', color: '#6b7280', cursor: 'pointer' }}
            >
              Clear · use demo data
            </button>
          </div>
        )}

        {!holdings && (
          <div style={{ marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
            Currently showing demo portfolio. Upload your CSV to see real holdings.
          </div>
        )}
      </Card>

      <Row cols={3}>
        <MetricCard label="Portfolio value" value={`₹${(total / 100000).toFixed(1)}L`} />
        <MetricCard label="Unrealised P&L" value={`${pnl >= 0 ? '+' : ''}₹${Math.abs(pnl / 1000).toFixed(0)}k`} color={pnl >= 0 ? C.buy : C.sell} />
        <MetricCard label="Return %" value={`${pnl >= 0 ? '+' : ''}${((pnl / cost) * 100).toFixed(1)}%`} color={pnl >= 0 ? C.buy : C.sell} />
      </Row>

      <Card>
        <CardTitle icon="💼">Holdings with live signals</CardTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Stock', 'Qty', 'Avg cost', 'LTP', 'P&L', 'Signal', 'Note'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => {
                const pl = (p.ltp - p.avg) * p.qty;
                return (
                  <tr key={i} style={{ borderBottom: '0.5px solid #f9fafb' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 500 }}>{p.stock}</td>
                    <td style={{ padding: '8px 10px' }}>{p.qty}</td>
                    <td style={{ padding: '8px 10px', color: '#6b7280' }}>₹{p.avg}</td>
                    <td style={{ padding: '8px 10px' }}>₹{p.ltp}</td>
                    <td style={{ padding: '8px 10px', color: pl >= 0 ? C.buy : C.sell, fontWeight: 500 }}>
                      {pl >= 0 ? '+' : ''}₹{Math.abs(pl).toLocaleString()}
                    </td>
                    <td style={{ padding: '8px 10px' }}><Badge type={p.signal} /></td>
                    <td style={{ padding: '8px 10px', fontSize: 12, color: '#6b7280' }}>{p.alert}</td>
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
          <button
            onClick={getInsight}
            disabled={portLoading}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8, border: '0.5px solid #1a6fc4', background: '#e8f1fc', color: '#1a6fc4', cursor: 'pointer', fontWeight: 500 }}
          >
            {portLoading ? 'Analyzing…' : 'Refresh analysis ↗'}
          </button>
        </div>
        {portLoading && <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>Analyzing your portfolio against live market data…</div>}
        {portInsight ? (
          <div
            style={{ fontSize: 13, color: '#1f2937', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: portInsight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}
          />
        ) : !portLoading && (
          <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
            Click &quot;Get AI analysis&quot; above to analyze your portfolio.
          </div>
        )}
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
