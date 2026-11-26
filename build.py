"""Construye dist/index.html juntando la plantilla, el código y los bancos de problemas."""
import os, shutil
ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src'); DIST = os.path.join(ROOT, 'dist')
r = lambda f: open(os.path.join(SRC, f), encoding='utf8').read()
probs = '\n'.join(r(f).rstrip() + '\n===' for f in ['probs.txt', 'probs_m.txt', 'probs_o.txt', 'probs_e.txt', 'probs_x.txt']).replace('===\n===', '===')
app = '\n'.join(r(f) for f in ['app1.js', 'app2.js', 'app3.js'])
for name, txt in [('problemas', probs), ('código', app), ('rúbricas', r('rub.txt')), ('diagnóstico', r('diag.txt')), ('teoría', r('teoria.txt'))]:
    assert '</script' not in txt, f'"</script" no puede aparecer en {name}'
import base64
# Los bancos se guardan cifrados con un flujo pseudoaleatorio (xorshift de 32 bits): no aparecen como texto
# en la página ni en los buscadores. Es disuasorio, no absoluto: el navegador tiene que poder leerlos.
def enc(txt, seed=0x2F6B1D35):
    s = seed; out = bytearray()
    for c in txt.encode('utf8'):
        s ^= (s << 13) & 0xFFFFFFFF; s ^= s >> 17; s ^= (s << 5) & 0xFFFFFFFF
        out.append(c ^ (s >> 24))
    return base64.b64encode(bytes(out)).decode('ascii')
html = (r('shell.html').replace('%%PROBS%%', enc(probs)).replace('%%DIAG%%', enc(r('diag.txt')))
        .replace('%%RUB%%', enc(r('rub.txt'))).replace('%%TEO%%', enc(r('teoria.txt'))).replace('%%APP%%', app))
shutil.rmtree(DIST, ignore_errors=True)
shutil.copytree(os.path.join(ROOT, 'public'), DIST)
open(os.path.join(DIST, 'index.html'), 'w', encoding='utf8').write(html)
open(os.path.join(DIST, '.nojekyll'), 'w').write('')
print(f'dist/index.html: {len(html):,} caracteres')
