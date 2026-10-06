import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readConfig } from '../src/config.mjs';
import { allPages } from '../src/site.mjs';
const config=readConfig({});
const pages=allPages(config);
const map=new Map(pages.map(p=>[p.path,p.html]));
const attribute=(html,pattern)=>[...html.matchAll(pattern)].map(m=>m[1]);
test('every page has unique metadata, one h1, and valid structured data',()=>{
  const titles=new Set(), descriptions=new Set();
  for(const {path,html} of pages){
    assert.equal((html.match(/<h1>/g)||[]).length,1,path);
    const title=html.match(/<title>(.*?)<\/title>/s)[1];
    const description=html.match(/name="description" content="([^"]+)"/)[1];
    assert(!titles.has(title));titles.add(title);
    assert(!descriptions.has(description));descriptions.add(description);
    assert(html.includes(`rel="canonical" href="https://knowdexia.com${path}"`),path);
    assert(html.includes('property="og:image" content="https://knowdexia.com/og.png"'));
    assert.equal(JSON.parse(html.match(/application\/ld\+json">(.*?)<\/script>/s)[1])['@type'],'WebSite');
  }
});
test('internal links, hash targets, assets, and aria control targets resolve',async()=>{
  for(const {path,html} of pages){
    const ids=attribute(html,/\bid="([^"]+)"/g);
    assert.equal(ids.length,new Set(ids).size,`Duplicate id on ${path}`);
    for(const target of attribute(html,/aria-controls="([^"]+)"/g)) assert(ids.includes(target),`${path}: ${target}`);
    for(const ref of attribute(html,/(?:href|src)="([^"]+)"/g)){
      if(!ref.startsWith('/')&&!ref.startsWith('#')) continue;
      const url=new URL(ref,`https://knowdexia.com${path}`);
      const target=map.get(url.pathname);
      if(target){if(url.hash) assert(target.includes(`id="${url.hash.slice(1)}"`),`${path}: ${ref}`);}
      else assert((await stat(resolve('.',url.pathname.slice(1)))).isFile(),`${path}: ${ref}`);
    }
  }
});
test('application URL config is safe, centralized, and release-gated',()=>{
  assert.equal(readConfig({}).appUrl,'/coming-soon');
  assert.throws(()=>readConfig({APP_URL:'javascript:alert(1)'}));
  assert.throws(()=>readConfig({RELEASE:'true'}));
  const custom=readConfig({APP_URL:'https://app.example.test/start?a=1&b=2',RELEASE:'true',LEGAL_APPROVED:'true'});
  const home=allPages(custom)[0].html;
  assert(home.includes('href="https://app.example.test/start?a=1&amp;b=2"'));
  assert(home.includes('Try Knowdexia')&&!home.includes('Coming soon'));
  const soon=map.get('/');
  assert(soon.includes('href="/coming-soon">Coming soon')&&!soon.includes('Try Knowdexia'));
});
test('sitemap includes only public indexable routes and robots points to it',async()=>{
  const sitemap=await readFile('sitemap.xml','utf8');
  for(const {path} of pages){
    if(['/privacy','/terms','/coming-soon','/404'].includes(path)) assert(!sitemap.includes(`<loc>https://knowdexia.com${path}</loc>`));
    else assert(sitemap.includes(`<loc>https://knowdexia.com${path}</loc>`));
  }
  assert((await readFile('robots.txt','utf8')).includes('Sitemap: https://knowdexia.com/sitemap.xml'));
  for(const path of ['/privacy','/terms','/404','/coming-soon']) assert(map.get(path).includes('content="noindex, follow"'));
});
test('demo data is consistent and matching is scoped',async()=>{
  const {questions,documents,collections}=await import('../demo-data.js');
  const {matchQuestion,questionsIn,renderAnswer}=await import('../demo-render.js');
  const names=new Set(documents.map(d=>d.name));
  for(const q of questions){
    for(const s of q.sources) assert(names.has(s.doc),`${q.id}: unknown document ${s.doc}`);
    for(const p of q.answer) assert(q.sources[p.cite],`${q.id}: citation ${p.cite} has no source`);
    for(const scope of q.scopes) assert(collections.some(c=>c.id===scope),`${q.id}: unknown scope ${scope}`);
  }
  for(const c of collections) assert(questionsIn(c.id).length>0,`${c.id} has no questions`);
  assert.equal(matchQuestion('release notes format','all').id,'release-notes');
  assert.equal(matchQuestion('release notes format','market'),null);
  assert.equal(matchQuestion('zzz qqq','all'),null);
  assert(renderAnswer(null).includes('no passages'));
});
test('home page serves the interactive demo, default state included',()=>{
  const html=map.get('/');
  for(const id of ['demo-form','demo-query','demo-scopes','demo-suggestions','demo-answer','demo-tabs','source-preview']) assert(html.includes(`id="${id}"`),id);
  assert(html.includes('<script type="module" src="/demo.js">'));
});
test('coming-soon page embeds the Google Form only when configured',()=>{
  const none=allPages(readConfig({})).find(p=>p.path==='/coming-soon').html;
  assert(!none.includes('<iframe'));
  const form='https://docs.google.com/forms/d/e/abc123/viewform';
  const embedded=allPages(readConfig({FORM_URL:form})).find(p=>p.path==='/coming-soon').html;
  assert(embedded.includes(`<iframe src="${form}?embedded=true"`));
  const short=allPages(readConfig({FORM_URL:'https://forms.gle/xyz'})).find(p=>p.path==='/coming-soon').html;
  assert(!short.includes('<iframe')&&short.includes('href="https://forms.gle/xyz"'));
  assert.throws(()=>readConfig({FORM_URL:'http://example.test/form'}));
  assert(readConfig({RELEASE:'true',LEGAL_APPROVED:'true',FORM_URL:form}).formUrl===form);
});
