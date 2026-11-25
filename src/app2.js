/* ================= Iconos ================= */
const IC = {
  home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  diag:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  play:'<path d="M7 5l12 7-12 7z"/>',
  murcia:'<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
  blocks:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  subs:'<path d="M5 6h14M8 12h11M11 18h8"/><circle cx="5" cy="12" r="1"/><circle cx="8" cy="18" r="1"/>',
  chart:'<path d="M4 20h16"/><path d="M5 16l4-5 4 3 6-8"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
  bank:'<path d="M5 4h11l3 3v13H5z"/><path d="M9 10h6M9 14h6"/>',
  up:'<path d="M12 19V6"/><path d="M6 11l6-6 6 6"/><path d="M5 20h14"/>',
  users:'<circle cx="9" cy="9" r="3"/><path d="M3 19c.8-3 3.2-5 6-5s5.2 2 6 5"/><path d="M16 6.5a3 3 0 010 5.5M18 14c1.6.7 2.6 2.4 3 5"/>',
  user:'<circle cx="12" cy="9" r="3.5"/><path d="M5 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5"/>',
  chev:'<path d="M9 6l6 6-6 6"/>',
  side:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M9 5v14"/>',
  check:'<path d="M5 12l4 4 10-10"/>',
  doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  gauge:'<path d="M4 16a8 8 0 1116 0"/><path d="M12 16l4-5"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>'
};
const ico = (k, cls='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${cls}">${IC[k]}</svg>`;
const MARK = `n<svg viewBox="0 0 18 18" aria-hidden="true"><rect x="0" y="12" width="5" height="5" rx="1" fill="#EFB153"/><rect x="6.5" y="6" width="5" height="5" rx="1" fill="#EFB153"/><rect x="13" y="0" width="5" height="5" rx="1" fill="#EFB153"/></svg>`;

/* ================= Presentación de datos ================= */
const BHEX={NU:'#C47F12',AL:'#7A63CF',AN:'#1F9A7E',GE:'#C9533A',PR:'#3D6FC2'};
const lvVal = r => 1 + (r-800)/200;               // 800 → 1 … 2000 → 7 (escala continua de la escalera)
const lvTxt = r => fmt1(clamp(lvVal(r), 0.5, 8));
const lvName = r => r>=2150 ? 'Nivel de plaza' : LEVELS[lvOf(r)-1].name;
const refLabel = ref => { const m=String(ref||'').match(/(\d{4})-([PC])(\d)([a-z]?)/); return m?`Murcia ${m[1]} · ${m[2]==='C'?'cuestión':'ejercicio'} ${m[3]}${m[4]}`:''; };
const dotb = b => `<i class="dotb" style="background:${bcol(b)}"></i>`;
const chipB = b => `<span class="chip">${dotb(b)}${esc(BLOQ[b].name)}</span>`;
const chipSub = id => { const s=subById(id); return s?`<span class="chip">${id} · ${esc(s.name)}</span>`:''; };
function chipOrigin(p){
  if(p.m==='oficial') return `<span class="chip of">${esc(refLabel(p.ref)||'Examen oficial de Murcia')}</span>`;
  if(p.m==='gemelo') return `<span class="chip ge">Gemelo · ${esc(refLabel(p.ref)||'Murcia')}</span>`;
  if(p.m==='estilo') return `<span class="chip">Estilo Murcia${p.ref?' · '+esc(refLabel(p.ref)):''}</span>`;
  return `<span class="chip">Preparación</span>`;
}
const chipLv = n => `<span class="chip">Nivel ${n} · ${esc(LEVELS[n-1].name)}</span>`;
const STATUS = {ok:['st-ok','Nivel Murcia'], warn:['st-warn','Cerca'], bad:['st-bad','Lejos'], new:['st-new','Sin datos']};
const pill = st => `<span class="pill-status ${STATUS[st][0]}">${STATUS[st][1]}</span>`;
function bulletHTML(r, tR, b){
  const max=7.6, v=clamp(lvVal(r),0,max), t=clamp(lvVal(tR),0,max);
  return `<div class="bullet" role="img" aria-label="Nivel ${lvTxt(r)} de 7; objetivo ${lvTxt(tR)}"><i style="width:${v/max*100}%;background:${bcol(b)}"></i><b style="left:calc(${t/max*100}% - 1px)"></b></div>`;
}
/* Comentarios y erratas: abren una incidencia del repositorio con el ID del problema ya escrito (sin servidor). */
const FB_REPO='https://github.com/Manuasg/escalera-murcia/issues/new';
const fbUrl=(title,body)=>FB_REPO+'?title='+encodeURIComponent(title)+'&body='+encodeURIComponent(body);
const errataUrl=p=>fbUrl('Errata en '+p.id+' · '+p.ti, `**Problema:** ${p.id} (${p.ti})\n**Dónde está el error:** enunciado / pista / solución / rúbrica (borra lo que no aplique)\n\n**Qué dice ahora:**\n\n**Qué debería decir:**\n`);
const comentUrl=()=>fbUrl('Comentario sobre la web', `**Qué estabas haciendo:**\n\n**Qué ha pasado o qué echas en falta:**\n\n**Dispositivo (móvil, tablet, ordenador):**\n`);
const etaTxt = pm => pm.gapW<=0 ? 'Ya estás en tu objetivo' : (pm.etaOk&&pm.etaLo ? 'Entre '+fshort(pm.etaLo)+' y '+fshort(pm.etaHi) : 'Aún sin datos');
/* La nota se muestra como rango: el margen se estrecha con los problemas corregidos (las notas son autoevaluadas y los parámetros aún se están calibrando). */
function notaRango(S){ const sm=summary(S); const n=S.hist.length+(S.diag?4:0); const w=Math.max(0.75, 2/Math.sqrt(1+n/4)); const lo=Math.max(0,Math.floor(sm.nota-w)), hi=Math.min(10,Math.ceil(sm.nota+w)); return {nota:sm.nota, lo, hi, txt:(lo===hi?String(lo):lo+'–'+hi).replace('.',','), w}; }

/* ================= Gráficos (SVG con tooltip) ================= */
const CH = {};
function niceTicks(a, b, n=5){ const step0=(b-a)/n; const p=Math.pow(10,Math.floor(Math.log10(step0))); const m=[1,2,2.5,5,10].find(x=>x*p>=step0)*p; const out=[]; for(let v=Math.ceil(a/m)*m; v<=b+1e-9; v+=m) out.push(+v.toFixed(6)); return out; }
function chartW(full){ const vw=window.innerWidth||1200; if(vw<900) return Math.max(320, vw-72); const main=Math.min(1160, vw-(document.body.classList.contains('collapsed')?76:268))-64; return Math.round(full?main-44:(main-18)/2-44); }
function lineChart(id, {series, yMin, yMax, yTicks, yFmt=fmt1, target=null, target2=null, h=250, tipFmt, full=false}){
  const W=chartW(full), H=Math.round(h*(W<480?.85:1)), L=W<480?52:58, R=W<480?70:96, T=14, B=28;
  const all=series.flatMap(s=>s.pts); if(!all.length) return `<div class="note">Aún no hay datos. Resuelve unos cuantos problemas y aquí verás tu evolución.</div>`;
  let x0=Math.min(...all.map(p=>p[0])), x1=Math.max(...all.map(p=>p[0])); if(x1-x0<DAY){ x0-=DAY; x1+=DAY; }
  const X=t=>L+(t-x0)/(x1-x0)*(W-L-R), Y=v=>T+(1-(v-yMin)/(yMax-yMin))*(H-T-B);
  const ticks=yTicks||niceTicks(yMin,yMax,4);
  let g=ticks.map(v=>`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#DCD2BF" stroke-width="1"/><text x="${L-8}" y="${Y(v)+4}" text-anchor="end" font-size="12" fill="#4a4f5c">${esc(yFmt(v))}</text>`).join('');
  const nx=Math.max(1, Math.min(6, Math.floor((W-L-R)/80), Math.round((x1-x0)/WEEK)));
  for(let i=0;i<=nx;i++){ const t=x0+(x1-x0)*i/nx; g+=`<text x="${X(t)}" y="${H-8}" text-anchor="middle" font-size="12" fill="#4a4f5c">${esc(fshort(t))}</text>`; }
  const tg = (tl, dy=0) => tl ? `<line x1="${L}" x2="${W-R}" y1="${Y(tl.v)}" y2="${Y(tl.v)}" stroke="#121721" stroke-width="1.5" stroke-dasharray="5 4"/><text x="${W-R+6}" y="${Y(tl.v)+4+dy}" font-size="12" font-weight="600" fill="#121721">${esc(tl.label)}</text>` : '';
  const paths=series.map(s=>{ const d=s.pts.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(clamp(p[1],yMin,yMax)).toFixed(1)).join(''); const lp=s.pts[s.pts.length-1];
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${X(lp[0])}" cy="${Y(clamp(lp[1],yMin,yMax))}" r="4" fill="${s.color}" stroke="#FBF7EF" stroke-width="2"/>`+(s.label?`<text x="${X(lp[0])+8}" y="${Y(clamp(lp[1],yMin,yMax))+4}" font-size="12" fill="#121721">${esc(s.label)}</text>`:''); }).join('');
  CH[id]={series, X, Y, x0, x1, L, R, W, H, T, B, yMin, yMax, tipFmt};
  const leg = series.length>1 ? `<div class="legend">${series.map(s=>`<span><i style="background:${s.color}"></i>${esc(s.name)}</span>`).join('')}${target?`<span><i style="background:#121721;height:2px"></i>${esc(target.label)}</span>`:''}</div>` : '';
  return `${leg}<div class="chart" data-chart="${id}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(series.map(s=>s.name).join(', '))}">${g}${tg(target, target2&&Math.abs(Y(target.v)-Y(target2.v))<14?(Y(target.v)<Y(target2.v)?-6:6):0)}${tg(target2, target2&&Math.abs(Y(target.v)-Y(target2.v))<14?(Y(target2.v)<Y(target.v)?-6:6):0)}${paths}<line class="xh" x1="0" x2="0" y1="${T}" y2="${H-B}" stroke="#121721" stroke-width="1" opacity="0"/><g class="hd"></g><rect class="hit" x="${L}" y="0" width="${W-L-R}" height="${H}" fill="transparent"/></svg><div class="tip"></div></div>`;
}
function barChart(id, {bars, yMax, h=190, color='var(--ink)', yFmt=v=>String(v), full=false}){
  const W=chartW(full), H=h, L=34, R=10, T=12, B=28; const n=bars.length; if(!n) return '';
  const bw=(W-L-R)/n; const Y=v=>T+(1-v/yMax)*(H-T-B);
  const ticks=niceTicks(0,yMax,3);
  let g=ticks.map(v=>`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#DCD2BF"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end" font-size="12" fill="#4a4f5c">${esc(yFmt(v))}</text>`).join('');
  g+=bars.map((b,i)=>{ const x=L+i*bw+bw*.22, w=bw*.56, y=Y(b.v), hh=Math.max(0,H-B-y);
    return `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="4" fill="${b.v?color:'transparent'}"/><text x="${x+w/2}" y="${H-9}" text-anchor="middle" font-size="12" fill="#4a4f5c">${esc(b.label)}</text><rect class="hb" data-i="${i}" x="${L+i*bw}" y="0" width="${bw}" height="${H}" fill="transparent"/>`; }).join('');
  CH[id]={bars, bar:true};
  return `<div class="chart" data-chart="${id}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Actividad">${g}</svg><div class="tip"></div></div>`;
}
function bindCharts(root){
  root.querySelectorAll('.chart[data-chart]').forEach(el=>{
    const c=CH[el.dataset.chart]; if(!c) return; const svg=el.querySelector('svg'); const tip=el.querySelector('.tip');
    const toLocal = ev => { const r=svg.getBoundingClientRect(); return {x:(ev.clientX-r.left)/r.width*c.W, sx:r.width/c.W, r}; };
    if(c.bar){
      svg.querySelectorAll('.hb').forEach(hb=>{ hb.addEventListener('mouseenter', ev=>{ const b=c.bars[+hb.dataset.i]; const er=el.getBoundingClientRect(), hr=hb.getBoundingClientRect(); tip.innerHTML=b.tip; tip.style.display='block'; tip.style.left=(hr.left-er.left+hr.width/2)+'px'; tip.style.top=(hr.top-er.top+40)+'px'; }); hb.addEventListener('mouseleave', ()=>tip.style.display='none'); });
      return;
    }
    const xh=svg.querySelector('.xh'), hd=svg.querySelector('.hd');
    const move = ev => {
      const {x, sx} = toLocal(ev.touches?ev.touches[0]:ev);
      const t=c.x0+(x-c.L)/(c.W-c.L-c.R)*(c.x1-c.x0);
      const ref=c.series[0].pts; let bi=0, bd=Infinity; ref.forEach((p,i)=>{ const d=Math.abs(p[0]-t); if(d<bd){ bd=d; bi=i; } });
      const tt=ref[bi][0]; const px=c.X(tt);
      xh.setAttribute('x1',px); xh.setAttribute('x2',px); xh.setAttribute('opacity','.35');
      const rows=c.series.map(s=>{ let q=s.pts[0]; s.pts.forEach(p=>{ if(Math.abs(p[0]-tt)<Math.abs(q[0]-tt)) q=p; }); return {s, v:q[1]}; });
      hd.innerHTML=rows.map(r=>`<circle cx="${px}" cy="${c.Y(clamp(r.v,c.yMin,c.yMax))}" r="4.5" fill="${r.s.color}" stroke="#FBF7EF" stroke-width="2"/>`).join('');
      tip.innerHTML=`<b>${esc(fdate(tt))}</b><br>`+rows.map(r=>`${c.series.length>1?`<i style="display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:6px;background:${r.s.color}"></i>`:''}${esc(r.s.name)}: ${esc((c.tipFmt||fmt1)(r.v))}`).join('<br>');
      tip.style.display='block'; const ew=el.clientWidth, tw=tip.offsetWidth||150; tip.style.transform='none'; tip.style.left=clamp(px*sx+12, 4, ew-tw-4)+(px*sx+12+tw>ew-4?0:0)+'px'; if(px*sx+12+tw>ew-4) tip.style.left=Math.max(4,px*sx-tw-12)+'px'; tip.style.top=(c.T*sx+6)+'px';
    };
    const leave = () => { xh.setAttribute('opacity','0'); hd.innerHTML=''; tip.style.display='none'; };
    const hit=svg.querySelector('.hit'); hit.addEventListener('mousemove', move); hit.addEventListener('touchstart', move, {passive:true}); hit.addEventListener('touchmove', move, {passive:true}); hit.addEventListener('mouseleave', leave);
  });
}
function dailySnaps(S, days=null){
  const now=Date.now(); const m=new Map();
  S.snaps.forEach(s=>{ if(!days || now-s.d<=days*DAY) m.set(dayKey(s.d), s); });
  return [...m.values()].sort((a,c)=>a.d-c.d);
}
function weekly(S, n=10){
  const now=Date.now(); const start=now-n*WEEK; const out=[];
  for(let i=0;i<n;i++){ const a=start+i*WEEK, b=a+WEEK; const hs=S.hist.filter(h=>h.d>=a&&h.d<b); const avg=hs.length?hs.reduce((x,h)=>x+h.s,0)/hs.length:0;
    out.push({v:hs.length, label:fshort(b-DAY).replace('.',''), tip:`Semana del ${fshort(a)}<br>${hs.length} problemas${hs.length?' · media '+fmt1(avg*10)+' / 10':''}`}); }
  return out;
}
function dimBars(prof, G){
  if(!prof) return `<div class="note">Cuando te corrijas con la rúbrica oficial verás aquí en qué dimensiones pierdes puntos.</div>`;
  const tgt=(G||5)/10;
  return `<div class="stack">${RUBRIC.map(d=>{ const v=prof[d.k]; const st=v>=tgt?'ok':v>=tgt-.15?'warn':'bad';
    return `<div><div class="row between small"><span><b>${esc(d.name)}</b> <span class="muted">· ${d.max} ${d.max>1?'puntos':'punto'}</span></span><span class="num">${fmt2(v*d.max)} / ${d.max} ${pill(st).replace(/>[^<]+</,'>'+(st==='ok'?'Bien':st==='warn'?'Mejorable':'Pierdes puntos')+'<')}</span></div>
    <div class="bullet" style="height:10px;margin-top:6px"><i style="width:${v*100}%;background:var(--ink)"></i><b style="left:calc(${tgt*100}% - 1px)"></b></div></div>`; }).join('')}
    <p class="tiny muted">La marca vertical es lo que necesitas en cada dimensión para tu objetivo (${fmt1(tgt*10)} / 10). Media de tus últimas ${prof._n} correcciones · ${fmt1(prof._falt)} faltas de ortografía por ejercicio.</p></div>`;
}

/* ================= Interfaz: estado de navegación ================= */
const UI = { open:new Set(Store.get('ui.open',['bloques'])), pr:null, sim:null, diag:null, bank:{b:'',sb:'',m:'',n:'',q:''}, subsB:'', evo:56, imp:'' };
function parseHash(){ const h=(location.hash||'#/inicio').slice(2); const [path, qs]=h.split('?'); const parts=path.split('/').filter(Boolean); const q={}; (qs||'').split('&').filter(Boolean).forEach(kv=>{ const [k,v]=kv.split('='); q[k]=decodeURIComponent(v||''); }); return {name:parts[0]||'inicio', arg:parts[1]||'', q}; }
const go = h => { if(location.hash===h) render(); else location.hash=h; };

function sideHTML(rt){
  const cur = n => rt.name===n ? ' aria-current="page"' : '';
  const it = (n, icon, label, href) => `<button class="nav-item" data-go="${href||'#/'+n}"${cur(n)} title="${esc(label)}">${ico(icon)}<span class="lbl">${esc(label)}</span></button>`;
  const openB = UI.open.has('bloques');
  const tree = BK.map(b=>{ const ob=UI.open.has('b-'+b); const curB = (rt.name==='bloque'&&rt.arg===b);
    const subs = subsOf(b).map(s=>`<button class="nav-item" data-go="#/sub/${s.id}"${rt.name==='sub'&&rt.arg===s.id?' aria-current="page"':''} title="${esc(s.name)}"><span class="lbl">${s.id} · ${esc(s.name)}</span></button>`).join('');
    return `<button class="nav-item" data-go="#/bloque/${b}"${curB?' aria-current="page"':''} aria-expanded="${ob}">${dotb(b)}<span class="lbl">${esc(BLOQ[b].name)}</span><span data-act="tg" data-k="b-${b}" role="button" aria-label="Desplegar subbloques de ${esc(BLOQ[b].name)}" style="display:flex">${ico('chev','chev')}</span></button>${ob?`<div class="tree">${subs}</div>`:''}`; }).join('');
  return `<div class="side-head"><div class="logo"><span class="mark">${MARK}</span><span class="wm"><b>Escalera Murcia</b><small>Oposición · Parte A</small></span></div>
    <button class="icon-btn collapse-btn" data-act="collapse" aria-label="Plegar o desplegar el menú" title="Plegar menú">${ico('side')}</button></div>
  <nav class="nav">
    <div class="nav-group">Estudiar</div>
    ${it('inicio','home','Panel')}
    ${it('practicar','play','Practicar')}
    ${it('murcia','murcia','Exámenes de Murcia')}
    ${it('diagnostico','diag','Prueba de nivel')}
    ${it('oficial','doc','Información oficial')}
    <div class="nav-group">Temario</div>
    <button class="nav-item" data-go="#/bloques"${cur('bloques')} aria-expanded="${openB}" title="Bloques">${ico('blocks')}<span class="lbl">Bloques</span><span data-act="tg" data-k="bloques" role="button" aria-label="Desplegar bloques" style="display:flex">${ico('chev','chev')}</span></button>
    ${openB?`<div class="tree">${tree}</div>`:''}
    ${it('subbloques','subs','Subbloques y temas')}
    ${it('banco','bank','Banco de problemas')}
    <div class="nav-group">Progreso</div>
    ${it('evolucion','chart','Evolución')}
    ${it('objetivos','target','Objetivos')}
    ${it('metodo','gauge','Cómo te medimos')}
    ${ME.role==='profesor'?`<div class="nav-group">Profesor</div>${it('alumnos','users','Alumnos')}${it('importar','up','Importar problemas')}`:''}
  </nav>
  <div class="side-foot"><span class="avatar">${esc(ME.name.trim()[0]||'?').toUpperCase()}</span><div class="who" style="min-width:0;flex:1"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(ME.name)}</b><button class="btn ghost sm" style="padding:0;min-height:0;color:var(--side-muted)" data-go="#/cuenta">Mi cuenta</button></div></div>`;
}

/* ================= Vistas ================= */
const V = {};
const head = (eyebrow, title, sub='', right='') => `<div class="page-head"><div><span class="eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1>${sub?`<p>${sub}</p>`:''}</div>${right?`<div class="row">${right}</div>`:''}</div>`;

V.inicio = () => {
  const sm=summary(S), g=goalOf(S), pm=progressModel(S), G=targetNota(S);
  const top=[]; BK.forEach(b=>{ const gp=gapsFor(S,b); gp.subs.slice(0,2).forEach(x=>{ if(x.status!=='ok') top.push({b, x, w:BLOQ[b].w*x.pri}); }); });
  top.sort((a,c)=>c.w-a.w);
  const ds=dailySnaps(S, 120);
  const tR=Rw(Object.fromEntries(BK.map(b=>[b,targetR(S,b)])));
  return `${head(new Date().toLocaleDateString('es-ES',{weekday:'long', day:'numeric', month:'long'}), 'Hola, '+ME.name.split(' ')[0], `Objetivo: <b>${esc(OBJ[g.type].name.toLowerCase())}</b>${g.date?` · examen previsto el ${esc(fdate(new Date(g.date).getTime()))}`:''}. ${g.set?'':'<a href="#/objetivos">Ajusta tu objetivo</a> para que las estimaciones sean tuyas.'}`, `<button class="btn primary" data-go="#/practicar">${ico('play')}Practicar ahora</button>`)}
  ${!S.diag?`<div class="note hi row between"><span><b>Empieza por la prueba de nivel.</b> Son 15 preguntas (unos 15 minutos) y sirven para colocarte en la escalera de cada bloque.</span><button class="btn primary sm" data-go="#/diagnostico">Hacer la prueba</button></div>`:''}
  <div class="kpis">
    <div class="kpi"><span class="l">Tu nivel global</span><span class="v">${lvTxt(Rw(sm.R))}<small> / 7</small></span><span class="d">${esc(lvName(Rw(sm.R)))}</span></div>
    <div class="kpi"><span class="l">Nota estimada hoy · parte A</span><span class="v">${notaRango(S).txt}<small> / 10</small></span><span class="d">Si el examen fuera hoy · ${S.hist.length<10?'estimación aún muy amplia':'se afina con cada corrección'}</span></div>
    <div class="kpi accent"><span class="l">Tu objetivo</span><span class="v">${fmt1(G)}<small> / 10</small></span><span class="d">${esc(OBJ[g.type].name)}</span></div>
    <div class="kpi"><span class="l">Llegada estimada</span><span class="v" style="font-size:1.3rem">${esc(etaTxt(pm))}</span><span class="d">${!pm.etaOk&&pm.gapW>0?'Hacen falta unas 3 semanas de práctica':pm.onTime===false?'Después del examen: revisa tu plan':pm.onTime?'Antes del examen':''}</span></div>
    <div class="kpi"><span class="l">Racha</span><span class="v">${sm.streak}<small> días</small></span><span class="d">${sm.solved} problemas superados</span></div>
  </div>
  <div class="grid g2">
    <section class="card"><div class="card-h"><h2>Tu subida hacia el nivel Murcia</h2><span class="sub">${pm.src==='datos'?`+${fmt2(pm.rate/200)} escalones por semana`:pm.src==='estancado'?'Sin subida en las últimas semanas':'Ritmo estimado con tus horas'}</span></div>
      ${lineChart('home-lv',{series:[{name:'Nivel global', color:'#121721', pts:ds.map(s=>[s.d, lvVal(Rw(s.R))])}], yMin:1, yMax:8, yTicks:[1,2,3,4,5,6,7], yFmt:v=>'Nivel '+v, target:{v:lvVal(tR), label:'Objetivo'}, tipFmt:v=>'nivel '+fmt1(v)})}
      <p class="small muted">Nivel 7 = resolver problemas del examen de Murcia con una nota de 5. Tu objetivo de ${fmt1(G)} exige estar en el ${lvTxt(tR)}. <a href="#/metodo">Cómo lo calculamos</a></p></section>
    <section class="card"><div class="card-h"><h2>Dónde estás en cada bloque</h2><a class="sub" href="#/bloques">Ver bloques</a></div>
      <div class="stack">${BK.map(b=>{ const r=S.ratings[b].r, t=targetR(S,b); return `<div class="click" data-go="#/bloque/${b}" style="cursor:pointer"><div class="row between small"><span>${dotb(b)} <b>${esc(BLOQ[b].name)}</b> <span class="muted">· ${Math.round(BLOQ[b].w*100)} % del examen</span></span><span class="num">nivel ${lvTxt(r)} → ${lvTxt(t)}</span></div><div style="margin-top:6px">${bulletHTML(r,t,b)}</div></div>`; }).join('')}
      <p class="tiny muted">La marca negra es el nivel que necesitas en ese bloque para tu objetivo. El peso de cada bloque sale de lo que ha caído en Murcia en 2021 y 2025.</p></div></section>
  </div>
  <section class="card"><div class="card-h"><h2>Lo que te falta ahora mismo</h2><span class="sub">Ordenado por lo que más nota te da en Murcia</span></div>
    ${top.length?top.slice(0,4).map(({b,x})=>gapItem(b,x)).join(''):`<div class="note ok">Estás en el nivel de tu objetivo en todos los subbloques con datos. Haz un simulacro para confirmarlo.</div>`}</section>
  <div class="grid g2">
    <section class="card"><div class="card-h"><h2>Actividad</h2><span class="sub">Problemas por semana · últimas 10 semanas</span></div>${barChart('home-wk',{bars:weekly(S), yMax:Math.max(4, ...weekly(S).map(w=>w.v))})}</section>
    <section class="card"><div class="card-h"><h2>Cómo redactas según la rúbrica</h2><a class="sub" href="#/murcia">Criterios de Murcia</a></div>${dimBars(dimProfile(S), G)}</section>
  </div>`;
};
function skillsToWork(S, s){
  const recent=S.errors.filter(e=>e.sb===s.id && Date.now()-e.d<60*DAY).map(e=>e.txt);
  const marked=s.skills.filter(k=>recent.some(t=>t.includes(k)));
  return marked.length?marked:s.skills;
}
function gapItem(b, x, St=S){
  const s=x.s; const sk=skillsToWork(St, s).slice(0,3);
  return `<div class="gap-item"><div>${pill(x.status)}</div><div class="stack" style="gap:4px">
    <div class="row between"><b>${dotb(b)} ${s.id} · ${esc(s.name)}</b><span class="small muted num">${x.sr==null?'sin datos aún':'nivel '+lvTxt(x.sr)+' → '+lvTxt(gapsFor(St,b).tR)}</span></div>
    <div class="small muted">Temas ${s.temas.join(', ')}${x.hits?` · ha caído en Murcia (${s.murcia.map(refLabel).join(', ')})`:''}${s.old&&s.old.length?` · antes, en ${s.old.map(r=>r.slice(0,4)).join(', ')}`:''}</div>
    <div class="small">Te falta dominar: ${sk.map(k=>`<span style="display:block">• ${mdi(k)}</span>`).join('')}</div>
    ${(()=>{ const fe=St.errors.filter(e=>e.sb===s.id&&e.dim).slice(-2).reverse(); return fe.length?`<div class="small" style="color:var(--bad)">Últimos fallos: ${fe.map(e=>`<span style="display:block">• ${mdi(e.txt)}${e.note?` <i>(«${esc(e.note)}»)</i>`:''}</span>`).join('')}</div>`:''; })()}
    ${St===S?`<div class="row" style="margin-top:4px"><button class="btn sm primary" data-go="#/practicar?sb=${s.id}">Practicar ${s.id}</button><button class="btn sm" data-go="#/sub/${s.id}">Ver subbloque</button></div>`:''}</div></div>`;
}

V.bloques = () => `${head('Temario oficial · 5 bloques','Bloques', 'Los 71 temas del temario oficial agrupados en cinco bloques. Cada bloque se divide en subbloques ligados a temas concretos; ahí es donde se mide lo que te falta.')}
  <div class="grid g3">${BK.map(b=>{ const gp=gapsFor(S,b); const c={ok:0,warn:0,bad:0,new:0}; gp.subs.forEach(x=>c[x.status]++);
    const hits=subsOf(b).flatMap(s=>(s.murcia||[]).map(r=>refLabel(r).replace('Murcia ','')));
    return `<section class="card bk-card stack" style="--c:${bcol(b)}" data-go="#/bloque/${b}">
      <div class="row between"><h2>${esc(BLOQ[b].name)}</h2><span class="chip">${Math.round(BLOQ[b].w*100)} %</span></div>
      <span class="small muted">${esc(BLOQ[b].temas)} · ${subsOf(b).length} subbloques</span>
      <div class="row between small"><span>Nivel <b class="num">${lvTxt(gp.r)}</b> · ${esc(lvName(gp.r))}</span><span class="muted num">objetivo ${lvTxt(gp.tR)}</span></div>
      ${bulletHTML(gp.r, gp.tR, b)}
      <div class="row small">${c.ok?`<span class="pill-status st-ok">${c.ok} a nivel</span>`:''}${c.warn?`<span class="pill-status st-warn">${c.warn} cerca</span>`:''}${c.bad?`<span class="pill-status st-bad">${c.bad} lejos</span>`:''}${c.new?`<span class="pill-status st-new">${c.new} sin datos</span>`:''}</div>
      <span class="small">${hits.length?'En Murcia: '+esc(hits.join(' · ')):'No ha caído en 2021 ni en 2025'}</span></section>`; }).join('')}</div>`;

V.bloque = (b) => {
  if(!BLOQ[b]) return V.bloques();
  const gp=gapsFor(S,b); const G=targetNota(S); const ds=dailySnaps(S,120);
  const apps=APPEAR.slice().reverse().flatMap(e=>e.items.filter(([,sb])=>subById(sb).b===b).map(([k,sb])=>({ref:e.y+'-'+k, y:e.y, s:subById(sb)})));
  const errs=S.errors.filter(e=>e.b===b).slice(-5).reverse();
  return `${head('Bloque · '+BLOQ[b].temas, BLOQ[b].name, esc(BLOQ[b].desc), `<button class="btn primary" data-go="#/practicar?b=${b}">${ico('play')}Practicar ${esc(BLOQ[b].name.toLowerCase())}</button>`)}
  <div class="kpis">
    <div class="kpi"><span class="l">Tu nivel</span><span class="v">${lvTxt(gp.r)}<small> / 7</small></span><span class="d">${esc(lvName(gp.r))}</span></div>
    <div class="kpi accent"><span class="l">Nivel que necesitas</span><span class="v">${lvTxt(gp.tR)}</span><span class="d">Para ${fmt1(G)} en la parte A</span></div>
    <div class="kpi"><span class="l">Distancia</span><span class="v">${gp.done?'0':fmt1(gp.gap/200)}<small> escalones</small></span><span class="d">${gp.done?'Ya estás':'≈ '+Math.ceil(gp.gap/14)+' problemas bien resueltos'}</span></div>
    <div class="kpi"><span class="l">Nota del bloque hoy</span><span class="v">${fmt1(notaBloque(gp.r))}<small> / 10</small></span><span class="d">En un problema tipo Murcia</span></div>
  </div>
  <section class="card"><div class="card-h"><h2>Qué te falta para el nivel Murcia en ${esc(BLOQ[b].name.toLowerCase())}</h2><span class="sub">Subbloques de más a menos urgentes</span></div>
    ${gp.subs.map(x=>gapItem(b,x)).join('')}</section>
  <div class="grid g2">
    <section class="card"><div class="card-h"><h2>Tu redacción en este bloque</h2><span class="sub">Rúbrica oficial de Murcia</span></div>
      ${gp.weakDims.length?`<div class="note bad small" style="margin-bottom:12px"><b>Dónde pierdes puntos:</b> ${gp.weakDims.map(d=>`${esc(d.name)} — ${esc(d.tip)}`).join('<br>')}</div>`:''}
      ${dimBars(gp.prof, G)}</section>
    <section class="card"><div class="card-h"><h2>Evolución en el bloque</h2></div>
      ${lineChart('bq-'+b,{series:[{name:BLOQ[b].name, color:BHEX[b], pts:ds.map(s=>[s.d, lvVal(s.R[b])])}], yMin:1, yMax:8, yTicks:[1,2,3,4,5,6,7], yFmt:v=>'Nivel '+v, target:{v:lvVal(gp.tR), label:'Objetivo'}, tipFmt:v=>'nivel '+fmt1(v)})}</section>
  </div>
  <div class="grid g2">
    <section class="card"><div class="card-h"><h2>Cómo cae en Murcia</h2></div>
      ${apps.length?`<div class="list">${apps.map(({ref,y,s})=>{ const p=bank().find(q=>q.m==='oficial'&&q.ref===ref); return `<div class="li" data-go="${p?'#/p/'+p.id:'#/sub/'+s.id}"><div><span class="t">${esc(refLabel(ref))}</span><div class="ex">${s.id} · ${esc(s.name)}${p?' — resuelto en el banco':' — enunciado pendiente de verificar'}</div></div>${ico('chev','chev')}</div>`; }).join('')}</div>`:`<p class="muted">Este bloque no aparece en los exámenes de Murcia que tenemos.</p>`}
      <p class="tiny muted">Este bloque supone el ${Math.round(BLOQ[b].w*100)} % de tu plan: ${APPW.c[b]} de ${APPW.t} puntos de aparición (los años desde 2018 cuentan doble). <a href="#/metodo">Cómo lo calculamos</a></p></section>
    <section class="card"><div class="card-h"><h2>Tus últimos errores</h2></div>
      ${errs.length?`<div class="list">${errs.map(e=>`<div class="li" ${e.pid?`data-go="#/p/${e.pid}"`:''}><div><span class="small muted">${esc(fdate(e.d))}${e.sb?' · '+e.sb:''}${e.dim?' · '+esc(RUBRIC.find(x=>x.k===e.dim).name):''}${e.pid&&byId(e.pid)?' · '+esc(byId(e.pid).ti):''}</span><div>${mdi(e.txt)}</div>${e.note?`<div class="small"><i>«${esc(e.note)}»</i></div>`:''}</div></div>`).join('')}</div>`:`<p class="muted">Sin errores anotados. Al corregirte con la rúbrica, los indicadores que marques como fallados aparecerán aquí.</p>`}</section>
  </div>`;
};

V.subbloques = () => {
  const fb=UI.subsB;
  const rows=SUB.filter(s=>!fb||s.b===fb).map(s=>{ const x=S.subR[s.id]; const t=targetR(S,s.b); const st=!x?'new':x.r>=t?'ok':t-x.r<150?'warn':'bad'; const n=bank().filter(p=>p.sb===s.id); const nm=n.filter(isMurcia).length;
    return `<tr class="click" data-go="#/sub/${s.id}"><td>${dotb(s.b)} <b>${s.id}</b></td><td>${esc(s.name)}</td><td class="small muted">${s.temas.map(t=>'T'+t).join(', ')}</td><td class="small">${(s.murcia||[]).concat(s.old||[]).length?esc((s.murcia||[]).concat(s.old||[]).sort().reverse().map(r=>r.replace('-',' · ')).join(', ')):'<span class="muted">—</span>'}</td><td class="num">${x?lvTxt(x.r):'—'}</td><td>${pill(st)}</td><td class="num small">${n.length}${nm?` <span class="muted">(${nm} Murcia)</span>`:''}</td></tr>`; }).join('');
  return `${head('Temario oficial · '+SUB.length+' subbloques','Subbloques y temas','Cada subbloque agrupa temas del temario oficial y las destrezas que se evalúan en Murcia. Pulsa uno para ver sus temas, sus destrezas y sus problemas.')}
  <div class="seg" role="group" aria-label="Filtrar por bloque"><button aria-pressed="${!fb}" data-act="subsB" data-v="">Todos</button>${BK.map(b=>`<button aria-pressed="${fb===b}" data-act="subsB" data-v="${b}">${esc(BLOQ[b].name)}</button>`).join('')}</div>
  <section class="card scroll-x"><table class="tbl"><thead><tr><th>Código</th><th>Subbloque</th><th>Temas</th><th>En Murcia</th><th>Tu nivel</th><th>Estado</th><th>Problemas</th></tr></thead><tbody>${rows}</tbody></table></section>
  <section class="card"><div class="card-h"><h2>Mapa de tus subbloques</h2><span class="sub">Color = estado respecto a tu objetivo</span></div>${subMap()}</section>`;
};

function subMap(){ return `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px">${SUB.map(s=>{ const x=S.subR[s.id]; const t=targetR(S,s.b); const st=!x?'new':x.r>=t?'ok':t-x.r<150?'warn':'bad';
      return `<button class="${STATUS[st][0]}" data-go="#/sub/${s.id}" style="border:0;border-left:4px solid ${bcol(s.b)};border-radius:8px;padding:8px 10px;text-align:left;cursor:pointer" title="${esc(s.name)}: ${STATUS[st][1]}"><b class="small">${s.id}</b><span class="tiny" style="display:block">${x?'nivel '+lvTxt(x.r):'sin datos'}</span></button>`; }).join('')}</div>
    <div class="row small" style="margin-top:12px">${['ok','warn','bad','new'].map(k=>pill(k)).join('')}</div>`; }
V.sub = (id) => {
  const s=subById(id); if(!s) return V.subbloques();
  const x=S.subR[s.id]; const t=targetR(S,s.b); const st=!x?'new':x.r>=t?'ok':t-x.r<150?'warn':'bad';
  const ps=bank().filter(p=>p.sb===s.id).sort((a,c)=>(c.m==='oficial')-(a.m==='oficial')||(!!c.m)-(!!a.m)||a.n-c.n);
  const errs=S.errors.filter(e=>e.sb===s.id && Date.now()-e.d<60*DAY);
  return `${head(BLOQ[s.b].name+' · '+s.id, s.name, `Temas ${s.temas.join(', ')} del temario oficial.`, `<button class="btn primary" data-go="#/practicar?sb=${s.id}">${ico('play')}Practicar ${s.id}</button>`)}
  <div class="kpis">
    <div class="kpi"><span class="l">Tu nivel</span><span class="v">${x?lvTxt(x.r):'—'}</span><span class="d">${x?x.n+' intentos':'Aún no has practicado'}</span></div>
    <div class="kpi accent"><span class="l">Necesitas</span><span class="v">${lvTxt(t)}</span><span class="d">${pill(st)}</span></div>
    <div class="kpi"><span class="l">Problemas</span><span class="v">${ps.length}</span><span class="d">${ps.filter(isMurcia).length} oficiales, gemelos o estilo Murcia</span></div>
  </div>
  <div class="grid g2">
    <section class="card"><div class="card-h"><h2>Destrezas que se evalúan</h2></div>
      <div class="stack">${s.skills.map(k=>{ const n=errs.filter(e=>e.txt.includes(k)).length; return `<div class="row between" style="align-items:flex-start;flex-wrap:nowrap"><span>${mdi(k)}</span>${n?`<span class="pill-status st-bad">${n} ${n>1?'fallos':'fallo'}</span>`:''}</div>`; }).join('')}</div>
      ${s.murcia?`<div class="note hi small" style="margin-top:14px"><b>Ha caído en Murcia:</b> ${esc(s.murcia.map(refLabel).join(' y '))}.</div>`:''}</section>
    <section class="card"><div class="card-h"><h2>Temas del temario oficial</h2></div>
      <div class="stack small">${s.temas.map(n=>`<div><b class="num">Tema ${n}.</b> ${esc(TEMAS[n-1]||'')}</div>`).join('')}</div></section>
  </div>
  <section class="card"><div class="card-h"><h2>Problemas de este subbloque</h2><span class="sub">Primero los de Murcia</span></div>${probList(ps)}</section>`;
};
function probList(ps){
  if(!ps.length) return `<p class="muted">No hay problemas con estos filtros.</p>`;
  return `<div class="list">${ps.map(p=>{ const at=S.attempts[p.id]; const best=at?Math.max(...at.map(a=>a.s)):null;
    return `<div class="li" data-go="#/p/${p.id}"><div class="stack" style="gap:4px"><span class="t">${esc(p.ti)}</span><div class="row" style="gap:6px">${chipOrigin(p)}<span class="chip">${dotb(p.b)}${p.sb}</span><span class="chip">Nivel ${p.n}</span></div><div class="ex">${mdi(snippet(p.st))}</div></div>
    <div class="small num">${best==null?'':best>=.75?`<span class="pill-status st-ok">${fmt1(best*10)}</span>`:`<span class="pill-status st-warn">${fmt1(best*10)}</span>`}</div></div>`; }).join('')}</div>`;
}

V.p = (id) => {
  const p=byId(id); if(!p) return `<div class="note">Ese problema ya no está en el banco.</div>`;
  const s=subById(p.sb);
  return `${head(BLOQ[p.b].name+' · '+p.sb, p.ti, '', `<button class="btn primary" data-act="practiceOne" data-id="${p.id}">${ico('play')}Resolverlo con tiempo</button>${ME.role==='profesor'?`<button class="btn bad sm" data-act="delProb" data-id="${p.id}">Quitar del banco</button>`:''}`)}
  <section class="card prob stack"><div class="row">${chipOrigin(p)}${chipSub(p.sb)}${chipLv(p.n)}${p.t?`<span class="chip">Tema ${p.t}</span>`:''}</div>
    <div class="st">${md(p.st)}</div>
    ${p.h.length?`<details><summary class="small"><b>Pistas (${p.h.length})</b></summary><ol class="small">${p.h.map(h=>`<li>${mdi(h)}</li>`).join('')}</ol></details>`:''}
    <div class="row"><button class="btn sm" data-act="aiCopy" data-kind="exp" data-id="${p.id}">Pedir explicación a mi IA</button><span class="tiny muted">Copia el ejercicio y su solución; pégalo en ${AIS.map(a=>a[0]).slice(0,3).join(', ')}…</span></div>
    <details><summary class="small"><b>Ver la solución</b></summary><div class="sol" style="margin-top:10px">${md(p.so)}</div>${p.er?`<div class="typical" style="margin-top:10px"><b>Error típico:</b> ${mdi(p.er)}</div>`:''}</details>
    <div class="row between"><span class="tiny muted">${p.src?'Fuente: '+esc(p.src):''}</span><a class="btn sm" href="${errataUrl(p)}" target="_blank" rel="noopener">Avisar de una errata</a></div></section>
  ${(()=>{ const hs=S.hist.filter(h=>h.pid===p.id&&h.items).slice().reverse(); return `<section class="card stack"><div class="card-h"><h2>Tus correcciones de este problema</h2><span class="sub">${hs.length?hs.length+(hs.length>1?' intentos':' intento'):'Aún no lo has corregido'}</span></div>
    ${hs.length?hs.map((h,i)=>`<details ${i===0?'open':''}><summary><b>${esc(fdate(h.d))} · ${fmt1(h.s*10)} / 10</b> <span class="small muted">· ${h.mode==='simulacro'?'simulacro':'práctica'}${h.ia?' · corregido con IA':''} · ${h.items.filter(x=>x.v<1).length} fallos</span></summary><div class="stack" style="margin-top:10px">${reportHTML(h.items, h.falt)}</div></details>`).join(''):`<p class="muted small" style="margin:0">Cuando lo resuelvas y te corrijas, aquí verás la rúbrica anotada de cada intento.</p>`}
    <details><summary class="small"><b>Ver la rúbrica de este problema</b></summary><div class="stack small" style="margin-top:8px">${RUBRIC.map(dm=>`<div><b>${esc(dm.name)} (${dm.max})</b>${rubricFor(p).filter(it=>it.k===dm.k).map(it=>`<span style="display:block">• ${mdi(it.t)} <span class="muted num">(${fmt2(it.p)})</span></span>`).join('')}</div>`).join('')}</div></details></section>`; })()}
  ${s?`<section class="card"><div class="card-h"><h2>Destrezas de ${s.id}</h2><a class="sub" href="#/sub/${s.id}">Ver subbloque</a></div><div class="small">${s.skills.map(k=>`• ${mdi(k)}`).join('<br>')}</div></section>`:''}`;
};

/* ---------- Práctica con rúbrica ---------- */
V.practicar = (arg, q) => {
  const f={b:q.b||'', sb:q.sb||'', murcia:q.todo?false:true};
  const key=q.id?'id:'+q.id:JSON.stringify(f);
  if(!UI.pr || UI.pr.key!==key){
    const p=q.id?byId(q.id):pickNext({b:f.b||null, sb:f.sb||null, murcia:f.murcia, exclude:UI.pr&&UI.pr.id});
    UI.pr={key, f, one:!!q.id, id:p&&p.id, stage:'work', t0:Date.now(), hints:0, rk:newRk()};
  }
  const pr=UI.pr; const p=byId(pr.id); if(!p) return `<div class="note">No hay problemas disponibles.</div>`;
  const s=subById(p.sb);
  const filt = `<div class="row between"><div class="seg" role="group" aria-label="Qué practicar">
      <button aria-pressed="${!f.b&&!f.sb}" data-go="#/practicar${f.murcia?'':'?todo=1'}">Lo que más necesitas</button>
      ${BK.map(b=>`<button aria-pressed="${f.b===b||(s&&f.sb&&subById(f.sb).b===b)}" data-go="#/practicar?b=${b}${f.murcia?'':'&todo=1'}">${esc(BLOQ[b].name)}</button>`).join('')}</div>
    <label class="row small" style="font-weight:500"><input type="checkbox" data-act="murciaOnly" ${f.murcia?'checked':''}> Solo problemas de Murcia o estilo Murcia</label></div>`;
  const top = `${head(f.sb?'Practicar · '+f.sb:f.b?'Practicar · '+BLOQ[f.b].name:'Practicar · plan adaptativo', f.sb?subById(f.sb).name:'Tu siguiente problema', f.sb||f.b?'':'Te damos el problema que más acerca tu nota a tu objetivo, priorizando lo que cae en Murcia.')}${pr.one?'':filt}`;
  const prob = `<section class="card prob stack"><div class="row between"><div class="row">${chipOrigin(p)}${chipSub(p.sb)}${chipLv(p.n)}</div>${pr.stage==='work'?`<span class="timer" data-t0="${pr.t0}">0:00</span>`:''}</div>
    <h2>${esc(p.ti)}</h2><div class="st">${md(p.st)}</div>
    ${pr.stage==='work'?`${p.h.slice(0,pr.hints).map((h,i)=>`<div class="note small"><b>Pista ${i+1}.</b> ${mdi(h)}</div>`).join('')}
    <div class="note small">Resuélvelo en papel como en el examen: planteamiento, desarrollo y conclusión. Sin calculadora.</div>
    <div class="row">${pr.hints<p.h.length?`<button class="btn" data-act="hint">Pedir una pista (${p.h.length-pr.hints})</button>`:''}<button class="btn primary" data-act="toGrade">Ver la solución y corregirme</button><button class="btn ghost" data-act="skip">Cambiar de problema</button></div>`:''}</section>`;
  if(pr.stage==='work') return top+prob;
  if(pr.stage==='grade') return top+prob+`<section class="card"><div class="card-h"><h2>Solución</h2>${p.ref&&p.m!=='oficial'?`<span class="sub">Gemelo de ${esc(refLabel(p.ref))}</span>`:''}</div><div class="sol">${md(p.so)}</div>${p.er?`<div class="typical" style="margin-top:10px"><b>Error típico en este problema:</b> ${mdi(p.er)}</div>`:''}</section>
    ${aiCardHTML('pr', pr.ai)}
    <section class="card stack"><div class="card-h"><h2>Corrígete con la rúbrica detallada</h2><span class="sub">Dimensiones oficiales de Murcia (criterios de 2025)</span></div>
    <p class="small muted" style="margin:0">Compara tu hoja con la solución indicador a indicador. Valora cada subindicador en cinco niveles, de <b>nada</b> a <b>completo</b>, y, si no está completo, anota dónde fallaste: queda en tu historial de errores. Cada dimensión parte del indicador oficial del tribunal.${rubricFor(p).some(x=>x.own)?' Los indicadores de este problema están escritos para él.':''}</p>
    ${rubricHTML('pr', p, pr.rk)}
    <div class="row"><button class="btn primary" data-act="saveGrade" ${rkDone(p,pr.rk)?'':'disabled'}>Guardar corrección</button><span class="small muted" data-prog="pr">${rkProg(p,pr.rk)}</span></div></section>`;
  const res=pr.res;
  return top+`<section class="card stack"><div class="row between"><h2>Informe de corrección</h2><span class="total">${fmt1(pr.score)} <small class="muted">/ 10</small></span></div>
    <div class="kpis"><div class="kpi"><span class="l">${esc(BLOQ[p.b].name)}</span><span class="v">${lvTxt(res.r)}</span><span class="d">${res.dr>=0?'+':''}${fmt2(res.dr/200)} escalones${res.up?' · ¡subes de nivel!':res.down?' · bajas de nivel':''}</span></div>
    <div class="kpi"><span class="l">${p.sb} · ${esc(s?s.name:'')}</span><span class="v">${lvTxt(res.sbr)}</span><span class="d">Objetivo ${lvTxt(targetR(S,p.b))}</span></div>
    <div class="kpi"><span class="l">Nota estimada parte A</span><span class="v">${notaRango(S).txt}</span><span class="d">Objetivo ${fmt1(targetNota(S))}</span></div></div>
    ${reportHTML(pr.items, pr.rk.falt)}
    <details><summary class="small"><b>Volver a ver la solución</b></summary><div class="sol" style="margin-top:8px">${md(p.so)}</div></details>
    <div class="row"><button class="btn primary" data-act="next">Siguiente problema</button><button class="btn" data-go="#/bloque/${p.b}">Ver qué me falta en ${esc(BLOQ[p.b].name.toLowerCase())}</button><button class="btn ghost" data-go="#/p/${p.id}">Historial de este problema</button></div></section>`;
};
/* ---------- Corrección con la IA del opositor (ChatGPT, Claude, Gemini…) ----------
   La web no se conecta a ninguna cuenta: genera unas instrucciones con el enunciado, la solución y la rúbrica,
   el opositor las pega en su IA junto con las fotos de su hoja, y pega aquí la respuesta (un bloque JSON). */
const AIS = [['ChatGPT','https://chatgpt.com/'],['Claude','https://claude.ai/new'],['Gemini','https://gemini.google.com/app'],['Copilot','https://copilot.microsoft.com/']];
const pt = x => fmt2(x);
function aiRubricText(p){
  const items=rubricFor(p);
  return RUBRIC.map(d=>`### ${d.dim} (${d.max} ${d.max>1?'puntos':'punto'})
Indicador oficial: «${d.of}»
${items.map((it,i)=>it.k!==d.k?'':`- [${i}] (${pt(it.p)} pt) ${it.t}`).filter(Boolean).join('\n')}`).join('\n\n');
}
const AI_SCALE = SCALE.map(([v,l,d])=>`- ${String(v)} = ${l}: ${d}.`).join('\n');
const AI_ORTO = ORTO.map(([k,l,d])=>`- "${k}": ${l}${d>1?` (cada ${d} cuentan como una falta)`:' (cada uno es una falta)'}`).join('\n');
const AI_RULES = `## Cómo debes corregir (sigue estos pasos en orden)
1. **Comprueba que tienes la resolución.** Si no te he adjuntado fotos o texto con mi resolución, o si no se lee, no corrijas: pídemela. No inventes nada que no esté escrito.
2. **Transcribe brevemente** lo que he escrito, apartado por apartado, para que yo pueda comprobar que lo has leído bien.
3. **Valora cada subindicador** con esta escala (usa solo estos valores):
${AI_SCALE}
4. **Criterios de valoración** (son los del tribunal de Murcia):
   - Sé tan exigente como un tribunal real: pon 1 solo si un corrector no le quitaría nada. Ante la duda entre dos valores, elige el menor.
   - Si sigo un camino distinto al de la solución de referencia pero correcto y riguroso, valóralo como equivalente, indicador por indicador.
   - El desarrollo se valora en consonancia con el planteamiento: si arrastro un error anterior y el resto es coherente, no me penalices dos veces en desarrollo. Los resultados sí serán incorrectos.
   - Un resultado correcto sin justificación no puntúa en rigor ni en desarrollo.
   - Lo que no está escrito no existe: no supongas pasos «evidentes» que no aparecen.
   - Para cada subindicador por debajo de 1, da la evidencia: cita literal o ubicación («apartado b, tercera línea: …») y qué faltaría para el 1.
5. **Cuenta los errores de expresión** según las categorías oficiales. Las faltas en palabras repetidas se cuentan una sola vez:
${AI_ORTO}
6. **Explica** después, como un buen profesor, los errores principales y cómo redactarlos correctamente para el tribunal.`;
const AI_JSON_ITEM = n => `{"i":0,"v":0.75,"evidencia":"cita o ubicación en la hoja","nota":"qué falta para el 1"}  ← uno por subindicador, del 0 al ${n-1}`;
const AI_JSON_ORTO = `{"ort":0,"til":0,"abr":0,"pun":0,"ver":0,"cnc":0,"prp":0,"mar":0,"rep":0}`;
function aiPromptProblem(p){
  const n=rubricFor(p).length;
  return `Actúa como corrector del tribunal de la oposición de Matemáticas (Cuerpo de Profesores de Enseñanza Secundaria, especialidad 006) de la Región de Murcia. Corrige mi resolución de un ejercicio de la parte A (prueba práctica) con los criterios de valoración oficiales de 2025, desglosados en subindicadores. Te adjunto fotos de mi hoja.

## Ejercicio${p.ref?` (${refLabel(p.ref)}${p.m==='gemelo'?', gemelo':''})`:''}
${p.st}

## Solución de referencia
${p.so}
${p.er?`\nError típico en este ejercicio: ${p.er}\n`:''}
## Rúbrica (10 puntos; los puntos de cada subindicador ya están fijados)
${aiRubricText(p)}

### Penalización por expresión
Cada falta resta 0,5 puntos, hasta un máximo de 3.

${AI_RULES}

## Formato obligatorio al final
Termina SIEMPRE tu respuesta con este bloque de código JSON, con los ${n} subindicadores (del 0 al ${n-1}), sin comentarios dentro, para que la web Escalera Murcia pueda leerlo:
\`\`\`json
{"escalera":2,"problema":"${p.id}","legible":true,"confianza":"alta","indicadores":[${AI_JSON_ITEM(n)}],"ortografia":${AI_JSON_ORTO},"comentario":"resumen en una frase"}
\`\`\`
«confianza» es "alta", "media" o "baja" según lo seguro que estés de haber leído bien mi resolución.`;
}
function aiPromptSim(ids){
  return `Actúa como corrector del tribunal de la oposición de Matemáticas (Cuerpo de Profesores de Enseñanza Secundaria, especialidad 006) de la Región de Murcia. Te paso los ${ids.length} ejercicios de un simulacro de la parte A, con su solución de referencia y su rúbrica oficial (criterios de 2025) desglosada en subindicadores. Corrige mi resolución, que te adjunto en fotos, ejercicio por ejercicio. Cada ejercicio se puntúa sobre 10, y la nota del simulacro es la media.

${ids.map((id,k)=>{ const p=byId(id); return `# EJERCICIO ${k+1} (código ${p.id})

## Enunciado
${p.st}

## Solución de referencia
${p.so}

## Rúbrica
${aiRubricText(p)}`; }).join('\n\n')}

${AI_RULES}

## Formato obligatorio al final
Termina SIEMPRE tu respuesta con este bloque de código JSON, con un elemento por ejercicio y todos los subindicadores de cada uno (la numeración de los subindicadores empieza en 0 en cada ejercicio):
\`\`\`json
{"escalera":2,"simulacro":true,"ejercicios":[{"problema":"${ids[0]}","legible":true,"confianza":"alta","indicadores":[{"i":0,"v":1,"evidencia":"","nota":""}],"ortografia":${AI_JSON_ORTO},"comentario":""}]}
\`\`\``;
}
function aiPromptExplain(p){
  return `Soy opositor a profesor de Matemáticas de Secundaria en la Región de Murcia. Explícame este ejercicio de la parte A paso a paso, como un buen profesor: primero la idea clave y por qué se elige esa estrategia, luego cada paso justificado, y al final los errores típicos y cómo redactarlo para sacar la máxima nota con los criterios del tribunal (rigor, conocimiento, técnicas, planteamiento, desarrollo, resultados y presentación). Después hazme una pregunta para comprobar que lo he entendido.

## Ejercicio
${p.st}

## Solución de referencia (úsala como base, no la contradigas sin justificarlo)
${p.so}${p.er?`\n\nError típico: ${p.er}`:''}`;
}
const aiLinks = () => AIS.map(([n,u])=>`<a class="btn sm" href="${u}" target="_blank" rel="noopener">${n}</a>`).join('');
function aiCardHTML(key, ai){
  return `<section class="card stack ai-card"><div class="card-h"><h2>Corrígelo con tu IA</h2><span class="sub">ChatGPT, Claude, Gemini o la que uses</span></div>
    <p class="small" style="margin:0">Tu IA corrige con nuestra rúbrica y nosotros guardamos el resultado en tu progreso. Tus fotos van solo a tu IA, no a esta web.</p>
    <div class="stack small" style="gap:10px">
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><b class="step">1</b><div class="stack" style="gap:6px"><span>Copia las instrucciones: incluyen el enunciado, la solución y la rúbrica.</span><div class="row"><button class="btn sm primary" data-act="aiCopy" data-key="${key}" data-kind="corr">Copiar instrucciones</button><details><summary class="tiny">Ver el texto</summary><textarea readonly rows="6" class="ai-raw" data-raw="${key}" style="margin-top:6px;font-size:.75rem"></textarea></details></div></div></div>
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><b class="step">2</b><div class="stack" style="gap:6px"><span>Abre tu IA, pega las instrucciones y <b>adjunta las fotos de tu hoja</b>.</span><div class="row">${aiLinks()}</div></div></div>
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><b class="step">3</b><div class="stack" style="gap:6px;flex:1"><span>Copia su respuesta completa (o solo el bloque final de código) y pégala aquí.</span><textarea rows="4" data-input="aiPaste" data-key="${key}" placeholder='{"escalera":2, …}'></textarea><div class="row"><button class="btn sm" data-act="aiApply" data-key="${key}">Rellenar la rúbrica</button><span class="tiny muted" data-aimsg="${key}"></span></div></div></div>
    </div>
    ${ai?`<div class="note ${ai.conf==='baja'||ai.legible===false?'bad':'ok'} small"><b>Rúbrica rellenada con tu IA.</b> Revísala abajo: puedes cambiar cualquier subindicador antes de guardar.${ai.conf==='baja'||ai.legible===false?' <b>Tu IA no ha podido leer bien tu hoja:</b> repite la foto con buena luz o revisa con cuidado cada valoración.':''}${ai.com?`<br><i>«${esc(ai.com)}»</i>`:''}</div>`:''}</section>`;
}

/* ---------- Rúbrica detallada ---------- */
const newRk = resc => ({m:{}, n:{}, orto:{}, falt:0, resc:!!resc});
const RESC=['rig','con','tec','pla'];
const inResc=(rk,it)=>!rk.resc||RESC.includes(it.k);
const rkDone = (p, rk) => rubricFor(p).every((it,i)=>!inResc(rk,it)||typeof rk.m[i]==='number');
const rkProg = (p, rk) => { const n=rubricFor(p).filter(it=>inResc(rk,it)).length, k=Object.keys(rk.m).length; return k<n?`Has valorado ${k} de ${n} subindicadores.`:'Todos los subindicadores valorados.'; };
function rkItems(p, rk){ return rubricFor(p).map((it,i)=>({k:it.k, p:it.p, t:it.t, v:rk.m[i], n:String(rk.n[i]||'').trim()})); }
function itemsDims(items){ const d={}; RUBRIC.forEach(x=>d[x.k]=0); items.forEach(it=>{ d[it.k]+=it.p*(it.v||0); }); RUBRIC.forEach(x=>d[x.k]=Math.round(d[x.k]*100)/100); return d; }
const ortoPen = falt => Math.min(3, .5*(falt||0));
const itemsScore = (items, falt) => Math.max(0, Object.values(itemsDims(items)).reduce((a,c)=>a+c,0) - ortoPen(falt));
const rescScore = items => { const d=itemsDims(items); return RESC.reduce((a,k)=>a+d[k],0)/4*10; };
const rkScore = (items, rk) => rk.resc ? rescScore(items) : itemsScore(items, rk.falt);
const scaleLab = v => (SCALE.find(x=>Math.abs(x[0]-v)<1e-6)||SCALE[0])[1];
function rubricHTML(key, p, rk){
  const items=rubricFor(p); const d=itemsDims(rkItems(p,rk));
  return `<div class="row between"><button class="btn sm" data-act="markAll" data-key="${key}">Marcar todo como completo</button><span class="small">Nota: <b class="total" style="font-size:1.25rem" data-total="${key}">${rkDone(p,rk)?fmt2(rkScore(rkItems(p,rk),rk)):'—'}</b> / 10</span></div>
  <details class="tiny"><summary>Escala de valoración</summary><div class="stack" style="gap:2px;margin-top:6px">${SCALE.map(([v,l,t])=>`<span><b>${l}</b> (${fmt2(v*100)} % de los puntos): ${esc(t)}.</span>`).join('')}</div></details>
  ${rk.resc?'<div class="note small"><b>Modo rescate:</b> solo se corrigen rigor, conocimiento, técnicas y planteamiento (4 puntos, que equivalen a la nota de 10). Si no llegaste a un resultado, aquí es donde puntúas.</div>':''}
  ${RUBRIC.filter(dm=>!rk.resc||RESC.includes(dm.k)).map(dm=>`<div class="rdim"><div class="rdim-h"><b>${esc(dm.dim)}</b><span class="num small" data-dsum="${key}|${dm.k}">${fmt2(d[dm.k])} / ${dm.max}</span><span class="tiny muted">Indicador oficial: «${esc(dm.of)}»</span></div>
    ${items.map((it,i)=>it.k!==dm.k?'':`<div class="ri"><div class="ri-t"><span class="ri-p">${fmt2(it.p)}</span><span>${mdi(it.t)}${it.own?'':''}</span></div>
      <div class="tri tri5" role="group" aria-label="Valoración">${SCALE.map(([v,l,t])=>`<button aria-pressed="${rk.m[i]===v}" data-v="${v}" data-act="mark" data-key="${key}" data-i="${i}" title="${esc(t)}">${l}</button>`).join('')}</div>
      <input type="text" class="ri-n${typeof rk.m[i]==='number'&&rk.m[i]<1?'':' hidden'}" data-input="rnote" data-key="${key}" data-i="${i}" value="${esc(rk.n[i]||'')}" placeholder="¿Dónde te has equivocado? Ej.: «olvidé el caso x = 0»" aria-label="Anota dónde te has equivocado"></div>`).join('')}</div>`).join('')}
  ${rk.resc?'':`<div class="rdim"><div class="rdim-h"><b>Ortografía y expresión</b><span class="num small" data-dsum="${key}|orto">${rk.falt?'−'+fmt2(ortoPen(rk.falt)):'0'}</span><span class="tiny muted">Cada falta resta 0,5 puntos, con un máximo de 3. Las faltas en palabras repetidas cuentan una sola vez.</span></div>
    <div class="orto">${ORTO.map(([k,l,dv])=>`<div class="orow"><span class="small">${esc(l)}${dv>1?` <span class="tiny muted">(${dv} = 1 falta)</span>`:''}</span><span class="ostep"><button class="icon-btn" data-act="orto" data-key="${key}" data-c="${k}" data-d="-1" aria-label="Quitar">−</button><b class="num" data-oval="${key}|${k}">${+(rk.orto&&rk.orto[k])||0}</b><button class="icon-btn" data-act="orto" data-key="${key}" data-c="${k}" data-d="1" aria-label="Añadir">+</button></span></div>`).join('')}</div>
    <span class="tiny muted" data-ofal="${key}">${rk.falt} ${rk.falt===1?'falta':'faltas'}</span></div>`}`;
}
function reportHTML(items, falt, resc){
  if(!items||!items.length) return '';
  const d=itemsDims(items); const fails=items.filter(it=>it.v<1);
  return `<div class="scroll-x"><table class="tbl"><thead><tr><th>Dimensión</th><th style="width:40%">Puntos</th><th>Obtenidos</th></tr></thead><tbody>${RUBRIC.filter(dm=>!resc||RESC.includes(dm.k)).map(dm=>`<tr><td><b>${esc(dm.name)}</b></td><td><div class="bar"><i style="width:${d[dm.k]/dm.max*100}%;background:${d[dm.k]/dm.max>=.75?'var(--ok)':d[dm.k]/dm.max>=.5?'#b07a1a':'var(--bad)'}"></i></div></td><td class="num">${fmt2(d[dm.k])} / ${dm.max}</td></tr>`).join('')}
    ${falt&&!resc?`<tr><td><b>Ortografía</b></td><td class="small muted">${falt} ${falt>1?'faltas':'falta'}</td><td class="num">−${fmt2(ortoPen(falt))}</td></tr>`:''}
    <tr><td><b>Total</b></td><td></td><td class="num"><b>${fmt2(resc?rescScore(items):itemsScore(items,falt))} / 10</b></td></tr></tbody></table></div>
  <h3 style="margin:6px 0 0">Dónde te has equivocado</h3>
  ${fails.length?`<div>${fails.map(it=>{ const dm=RUBRIC.find(x=>x.k===it.k); return `<div class="fail"><span class="pill-status ${it.v<=.25?'st-bad':'st-warn'}">${scaleLab(it.v)}</span><div><span class="tiny muted">${esc(dm.dim||dm.name)}</span><div>${mdi(it.t)}</div>${it.n?`<div class="small" style="margin-top:2px"><i>Tu nota: «${esc(it.n)}»</i></div>`:''}</div><span class="num small">−${fmt2(it.p*(1-it.v))}</span></div>`; }).join('')}</div>
  ${(()=>{ const ks=[...new Set(fails.map(f=>f.k))]; return `<div class="note small" style="margin-top:10px"><b>Cómo evitarlo en el examen:</b> ${ks.map(k=>{ const dm=RUBRIC.find(x=>x.k===k); return `<span style="display:block">• <b>${esc(dm.name)}.</b> ${esc(dm.tip)}</span>`; }).join('')}</div>`; })()}`
  :`<div class="note ok small">Sin fallos en ningún indicador. Si es de Murcia, prueba ahora su gemelo o un simulacro con tiempo.</div>`}`;
}

/* ---------- Exámenes de Murcia y simulacros ---------- */
V.murcia = () => {
  const sims=S.sims.slice().reverse();
  const old=bank().filter(p=>p.m==='oficial'&&+String(p.ref).slice(0,4)<2021).sort((x,y)=>x.ref<y.ref?-1:1);
  const years=[...new Set(old.map(p=>p.ref.slice(0,4)))];
  return `${head('Región de Murcia · Especialidad 006','Exámenes de Murcia','Los problemas oficiales de la parte A de Murcia, resueltos y con su rúbrica. Todo lo demás del banco está calibrado con ellos.', `<button class="btn" data-go="#/oficial">Documentos oficiales</button>`)}
  <div class="grid g2">${MURCIA.map(e=>`<section class="card stack"><div class="row between"><h2>Parte A · ${e.y}</h2><span class="chip of">Oficial</span></div><span class="small muted">${esc(e.info)}</span>
    <div class="list">${e.ids.map((id,i)=>{ const p=byId(id); return p?`<div class="li" data-go="#/p/${id}"><div><span class="t">Ejercicio ${i+1} · ${esc(p.ti)}</span><div class="ex">${p.sb} · ${esc(subById(p.sb).name)}</div></div>${ico('chev','chev')}</div>`:''; }).join('')}</div>
    <div class="row"><button class="btn primary" data-act="simStart" data-y="${e.y}">Simulacro con tiempo real (${e.dur/60>=3?'3 h':'2 h 30 min'})</button><button class="btn" data-act="simStart" data-y="${e.y}" data-twin="1">Simulacro con gemelos</button><button class="btn" data-act="simStart" data-y="${e.y}" data-mode="rescate" title="40 minutos: solo planteamiento y estrategia de los cinco ejercicios">Modo rescate (40 min)</button></div></section>`).join('')}</div>
  <section class="card stack"><div class="card-h"><h2>Años anteriores</h2><span class="sub">${old.length} problemas oficiales resueltos</span></div>
    <div class="grid g3">${years.map(y=>{ const e=APPEAR.find(a=>String(a.y)===y); return `<div class="stack" style="gap:6px"><b>Murcia ${y}</b><span class="tiny muted">${esc(e?e.info:'')}</span><div class="list">${old.filter(p=>p.ref.startsWith(y)).map(p=>`<div class="li" data-go="#/p/${p.id}"><div><span class="t small">${esc(refLabel(p.ref).replace('Murcia '+y+' · ',''))}</span><div class="ex">${p.sb} · ${esc(subById(p.sb).name)}</div></div>${ico('chev','chev')}</div>`).join('')}</div></div>`; }).join('')}</div>
    <p class="tiny muted">De 2002 falta el problema 4 (la fórmula no se conserva legible) y de 2006 la cuestión 2 (conos), que se incorporará resuelta. Los enunciados de 2018 están pendientes de contrastar con el original, así que todavía no están en el banco. No hay enunciados públicos de Murcia entre 2008 y 2016.</p></section>
  <section class="card"><div class="card-h"><h2>Qué ha caído</h2><span class="sub">Subbloque de cada ejercicio</span></div><div class="scroll-x"><table class="tbl" style="min-width:640px"><thead><tr><th>Año</th>${[1,2,3,4,5].map(i=>`<th>${i}</th>`).join('')}</tr></thead><tbody>${APPEAR.slice().reverse().map(e=>`<tr><td><b>${e.y}</b><span class="tiny muted" style="display:block">${esc(e.info)}</span></td>${e.items.map(([k,id])=>`<td class="click" data-go="#/sub/${id}" style="cursor:pointer"><span class="tiny muted">${k}</span><br>${dotb(subById(id).b)} ${id}<span class="tiny muted" style="display:block">${esc(subById(id).name)}</span></td>`).join('')}${e.items.length<5?'<td></td>':''}</tr>`).join('')}
    <tr><td><b>2023</b></td><td colspan="5" class="small muted">Sin ejercicio práctico en el ingreso: prueba única con tema y unidad didáctica.</td></tr></tbody></table></div>
    <p class="small muted">Con esta tabla calculamos el peso de cada bloque en tu plan: ${BK.map(b=>`${esc(BLOQ[b].name)} ${Math.round(BLOQ[b].w*100)} %`).join(' · ')}. <a href="#/metodo">Ver el método</a></p></section>
  <section class="card"><div class="card-h"><h2>Cómo corrige el tribunal la parte A</h2><a class="sub" href="#/oficial">Criterios completos</a></div>
    <div class="scroll-x"><table class="tbl"><thead><tr><th>Dimensión</th><th>Puntos</th><th>Qué mira</th><th>Cómo asegurarlo</th></tr></thead><tbody>${RUBRIC.map(d=>`<tr><td><b>${esc(d.name)}</b></td><td class="num">${d.max}</td><td class="small">${esc(d.d)}</td><td class="small">${esc(d.tip)}</td></tr>`).join('')}<tr><td><b>Total</b></td><td class="num"><b>10</b></td><td colspan="2"></td></tr></tbody></table></div></section>
  <section class="card"><div class="card-h"><h2>Tus simulacros</h2></div>${sims.length?`<table class="tbl"><thead><tr><th>Fecha</th><th>Examen</th><th>Nota</th></tr></thead><tbody>${sims.map(x=>`<tr><td>${esc(fdate(x.d))}</td><td>${esc(x.ref)}</td><td class="num"><b>${fmt1(x.nota)}</b></td></tr>`).join('')}</tbody></table>`:`<p class="muted">Aún no has hecho ninguno.</p>`}</section>`;
};
V.simulacro = () => {
  const sm=UI.sim; if(!sm) return V.murcia();
  if(sm.stage==='triage'){
    const tot=sm.ids.reduce((a,id)=>a+(+sm.plan.min[id]||0),0);
    return `${head('Simulacro · '+sm.ref,'Triaje: lee y planifica','Antes de escribir nada, lee los cinco ejercicios, decide en qué orden los harás y cuántos minutos le das a cada uno. Cuando empieces, el reloj corre. Al final compararemos tu plan con lo que de verdad hiciste.', `<span class="chip">Tiempo total: ${sm.dur} min</span>`)}
    <div class="note small"><b>Consejo:</b> empieza por el que más seguro tengas y deja para el final el que más te cueste. Todos valen lo mismo (2 puntos de 10), y un planteamiento bien escrito puntúa aunque no llegues al resultado.</div>
    ${sm.ids.map((id,i)=>{ const p=byId(id); return `<section class="card prob"><div class="row between"><h2>Ejercicio ${i+1}</h2><span class="chip">${esc(BLOQ[p.b].name)}</span></div><div class="st">${md(p.st)}</div>
      <div class="row" style="margin-top:8px"><label class="small">Lo haré el nº <select data-change="triOrd" data-id="${id}">${sm.ids.map((_,k)=>`<option value="${k+1}" ${sm.plan.ord[id]===k+1?'selected':''}>${k+1}</option>`).join('')}</select></label><label class="small">Minutos: <input type="number" min="5" max="90" step="5" value="${sm.plan.min[id]}" data-input="triMin" data-id="${id}" style="width:80px"></label></div></section>`; }).join('')}
    <div class="row"><button class="btn primary" data-act="simGo">Empezar el examen</button><span class="small muted" data-tritot>Suma de minutos: ${tot} de ${sm.dur}.</span></div>`;
  }
  if(sm.stage==='exam') return `${head('Simulacro · '+sm.ref, 'Parte A', 'Resuelve en papel. Cuando acabes o se agote el tiempo, entrega y corrígete con la rúbrica.', `<span class="chip ink timer" data-end="${sm.end}" style="font-size:1rem;padding:6px 14px">--:--</span><button class="btn primary" data-act="simEnd">Entregar</button>`)}
    ${sm.mode==='rescate'?`<div class="note"><b>Modo rescate:</b> unos ${sm.per} minutos por ejercicio. No resuelvas: escribe solo qué te piden, qué teoremas o técnicas usarías (con sus hipótesis) y los pasos de la estrategia. Eso es lo que se corrige.</div>`:`<div class="note small"><b>Tu plan:</b> ${sm.ids.slice().sort((a,b)=>sm.plan.ord[a]-sm.plan.ord[b]).map(id=>`ejercicio ${sm.ids.indexOf(id)+1} (${sm.plan.min[id]} min)`).join(' → ')}.</div>`}
    ${sm.ids.map((id,i)=>{ const p=byId(id); return `<section class="card prob"><div class="row between"><h2>Ejercicio ${i+1}</h2><span class="chip">${esc(BLOQ[p.b].name)}</span></div><div class="st">${md(p.st)}</div></section>`; }).join('')}`;
  if(sm.stage==='done') return `${head('Simulacro · '+sm.ref,'Informe del simulacro',sm.mode==='rescate'?'Nota de rescate: solo planteamiento, conocimiento, técnicas y rigor. No cambia tu nivel.':'Nota de la parte A: media de los cinco ejercicios corregidos con la rúbrica.', `<span class="total">${fmt1(sm.nota)} / 10</span>`)}
    <section class="card"><div class="scroll-x"><table class="tbl"><thead><tr><th>Ejercicio</th><th>Subbloque</th><th>Nota</th><th>Fallos</th></tr></thead><tbody>${sm.res.map((r,i)=>{ const p=byId(r.id); return `<tr><td>${i+1} · ${esc(p.ti)}</td><td>${dotb(p.b)} ${p.sb}</td><td class="num"><b>${fmt1(r.score)}</b></td><td class="small">${r.items.filter(x=>x.v<1).length}</td></tr>`; }).join('')}</tbody></table></div>
    ${sm.plan&&sm.mode!=='rescate'?`<div class="stack" style="margin-top:12px"><h3 style="margin:0">Tu plan frente a lo que hiciste</h3><div class="scroll-x"><table class="tbl"><thead><tr><th>Ejercicio</th><th>Orden previsto</th><th>Minutos previstos</th><th>Minutos reales</th><th>Nota</th></tr></thead><tbody>${sm.res.map((r,i)=>{ const real=sm.real&&sm.real[r.id]; const dif=real&&sm.plan.min[r.id]?real-sm.plan.min[r.id]:null; return `<tr><td>${i+1}</td><td class="num">${sm.plan.ord[r.id]}</td><td class="num">${sm.plan.min[r.id]}</td><td class="num">${real||'—'}${dif!=null&&Math.abs(dif)>=10?` <span class="pill-status ${dif>0?'st-bad':'st-warn'}">${dif>0?'+':''}${dif}</span>`:''}</td><td class="num"><b>${fmt1(r.score)}</b></td></tr>`; }).join('')}</tbody></table></div><p class="tiny muted" style="margin:0">Si un ejercicio te llevó mucho más de lo previsto y puntuó poco, la lección es de gestión del tiempo, no de contenido: la próxima vez, deja un planteamiento escrito y pasa al siguiente.</p></div>`:''}
    ${sm.nota<1.25?`<div class="note bad small" style="margin-top:10px">Por debajo de 1,25 la parte A no supera el mínimo de la primera prueba.</div>`:''}</section>
    ${sm.res.map((r,i)=>{ const p=byId(r.id); return `<section class="card stack"><details><summary><b>Ejercicio ${i+1} · ${esc(p.ti)} · ${fmt1(r.score)} / 10</b></summary><div style="margin-top:10px" class="stack">${reportHTML(r.items, r.falt, sm.mode==='rescate')}</div></details></section>`; }).join('')}
    <div class="row"><button class="btn primary" data-act="simClose">Volver a Exámenes de Murcia</button></div>`;
  sm.rk=sm.rk||{}; sm.ids.forEach(id=>{ sm.rk[id]=sm.rk[id]||newRk(sm.mode==='rescate'); });
  const done=sm.ids.every(id=>rkDone(byId(id),sm.rk[id]));
  const total=sm.ids.reduce((a,id)=>{ const p=byId(id); return a+(rkDone(p,sm.rk[id])?rkScore(rkItems(p,sm.rk[id]),sm.rk[id]):0); },0)/sm.ids.length;
  return `${head('Simulacro · '+sm.ref,sm.mode==='rescate'?'Corrección del rescate':'Corrección','Corrige cada ejercicio con la rúbrica detallada. La nota de la parte A es la media de los cinco.', `<span class="total" data-total="sim">${fmt1(total)} / 10</span>`)}
  ${sm.mode==='rescate'?'':aiCardHTML('sim', sm.ai)}
  ${sm.ids.map((id,i)=>{ const p=byId(id); return `<section class="card stack"><div class="row between"><h2>Ejercicio ${i+1} · ${esc(p.ti)}</h2>${chipSub(p.sb)}</div>${sm.mode!=='rescate'&&sm.plan?`<label class="small">¿Cuántos minutos le dedicaste de verdad? (previsto: ${sm.plan.min[id]}) <input type="number" min="0" max="180" step="5" value="${(sm.real&&sm.real[id])||''}" data-input="realMin" data-id="${id}" style="width:80px"></label>`:''}
    <details><summary class="small"><b>Enunciado y solución</b></summary><div class="st" style="margin-top:8px">${md(p.st)}</div><div class="sol">${md(p.so)}</div></details>
    ${rubricHTML('sim:'+id, p, sm.rk[id])}</section>`; }).join('')}
  <div class="row"><button class="btn primary" data-act="simSave" ${done?'':'disabled'}>Guardar simulacro</button><span class="small muted">Revisa todos los indicadores de los cinco ejercicios para guardar.</span></div>`;
};

/* ---------- Objetivos y plan ---------- */
V.objetivos = () => {
  const g=goalOf(S); const pm=progressModel(S); const G=targetNota(S);
  const alloc=BK.map(b=>({b, gap:Math.max(0,targetR(S,b)-S.ratings[b].r)})); const tw=alloc.reduce((a,x)=>a+BLOQ[x.b].w*x.gap,0)||1;
  const hrs=b=>{ const x=alloc.find(a=>a.b===b); return g.hours*BLOQ[b].w*x.gap/tw; };
  const weeksTxt=w=>w<1?'menos de una semana':Math.round(w)+' semanas';
  let verdict;
  if(pm.gapW<=0) verdict=`<div class="note ok"><b>Ya estás en el nivel de tu objetivo.</b> Mantén el ritmo con simulacros completos y sube el listón si quieres ir a por más.</div>`;
  else if(pm.src==='estancado') verdict=`<div class="note bad"><b>En las últimas semanas tu nivel no ha subido.</b> Con tus datos no podemos estimar una fecha. Prueba a bajar un nivel, centrarte en los subbloques en rojo y corregirte siempre con la rúbrica.</div>`;
  else if(!pm.etaOk) verdict=`<div class="note"><b>Todavía no damos una fecha de llegada.</b> Hacen falta unas tres semanas de práctica corregida con rúbrica para medir tu ritmo real; una fecha calculada antes sería inventada.${pm.exam&&isFinite(pm.hoursNeeded)?` Como referencia, para llegar al examen del ${esc(fdate(pm.exam))} necesitarías unas <b>${Math.ceil(pm.hoursNeeded)} horas a la semana</b> (ahora planeas ${g.hours}).`:''}</div>`;
  else if(!pm.exam) verdict=`<div class="note"><b>Al ritmo actual llegarías entre el ${esc(fdate(pm.etaLo))} y el ${esc(fdate(pm.etaHi))}</b> (${weeksTxt(pm.weeksNeeded)} en el caso central).</div>`;
  else if(pm.etaHi<=pm.exam) verdict=`<div class="note ok"><b>Vas a tiempo.</b> Incluso en el caso lento (hacia el ${esc(fdate(pm.etaHi))}) llegarías antes del examen.</div>`;
  else if(pm.etaLo>pm.exam) verdict=`<div class="note bad"><b>Al ritmo actual no llegas a tiempo:</b> llegarías entre el ${esc(fdate(pm.etaLo))} y el ${esc(fdate(pm.etaHi))} y el examen es el ${esc(fdate(pm.exam))}. Necesitarías unas <b>${isFinite(pm.hoursNeeded)?Math.ceil(pm.hoursNeeded):'—'} horas a la semana</b> (ahora dedicas ${g.hours}).</div>`;
  else verdict=`<div class="note"><b>Va justo.</b> Tu rango de llegada (del ${esc(fdate(pm.etaLo))} al ${esc(fdate(pm.etaHi))}) contiene la fecha del examen (${esc(fdate(pm.exam))}). Cada hora extra a la semana te da margen.</div>`;
  return `${head('Tu situación y tu meta','Objetivos','Cuéntanos qué quieres conseguir y de cuánto tiempo dispones. Calculamos el nivel que necesitas en cada bloque y cuándo llegarás a tu ritmo.')}
  <section class="card stack"><h2>¿Qué quieres conseguir?</h2>
    <div class="choice">${Object.entries(OBJ).map(([k,o])=>`<button aria-pressed="${g.type===k}" data-act="goal" data-f="type" data-v="${k}"><b>${esc(o.name)}</b><span>${o.G?'Nota objetivo en la parte A: '+fmt1(o.G):'Sin nota fija'}</span><span>${esc(o.d)}</span></button>`).join('')}</div>
    <h2 style="margin-top:8px">Tu situación</h2>
    <div class="seg">${Object.entries(SITU).map(([k,[n,h]])=>`<button aria-pressed="${g.situ===k}" data-act="goal" data-f="situ" data-v="${k}">${esc(n)}</button>`).join('')}</div>
    <div class="grid g3">
      <div class="field"><label for="g-date">Fecha prevista del examen</label><input type="date" id="g-date" value="${esc(g.date||'')}" data-change="goalDate"><span class="tiny muted">Estimada: cámbiala cuando salga la convocatoria.</span></div>
      <div class="field"><label for="g-h">Horas de estudio a la semana: <span class="num" id="g-hv">${g.hours}</span></label><input type="range" id="g-h" min="1" max="35" value="${g.hours}" data-input="goalHours" data-change="goalHoursSave"></div>
      <div class="field"><label>Tu ritmo</label><span class="small">${pm.src==='datos'?`Medido con tus datos de las últimas 8 semanas: <b>+${fmt2(pm.rate/200)} escalones por semana</b> (${fmt2(pm.perHour/200*10)} décimas por hora).`:pm.src==='estancado'?'Estancado en las últimas semanas.':`Aún no hay datos suficientes; estimamos ${fmt2(pm.rate/200)} escalones por semana con ${g.hours} h.`}</span></div>
    </div></section>
  <section class="card stack"><div class="card-h"><h2>Tu previsión</h2><span class="sub">Objetivo: ${fmt1(G)} en la parte A</span></div>
    ${verdict}
    <div class="kpis"><div class="kpi"><span class="l">Nota estimada hoy</span><span class="v">${notaRango(S).txt}</span></div><div class="kpi accent"><span class="l">Nota objetivo</span><span class="v">${fmt1(G)}</span></div><div class="kpi"><span class="l">Te faltan</span><span class="v">${fmt1(pm.gapW/200)}<small> escalones</small></span><span class="d">Media ponderada por bloques</span></div><div class="kpi"><span class="l">Semanas hasta el examen</span><span class="v">${pm.weeksLeft==null?'—':Math.floor(pm.weeksLeft)}</span></div></div>
    <p class="tiny muted">Estimación orientativa: se basa en cómo has subido hasta ahora y en tus horas. Cuantos más problemas corrijas con la rúbrica, más fiable es. <a href="#/metodo">Ver cómo se calcula</a></p></section>
  <section class="card"><div class="card-h"><h2>Tu plan semanal</h2><span class="sub">${g.hours} h repartidas según lo que te falta y lo que pesa en Murcia</span></div>
    <div class="scroll-x"><table class="tbl" style="min-width:560px"><thead><tr><th>Bloque</th><th>Nivel hoy → necesario</th><th>Horas por semana</th><th>Empieza por</th></tr></thead><tbody>${BK.map(b=>{ const gp=gapsFor(S,b); const h=hrs(b); return `<tr class="click" data-go="#/bloque/${b}"><td>${dotb(b)} <b>${esc(BLOQ[b].name)}</b></td><td class="num">${lvTxt(gp.r)} → ${lvTxt(gp.tR)}</td><td class="num">${gp.done?'Repaso':fmt1(h)+' h'}</td><td class="small">${gp.done?'Simulacros':gp.subs.filter(x=>x.status!=='ok').slice(0,2).map(x=>x.s.id+' · '+esc(x.s.name)).join('<br>')}</td></tr>`; }).join('')}</tbody></table></div></section>`;
};

/* ---------- Evolución ---------- */
V.evolucion = () => {
  const days=UI.evo; const ds=dailySnaps(S, days||null); const G=targetNota(S);
  const cols=BHEX;
  const tR=Rw(Object.fromEntries(BK.map(b=>[b,targetR(S,b)])));
  const prof=dimProfile(S,null,40); const hs=S.hist.filter(h=>!days||Date.now()-h.d<=days*DAY);
  const byLv=[1,2,3,4,5,6,7].map(n=>{ const xs=hs.filter(h=>{ const p=byId(h.pid); return p&&p.n===n; }); return {n, c:xs.length, ok:xs.filter(h=>h.s>=.75).length}; });
  return `${head('Progreso','Evolución','Cómo has subido en cada bloque, cuánto te falta y dónde pierdes puntos según la rúbrica de Murcia.', `<div class="seg">${[[28,'4 semanas'],[56,'8 semanas'],[0,'Todo']].map(([d,l])=>`<button aria-pressed="${days===d}" data-act="evo" data-v="${d}">${l}</button>`).join('')}</div>`)}
  <section class="card"><div class="card-h"><h2>Nota estimada en la parte A</h2><span class="sub">Si el examen fuera ese día</span></div>
    ${lineChart('evo-nota',{series:[{name:'Nota estimada', color:'#121721', pts:ds.map(s=>[s.d, notaFrom(s.R)])}], yMin:0, yMax:10, yTicks:[0,2.5,5,7.5,10], yFmt:v=>fmt1(v), target:{v:G, label:'Objetivo '+fmt1(G)}, target2:G!==5?{v:5,label:'Aprobado'}:null, full:true})}</section>
  <section class="card"><div class="card-h"><h2>Nivel por bloque</h2><span class="sub">Escalera de 1 (4.º ESO) a 7 (oposición de Murcia)</span></div>
    ${lineChart('evo-bq',{series:BK.map(b=>({name:BLOQ[b].name, color:cols[b], pts:ds.map(s=>[s.d, lvVal(s.R[b])])})), yMin:1, yMax:8, yTicks:[1,2,3,4,5,6,7], yFmt:v=>'Nivel '+v, target:{v:lvVal(tR), label:'Objetivo'}, h:290, tipFmt:v=>'nivel '+fmt1(v), full:true})}
    <details style="margin-top:10px"><summary class="small"><b>Ver como tabla</b></summary><div class="scroll-x"><table class="tbl small"><thead><tr><th>Bloque</th><th>Al inicio del periodo</th><th>Hoy</th><th>Cambio</th><th>Necesario</th></tr></thead><tbody>${BK.map(b=>{ const a=ds.length?ds[0].R[b]:S.ratings[b].r, z=S.ratings[b].r; return `<tr><td>${dotb(b)} ${esc(BLOQ[b].name)}</td><td class="num">${lvTxt(a)}</td><td class="num">${lvTxt(z)}</td><td class="num">${z>=a?'+':''}${fmt2((z-a)/200)}</td><td class="num">${lvTxt(targetR(S,b))}</td></tr>`; }).join('')}</tbody></table></div></details></section>
  <div class="grid g2">
    <section class="card"><div class="card-h"><h2>Dimensiones de la rúbrica</h2><span class="sub">Tus últimas correcciones</span></div>${dimBars(prof, G)}</section>
    <section class="card"><div class="card-h"><h2>Aciertos por nivel</h2><span class="sub">Ejercicios con 7,5 o más</span></div>
      <div class="stack">${byLv.map(x=>`<div class="row small" style="flex-wrap:nowrap"><span style="width:150px;flex:none">Nivel ${x.n} · ${esc(LEVELS[x.n-1].name)}</span><div class="bar" style="flex:1"><i style="width:${x.c?x.ok/x.c*100:0}%;background:var(--ink)"></i></div><span class="num" style="width:70px;text-align:right">${x.c?x.ok+' / '+x.c:'—'}</span></div>`).join('')}</div></section>
  </div>
  <section class="card"><div class="card-h"><h2>Actividad</h2><span class="sub">Problemas corregidos por semana</span></div>${barChart('evo-wk',{bars:weekly(S,12), yMax:Math.max(4,...weekly(S,12).map(w=>w.v)), full:true, h:170})}</section>
  <section class="card"><div class="card-h"><h2>Mapa de subbloques</h2><a class="sub" href="#/subbloques">Ver todos</a></div>${subMap()}</section>`;
};

/* ---------- Diagnóstico adaptativo ---------- */
V.diagnostico = () => {
  const d=UI.diag;
  if(!d) return `${head('Prueba de nivel adaptativa','Prueba de nivel','Cada pregunta se elige según cómo vas respondiendo, para medir con precisión tu nivel en cada bloque. No uses calculadora ni busques nada: si no sabes una, pulsa «No lo sé», que no penaliza más que fallar y evita que el azar te sobrevalore.')}
    ${S.diag?`<div class="note small">Ya hiciste la prueba el ${esc(fdate(S.diag.d))}. Si la repites, se recalcula tu punto de partida en todos los bloques.</div>`:''}
    <section class="card stack"><div class="grid g3">${BK.map(b=>`<div class="row">${dotb(b)}<b>${esc(BLOQ[b].name)}</b><span class="small muted">${esc(BLOQ[b].temas)}</span></div>`).join('')}</div>
    <div class="grid g2">
      <div class="note stack" style="gap:8px"><b>Prueba completa · 30 preguntas</b><span class="small">Seis por bloque, unos 35 minutos. Es la recomendada: mide tu nivel con un margen de error de menos de un escalón y te sitúa también en los subbloques.</span><button class="btn primary" data-act="diagStart" data-per="6">Empezar la prueba completa</button></div>
      <div class="note stack" style="gap:8px"><b>Prueba rápida · 15 preguntas</b><span class="small">Tres por bloque, unos 15 minutos. Menos precisa: el margen de error es mayor, de en torno a un escalón y medio.</span><button class="btn" data-act="diagStart" data-per="3">Empezar la prueba rápida</button></div>
    </div>
    <p class="tiny muted" style="margin:0">Hay ${DIAG.length} preguntas de nivel 1 (4.º ESO) a 7 (oposición de Murcia). <a href="#/metodo">Cómo calculamos tu nivel</a></p></section>`;
  if(d.i>=d.N) return diagResultHTML(d);
  const b=BK[d.i%5], it=d.cur; const picked=d.picked;
  return `${head('Pregunta '+(d.i+1)+' de '+d.N, BLOQ[b].name, '')}
  <div class="dots">${Array.from({length:d.N},(_,i)=>`<i class="${i<d.i?(d.ans[i]?'ok':'ko'):i===d.i?'now':''}"></i>`).join('')}</div>
  <section class="card prob stack"><div class="row">${chipB(b)}${it.sb?`<span class="chip">${it.sb} · ${esc(subById(it.sb).name)}</span>`:''}</div><div class="st">${md(it.q)}</div>
    <div>${d.order.map((o,i)=>`<button class="opt ${picked!=null?(o.ok?'right':i===picked?'wrong':''):''}" data-act="diagPick" data-i="${i}" ${picked!=null?'disabled':''}>${mdi(o.t)}</button>`).join('')}
    <button class="opt" data-act="diagPick" data-i="ns" ${picked!=null?'disabled':''} style="${picked==='ns'?'border-color:var(--ink)':''}"><i>No lo sé</i></button></div>
    ${picked!=null?`<div class="note small">${mdi(it.e)}</div><div class="row"><button class="btn primary" data-act="diagNext">${d.i===d.N-1?'Ver resultado':'Siguiente'}</button></div>`:''}</section>`;
};
function diagResultHTML(d){
  const L=S.diag.levels; const R={}; BK.forEach(b=>R[b]=L[b].r);
  const rows=BK.map(b=>{ const x=L[b]; const lo=lvVal(x.r-x.sd), hi=lvVal(x.r+x.sd), max=7.6; const xs=d.log.filter(y=>y.b===b);
    return `<div><div class="row between small"><span>${dotb(b)} <b>${esc(BLOQ[b].name)}</b> <span class="muted">· ${xs.filter(y=>y.resp==='ok').length} de ${xs.length} aciertos</span></span><span class="num">nivel <b>${lvTxt(x.r)}</b> <span class="muted">(entre ${fmt1(clamp(lo,0.5,8))} y ${fmt1(clamp(hi,0.5,8))})</span></span></div>
      <div class="bullet" style="margin-top:6px" role="img" aria-label="Nivel ${lvTxt(x.r)}"><i style="left:${clamp(lo,0,max)/max*100}%;width:${(clamp(hi,0,max)-clamp(lo,0,max))/max*100}%;background:${bcol(b)};opacity:.35;position:absolute;top:0;bottom:0"></i><i style="width:${clamp(lvVal(x.r),0,max)/max*100}%;background:${bcol(b)}"></i><b style="left:calc(${clamp(lvVal(targetR(S,b)),0,max)/max*100}% - 1px)"></b></div>
      <span class="tiny muted">${esc(lvName(x.r))}</span></div>`; }).join('');
  const review=d.log.map((x,k)=>{ const it=DIAG.find(q=>q.id===x.id); return `<div class="li" style="cursor:default"><div><span class="tiny muted">${k+1} · ${esc(BLOQ[x.b].name)} · nivel ${x.n}${x.sb?' · '+x.sb:''}</span><div class="small">${mdi(it.q)}</div><div class="tiny">${x.resp==='ok'?'<span class="pill-status st-ok">Acierto</span>':x.resp==='ns'?'<span class="pill-status st-new">No lo sé</span>':'<span class="pill-status st-bad">Fallo</span>'} ${mdi(it.e)}</div></div></div>`; }).join('');
  return `${head('Resultado','Tu punto de partida','Tu nivel en cada bloque, con su margen de error. Cada problema que corrijas a partir de ahora lo afina.', `<span class="chip">Nota estimada hoy: ${notaRango(S).txt} / 10</span>`)}
    <section class="card stack">${rows}<p class="tiny muted" style="margin:0">La barra clara es el margen de error: tu nivel real está ahí con una probabilidad de dos tercios. La marca negra es el nivel que necesitas para tu objetivo.</p>
    <div class="row"><button class="btn primary" data-go="#/objetivos">Fijar mi objetivo</button><button class="btn" data-go="#/practicar">Empezar a practicar</button><button class="btn ghost" data-act="diagReset">Repetir la prueba</button></div></section>
    <section class="card"><details><summary><b>Revisar las ${d.log.length} preguntas</b></summary><div class="list" style="margin-top:10px">${review}</div></details></section>`;
}

/* ---------- Cómo te medimos ---------- */
const texN = x => fmt2(x).replace(',', '{,}');
V.metodo = () => {
  const g=goalOf(S); const G=targetNota(S); const pm=progressModel(S); const R=curR(S);
  const ex={R:1600, n:6}; const D=LEVELS[ex.n-1].r; const E=expected(ex.R,D); const K=40; const sEx=.6;
  const rows=BK.map(b=>({b, r:R[b], t:targetR(S,b), nb:notaBloque(R[b])}));
  return `${head('Transparencia','Cómo te medimos','Este es el método exacto con el que la app calcula tu nivel, tu nota estimada, la distancia a tu objetivo y la fecha de llegada. Con tus datos de hoy.')}
  <section class="card stack"><h2>En resumen</h2>
    <p>Cada bloque tiene un <b>nivel</b> que sube o baja con cada problema que corriges con la rúbrica, según lo difícil que era el problema y la nota que te pones. Con esos niveles estimamos qué nota sacarías hoy en un examen de Murcia, la comparamos con la que necesitas para tu objetivo y medimos a qué ritmo te acercas.</p>
    <div class="note small">Es el mismo principio que el sistema Elo del ajedrez: resolver bien un problema difícil sube mucho tu nivel; fallar uno fácil lo baja.</div></section>
  <section class="card stack"><h2>1. La escalera</h2>
    <p class="small">Internamente cada nivel es una puntuación. El nivel 7 corresponde a resolver un examen de Murcia con un 5.</p>
    <div class="scroll-x"><table class="tbl"><thead><tr><th>Nivel</th><th>Referencia</th><th>Puntuación interna</th><th>Nota estimada en Murcia</th></tr></thead><tbody>${LEVELS.map(l=>`<tr><td><b>${l.n}</b></td><td>${esc(l.name)}</td><td class="num">${l.r}</td><td class="num">${fmt1(notaBloque(l.r))}</td></tr>`).join('')}<tr><td><b>${lvTxt(rFor(7.5))}</b></td><td>Nivel de plaza (7,5)</td><td class="num">${Math.round(rFor(7.5))}</td><td class="num">7,5</td></tr></tbody></table></div></section>
  <section class="card stack"><h2>2. Dificultad de cada problema</h2>
    <p class="small">Cada problema del banco tiene un nivel del 1 al 7, asignado comparándolo con los exámenes oficiales: los de Murcia están en el 6 y el 7, uno tipo PAU en el 3. Su dificultad es $D = 800 + 200\\,(n-1)$, y los oficiales suman 40 puntos más.</p></section>
  <section class="card stack"><h2>3. Qué pasa cuando te corriges</h2>
    <p class="small">Tu nota en el problema ($s$, de 0 a 1) sale de la rúbrica detallada. Cada indicador oficial del tribunal se desglosa en subindicadores observables (unos 20 por ejercicio, algunos comunes y otros escritos para ese problema), y cada uno se valora en cinco niveles: 0, ¼, ½, ¾ o completo. Se suman, se resta la penalización por ortografía según las categorías oficiales y se divide entre 10. La comparamos con lo que se esperaba de tu nivel $R$:</p>
    <p>$$E = \\frac{1}{1+10^{(D-R)/400}},\\qquad R_{\\text{nuevo}} = R + K\\,(s - E).$$</p>
    <p class="small">$K$ vale 60 en los 8 primeros problemas de un bloque, 40 hasta el 25 y 28 después: al principio tu nivel se ajusta rápido y luego se estabiliza. Cada subbloque tiene su propio nivel, que se actualiza igual (con $K$ = 70, 45 y 30). Así sabemos qué parte concreta del bloque te falla.</p>
    <div class="note small"><b>Ejemplo.</b> Estás en ${ex.R} (nivel ${lvTxt(ex.R)}) y resuelves un problema de nivel ${ex.n} ($D = ${D}$). Se esperaba $E = ${texN(E)}$. Si te pones un ${fmt1(sEx*10)}, subes $40\\cdot(${texN(sEx)} - ${texN(E)}) \\approx ${Math.round(K*(sEx-E))}$ puntos. Si te pones un 2, bajas unos ${Math.round(K*(E-.2))}.</div></section>
  <section class="card stack"><h2>4. Tu nota estimada</h2>
    <p class="small">Para cada bloque estimamos la nota que sacarías en un problema de Murcia con una curva más suave que la de la actualización:</p>
    <p>$$\\hat n_b = \\frac{10}{1+10^{(2000-R_b)/600}}$$</p>
    <p class="small">La nota de la parte A es la media de los cinco bloques ponderada por lo que ha caído en Murcia. Cada aparición cuenta 1, y las de 2018, 2021 y 2025 cuentan 2 porque reflejan mejor al tribunal actual.</p>
    <div class="scroll-x"><table class="tbl"><thead><tr><th>Bloque</th><th>Apariciones 2002–2025</th><th>Puntos</th><th>Peso</th><th>Tu nota estimada</th></tr></thead><tbody>${BK.map(b=>{ const n=APPEAR.reduce((a,e)=>a+e.items.filter(([,sb])=>subById(sb).b===b).length,0); return `<tr><td>${dotb(b)} ${esc(BLOQ[b].name)}</td><td class="num">${n}</td><td class="num">${APPW.c[b]}</td><td class="num">${Math.round(BLOQ[b].w*100)} %</td><td class="num">${fmt1(notaBloque(R[b]))}</td></tr>`; }).join('')}<tr><td><b>Parte A</b></td><td></td><td class="num">${APPW.t}</td><td class="num">100 %</td><td class="num"><b>${fmt1(notaFrom(R))}</b></td></tr></tbody></table></div></section>
  <section class="card stack"><h2>5. Lo que necesitas para tu objetivo</h2>
    <p class="small">Despejando la curva anterior, el nivel que hace falta para sacar una nota $G$ es:</p>
    <p>$$R^{*} = 2000 + 600\\,\\log_{10}\\frac{G}{10-G}$$</p>
    <div class="scroll-x"><table class="tbl"><thead><tr><th>Objetivo</th><th>Nota</th><th>Nivel necesario</th></tr></thead><tbody>${Object.entries(OBJ).filter(([,o])=>o.G).map(([k,o])=>`<tr${g.type===k?' style="background:#FBE7C2"':''}><td>${esc(o.name)}</td><td class="num">${fmt1(o.G)}</td><td class="num">${lvTxt(rFor(o.G))}</td></tr>`).join('')}</tbody></table></div>
    <p class="small">La <b>distancia</b> es la media ponderada de lo que le falta a cada bloque para llegar a $R^*$ (los bloques que ya lo superan cuentan 0). Un escalón son 200 puntos.</p>
    <div class="scroll-x"><table class="tbl"><thead><tr><th>Bloque</th><th>Tu nivel</th><th>Necesario</th><th>Te falta</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${dotb(x.b)} ${esc(BLOQ[x.b].name)}</td><td class="num">${lvTxt(x.r)}</td><td class="num">${lvTxt(x.t)}</td><td class="num">${x.r>=x.t?'—':fmt1((x.t-x.r)/200)+' escalones'}</td></tr>`).join('')}<tr><td><b>Distancia ponderada</b></td><td></td><td></td><td class="num"><b>${fmt1(pm.gapW/200)} escalones</b></td></tr></tbody></table></div></section>
  <section class="card stack"><h2>6. Tu ritmo y la fecha estimada</h2>
    <p class="small">Si tienes al menos 6 registros en las últimas 8 semanas, repartidos en 10 días o más, calculamos tu ritmo con una <b>regresión lineal</b> de tu nivel ponderado frente al tiempo. Si no, lo estimamos con tus horas: unos 5,5 puntos por hora de estudio, que habrá que ajustar con datos reales.</p>
    <p>$$\\text{semanas necesarias} = \\frac{\\text{distancia}}{\\text{ritmo}},\\qquad \\text{horas/semana necesarias} = \\frac{\\text{distancia}}{\\text{semanas hasta el examen}\\times\\text{ritmo por hora}}$$</p>
    <div class="note small"><b>Por qué damos rangos.</b> Las notas de la rúbrica las pones tú (y es habitual ser generoso) y los parámetros del modelo están fijados a mano, todavía sin calibrar con datos reales. Por eso la nota estimada se muestra como un rango que se estrecha con cada problema corregido, y la fecha de llegada solo aparece cuando hay al menos tres semanas de práctica; entonces se da un intervalo que supone un ritmo entre un 70 % y un 140 % del medido.</div>
    <div class="note small"><b>Con tus datos:</b> ritmo ${pm.src==='datos'?`medido de ${fmt2(pm.rate/200)} escalones por semana`:pm.src==='estancado'?'estancado (tu nivel no ha subido en las últimas semanas)':`estimado de ${fmt2(pm.rate/200)} escalones por semana con ${g.hours} h`}; distancia de ${fmt1(pm.gapW/200)} escalones; ${pm.etaOk&&pm.etaLo?`llegada entre el ${esc(fdate(pm.etaLo))} y el ${esc(fdate(pm.etaHi))} (ritmo ±40 %)`:'sin fecha de llegada hasta tener unas tres semanas de datos'}${pm.weeksLeft!=null?`; ${Math.floor(pm.weeksLeft)} semanas hasta el examen previsto`:''}.</div></section>
  <section class="card stack"><h2>7. La prueba de nivel</h2>
    <p class="small">Es adaptativa y bayesiana. Para cada bloque partimos de una distribución de posibles niveles centrada en 1.300 (entre 2.º de Bachillerato y 1.º de grado) y muy ancha. Cada respuesta la actualiza con el modelo de respuesta al ítem de tres parámetros:</p>
    <p>$$P(\text{acierto}\mid\theta) = c + (1-c)\,\frac{1}{1+10^{(D-\theta)/250}},\qquad c = 0{,}25$$</p>
    <p class="small">$c$ es la probabilidad de acertar al azar con cuatro opciones, y «No lo sé» no la incluye. La siguiente pregunta de cada bloque es la de dificultad más cercana a tu nivel estimado en ese momento, que es la que más información da, y procuramos que toque subbloques distintos. Tu punto de partida es la media de la distribución final y el margen de error es su desviación típica. En la prueba completa (6 preguntas por bloque) ese margen suele quedar por debajo de un escalón. Los subbloques que han salido parten de tu nivel en el bloque, corregido según acertaste o fallaste sus preguntas.</p></section>
  <section class="card stack"><h2>Límites del método</h2>
    <div class="stack small">
      <span>• <b>Te corriges tú.</b> La estimación es tan buena como tu corrección. Por eso la rúbrica baja a indicadores concretos: es más difícil engañarse marcando «bien» un paso concreto que poniéndose un 7 a ojo.</span>
      <span>• <b>La calibración es inicial.</b> Los niveles de los problemas, la curva de la nota y el ritmo por hora los he fijado comparando con los exámenes oficiales. Se recalibrarán con las notas reales de los opositores que usen la app.</span>
      <span>• <b>Solo mide la parte A.</b> La plaza depende también del tema (parte B), de la segunda prueba y del concurso de méritos.</span>
      <span>• <b>No es una predicción del tribunal.</b> Es una orientación para decidir qué estudiar y cuánto.</span></div></section>`;
};

/* ---------- Información oficial ---------- */
const DOCS = [
  {f:'docs/criterios_valoracion_2025.pdf', t:'Criterios de valoración 2025', s:'Comisión de selección · Especialidad 006 Matemáticas', d:'Rúbrica de la parte A que usa la app: rigor 1, conocimiento 1, técnicas 1, planteamiento 1, desarrollo 3, resultados 2 y presentación 1. Penalización por ortografía, parte B, segunda prueba y condiciones (2 h 30 min, sin calculadora).'},
  {f:'docs/criterios_valoracion_2023.pdf', t:'Criterios de valoración 2023', s:'Prueba única (estabilización)', d:'En el ingreso de 2023 no hubo problemas: parte A con desarrollo de un tema y parte B con unidad didáctica.'},
  {f:'docs/criterios_valoracion_2021.pdf', t:'Criterios de valoración 2021', s:'Verificable en la sede electrónica de la CARM', d:'Parte A práctica: rigor 1, conocimiento 1, técnicas 1, resolución (planteamiento y desarrollo) 6 y resultados 1. Tres horas.', csv:'CARM-783e08b7-cc60-109f-c891-0050569b6280'},
  {f:'docs/examen_parte_A_2021.pdf', t:'Enunciado oficial de la parte A 2021', s:'Primera prueba · 5 ejercicios', d:'Hoja oficial del examen con las instrucciones: 10 puntos (2 por ejercicio), 3 horas, dos bolígrafos azules no borrables.'}
];
const LINKS = [
  ['Convocatoria de 2025 (Orden de 20 de noviembre de 2024, BORM n.º 272)','https://borm.es/services/anuncio/831952/pdf','Bases: estructura de las pruebas, ponderaciones, mínimos y listas de interinidad.'],
  ['Corrección de errores con los anexos de la convocatoria de 2025','https://www.borm.es/services/anuncio/ano/2024/numero/5862/pdf?id=831976','Texto íntegro con los anexos.'],
  ['Temario oficial de Matemáticas (Orden de 9 de septiembre de 1993, BOE n.º 226)','https://www.boe.es/boe/dias/1993/09/21/pdfs/A27400-27438.pdf','Los 71 temas. Es el que sigue en vigor.'],
  ['Real Decreto 276/2007 (reglamento de ingreso en los cuerpos docentes)','https://www.boe.es/buscar/act.php?id=BOE-A-2007-4372','Norma estatal que fija cómo son las pruebas.'],
  ['Portal de Recursos Humanos de Educación de la CARM','https://rrhheducacion.carm.es/','Donde se publican convocatorias, listas, tribunales y criterios.'],
  ['Verificación de documentos de la CARM (CSV)','https://sede.carm.es/verificardocumentos','Para comprobar la autenticidad de los criterios con su código seguro de verificación.'],
  ['Oposiciones 2027: la Consejería propone 2.108 plazas (18/11/2026)','https://laadministracionaldia.inap.es/noticia.asp?id=1521038','La convocatoria se publicará en el BORM antes de final de año.']
];
V.oficial = () => `${head('Fuentes oficiales','Información oficial','Los documentos con los que el tribunal corrige y las normas que regulan la oposición. La app resume lo esencial; lo que vale es siempre el texto oficial de cada convocatoria.')}
  <div class="note hi small"><b>Convocatoria de 2027.</b> La Consejería de Educación ha propuesto a los sindicatos 2.108 plazas de Secundaria, FP y otros cuerpos para las oposiciones de 2027, y ha anunciado que la convocatoria saldrá en el BORM antes de que acabe 2026. Aún no hay fecha de examen: en 2025 el acto de presentación fue el 21 de junio.</div>
  <section class="card stack"><div class="card-h"><h2>Cómo es la oposición</h2><span class="sub">Según la convocatoria y los criterios de 2025</span></div>
    <div class="grid g2">
      <div class="note small"><b>Primera prueba · conocimientos específicos (50 %)</b><br>Parte A, práctica: problemas, 2 h 30 min, sin calculadora.<br>Parte B: desarrollo de un tema por escrito, 2 horas.<br>Cada parte pesa el 50 %. Mínimo de 1,25 en cada una y 5 de media para superarla.</div>
      <div class="note small"><b>Segunda prueba · aptitud pedagógica (50 %)</b><br>Defensa de la programación (hasta 30 min), exposición de una unidad didáctica y 15 min de debate; 1 h de preparación. Se supera con un 5.<br>Después, fase de concurso de méritos.</div>
    </div></section>
  <section class="card stack"><div class="card-h"><h2>Documentos con los que se corrige</h2><span class="sub">Copias de los documentos publicados por la comisión de selección</span></div>
    <div class="list">${DOCS.map(d=>`<div class="li" style="cursor:default;grid-template-columns:1fr auto"><div class="stack" style="gap:2px"><span class="t">${esc(d.t)}</span><span class="tiny muted">${esc(d.s)}</span><span class="small">${esc(d.d)}</span>${d.csv?`<span class="tiny muted">CSV: ${esc(d.csv)}</span>`:''}</div><a class="btn sm" href="${d.f}" target="_blank" rel="noopener">Abrir PDF</a></div>`).join('')}</div></section>
  <section class="card stack"><div class="card-h"><h2>Rúbrica de la parte A: 2021 frente a 2025</h2></div>
    <div class="scroll-x"><table class="tbl"><thead><tr><th>Dimensión</th><th>2021</th><th>2025</th></tr></thead><tbody>
      <tr><td>Rigor en el desarrollo</td><td class="num">1</td><td class="num">1</td></tr>
      <tr><td>Conocimiento científico de la especialidad</td><td class="num">1</td><td class="num">1</td></tr>
      <tr><td>Dominio de habilidades técnicas</td><td class="num">1</td><td class="num">1</td></tr>
      <tr><td>Planteamiento</td><td class="num" rowspan="2">6 (resolución)</td><td class="num">1</td></tr>
      <tr><td>Desarrollo y resolución</td><td class="num">3</td></tr>
      <tr><td>Resultados obtenidos</td><td class="num">1</td><td class="num">2</td></tr>
      <tr><td>Presentación y orden</td><td class="num">—</td><td class="num">1</td></tr>
      <tr><td>Ortografía y expresión</td><td class="small">−0,5 por falta (−0,25 por abreviaturas); máximo −3 por ejercicio</td><td class="small">−0,5 por falta; máximo −3 por parte</td></tr>
      <tr><td>Duración</td><td>3 horas</td><td>2 h 30 min</td></tr></tbody></table></div>
    <p class="small muted">En 2025 la rúbrica da más peso a los resultados y añade la presentación. La app corrige siempre con la de 2025, la última publicada. Es la que se aplica a toda la parte A: aquí la usamos ejercicio a ejercicio para que sepas dónde pierdes puntos.</p></section>
  <section class="card stack"><div class="card-h"><h2>Normativa y enlaces oficiales</h2></div>
    <div class="list">${LINKS.map(([t,u,d])=>`<a class="li" href="${u}" target="_blank" rel="noopener" style="text-decoration:none"><div><span class="t">${esc(t)}</span><div class="ex">${esc(d)}</div></div>${ico('chev','chev')}</a>`).join('')}</div></section>`;

/* ---------- Banco, importar, alumnos, cuenta ---------- */
V.banco = () => {
  const f=UI.bank; const q=f.q.trim().toLowerCase();
  const ps=bank().filter(p=>(!f.b||p.b===f.b)&&(!f.sb||p.sb===f.sb)&&(!f.n||p.n===+f.n)&&(f.m===''||(f.m==='prep'?!p.m:p.m===f.m))&&(!q||(p.ti+' '+p.st).toLowerCase().includes(q)));
  const cnt=m=>bank().filter(p=>m==='prep'?!p.m:p.m===m).length;
  return `${head(bank().length+' problemas resueltos','Banco de problemas','Todos los problemas tienen solución completa redactada como pide el tribunal. Los gemelos reproducen la estructura de un ejercicio real de Murcia con otros datos.')}
  <section class="card stack"><div class="seg" role="group" aria-label="Origen">${[['','Todos'],['oficial','Oficiales de Murcia ('+cnt('oficial')+')'],['gemelo','Gemelos ('+cnt('gemelo')+')'],['estilo','Estilo Murcia ('+cnt('estilo')+')'],['prep','Preparación ('+cnt('prep')+')']].map(([v,l])=>`<button aria-pressed="${f.m===v}" data-act="bf" data-f="m" data-v="${v}">${l}</button>`).join('')}</div>
    <div class="grid g4"><div class="field"><label for="bf-b">Bloque</label><select id="bf-b" data-change="bfSel" data-f="b"><option value="">Todos</option>${BK.map(b=>`<option value="${b}" ${f.b===b?'selected':''}>${esc(BLOQ[b].name)}</option>`).join('')}</select></div>
    <div class="field"><label for="bf-sb">Subbloque</label><select id="bf-sb" data-change="bfSel" data-f="sb"><option value="">Todos</option>${SUB.filter(s=>!f.b||s.b===f.b).map(s=>`<option value="${s.id}" ${f.sb===s.id?'selected':''}>${s.id} · ${esc(s.name)}</option>`).join('')}</select></div>
    <div class="field"><label for="bf-n">Nivel</label><select id="bf-n" data-change="bfSel" data-f="n"><option value="">Todos</option>${LEVELS.map(l=>`<option value="${l.n}" ${+f.n===l.n?'selected':''}>${l.n} · ${esc(l.name)}</option>`).join('')}</select></div>
    <div class="field"><label for="bf-q">Buscar</label><input type="search" id="bf-q" value="${esc(f.q)}" data-change="bfSel" data-f="q" placeholder="Palabra del enunciado"></div></div></section>
  <section class="card"><div class="card-h"><h2>${ps.length} problemas</h2></div>${probList(ps)}</section>`;
};
V.importar = () => {
  if(ME.role!=='profesor') return V.inicio();
  const prev=UI.imp?parseProblems(UI.imp):[];
  return `${head('Profesor','Importar problemas','Pega problemas con este formato. Cada problema se asocia a un bloque, un subbloque y, si procede, al examen de Murcia del que es gemelo.')}
  <section class="card stack"><pre class="small" style="white-space:pre-wrap;background:var(--soft);padding:12px;border-radius:8px;margin:0">P id=mi01 n=6 b=GE sb=GE4 t=53 m=gemelo ref=2025-P4 | Título del problema
Enunciado con fórmulas entre $...$
> Pista 1
> Pista 2
---
Solución completa: planteamiento, desarrollo y conclusión.
!! Error típico (opcional)
===</pre>
  <p class="small muted">n = nivel de 1 a 7 · b = NU, AL, AN, GE o PR · sb = código de subbloque (NU1…PR6) · m = oficial, gemelo o estilo (déjalo vacío si no es de Murcia) · ref = año y ejercicio de Murcia.</p>
  <textarea id="imp" rows="12" data-input="imp" placeholder="Pega aquí tus problemas">${esc(UI.imp)}</textarea>
  <div class="row"><button class="btn primary" data-act="impSave" ${prev.length?'':'disabled'}>Añadir ${prev.length} ${prev.length===1?'problema':'problemas'}</button><span class="small muted">${prev.length?prev.map(p=>p.sb).join(', '):''}</span></div></section>`;
};
V.alumnos = () => {
  if(ME.role!=='profesor') return V.inicio();
  const st=Backend.students(ME.classCode);
  return `${head('Clase '+ME.classCode,'Alumnos','Tus alumnos se unen con el código de clase al registrarse.')}
  <section class="card scroll-x">${st.length?`<table class="tbl"><thead><tr><th>Alumno</th><th>Objetivo</th><th>Nivel</th><th>Nota hoy</th><th>Llegada estimada</th><th>Bloque más flojo</th><th>Última actividad</th></tr></thead><tbody>${st.map(u=>{ const s=Backend.loadState(u.id)||freshState(); const sm=summary(s); const pm=progressModel(s); const w=BK.slice().sort((a,c)=>(s.ratings[a].r-targetR(s,a))-(s.ratings[c].r-targetR(s,c)))[0];
    return `<tr class="click" data-go="#/alumno/${u.id}"><td><b>${esc(u.name)}</b></td><td class="small">${esc(OBJ[goalOf(s).type].name)}</td><td class="num">${lvTxt(Rw(sm.R))}</td><td class="num">${fmt1(sm.nota)}</td><td class="small">${esc(etaTxt(pm))}${pm.onTime===false?' <span class="pill-status st-bad">tarde</span>':''}</td><td>${dotb(w)} ${esc(BLOQ[w].name)}</td><td class="small">${sm.last?esc(fdate(sm.last)):'—'}</td></tr>`; }).join('')}</tbody></table>`:`<p class="muted">Aún no hay alumnos. Comparte el código <b>${esc(ME.classCode)}</b>.</p>`}</section>`;
};
V.alumno = (id) => {
  const u=Backend.students(ME.classCode).find(x=>x.id===id); if(!u) return V.alumnos();
  const s=Backend.loadState(id)||freshState(); const sm=summary(s); const pm=progressModel(s);
  const top=[]; BK.forEach(b=>gapsFor(s,b).subs.slice(0,2).forEach(x=>{ if(x.status!=='ok') top.push({b,x,w:BLOQ[b].w*x.pri}); })); top.sort((a,c)=>c.w-a.w);
  return `${head('Alumno', u.name, `Objetivo: ${esc(OBJ[goalOf(s).type].name.toLowerCase())} · ${goalOf(s).hours} h por semana`)}
  <div class="kpis"><div class="kpi"><span class="l">Nivel global</span><span class="v">${lvTxt(Rw(sm.R))}</span></div><div class="kpi"><span class="l">Nota hoy</span><span class="v">${fmt1(sm.nota)}</span></div><div class="kpi accent"><span class="l">Objetivo</span><span class="v">${fmt1(targetNota(s))}</span></div><div class="kpi"><span class="l">Llegada</span><span class="v" style="font-size:1.2rem">${esc(etaTxt(pm))}</span></div></div>
  <section class="card stack"><h2>Bloques</h2>${BK.map(b=>`<div><div class="row between small"><span>${dotb(b)} <b>${esc(BLOQ[b].name)}</b></span><span class="num">${lvTxt(s.ratings[b].r)} → ${lvTxt(targetR(s,b))}</span></div><div style="margin-top:6px">${bulletHTML(s.ratings[b].r,targetR(s,b),b)}</div></div>`).join('')}</section>
  <section class="card"><h2>Lo que le falta</h2>${top.slice(0,5).map(({b,x})=>gapItem(b,x,s)).join('')}</section>
  <section class="card"><h2>Rúbrica</h2>${dimBars(dimProfile(s), targetNota(s))}</section>`;
};
V.cuenta = () => {
  const style=Store.get('ui.style','editorial');
  return `${head('Mi cuenta', ME.name, esc(ME.email)+' · '+(ME.role==='profesor'?'Profesor · clase '+esc(ME.classCode):'Opositor'+(ME.classCode?' · clase '+esc(ME.classCode):'')))}
  <section class="card stack"><h2>Aspecto del menú lateral</h2>
    <div class="seg">${[['editorial','Arena'],['starlight','Marfil'],['resume','Tinta']].map(([k,l])=>`<button aria-pressed="${style===k}" data-act="style" data-v="${k}">${l}</button>`).join('')}</div></section>
  <section class="card stack"><h2>Comentarios y erratas</h2><p class="small muted">Esta es una versión de prueba y tu opinión la mejora. Se abre una página de GitHub con el formulario ya preparado (hace falta una cuenta gratuita de GitHub). En cada problema hay además un botón «Avisar de una errata» con su identificador ya puesto.</p>
    <div class="row"><a class="btn primary" href="${comentUrl()}" target="_blank" rel="noopener">Enviar un comentario</a></div></section>
  <section class="card stack"><h2>Datos</h2><p class="small muted">En esta versión de demostración tus datos se guardan en este navegador. En la versión publicada irán a un servidor con copia de seguridad.</p>
    <div class="row"><button class="btn" data-act="export">Descargar mis datos</button><button class="btn bad" data-act="reset">Borrar mi progreso</button><button class="btn" data-act="logout">Cerrar sesión</button></div></section>`;
};

/* ---------- Acceso ---------- */
function authHTML(mode){
  const feat = ['Problemas de los exámenes de Murcia 2021 y 2025 resueltos paso a paso, con gemelos para practicar','Te corriges con la rúbrica oficial del tribunal de Murcia','Sabes exactamente qué subbloque te falta y cuándo llegarás a tu objetivo'];
  return `<div class="auth"><div class="auth-brand"><span class="mark" style="font-size:44px">${MARK}</span><h1>Escalera Murcia</h1><p>Prepara la parte A de la oposición de Matemáticas de la Región de Murcia, escalón a escalón.</p>
    <ul class="feat">${feat.map(f=>`<li>${ico('check')}<span>${esc(f)}</span></li>`).join('')}</ul><p class="small" style="margin-top:auto">en n pasos</p></div>
  <form class="auth-form" data-form="${mode}"><h2>${mode==='login'?'Entra en tu cuenta':'Crea tu cuenta'}</h2>
    ${mode==='register'?`<div class="field"><label for="f-name">Nombre</label><input type="text" id="f-name" name="name" autocomplete="name" required></div>`:''}
    <div class="field"><label for="f-email">Correo</label><input type="text" id="f-email" name="email" autocomplete="email" inputmode="email" required></div>
    <div class="field"><label for="f-pass">Contraseña</label><input type="password" id="f-pass" name="pass" autocomplete="${mode==='login'?'current-password':'new-password'}" required></div>
    ${mode==='register'?`<div class="field"><label>Soy</label><div class="seg"><label class="row" style="font-weight:500"><input type="radio" name="role" value="alumno" checked> Opositor</label><label class="row" style="font-weight:500"><input type="radio" name="role" value="profesor"> Profesor o academia</label></div></div>
    <div class="field"><label for="f-code">Código de clase (opcional)</label><input type="text" id="f-code" name="classCode" placeholder="MAT-XXXX"></div>`:''}
    <div class="note bad small hidden" id="f-err"></div>
    <button class="btn primary" type="submit">${mode==='login'?'Entrar':'Crear cuenta'}</button>
    <button class="btn ghost" type="button" data-act="${mode==='login'?'toRegister':'toLogin'}">${mode==='login'?'¿No tienes cuenta? Regístrate':'Ya tengo cuenta'}</button>
    <div class="divider">Cuentas de demostración</div>
    <div class="row"><button class="btn sm" type="button" data-act="demo" data-u="alumno@demo.es">Opositor</button><button class="btn sm" type="button" data-act="demo" data-u="lucia@demo.es">Opositora avanzada</button><button class="btn sm" type="button" data-act="demo" data-u="profe@demo.es">Profesor</button></div></form></div>`;
}
