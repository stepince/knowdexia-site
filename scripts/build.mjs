import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { readConfig } from '../src/config.mjs';
import { allPages } from '../src/site.mjs';
const root = fileURLToPath(new URL('..', import.meta.url));
if (existsSync(resolve(root, '.env'))) process.loadEnvFile(resolve(root, '.env'));
const config = readConfig();
const pages = allPages(config);
const dist = resolve(root, 'docs');
await rm(dist, { recursive:true, force:true });
await mkdir(dist, {recursive:true});
await cp(resolve(root, 'public'),dist,{recursive:true});
await writeFile(resolve(dist,'.nojekyll'),'');
for (const page of pages) {
  const file = page.path === '/404' ? '404.html' : page.path === '/' ? 'index.html' : page.path.slice(1) + '/index.html';
  const target = resolve(dist, file);
  await mkdir(resolve(target, '..'), {recursive:true});
  await writeFile(target, page.html);
}
const indexed = pages.filter(p => !p.noindex && p.path !== '/get-started');
await writeFile(resolve(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexed.map(p=>`\n  <url><loc>${config.siteUrl}${p.path}</loc></url>`).join('')}\n</urlset>\n`);
await writeFile(resolve(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages in docs/`);
if (config.appUrl === '/get-started') console.log('APP_URL is unset. Try Knowdexia points to /get-started.');
if (!config.legalApproved) console.log('Privacy and terms are marked draft and noindex. Review before launch.');
