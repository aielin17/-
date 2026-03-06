const LS_FAV   = 'sg_favorites';
const LS_FONT  = 'sg_last_font';

function loadFavs(){
  try{ return JSON.parse(localStorage.getItem(LS_FAV)||'[]'); }catch(e){ return []; }
}
function saveFavs(arr){
  try{ localStorage.setItem(LS_FAV, JSON.stringify(arr)); }catch(e){}
}
function loadFont(){
  try{ return localStorage.getItem(LS_FONT)||''; }catch(e){ return ''; }
}
function saveFont(f){
  try{ localStorage.setItem(LS_FONT, f); }catch(e){}
}

let favorites = loadFavs();

const DEFAULT_FONT_IDS = ['f1','f2','f3'];
const LS_FONT_FAV = 'sg_font_favorites';
function loadFontFavs(){ try{ return JSON.parse(localStorage.getItem(LS_FONT_FAV)||'[]'); }catch(e){ return []; } }
function saveFontFavs(arr){ try{ localStorage.setItem(LS_FONT_FAV, JSON.stringify(arr)); }catch(e){} }
let fontFavorites = loadFontFavs();
let state = { type:'all', author:'all', query:'', fontFamily: loadFont() };
let currentModalItem = null;

function toast(msg, dur=2800){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(()=>el.classList.remove('show'), dur);
}

function copyText(text, label){
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(()=>toast('✅ 已复制 ' + label));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText='position:fixed;opacity:0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try{ document.execCommand('copy'); toast('✅ 已复制 ' + label); }
    catch(e){ toast('❌ 复制失败'); }
    document.body.removeChild(ta);
  }
}

// ─── 字卡下载 ────────────────────────────────────────────────────────────────
// 用 fetch → Blob → object URL 的方式触发下载
// 好处：download 属性完全由我们控制，文件名保证是 UTF-8，不依赖服务器响应头
function downloadCard(item){
  const fileName = item.fileName || (item.id + '.' + (item.fileType || 'json'));
  toast('📥 正在下载…');

  fetch(item.file)
    .then(res => {
      if(!res.ok) throw new Error('网络错误 ' + res.status);
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;          // 直接给中文文件名，浏览器会正确处理
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      toast('✅ 下载成功：' + fileName);
    })
    .catch(err => {
      console.error('下载失败', err);
      // fetch 跨域失败时降级：直接在新标签打开链接让浏览器处理
      toast('⚠️ 正在跳转下载链接…');
      window.open(item.file, '_blank');
    });
}

function isFav(id){ return favorites.includes(id); }

function toggleFav(id){
  if(isFav(id)){
    favorites = favorites.filter(f=>f!==id);
  } else {
    favorites.push(id);
  }
  saveFavs(favorites);
  const fontItem = FONTS.find(f=>f.id===id);
  if(fontItem){
    if(isFav(id)){
      if(!fontFavorites.includes(id)) fontFavorites.push(id);
    } else {
      fontFavorites = fontFavorites.filter(f=>f!==id);
    }
    saveFontFavs(fontFavorites);
  }
  updateFavCounts();
  const cards = document.querySelectorAll('#card-grid .item-card');
  cards.forEach(c=>{ if(c.dataset.id===id){ c.classList.toggle('favorited', isFav(id)); } });
  const mb = document.getElementById('modal-fav-btn');
  if(currentModalItem && currentModalItem.id===id){
    mb.classList.toggle('on', isFav(id));
    mb.title = isFav(id) ? '取消收藏' : '收藏';
  }
  if(state.type==='fav') renderCards();
}

function updateFavCounts(){
  const n = favorites.filter(id=>ALL.some(i=>i.id===id)).length;
  ['c-fav','mc-fav'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=n; });
}

function getFiltered(){
  const q = state.query.toLowerCase();
  return ALL.filter(item=>{
    if(state.type==='fav' && !isFav(item.id)) return false;
    if(state.type!=='all' && state.type!=='fav' && item.type!==state.type) return false;
    if(state.author!=='all' && item.author!==state.author) return false;
    if(q && !item.name.toLowerCase().includes(q) && !(item.author||'').toLowerCase().includes(q) && !(item.desc||'').toLowerCase().includes(q)) return false;
    return true;
  });
}

function countFor(type){
  return ALL.filter(item=>{
    if(type==='fav' && !isFav(item.id)) return false;
    if(type!=='all' && type!=='fav' && item.type!==type) return false;
    if(state.author!=='all' && item.author!==state.author) return false;
    const q = state.query.toLowerCase();
    if(q && !item.name.toLowerCase().includes(q) && !(item.author||'').toLowerCase().includes(q)) return false;
    return true;
  }).length;
}

function renderCounts(){
  ['all','bubble','font','card','music','fav'].forEach(t=>{
    const n = countFor(t);
    ['c-'+t, 'mc-'+t].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.textContent = n;
    });
  });
}

function renderAuthors(){
  const authorMap = {};
  ALL.forEach(i=>{ authorMap[i.author] = (authorMap[i.author]||0)+1; });

  // 按数量降序排列，milk 始终第一
  const sorted = Object.entries(authorMap).sort((a,b)=>b[1]-a[1]);
  const milkIdx = sorted.findIndex(([name])=>name==='milk');
  if(milkIdx > 0){ const [m] = sorted.splice(milkIdx,1); sorted.unshift(m); }

  ['author-list','m-author-list'].forEach(listId=>{
    const el = document.getElementById(listId);
    if(!el) return;
    el.innerHTML = '';

    const allChip = document.createElement('div');
    allChip.className = 'author-chip' + (state.author==='all'?' active':'');
    allChip.dataset.author = 'all';
    allChip.innerHTML = '全部 <span class="author-chip-n">'+ALL.length+'</span>';
    allChip.onclick = ()=>setAuthor('all');
    el.appendChild(allChip);

    sorted.forEach(([name,n])=>{
      const d = document.createElement('div');
      d.className = 'author-chip' + (state.author===name?' active':'');
      d.dataset.author = name;
      d.innerHTML = name + (name==='milk'?' 👑':'') + ' <span class="author-chip-n">'+n+'</span>';
      d.onclick = ()=>setAuthor(name);
      el.appendChild(d);
    });
  });
}

function getBadgeHTML(item){
  if(item.type==='bubble') return '<span class="card-badge badge-bubble">气泡</span>';
  if(item.type==='font')   return '<span class="card-badge badge-font">字体</span>';
  if(item.type==='card')   return '<span class="card-badge badge-card">字卡</span>';
  if(item.type==='music')  return '<span class="card-badge badge-music">音乐</span>';
  return '';
}

function renderCards(){
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';
  const filtered = getFiltered();

  renderCounts();

  if(!filtered.length){
    grid.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      ${state.type==='fav' ? '还没有收藏，点击 ♡ 收藏喜欢的样式' : '没有找到匹配的内容'}
    </div>`;
    return;
  }

  const renderedGroups = new Set();
  let visibleCount = 0;
  filtered.forEach(item=>{
    if(item.group){ if(!renderedGroups.has(item.group)){ visibleCount++; renderedGroups.add(item.group); } }
    else { visibleCount++; }
  });
  document.getElementById('toolbar-info').textContent = visibleCount + ' 个结果';
  renderedGroups.clear();

  const groupSelected = {};

  filtered.forEach((item, i)=>{
    if(item.group){
      if(renderedGroups.has(item.group)) return;
      renderedGroups.add(item.group);
    }

    // ─── 音乐卡片 ──────────────────────────────────────────────────────────
    if(item.type === 'music'){
      const card = document.createElement('div');
      card.className = 'item-card card-type-music' + (isFav(item.id)?' favorited':'');
      card.style.animationDelay = Math.min(i * 0.04, 0.3) + 's';
      card.dataset.id = item.id;
      const favOn = isFav(item.id);
      const tagsHTML = (item.tags||[]).map(t=>`<span class="card-tag" style="background:#fdf2f8;color:#db2777;border-color:#fce7f3">${t}</span>`).join('');

      // 如果是系列，获取同系列所有曲目
      const seriesTracks = item.group
        ? MUSIC.filter(m=>m.group===item.group)
        : null;

      const tracklistHTML = seriesTracks && seriesTracks.length > 1
        ? `<div class="music-series-label">🎵 ${item.groupLabel||item.group}</div>
           <div class="music-tracklist">
             ${seriesTracks.map((t,idx)=>`
               <div class="music-track-row">
                 <span class="music-track-num">${idx+1}</span>
                 <span class="music-track-name">${t.name}</span>
                 <span class="music-track-dur">${t.duration||''}</span>
                 <button class="music-track-dl" title="下载" data-file="${t.file}" data-filename="${t.fileName||t.id+'.mp3'}" data-id="${t.id}">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                 </button>
               </div>`).join('')}
           </div>`
        : '';

      card.innerHTML = `
        <div class="music-card-top">
          <div class="music-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <div class="music-card-info">
            <div class="card-top" style="margin-bottom:2px">
              <span class="card-name">${seriesTracks && seriesTracks.length>1 ? (item.groupLabel||item.group) : item.name}</span>
              ${getBadgeHTML(item)}
            </div>
            <span class="card-author">${item.author}</span>
          </div>
        </div>
        ${tracklistHTML || (item.desc ? `<p class="card-desc">${item.desc}</p>` : '')}
        ${tagsHTML ? `<div class="card-tags">${tagsHTML}</div>` : ''}
        <div class="card-actions">
          <button class="btn-preview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            详情
          </button>
          <button class="btn-icon btn-fav ${favOn?'on':''}" title="${favOn?'取消收藏':'收藏'}">
            <svg viewBox="0 0 24 24" fill="${favOn?'currentColor':'none'}" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          ${!seriesTracks || seriesTracks.length<=1 ? `<button class="btn-icon btn-dl-music" title="下载">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>` : ''}
        </div>
      `;

      // 系列内每首曲目的下载按钮
      card.querySelectorAll('.music-track-dl').forEach(btn=>{
        btn.addEventListener('click', e=>{
          e.stopPropagation();
          const trackItem = MUSIC.find(m=>m.id===btn.dataset.id);
          if(trackItem) downloadCard(trackItem);
        });
      });

      card.querySelector('.btn-preview').addEventListener('click', e=>{ e.stopPropagation(); openModal(item); });
      card.querySelector('.btn-fav').addEventListener('click', e=>{
        e.stopPropagation();
        toggleFav(item.id);
        const b=e.currentTarget; const on=isFav(item.id);
        b.classList.toggle('on',on); b.title=on?'取消收藏':'收藏';
        b.querySelector('svg').setAttribute('fill',on?'currentColor':'none');
      });
      const dlBtn = card.querySelector('.btn-dl-music');
      if(dlBtn) dlBtn.addEventListener('click', e=>{ e.stopPropagation(); downloadCard(item); });
      card.addEventListener('click', ()=>openModal(item));
      grid.appendChild(card);
      return;
    }

    // ─── 字卡卡片 ──────────────────────────────────────────────────────────
    if(item.type === 'card'){
      const card = document.createElement('div');
      card.className = 'item-card card-type-card' + (isFav(item.id)?' favorited':'');
      card.style.animationDelay = Math.min(i * 0.04, 0.3) + 's';
      card.dataset.id = item.id;

      const favOn = isFav(item.id);
      const tagsHTML = (item.tags||[]).map(t=>`<span class="card-tag">${t}</span>`).join('');
      const countsHTML = item.itemCounts
        ? Object.entries(item.itemCounts).map(([k,v])=>`<span class="card-count-item"><b>${v}</b> ${k}</span>`).join('')
        : '';

      card.innerHTML = `
        <div class="card-top">
          <span class="card-name">${item.name}</span>
          ${getBadgeHTML(item)}
        </div>
        <span class="card-author">${item.author}</span>
        ${item.desc ? `<p class="card-desc">${item.desc}</p>` : ''}
        ${countsHTML ? `<div class="card-counts">${countsHTML}</div>` : ''}
        ${tagsHTML ? `<div class="card-tags">${tagsHTML}</div>` : ''}
        <div class="card-actions">
          <button class="btn-preview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            详情
          </button>
          <button class="btn-icon btn-fav ${favOn?'on':''}" title="${favOn?'取消收藏':'收藏'}">
            <svg viewBox="0 0 24 24" fill="${favOn?'currentColor':'none'}" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="btn-icon btn-download" title="下载文件">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
        </div>
      `;

      card.querySelector('.btn-preview').addEventListener('click', e=>{ e.stopPropagation(); openModal(item); });
      card.querySelector('.btn-fav').addEventListener('click', e=>{
        e.stopPropagation();
        toggleFav(item.id);
        const b=e.currentTarget;
        const on=isFav(item.id);
        b.classList.toggle('on',on);
        b.title=on?'取消收藏':'收藏';
        b.querySelector('svg').setAttribute('fill',on?'currentColor':'none');
      });
      card.querySelector('.btn-download').addEventListener('click', e=>{ e.stopPropagation(); downloadCard(item); });
      card.addEventListener('click', ()=>openModal(item));

      grid.appendChild(card);
      return;
    }

    // ─── 气泡 / 字体卡片（原逻辑）─────────────────────────────────────────
    const siblings = item.group ? BUBBLES.filter(b=>b.group===item.group) : null;
    const activeItem = item;

    if(item.group) groupSelected[item.group] = item.id;

    const card = document.createElement('div');
    card.className = 'item-card' + (isFav(item.id)?' favorited':'');
    card.style.animationDelay = Math.min(i * 0.04, 0.3) + 's';
    card.dataset.id = item.id;

    const badge = getBadgeHTML(item);
    const nameStyle = item.type==='font' ? `style="font-family:${item.family}"` : '';
    const copyIcon = item.type==='bubble'
      ? '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'
      : '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>';
    const favOn = isFav(item.id);

    const variantHTML = siblings && siblings.length > 1 ? `
      <div class="card-variants">
        ${siblings.map(s=>`<button class="card-var-btn${s.id===item.id?' active':''}" data-var-id="${s.id}" data-var-name="${s.name}">${s.name}</button>`).join('')}
      </div>` : '';

    card.innerHTML = `
      <div class="card-top">
        <span class="card-name" ${nameStyle}>${item.group ? (item.groupLabel||item.group) : item.name}${item.group?'<span class="card-group-dot" title="同系列变体"></span>':''}</span>
        ${badge}
      </div>
      <span class="card-author">${item.author}</span>
      ${variantHTML}
      <div class="card-actions">
        <button class="btn-preview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          预览
        </button>
        <button class="btn-icon btn-fav ${favOn?'on':''}" title="${favOn?'取消收藏':'收藏'}">
          <svg viewBox="0 0 24 24" fill="${favOn?'currentColor':'none'}" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="btn-icon btn-copy" title="复制">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">${copyIcon}</svg>
        </button>
      </div>
    `;

    if(siblings && siblings.length > 1){
      card.querySelectorAll('.card-var-btn').forEach(vBtn=>{
        vBtn.addEventListener('click', e=>{
          e.stopPropagation();
          const varId = vBtn.dataset.varId;
          groupSelected[item.group] = varId;
          card.querySelectorAll('.card-var-btn').forEach(b=>b.classList.toggle('active', b.dataset.varId===varId));
          const selSib = siblings.find(s=>s.id===varId);
          if(selSib){
            card.dataset.id = varId;
            card.querySelector('.btn-preview').dataset.varId = varId;
          }
        });
      });
    }

    card.querySelector('.btn-preview').addEventListener('click', e=>{
      e.stopPropagation();
      if(item.group){
        const selId = groupSelected[item.group] || item.id;
        const selItem = BUBBLES.find(b=>b.id===selId) || item;
        openModal(selItem);
      } else {
        openModal(item);
      }
    });

    card.querySelector('.btn-fav').addEventListener('click', e=>{
      e.stopPropagation();
      toggleFav(item.id);
      const b=e.currentTarget;
      const on=isFav(item.id);
      b.classList.toggle('on',on);
      b.title=on?'取消收藏':'收藏';
      b.querySelector('svg').setAttribute('fill',on?'currentColor':'none');
    });

    card.querySelector('.btn-copy').addEventListener('click', e=>{
      e.stopPropagation();
      if(item.group){
        const selId = groupSelected[item.group] || item.id;
        const selItem = siblings.find(s=>s.id===selId) || item;
        copyText(selItem.css, `CSS（${selItem.name}）`);
      } else {
        copyText(item.type==='bubble'?item.css:item.url, item.type==='bubble'?'CSS':'字体链接');
      }
    });

    card.addEventListener('click', ()=>{
      if(item.group){
        const selId = groupSelected[item.group] || item.id;
        const selItem = BUBBLES.find(b=>b.id===selId) || item;
        openModal(selItem);
      } else {
        openModal(item);
      }
    });

    grid.appendChild(card);
  });
}

function openModal(item){
  currentModalItem = item;
  const backdrop = document.getElementById('modal-backdrop');
  const body     = document.getElementById('modal-body');
  const footer   = document.getElementById('modal-footer');
  const name     = document.getElementById('modal-name');
  const badgeEl  = document.getElementById('modal-badge');
  const favBtn   = document.getElementById('modal-fav-btn');

  name.textContent = item.name;
  badgeEl.innerHTML = getBadgeHTML(item);

  const favOn = isFav(item.id);
  favBtn.classList.toggle('on', favOn);
  favBtn.title = favOn ? '取消收藏' : '收藏';
  favBtn.querySelector('svg').setAttribute('fill', favOn ? 'currentColor' : 'none');
  favBtn.onclick = ()=>toggleFav(item.id);

  body.innerHTML = '';
  footer.innerHTML = '';

  // ─── 音乐 modal ──────────────────────────────────────────────────────────
  if(item.type === 'music'){
    document.getElementById('dbs').textContent = '';
    body.className = 'modal-body modal-body-music';

    const seriesTracks = item.group ? MUSIC.filter(m=>m.group===item.group) : null;
    const isSeries = seriesTracks && seriesTracks.length > 1;

    const tagsHTML = (item.tags||[]).map(t=>`<span class="card-tag" style="background:#fdf2f8;color:#db2777;border-color:#fce7f3">${t}</span>`).join('');

    let tracklistHTML = '';
    if(isSeries){
      tracklistHTML = `
        <div class="music-modal-tracklist">
          <div class="music-modal-track-header">🎵 ${item.groupLabel||item.group} · ${seriesTracks.length} 首</div>
          ${seriesTracks.map((t,idx)=>`
            <div class="music-modal-track-item">
              <span class="mmt-num">${idx+1}</span>
              <div class="mmt-info">
                <div class="mmt-name">${t.name}</div>
                ${t.desc ? `<div class="mmt-desc">${t.desc}</div>` : ''}
              </div>
              <span class="mmt-dur">${t.duration||''}</span>
              <button class="mmt-dl" data-id="${t.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                下载
              </button>
            </div>`).join('')}
        </div>`;
    }

    body.innerHTML = `
      <div class="music-modal-hero">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      </div>
      ${item.desc ? `<p class="music-modal-desc">${item.desc}</p>` : ''}
      ${tracklistHTML}
      <div class="card-modal-meta music-modal-meta">
        ${item.fileType ? `<div class="cmm-row"><span>文件格式</span><strong>.${item.fileType.toUpperCase()}</strong></div>` : ''}
        ${item.duration&&!isSeries ? `<div class="cmm-row"><span>时长</span><strong>${item.duration}</strong></div>` : ''}
        ${isSeries ? `<div class="cmm-row"><span>系列曲目</span><strong>${seriesTracks.length} 首</strong></div>` : ''}
        ${item.author ? `<div class="cmm-row"><span>作者</span><strong>${item.author}</strong></div>` : ''}
      </div>
      ${tagsHTML ? `<div class="card-tags card-modal-tags">${tagsHTML}</div>` : ''}
    `;

    // 绑定系列内各首曲目下载
    body.querySelectorAll('.mmt-dl').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const trackItem = MUSIC.find(m=>m.id===btn.dataset.id);
        if(trackItem) downloadCard(trackItem);
      });
    });

    if(!isSeries){
      const dlBtn = document.createElement('button');
      dlBtn.className = 'copy-css-btn music-dl-btn';
      dlBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>下载 ${item.fileName||item.id+'.'+item.fileType}`;
      dlBtn.onclick = ()=>downloadCard(item);
      footer.appendChild(dlBtn);
    }

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    return;
  }

  // ─── 字卡 modal ──────────────────────────────────────────────────────────
  if(item.type === 'card'){
    document.getElementById('dbs').textContent = '';
    body.className = 'modal-body modal-body-card';

    const tagsHTML = (item.tags||[]).map(t=>`<span class="card-tag">${t}</span>`).join('');
    const countsHTML = item.itemCounts
      ? Object.entries(item.itemCounts).map(([k,v])=>`
          <div class="card-modal-count">
            <span class="cmc-num">${v}</span>
            <span class="cmc-label">${k}</span>
          </div>`).join('')
      : '';

    body.innerHTML = `
      <div class="card-modal-hero">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>
      ${item.desc ? `<p class="card-modal-desc">${item.desc}</p>` : ''}
      ${countsHTML ? `<div class="card-modal-counts">${countsHTML}</div>` : ''}
      <div class="card-modal-meta">
        ${item.fileType ? `<div class="cmm-row"><span>文件格式</span><strong>.${item.fileType.toUpperCase()}</strong></div>` : ''}
        ${item.size     ? `<div class="cmm-row"><span>文件大小</span><strong>${item.size}</strong></div>` : ''}
        ${item.exportDate ? `<div class="cmm-row"><span>更新日期</span><strong>${item.exportDate}</strong></div>` : ''}
        ${item.author   ? `<div class="cmm-row"><span>作者</span><strong>${item.author}</strong></div>` : ''}
      </div>
      ${tagsHTML ? `<div class="card-tags card-modal-tags">${tagsHTML}</div>` : ''}
    `;

    const dlBtn = document.createElement('button');
    dlBtn.className = 'copy-css-btn card-dl-btn';
    dlBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>下载 ${item.fileName||item.id+'.'+item.fileType}`;
    dlBtn.onclick = ()=>downloadCard(item);
    footer.appendChild(dlBtn);

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    return;
  }

  // ─── 气泡 modal ──────────────────────────────────────────────────────────
  if(item.type === 'bubble'){
    body.className = 'modal-body';
    document.getElementById('dbs').textContent = item.css;

    function renderBubblePreviews(previewItem){
      body.innerHTML = '';
      document.getElementById('dbs').textContent = previewItem.css;
      currentModalItem = previewItem;
      document.getElementById('modal-name').textContent = previewItem.name;
      const favOn2 = isFav(previewItem.id);
      favBtn.classList.toggle('on', favOn2);
      favBtn.title = favOn2 ? '取消收藏' : '收藏';
      favBtn.querySelector('svg').setAttribute('fill', favOn2 ? 'currentColor' : 'none');
      favBtn.onclick = ()=>toggleFav(previewItem.id);
      (previewItem.previews || [{t:'sent',v:'你好'},{t:'received',v:'你好呀'}]).forEach(msg=>{
        const row = document.createElement('div');
        row.className = 'msg-row ' + msg.t;
        const bub = document.createElement('div');
        bub.className = 'message message-' + msg.t;
        bub.textContent = msg.v;
        row.appendChild(bub);
        body.appendChild(row);
      });
      body.style.fontFamily = state.fontFamily;
    }

    renderBubblePreviews(item);

    const modalState = { fontFamily: state.fontFamily };
    body.style.fontFamily = modalState.fontFamily;

    if(item.group){
      const siblings = BUBBLES.filter(b=>b.group===item.group);
      if(siblings.length > 1){
        const varSection = document.createElement('div');
        varSection.className = 'variant-section';
        const varLabel = document.createElement('div');
        varLabel.className = 'variant-label';
        varLabel.innerHTML = `同系列变体 <span class="variant-tag">${item.groupLabel||item.group}</span>`;
        varSection.appendChild(varLabel);
        const varRow = document.createElement('div');
        varRow.className = 'variant-row';
        siblings.forEach(sib=>{
          const vBtn = document.createElement('button');
          vBtn.className = 'variant-btn' + (sib.id===item.id?' active':'');
          vBtn.textContent = sib.name;
          vBtn.dataset.varId = sib.id;
          vBtn.addEventListener('click', ()=>{
            renderBubblePreviews(sib);
            varRow.querySelectorAll('.variant-btn').forEach(b=>b.classList.toggle('active', b.dataset.varId===sib.id));
            footer.querySelector('.copy-css-btn').onclick = ()=>copyText(sib.css,'CSS');
          });
          varRow.appendChild(vBtn);
        });
        varSection.appendChild(varRow);
        footer.appendChild(varSection);
      }
    }

    const switchLabel = document.createElement('div');
    switchLabel.className = 'font-switch-label';
    switchLabel.textContent = '收藏字体';
    footer.appendChild(switchLabel);

    const defSection = document.createElement('div');
    defSection.className = 'font-cat-section';
    const defHeader = document.createElement('div');
    defHeader.className = 'font-cat-header';
    const defCatLabel = document.createElement('span');
    defCatLabel.className = 'font-cat-name';
    defCatLabel.textContent = '默认';
    defHeader.appendChild(defCatLabel);
    defSection.appendChild(defHeader);
    const defRow = document.createElement('div');
    defRow.className = 'modal-footer-row';

    const defBtn = document.createElement('button');
    defBtn.className = 'font-btn' + (modalState.fontFamily==='' ? ' active' : '');
    defBtn.textContent = '默认字体';
    defBtn.onclick = ()=>{ modalState.fontFamily=''; body.style.fontFamily=''; saveFont(''); updateFontBtns(footer, modalState); };
    defRow.appendChild(defBtn);

    const defaultFonts = FONTS.filter(f=>DEFAULT_FONT_IDS.includes(f.id));
    defaultFonts.forEach(f=>{
      const btn = document.createElement('button');
      btn.className = 'font-btn' + (modalState.fontFamily===f.family ? ' active' : '');
      btn.style.fontFamily = f.family;
      btn.dataset.family = f.family;
      btn.textContent = f.name;
      btn.onclick = ()=>{ modalState.fontFamily=f.family; body.style.fontFamily=f.family; saveFont(f.family); updateFontBtns(footer, modalState); };
      defRow.appendChild(btn);
    });
    defSection.appendChild(defRow);
    footer.appendChild(defSection);

    const favFonts = FONTS.filter(f=>fontFavorites.includes(f.id) && !DEFAULT_FONT_IDS.includes(f.id));
    const favFontSection = document.createElement('div');
    favFontSection.className = 'font-cat-section';
    const favFontHeader = document.createElement('div');
    favFontHeader.className = 'font-cat-header';
    const favCatLabel = document.createElement('span');
    favCatLabel.className = 'font-cat-name';
    favCatLabel.textContent = '已收藏';
    favFontHeader.appendChild(favCatLabel);
    favFontSection.appendChild(favFontHeader);
    const favFontRow = document.createElement('div');
    favFontRow.className = 'modal-footer-row';
    if(favFonts.length === 0){
      const hint = document.createElement('span');
      hint.style.cssText = 'font-size:11px;color:var(--text-muted);padding:4px 2px';
      hint.textContent = '在画廊收藏字体后显示于此';
      favFontRow.appendChild(hint);
    } else {
      favFonts.forEach(f=>{
        const btn = document.createElement('button');
        btn.className = 'font-btn' + (modalState.fontFamily===f.family ? ' active' : '');
        btn.style.fontFamily = f.family;
        btn.dataset.family = f.family;
        btn.textContent = f.name;
        btn.onclick = ()=>{ modalState.fontFamily=f.family; body.style.fontFamily=f.family; saveFont(f.family); updateFontBtns(footer, modalState); };
        favFontRow.appendChild(btn);
      });
    }
    favFontSection.appendChild(favFontRow);
    footer.appendChild(favFontSection);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-css-btn';
    copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>复制 CSS 代码`;
    copyBtn.onclick = ()=>copyText(item.css, 'CSS');
    footer.appendChild(copyBtn);

  } else {
    // ─── 字体 modal ────────────────────────────────────────────────────────
    body.className = 'modal-body';
    document.getElementById('dbs').textContent = '';

    const box = document.createElement('div');
    box.className = 'font-preview-box';
    box.innerHTML = `
      <div class="font-big" style="font-family:${item.family}">字体预览<br>我许愿一个有你的冬天</div>
      <div class="font-small" style="font-family:${item.family}">我四季都在<br>Aa Bb Cc 123</div>
      <div class="font-chars" style="font-family:${item.family}">永远 爱你 思念</div>
    `;
    body.appendChild(box);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-css-btn';
    copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>复制字体链接`;
    copyBtn.onclick = ()=>copyText(item.url, '字体链接');
    footer.appendChild(copyBtn);
  }

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateFontBtns(footer, modalState){
  footer.querySelectorAll('.font-btn').forEach(btn=>{
    const fam = btn.dataset.family || '';
    btn.classList.toggle('active', fam === modalState.fontFamily);
  });
}

function closeModal(){
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  currentModalItem = null;
  setTimeout(()=>{ document.getElementById('dbs').textContent=''; }, 350);
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', function(e){ if(e.target===this) closeModal(); });

let touchStartY = 0;
document.getElementById('modal').addEventListener('touchstart', e=>{ touchStartY = e.touches[0].clientY; }, {passive:true});
document.getElementById('modal').addEventListener('touchend', e=>{ if(e.changedTouches[0].clientY - touchStartY > 80) closeModal(); }, {passive:true});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

function setType(t){
  state.type = t;
  ['type-list','m-type-list'].forEach(id=>{
    const list = document.getElementById(id);
    if(!list) return;
    list.querySelectorAll('.type-pill').forEach(p=>p.classList.toggle('active', p.dataset.type===t));
  });
  renderCards();
}

function setAuthor(a){
  state.author = a;
  renderAuthors();
  renderCards();
}

['type-list','m-type-list'].forEach(id=>{
  const list = document.getElementById(id);
  if(!list) return;
  list.querySelectorAll('.type-pill').forEach(pill=>{
    pill.addEventListener('click', ()=>setType(pill.dataset.type));
  });
});

document.getElementById('search-input').addEventListener('input', function(){
  state.query = this.value.trim();
  renderCards();
});

document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    const gv = document.getElementById('gallery-view');
    const sv = document.getElementById('submit-view');
    if(tab==='gallery'){ gv.style.display='flex'; sv.classList.remove('active'); }
    else { gv.style.display='none'; sv.classList.add('active'); }
  });
});

document.getElementById('mobile-filter-btn').addEventListener('click', ()=>{ document.getElementById('filter-drawer').classList.add('open'); });
document.getElementById('filter-drawer-bg').addEventListener('click', ()=>{ document.getElementById('filter-drawer').classList.remove('open'); });

const SUBMIT_EMAIL = '3152037224@qq.com';

window.switchForm = function(type){
  document.querySelectorAll('.form-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.s-type-btn').forEach((b,i)=>b.classList.toggle('active',
    (type==='bubble'&&i===0)||(type==='font'&&i===1)||(type==='card'&&i===2)
  ));
  document.getElementById('form-'+type).classList.add('active');
  ['bubble','font','card'].forEach(t=>{ const el=document.getElementById('fallback-'+t); if(el) el.classList.remove('show'); });
};

function buildBubbleCode(name, author, css, demos, series, groupId){
  const tagMap = ['sent','received','sent','received'];
  const prevStr = demos.filter(d=>d.v).map(d=>`    {t:'${d.t}',v:'${d.v.replace(/'/g,"\\'")}'}` ).join(',\n');
  const nextId = 'b' + (BUBBLES.length + 1);
  const groupLine = groupId ? `\n  group:'${groupId}',\n  groupLabel:'${series||groupId}',` : (series ? `\n  /* 系列：${series} */` : '');
  return `/* === 气泡投稿 === */\n{\n  id:'${nextId}',\n  type:'bubble',\n  name:'${name}',\n  author:'${author||'匿名'}',${groupLine}\n  previews:[\n${prevStr}\n  ],\n  css:\`${css}\`\n}`;
}

function buildFontCode(name, author, url, category){
  const nextId = 'f' + (FONTS.length + 1);
  const nextFamily = 'F' + (FONTS.length + 1);
  return `/* === 字体投稿 === */\n/* 1. 在 @font-face 添加: */\n@font-face { font-family:'${nextFamily}'; src:url('${url}') format('truetype'); font-display:swap }\n\n/* 2. 在 FONTS 数组添加: */\n{\n  id:'${nextId}',\n  type:'font',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  family:'${nextFamily}',\n  category:'${category||'其他'}',\n  url:'${url}'\n}`;
}

function buildCardCode(name, author, desc, tags, fileUrl, fileType, itemCounts){
  const nextId = 'card' + (CARDS.length + 1);
  const fileName = fileUrl.split('/').pop() || 'file.' + fileType;
  const countsStr = itemCounts ? JSON.stringify(itemCounts, null, 4) : '{}';
  return `/* === 字卡投稿 === */\n{\n  id:'${nextId}',\n  type:'card',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  desc:'${desc}',\n  tags:${JSON.stringify(tags.split(/[,，\s]+/).filter(Boolean))},\n  fileType:'${fileType||'json'}',\n  fileName:'${fileName}',\n  file:'${fileUrl}',\n  itemCounts:${countsStr},\n  exportDate:'${new Date().toISOString().slice(0,10)}'\n}`;
}

window.doSubmit = function(type){
  const nl = '\r\n';
  let subject='', body='', code='';

  if(type==='bubble'){
    const name   = document.getElementById('bubble-name').value.trim();
    const author = document.getElementById('bubble-author').value.trim();
    const css    = document.getElementById('bubble-css').value.trim();
    const series = document.getElementById('bubble-series').value.trim();
    const groupId= document.getElementById('bubble-group-id').value.trim().replace(/\s+/g,'');
    const demos  = [1,2,3,4].map((n,i)=>({ t:['sent','received','sent','received'][i], v:document.getElementById('p'+n).value.trim() }));
    if(!name || !css){ toast('⚠️ 请填写名称和 CSS 代码'); return; }

    code = buildBubbleCode(name, author, css, demos, series, groupId);
    subject = `【气泡投稿】${name} - ${author||'匿名'}${series?' ['+series+']':''}`;
    body = `投稿类型：聊天气泡${nl}名称：${name}${nl}作者：${author||'匿名'}${series?nl+'所属系列：'+series:''}${groupId?nl+'系列ID：'+groupId:''}${nl}${nl}--- 可直接粘贴到代码的数据条目 ---${nl}${code}`;

    document.getElementById('fb-content-bubble').value = `收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-bubble').classList.add('show');

  } else if(type==='font'){
    const name   = document.getElementById('font-name').value.trim();
    const author = document.getElementById('font-author').value.trim();
    const url    = document.getElementById('font-url').value.trim();
    const cat    = document.getElementById('font-category').value;
    if(!name || !url){ toast('⚠️ 请填写名称和字体链接'); return; }

    code = buildFontCode(name, author, url, cat);
    subject = `【字体投稿】${name} - ${author||'匿名'}`;
    body = `投稿类型：字体样式${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}分类：${cat}${nl}${nl}--- 可直接粘贴到代码的数据条目 ---${nl}${code}`;

    document.getElementById('fb-content-font').value = `收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-font').classList.add('show');

  } else if(type==='card'){
    const name   = document.getElementById('card-name').value.trim();
    const author = document.getElementById('card-author').value.trim();
    const desc   = document.getElementById('card-desc').value.trim();
    const tags   = document.getElementById('card-tags').value.trim();
    const fileUrl= document.getElementById('card-file-url').value.trim();
    const fileType = document.getElementById('card-file-type').value;
    const itemCounts = (() => {
      try { return JSON.parse(document.getElementById('card-item-counts').value || 'null'); }
      catch(e) { return null; }
    })();

    if(!name || !fileUrl){ toast('⚠️ 请填写字卡名称和文件链接'); return; }

    code = buildCardCode(name, author, desc, tags, fileUrl, fileType, itemCounts);
    subject = `【字卡投稿】${name} - ${author||'匿名'}`;
    body = `投稿类型：字卡${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}描述：${desc}${nl}文件链接：${fileUrl}${nl}${nl}--- 可直接粘贴到代码的数据条目 ---${nl}${code}`;

    document.getElementById('fb-content-card').value = `收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-card').classList.add('show');
  }

  window.location.href = `mailto:${SUBMIT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setTimeout(()=> toast('🚀 正在唤起邮件客户端，如未弹出请使用下方手动发送'), 400);
};

window.copyFallback = function(type){
  const el = document.getElementById('fb-content-'+type);
  copyText(el.value, '投稿内容');
};

window.copyEmail = function(type){
  copyText(SUBMIT_EMAIL, '收件地址');
};

(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  let dark = localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  function applyTheme(){
    if(dark){
      root.classList.add('dark');
      sunIcon.style.display = '';
      moonIcon.style.display = 'none';
    } else {
      root.classList.remove('dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = '';
    }
  }
  applyTheme();

  btn.addEventListener('click', ()=>{
    dark = !dark;
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    applyTheme();
  });
})();

updateFavCounts();
renderAuthors();
renderCards();