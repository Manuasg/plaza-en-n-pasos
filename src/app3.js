/* ================= Render y acciones ================= */
function render(){
  const rt=parseHash(); const side=$('#side'), app=$('#app');
  if(!ME){ document.body.classList.add('noauth'); side.innerHTML=''; app.innerHTML=authHTML(UI.auth||'login'); return; }
  document.body.classList.remove('noauth');
  side.innerHTML=sideHTML(rt);
  const fn=V[rt.name]||V.inicio;
  let html; try{ html=fn(rt.arg, rt.q); }catch(e){ console.error(e); html=`<div class="note bad">Algo ha fallado al mostrar esta página. <a href="#/inicio">Volver al panel</a></div>`; }
  app.innerHTML=html; bindCharts(app); typeset(app); tick();
}
function tick(){
  document.querySelectorAll('.timer[data-t0]').forEach(el=>{ const s=Math.floor((Date.now()-(+el.dataset.t0))/1000); el.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); });
  document.querySelectorAll('.timer[data-end]').forEach(el=>{ const s=Math.max(0,Math.floor(((+el.dataset.end)-Date.now())/1000)); el.textContent=Math.floor(s/3600)+':'+String(Math.floor(s%3600/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
    if(s<=0 && UI.sim && UI.sim.stage==='exam'){ UI.sim.stage='grade'; toast('Se acabó el tiempo. Ahora, a corregir.'); render(); } });
}
setInterval(tick, 1000);
const closeMenu = () => document.body.classList.remove('menu-open');
const rkKey = key => key.startsWith('sim:') ? {p:byId(key.slice(4)), rk:(UI.sim.rk[key.slice(4)]=UI.sim.rk[key.slice(4)]||newRk())} : {p:byId(UI.pr.id), rk:UI.pr.rk};
function updRub(key){
  const {p, rk}=rkKey(key); const items=rkItems(p, rk); const d=itemsDims(items);
  RUBRIC.forEach(dm=>{ const el=document.querySelector(`[data-dsum="${key}|${dm.k}"]`); if(el) el.textContent=fmt2(d[dm.k])+' / '+dm.max; });
  const o=document.querySelector(`[data-dsum="${key}|orto"]`); if(o) o.textContent=rk.falt?'−'+fmt2(ortoPen(rk.falt)):'0';
  const t=document.querySelector(`[data-total="${key}"]`); if(t) t.textContent=rkDone(p,rk)?fmt2(itemsScore(items,rk.falt)):'—';
  if(key.startsWith('sim:')){ const sm=UI.sim; const tot=sm.ids.reduce((a,i)=>{ const q=byId(i); return a+(rkDone(q,sm.rk[i])?itemsScore(rkItems(q,sm.rk[i]),sm.rk[i].falt):0); },0)/sm.ids.length;
    const tt=document.querySelector('[data-total="sim"]'); if(tt) tt.textContent=fmt1(tot)+' / 10';
    const b=document.querySelector('[data-act="simSave"]'); if(b) b.disabled=!sm.ids.every(i=>rkDone(byId(i),sm.rk[i])); }
  else { const b=document.querySelector('[data-act="saveGrade"]'); if(b) b.disabled=!rkDone(p,rk); const pg=document.querySelector('[data-prog="pr"]'); if(pg) pg.textContent=rkProg(p,rk); }
}
function pressIn(el){ el.parentElement.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed', b===el)); }
function diagItem(d){
  const b=BK[d.i%5]; const it=DIAG.find(x=>x.b===b&&x.n===d.lv[b])||DIAG.find(x=>x.b===b);
  d.cur=it; d.order=shuffle(it.opts); d.picked=null;
}
const A = {
  menuOpen(){ document.body.classList.add('menu-open'); },
  menuClose(){ closeMenu(); },
  collapse(){ const c=!document.body.classList.contains('collapsed'); document.body.classList.toggle('collapsed', c); Store.set('ui.collapsed', c); setTimeout(render, 220); },
  tg(el){ const k=el.dataset.k; UI.open.has(k)?UI.open.delete(k):UI.open.add(k); Store.set('ui.open',[...UI.open]); $('#side').innerHTML=sideHTML(parseHash()); },
  subsB(el){ UI.subsB=el.dataset.v; render(); },
  evo(el){ UI.evo=+el.dataset.v; render(); },
  bf(el){ UI.bank[el.dataset.f]=el.dataset.v; render(); },
  murciaOnly(el){ const f=UI.pr.f; const qs=[f.b?'b='+f.b:'', f.sb?'sb='+f.sb:'', el.checked?'':'todo=1'].filter(Boolean).join('&'); go('#/practicar'+(qs?'?'+qs:'')); },
  hint(){ UI.pr.hints++; render(); },
  toGrade(){ UI.pr.secs=Math.round((Date.now()-UI.pr.t0)/1000); UI.pr.stage='grade'; render(); },
  skip(){ UI.pr.key=''; UI.pr.one=false; render(); },
  practiceOne(el){ go('#/practicar?id='+el.dataset.id); },
  mark(el){ const key=el.dataset.key, i=+el.dataset.i, v=+el.dataset.v; const {rk}=rkKey(key); rk.m[i]=v; pressIn(el);
    const n=el.closest('.ri').querySelector('.ri-n'); if(n){ n.classList.toggle('hidden', v>=1); } updRub(key); },
  markAll(el){ const key=el.dataset.key; const {p, rk}=rkKey(key); rubricFor(p).forEach((_,i)=>{ rk.m[i]=1; });
    const box=el.closest('.card'); box.querySelectorAll(`[data-act="mark"][data-key="${CSS.escape(key)}"]`).forEach(b=>b.setAttribute('aria-pressed', b.dataset.v==='1'));
    box.querySelectorAll(`.ri-n[data-key="${CSS.escape(key)}"]`).forEach(n=>n.classList.add('hidden')); updRub(key); },
  falt(el){ const key=el.dataset.key; const {rk}=rkKey(key); rk.falt=+el.dataset.v; pressIn(el); updRub(key); },
  saveGrade(){
    const pr=UI.pr; const p=byId(pr.id); const items=rkItems(p, pr.rk); const sc=itemsScore(items, pr.rk.falt);
    const res=applyResult(p.id, sc/10, {mode:'practica', dims:itemsDims(items), falt:pr.rk.falt, items, secs:pr.secs||0});
    const fails=items.filter(it=>it.v<1); if(fails.length) addErrors(fails.map(it=>({txt:it.t, dim:it.k, note:it.n, b:p.b, sb:p.sb})), p.id);
    pr.items=items; pr.res=res; pr.score=sc; pr.stage='done'; render(); window.scrollTo(0,0);
  },
  next(){ if(UI.pr.one){ UI.pr=null; go('#/practicar'); } else { UI.pr.key=''; render(); window.scrollTo(0,0); } },
  simStart(el){
    const e=MURCIA.find(x=>String(x.y)===el.dataset.y); const twin=!!el.dataset.twin;
    const ids=e.ids.map((id,i)=>{ if(!twin) return id; const g=bank().filter(p=>p.m==='gemelo'&&p.ref===`${e.y}-P${i+1}`); return g.length?g[Math.floor(Math.random()*g.length)].id:id; });
    UI.sim={y:e.y, ref:(twin?'Gemelos de Murcia ':'Murcia ')+e.y, ids, end:Date.now()+e.dur*60000, stage:'exam', rk:{}};
    go('#/simulacro'); window.scrollTo(0,0);
  },
  simEnd(){ UI.sim.stage='grade'; render(); window.scrollTo(0,0); },
  simSave(){
    const sm=UI.sim; let tot=0; sm.res=[];
    sm.ids.forEach(id=>{ const p=byId(id); const rk=sm.rk[id]; const items=rkItems(p, rk); const sc=itemsScore(items, rk.falt); tot+=sc;
      applyResult(id, sc/10, {mode:'simulacro', dims:itemsDims(items), falt:rk.falt, items});
      const fails=items.filter(it=>it.v<1); if(fails.length) addErrors(fails.map(it=>({txt:it.t, dim:it.k, note:it.n, b:p.b, sb:p.sb})), id);
      sm.res.push({id, items, falt:rk.falt, score:sc}); });
    sm.nota=tot/sm.ids.length; S.sims.push({d:Date.now(), nota:sm.nota, ref:sm.ref}); save(); sm.stage='done';
    toast('Simulacro guardado: '+fmt1(sm.nota)+' / 10'); render(); window.scrollTo(0,0);
  },
  simClose(){ UI.sim=null; go('#/murcia'); },
  goal(el){ const g={...goalOf(S)}; g[el.dataset.f]=el.dataset.v; if(el.dataset.f==='situ') g.hours=SITU[el.dataset.v][1]; g.set=true; S.goal=g; save(); render(); },
  diagStart(){ UI.diag={i:0, lv:Object.fromEntries(BK.map(b=>[b,4])), est:{}, ans:[]}; diagItem(UI.diag); render(); },
  diagPick(el){ const d=UI.diag; if(d.picked!=null) return; d.picked=+el.dataset.i; const ok=d.order[d.picked].ok; d.ans.push(ok);
    const b=BK[d.i%5], k=Math.floor(d.i/5);
    if(k===0) d.lv[b]=clamp(d.lv[b]+(ok?2:-2),1,7); else if(k===1) d.lv[b]=clamp(d.lv[b]+(ok?1:-1),1,7); else d.est[b]=clamp(d.lv[b]+(ok?.5:-.5),1,7);
    render(); },
  diagNext(){ const d=UI.diag; d.i++;
    if(d.i>=15){ BK.forEach(b=>{ S.ratings[b]={r:Math.round(800+200*(d.est[b]-1)), n:0}; }); S.diag={d:Date.now(), levels:{...d.est}}; S.snaps.push({d:Date.now(), R:curR(S)}); save(); }
    else diagItem(d);
    render(); window.scrollTo(0,0); },
  delProb(el){ Backend.deleteProblem(el.dataset.id); toast('Problema retirado del banco.'); go('#/banco'); },
  impSave(){ const list=parseProblems(UI.imp); const ids=new Set(bank().map(p=>p.id)); list.forEach(p=>{ if(ids.has(p.id)) p.id=p.id+'-'+uid().slice(0,4); });
    Backend.addProblems(list); UI.imp=''; toast(list.length+' problemas añadidos.'); go('#/banco'); },
  style(el){ Store.set('ui.style', el.dataset.v); document.body.dataset.style=el.dataset.v; render(); },
  export(){ const blob=new Blob([JSON.stringify({usuario:{name:ME.name,email:ME.email}, progreso:S},null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='escalera-murcia-'+dayKey(Date.now())+'.json'; document.body.appendChild(a); a.click(); a.remove(); },
  reset(el){ if(!UI.resetArm){ UI.resetArm=true; el.textContent='Pulsa otra vez para borrarlo todo'; setTimeout(()=>{ UI.resetArm=false; },5000); return; }
    UI.resetArm=false; S=freshState(); save(); UI.pr=null; toast('Progreso borrado.'); go('#/inicio'); },
  logout(){ Backend.logout(); ME=null; S=null; UI.pr=null; UI.sim=null; UI.diag=null; location.hash='#/inicio'; render(); },
  toRegister(){ UI.auth='register'; render(); },
  toLogin(){ UI.auth='login'; render(); },
  async demo(el){ try{ await seedDemo(); await login(await Backend.login(el.dataset.u,'demo1234')); }catch(e){ toast(e.message); } }
};
const CHG = {
  goalDate(el){ S.goal={...goalOf(S), date:el.value, set:true}; save(); render(); },
  goalHoursSave(el){ S.goal={...goalOf(S), hours:+el.value, set:true}; save(); render(); },
  bfSel(el){ UI.bank[el.dataset.f]=el.value; if(el.dataset.f==='b') UI.bank.sb=''; render(); }
};
const INP = {
  goalHours(el){ const v=$('#g-hv'); if(v) v.textContent=el.value; },
  rnote(el){ const {rk}=rkKey(el.dataset.key); rk.n[+el.dataset.i]=el.value; },
  imp(el){ UI.imp=el.value; const n=parseProblems(UI.imp).length; const b=document.querySelector('[data-act="impSave"]'); if(b){ b.disabled=!n; b.textContent='Añadir '+n+' '+(n===1?'problema':'problemas'); } }
};
async function login(u){ ME=u; S=Backend.loadState(u.id)||freshState(); if(!Backend.loadState(u.id)) save(); UI.auth=null; location.hash='#/inicio'; render(); window.scrollTo(0,0); }

document.addEventListener('click', ev=>{
  const el=ev.target.closest('[data-act],[data-go]'); if(!el) return;
  if(el.dataset.act){ const f=A[el.dataset.act]; if(!(el.tagName==='INPUT' && el.type==='checkbox')){ ev.preventDefault(); ev.stopPropagation(); } if(f) f(el, ev); return; }
  if(el.dataset.go){ ev.preventDefault(); closeMenu(); go(el.dataset.go); }
});
document.addEventListener('change', ev=>{ const el=ev.target; if(el.dataset && el.dataset.change && CHG[el.dataset.change]) CHG[el.dataset.change](el); });
document.addEventListener('input', ev=>{ const el=ev.target; if(el.dataset && el.dataset.input && INP[el.dataset.input]) INP[el.dataset.input](el); });
document.addEventListener('submit', async ev=>{
  const f=ev.target.closest('form[data-form]'); if(!f) return; ev.preventDefault();
  const fd=Object.fromEntries(new FormData(f)); const err=$('#f-err');
  try{ const u = f.dataset.form==='login' ? await Backend.login(fd.email||'', fd.pass||'') : await Backend.register({name:fd.name||'', email:fd.email||'', pass:fd.pass||'', role:fd.role||'alumno', classCode:fd.classCode||''}); await login(u); }
  catch(e){ err.textContent=e.message; err.classList.remove('hidden'); }
});
document.addEventListener('keydown', ev=>{ if(ev.key==='Escape') closeMenu(); });
let rzT, rzW=window.innerWidth; window.addEventListener('resize', ()=>{ clearTimeout(rzT); rzT=setTimeout(()=>{ if(window.innerWidth!==rzW){ rzW=window.innerWidth; if(ME && document.querySelector('.chart')) render(); } }, 250); });
window.addEventListener('hashchange', ()=>{ closeMenu(); render(); window.scrollTo(0,0); });

(async function init(){
  try{ const qs=new URLSearchParams(location.search).get('estilo'); if(['editorial','starlight','resume'].includes(qs)) Store.set('ui.style',qs); }catch(e){}
  document.body.dataset.style=Store.get('ui.style','editorial');
  document.body.classList.toggle('collapsed', !!Store.get('ui.collapsed',false));
  await seedDemo();
  ME=Backend.current(); if(ME){ S=Backend.loadState(ME.id)||freshState(); }
  render();
})();
