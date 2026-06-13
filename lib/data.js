export const DATA_UPDATED = 'Jun 14, 2026 · 9:30 AM IST';

export const MARKET = {
  nifty: { val: 24762, chg: 0.82 },
  sensex: { val: 81403, chg: 0.76 },
  midcap: { val: 18341, chg: -0.21 },
  vix: { val: 13.4, avg: 18.2 },
  spCorr: 0.71,
  sp500: { val: 5432, chg: 0.34 },
};

export const SECTORS = [
  { name: 'IT', chg: 6.2, pe: 28, peg: 1.4, fii: 14200, signal: 'BUY', note: 'Breakout forming' },
  { name: 'Pharma', chg: 4.8, pe: 22, peg: 0.8, fii: 9800, signal: 'BUY', note: 'Bottom formed' },
  { name: 'FMCG', chg: 3.1, pe: 46, peg: 2.1, fii: 4100, signal: 'HOLD', note: 'Defensive play' },
  { name: 'Private Banks', chg: 2.4, pe: 14, peg: 0.9, fii: 7100, signal: 'BUY', note: 'Value zone' },
  { name: 'Auto', chg: 1.4, pe: 19, peg: 1.1, fii: -1200, signal: 'HOLD', note: 'Watch support' },
  { name: 'Capital Goods', chg: 0.8, pe: 38, peg: 1.8, fii: 2200, signal: 'HOLD', note: 'Premium priced' },
  { name: 'PSU Banks', chg: -1.1, pe: 9, peg: 0.7, fii: -3100, signal: 'HOLD', note: 'FII selling' },
  { name: 'Metals', chg: -2.8, pe: 9, peg: 0.6, fii: -3400, signal: 'WATCH', note: 'China risk' },
  { name: 'Realty', chg: -4.3, pe: 52, peg: 3.1, fii: -5200, signal: 'SELL', note: 'Peak signals' },
  { name: 'Telecom', chg: -1.9, pe: 31, peg: 2.2, fii: -800, signal: 'HOLD', note: 'ARPU watch' },
];

export const FII_TODAY = { fii: 2841, dii: -1204 };

export const BULK_DEALS = [
  { buyer: 'Govt Pension Fund Global', stock: 'INFY', qty: '8.2L', val: 1840, side: 'BUY' },
  { buyer: 'Invesco Asset Mgmt', stock: 'HDFCBANK', qty: '12.1L', val: 2100, side: 'BUY' },
  { buyer: 'BlackRock', stock: 'SUNPHARMA', qty: '5.4L', val: 1020, side: 'BUY' },
  { buyer: 'Morgan Stanley', stock: 'DLF', qty: '9.8L', val: 870, side: 'SELL' },
  { buyer: 'ICICI Pru MF', stock: 'RELIANCE', qty: '3.1L', val: 920, side: 'BUY' },
];

export const EARNINGS = [
  { co: 'Infosys Q4', result: 'PAT Rs6,368 cr', vs: 'est Rs6,180 cr', signal: 'BEAT', guidance: 'Raised to 4.5-7% growth' },
  { co: 'Wipro Q4', result: 'Rev $2.63B', vs: 'est $2.71B', signal: 'MISS', guidance: 'Missed 1-3% guidance' },
  { co: 'Sun Pharma Q4', result: 'PAT Rs2,811 cr', vs: 'est Rs2,740 cr', signal: 'BEAT', guidance: 'US generic pipeline strong' },
  { co: 'Tata Motors Q4', result: 'PAT Rs17,407 cr', vs: 'est Rs19,200 cr', signal: 'MISS', guidance: 'JLR volumes below guidance' },
  { co: 'HDFC Bank Q4', result: 'NII Rs29,077 cr', vs: 'est Rs29,100 cr', signal: 'INLINE', guidance: 'NIM at 3.5%, stable' },
  { co: 'Asian Paints Q4', result: 'PAT Rs1,170 cr', vs: 'est Rs1,320 cr', signal: 'MISS', guidance: 'Volume growth missed 8% target' },
  { co: "Divi's Labs Q4", result: 'PAT Rs530 cr', vs: 'est Rs480 cr', signal: 'BEAT', guidance: 'Raised FY26 margin guidance' },
];

// Expanded midcap list with quality filters (ROE/ROCE > 20%, PAT growth > 20% for 5yr)
export const MIDCAP = [
  // Quality compounders (ROE & ROCE > 20%, PAT CAGR > 20%)
  { name: 'Cholamandalam Inv', mcap: 6800, sector: 'NBFC', pe: 22, peg: 0.9, roe: 24, roce: 21, patCagr: 28, signal: 'BUY', note: 'Best-in-class NBFC, AUM CAGR 25%', fii: 'Strong buy', quality: true },
  { name: 'Tube Investments', mcap: 5800, sector: 'Engineering', pe: 38, peg: 1.4, roe: 26, roce: 32, patCagr: 31, signal: 'BUY', note: 'EV component play, diversified biz', fii: 'Accumulating', quality: true },
  { name: 'Garware Tech Fibres', mcap: 3200, sector: 'Specialty Chemicals', pe: 24, peg: 0.8, roe: 28, roce: 34, patCagr: 22, signal: 'BUY', note: 'Global niche leader, export moat', fii: 'Buying', quality: true },
  { name: 'Suprajit Engineering', mcap: 2800, sector: 'Auto Ancillary', pe: 19, peg: 0.7, roe: 22, roce: 28, patCagr: 21, signal: 'TURNAROUND', note: 'Cable systems global #1, margin recovery', fii: 'Accumulating', quality: true },
  { name: 'Alkyl Amines', mcap: 3600, sector: 'Specialty Chemicals', pe: 28, peg: 1.0, roe: 31, roce: 38, patCagr: 24, signal: 'BUY', note: 'Aliphatic amines monopoly, import substitution', fii: 'Buying', quality: true },
  { name: 'Elecon Engineering', mcap: 4100, sector: 'Capital Goods', pe: 21, peg: 0.8, roe: 25, roce: 30, patCagr: 35, signal: 'BUY', note: 'Industrial gearbox market leader, order book surge', fii: 'Strong buy', quality: true },
  { name: 'Aether Industries', mcap: 4800, sector: 'Specialty Chemicals', pe: 32, peg: 1.1, roe: 21, roce: 26, patCagr: 29, signal: 'WATCH', note: 'Complex chemistry, pharma intermediates', fii: 'Watching', quality: true },
  { name: 'Pitti Engineering', mcap: 2600, sector: 'Capital Goods', pe: 16, peg: 0.6, roe: 23, roce: 27, patCagr: 42, signal: 'TURNAROUND', note: 'Lamination stacks, EV & defence orders', fii: 'Buying', quality: true },
  { name: 'Shyam Metalics', mcap: 5200, sector: 'Metals', pe: 11, peg: 0.5, roe: 20, roce: 24, patCagr: 22, signal: 'VALUE', note: 'Integrated steel, debt-free, cheap PE', fii: 'Accumulating', quality: true },
  { name: 'Anupam Rasayan', mcap: 3900, sector: 'Specialty Chemicals', pe: 26, peg: 0.9, roe: 22, roce: 25, patCagr: 26, signal: 'BUY', note: 'Long-term CRAMS contracts, agrochemicals', fii: 'Buying', quality: true },
  // Turnarounds
  { name: 'Gabriel India', mcap: 3200, sector: 'Auto Ancillary', pe: 18, peg: 0.7, roe: 18, roce: 22, patCagr: 15, signal: 'TURNAROUND', note: 'EV platform wins, FII entry', fii: 'Accumulating', quality: false },
  { name: 'Aarti Drugs', mcap: 4800, sector: 'Pharma API', pe: 14, peg: 0.6, roe: 16, roce: 19, patCagr: 12, signal: 'BOTTOM', note: 'API export recovery, margin expansion', fii: 'Buying', quality: false },
  { name: 'MTAR Technologies', mcap: 3900, sector: 'Defence/Space', pe: 45, peg: 1.8, roe: 19, roce: 22, patCagr: 38, signal: 'BUY', note: 'ISRO & nuclear order book Rs800cr', fii: 'Strong buy', quality: false },
  { name: 'Syrma SGS Tech', mcap: 4200, sector: 'Electronics Mfg', pe: 32, peg: 1.1, roe: 17, roce: 20, patCagr: 44, signal: 'TURNAROUND', note: 'PLI beneficiary, EMS demand surge', fii: 'Buying', quality: false },
  { name: 'Thyrocare Tech', mcap: 2700, sector: 'Diagnostics', pe: 21, peg: 0.9, roe: 15, roce: 18, patCagr: 10, signal: 'BOTTOM', note: 'Consolidation done, margin recovery', fii: 'Accumulating', quality: false },
  { name: 'Tanla Platforms', mcap: 3600, sector: 'CPaaS/Tech', pe: 12, peg: 0.5, roe: 28, roce: 35, patCagr: 18, signal: 'VALUE', note: 'Cash rich, buyback signals', fii: 'Watching', quality: true },
  { name: 'Praj Industries', mcap: 6100, sector: 'Green Energy', pe: 28, peg: 1.2, roe: 24, roce: 29, patCagr: 25, signal: 'WATCH', note: 'Ethanol policy tailwind', fii: 'Neutral', quality: true },
  { name: 'Olectra Greentech', mcap: 4500, sector: 'EV Buses', pe: 38, peg: 1.3, roe: 18, roce: 21, patCagr: 55, signal: 'BUY', note: 'Electric bus monopoly, state orders Rs2,400cr', fii: 'Buying', quality: false },
  { name: 'Epigral', mcap: 3100, sector: 'Specialty Chemicals', pe: 15, peg: 0.6, roe: 22, roce: 28, patCagr: 30, signal: 'TURNAROUND', note: 'Chlor-alkali expansion, downstream integration', fii: 'Accumulating', quality: true },
  { name: 'Gland Pharma', mcap: 6700, sector: 'Pharma', pe: 19, peg: 0.8, roe: 16, roce: 19, patCagr: 14, signal: 'BOTTOM', note: 'Injectable generics US recovery, injectables niche', fii: 'Buying', quality: false },
  { name: 'Sandur Manganese', mcap: 2900, sector: 'Mining/Metals', pe: 8, peg: 0.4, roe: 31, roce: 38, patCagr: 28, signal: 'VALUE', note: 'Captive mines, steel integration thesis', fii: 'Watching', quality: true },
  { name: 'Shivalik Bimetal', mcap: 2600, sector: 'Specialty Metals', pe: 22, peg: 0.8, roe: 26, roce: 32, patCagr: 23, signal: 'BUY', note: 'Bimetal strips, EV & smart meter demand', fii: 'Buying', quality: true },
  { name: 'Kaynes Technology', mcap: 5900, sector: 'Electronics Mfg', pe: 58, peg: 1.9, roe: 18, roce: 20, patCagr: 62, signal: 'WATCH', note: 'IoT/EMS premium, defence & aerospace', fii: 'Neutral', quality: false },
  { name: 'Supriya Lifescience', mcap: 2500, sector: 'Pharma API', pe: 16, peg: 0.6, roe: 24, roce: 29, patCagr: 26, signal: 'BUY', note: 'API niche antihistamines, US filing pipeline', fii: 'Accumulating', quality: true },
  { name: 'Tarsons Products', mcap: 2700, sector: 'Lab Consumables', pe: 28, peg: 1.0, roe: 21, roce: 26, patCagr: 21, signal: 'BUY', note: 'Lab plasticware, import substitution play', fii: 'Buying', quality: true },
];

export const EM_MARKETS = [
  { flag: 'BR', name: 'Brazil IBOV', country: 'Brazil', val: 128400, chg: 1.2, signal: 'ACCUMULATE', note: 'Rate cut cycle, commodity upswing. Petrobras dividend yield 12%. Bovespa at 8x PE — historically cheap.', pe: 8, usd: -4.2 },
  { flag: 'VN', name: 'Vietnam VN30', country: 'Vietnam', val: 1248, chg: 0.8, signal: 'BOTTOM', note: 'Double bottom forming. FDI manufacturing inflow ($18B YTD). Apple/Samsung supply chain shift from China.', pe: 11, usd: -2.1 },
  { flag: 'ID', name: 'Indonesia IDX', country: 'Indonesia', val: 7320, chg: 0.3, signal: 'WATCH', note: 'Election done, Prabowo presidency policy clarity. Nickel EV play. Commodity tailwind.', pe: 13, usd: -6.8 },
  { flag: 'KR', name: 'Korea KOSPI', country: 'South Korea', val: 2780, chg: -0.4, signal: 'WATCH', note: 'Semiconductor recovery. Samsung + SK Hynix HBM ramp. But USD/KRW headwind and geopolitical risk.', pe: 10, usd: -3.4 },
  { flag: 'MX', name: 'Mexico IPC', country: 'Mexico', val: 52100, chg: 1.1, signal: 'ACCUMULATE', note: 'Nearshoring boom. US-Mexico trade up 22% YoY. Peso stable. Manufacturing capex surge.', pe: 12, usd: 8.2 },
  { flag: 'CN', name: 'China CSI 300', country: 'China', val: 3610, chg: -0.8, signal: 'CAUTION', note: 'Property drag persists. Stimulus tepid. Deflationary spiral. But tech sector cheap at 14x PE.', pe: 14, usd: 2.1 },
  { flag: 'TH', name: 'Thailand SET', country: 'Thailand', val: 1380, chg: -0.6, signal: 'HOLD', note: 'Tourism recovery stalling at 80% of 2019. Political uncertainty. Export growth slowing.', pe: 15, usd: -5.1 },
  { flag: 'PH', name: 'Philippines PSEi', country: 'Philippines', val: 6820, chg: 0.4, signal: 'WATCH', note: 'BPO sector resilient. Young demographics. But high inflation and current account deficit.', pe: 14, usd: -3.2 },
];

export const PORTFOLIO = [
  { stock: 'HDFCBANK', qty: 50, avg: 1480, ltp: 1720, signal: 'HOLD', alert: 'FII accumulating. Hold with trailing SL at Rs1,620.' },
  { stock: 'WIPRO', qty: 100, avg: 480, ltp: 442, signal: 'REVIEW', alert: 'Q4 miss + guidance miss. Re-evaluate thesis.' },
  { stock: 'DLF', qty: 30, avg: 720, ltp: 890, signal: 'ALERT', alert: 'Realty sector at PE 52x — peak signal. Consider partial exit.' },
  { stock: 'SUNPHARMA', qty: 40, avg: 1150, ltp: 1610, signal: 'HOLD', alert: 'Strong Q4, guidance raised. Hold.' },
  { stock: 'TATAMOTORS', qty: 25, avg: 880, ltp: 1020, signal: 'WATCH', alert: 'JLR miss guidance. Watch next quarter commentary.' },
];

export const NEWS = [
  { time: '12m', headline: 'Nifty IT index up 1.4% as FIIs log Rs1,200 cr buy in morning session', stocks: ['INFY', 'TCS', 'HCLTECH'] },
  { time: '38m', headline: 'RBI holds repo at 6.5%; dovish tone signals possible Aug cut', stocks: ['HDFCBANK', 'SBIN', 'ICICIBANK'] },
  { time: '1h', headline: 'Sun Pharma gets USFDA nod for key dermatology drug', stocks: ['SUNPHARMA'] },
  { time: '1.5h', headline: 'Metals sector under pressure as China PMI disappoints at 48.8', stocks: ['TATASTEEL', 'HINDALCO', 'JSWSTEEL'] },
  { time: '2h', headline: 'Vietnam market forming double bottom — foreign funds rotate to EM frontier', stocks: [] },
  { time: '2.5h', headline: 'DLF Q4 bookings miss Rs4,500 cr guidance, actual at Rs3,800 cr', stocks: ['DLF', 'GODREJPROP'] },
  { time: '3h', headline: 'MTAR Technologies bags Rs320 cr ISRO order — third consecutive win', stocks: ['MTAR'] },
];
