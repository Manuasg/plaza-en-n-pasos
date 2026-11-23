"""Construye dist/index.html juntando la plantilla, el código y los bancos de problemas."""
import os, shutil
ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src'); DIST = os.path.join(ROOT, 'dist')
r = lambda f: open(os.path.join(SRC, f), encoding='utf8').read()
probs = '\n'.join(r(f).rstrip() + '\n===' for f in ['probs.txt', 'probs_m.txt', 'probs_o.txt']).replace('===\n===', '===')
app = '\n'.join(r(f) for f in ['app1.js', 'app2.js', 'app3.js'])
for name, txt in [('problemas', probs), ('código', app), ('rúbricas', r('rub.txt')), ('diagnóstico', r('diag.txt'))]:
    assert '</script' not in txt, f'"</script" no puede aparecer en {name}'
html = (r('shell.html').replace('%%PROBS%%', probs).replace('%%DIAG%%', r('diag.txt'))
        .replace('%%RUB%%', r('rub.txt')).replace('%%APP%%', app))
shutil.rmtree(DIST, ignore_errors=True)
shutil.copytree(os.path.join(ROOT, 'public'), DIST)
open(os.path.join(DIST, 'index.html'), 'w', encoding='utf8').write(html)
open(os.path.join(DIST, '.nojekyll'), 'w').write('')
print(f'dist/index.html: {len(html):,} caracteres')
