import React from 'react';
import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../telemetry.js';

const emptyView={status:'IDLE',data:null,error:null};
export function PubgMatchTelemetry({ squadId='te', packetLossRate=0.35, requestDelayMs=1100 }) {
  const [view,setView]=useState(emptyView);
  const [retryTick,setRetryTick]=useState(0);
  useEffect(()=>{
    const controller=new AbortController();
    setView({status:'LOADING',data:null,error:null});
    fetchKraftonPubgTelemetry(squadId,{signal:controller.signal,packetLossRate,delayMs:requestDelayMs})
      .then(data=>{if(!controller.signal.aborted)setView({status:'SUCCESS',data,error:null});})
      .catch(error=>{
        if(error.name==='AbortError' || controller.signal.aborted)return;
        setView({status:'ERROR',data:null,error:error.message});
      });
    return ()=>controller.abort();
  },[squadId,retryTick,packetLossRate,requestDelayMs]);
  if(view.status==='LOADING')return <section className="radar skeleton" aria-busy="true" aria-label="Loading squad telemetry"><span className="pulse" aria-hidden="true"/><h2>Syncing KRAFTON Radar…</h2><p>Acquiring satellite packets and squad position</p></section>;
  if(view.status==='ERROR')return <section className="radar error" role="alert"><span className="status-dot"/> <p className="eyebrow">CONNECTION LOST</p><h2>Blue-Zone Link Lost</h2><p>{view.error}</p><button type="button" onClick={()=>setRetryTick(n=>n+1)}>Reconnect Satellite (Retry)</button></section>;
  if(view.status==='SUCCESS')return <article className="radar success" aria-live="polite"><p className="eyebrow">LIVE FEED · {view.data.receivedAt}</p><h2>{view.data.name}</h2><p className="game-status">{view.data.status}</p><dl className="stats"><div><dt>Map</dt><dd>{view.data.map}</dd></div><div><dt>Match phase</dt><dd>{view.data.phase}</dd></div><div><dt>Players alive</dt><dd>{view.data.alive}/4</dd></div><div><dt>Squad kills</dt><dd>{view.data.kills}</dd></div><div><dt>WWCD probability*</dt><dd>{view.data.wwcdProb}</dd></div></dl><p className="footnote">*Illustrative simulated telemetry, not real esports results.</p></article>;
  return <section className="radar"><h2>Radar standing by</h2><p>Select a squad to connect.</p></section>;
}
