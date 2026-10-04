import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
const root = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const port = Number(process.env.PORT || 4321);
createServer(async (req,res)=>{
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{'Allow':'GET, HEAD'});return res.end(); }
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = resolve(root,'.'+pathname);
    if (file !== root && !file.startsWith(root+sep)) {res.writeHead(403);return res.end();}
    if (/^\/(src|scripts|tests|docs|node_modules|\.git|\.env)(\/|$)|^\/(package(-lock)?\.json|README\.md)$/.test(pathname)) {res.writeHead(404);return res.end();}
    let status = 200;
    try { if ((await stat(file)).isDirectory()) file = resolve(file,'index.html'); await stat(file); }
    catch {file=resolve(root,'404.html');status=404;}
    const bytes = await readFile(file);
    res.writeHead(status,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});
    res.end(req.method==='HEAD'?undefined:bytes);
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Knowdexia preview: http://localhost:${port}`));
