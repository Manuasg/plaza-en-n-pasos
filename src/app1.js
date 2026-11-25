'use strict';
/* ================= Estructura: bloques, subbloques y temas ================= */
const LEVELS = [
  {n:1, r:800,  name:'4.º ESO'},
  {n:2, r:1000, name:'1.º Bachillerato'},
  {n:3, r:1200, name:'2.º Bachillerato · PAU'},
  {n:4, r:1400, name:'Grado · 1.º'},
  {n:5, r:1600, name:'Grado · 2.º y 3.º'},
  {n:6, r:1800, name:'Preoposición'},
  {n:7, r:2000, name:'Oposición Murcia'}
];
const BLOQ = {
  NU:{name:'Números', temas:'Temas 1–10, 15 y 69–71', w:.10, desc:'Divisibilidad, congruencias, inducción, numeración, combinatoria y sucesiones.'},
  AL:{name:'Álgebra', temas:'Temas 11–14 y 16–20', w:.25, desc:'Polinomios, ecuaciones y desigualdades, matrices, determinantes y sistemas.'},
  AN:{name:'Análisis', temas:'Temas 21–33', w:.25, desc:'Límites, continuidad, derivadas, integrales y ecuaciones funcionales.'},
  GE:{name:'Geometría', temas:'Temas 34–56', w:.20, desc:'Triángulo y circunferencia, geometría analítica, lugares geométricos y cónicas.'},
  PR:{name:'Probabilidad y estadística', temas:'Temas 57–68', w:.20, desc:'Probabilidad condicionada, independencia, variables aleatorias e inferencia.'}
};
const BK = ['NU','AL','AN','GE','PR'];
const bcol = b => `var(--b-${b})`;
const SUB = [
  {id:'NU1', b:'NU', name:'Métodos de demostración e inducción', temas:[1,69,70], skills:['Esquema completo de inducción: caso base, hipótesis, paso y conclusión','Elegir entre directa, contrarrecíproco, absurdo o inducción','Desigualdades por inducción con desigualdad auxiliar']},
  {id:'NU2', b:'NU', name:'Divisibilidad, mcd, mcm y Bézout', temas:[4], skills:['$\\operatorname{mcd}(a,b) = \\operatorname{mcd}(b, a-qb)$ y algoritmo de Euclides','Identidad de Bézout y lema de Euclides','Factorizar para demostrar divisibilidad']},
  {id:'NU3', b:'NU', name:'Congruencias y restos', temas:[4], skills:['Aritmética modular y restos de potencias','Pequeño teorema de Fermat y teorema de Euler','Restos cuadráticos para descartar casos']},
  {id:'NU4', b:'NU', name:'Sistemas de numeración y cifras', temas:[1], skills:['Escribir un número en base $b$ como polinomio','Restricciones de las cifras respecto a la base','Criterios de divisibilidad por cifras']},
  {id:'NU5', b:'NU', name:'Ecuaciones diofánticas', temas:[15], skills:['Condición de existencia: $\\operatorname{mcd}(a,b)\\mid c$','Solución particular y general','Imponer las restricciones del enunciado']},
  {id:'NU6', b:'NU', name:'Combinatoria y grafos', temas:[2,3], skills:['Variaciones, permutaciones y combinaciones con y sin repetición','Principio de inclusión-exclusión','Grafos: grados, árboles y caminos eulerianos']},
  {id:'NU7', b:'NU', name:'Sucesiones y recurrencias', temas:[8], skills:['Recurrencias lineales con la ecuación característica','Sumas telescópicas','Progresiones aritméticas y geométricas']},
  {id:'NU8', b:'NU', name:'Números complejos y números reales', temas:[5,6,7,9,10], skills:['Forma polar, fórmula de De Moivre y raíces $n$-ésimas','Raíces de la unidad e interpretación geométrica','Irracionalidad y propiedades de $\\mathbb{R}$']},
  {id:'AL1', b:'AL', name:'Polinomios y Cardano-Vieta', temas:[13], skills:['Relaciones entre raíces y coeficientes','Construir el polinomio a partir de funciones simétricas','Teorema del resto y raíces racionales'], murcia:['2025-P2']},
  {id:'AL2', b:'AL', name:'Ecuaciones, desigualdades y medias', temas:[14], skills:['Convertir condiciones en una suma de cuadrados nula','Desigualdades entre medias (aritmética, cuadrática)','Discutir cuándo se da la igualdad'], murcia:['2021-P1']},
  {id:'AL3', b:'AL', name:'Matrices y determinantes', temas:[18,19], skills:['Sacar factores comunes de filas y columnas','Reconocer dependencia lineal de columnas','Determinante de Vandermonde'], murcia:['2021-P2']},
  {id:'AL4', b:'AL', name:'Sistemas de ecuaciones lineales', temas:[16,17], skills:['Teorema de Rouché-Frobenius','Discusión según un parámetro','Regla de Cramer y Gauss','Programación lineal: vértices de la región factible']},
  {id:'AL5', b:'AL', name:'Espacios vectoriales y aplicaciones lineales', temas:[11,12], skills:['Núcleo, imagen y teorema de la dimensión','Bases y ecuaciones implícitas','Diagonalización']},
  {id:'AN1', b:'AN', name:'Límites de sucesiones y funciones', temas:[25], skills:['Criterio del sándwich con sumas de $n$ términos','Indeterminaciones y conjugado','Infinitésimos equivalentes'], murcia:['2025-P1']},
  {id:'AN2', b:'AN', name:'Continuidad y Bolzano', temas:[25], skills:['Teorema de Bolzano con una función auxiliar','Valores intermedios y Weierstrass']},
  {id:'AN3', b:'AN', name:'Derivadas: valor medio, extremos y optimización', temas:[26,28,32], skills:['Rolle y valor medio de Lagrange, comprobando sus hipótesis','Monotonía y extremos absolutos','Desigualdades y número de raíces mediante la derivada','Optimización con justificación del máximo']},
  {id:'AN4', b:'AN', name:'Taylor y estudio local', temas:[27], skills:['Desarrollos de Maclaurin habituales','Límites con desarrollos de Taylor']},
  {id:'AN5', b:'AN', name:'Integrales: cálculo, impropias y aplicaciones', temas:[29,30,31], skills:['Integral impropia como límite','Integración por partes y cambio de variable','Límites $0\\cdot\\infty$ con L\'Hôpital','Áreas y volúmenes de revolución'], murcia:['2025-P3']},
  {id:'AN6', b:'AN', name:'Sumas de Riemann y series', temas:[29,8], skills:['Reconocer una suma de Riemann','Criterio de la integral para series','Pasar a logaritmos en productos']},
  {id:'AN7', b:'AN', name:'Ecuaciones funcionales e integrales', temas:[21,29], skills:['Teorema fundamental del cálculo','Justificar la continuidad antes de derivar','Resolver en cada semirrecta y discutir el 0'], murcia:['2021-P3']},
  {id:'GE1', b:'GE', name:'Triángulo, circunferencia y trigonometría', temas:[36,37,38,39,40], skills:['Puntos notables y relación de Euler','Teorema del coseno, fórmula de Herón e identidades trigonométricas','Potencia de un punto y tangentes']},
  {id:'GE2', b:'GE', name:'Geometría analítica plana y transformaciones', temas:[41,42,46,51,53], skills:['Distancia entre rectas paralelas','Parametrizar direcciones con un vector unitario','Estudiar todos los casos de un valor absoluto','Ecuaciones de movimientos y homotecias'], murcia:['2021-P4']},
  {id:'GE3', b:'GE', name:'Rectas y planos en el espacio', temas:[43,44,51,52,53], skills:['Distancias entre rectas que se cruzan','Producto mixto y volúmenes','Proyecciones y simétricos']},
  {id:'GE4', b:'GE', name:'Lugares geométricos', temas:[46,53,54], skills:['Planos mediadores y bisectores','Discutir los casos degenerados','Comprobar que todos los puntos del lugar se alcanzan'], murcia:['2025-P4']},
  {id:'GE5', b:'GE', name:'Cónicas y cuádricas', temas:[49,54], skills:['Clasificar con la matriz de la forma cuadrática','Elementos de las cónicas']},
  {id:'GE6', b:'GE', name:'Cuerpos geométricos: poliedros, revolución y volúmenes', temas:[34,35,45], skills:['Teorema de Euler y poliedros regulares','Volúmenes de cuerpos de revolución (Pappus-Guldin)','Esferas inscritas y circunscritas y secciones planas']},
  {id:'PR1', b:'PR', name:'Laplace, combinatoria y probabilidad geométrica', temas:[63], skills:['Espacio muestral equiprobable','Suceso contrario','Probabilidad geométrica']},
  {id:'PR2', b:'PR', name:'Condicionada, total y Bayes', temas:[64], skills:['Declarar el sistema completo de sucesos','Probabilidad total y teorema de Bayes','Interpretar enunciados ambiguos y declararlo'], murcia:['2021-P5']},
  {id:'PR3', b:'PR', name:'Independencia de sucesos', temas:[64], skills:['Definición completa para tres sucesos (cuatro igualdades)','De Morgan e inclusión-exclusión','Independencia dos a dos frente a mutua'], murcia:['2025-P5']},
  {id:'PR4', b:'PR', name:'Variables discretas', temas:[65], skills:['Binomial y Poisson: media y varianza','Esperanza por linealidad']},
  {id:'PR5', b:'PR', name:'Variables continuas y normal', temas:[66], skills:['Funciones de densidad y de distribución','Exponencial: máximo y mínimo de variables independientes','Tipificar y aproximar la binomial por la normal']},
  {id:'PR6', b:'PR', name:'Estadística descriptiva e inferencia', temas:[57,58,59,60,61,62,67], skills:['Parámetros de centralización y dispersión','Intervalos de confianza y contrastes']}
];
const subById = id => SUB.find(s=>s.id===id);
const subsOf = b => SUB.filter(s=>s.b===b);
/* Lo que ha caído en la parte A de Murcia (enunciados oficiales). Los años desde 2018 pesan el doble. */
const APPEAR = [
  {y:2002, info:'4 problemas', items:[['P1','AN3'],['P2','GE1'],['P3','PR1'],['P4','NU3']]},
  {y:2004, info:'4 h · sin calculadora', items:[['P1','PR5'],['P2a','GE6'],['P2b','AN3'],['P2c','NU3']]},
  {y:2006, info:'4 h · sin calculadora', items:[['C1','AN3'],['C2','GE6'],['C3','AL1'],['C4','PR1']]},
  {y:2018, info:'5 problemas', items:[['P1','NU3'],['P2','AL3'],['P3','AN3'],['P4','GE6'],['P5','PR5']]},
  {y:2021, info:'3 h · 2 puntos por ejercicio', items:[['P1','AL2'],['P2','AL3'],['P3','AN7'],['P4','GE2'],['P5','PR2']]},
  {y:2025, info:'2 h 30 min · sin calculadora', items:[['P1','AN1'],['P2','AL1'],['P3','AN5'],['P4','GE4'],['P5','PR3']]}
];
const yW = y => y>=2018 ? 2 : 1;
SUB.forEach(s=>{ s.murcia=[]; s.old=[]; });
APPEAR.forEach(e=>e.items.forEach(([k,sb])=>{ const s=subById(sb); if(s) (e.y>=2021?s.murcia:s.old).push(e.y+'-'+k); }));
SUB.forEach(s=>{ if(!s.murcia.length) delete s.murcia; });
const APPW = (()=>{ const c={}; BK.forEach(b=>c[b]=0); let t=0; APPEAR.forEach(e=>e.items.forEach(([,sb])=>{ const b=subById(sb).b; c[b]+=yW(e.y); t+=yW(e.y); })); return {c, t}; })();
BK.forEach(b=>{ BLOQ[b].w = Math.round(APPW.c[b]/APPW.t*100)/100; });
const TEMAS = ['Números naturales. Sistemas de numeración','Teoría de grafos. Diagramas en árbol','Técnicas de recuento. Combinatoria','Números enteros. Divisibilidad. Primos. Congruencia','Números racionales','Números reales. Topología de la recta real','Aproximación de números. Errores. Notación científica','Sucesiones. Progresiones','Números complejos. Aplicaciones geométricas','Sucesivas ampliaciones del concepto de número','Teoría de conjuntos. Estructuras algebraicas','Espacios vectoriales. Aplicaciones lineales','Polinomios. Fracciones algebraicas','Ecuaciones. Aproximación numérica de raíces','Ecuaciones diofánticas','Sistemas de ecuaciones lineales','Programación lineal','Matrices','Determinantes. Rango','El lenguaje algebraico. Historia del álgebra','Funciones reales de variable real','Funciones exponenciales y logarítmicas','Funciones circulares e hiperbólicas','Interpolación polinómica','Límites. Continuidad. Bolzano','Derivada. Aplicaciones','Series de potencias. Taylor','Estudio global de funciones','El problema del área. Integral definida','Primitivas. Magnitudes geométricas','Integración numérica','Funciones en Economía, Ciencias Sociales y Naturaleza','Historia del cálculo diferencial','Conceptos geométricos intuitivos','Las magnitudes y su medida','Proporciones notables. Razón áurea','Semejanza. Tales. Razones trigonométricas','Trigonometría plana','Geometría del triángulo','Geometría de la circunferencia. Potencia','Movimientos en el plano. Frisos y mosaicos','Homotecia y semejanza','Proyecciones. Mapas','Semejanza y movimientos en el espacio','Poliedros. Teorema de Euler','Coordenadas. Curvas y superficies','Curvas como envolventes','Espirales y hélices','Superficies de revolución. Cuádricas','Geometrías no euclídeas','Recta y plano. Relaciones afines','Productos escalar, vectorial y mixto','Relaciones métricas','Las cónicas','La geometría fractal','Historia de la geometría','Usos de la estadística','Población y muestra','Obtención y representación de datos','Parámetros estadísticos','Tchebyschev. Coeficiente de variación','Series estadísticas bidimensionales','Frecuencia y probabilidad','Probabilidad condicionada. Bayes','Distribuciones discretas','Distribuciones continuas. Normal','Inferencia. Tests de hipótesis','Estadística y toma de decisiones','La resolución de problemas','Lógica proposicional','Fundamentos de la matemática'];
const bloqueDeTema = t => (t<=10||t===15||t>=69)?'NU':t<=20?'AL':t<=33?'AN':t<=56?'GE':'PR';
const subDeTema = (t,b) => (SUB.find(s=>s.b===b&&s.temas.includes(t))||subsOf(b)[0]).id;
/* Exámenes oficiales de Murcia */
const MURCIA = [
  {y:2025, dur:150, ids:['m25p1','m25p2','m25p3','m25p4','m25p5'], info:'Parte A · 2 h 30 min · 5 ejercicios · sin calculadora'},
  {y:2021, dur:180, ids:['m21p1','m21p2','m21p3','m21p4','m21p5'], info:'Parte A · 3 horas · 2 puntos por ejercicio · solo dos bolígrafos azules'}
];
/* Rúbrica oficial de la parte A (criterios de valoración 2025) */
const RUBRIC = [
  {k:'rig', of:'En el desarrollo del ejercicio práctico se observa que el razonamiento utilizado es coherente y riguroso, permitiendo constatar el uso correcto de un lenguaje lógico-matemático.', dim:'Rigor en el desarrollo', name:'Rigor', max:1, d:'Razonamiento coherente y riguroso, con lenguaje lógico-matemático.', tip:'Encadena cada paso con conectores lógicos (⇒, ⇔, «luego», «por tanto») y no dejes saltos.'},
  {k:'con', of:'Utiliza correctamente definiciones, propiedades o teoremas propios de la especialidad.', dim:'Conocimiento científico de la especialidad', name:'Conocimiento científico', max:1, d:'Definiciones, propiedades y teoremas correctos y pertinentes.', tip:'Enuncia el teorema que usas y comprueba sus hipótesis antes de aplicarlo.'},
  {k:'tec', of:'Utiliza correctamente las técnicas necesarias de la especialidad.', dim:'Dominio de habilidades técnicas', name:'Habilidades técnicas', max:1, d:'Técnicas adecuadas, nombrándolas.', tip:'Nombra la técnica: «por partes», «por inducción», «criterio del sándwich».'},
  {k:'pla', of:'El planteamiento responde a lo solicitado y permite resolver el ejercicio.', dim:'Resolución: planteamiento', name:'Planteamiento', max:1, d:'Responde a lo pedido y permite resolver.', tip:'Empieza por un párrafo de planteamiento: qué se pide, notación y estrategia.'},
  {k:'des', of:'El desarrollo y resolución del ejercicio práctico está en consonancia con el planteamiento.', dim:'Resolución: desarrollo', name:'Desarrollo', max:3, d:'Desarrollo en consonancia con el planteamiento.', tip:'Desarrolla todos los casos que abre el planteamiento, sin abandonar ninguno a medias.'},
  {k:'res', of:'Los resultados obtenidos son los correctos.', dim:'Resultados obtenidos', name:'Resultados', max:2, d:'Los resultados obtenidos son correctos.', tip:'Cierra con una conclusión explícita y comprueba el resultado con un caso particular.'},
  {k:'pre', of:'En la resolución del ejercicio práctico realiza un desarrollo ordenado, con una presentación adecuada (letra legible, márgenes), una adecuada expresión gramatical y un rigor en el uso formal del lenguaje.', dim:'Presentación y orden', name:'Presentación', max:1, d:'Orden, letra legible, márgenes y expresión.', tip:'Separa planteamiento, desarrollo y conclusión; cuida márgenes, letra y ortografía.'}
];
/* Rúbrica detallada, alineada con los criterios de valoración de Murcia (2025).
   Cada indicador oficial se desglosa en subindicadores observables, que se valoran con una escala de cinco niveles.
   - Subindicadores comunes (GEN): concretan el texto oficial y valen para cualquier ejercicio.
   - Subindicadores del ejercicio: escritos para cada problema de Murcia (rub.txt) o, si no los hay, construidos
     con las destrezas del subbloque y el error típico. */
const SCALE = [[0,'Nada','No aparece o es incorrecto'],[.25,'Poco','Lo intenta, pero con errores graves'],[.5,'A medias','Correcto en parte; falta algo importante'],[.75,'Casi','Correcto, con un fallo o una omisión menor'],[1,'Completo','Correcto, completo y justificado']];
const GENW = {rig:1, con:.4, tec:.4, pla:.4, des:.8, res:.5, pre:1};
const GEN = {
  rig:['Cada afirmación se deduce de las anteriores o de un resultado citado: no hay saltos lógicos','Usa con corrección el lenguaje lógico-matemático (⇒, ⇔, cuantificadores, notación de conjuntos y funciones)','Controla dominios, divisiones por cero, signos, casos límite y casos pequeños'],
  con:['Enuncia con precisión las definiciones y teoremas que usa (hipótesis y tesis)','Comprueba que se cumplen las hipótesis antes de aplicar cada resultado'],
  tec:['Nombra la técnica que aplica («por inducción», «por partes», «por Rouché-Frobenius»…)','Ejecuta los cálculos sin errores'],
  pla:['Identifica qué se pide y fija la notación antes de calcular','Anuncia una estrategia que permite resolver el ejercicio'],
  des:['Sigue la estrategia planteada hasta el final (o justifica el cambio)','Trata todos los casos que abre el planteamiento'],
  res:['Destaca el resultado con una conclusión explícita que responde a la pregunta','Comprueba el resultado (caso particular, sustitución, signo o sentido)'],
  pre:['Desarrollo ordenado: planteamiento, desarrollo y conclusión separados, con los apartados identificados','Letra legible y márgenes adecuados','Expresión gramatical adecuada: frases completas que enlazan los cálculos','Rigor en el uso formal del lenguaje: sin abreviaturas indebidas ni jerga']
};
/* Penalización por ortografía y expresión (criterios 2025): cada falta resta 0,5, con un máximo de 3 puntos por parte. */
const ORTO = [['ort','Errores ortográficos (b/v, g/j, ll/y…)',1],['til','Tildes omitidas o mal puestas',3],['abr','Abreviaturas indebidas',3],['pun','Puntuación arbitraria o ausente',3],['ver','Formas y tiempos verbales inadecuados',3],['cnc','Errores de concordancia',3],['prp','Preposiciones mal usadas',3],['mar','Marcadores discursivos inadecuados',3],['rep','Repeticiones, tautologías o anacolutos',3]];
const ortoFaltas = o => ORTO.reduce((a,[k,,d])=>a+Math.floor((+(o&&o[k])||0)/d),0);
function rubricFor(p){
  const sp=(typeof RUBS!=='undefined'&&RUBS[p.id])||[]; const s=subById(p.sb); const sk=s?s.skills:[];
  const spec={
    con:[[1,'Aplica correctamente: '+(sk[0]||'los resultados teóricos del tema')]],
    tec:(sk.slice(1,3).length?sk.slice(1,3):['las técnicas propias del ejercicio']).map(k=>[1,'Domina la técnica: '+k]),
    pla:[[1,'El planteamiento conduce a la solución de referencia o a otra vía igual de válida']],
    des:[[1.5,'Los pasos intermedios del desarrollo son correctos'],[1,p.er?'Evita el error típico: '+p.er:'Resuelve todos los apartados del enunciado']],
    res:[[1,'El resultado final es correcto (coincide con la solución de referencia)']]
  };
  const items=[];
  RUBRIC.forEach(d=>{
    const g=GEN[d.k]||[]; const gw=Math.min(GENW[d.k]||0, d.max);
    g.forEach(t=>items.push({k:d.k, p:gw/g.length, t, gen:true}));
    const rest=d.max-gw; if(rest<=1e-9) return;
    const own=sp.filter(x=>x.k===d.k); const list=own.length?own.map(x=>[x.p,x.t]):(spec[d.k]||[]);
    const tot=list.reduce((a,x)=>a+x[0],0)||1;
    list.forEach(([pt,t])=>items.push({k:d.k, p:pt/tot*rest, t, own:own.length>0}));
  });
  return items;
}
const OBJ = {
  plaza:{name:'Sacar plaza', G:7.5, d:'Apunta a 7,5 o más en la parte A. La plaza depende de la nota final y del concurso de méritos, así que conviene ir con margen.'},
  aprobar:{name:'Aprobar la oposición', G:5.5, d:'Hace falta un mínimo de 1,25 en cada parte y 5 de media en la primera prueba. Con 5,5 en la parte A vas con margen.'},
  interino:{name:'Trabajar de interino el curso que viene', G:5, d:'Presentarte y sacar buena nota mejora tu posición en las listas. Apunta al menos a un 5 en la parte A.'},
  nivel:{name:'Subir de nivel, sin fecha', G:null, d:'La meta es el siguiente escalón de cada bloque, a tu ritmo.'}
};
const SITU = {completa:['Trabajo a jornada completa',6], parcial:['Trabajo a media jornada',10], estudio:['Solo estudio',20], master:['Estoy en el máster',8]};
const GOAL_R = 2000;

/* ================= Utilidades ================= */
const $ = (s, r=document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const clamp = (x,a,b) => Math.max(a, Math.min(b, x));
const fmt1 = x => (Math.round(x*10)/10).toLocaleString('es-ES',{minimumFractionDigits:1, maximumFractionDigits:1});
const fmt2 = x => (Math.round(x*100)/100).toLocaleString('es-ES',{minimumFractionDigits:0, maximumFractionDigits:2});
const pct = x => Math.round(x*100) + ' %';
const uid = () => Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4);
const DAY = 86400000, WEEK = 7*DAY;
const dayKey = t => { const d=new Date(t); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const fdate = t => new Date(t).toLocaleDateString('es-ES',{day:'numeric', month:'short', year:'numeric'});
const fshort = t => new Date(t).toLocaleDateString('es-ES',{day:'numeric', month:'short'});
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function md(s){
  s = String(s ?? '').replace(/\$\$([\s\S]*?)\$\$/g, m => m.replace(/\n/g,' '));
  let h = esc(s);
  h = h.replace(/\*\*([^*]+?)\*\*/g,'<strong>$1</strong>').replace(/(^|[\s(])\*([^*\n]+?)\*(?=[\s).,:;]|$)/g,'$1<em>$2</em>');
  h = h.replace(/^- (.*)$/gm,'• $1');
  return h.split(/\n{2,}/).map(p => '<p>'+p.replace(/\n/g,'<br>')+'</p>').join('');
}
const mdi = s => md(s).replace(/^<p>|<\/p>$/g,'');
function snippet(s, n=170){
  let t=String(s||'').replace(/\$\$[\s\S]*?\$\$/g,' … ').replace(/\s+/g,' ').trim();
  if(t.length>n){ t=t.slice(0,n); if((t.match(/\$/g)||[]).length%2) t=t.slice(0,t.lastIndexOf('$')); t+='…'; }
  return t;
}
function typeset(el){
  if(!el) return;
  const go = () => { try{ window.MathJax.typesetPromise([el]).catch(()=>{}); }catch(e){} };
  if(window.MathJax && window.MathJax.typesetPromise) return go();
  let n=0; const t=setInterval(()=>{ n++; if(window.MathJax && window.MathJax.typesetPromise){ clearInterval(t); go(); } else if(n>60) clearInterval(t); }, 250);
}
let toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.remove('hidden'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.add('hidden'), 3400); }

/* ================= Banco ================= */
function parseProblems(text){
  const out=[];
  for(const block of text.split(/^===\s*$/m)){
    const b=block.trim(); if(!b) continue;
    const lines=b.split('\n'); const head=lines.shift();
    const m=head.match(/^P\s+(.*?)\s*\|\s*(.*)$/); if(!m) continue;
    const at={}; m[1].split(/\s+/).forEach(kv=>{ const i=kv.indexOf('='); if(i>0) at[kv.slice(0,i)]=kv.slice(i+1); });
    const rest=lines.join('\n'); const i=rest.search(/^---\s*$/m);
    const stRaw=(i<0?rest:rest.slice(0,i)); const soRaw=i<0?'':rest.slice(i).replace(/^---\s*$/m,'');
    const h=[]; const st=stRaw.split('\n').filter(l=>{ if(/^> /.test(l)){ h.push(l.slice(2).trim()); return false; } return true; }).join('\n').trim();
    let er=''; const so=soRaw.split('\n').filter(l=>{ if(/^!! /.test(l)){ er=l.slice(3).trim(); return false; } return true; }).join('\n').trim();
    const t=parseInt(at.t)||0; const bq=BK.includes(at.b)?at.b:bloqueDeTema(t);
    out.push({id:at.id||('p-'+uid()), ti:m[2].trim(), st, so, h, er, n:clamp(parseInt(at.n)||3,1,7), b:bq, sb:subById(at.sb)?at.sb:subDeTema(t,bq), t, m:at.m||'', ref:at.ref||'', src:(at.src||'').replace(/-/g,' '), up:at.up||''});
  }
  return out;
}
function parseDiag(text){
  const out=[];
  for(const block of text.split(/\n\s*\n(?=D )/)){
    const lines=block.trim().split('\n'); const head=lines.shift(); const m=head && head.match(/^D\s+b=(\w+)\s+n=(\d)(?:\s+sb=(\w+))?/); if(!m) continue;
    const it={id:'d'+out.length, b:m[1], n:+m[2], sb:m[3]||null, q:'', opts:[], e:''}; const q=[];
    for(const l of lines){ if(/^\* /.test(l)) it.opts.push({t:l.slice(2),ok:true}); else if(/^- /.test(l)) it.opts.push({t:l.slice(2),ok:false}); else if(/^E /.test(l)) it.e=l.slice(2); else q.push(l); }
    it.q=q.join('\n'); out.push(it);
  }
  return out;
}
/* Prueba de nivel adaptativa: estimación bayesiana del nivel de cada bloque.
   Modelo de respuesta (tipo TRI con adivinación): P(acierto | θ) = c + (1−c)·1/(1+10^((D−θ)/S)),
   con D la dificultad de la pregunta, S = 250 y c = 0,25 (cuatro opciones). «No lo sé» no admite adivinación. */
const DG = { S:250, C:.25, grid:Array.from({length:101},(_,i)=>400+i*20), mu0:1300, sd0:450 };
const dgDiff = n => 800+200*(n-1);
function dgPrior(){ const p=DG.grid.map(t=>Math.exp(-((t-DG.mu0)**2)/(2*DG.sd0**2))); const z=p.reduce((a,c)=>a+c,0); return p.map(x=>x/z); }
function dgLik(t, D, resp){ const L=1/(1+Math.pow(10,(D-t)/DG.S)); return resp==='ok' ? DG.C+(1-DG.C)*L : resp==='ns' ? (1-L) : (1-DG.C)*(1-L)+.02; }
function dgUpdate(post, D, resp){ const p=post.map((x,i)=>x*dgLik(DG.grid[i],D,resp)); const z=p.reduce((a,c)=>a+c,0)||1; return p.map(x=>x/z); }
function dgStats(post){ const m=post.reduce((a,x,i)=>a+x*DG.grid[i],0); const v=post.reduce((a,x,i)=>a+x*(DG.grid[i]-m)**2,0); return {m, sd:Math.sqrt(v)}; }
const SEED = parseProblems($('#seed-probs').textContent);
const DIAG = parseDiag($('#seed-diag').textContent);
function parseRubs(text){ const out={}; let cur=null;
  text.split('\n').forEach(l=>{ l=l.trim(); if(!l||l[0]==='#') return; const r=l.match(/^R\s+(\S+)/); if(r){ cur=out[r[1]]=[]; return; }
    const m=l.match(/^(pla|con|tec|des|res|rig|pre)\s+([\d.]+)\s*\|\s*(.+)$/); if(m&&cur) cur.push({k:m[1], p:+m[2], t:m[3]}); });
  return out; }
const RUBS = parseRubs(($('#seed-rub')||{textContent:''}).textContent);
/* Teoría por subbloque: resultados que hay que saber enunciar con sus hipótesis (líneas «- ») y la trampa típica («! »). */
function parseTeo(text){ const out={}; let cur=null;
  text.split('\n').forEach(l=>{ const m=l.match(/^T\s+(\w+)/); if(m){ cur=out[m[1]]={it:[], warn:''}; return; } if(!cur) return;
    if(/^- /.test(l)) cur.it.push(l.slice(2).trim()); else if(/^! /.test(l)) cur.warn=l.slice(2).trim(); });
  return out; }
const TEO = parseTeo(($('#seed-teo')||{textContent:''}).textContent);
/* Escalera de un problema: el problema más cercano por debajo (dir=-1) o por encima (dir=+1).
   Primero el mismo subbloque; si no hay, el mismo bloque y tema; si no, el mismo bloque. Evita los ya superados y la pila actual. */
function ladderFor(p, dir, avoid=[]){
  const ok=q=>q.id!==p.id && !avoid.includes(q.id) && (dir<0 ? q.n<p.n : q.n>p.n);
  const solved=q=>{ const a=S&&S.attempts[q.id]; return a&&a.length&&a[a.length-1].s>=.75; };
  const rank=q=>Math.abs(q.n-p.n)*10 + (solved(q)?25:0) + (q.up===p.id?-8:0) + (q.up&&q.up===p.up?-4:0) + (q.m==='oficial'&&dir<0?3:0);
  for(const f of [q=>q.sb===p.sb, q=>q.b===p.b&&q.t&&q.t===p.t, q=>q.b===p.b]){
    const c=bank().filter(q=>ok(q)&&f(q)); if(c.length) return c.sort((a,b)=>rank(a)-rank(b))[0];
  }
  return null;
}
/* Recomendaciones para un subbloque según tu nivel en él: consolidar (un escalón por debajo), a tu nivel y reto. */
function recsFor(sbId){
  const sb=subById(sbId); const r=S.subR[sbId]?S.subR[sbId].r:S.ratings[sb.b].r;
  const ps=bank().filter(q=>q.sb===sbId); const used=new Set(); const out=[];
  const solvedRecent=q=>{ const a=S.attempts[q.id]; return a&&a.length&&a[a.length-1].s>=.75; };
  [['Para consolidar',-150],['A tu nivel',0],['Reto',180]].forEach(([lab,off])=>{
    const c=ps.filter(q=>!used.has(q.id)).sort((a,b)=>(Math.abs(probR(a)-r-off)+(solvedRecent(a)?300:0))-(Math.abs(probR(b)-r-off)+(solvedRecent(b)?300:0)))[0];
    if(c){ used.add(c.id); out.push({lab, p:c}); } });
  return out;
}
const ORIGIN = {oficial:'Examen oficial de Murcia', gemelo:'Gemelo de Murcia', estilo:'Estilo Murcia', '':'Preparación'};
const isMurcia = p => !!p.m;

/* ================= Almacenamiento (demo en el navegador) ================= */
const mem = {};
const Store = {
  get(k, d){ try{ const v=localStorage.getItem('opm3.'+k); return v==null?(k in mem?mem[k]:d):JSON.parse(v); }catch(e){ return k in mem?mem[k]:d; } },
  set(k, v){ mem[k]=v; try{ localStorage.setItem('opm3.'+k, JSON.stringify(v)); }catch(e){} },
  del(k){ delete mem[k]; try{ localStorage.removeItem('opm3.'+k); }catch(e){} }
};
async function hashPass(pass, salt){
  try{ const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt+'|'+pass)); return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join(''); }
  catch(e){ let h=0; for(const c of salt+pass) h=(h*31+c.charCodeAt(0))|0; return 'x'+h; }
}
/* Adaptador de datos: hoy guarda en el navegador; en producción se sustituye por un servidor (Supabase, Firebase…) */
const Backend = {
  users(){ return Store.get('users', {}); },
  async register({name,email,pass,role,classCode}){
    email=email.trim().toLowerCase(); const users=this.users();
    if(!name.trim()) throw new Error('Escribe tu nombre.');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('El correo no parece válido.');
    if(pass.length<8) throw new Error('La contraseña debe tener al menos 8 caracteres.');
    if(users[email]) throw new Error('Ya hay una cuenta con ese correo. Entra con tu contraseña.');
    let code=(classCode||'').trim().toUpperCase();
    if(role==='profesor') code='MAT-'+Math.random().toString(36).slice(2,6).toUpperCase();
    else if(code && !Object.values(users).some(u=>u.role==='profesor'&&u.classCode===code)) throw new Error('No existe ninguna clase con el código '+code+'. Revísalo o déjalo en blanco.');
    const salt=uid(); const u={id:'u-'+uid(), name:name.trim(), email, role, classCode:code, salt, hash:await hashPass(pass,salt), created:Date.now()};
    users[email]=u; Store.set('users', users); Store.set('session', u.id); return u;
  },
  async login(email, pass){ const u=this.users()[email.trim().toLowerCase()]; if(!u || u.hash !== await hashPass(pass,u.salt)) throw new Error('Correo o contraseña incorrectos.'); Store.set('session', u.id); return u; },
  logout(){ Store.del('session'); },
  current(){ const id=Store.get('session',null); return id ? Object.values(this.users()).find(u=>u.id===id)||null : null; },
  updateUser(u){ const users=this.users(); users[u.email]=u; Store.set('users', users); },
  loadState(id){ const s=Store.get('state.'+id, null); return s&&s.v===3?s:null; },
  saveState(id, s){ Store.set('state.'+id, s); },
  students(code){ return Object.values(this.users()).filter(u=>u.role==='alumno'&&u.classCode===code); },
  extraProblems(){ return Store.get('bank.extra', []); },
  hidden(){ return Store.get('bank.hidden', []); },
  addProblems(list){ Store.set('bank.extra', this.extraProblems().concat(list)); },
  deleteProblem(id){ const ex=this.extraProblems(); if(ex.some(p=>p.id===id)) Store.set('bank.extra', ex.filter(p=>p.id!==id)); else Store.set('bank.hidden', this.hidden().concat(id)); }
};
function bank(){ const hid=new Set(Backend.hidden()); return SEED.concat(Backend.extraProblems()).filter(p=>!hid.has(p.id)); }
const byId = id => bank().find(p=>p.id===id);

/* ================= Modelo de nivel y estimaciones ================= */
const freshState = () => ({v:3, ratings:Object.fromEntries(BK.map(b=>[b,{r:1000,n:0}])), subR:{}, diag:null, attempts:{}, hist:[], sims:[], errors:[], snaps:[], goal:null});
const probR = p => LEVELS[p.n-1].r + (p.m==='oficial'?40:0);
const expected = (R, D) => 1/(1+Math.pow(10,(D-R)/400));
const lvOf = r => clamp(Math.floor((r-700)/200)+1, 1, 7);
const lvProg = r => { const l=lvOf(r); return l===7 ? clamp((r-1900)/200,0,1) : clamp(((r-700)-(l-1)*200)/200,0,1); };
const wsum = BK.reduce((a,b)=>a+BLOQ[b].w,0);
/* La nota estimada usa una curva más suave que la del Elo: nivel 7 = 5 puntos, nivel 6 ≈ 3, nivel 5 ≈ 2 */
const NS = 600;
const expN = (R, D) => 1/(1+Math.pow(10,(D-R)/NS));
const notaFrom = R => 10*BK.reduce((a,b)=>a+BLOQ[b].w*expN(R[b],GOAL_R),0)/wsum;
const notaBloque = r => 10*expN(r, GOAL_R);
const rFor = G => GOAL_R - NS*Math.log10((10-G)/G);
const Rw = R => BK.reduce((a,b)=>a+BLOQ[b].w*R[b],0)/wsum;
function goalOf(S){ return S.goal || {type:'aprobar', date:'2027-06-19', hours:8, situ:'completa', set:false}; }
function targetR(S, b){
  const g=goalOf(S); const G=OBJ[g.type].G;
  if(G==null){ const r=S.ratings[b].r; return LEVELS[Math.min(7,lvOf(r)+1)-1].r; }
  return rFor(G);
}
function targetNota(S){ const g=goalOf(S); const G=OBJ[g.type].G; if(G!=null) return G; const R={}; BK.forEach(b=>R[b]=targetR(S,b)); return notaFrom(R); }
function curR(S){ const R={}; BK.forEach(b=>R[b]=S.ratings[b].r); return R; }
function subRating(S, sb){ const x=S.subR[sb]; return x?x:null; }
function summary(S){
  const R=curR(S); const nota=notaFrom(R);
  const solved=Object.values(S.attempts).filter(a=>a.some(x=>x.s>=.75)).length;
  const days=new Set(S.hist.map(h=>dayKey(h.d)));
  let streak=0; let t=Date.now(); if(!days.has(dayKey(t))) t-=DAY; while(days.has(dayKey(t))){ streak++; t-=DAY; }
  const last=S.hist.length?S.hist[S.hist.length-1].d:null;
  return {R, nota, idx:clamp((Rw(R)-700)/(GOAL_R-700),0,1), solved, streak, last, attempts:S.hist.length};
}
/* Perfil por dimensiones de la rúbrica (últimos intentos corregidos con rúbrica) */
function dimProfile(S, b=null, n=25){
  const hs=S.hist.filter(h=>h.dims&&(!b||h.b===b)).slice(-n);
  if(!hs.length) return null;
  const out={}; RUBRIC.forEach(r=>{ out[r.k]=hs.reduce((a,h)=>a+(h.dims[r.k]||0),0)/(hs.length*r.max); });
  out._n=hs.length; out._falt=hs.reduce((a,h)=>a+(h.falt||0),0)/hs.length;
  return out;
}
/* Qué te falta en cada bloque, concretado en subbloques y dimensiones */
function gapsFor(S, b){
  const tR=targetR(S,b); const r=S.ratings[b].r;
  const subs=subsOf(b).map(s=>{
    const x=S.subR[s.id]; const hits=(s.murcia||[]).length;
    const sr=x?x.r:null; const deficit=sr==null?Math.max(120, tR-r):Math.max(0,tR-sr);
    const pri=(sr==null?1:deficit/400)*(1+hits*.8+(s.old||[]).length*.3);
    const status=sr==null?'new':(sr>=tR?'ok':(tR-sr<150?'warn':'bad'));
    const avail=bank().filter(p=>p.sb===s.id).length;
    return {s, sr, n:x?x.n:0, deficit, pri, status, hits, avail};
  }).sort((a,c)=>c.pri-a.pri);
  const prof=dimProfile(S,b,20); const weakDims=prof?RUBRIC.filter(d=>prof[d.k]<.75).sort((a,c)=>prof[a.k]-prof[c.k]).slice(0,2):[];
  return {tR, r, gap:Math.max(0,tR-r), subs, prof, weakDims, done:r>=tR};
}
/* Ritmo de progreso y tiempo estimado */
function progressModel(S){
  const g=goalOf(S); const now=Date.now(); const PPH=5.5; const hours=Math.max(1,g.hours||1);
  const snaps=S.snaps.filter(x=>now-x.d<=56*DAY);
  let rate=null, src='modelo';
  if(snaps.length>=6 && snaps[snaps.length-1].d-snaps[0].d>=10*DAY){
    const xs=snaps.map(s=>(s.d-snaps[0].d)/WEEK), ys=snaps.map(s=>Rw(s.R));
    const mx=xs.reduce((a,c)=>a+c,0)/xs.length, my=ys.reduce((a,c)=>a+c,0)/ys.length;
    const num=xs.reduce((a,x,i)=>a+(x-mx)*(ys[i]-my),0), den=xs.reduce((a,x)=>a+(x-mx)*(x-mx),0);
    if(den>0){ rate=num/den; src='datos'; }
  }
  if(src==='modelo') rate=hours*PPH;
  const perHour = (src==='datos' && rate>0) ? rate/hours : PPH;
  if(src==='datos' && rate<=0) src='estancado';
  const R=curR(S); let gapW=0; BK.forEach(b=>{ gapW+=BLOQ[b].w*Math.max(0,targetR(S,b)-R[b]); }); gapW/=wsum;
  const exam=g.date?new Date(g.date+'T09:00:00').getTime():null;
  const weeksLeft=exam?Math.max(0,(exam-now)/WEEK):null;
  const weeksNeeded = gapW<=0?0:(rate>0?gapW/rate:Infinity);
  const hoursNeeded = gapW<=0?0:(weeksLeft>0?(gapW/weeksLeft)/perHour:Infinity);
  const spanDays = snaps.length ? (snaps[snaps.length-1].d-snaps[0].d)/DAY : 0;
  const etaOk = src==='datos' && spanDays>=21 && snaps.length>=10;
  const etaLo = (etaOk && gapW>0 && rate>0) ? now+(gapW/(rate*1.4))*WEEK : null;
  const etaHi = (etaOk && gapW>0 && rate>0) ? now+(gapW/(rate*0.7))*WEEK : null;
  return {spanDays, etaOk, etaLo, etaHi, rate, src, gapW, weeksLeft, weeksNeeded, eta:isFinite(weeksNeeded)?now+weeksNeeded*WEEK:null, hoursNeeded, perHour, exam, onTime: exam? (isFinite(weeksNeeded) && now+weeksNeeded*WEEK<=exam) : null};
}
let ME=null, S=null;
function save(){ if(ME) Backend.saveState(ME.id, S); }
function applyResult(pid, s, extra={}){
  const p=byId(pid); if(!p) return null;
  const st=S.ratings[p.b]; const before=st.r; const E=expected(st.r, probR(p));
  const K = st.n<8?60:st.n<25?40:28;
  const dr=Math.round(K*(s-E)); st.r+=dr; st.n++;
  const sb=S.subR[p.sb]||{r:before, n:0}; const Es=expected(sb.r, probR(p)); const Ks=sb.n<5?70:sb.n<15?45:30;
  sb.r+=Math.round(Ks*(s-Es)); sb.n++; S.subR[p.sb]=sb;
  (S.attempts[pid]=S.attempts[pid]||[]).push({d:Date.now(), s});
  S.hist.push({d:Date.now(), pid, b:p.b, sb:p.sb, s, dr, ...extra}); if(S.hist.length>1500) S.hist=S.hist.slice(-1500);
  S.snaps.push({d:Date.now(), R:curR(S)}); if(S.snaps.length>600) S.snaps=S.snaps.slice(-600);
  save();
  return {dr, r:st.r, b:p.b, sbr:sb.r, up:lvOf(st.r)>lvOf(before), down:lvOf(st.r)<lvOf(before)};
}
function addErrors(list, pid){
  const p=pid?byId(pid):null;
  list.forEach(e=>S.errors.push({d:Date.now(), b:e.b||(p&&p.b)||'NU', sb:e.sb||(p&&p.sb)||null, pid:pid||null, txt:e.txt, dim:e.dim||null, note:e.note||''}));
  if(S.errors.length>300) S.errors=S.errors.slice(-300); save();
}
function pickNext({b=null, sb=null, level=null, murcia=false, exclude=null}={}){
  const all=bank();
  let pool=all.filter(p=>(!b||p.b===b)&&(!sb||p.sb===sb)&&(!level||p.n===level)&&(!murcia||isMurcia(p))&&p.id!==exclude);
  if(!pool.length) pool=all.filter(p=>(!b||p.b===b)&&p.id!==exclude);
  if(!pool.length) pool=all.filter(p=>p.id!==exclude);
  let focusB=b;
  if(!b && !sb && !level){
    const w=BK.map(k=>BLOQ[k].w*(1+Math.max(0,targetR(S,k)-S.ratings[k].r)/400));
    let x=Math.random()*w.reduce((a,c)=>a+c,0); focusB=BK[0]; for(let i=0;i<BK.length;i++){ x-=w[i]; if(x<=0){ focusB=BK[i]; break; } }
    const pb=pool.filter(p=>p.b===focusB); if(pb.length) pool=pb;
  }
  const baseR = sb ? (S.subR[sb]?S.subR[sb].r:S.ratings[subById(sb).b].r) : S.ratings[focusB||pool[0].b].r;
  const target = level ? LEVELS[level-1].r : baseR+60;
  const gaps = {}; if(!sb){ const g=gapsFor(S, focusB||pool[0].b); g.subs.forEach((x,i)=>gaps[x.s.id]=i); }
  const score = p => { const at=S.attempts[p.id]; let pen=0;
    if(at&&at.length){ const l=at[at.length-1]; const age=Date.now()-l.d; pen = l.s>=.75 ? 500 : (age<2*DAY ? 350 : -40); }
    const subBonus = gaps[p.sb]!=null ? gaps[p.sb]*25 : 0;
    return Math.abs(probR(p)-target)+pen+subBonus+Math.random()*40; };
  return pool.slice().sort((a,c)=>score(a)-score(c))[0] || null;
}

/* ================= Datos de demostración ================= */
function demoState(rt, n, goal){
  const s=freshState(); const now=Date.now(); const span=56;
  const start={}; BK.forEach(b=>start[b]=rt[b]-260-Math.random()*80);
  s.diag={d:now-span*DAY, levels:Object.fromEntries(BK.map(b=>[b, lvOf(start[b])]))};
  const pool=SEED.slice();
  for(let i=0;i<n;i++){
    const f=i/n; const d=now-(1-f)*span*DAY-Math.random()*DAY*.4;
    const R={}; BK.forEach(b=>R[b]=start[b]+(rt[b]-start[b])*f+(Math.random()-.5)*30);
    const p=pool[Math.floor(Math.random()*pool.length)];
    const pr=expected(R[p.b],probR(p)); const dims={};
    RUBRIC.forEach(r=>{ const q=clamp(.3+.65*pr+(Math.random()-.5)*.45 - (r.k==='rig'&&p.b==='GE'?.25:0) - (r.k==='pre'?.1:0),0,1); dims[r.k]=Math.round(q*r.max*2)/2; });
    const tot=RUBRIC.reduce((a,r)=>a+dims[r.k],0); const sc=clamp(tot/10,0,1);
    (s.attempts[p.id]=s.attempts[p.id]||[]).push({d,s:sc});
    s.hist.push({d,pid:p.id,b:p.b,sb:p.sb,s:sc,dr:0,mode:'practica',dims,falt:Math.random()<.2?1:0});
    const sb=s.subR[p.sb]||{r:R[p.b],n:0}; sb.r=R[p.b]+(sc-.5)*120; sb.n++; s.subR[p.sb]=sb;
    if(i%2===0) s.snaps.push({d, R});
  }
  BK.forEach(b=>{ s.ratings[b]={r:rt[b], n:20}; });
  s.snaps.push({d:now, R:curR(s)});
  s.hist.sort((a,c)=>a.d-c.d); s.snaps.sort((a,c)=>a.d-c.d);
  s.goal=goal;
  return s;
}
async function seedDemo(){
  if(Store.get('demo.v',0)>=5) return;
  const users=Backend.users(); const salt='demo'; const h=await hashPass('demo1234', salt);
  const mk=(name,email,role,code)=>({id:'u-'+email.split('@')[0], name, email, role, classCode:code, salt, hash:h, created:Date.now()-60*DAY, demo:true});
  users['profe@demo.es']=mk('Profe demo','profe@demo.es','profesor','MAT-DEMO');
  users['alumno@demo.es']=mk('Alumno demo','alumno@demo.es','alumno','MAT-DEMO');
  users['lucia@demo.es']=mk('Lucía (ejemplo)','lucia@demo.es','alumno','MAT-DEMO');
  users['pablo@demo.es']=mk('Pablo (ejemplo)','pablo@demo.es','alumno','MAT-DEMO');
  Store.set('users', users);
  const a=demoState({NU:1720,AL:1610,AN:1480,GE:1260,PR:1650},90,{type:'aprobar', date:'2027-06-19', hours:8, situ:'completa', set:true});
  a.errors=[
    {d:Date.now()-2*DAY,b:'GE',sb:'GE2',pid:'m21p4',dim:'des',txt:'Estudia los dos signos del valor absoluto, sin perder ninguna solución',note:'solo saqué el lado √10'},
    {d:Date.now()-3*DAY,b:'AN',sb:'AN5',pid:'m25p3',dim:'pla',txt:'Detecta que el integrando no está acotado en 0 y plantea la integral impropia como límite',note:'apliqué Barrow directamente en 0'},
    {d:Date.now()-6*DAY,b:'AN',sb:'AN7',pid:'m21p3',dim:'con',txt:'Justifica que $f$ es continua (y después derivable) en $x\\ne0$ antes de derivar, usando el teorema fundamental del cálculo',note:''},
    {d:Date.now()-9*DAY,b:'PR',sb:'PR3',pid:'m25p5',dim:'des',txt:'Prueba las tres igualdades dos a dos',note:'solo hice la triple'}];
  a.sims=[{d:Date.now()-20*DAY,nota:3.1,ref:'Simulacro'},{d:Date.now()-6*DAY,nota:4.2,ref:'Murcia 2021'}];
  Backend.saveState('u-alumno', a);
  Backend.saveState('u-lucia', demoState({NU:1900,AL:1960,AN:1920,GE:1820,PR:2010},130,{type:'plaza', date:'2027-06-19', hours:20, situ:'estudio', set:true}));
  Backend.saveState('u-pablo', demoState({NU:1150,AL:1060,AN:980,GE:1020,PR:1180},30,{type:'interino', date:'2027-06-19', hours:5, situ:'completa', set:true}));
  Store.set('demo.v',5);
}
