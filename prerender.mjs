import http from 'node:http';
import { createReadStream, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = 'dist';
const PORT = 4567;
const ROUTES = ['/', '/TheProgram', '/ForCompanies', '/About', '/privacy', '/terms'];
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml',
                '.png':'image/png', '.jpg':'image/jpeg', '.json':'application/json',
                '.woff2':'font/woff2', '.woff':'font/woff', '.xml':'application/xml', '.txt':'text/plain' };

const server = http.createServer((req, res) => {
  const path = new URL(req.url, `http://localhost:${PORT}`).pathname;
  const fp = join(DIST, path === '/' ? '/index.html' : path);
  const real = existsSync(fp) && statSync(fp).isFile() ? fp : join(DIST, 'index.html');
  const ext = real.slice(real.lastIndexOf('.'));
  res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream');
  createReadStream(real).pipe(res);
}).listen(PORT);

console.log(`[prerender] serving ${DIST} on :${PORT}`);
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));
  const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
  const outFile = route === '/' ? join(DIST, 'index.html') : join(DIST, route.slice(1), 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`[prerender] ${route} -> ${outFile}`);
  await page.close();
}

await browser.close();
server.close();
console.log('[prerender] done');
