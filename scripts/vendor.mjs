// Descarga las librerías del CDN a www/vendor para uso 100% offline (Electron / Capacitor / PWA).
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const libs = [
  ['https://cdn.tailwindcss.com/3.4.17', 'tailwind.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js', 'react.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js', 'react-dom.js'],
  ['https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.umd.js', 'htm.js']
];
await mkdir('www/vendor', { recursive: true });
let html = await readFile('www/index.html', 'utf8');
for (const [url, name] of libs) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fallo ' + url);
  await writeFile('www/vendor/' + name, Buffer.from(await res.arrayBuffer()));
  html = html.replace(url, 'vendor/' + name);
  console.log('OK', name);
}
await writeFile('www/index.html', html);
console.log('Listo: la app ya no depende de internet.');
