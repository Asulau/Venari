import http from 'node:http';
import { createReadStream, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { chromium } from 'playwright-core';
const DIST='/tmp/newsite/dist', PORT=4567;
const EXEC='/sessions/pensive-ecstatic-hawking/.cache/ms-playwright/chromium-1223/chrome-linux/chrome';
const ROUTES=['/','/TheProgram','/ForCompanies','/About','/privacy','/terms'];
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer((req,res)=>{
  const p=new URL(req.url,`http://x:${PORT}`).pathname;
  const fp=join(DIST,p==='/'?'/index.html':p);
  const real=existsSync(fp)&&statSync(fp).isFile()?fp:join(DIST,'index.html');
  const ext=real.slice(real.lastIndexOf('.'));
  res.setHeader('Content-Type',TYPES[ext]||'application/octet-stream');
  createReadStream(real).pipe(res);
}).listen(PORT);
const b=await chromium.launch({executablePath:EXEC,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
for(const route of ROUTES){
  const p=await b.newPage();
  await p.goto(`http://localhost:${PORT}${route}`,{waitUntil:'networkidle',timeout:25000});
  await new Promise(r=>setTimeout(r,2500));
  const html=await p.evaluate(()=>'<!doctype html>\n'+document.documentElement.outerHTML);
  const out=route==='/'?join(DIST,'index.html'):join(DIST,route.slice(1),'index.html');
  mkdirSync(dirname(out),{recursive:true}); writeFileSync(out,html);
  console.log('pre-rendered',route);
  await p.close();
}
await b.close(); server.close();
