# Escalera Murcia

App web para preparar la parte A (problemas) de la oposición de Matemáticas de Secundaria de la Región de Murcia. Proyecto de «en n pasos».

Versión de prueba gratuita. Los datos de cada usuario se guardan en su navegador.

## Cómo está organizado

| Carpeta o archivo | Qué contiene |
|---|---|
| `src/shell.html` | Plantilla de la página: estilos y estructura |
| `src/app1.js` | Datos (bloques, subbloques, temas, apariciones en Murcia), modelo de nivel y estimaciones |
| `src/app2.js` | Vistas, gráficos y rúbrica detallada |
| `src/app3.js` | Navegación y acciones |
| `src/probs.txt`, `probs_m.txt`, `probs_o.txt` | Banco de problemas resueltos (preparación, Murcia y gemelos, oficiales antiguos) |
| `src/rub.txt` | Rúbricas específicas por problema |
| `src/diag.txt` | Preguntas de la prueba de nivel |
| `public/docs/` | Documentos oficiales (criterios de valoración y enunciado de 2021) |
| `build.py` | Junta todo en `dist/index.html` |

## Publicación

Cada cambio que se sube a `main` dispara la acción **Publicar web**, que ejecuta `build.py` y publica `dist/` en GitHub Pages. Tarda uno o dos minutos.

Para probar en local: `python build.py` y abrir `dist/index.html`.

## Formato de los problemas

```
P id=mi01 n=6 b=GE sb=GE4 t=53 m=gemelo ref=2025-P4 | Título
Enunciado con fórmulas entre $...$
> Pista
---
Solución
!! Error típico
===
```

`n` nivel 1–7 · `b` NU, AL, AN, GE o PR · `sb` subbloque · `m` oficial, gemelo o estilo · `ref` año y ejercicio de Murcia.

Solo se incluyen enunciados oficiales de la CARM y problemas y soluciones propios.

## Corrección con la IA del opositor

La web no se conecta a ninguna cuenta de IA. En la corrección, el opositor copia unas instrucciones (enunciado, solución de referencia y rúbrica con indicadores numerados), las pega en su ChatGPT, Claude, Gemini o Copilot junto con las fotos de su hoja, y pega aquí la respuesta. La IA termina con un bloque JSON:

```json
{"escalera":1,"problema":"m25p3","indicadores":[{"i":0,"v":1,"nota":""}],"faltas":0,"comentario":""}
```

La web rellena la rúbrica con ese bloque; el opositor la revisa y la guarda, y cuenta para su progreso como cualquier otra corrección (marcada como «corregido con IA»). Los simulacros usan `{"simulacro":true,"ejercicios":[...]}`.
