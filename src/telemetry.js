export const PUBG_VN_SQUADS = [
  { id:'ces', name:'Cerberus Esports', map:'Erangel', phase:'Phase 6', alive:4, kills:14, wwcdProb:'68%', status:'In Safe Zone' },
  { id:'te', name:'The Expendables', map:'Miramar', phase:'Phase 7', alive:4, kills:18, wwcdProb:'82%', status:'Holding High Ground' },
  { id:'ge', name:'Genius Esports', map:'Taego', phase:'Phase 5', alive:3, kills:9, wwcdProb:'41%', status:'Rotating Blue Zone' }
];
// A local deterministic-delay simulation: no official PUBG/KRAFTON API access.
export function fetchKraftonPubgTelemetry(squadId, { signal, packetLossRate=0.35, delayMs=1100 }={}) {
  return new Promise((resolve, reject) => {
    const squad = PUBG_VN_SQUADS.find(s=>s.id===squadId);
    if (!squad) { reject(new Error('Unknown squad')); return; }
    if (signal?.aborted) { reject(new DOMException('Aborted','AbortError')); return; }
    let settled=false;
    const cleanup=()=>signal?.removeEventListener('abort', onAbort);
    const onAbort=()=>{ if(settled)return; settled=true; clearTimeout(timer); cleanup(); reject(new DOMException('Aborted','AbortError')); };
    const timer=setTimeout(()=>{
      if(settled)return; settled=true; cleanup();
      if(Math.random()<packetLossRate) reject(new Error('Satellite packet timeout (simulated 35% packet loss).'));
      else resolve({ ...squad, receivedAt:new Date().toLocaleTimeString('en-GB') });
    },delayMs);
    signal?.addEventListener('abort', onAbort, {once:true});
  });
}
