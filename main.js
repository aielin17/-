const LS_FAV      = 'sg_favorites';
const LS_FONT     = 'sg_last_font';
const LS_FONT_FAV = 'sg_font_favorites';

function loadFavs(){ try{ return JSON.parse(localStorage.getItem(LS_FAV)||'[]'); }catch(e){ return []; } }
function saveFavs(arr){ try{ localStorage.setItem(LS_FAV, JSON.stringify(arr)); }catch(e){} }
function loadFont(){ try{ return localStorage.getItem(LS_FONT)||''; }catch(e){ return ''; } }
function saveFont(f){ try{ localStorage.setItem(LS_FONT, f); }catch(e){} }
function loadFontFavs(){ try{ return JSON.parse(localStorage.getItem(LS_FONT_FAV)||'[]'); }catch(e){ return []; } }
function saveFontFavs(arr){ try{ localStorage.setItem(LS_FONT_FAV, JSON.stringify(arr)); }catch(e){} }

let favorites    = loadFavs();
let fontFavorites = loadFontFavs();
let state = { type:'all', author:'all', query:'', fontFamily: loadFont() };
let currentModalItem = null;

// ── Toast ─────────────────────────────────────────────────────────────────
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

// ── File download (字卡 / 音乐 通用) ──────────────────────────────────────
function downloadFile(item){
  const fileName = item.fileName || (item.id + '.' + (item.fileType || 'bin'));
  toast('📥 正在下载…');
  fetch(item.file)
    .then(res => {
      if(!res.ok) throw new Error('网络错误 ' + res.status);
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = fileName; a.style.display='none';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(url), 10000);
      toast('✅ 下载成功：' + fileName);
    })
    .catch(()=>{
      toast('⚠️ 正在跳转下载链接…');
      window.open(item.file, '_blank');
    });
}

// ── Favorites ─────────────────────────────────────────────────────────────
function isFav(id){ return favorites.includes(id); }

function toggleFav(id){
  if(isFav(id)){ favorites = favorites.filter(f=>f!==id); }
  else { favorites.push(id); }
  saveFavs(favorites);
  const fontItem = FONTS.find(f=>f.id===id);
  if(fontItem){
    if(isFav(id)){ if(!fontFavorites.includes(id)) fontFavorites.push(id); }
    else { fontFavorites = fontFavorites.filter(f=>f!==id); }
    saveFontFavs(fontFavorites);
  }
  updateFavCounts();
  document.querySelectorAll('#card-grid .item-card').forEach(c=>{
    if(c.dataset.id===id) c.classList.toggle('favorited', isFav(id));
  });
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

// ── Filtering ─────────────────────────────────────────────────────────────
function getFiltered(){
  const q = state.query.toLowerCase();
  return ALL.filter(item=>{
    if(state.type==='fav' && !isFav(item.id)) return false;
    if(state.type!=='all' && state.type!=='fav' && item.type!==state.type) return false;
    if(state.author!=='all' && item.author!==state.author) return false;
    if(q && !item.name.toLowerCase().includes(q)
         && !(item.author||'').toLowerCase().includes(q)
         && !(item.desc||'').toLowerCase().includes(q)) return false;
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
  ['all','bubble','font','card','theme','music','fav'].forEach(t=>{
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
    const sortedAuthors = Object.entries(authorMap).sort((a,b)=>b[1]-a[1]);
    sortedAuthors.forEach(([name,n])=>{
      const d = document.createElement('div');
      d.className = 'author-chip' + (state.author===name?' active':'');
      d.dataset.author = name;
      d.innerHTML = name + ' <span class="author-chip-n">'+n+'</span>';
      d.onclick = ()=>setAuthor(name);
      el.appendChild(d);
    });
  });
}

// ── Badge HTML ────────────────────────────────────────────────────────────
function getBadgeHTML(item){
  const map = {
    bubble: '<span class="card-badge badge-bubble">气泡</span>',
    font:   '<span class="card-badge badge-font">字体</span>',
    card:   '<span class="card-badge badge-card">字卡</span>',
    theme:  '<span class="card-badge badge-theme">主题</span>',
    music:  '<span class="card-badge badge-music">音乐</span>',
  };
  return map[item.type] || '';
}

// ── Update font button active states ──────────────────────────────────────
function updateFontBtns(container, modalState){
  container.querySelectorAll('.font-btn').forEach(btn=>{
    if(btn.dataset.family !== undefined){
      btn.classList.toggle('active', btn.dataset.family === modalState.fontFamily);
    } else {
      btn.classList.toggle('active', modalState.fontFamily === '');
    }
  });
}

// ── Card rendering ─────────────────────────────────────────────────────────
function renderCards(){
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';
  const filtered = getFiltered();
  renderCounts();

  const info = document.getElementById('toolbar-info');
  if(info) info.textContent = filtered.length + ' 个结果';

  if(!filtered.length){
    grid.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <p>${state.type==='fav' ? '还没有收藏，点击 ♡ 收藏喜欢的样式' : '没有找到匹配的内容'}</p>
    </div>`;
    return;
  }

  const renderedGroups = new Set();
  let idx = 0;
  filtered.forEach(item=>{
    // Group header
    if(item.group){
      if(renderedGroups.has(item.group)) return;
      renderedGroups.add(item.group);
      // Find all variants
      const variants = filtered.filter(i=>i.group===item.group);
      const card = makeGroupCard(variants, idx++);
      grid.appendChild(card);
      return;
    }
    const card = makeItemCard(item, idx++);
    grid.appendChild(card);
  });
}

function makeItemCard(item, idx){
  const card = document.createElement('div');
  card.className = 'item-card' + (isFav(item.id)?' favorited':'');
  if(item.type==='card')  card.classList.add('card-type-card');
  if(item.type==='theme') card.classList.add('card-type-theme');
  if(item.type==='music') card.classList.add('card-type-music');
  card.dataset.id   = item.id;
  card.style.animationDelay = Math.min(idx * 28, 280) + 'ms';

  card.innerHTML = `
    <div class="card-top">
      <span class="card-name">${esc(item.name)}</span>
      ${getBadgeHTML(item)}
    </div>
    <div class="card-author">${esc(item.author||'匿名')}</div>
    ${item.type === 'bubble' ? '<div class="card-preview bubble-card-shadow-host"></div>' : getCardBody(item)}
  `;

  // Bubble card: live preview using Shadow DOM (perfectly isolates the bubble CSS)
  if(item.type === 'bubble'){
    const host = card.querySelector('.bubble-card-shadow-host');
    const shadow = host.attachShadow({mode:'open'});
    const previewMsgs = (item.previews && item.previews.length)
      ? item.previews.slice(0,2)
      : [{t:'sent',v:'发送消息示例'},{t:'received',v:'接收消息示例'}];
    const msgsHtml = previewMsgs.map(p=>
      `<div class="msg-row ${p.t}"><div class="message message-${p.t}">${esc(p.v)}</div></div>`
    ).join('');
    shadow.innerHTML = `
      <style>
        :host{display:flex;flex-direction:column;gap:6px;padding:9px 11px;min-height:62px;box-sizing:border-box;}
        .msg-row{display:flex;width:100%}
        .msg-row.sent{justify-content:flex-end}
        .msg-row.received{justify-content:flex-start}
        .message{max-width:82%;font-size:11.5px;padding:5px 11px;border-radius:14px;line-height:1.4;word-break:break-word;position:relative;overflow:visible;}
        .message-sent{background:#5b5fef;color:#fff;border-radius:14px 14px 3px 14px;}
        .message-received{background:#fff;color:#333;border-radius:14px 14px 14px 3px;border:1px solid #e5e5ea;}
        ${item.css||''}
      </style>
      ${msgsHtml}
    `;
  }

  card.addEventListener('click', ()=>openModal(item));
  return card;
}

function makeGroupCard(variants, idx){
  if(variants[0].type === 'music') return makeMusicGroupCard(variants, idx);
  const first = variants[0];
  const card = document.createElement('div');
  card.className = 'item-card' + (isFav(first.id)?' favorited':'');
  card.dataset.id = first.id;
  card.style.animationDelay = Math.min(idx * 28, 280) + 'ms';

  let activeItem = first;

  function rebuild(){
    card.innerHTML = `
      <div class="card-top">
        <span class="card-name">${esc(first.groupLabel || first.name)}</span>
        ${getBadgeHTML(first)}
      </div>
      <div class="card-author">${esc(first.author||'匿名')}</div>
      ${getCardBody(activeItem)}
      <div class="card-variants">
        ${variants.map(v=>`<div class="card-var-btn${v.id===activeItem.id?' active':''}" data-id="${v.id}">${esc(v.name)}</div>`).join('')}
      </div>
    `;
    card.querySelectorAll('.card-var-btn').forEach(btn=>{
      btn.addEventListener('click', e=>{
        e.stopPropagation();
        activeItem = variants.find(v=>v.id===btn.dataset.id)||activeItem;
        card.dataset.id = activeItem.id;
        card.classList.toggle('favorited', isFav(activeItem.id));
        rebuild();
      });
    });
    card.onclick = (e)=>{
      if(e.target.classList.contains('card-var-btn')) return;
      openModal(activeItem);
    };
  }
  rebuild();
  return card;
}

// ── Music group card (playlist style) ────────────────────────────────────
function makeMusicGroupCard(variants, idx){
  const first = variants[0];
  const card = document.createElement('div');
  card.className = 'item-card card-type-music';
  card.dataset.id = first.id;
  card.style.animationDelay = Math.min(idx * 28, 280) + 'ms';

  const trackRows = variants.slice(0,3).map((v,i)=>`
    <div class="music-pl-row">
      <span class="music-pl-num">${i+1}</span>
      <span class="music-pl-name">${esc(v.name)}</span>
      ${v.duration?`<span class="music-pl-dur">${esc(v.duration)}</span>`:''}
    </div>`).join('');
  const more = variants.length > 3
    ? `<div class="music-pl-more">+${variants.length-3} 首</div>` : '';

  card.innerHTML = `
    <div class="card-top">
      <span class="card-name">${esc(first.groupLabel||first.name)}</span>
      <span class="card-badge badge-music">音乐</span>
    </div>
    <div class="card-author">${esc(first.author||'匿名')}</div>
    <div class="music-playlist-card">
      <div class="music-pl-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        合辑 · ${variants.length} 首
      </div>
      ${trackRows}
      ${more}
    </div>
  `;
  card.onclick = ()=>openMusicGroupModal(variants);
  return card;
}

function openMusicGroupModal(variants){
  const first = variants[0];
  currentModalItem = first;
  document.getElementById('modal-name').textContent = first.groupLabel || first.name;
  document.getElementById('modal-badge').innerHTML = getBadgeHTML(first);
  const mb = document.getElementById('modal-fav-btn');
  mb.classList.toggle('on', isFav(first.id));
  mb.title = isFav(first.id)?'取消收藏':'收藏';
  mb.onclick = ()=>toggleFav(first.id);
  renderMusicGroupModal(variants);
  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderMusicGroupModal(variants){
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');
  body.className = 'modal-body modal-body-music';
  body.innerHTML = '';
  footer.innerHTML = '';

  // Summary header
  const hdr = document.createElement('div');
  hdr.className = 'music-group-modal-hdr';
  hdr.innerHTML = `
    <div class="music-modal-hero">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    </div>
    <div class="music-group-modal-meta">
      <div class="music-group-count">${variants.length} 首歌曲</div>
      <div class="music-group-author">投稿者：${esc(variants[0].author||'匿名')}</div>
    </div>
  `;
  body.appendChild(hdr);

  // Tracklist
  const list = document.createElement('div');
  list.className = 'music-tracklist';
  variants.forEach((track, i)=>{
    const row = document.createElement('div');
    row.className = 'music-track-item';
    row.innerHTML = `
      <div class="track-num">${i+1}</div>
      <div class="track-info">
        <div class="track-name">${esc(track.name)}</div>
        ${track.artist?`<div class="track-sub">${esc(track.artist)}</div>`:''}
      </div>
      ${track.duration?`<div class="track-dur">${esc(track.duration)}</div>`:''}
      <div class="track-btns">
        <button class="track-link-btn" title="复制链接">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </button>
        <button class="track-dl-btn" title="下载">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
      </div>
    `;
    row.querySelector('.track-link-btn').onclick = e=>{ e.stopPropagation(); copyText(track.file||'', track.name+' 链接'); };
    row.querySelector('.track-dl-btn').onclick = e=>{ e.stopPropagation(); downloadFile(track); };
    list.appendChild(row);
  });
  body.appendChild(list);
}

function getCardBody(item){
  if(item.type==='bubble'){
    const msgs = (item.previews||[]).slice(0,2).map(p=>`
      <div class="bubble-row ${p.t}">
        <div class="bubble-msg ${p.t}">${esc(p.v)}</div>
      </div>`).join('');
    return `<div class="card-preview">${msgs}</div>`;
  }
  if(item.type==='font'){
    return `
      <div class="font-sample" style="font-family:'${esc(item.family)}',sans-serif">
        春江花月夜 Aa
      </div>
      <span class="font-category">${esc(item.category||'')}</span>`;
  }
  if(item.type==='card'){
    const desc = item.desc ? `<div class="card-desc">${esc(item.desc.slice(0,52)+(item.desc.length>52?'…':''))}</div>` : '';
    const counts = item.itemCounts ? `<div class="card-counts">${Object.entries(item.itemCounts).slice(0,3).map(([k,v])=>`<div class="card-count-item"><b>${v}</b> ${esc(k)}</div>`).join('')}</div>` : '';
    return desc + counts;
  }
  if(item.type==='theme'){
    const swatches = (item.colors||[]).slice(0,5).map(c=>`<div class="theme-swatch" style="background:${esc(c)}"></div>`).join('');
    const desc = item.desc ? `<div class="card-desc">${esc(item.desc.slice(0,52)+(item.desc.length>52?'…':''))}</div>` : '';
    const tags = (item.tags||[]).slice(0,3).map(t=>`<span class="theme-tag">${esc(t)}</span>`).join('');
    return `${desc}<div class="theme-swatches">${swatches}</div>${tags?`<div class="card-tags">${tags}</div>`:''}`;
  }
  if(item.type==='music'){
    const desc = item.desc ? `<div class="card-desc">${esc(item.desc.slice(0,52)+(item.desc.length>52?'…':''))}</div>` : '';
    const artist = item.artist ? `<div class="music-meta-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>${esc(item.artist)}</div>` : '';
    const tags = (item.tags||[]).slice(0,3).map(t=>`<span class="music-tag">${esc(t)}</span>`).join('');
    return `${desc}${artist}${tags?`<div class="card-tags">${tags}</div>`:''}`;
  }
  return '';
}

function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ── Modal ─────────────────────────────────────────────────────────────────
function openModal(item){
  currentModalItem = item;
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-badge').innerHTML = getBadgeHTML(item);
  const mb = document.getElementById('modal-fav-btn');
  mb.classList.toggle('on', isFav(item.id));
  mb.title = isFav(item.id)?'取消收藏':'收藏';
  mb.onclick = ()=>toggleFav(item.id);

  if(item.type==='bubble') renderBubbleModal(item);
  else if(item.type==='font')     renderFontModal(item);
  else if(item.type==='card')     renderCardModal(item);
  else if(item.type==='theme')    renderThemeModal(item);
  else if(item.type==='music')    renderMusicModal(item);

  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── Bubble modal ──────────────────────────────────────────────────────────
function renderBubbleModal(item){
  const body   = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');
  const favBtn = document.getElementById('modal-fav-btn');
  body.className = 'modal-body';
  body.innerHTML = '';
  footer.innerHTML = '';

  function renderPreviews(previewItem){
    body.innerHTML = '';
    document.getElementById('dbs').textContent = previewItem.css || '';
    currentModalItem = previewItem;
    document.getElementById('modal-name').textContent = previewItem.name;
    const favOn2 = isFav(previewItem.id);
    favBtn.classList.toggle('on', favOn2);
    favBtn.title = favOn2 ? '取消收藏' : '收藏';
    favBtn.querySelector('svg').setAttribute('fill', favOn2 ? 'currentColor' : 'none');
    favBtn.onclick = ()=>toggleFav(previewItem.id);
    const msgsWrap = document.createElement('div');
    msgsWrap.className = 'bubble-modal-msgs';
    (previewItem.previews||[{t:'sent',v:'你好'},{t:'received',v:'你好呀'}]).forEach(msg=>{
      const row = document.createElement('div');
      row.className = 'msg-row ' + msg.t;
      const bub = document.createElement('div');
      bub.className = 'message message-' + msg.t;
      bub.textContent = msg.v;
      row.appendChild(bub);
      msgsWrap.appendChild(row);
    });
    body.appendChild(msgsWrap);
    body.style.fontFamily = state.fontFamily || '';
  }

  renderPreviews(item);
  const modalState = { fontFamily: state.fontFamily || '' };

  // Variant switcher for grouped bubbles
  if(item.group){
    const siblings = BUBBLES.filter(b=>b.group===item.group);
    if(siblings.length > 1){
      const varSection = document.createElement('div');
      varSection.className = 'variant-section';
      const varLabel = document.createElement('div');
      varLabel.className = 'variant-label';
      varLabel.innerHTML = `同系列变体 <span class="variant-tag">${esc(item.groupLabel||item.group)}</span>`;
      varSection.appendChild(varLabel);
      const varRow = document.createElement('div');
      varRow.className = 'variant-row';
      siblings.forEach(sib=>{
        const vBtn = document.createElement('button');
        vBtn.className = 'variant-btn' + (sib.id===item.id?' active':'');
        vBtn.textContent = sib.name;
        vBtn.dataset.varId = sib.id;
        vBtn.addEventListener('click', ()=>{
          renderPreviews(sib);
          varRow.querySelectorAll('.variant-btn').forEach(b=>b.classList.toggle('active', b.dataset.varId===sib.id));
          copyBtn.onclick = ()=>copyText(sib.css||'','CSS');
        });
        varRow.appendChild(vBtn);
      });
      varSection.appendChild(varRow);
      footer.appendChild(varSection);
    }
  }

  // Font switcher
  const switchLabel = document.createElement('div');
  switchLabel.className = 'font-switch-label';
  switchLabel.textContent = '收藏字体';
  footer.appendChild(switchLabel);

  const defSection = document.createElement('div');
  defSection.className = 'font-cat-section';
  const defHeader = document.createElement('div');
  defHeader.className = 'font-cat-header';
  defHeader.innerHTML = '<span class="font-cat-name">默认</span>';
  defSection.appendChild(defHeader);
  const defRow = document.createElement('div');
  defRow.className = 'modal-footer-row';
  const defBtn = document.createElement('button');
  defBtn.className = 'font-btn' + (modalState.fontFamily===''?' active':'');
  defBtn.textContent = '默认字体';
  defBtn.onclick = ()=>{ modalState.fontFamily=''; body.style.fontFamily=''; saveFont(''); updateFontBtns(footer,modalState); };
  defRow.appendChild(defBtn);
  const DEFAULT_FONT_IDS = ['f1','f2','f3'];
  FONTS.filter(f=>DEFAULT_FONT_IDS.includes(f.id)).forEach(f=>{
    const btn = document.createElement('button');
    btn.className = 'font-btn'+(modalState.fontFamily===f.family?' active':'');
    btn.style.fontFamily = f.family; btn.dataset.family = f.family; btn.textContent = f.name;
    btn.onclick = ()=>{ modalState.fontFamily=f.family; body.style.fontFamily=f.family; saveFont(f.family); updateFontBtns(footer,modalState); };
    defRow.appendChild(btn);
  });
  defSection.appendChild(defRow);
  footer.appendChild(defSection);

  const favFonts = FONTS.filter(f=>fontFavorites.includes(f.id)&&!DEFAULT_FONT_IDS.includes(f.id));
  const favFontSection = document.createElement('div');
  favFontSection.className = 'font-cat-section';
  favFontSection.innerHTML = '<div class="font-cat-header"><span class="font-cat-name">已收藏</span></div>';
  const favFontRow = document.createElement('div');
  favFontRow.className = 'modal-footer-row';
  if(!favFonts.length){
    const hint = document.createElement('span');
    hint.style.cssText = 'font-size:11px;color:var(--text-muted);padding:4px 2px';
    hint.textContent = '在画廊收藏字体后显示于此';
    favFontRow.appendChild(hint);
  } else {
    favFonts.forEach(f=>{
      const btn = document.createElement('button');
      btn.className = 'font-btn'+(modalState.fontFamily===f.family?' active':'');
      btn.style.fontFamily = f.family; btn.dataset.family = f.family; btn.textContent = f.name;
      btn.onclick = ()=>{ modalState.fontFamily=f.family; body.style.fontFamily=f.family; saveFont(f.family); updateFontBtns(footer,modalState); };
      favFontRow.appendChild(btn);
    });
  }
  favFontSection.appendChild(favFontRow);
  footer.appendChild(favFontSection);

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-css-btn';
  copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>复制 CSS 代码`;
  copyBtn.onclick = ()=>copyText(item.css||'','CSS');
  footer.appendChild(copyBtn);
}

// ── Font modal ────────────────────────────────────────────────────────────
function renderFontModal(item){
  const body   = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');
  body.className = 'modal-body';
  body.innerHTML = '';
  footer.innerHTML = '';
  document.getElementById('dbs').textContent = '';

  const box = document.createElement('div');
  box.className = 'font-preview-box';
  box.innerHTML = `
    <div class="font-big" style="font-family:${esc(item.family)}">字体预览<br>我许愿一个有你的冬天</div>
    <div class="font-small" style="font-family:${esc(item.family)}">我四季都在<br>Aa Bb Cc 123</div>
    <div class="font-chars" style="font-family:${esc(item.family)}">永远 爱你 思念</div>
  `;
  body.appendChild(box);

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-css-btn';
  copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>复制字体链接`;
  copyBtn.onclick = ()=>copyText(item.url||'','字体链接');
  footer.appendChild(copyBtn);
}

// ── Card modal ────────────────────────────────────────────────────────────
function renderCardModal(item){
  const body = document.getElementById('modal-body');
  body.className = 'modal-body modal-body-card';
  body.innerHTML = '';

  const hero = document.createElement('div');
  hero.className = 'modal-hero-section';
  hero.innerHTML = `
    <div class="card-modal-hero">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    </div>
    ${item.desc ? `<div class="card-modal-desc">${esc(item.desc)}</div>` : ''}
    ${(item.tags||[]).length ? `<div class="card-tags card-modal-tags">${item.tags.map(t=>`<span class="card-tag">${esc(t)}</span>`).join('')}</div>` : ''}
  `;
  body.appendChild(hero);

  if(item.itemCounts && Object.keys(item.itemCounts).length){
    const counts = document.createElement('div');
    counts.className = 'card-modal-counts';
    Object.entries(item.itemCounts).forEach(([k,v])=>{
      counts.innerHTML += `<div class="card-count-block"><b class="cmc-num">${v}</b><span class="cmc-label">${esc(k)}</span></div>`;
    });
    body.appendChild(counts);
  }

  const meta = document.createElement('div');
  meta.className = 'card-modal-meta';
  const rows = [
    ['作者', item.author||'匿名'],
    ['格式', (item.fileType||'json').toUpperCase()],
    ...(item.size ? [['大小', item.size]] : []),
    ['文件名', item.fileName||'—'],
  ];
  rows.forEach(([k,v])=>{
    meta.innerHTML += `<div class="cmm-row"><span>${k}</span><strong>${esc(String(v))}</strong></div>`;
  });
  body.appendChild(meta);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML = `
    <div class="modal-footer-row-btns">
      <button class="btn-action btn-secondary" id="btn-copy-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        复制链接
      </button>
      <button class="btn-action btn-primary card-dl-btn" id="btn-dl-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        下载字卡
      </button>
    </div>
  `;
  footer.querySelector('#btn-copy-link').onclick = ()=>copyText(item.file||'', '文件链接');
  footer.querySelector('#btn-dl-card').onclick = ()=>downloadFile(item);
}

// ── Theme modal ───────────────────────────────────────────────────────────
function renderThemeModal(item){
  const body = document.getElementById('modal-body');
  body.className = 'modal-body modal-body-theme';
  body.innerHTML = '';

  // Color palette bar
  if((item.colors||[]).length){
    const pal = document.createElement('div');
    pal.className = 'theme-modal-palette';
    item.colors.forEach(c=>{
      pal.innerHTML += `<div class="theme-modal-swatch" style="background:${esc(c)}"></div>`;
    });
    body.appendChild(pal);
  }

  // CSS code block
  const cssWrap = document.createElement('div');
  cssWrap.className = 'theme-css-wrap';
  cssWrap.innerHTML = `
    <div class="theme-css-label">CSS 代码</div>
    <pre class="theme-css-code">${esc(item.css||'')}</pre>
  `;
  body.appendChild(cssWrap);

  // Meta
  const meta = document.createElement('div');
  meta.className = 'card-modal-meta theme-modal-meta';
  const info = [
    ['作者', item.author||'匿名'],
    ...(item.tags && item.tags.length ? [['标签', item.tags.join(' · ')]] : []),
  ];
  info.forEach(([k,v])=>{
    meta.innerHTML += `<div class="cmm-row"><span>${k}</span><strong>${esc(String(v))}</strong></div>`;
  });
  body.appendChild(meta);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML = `
    <div class="modal-footer-row-btns">
      <button class="btn-action btn-primary theme-copy-btn" id="btn-copy-theme-css">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        复制 CSS 代码
      </button>
    </div>
  `;
  footer.querySelector('#btn-copy-theme-css').onclick = ()=>copyText(item.css||'', 'CSS 代码');
}

// ── Music modal ───────────────────────────────────────────────────────────
function renderMusicModal(item){
  const body = document.getElementById('modal-body');
  body.className = 'modal-body modal-body-music';
  body.innerHTML = '';

  const hero = document.createElement('div');
  hero.className = 'music-hero-section';
  hero.innerHTML = `
    <div class="music-modal-hero">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    </div>
    ${item.desc ? `<div class="music-modal-desc">${esc(item.desc)}</div>` : ''}
    ${(item.tags||[]).length ? `<div class="card-tags music-modal-tags">${item.tags.map(t=>`<span class="music-tag">${esc(t)}</span>`).join('')}</div>` : ''}
  `;
  body.appendChild(hero);

  const meta = document.createElement('div');
  meta.className = 'card-modal-meta music-modal-meta';
  const rows = [
    ['投稿者', item.author||'匿名'],
    ...(item.artist ? [['原唱', item.artist]] : []),
    ['格式', (item.fileType||'mp3').toUpperCase()],
    ...(item.duration ? [['时长', item.duration]] : []),
    ['文件名', item.fileName||item.name],
  ];
  rows.forEach(([k,v])=>{
    meta.innerHTML += `<div class="cmm-row"><span>${k}</span><strong>${esc(String(v))}</strong></div>`;
  });
  body.appendChild(meta);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML = `
    <div class="modal-footer-row-btns">
      <button class="btn-action btn-secondary" id="btn-copy-music-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        复制链接
      </button>
      <button class="btn-action btn-primary music-dl-btn" id="btn-dl-music">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        下载音乐
      </button>
    </div>
  `;
  footer.querySelector('#btn-copy-music-link').onclick = ()=>copyText(item.file||'', '文件链接');
  footer.querySelector('#btn-dl-music').onclick = ()=>downloadFile(item);
}

// ── Modal close ───────────────────────────────────────────────────────────
function closeModal(){
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  currentModalItem = null;
  setTimeout(()=>{ document.getElementById('dbs').textContent=''; }, 350);
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', function(e){ if(e.target===this) closeModal(); });
let touchStartY = 0;
document.getElementById('modal').addEventListener('touchstart', e=>{ touchStartY = e.touches[0].clientY; },{passive:true});
document.getElementById('modal').addEventListener('touchend', e=>{ if(e.changedTouches[0].clientY - touchStartY > 80) closeModal(); },{passive:true});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

// ── State setters ─────────────────────────────────────────────────────────
function setType(t){
  state.type = t;
  ['type-list','m-type-list'].forEach(id=>{
    const list = document.getElementById(id);
    if(!list) return;
    list.querySelectorAll('.type-pill').forEach(p=>p.classList.toggle('active', p.dataset.type===t));
  });
  renderCards();
}
function setAuthor(a){ state.author = a; renderAuthors(); renderCards(); }

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

document.getElementById('mobile-filter-btn').addEventListener('click', ()=>{
  document.getElementById('filter-drawer').classList.add('open');
});
document.getElementById('filter-drawer-bg').addEventListener('click', ()=>{
  document.getElementById('filter-drawer').classList.remove('open');
});

// ── Submit forms ──────────────────────────────────────────────────────────
const SUBMIT_EMAIL = 'xiaren45@qq.com';

window.switchForm = function(type){
  document.querySelectorAll('.form-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sv-type-card').forEach(b=>{
    b.classList.toggle('active', b.dataset.type === type);
  });
  document.getElementById('form-'+type).classList.add('active');
  ['bubble','font','card','theme','music'].forEach(t=>{
    const el=document.getElementById('fallback-'+t); if(el) el.classList.remove('show');
  });
};

function buildBubbleCode(name,author,css,demos,series,groupId){
  const prevStr = demos.filter(d=>d.v).map(d=>`    {t:'${d.t}',v:'${d.v.replace(/'/g,"\\'")}'}` ).join(',\n');
  const nextId = 'b'+(BUBBLES.length+1);
  const groupLine = groupId ? `\n  group:'${groupId}',\n  groupLabel:'${series||groupId}',` : (series?`\n  /* 系列：${series} */`:'');
  return `/* === 气泡投稿 === */\n{\n  id:'${nextId}',\n  type:'bubble',\n  name:'${name}',\n  author:'${author||'匿名'}',${groupLine}\n  previews:[\n${prevStr}\n  ],\n  css:\`${css}\`\n}`;
}
function buildFontCode(name,author,url){
  const nextId='f'+(FONTS.length+1), nextFamily='F'+(FONTS.length+1);
  return `/* === 字体投稿 === */\n/* 1. 在 @font-face 添加: */\n@font-face { font-family:'${nextFamily}'; src:url('${url}') format('truetype'); font-display:swap }\n\n/* 2. 在 FONTS 数组添加: */\n{\n  id:'${nextId}',\n  type:'font',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  family:'${nextFamily}',\n  url:'${url}'\n}`;
}
function buildCardCode(name,author,desc,fileUrl){
  const nextId='card'+(CARDS.length+1);
  const fileName=fileUrl.split('/').pop()||'file.json';
  return `/* === 字卡投稿 === */\n{\n  id:'${nextId}',\n  type:'card',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  desc:'${desc}',\n  fileType:'json',\n  fileName:'${fileName}',\n  file:'${fileUrl}'\n}`;
}
function buildThemeCode(name,author,desc,css,colors,tags){
  const nextId='th'+(THEMES.length+1);
  const colorsArr=colors.split(/[,\s]+/).filter(s=>s.startsWith('#'));
  return `/* === 主题投稿 === */\n{\n  id:'${nextId}',\n  type:'theme',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  desc:'${desc}',\n  tags:${JSON.stringify(tags.split(/[,，\s]+/).filter(Boolean))},\n  colors:${JSON.stringify(colorsArr)},\n  css:\`${css}\`\n}`;
}
function buildMusicCode(name,author,artist,fileUrl){
  const nextId='mus'+(MUSIC.length+1);
  const fileName=fileUrl.split('/').pop()||'song.mp3';
  const ext=(fileName.split('.').pop()||'mp3').toLowerCase();
  return `/* === 音乐投稿 === */\n{\n  id:'${nextId}',\n  type:'music',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  ${artist?`artist:'${artist}',\n  `:''}fileType:'${ext}',\n  fileName:'${fileName}',\n  file:'${fileUrl}'\n}`;
}

window.doSubmit = function(type){
  const nl='\n'; let subject='',body='',code='';

  if(type==='bubble'){
    const name=document.getElementById('bubble-name').value.trim();
    const author=document.getElementById('bubble-author').value.trim();
    const css=document.getElementById('bubble-css').value.trim();
    const series=document.getElementById('bubble-series').value.trim();
    const groupId=document.getElementById('bubble-group-id').value.trim().replace(/\s+/g,'');
    const demos=[1,2,3,4].map((n,i)=>({t:['sent','received','sent','received'][i],v:document.getElementById('p'+n).value.trim()}));
    if(!name||!css){toast('⚠️ 请填写名称和 CSS 代码');return;}
    code=buildBubbleCode(name,author,css,demos,series,groupId);
    subject=`【气泡投稿】${name} - ${author||'匿名'}${series?' ['+series+']':''}`;
    body=`投稿类型：聊天气泡${nl}名称：${name}${nl}作者：${author||'匿名'}${series?nl+'所属系列：'+series:''}${groupId?nl+'系列ID：'+groupId:''}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    document.getElementById('fb-content-bubble').value=`收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-bubble').classList.add('show');

  } else if(type==='font'){
    const name=document.getElementById('font-name').value.trim();
    const author=document.getElementById('font-author').value.trim();
    const url=document.getElementById('font-url').value.trim();
    if(!name||!url){toast('⚠️ 请填写名称和字体链接');return;}
    code=buildFontCode(name,author,url);
    subject=`【字体投稿】${name} - ${author||'匿名'}`;
    body=`投稿类型：字体${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    document.getElementById('fb-content-font').value=`收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-font').classList.add('show');

  } else if(type==='card'){
    const name=document.getElementById('card-name').value.trim();
    const author=document.getElementById('card-author').value.trim();
    const desc=document.getElementById('card-desc').value.trim();
    const fileUrl=document.getElementById('card-file-url').value.trim();
    if(!name||!fileUrl){toast('⚠️ 请填写字卡名称和文件链接');return;}
    code=buildCardCode(name,author,desc,fileUrl);
    subject=`【字卡投稿】${name} - ${author||'匿名'}`;
    body=`投稿类型：字卡${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}描述：${desc}${nl}文件链接：${fileUrl}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    document.getElementById('fb-content-card').value=`收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-card').classList.add('show');

  } else if(type==='theme'){
    const name=document.getElementById('theme-name').value.trim();
    const author=document.getElementById('theme-author').value.trim();
    const desc=document.getElementById('theme-desc').value.trim();
    const css=document.getElementById('theme-css').value.trim();
    const colors=document.getElementById('theme-colors').value.trim();
    const tags=document.getElementById('theme-tags').value.trim();
    if(!name||!css){toast('⚠️ 请填写主题名称和 CSS 代码');return;}
    code=buildThemeCode(name,author,desc,css,colors,tags);
    subject=`【主题投稿】${name} - ${author||'匿名'}`;
    body=`投稿类型：主题${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}描述：${desc}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    document.getElementById('fb-content-theme').value=`收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-theme').classList.add('show');

  } else if(type==='music'){
    const name=document.getElementById('music-name').value.trim();
    const author=document.getElementById('music-author').value.trim();
    const artist=document.getElementById('music-artist').value.trim();
    const fileUrl=document.getElementById('music-file-url').value.trim();
    if(!name||!fileUrl){toast('⚠️ 请填写歌曲名称和文件链接');return;}
    code=buildMusicCode(name,author,artist,fileUrl);
    subject=`【音乐投稿】${name} - ${author||'匿名'}`;
    body=`投稿类型：音乐${nl}名称：${name}${nl}投稿者：${author||'匿名'}${artist?nl+'原唱：'+artist:''}${nl}文件链接：${fileUrl}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    document.getElementById('fb-content-music').value=`收件人: ${SUBMIT_EMAIL}\n主题: ${subject}\n\n${body}`;
    document.getElementById('fallback-music').classList.add('show');

  }

  // Bug Fix: 使用 <a>.click() 触发 mailto，避免 iOS Safari 因 window.location.href 引发页面重载
  try {
    const _a = document.createElement('a');
    _a.href = `mailto:${SUBMIT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    _a.style.display = 'none';
    document.body.appendChild(_a);
    _a.click();
    document.body.removeChild(_a);
  } catch(e) { /* 忽略，用户可使用下方手动发送 */ }
  setTimeout(()=>toast('🚀 正在唤起邮件客户端，如未弹出请使用下方手动发送'),400);
};

window.copyFallback = function(type){ copyText(document.getElementById('fb-content-'+type).value, '投稿内容'); };
window.copyEmail    = function(type){ copyText(SUBMIT_EMAIL, '收件地址'); };

// ── Dark mode ─────────────────────────────────────────────────────────────
(function(){
  const root=document.documentElement;
  const btn=document.getElementById('theme-toggle');
  const sunIcon=document.getElementById('theme-icon-sun');
  const moonIcon=document.getElementById('theme-icon-moon');
  let dark=localStorage.getItem('theme')==='dark'||(!localStorage.getItem('theme')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  function applyTheme(){
    root.classList.toggle('dark',dark);
    sunIcon.style.display=dark?'':'none';
    moonIcon.style.display=dark?'none':'';
  }
  applyTheme();
  btn.addEventListener('click',()=>{ dark=!dark; localStorage.setItem('theme',dark?'dark':'light'); applyTheme(); });
})();

// ── Init ──────────────────────────────────────────────────────────────────

// Bug Fix: Cloudflare のメール難読化を回避し、正しいメールアドレスを表示する
['fb-email-b','fb-email-f','fb-email-card','fb-email-theme','fb-email-music'].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.textContent=SUBMIT_EMAIL;
});

updateFavCounts();
renderAuthors();
renderCards();
