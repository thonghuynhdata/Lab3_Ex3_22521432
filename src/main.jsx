import { StrictMode, useState } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PUBG_VN_SQUADS } from './telemetry.js';
import { PubgMatchTelemetry } from './components/PubgMatchTelemetry.jsx';
import './style.css';
function App(){
  const [squadId,setSquadId]=useState('te');
  const [loss,setLoss]=useState(true);
  const [requestDelayMs,setRequestDelayMs]=useState(1100);
  return <main className="shell"><header className="topbar"><p className="eyebrow">UIT • LAB 03 • EXERCISE 3</p><h1>PUBG Vietnam <span>Live Telemetry</span></h1><p className="subtitle">React 19 · Four-state radar · AbortController · Satellite retry</p><p className="student">Huynh Quoc Minh Thong — 22521432</p></header><section className="dashboard" aria-label="PUBG telemetry dashboard"><aside className="sidebar"><h2>Vietnam squads</h2><nav aria-label="Choose a squad">{PUBG_VN_SQUADS.map(s=><button key={s.id} type="button" aria-pressed={squadId===s.id} className={squadId===s.id?'squad selected':'squad'} onClick={()=>setSquadId(s.id)}><span>{s.id.toUpperCase()}</span><strong>{s.name}</strong><small>{s.map}</small></button>)}</nav><section className="settings"><h3>Simulation controls</h3><label className="check"><input type="checkbox" checked={loss} onChange={e=>setLoss(e.target.checked)}/> Simulate 35% packet loss</label><label className="delay" htmlFor="delay">Packet delay <output>{requestDelayMs}ms</output></label><input id="delay" type="range" min="500" max="3000" step="100" value={requestDelayMs} onChange={e=>setRequestDelayMs(Number(e.target.value))}/><p>Change squads rapidly to test cancellation. Disable packet loss to capture a successful feed reliably.</p></section></aside><section className="feed"><div className="feedtitle"><p className="eyebrow">RADAR OPERATIONS</p><span className="live-dot">SIMULATED DATA</span></div><PubgMatchTelemetry squadId={squadId} packetLossRate={loss?0.35:0} requestDelayMs={requestDelayMs}/><section className="instructions"><h3>Verification checklist</h3><ol><li>Select CES → TE → GE quickly (stale requests must abort)</li><li>Observe the fixed-height blue-zone skeleton</li><li>With packet loss enabled, Retry after an error</li><li>Use Network throttling and mobile viewport in DevTools</li></ol></section></section></section><footer>Educational demonstration • Not affiliated with KRAFTON or PUBG Esports</footer></main>
}
const root=document.getElementById('root');if(!root)throw new Error('Missing #root element');createRoot(root).render(<StrictMode><App/></StrictMode>);
