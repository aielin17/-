const LS_FAV = 'sg_favorites';

/* 作品只从 Supabase 已通过列表加载 */
let ALL = [];
window.ALL = ALL;
window.BUBBLES = [];
window.FONTS = [];
window.CARDS = [];
window.THEMES = [];
window.MUSIC = [];

function galleryList() {
  return Array.isArray(window.ALL) ? window.ALL : ALL;
}

function galleryFonts() {
  return galleryList().filter((i) => i && i.type === 'font');
}

function galleryBubbles() {
  return galleryList().filter((i) => i && i.type === 'bubble');
}

function loadFavs() {
  try {
    return JSON.parse(localStorage.getItem(LS_FAV) || '[]');
  } catch (e) {
    return [];
  }
}

function saveFavs(arr) {
  try {
    localStorage.setItem(LS_FAV, JSON.stringify(arr));
  } catch (e) {}
}

let favorites = loadFavs();
const SG_WARNING_DEFS = [
  { id: 'character', label: '角色相关', hint: '名称或内容可能涉及作品角色 / IP' },
  { id: 'sensitive', label: '敏感内容', hint: '可能含擦边、血腥等需留意的内容' }
];
window.SG_WARNING_DEFS = SG_WARNING_DEFS;

let state = {
  type: 'all',
  author: 'all',
  warn: 'all',
  query: '',
  sort: 'default',
  page: 1,
  pageSize: 36
};
let currentModalItem = null;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function toast(msg, dur = 2800) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), dur);
}

function copyText(text, label) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => toast('✅ 已复制 ' + label));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      toast('✅ 已复制 ' + label);
    } catch (e) {
      toast('❌ 复制失败');
    }
    document.body.removeChild(ta);
  }
}

function safeFilenamePart(s) {
  const t = String(s || '').trim();
  if (!t) return 'file';
  return t
    .replace(/[\\\/:\*\?"<>\|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 90) || 'file';
}

function guessExt(item) {
  const ft = String(item.fileType || '').trim().toLowerCase();
  if (ft) return ft;
  const raw = String(item.fileName || '').trim();
  const m1 = raw.match(/\.([a-z0-9]{1,8})$/i);
  if (m1) return m1[1].toLowerCase();
  const url = String(item.file || '').trim();
  const m2 = url.match(/\.([a-z0-9]{1,8})(?:\?|#|$)/i);
  return m2 ? m2[1].toLowerCase() : 'bin';
}

function getNiceDownloadName(item) {
  const ext = guessExt(item);
  const base = safeFilenamePart(item.name || item.id);
  const low = base.toLowerCase();
  const dotExt = '.' + String(ext || '').toLowerCase();
  if (dotExt !== '.' && low.endsWith(dotExt)) return base;
  return `${base}.${ext}`;
}

function downloadFile(item) {
  const fileName = getNiceDownloadName(item);
  toast('📥 正在下载…');
  fetch(item.file)
    .then(res => {
      if (!res.ok) throw new Error('网络错误 ' + res.status);
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      toast('✅ 下载成功：' + fileName);
    })
    .catch(() => {
      toast('⚠️ 正在跳转下载链接…');
      window.open(item.file, '_blank');
    });
}

function isFav(id) {
  return favorites.includes(id);
}

async function toggleFav(id) {
  const item = galleryList().find((i) => i.id === id);
  const turningOn = !isFav(id);

  if (turningOn) {
    favorites.push(id);
  } else {
    favorites = favorites.filter((f) => f !== id);
  }
  saveFavs(favorites);

  updateFavCounts();
  document.querySelectorAll('#card-grid .item-card').forEach((c) => {
    if (c.dataset.id === id) c.classList.toggle('favorited', isFav(id));
  });
  const mb = document.getElementById('modal-fav-btn');
  if (currentModalItem && currentModalItem.id === id && mb) {
    mb.classList.toggle('on', isFav(id));
    mb.title = isFav(id) ? '取消收藏' : '收藏';
    const svg = mb.querySelector('svg');
    if (svg) svg.setAttribute('fill', isFav(id) ? 'currentColor' : 'none');
  }
  if (state.type === 'fav') renderCards();

  if (window.SG && SG.isConfigured && SG.isConfigured() && item && item.remoteId) {
    if (!SG.getUser()) {
      toast('已本地收藏；登录后可同步到云端');
      return;
    }
    const { error } = turningOn ? await SG.likeItem(item.remoteId) : await SG.unlikeItem(item.remoteId);
    if (error) toast('云端同步失败：' + error);
  }
}

window.SG_mergeRemoteFavs = function (remoteIds) {
  const localOnly = favorites.filter((id) => !String(id).startsWith('remote-'));
  favorites = [...new Set([...localOnly, ...(remoteIds || [])])];
  saveFavs(favorites);
  updateFavCounts();
  if (typeof renderCards === 'function') renderCards();
};

function updateFavCounts() {
  const n = favorites.filter(id => galleryList().some(i => i.id === id)).length;
  ['c-fav', 'mc-fav'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = n;
  });
}

function getFiltered() {
  const q = state.query.toLowerCase();
  let list = galleryList().filter(item => {
    if (window.SG && SG.isAuthorBlocked && SG.isAuthorBlocked(item)) return false;
    if (state.type === 'fav' && !isFav(item.id)) return false;
    if (state.type !== 'all' && state.type !== 'fav' && item.type !== state.type) return false;
    if (state.warn && state.warn !== 'all') {
      const warns = Array.isArray(item.warnings) ? item.warnings.filter((w) => w !== 'pair') : [];
      if (state.warn === 'none') {
        if (warns.length) return false;
      } else if (state.warn === 'any') {
        if (!warns.length) return false;
      } else if (!warns.includes(state.warn)) {
        return false;
      }
    }
    if (state.author !== 'all' && item.author !== state.author) return false;
    if (q && !item.name.toLowerCase().includes(q) &&
      !(item.author || '').toLowerCase().includes(q) &&
      !(item.desc || '').toLowerCase().includes(q)) return false;
    return true;
  });

  const typeRank = { bubble: 0, font: 1, card: 2, theme: 3, music: 4 };
  const byId = (a, b) => String(b.id).localeCompare(String(a.id));
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;

  if (state.sort === 'weekly') {
    list = list
      .filter((item) => (item.createdAt || 0) >= weekAgo)
      .slice()
      .sort((a, b) => {
        const likeDiff = (b.likeCount || 0) - (a.likeCount || 0);
        if (likeDiff) return likeDiff;
        return (b.createdAt || 0) - (a.createdAt || 0) || byId(a, b);
      });
  } else if (state.sort === 'hot') {
    list = list.slice().sort((a, b) => {
      const likeDiff = (b.likeCount || 0) - (a.likeCount || 0);
      if (likeDiff) return likeDiff;
      return (b.createdAt || 0) - (a.createdAt || 0) || byId(a, b);
    });
  } else if (state.sort === 'newest') {
    list = list.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0) || byId(a, b));
  } else {
    // 默认：类型分区 + 同类型内按时间新到旧（稳定）
    list = list.slice().sort((a, b) => {
      const ta = typeRank[a.type] ?? 9;
      const tb = typeRank[b.type] ?? 9;
      if (ta !== tb) return ta - tb;
      return (b.createdAt || 0) - (a.createdAt || 0) || byId(a, b);
    });
  }
  return list;
}

function countFor(type) {
  return galleryList().filter(item => {
    if (type === 'fav' && !isFav(item.id)) return false;
    if (type !== 'all' && type !== 'fav' && item.type !== type) return false;
    if (state.author !== 'all' && item.author !== state.author) return false;
    const q = state.query.toLowerCase();
    if (q && !item.name.toLowerCase().includes(q) && !(item.author || '').toLowerCase().includes(q)) return false;
    return true;
  }).length;
}

function renderCounts() {
  ['all', 'bubble', 'font', 'card', 'theme', 'music', 'fav'].forEach(t => {
    const n = countFor(t);
    ['c-' + t, 'mc-' + t].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = n;
    });
  });
}

function getBadgeHTML(item) {
  const map = {
    bubble: '<span class="card-badge badge-bubble">气泡</span>',
    font: '<span class="card-badge badge-font">字体</span>',
    card: '<span class="card-badge badge-card">字卡</span>',
    theme: '<span class="card-badge badge-theme">主题</span>',
    music: '<span class="card-badge badge-music">音乐</span>',
  };
  return map[item.type] || '';
}

function getWarningLabels(item) {
  const warns = Array.isArray(item.warnings) ? item.warnings.filter((w) => w !== 'pair') : [];
  return warns.map((id) => {
    const def = SG_WARNING_DEFS.find((w) => w.id === id);
    return def ? def.label : id;
  });
}

function itemHasWarning(item) {
  return getWarningLabels(item).length > 0;
}

function getWarningBadgesHTML(item) {
  const labels = getWarningLabels(item);
  if (!labels.length) return '';
  const chips = labels.map((label) => '<span class="card-warn">' + esc(label) + '</span>').join('');
  return '<div class="card-warn-row">' + chips + '</div>';
}

function applyWarningSpoiler(card, itemOrItems) {
  const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
  const labels = [...new Set(items.flatMap((it) => getWarningLabels(it)))];
  if (!labels.length || !card) return;

  card.classList.add('has-warn-spoiler');
  card.classList.remove('warn-revealed');
  card.setAttribute('data-warn-hidden', '1');

  let cover = card.querySelector('.card-warn-cover');
  if (!cover) {
    cover = document.createElement('button');
    cover.type = 'button';
    cover.className = 'card-warn-cover';
    card.appendChild(cover);
  }
  const tagText = labels.join(' · ');
  cover.setAttribute('aria-label', '内容预警：' + tagText + '。点击显示完整卡片');
  cover.innerHTML =
    '<span class="card-warn-cover-kicker">内容预警</span>' +
    '<span class="card-warn-cover-tags">' +
    labels.map((l) => esc(l)).join(' · ') +
    '</span>' +
    '<span class="card-warn-cover-hint">点击显示完整卡片</span>';

  cover.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    card.classList.add('warn-revealed');
    card.removeAttribute('data-warn-hidden');
  };
}

function readWarningChecks(root) {
  if (!root) return [];
  return [...root.querySelectorAll('input[data-warn-id]:checked')].map((el) => el.dataset.warnId);
}

function warningFieldsHTML(prefix) {
  const checks = SG_WARNING_DEFS.map((w) =>
    '<label class="warn-check"><input type="checkbox" data-warn-id="' + w.id + '"><span><b>' + w.label + '</b><small>' + w.hint + '</small></span></label>'
  ).join('');
  return '<div class="warn-box" id="warn-box-' + prefix + '"><div class="warn-box-title">内容预警</div><div class="warn-box-hint">若存在角色姓名/敏感信息请勾选。</div><div class="warn-checks">' + checks + '</div></div>';
}

function mountWarningFields() {
  ['bubble', 'font', 'card', 'theme', 'music'].forEach((type) => {
    const panel = document.getElementById('form-' + type);
    if (!panel || panel.querySelector('.warn-box')) return;
    const btn = panel.querySelector('.sv-submit-btn');
    if (!btn) return;
    btn.insertAdjacentHTML('beforebegin', warningFieldsHTML(type));
  });
}

async function renderCards() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';
  const filtered = getFiltered();
  renderCounts();

  const info = document.getElementById('toolbar-info');
  if (info) info.textContent = filtered.length + ' 个结果';

  const total = filtered.length;
  const pageSize = clamp(parseInt(state.pageSize, 10) || 36, 6, 240);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  state.page = clamp(parseInt(state.page, 10) || 1, 1, totalPages);
  const start = (state.page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const pagerText = document.getElementById('pager-text');
  const prevBtn = document.getElementById('pager-prev');
  const nextBtn = document.getElementById('pager-next');
  if (pagerText) pagerText.textContent = `第 ${state.page} / ${totalPages} 页`;
  if (prevBtn) prevBtn.disabled = state.page <= 1;
  if (nextBtn) nextBtn.disabled = state.page >= totalPages;

  if (!pageItems.length) {
    grid.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <p>${state.type==='fav' ? '还没有收藏，点击 ♡ 收藏喜欢的样式' : '没有找到匹配的内容'}</p>
    </div>`;
    return;
  }

  const detailItems = [];
  const seenGroups = new Set();
  pageItems.forEach((item) => {
    if (item.group) {
      if (seenGroups.has(item.group)) return;
      seenGroups.add(item.group);
      filtered.filter((i) => i.group === item.group).forEach((v) => detailItems.push(v));
      return;
    }
    detailItems.push(item);
  });
  if (window.SG && typeof SG.ensureGalleryDetails === 'function') {
    try {
      const expanded = await SG.ensureGalleryDetails(detailItems);
      if (expanded) {
        await renderCards();
        return;
      }
    } catch (e) {
      console.warn('[SG] ensureGalleryDetails', e);
    }
  }

  const renderedGroups = new Set();
  let idx = 0;
  pageItems.forEach(item => {
    if (item.group) {
      if (renderedGroups.has(item.group)) return;
      renderedGroups.add(item.group);
      const variants = filtered.filter(i => i.group === item.group);
      const card = item.type === 'music' ? makeMusicGroupCard(variants, idx++) : makeGroupCard(variants, idx++);
      grid.appendChild(card);
      return;
    }
    const card = makeItemCard(item, idx++);
    grid.appendChild(card);
  });
}

function mountBubbleShadowPreview(host, css, previews) {
  if (!host) return;
  if (host.shadowRoot) {
    while (host.shadowRoot.firstChild) host.shadowRoot.removeChild(host.shadowRoot.firstChild);
  }
  const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' });
  const previewMsgs =
    previews && previews.length
      ? previews.slice(0, 2)
      : [
          { t: 'sent', v: '发送消息示例' },
          { t: 'received', v: '接收消息示例' }
        ];
  const msgsHtml = previewMsgs
    .map(
      (p) =>
        `<div class="msg-row ${p.t}"><div class="message message-${p.t}">${esc(p.v)}</div></div>`
    )
    .join('');
  shadow.innerHTML = `
      <style>
        :host{display:flex;flex-direction:column;justify-content:center;gap:8px;padding:12px 14px;min-height:100%;box-sizing:border-box;}
        .msg-row{display:flex;width:100%}
        .msg-row.sent{justify-content:flex-end}
        .msg-row.received{justify-content:flex-start}
        .message{max-width:84%;font-size:12px;padding:6px 12px;border-radius:14px;line-height:1.4;word-break:break-word;position:relative;overflow:visible;}
        .message-sent{background:#111;color:#fff;border-radius:14px 14px 3px 14px;}
        .message-received{background:#fff;color:#111;border-radius:14px 14px 14px 3px;border:1px solid #ddd;}
        ${css || ''}
      </style>
      ${msgsHtml}
    `;
}
window.mountBubbleShadowPreview = mountBubbleShadowPreview;

function makeItemCard(item, idx) {
  const card = document.createElement('div');
  card.className = 'item-card' + (isFav(item.id) ? ' favorited' : '');
  if (item.type) card.classList.add('card-type-' + item.type);
  card.dataset.id = item.id;
  card.dataset.type = item.type || '';
  card.style.animationDelay = Math.min(idx * 20, 200) + 'ms';

  const stage = item.type === 'bubble'
    ? '<div class="card-preview bubble-card-shadow-host"></div>'
    : getCardStage(item);

  card.innerHTML = `
    <div class="card-stage">${stage}</div>
    <div class="card-meta">
      <div class="card-top">
        <span class="card-name">${esc(item.name)}</span>
        ${getBadgeHTML(item)}
      </div>
      <div class="card-foot">
        <div class="card-author">${authorButtonHTML(item)}</div>
        ${getWarningBadgesHTML(item)}
      </div>
    </div>
  `;
  bindAuthorLink(card);

  if (item.type === 'bubble') {
    const host = card.querySelector('.bubble-card-shadow-host');
    mountBubbleShadowPreview(host, item.css, item.previews);
  }

  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-profile-id], [data-author-name]')) return;
    if (e.target.closest('.card-warn-cover')) return;
    if (card.classList.contains('has-warn-spoiler') && !card.classList.contains('warn-revealed')) {
      card.classList.add('warn-revealed');
      card.removeAttribute('data-warn-hidden');
      return;
    }
    openModal(item);
  });
  applyWarningSpoiler(card, item);
  return card;
}

function makeGroupCard(variants, idx) {
  if (variants[0].type === 'music') return makeMusicGroupCard(variants, idx);
  const first = variants[0];
  const card = document.createElement('div');
  card.className = 'item-card' + (isFav(first.id) ? ' favorited' : '');
  if (first.type) card.classList.add('card-type-' + first.type);
  card.dataset.id = first.id;
  card.dataset.type = first.type || '';
  card.style.animationDelay = Math.min(idx * 20, 200) + 'ms';

  let activeItem = first;

  function rebuild() {
    card.innerHTML = `
      <div class="card-stage">${getCardStage(activeItem)}</div>
      <div class="card-meta">
        <div class="card-top">
          <span class="card-name">${esc(first.groupLabel || first.name)}</span>
          ${getBadgeHTML(first)}
        </div>
        <div class="card-foot">
          <div class="card-author">${authorButtonHTML(first)}</div>
          ${getWarningBadgesHTML(activeItem)}
        </div>
        <div class="card-variants">
          ${variants.map(v=>`<div class="card-var-btn${v.id===activeItem.id?' active':''}" data-id="${v.id}">${esc(v.name)}</div>`).join('')}
        </div>
      </div>
    `;
    bindAuthorLink(card);
    card.querySelectorAll('.card-var-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        activeItem = variants.find(v => v.id === btn.dataset.id) || activeItem;
        card.dataset.id = activeItem.id;
        card.classList.toggle('favorited', isFav(activeItem.id));
        rebuild();
      });
    });
    card.onclick = (e) => {
      if (e.target.classList.contains('card-var-btn')) return;
      if (e.target.closest('[data-profile-id], [data-author-name]')) return;
      if (e.target.closest('.card-warn-cover')) return;
      if (card.classList.contains('has-warn-spoiler') && !card.classList.contains('warn-revealed')) {
        card.classList.add('warn-revealed');
        card.removeAttribute('data-warn-hidden');
        return;
      }
      openModal(activeItem);
    };
    applyWarningSpoiler(card, variants);
  }
  rebuild();
  return card;
}

function makeMusicGroupCard(variants, idx) {
  const first = variants[0];
  const card = document.createElement('div');
  card.className = 'item-card card-type-music';
  card.dataset.id = first.id;
  card.dataset.type = 'music';
  card.style.animationDelay = Math.min(idx * 20, 200) + 'ms';

  const trackRows = variants.slice(0, 3).map((v, i) =>
    '<div class="music-pl-row">' +
    '<span class="music-pl-num">' + String(i + 1).padStart(2, '0') + '</span>' +
    '<span class="music-pl-name">' + esc(v.name) + '</span>' +
    (v.duration ? '<span class="music-pl-dur">' + esc(v.duration) + '</span>' : '') +
    '</div>'
  ).join('');
  const more = variants.length > 3
    ? '<div class="music-pl-more">另有 ' + (variants.length - 3) + ' 首</div>'
    : '';

  card.innerHTML =
    '<div class="card-stage">' +
    '<div class="music-stage-panel album">' +
    '<div class="music-ico" aria-hidden="true"><span class="music-ico-disc"></span><span class="music-ico-ring"></span><span class="music-ico-hole"></span></div>' +
    '<div class="music-stage-side">' +
    '<div class="music-stage-kicker">合辑 · ' + variants.length + ' 首</div>' +
    '<div class="music-pl-list">' + trackRows + more + '</div>' +
    '</div></div></div>' +
    '<div class="card-meta">' +
    '<div class="card-top">' +
    '<span class="card-name">' + esc(first.groupLabel || first.name) + '</span>' +
    '<span class="card-badge badge-music">音乐</span>' +
    '</div>' +
    '<div class="card-foot"><div class="card-author">' + authorButtonHTML(first) + '</div></div>' +
    '</div>';

  bindAuthorLink(card);
  card.onclick = (e) => {
    if (e.target.closest('[data-profile-id], [data-author-name]')) return;
    if (e.target.closest('.card-warn-cover')) return;
    if (card.classList.contains('has-warn-spoiler') && !card.classList.contains('warn-revealed')) {
      card.classList.add('warn-revealed');
      card.removeAttribute('data-warn-hidden');
      return;
    }
    openMusicGroupModal(variants);
  };
  applyWarningSpoiler(card, variants);
  return card;
}

function openMusicGroupModal(variants) {
  const first = variants[0];
  currentModalItem = first;
  const modalEl = document.getElementById('modal');
  if (modalEl) modalEl.setAttribute('data-type', 'music');
  document.getElementById('modal-name').textContent = first.groupLabel || first.name;
  document.getElementById('modal-badge').innerHTML = getBadgeHTML(first);
  const modalSub = document.getElementById('modal-sub');
  if (modalSub) modalSub.textContent = '音乐 / ' + (first.author || '匿名') + ' / ' + variants.length + ' 首';
  const mb = document.getElementById('modal-fav-btn');
  mb.classList.toggle('on', isFav(first.id));
  mb.title = isFav(first.id) ? '取消收藏' : '收藏';
  mb.onclick = () => toggleFav(first.id);
  renderMusicGroupModal(variants);
  finishModalExtras(first);
  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderMusicGroupModal(variants) {
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');
  body.className = 'modal-body modal-body-music';
  body.innerHTML = '';
  footer.innerHTML = '';

  const first = variants[0];
  const hdr = document.createElement('div');
  hdr.className = 'music-modal-stage';
  hdr.innerHTML =
    '<div class="music-ico" aria-hidden="true"><span class="music-ico-disc"></span><span class="music-ico-ring"></span><span class="music-ico-hole"></span></div>' +
    '<div class="music-modal-copy">' +
    '<p class="music-modal-kicker">合辑 · ' + variants.length + ' 首</p>' +
    '<p class="music-modal-sub">' + authorButtonHTML(first, 'card-author-link inline') + '</p>' +
    '</div>';
  body.appendChild(hdr);
  bindAuthorLink(hdr);

  const list = document.createElement('div');
  list.className = 'music-tracklist';
  variants.forEach((track, i) => {
    const row = document.createElement('div');
    row.className = 'music-track-item';
    row.innerHTML =
      '<div class="track-num">' + String(i + 1).padStart(2, '0') + '</div>' +
      '<div class="track-info">' +
      '<div class="track-name">' + esc(track.name) + '</div>' +
      (track.artist ? '<div class="track-sub">' + esc(track.artist) + '</div>' : '') +
      '</div>' +
      '<div class="track-btns">' +
      '<button type="button" class="track-link-btn" title="复制链接" aria-label="复制链接">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' +
      '</button>' +
      '<button type="button" class="track-dl-btn" title="下载" aria-label="下载">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
      '</button></div>';
    row.querySelector('.track-link-btn').onclick = (e) => {
      e.stopPropagation();
      copyText(track.file || '', track.name + ' 链接');
    };
    row.querySelector('.track-dl-btn').onclick = (e) => {
      e.stopPropagation();
      downloadFile(track);
    };
    list.appendChild(row);
  });
  body.appendChild(list);
}

function renderMusicModal(item) {
  const body = document.getElementById('modal-body');
  body.className = 'modal-body modal-body-music';
  body.innerHTML = '';

  const tags = Array.isArray(item.tags) ? item.tags.filter(Boolean) : [];
  const desc = (item.desc || '').trim();
  const artist = (item.artist || '').trim();
  const dur = (item.duration || '').trim();

  const hero = document.createElement('div');
  hero.className = 'music-modal-stage';
  hero.innerHTML =
    '<div class="music-ico" aria-hidden="true"><span class="music-ico-disc"></span><span class="music-ico-ring"></span><span class="music-ico-hole"></span></div>' +
    '<div class="music-modal-copy">' +
    '<p class="music-modal-kicker">单曲' + (dur ? ' · ' + esc(dur) : '') + '</p>' +
    (artist ? '<p class="music-modal-artist">' + esc(artist) + '</p>' : '') +
    (desc ? '<p class="music-modal-desc">' + esc(desc) + '</p>' : '') +
    (tags.length
      ? '<div class="music-modal-tags">' + tags.map((t) => '<span class="music-tag">' + esc(t) + '</span>').join('') + '</div>'
      : '') +
    '</div>';
  body.appendChild(hero);

  const meta = document.createElement('div');
  meta.className = 'music-modal-facts';
  meta.innerHTML =
    '<div class="music-fact"><span>投稿</span><strong>' + authorButtonHTML(item, 'card-author-link inline') + '</strong></div>' +
    (dur ? '<div class="music-fact"><span>时长</span><strong>' + esc(dur) + '</strong></div>' : '') +
    (artist ? '<div class="music-fact"><span>原唱</span><strong>' + esc(artist) + '</strong></div>' : '');
  body.appendChild(meta);
  bindAuthorLink(meta);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML =
    '<div class="modal-footer-row-btns">' +
    '<button type="button" class="btn-action btn-secondary" id="btn-copy-music-link">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' +
    '<span>复制链接</span></button>' +
    '<button type="button" class="btn-action btn-primary music-dl-btn" id="btn-dl-music">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
    '<span>下载音乐</span></button></div>';
  footer.querySelector('#btn-copy-music-link').onclick = () => copyText(item.file || '', '文件链接');
  footer.querySelector('#btn-dl-music').onclick = () => downloadFile(item);
}

function getCardStage(item) {
  if (item.type === 'bubble') {
    const msgs = (item.previews || []).slice(0, 2).map(p => `
      <div class="bubble-row ${p.t}">
        <div class="bubble-msg ${p.t}">${esc(p.v)}</div>
      </div>`).join('');
    return `<div class="card-preview">${msgs || '<div class="card-stage-empty">气泡预览</div>'}</div>`;
  }
  if (item.type === 'font') {
    return `
      <div class="font-sample" style="font-family:'${esc(item.family)}',sans-serif">
        春江花月夜
      </div>
      <span class="font-sample-en" style="font-family:'${esc(item.family)}',sans-serif">Aa Bb 123</span>`;
  }
  if (item.type === 'card') {
    const tags = Array.isArray(item.tags) ? item.tags.filter(Boolean).slice(0, 3) : [];
    const counts = item.itemCounts && typeof item.itemCounts === 'object'
      ? Object.entries(item.itemCounts).slice(0, 3)
      : [];
    const chips = counts.length
      ? counts.map(([k, v]) => '<span class="card-mini-chip"><b>' + esc(String(v)) + '</b>' + esc(k) + '</span>').join('')
      : tags.map((t) => '<span class="card-mini-chip">' + esc(t) + '</span>').join('');
    return (
      '<div class="card-stage-pack">' +
      '<div class="card-ico mini" aria-hidden="true">' +
      '<span class="card-ico-sheet s1"></span>' +
      '<span class="card-ico-sheet s2"></span>' +
      '<span class="card-ico-sheet s3"></span>' +
      '<span class="card-ico-lines"><i></i><i></i><i></i></span>' +
      '</div>' +
      '<div class="card-stage-pack-body">' +
      (chips || '<span class="card-stage-pack-fallback">字卡预设</span>') +
      '</div></div>'
    );
  }
  if (item.type === 'theme') {
    const colors = (item.colors || []).slice(0, 5);
    const swatches = (colors.length ? colors : ['#111', '#555', '#999', '#ddd', '#f5f5f5']).map(c =>
      `<div class="theme-swatch" style="background:${esc(c)}"></div>`).join('');
    return `<div class="theme-swatches theme-swatches-stage">${swatches}</div>`;
  }
  if (item.type === 'music') {
    const artist = (item.artist || '').trim();
    const dur = (item.duration || '').trim();
    return (
      '<div class="music-stage-panel single">' +
      '<div class="music-ico" aria-hidden="true"><span class="music-ico-disc"></span><span class="music-ico-ring"></span><span class="music-ico-hole"></span></div>' +
      '<div class="music-stage-side">' +
      '<div class="music-stage-kicker">单曲</div>' +
      (artist ? '<div class="music-stage-artist">' + esc(artist) + '</div>' : '<div class="music-stage-artist muted">未知原唱</div>') +
      (dur ? '<div class="music-stage-dur">' + esc(dur) + '</div>' : '') +
      '</div></div>'
    );
  }
  return getCardBody(item);
}

function getCardBody(item) {
  if (item.type === 'bubble') {
    const msgs = (item.previews || []).slice(0, 2).map(p => `
      <div class="bubble-row ${p.t}">
        <div class="bubble-msg ${p.t}">${esc(p.v)}</div>
      </div>`).join('');
    return `<div class="card-preview">${msgs}</div>`;
  }
  if (item.type === 'font') {
    return `
      <div class="font-sample" style="font-family:'${esc(item.family)}',sans-serif">
        春江花月夜 Aa
      </div>
      <span class="font-category">${esc(item.category||'')}</span>`;
  }
  if (item.type === 'card') {
    const desc = item.desc ? `<div class="card-desc">${esc(item.desc.slice(0,52)+(item.desc.length>52?'…':''))}</div>` : '';
    const counts = item.itemCounts ? `<div class="card-counts">${Object.entries(item.itemCounts).slice(0,3).map(([k,v])=>`<div class="card-count-item"><b>${v}</b> ${esc(k)}</div>`).join('')}</div>` : '';
    return desc + counts;
  }
  if (item.type === 'theme') {
    const swatches = (item.colors || []).slice(0, 5).map(c => `<div class="theme-swatch" style="background:${esc(c)}"></div>`).join('');
    const desc = item.desc ? `<div class="card-desc">${esc(item.desc.slice(0,52)+(item.desc.length>52?'…':''))}</div>` : '';
    const tags = (item.tags || []).slice(0, 3).map(t => `<span class="theme-tag">${esc(t)}</span>`).join('');
    return `${desc}<div class="theme-swatches">${swatches}</div>${tags?`<div class="card-tags">${tags}</div>`:''}`;
  }
  if (item.type === 'music') {
    const desc = item.desc ? `<div class="card-desc">${esc(item.desc.slice(0,52)+(item.desc.length>52?'…':''))}</div>` : '';
    const artist = item.artist ? `<div class="music-meta-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>${esc(item.artist)}</div>` : '';
    const tags = (item.tags || []).slice(0, 3).map(t => `<span class="music-tag">${esc(t)}</span>`).join('');
    return `${desc}${artist}${tags?`<div class="card-tags">${tags}</div>`:''}`;
  }
  return '';
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function authorButtonHTML(item, className) {
  const name = item && item.author ? item.author : '匿名';
  const cls = className || 'card-author-link';
  // 按展示署名打开：站长代发/导入的作品若绑 submitterId，不应一律跳到上传者主页
  return (
    '<button type="button" class="' +
    cls +
    '" data-author-name="' +
    esc(name) +
    '" title="查看该署名作品">' +
    esc(name) +
    '</button>'
  );
}

function bindAuthorLink(root) {
  if (!root) return;
  root.querySelectorAll('[data-profile-id], [data-author-name]').forEach((btn) => {
    if (btn.dataset.boundAuthor === '1') return;
    btn.dataset.boundAuthor = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!window.SG || typeof SG.openProfile !== 'function') return;
      if (btn.dataset.authorName) SG.openProfile({ authorName: btn.dataset.authorName });
      else if (btn.dataset.profileId) SG.openProfile({ userId: btn.dataset.profileId });
    });
  });
}

function finishModalExtras(item) {
  const body = document.getElementById('modal-body');
  if (!body) return;
  if (window.SG && typeof SG.mountStaffPanel === 'function') {
    SG.mountStaffPanel(body, item || currentModalItem);
  }
  if (window.SG && typeof SG.mountComments === 'function') {
    SG.mountComments(body, item || currentModalItem);
  }
}

async function openModal(item) {
  if (window.SG && typeof SG.ensureGalleryDetails === 'function' && item) {
    try {
      await SG.ensureGalleryDetails([item], { eager: true });
      let fresh = (window.ALL || []).find((it) => it && it.id === item.id);
      if (!fresh && item.remoteId) {
        fresh = (window.ALL || []).find(
          (it) => it && String(it.remoteId) === String(item.remoteId)
        );
      }
      if (fresh) item = fresh;
    } catch (e) {
      console.warn('[SG] modal details', e);
    }
  }
  currentModalItem = item;
  window.currentModalItem = item;
  const modalEl = document.getElementById('modal');
  if (modalEl) modalEl.setAttribute('data-type', item.type || '');
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-badge').innerHTML = getBadgeHTML(item);
  const modalSub = document.getElementById('modal-sub');
  if (modalSub) {
    const typeLabel = ({ bubble: '气泡', font: '字体', card: '字卡', theme: '主题', music: '音乐' })[item.type] || '';
    modalSub.textContent = [typeLabel, item.author || '匿名'].filter(Boolean).join(' / ');
  }
  const mb = document.getElementById('modal-fav-btn');
  mb.classList.toggle('on', isFav(item.id));
  mb.title = isFav(item.id) ? '取消收藏' : '收藏';
  mb.onclick = () => toggleFav(item.id);
  const blockBtn = document.getElementById('modal-block-btn');
  if (blockBtn) {
    const blocked = !!(window.SG && SG.isAuthorBlocked && SG.isAuthorBlocked(item));
    blockBtn.title = blocked ? '取消拉黑' : '拉黑作者';
    blockBtn.hidden = !item.submitterId;
    const blockOpt = document.querySelector('#modal-more-menu [data-proxy="modal-block-btn"]');
    if (blockOpt) {
      blockOpt.hidden = !item.submitterId;
      blockOpt.textContent = blocked ? '取消拉黑' : '拉黑作者';
    }
  }
  const reportBtn = document.getElementById('modal-report-btn');
  if (reportBtn) {
    reportBtn.hidden = !item.remoteId;
    const reportOpt = document.querySelector('#modal-more-menu [data-proxy="modal-report-btn"]');
    if (reportOpt) reportOpt.hidden = !item.remoteId;
  }
  const unpubBtn = document.getElementById('modal-unpublish-btn');
  if (unpubBtn) {
    const canManage = !!(item.remoteId && window.SG && SG.isStaff && SG.isStaff());
    unpubBtn.hidden = !canManage;
    const unpubOpt = document.querySelector('#modal-more-menu [data-proxy="modal-unpublish-btn"]');
    if (unpubOpt) unpubOpt.hidden = !canManage;
  }

  if (item.type === 'bubble') renderBubbleModal(item);
  else if (item.type === 'font') renderFontModal(item);
  else if (item.type === 'card') renderCardModal(item);
  else if (item.type === 'theme') renderThemeModal(item);
  else if (item.type === 'music') renderMusicModal(item);

  if (item.type !== 'bubble') finishModalExtras(item);

  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openModal = openModal;

function renderBubbleModal(item) {
  const body = document.getElementById('modal-body');
  const footer = document.getElementById('modal-footer');
  const favBtn = document.getElementById('modal-fav-btn');
  body.className = 'modal-body modal-body-bubble';
  body.innerHTML = '';
  footer.innerHTML = '';

  const stage = document.createElement('div');
  stage.className = 'modal-preview-stage';
  body.appendChild(stage);

  const tools = document.createElement('div');
  tools.className = 'modal-tools';
  tools.hidden = true;
  body.appendChild(tools);

  function renderPreviews(previewItem) {
    stage.innerHTML = '';
    document.getElementById('dbs').textContent = previewItem.css || '';
    currentModalItem = previewItem;
    window.currentModalItem = previewItem;
    document.getElementById('modal-name').textContent = previewItem.name;
    const modalSub = document.getElementById('modal-sub');
    if (modalSub) {
      modalSub.textContent = ['气泡', previewItem.author || '匿名'].filter(Boolean).join(' / ');
    }
    const favOn2 = isFav(previewItem.id);
    favBtn.classList.toggle('on', favOn2);
    favBtn.title = favOn2 ? '取消收藏' : '收藏';
    favBtn.querySelector('svg').setAttribute('fill', favOn2 ? 'currentColor' : 'none');
    favBtn.onclick = () => toggleFav(previewItem.id);

    const msgsWrap = document.createElement('div');
    msgsWrap.className = 'bubble-modal-msgs';
    (previewItem.previews || [{ t: 'sent', v: '你好' }, { t: 'received', v: '你好呀' }]).forEach((msg) => {
      const row = document.createElement('div');
      row.className = 'msg-row ' + msg.t;
      const bub = document.createElement('div');
      bub.className = 'message message-' + msg.t;
      bub.textContent = msg.v;
      row.appendChild(bub);
      msgsWrap.appendChild(row);
    });
    stage.appendChild(msgsWrap);
    finishModalExtras(previewItem);
  }

  renderPreviews(item);

  if (item.group) {
    const siblings = galleryBubbles().filter((b) => b.group === item.group);
    if (siblings.length > 1) {
      tools.hidden = false;
      const varSection = document.createElement('div');
      varSection.className = 'variant-section';
      varSection.innerHTML =
        '<div class="modal-sec-label">同系列变体 <span class="variant-tag">' +
        esc(item.groupLabel || item.group) +
        '</span></div>';
      const varRow = document.createElement('div');
      varRow.className = 'variant-row';
      siblings.forEach((sib) => {
        const vBtn = document.createElement('button');
        vBtn.type = 'button';
        vBtn.className = 'variant-btn' + (sib.id === item.id ? ' active' : '');
        vBtn.textContent = sib.name;
        vBtn.dataset.varId = sib.id;
        vBtn.addEventListener('click', () => {
          renderPreviews(sib);
          varRow.querySelectorAll('.variant-btn').forEach((b) =>
            b.classList.toggle('active', b.dataset.varId === sib.id)
          );
          copyBtn.onclick = () => copyText(sib.css || '', 'CSS');
        });
        varRow.appendChild(vBtn);
      });
      varSection.appendChild(varRow);
      tools.appendChild(varSection);
    }
  }

  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'copy-css-btn';
  copyBtn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>复制 CSS</span>';
  copyBtn.onclick = () => copyText((currentModalItem && currentModalItem.css) || item.css || '', 'CSS');
  footer.appendChild(copyBtn);
}

function renderFontModal(item) {
  const body = document.getElementById('modal-body');
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
  copyBtn.onclick = () => copyText(item.url || '', '字体链接');
  footer.appendChild(copyBtn);
}

function renderCardModal(item) {
  const body = document.getElementById('modal-body');
  body.className = 'modal-body modal-body-card';
  body.innerHTML = '';

  const tags = Array.isArray(item.tags) ? item.tags.filter(Boolean) : [];
  const counts = item.itemCounts && typeof item.itemCounts === 'object'
    ? Object.entries(item.itemCounts).slice(0, 4)
    : [];
  const desc = (item.desc || '').trim();

  const hero = document.createElement('div');
  hero.className = 'card-modal-stage';
  hero.innerHTML =
    '<div class="card-ico" aria-hidden="true">' +
    '<span class="card-ico-sheet s1"></span>' +
    '<span class="card-ico-sheet s2"></span>' +
    '<span class="card-ico-sheet s3"></span>' +
    '<span class="card-ico-lines"><i></i><i></i><i></i></span>' +
    '</div>' +
    '<div class="card-modal-copy">' +
    '<p class="card-modal-kicker">字卡预设</p>' +
    (desc ? '<p class="card-modal-desc">' + esc(desc) + '</p>' : '<p class="card-modal-desc muted">聊天预设包，下载后即可导入使用</p>') +
    (tags.length
      ? '<div class="card-modal-tags">' + tags.map((t) => '<span class="card-tag">' + esc(t) + '</span>').join('') + '</div>'
      : '') +
    '</div>';
  body.appendChild(hero);

  if (counts.length) {
    const grid = document.createElement('div');
    grid.className = 'card-modal-stats';
    counts.forEach(([k, v]) => {
      grid.innerHTML +=
        '<div class="card-stat"><b>' + esc(String(v)) + '</b><span>' + esc(k) + '</span></div>';
    });
    body.appendChild(grid);
  }

  const meta = document.createElement('div');
  meta.className = 'card-modal-authorbar';
  meta.innerHTML =
    '<span class="card-modal-author-label">作者</span>' +
    '<div class="card-modal-author-val">' + authorButtonHTML(item, 'card-author-link inline') + '</div>';
  body.appendChild(meta);
  bindAuthorLink(meta);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML =
    '<div class="modal-footer-row-btns">' +
    '<button type="button" class="btn-action btn-secondary" id="btn-copy-link">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' +
    '<span>复制链接</span></button>' +
    '<button type="button" class="btn-action btn-primary card-dl-btn" id="btn-dl-card">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
    '<span>下载字卡</span></button>' +
    '</div>';
  footer.querySelector('#btn-copy-link').onclick = () => copyText(item.file || '', '文件链接');
  footer.querySelector('#btn-dl-card').onclick = () => downloadFile(item);
}

function renderThemeModal(item) {
  const body = document.getElementById('modal-body');
  body.className = 'modal-body modal-body-theme';
  body.innerHTML = '';

  if ((item.colors || []).length) {
    const pal = document.createElement('div');
    pal.className = 'theme-modal-palette';
    item.colors.forEach(c => {
      pal.innerHTML += `<div class="theme-modal-swatch" style="background:${esc(c)}"></div>`;
    });
    body.appendChild(pal);
  }

  const cssWrap = document.createElement('div');
  cssWrap.className = 'theme-css-wrap';
  cssWrap.innerHTML = `
    <div class="theme-css-label">CSS 代码</div>
    <pre class="theme-css-code">${esc(item.css||'')}</pre>
  `;
  body.appendChild(cssWrap);

  const meta = document.createElement('div');
  meta.className = 'card-modal-meta theme-modal-meta';
  const info = [
    ['作者', authorButtonHTML(item, 'card-author-link inline')],
    ...(item.tags && item.tags.length ? [
      ['标签', item.tags.join(' · ')]
    ] : []),
  ];
  info.forEach(([k, v]) => {
    const isHtml = k === '作者';
    meta.innerHTML += `<div class="cmm-row"><span>${k}</span><strong>${isHtml ? v : esc(String(v))}</strong></div>`;
  });
  body.appendChild(meta);
  bindAuthorLink(meta);

  const footer = document.getElementById('modal-footer');
  footer.innerHTML = `
    <div class="modal-footer-row-btns">
      <button class="btn-action btn-primary theme-copy-btn" id="btn-copy-theme-css">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        复制 CSS 代码
      </button>
    </div>
  `;
  footer.querySelector('#btn-copy-theme-css').onclick = () => copyText(item.css || '', 'CSS 代码');
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  currentModalItem = null;
  setTimeout(() => {
    document.getElementById('dbs').textContent = '';
  }, 350);
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
let touchStartY = 0;
document.getElementById('modal').addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, {
  passive: true
});
document.getElementById('modal').addEventListener('touchend', e => {
  const body = document.getElementById('modal-body');
  // 只有 modal-body 滚动到顶部时，下拉才关闭，避免滚动内容时误触发
  if (e.changedTouches[0].clientY - touchStartY > 80 && body.scrollTop === 0) closeModal();
}, {
  passive: true
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function setType(t) {
  state.type = t;
  state.page = 1;
  ['type-list', 'm-type-list'].forEach(id => {
    const list = document.getElementById(id);
    if (!list) return;
    list.querySelectorAll('.type-pill').forEach(p => p.classList.toggle('active', p.dataset.type === t));
  });
  updateFilterBtn();
  renderCards();
}

function setWarn(w) {
  if (w === 'pair' || w === 'any') w = 'all';
  state.warn = w || 'all';
  state.page = 1;
  ['warn-list', 'm-warn-list'].forEach((id) => {
    const list = document.getElementById(id);
    if (!list) return;
    list.querySelectorAll('[data-warn]').forEach((p) => {
      p.classList.toggle('active', p.dataset.warn === state.warn);
    });
  });
  updateFilterBtn();
  renderCards();
}

function updateFilterBtn() {
  const btn = document.getElementById('mobile-filter-btn');
  const badge = document.getElementById('mobile-filter-badge');
  if (!btn) return;
  let n = 0;
  if (state.type && state.type !== 'all') n++;
  if (state.warn && state.warn !== 'all') n++;
  btn.classList.toggle('is-active', n > 0);
  if (badge) {
    badge.hidden = n === 0;
    badge.textContent = String(n);
  }
}

function openFilterDrawer() {
  const drawer = document.getElementById('filter-drawer');
  const btn = document.getElementById('mobile-filter-btn');
  if (!drawer) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function closeFilterDrawer() {
  const drawer = document.getElementById('filter-drawer');
  const btn = document.getElementById('mobile-filter-btn');
  if (!drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

['type-list', 'm-type-list'].forEach(id => {
  const list = document.getElementById(id);
  if (!list) return;
  list.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => setType(pill.dataset.type));
  });
});

['warn-list', 'm-warn-list'].forEach((id) => {
  const list = document.getElementById(id);
  if (!list) return;
  list.querySelectorAll('[data-warn]').forEach((pill) => {
    pill.addEventListener('click', () => setWarn(pill.dataset.warn));
  });
});

document.getElementById('search-input').addEventListener('input', function() {
  state.query = this.value.trim();
  state.page = 1;
  renderCards();
});

function switchAppTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  const workspace = document.getElementById('gallery-view');
  const toolbarWrap = document.querySelector('.toolbar-wrapper');
  const gridWrap = document.getElementById('gallery-grid-wrap');
  const sv = document.getElementById('submit-view');
  const adminView = document.getElementById('admin-view');
  const profileView = document.getElementById('profile-view');
  const mineView = document.getElementById('mine-view');

  if (workspace) workspace.classList.toggle('is-gallery', tab === 'gallery');
  if (toolbarWrap) toolbarWrap.style.display = tab === 'gallery' ? '' : 'none';
  if (gridWrap) gridWrap.style.display = tab === 'gallery' ? '' : 'none';
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.style.display = tab === 'gallery' ? '' : 'none';
  const searchWrap = document.querySelector('.search-wrap');
  if (searchWrap) searchWrap.style.display = tab === 'gallery' ? '' : 'none';
  const galleryTools = document.getElementById('header-gallery-tools');
  if (galleryTools) galleryTools.style.display = tab === 'gallery' ? '' : 'none';
  document.body.dataset.appTab = tab;

  if (sv) {
    if (tab === 'submit') {
      sv.style.display = 'flex';
      sv.classList.add('active');
      if (window.SG && typeof SG.fillSubmitAuthors === 'function') SG.fillSubmitAuthors();
    } else {
      sv.style.display = 'none';
      sv.classList.remove('active');
    }
  }

  if (profileView) {
    if (tab === 'profile') {
      profileView.style.display = 'flex';
      profileView.classList.add('active');
      document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
    } else {
      profileView.style.display = 'none';
      profileView.classList.remove('active');
    }
  }

  if (mineView) {
    if (tab === 'mine') {
      mineView.style.display = 'flex';
      mineView.classList.add('active');
      if (window.SG && typeof SG.renderMineList === 'function') SG.renderMineList();
    } else {
      mineView.style.display = 'none';
      mineView.classList.remove('active');
    }
  }

  if (adminView) {
    if (tab === 'admin') {
      adminView.style.display = 'flex';
      adminView.classList.add('active');
      if (window.SG && typeof SG.renderAdminList === 'function') SG.renderAdminList();
    } else {
      adminView.style.display = 'none';
      adminView.classList.remove('active');
    }
  }
}
window.SG_switchTab = switchAppTab;

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchAppTab(btn.dataset.tab));
});

document.getElementById('mobile-filter-btn').addEventListener('click', openFilterDrawer);
document.getElementById('filter-drawer-bg').addEventListener('click', closeFilterDrawer);
document.getElementById('close-filter-btn').addEventListener('click', closeFilterDrawer);
const filterDoneBtn = document.getElementById('filter-done-btn');
if (filterDoneBtn) filterDoneBtn.addEventListener('click', closeFilterDrawer);
const filterResetBtn = document.getElementById('filter-reset-btn');
if (filterResetBtn) {
  filterResetBtn.addEventListener('click', () => {
    setType('all');
    setWarn('all');
  });
}
(function() {
  const prevBtn = document.getElementById('pager-prev');
  const nextBtn = document.getElementById('pager-next');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    state.page = Math.max(1, (state.page || 1) - 1);
    renderCards();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    state.page = (state.page || 1) + 1;
    renderCards();
  });

  function closeAllMenus(except) {
    document.querySelectorAll('.sg-menu.open').forEach((m) => {
      if (except && m === except) return;
      m.classList.remove('open');
      const btn = m.querySelector('.sg-menu-trigger');
      const panel = m.querySelector('.sg-menu-panel');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
    });
  }

  function bindMenu(root, { getValue, setValue, formatValue }) {
    if (!root) return;
    const btn = root.querySelector('.sg-menu-trigger');
    const panel = root.querySelector('.sg-menu-panel');
    const valueEl = root.querySelector('.sg-menu-value');
    if (!btn || !panel) return;

    function sync() {
      const v = String(getValue());
      panel.querySelectorAll('.sg-menu-option').forEach((opt) => {
        const on = opt.dataset.value === v;
        opt.classList.toggle('active', on);
        opt.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (valueEl) valueEl.textContent = formatValue ? formatValue(v) : v;
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !root.classList.contains('open');
      closeAllMenus(willOpen ? root : null);
      root.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      panel.hidden = !willOpen;
    });

    panel.querySelectorAll('.sg-menu-option').forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        setValue(opt.dataset.value);
        sync();
        closeAllMenus();
      });
    });

    sync();
  }

  bindMenu(document.querySelector('.sg-menu[data-menu="sort"]'), {
    getValue: () => state.sort || 'default',
    setValue: (v) => {
      state.sort = v || 'default';
      state.page = 1;
      renderCards();
    },
    formatValue: (v) =>
      ({ default: '默认', newest: '最新', hot: '最热', weekly: '本周' }[v] || v)
  });

  bindMenu(document.querySelector('.sg-menu[data-menu="pagesize"]'), {
    getValue: () => String(state.pageSize || 36),
    setValue: (v) => {
      state.pageSize = parseInt(v, 10) || 36;
      state.page = 1;
      renderCards();
    },
    formatValue: (v) => String(v)
  });

  document.addEventListener('click', () => closeAllMenus());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });

  const moreRoot = document.querySelector('.sg-menu[data-menu="modal-more"]');
  if (moreRoot) {
    const btn = moreRoot.querySelector('.sg-menu-trigger');
    const panel = moreRoot.querySelector('.sg-menu-panel');
    if (btn && panel) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !moreRoot.classList.contains('open');
        closeAllMenus(willOpen ? moreRoot : null);
        moreRoot.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        panel.hidden = !willOpen;
      });
      panel.querySelectorAll('[data-proxy]').forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const target = document.getElementById(opt.dataset.proxy);
          closeAllMenus();
          if (target && !target.hidden) target.click();
        });
      });
    }
  }
})();

window.switchForm = function(type) {
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sv-nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
  });
  document.getElementById('form-' + type).classList.add('active');
  if (type === 'music') ensureMusicTracksInit();

  const meta = {
    bubble: ['气泡投稿', '填写名称与 CSS，可附预览对话'],
    font: ['字体投稿', '提交可直链访问的 TTF / OTF 文件'],
    card: ['字卡投稿', '提交 JSON 预设包直链与简介'],
    theme: ['主题投稿', '提交整站配色 CSS 与主色'],
    music: ['音乐投稿', '默认按合辑提交多首曲目，也可投单曲']
  };
  const title = document.getElementById('sv-main-title');
  const desc = document.getElementById('sv-main-desc');
  if (title && meta[type]) title.textContent = meta[type][0];
  if (desc && meta[type]) desc.textContent = meta[type][1];

  const activeNav = document.querySelector('.sv-nav-item.active');
  if (activeNav && typeof activeNav.scrollIntoView === 'function') {
    try {
      activeNav.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: 'smooth'
      });
    } catch (e) {
      activeNav.scrollIntoView({
        inline: 'center',
        block: 'nearest'
      });
    }
  }
};

function jsString(v) {
  return JSON.stringify(String(v ?? ''));
}

function buildBubbleCode(name, author, css, demos, series, groupId) {
  const prevStr = demos.filter(d => d.v).map(d => `    {t:'${d.t}',v:'${d.v.replace(/'/g,"\\'")}'}`).join(',\n');
  const nextId = 'b' + (galleryBubbles().length + 1);
  const groupLine = groupId ? `\n  group:'${groupId}',\n  groupLabel:'${series||groupId}',` : (series ? `\n  /* 系列：${series} */` : '');
  return `/* === 气泡投稿 === */\n{\n  id:'${nextId}',\n  type:'bubble',\n  name:'${name}',\n  author:'${author||'匿名'}',${groupLine}\n  previews:[\n${prevStr}\n  ],\n  css:\`${css}\`\n}`;
}

function buildFontCode(name, author, url) {
  const n = galleryFonts().length + 1;
  const nextId = 'f' + n,
    nextFamily = 'F' + n;
  return `/* === 字体投稿 === */\n/* 1. 在 @font-face 添加: */\n@font-face { font-family:'${nextFamily}'; src:url('${url}') format('truetype'); font-display:swap }\n\n/* 2. 在 FONTS 数组添加: */\n{\n  id:'${nextId}',\n  type:'font',\n  name:'${name}',\n  author:'${author||'匿名'}',\n  family:'${nextFamily}',\n  url:'${url}'\n}`;
}

function buildCardCode(name, author, desc, fileUrl) {
  const nextId = 'card' + (galleryList().filter((i) => i.type === 'card').length + 1);
  const fileName = fileUrl.split('/').pop() || 'file.json';
  return `/* === 字卡投稿 === */\n{\n  id:'${nextId}',\n  type:'card',\n  name:${jsString(name)},\n  author:${jsString(author||'匿名')},\n  desc:${jsString(desc)},\n  fileType:'json',\n  fileName:${jsString(fileName)},\n  file:${jsString(fileUrl)}\n}`;
}

function buildThemeCode(name, author, desc, css, colors, tags) {
  const nextId = 'th' + (galleryList().filter((i) => i.type === 'theme').length + 1);
  const colorsArr = colors.split(/[,\s]+/).filter(s => s.startsWith('#'));
  return `/* === 主题投稿 === */\n{\n  id:'${nextId}',\n  type:'theme',\n  name:${jsString(name)},\n  author:${jsString(author||'匿名')},\n  desc:${jsString(desc)},\n  tags:${JSON.stringify(tags.split(/[,，\s]+/).filter(Boolean))},\n  colors:${JSON.stringify(colorsArr)},\n  css:\`${css}\`\n}`;
}

function randomMusicGroupSuffix() {
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

function sanitizeMusicGroupId(raw) {
  let s = String(raw || '').trim().replace(/\s+/g, '').replace(/[^a-zA-Z0-9_-]/g, '');
  if (!s) return '';
  if (!/^g-/i.test(s)) s = 'g-' + s;
  return s;
}

function buildMusicCode(seq, name, author, artist, desc, fileUrl, groupMeta, duration) {
  const nextId = 'mus' + seq;
  const fileName = fileUrl.split('/').pop() || 'song.mp3';
  const ext = (fileName.split('.').pop() || 'mp3').toLowerCase();
  const parts = [
    `  id:'${nextId}'`,
    `  type:'music'`,
    `  name:${jsString(name)}`,
    `  author:${jsString(author||'匿名')}`,
  ];
  if (groupMeta && groupMeta.group) {
    const gid = String(groupMeta.group).replace(/'/g, "\\'");
    parts.push(`  group:'${gid}'`);
    parts.push(`  groupLabel:${jsString(groupMeta.groupLabel||groupMeta.group)}`);
  }
  if (artist) parts.push(`  artist:${jsString(artist)}`);
  if (desc) parts.push(`  desc:${jsString(desc)}`);
  if (duration) parts.push(`  duration:${jsString(duration)}`);
  parts.push(`  fileType:'${ext}'`);
  parts.push(`  fileName:${jsString(fileName)}`);
  parts.push(`  file:${jsString(fileUrl)}`);
  return '/* === 音乐投稿 === */\n{\n' + parts.join(',\n') + '\n}';
}

function ensureMusicTracksInit() {
  const box = document.getElementById('music-tracks');
  if (!box || box.children.length) return;
  addMusicTrackRow();
  addMusicTrackRow();
}

function renumberMusicTracks() {
  document.querySelectorAll('#music-tracks .music-track-card').forEach((card, i) => {
    const n = card.querySelector('.music-track-num');
    if (n) n.textContent = String(i + 1);
  });
}
window.addMusicTrackRow = function() {
  const box = document.getElementById('music-tracks');
  if (!box) return;
  const card = document.createElement('div');
  card.className = 'music-track-card';
  card.innerHTML = `
    <div class="music-track-top">
      <span class="music-track-num">1</span>
      <button type="button" class="music-track-rm" onclick="removeMusicTrackRow(this)" aria-label="删除此曲">×</button>
    </div>
    <div class="music-track-fields">
      <div class="fg"><label class="fl">曲名</label><input type="text" class="fi music-inp-name" placeholder="歌曲名称" autocomplete="off"></div>
      <div class="fg"><label class="fl">音频直链</label><input type="text" class="fi music-inp-url" placeholder="https://files.catbox.moe/….mp3" autocomplete="off"></div>
      <div class="music-track-grid2">
        <div class="fg"><label class="fl">原唱 <span class="sv-section-opt">可选</span></label><input type="text" class="fi music-inp-artist" placeholder="艺术家" autocomplete="off"></div>
        <div class="fg"><label class="fl">时长 <span class="sv-section-opt">可选</span></label><input type="text" class="fi music-inp-dur" placeholder="3:45" autocomplete="off"></div>
      </div>
      <div class="fg"><label class="fl">单曲简介 <span class="sv-section-opt">可选</span></label><textarea class="fta music-inp-desc" placeholder="这一首的说明…" style="min-height:56px"></textarea></div>
    </div>`;
  box.appendChild(card);
  renumberMusicTracks();
};
window.removeMusicTrackRow = function(btn) {
  const box = document.getElementById('music-tracks');
  const card = btn && btn.closest && btn.closest('.music-track-card');
  if (!box || !card || box.children.length <= 1) return;
  card.remove();
  renumberMusicTracks();
};

window.setMusicMode = function(mode) {
  const album = document.getElementById('music-panel-album');
  const single = document.getElementById('music-panel-single');
  const isAlbum = mode === 'album';
  if (album) album.hidden = !isAlbum;
  if (single) single.hidden = isAlbum;
  document.querySelectorAll('.music-mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.musicMode === mode);
  });
  if (isAlbum) {
    ensureMusicTracksInit();
    const sa = document.getElementById('music-author');
    const aa = document.getElementById('music-album-author');
    if (sa && aa) {
      const t = sa.value.trim();
      if (t && !aa.value.trim()) aa.value = sa.value;
    }
  } else {
    const sa = document.getElementById('music-author');
    const aa = document.getElementById('music-album-author');
    if (sa && aa) {
      const t = aa.value.trim();
      if (t && !sa.value.trim()) sa.value = aa.value;
    }
  }
};

function collectSubmit(type) {
  const nl = '\n';
  let subject = '',
    body = '',
    code = '';
  let rows = [];
  let fallbackId = type;

  if (type === 'bubble') {
    const name = document.getElementById('bubble-name').value.trim();
    const author = document.getElementById('bubble-author').value.trim();
    const css = document.getElementById('bubble-css').value.trim();
    const series = document.getElementById('bubble-series').value.trim();
    const groupId = document.getElementById('bubble-group-id').value.trim().replace(/\s+/g, '');
    const demos = [1, 2, 3, 4].map((n, i) => ({
      t: ['sent', 'received', 'sent', 'received'][i],
      v: document.getElementById('p' + n).value.trim()
    }));
    if (!name || !css) {
      toast('⚠️ 请填写名称和 CSS 代码');
      return null;
    }
    code = buildBubbleCode(name, author, css, demos, series, groupId);
    subject = `【气泡投稿】${name} - ${author||'匿名'}${series?' ['+series+']':''}`;
    body = `投稿类型：聊天气泡${nl}名称：${name}${nl}作者：${author||'匿名'}${series?nl+'所属系列：'+series:''}${groupId?nl+'系列ID：'+groupId:''}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    rows = [{
      type: 'bubble',
      name,
      author_name: author || '匿名',
      css,
      previews: demos.filter(d => d.v),
      series: series || null,
      group_id: groupId || null
    }];
    fallbackId = 'bubble';

  } else if (type === 'font') {
    const name = document.getElementById('font-name').value.trim();
    const author = document.getElementById('font-author').value.trim();
    const url = document.getElementById('font-url').value.trim();
    if (!name || !url) {
      toast('⚠️ 请填写名称和字体链接');
      return null;
    }
    code = buildFontCode(name, author, url);
    subject = `【字体投稿】${name} - ${author||'匿名'}`;
    body = `投稿类型：字体${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    rows = [{
      type: 'font',
      name,
      author_name: author || '匿名',
      font_url: url,
      font_family: 'F' + Date.now()
    }];
    fallbackId = 'font';

  } else if (type === 'card') {
    const name = document.getElementById('card-name').value.trim();
    const author = document.getElementById('card-author').value.trim();
    const desc = document.getElementById('card-desc').value.trim();
    const fileUrl = document.getElementById('card-file-url').value.trim();
    if (!name || !fileUrl) {
      toast('⚠️ 请填写字卡名称和文件链接');
      return null;
    }
    code = buildCardCode(name, author, desc, fileUrl);
    subject = `【字卡投稿】${name} - ${author||'匿名'}`;
    body = `投稿类型：字卡${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}描述：${desc}${nl}文件链接：${fileUrl}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    rows = [{
      type: 'card',
      name,
      author_name: author || '匿名',
      description: desc || null,
      file_url: fileUrl,
      file_name: fileUrl.split('/').pop() || 'file.json',
      file_type: 'json'
    }];
    fallbackId = 'card';

  } else if (type === 'theme') {
    const name = document.getElementById('theme-name').value.trim();
    const author = document.getElementById('theme-author').value.trim();
    const desc = document.getElementById('theme-desc').value.trim();
    const css = document.getElementById('theme-css').value.trim();
    const colors = document.getElementById('theme-colors').value.trim();
    const tags = document.getElementById('theme-tags').value.trim();
    if (!name || !css) {
      toast('⚠️ 请填写主题名称和 CSS 代码');
      return null;
    }
    code = buildThemeCode(name, author, desc, css, colors, tags);
    subject = `【主题投稿】${name} - ${author||'匿名'}`;
    body = `投稿类型：主题${nl}名称：${name}${nl}作者：${author||'匿名'}${nl}描述：${desc}${nl}${nl}--- 数据条目 ---${nl}${code}`;
    rows = [{
      type: 'theme',
      name,
      author_name: author || '匿名',
      description: desc || null,
      css,
      colors: colors.split(/[,\s]+/).filter(s => s.startsWith('#')),
      tags: tags.split(/[,，\s]+/).filter(Boolean)
    }];
    fallbackId = 'theme';

  } else if (type === 'music') {
    const albumBtn = document.getElementById('music-mode-album');
    const albumMode = albumBtn && albumBtn.classList.contains('active');
    if (albumMode) {
      const title = document.getElementById('music-album-title').value.trim();
      const author = document.getElementById('music-album-author').value.trim();
      let groupId = document.getElementById('music-album-group-id').value.trim().replace(/\s+/g, '');
      const albumDescEl = document.getElementById('music-album-desc');
      const albumDesc = albumDescEl ? albumDescEl.value.trim() : '';
      if (!author) {
        toast('⚠️ 请填写投稿者');
        return null;
      }
      if (!title) {
        toast('⚠️ 请填写合辑名称');
        return null;
      }
      const trackCards = [...document.querySelectorAll('#music-tracks .music-track-card')];
      const filled = [];
      for (const card of trackCards) {
        const name = (card.querySelector('.music-inp-name') || {}).value?.trim() || '';
        const url = (card.querySelector('.music-inp-url') || {}).value?.trim() || '';
        if (!name && !url) continue;
        if (!name || !url) {
          toast('⚠️ 每首曲目需同时填写曲名和直链，或清空整行卡片');
          return null;
        }
        filled.push({
          name,
          url,
          artist: (card.querySelector('.music-inp-artist') || {}).value?.trim() || '',
          desc: (card.querySelector('.music-inp-desc') || {}).value?.trim() || '',
          duration: (card.querySelector('.music-inp-dur') || {}).value?.trim() || '',
        });
      }
      if (!filled.length) {
        toast('⚠️ 请至少添加一首曲目（曲名 + 直链）');
        return null;
      }
      if (!groupId) groupId = 'g-sub-' + randomMusicGroupSuffix();
      else groupId = sanitizeMusicGroupId(groupId);
      const base = galleryList().filter((i) => i.type === 'music').length + 1;
      const parts = filled.map((t, i) => {
        let d = t.desc;
        if (i === 0 && albumDesc && !d) d = albumDesc;
        return buildMusicCode(base + i, t.name, author, t.artist, d, t.url, {
          group: groupId,
          groupLabel: title
        }, t.duration);
      });
      code = parts.join('\n\n');
      subject = `【音乐投稿·合辑】${title} - ${author||'匿名'}（${filled.length}首）`;
      body = `投稿类型：音乐（合辑）${nl}合辑名称：${title}${nl}合辑ID：${groupId}${nl}投稿者：${author||'匿名'}${albumDesc?nl+'合辑简介：'+albumDesc:''}${nl}${nl}--- 曲目 ---${nl}` +
        filled.map((t, i) => `${i+1}. ${t.name}${t.artist?' · '+t.artist:''}${nl}   ${t.url}`).join(nl + nl) +
        `${nl}${nl}--- 数据条目 ---${nl}${code}`;
      rows = [{
        type: 'music',
        name: title,
        author_name: author || '匿名',
        description: albumDesc || null,
        album_title: title,
        is_album: true,
        group_id: groupId,
        track_list: filled
      }];
    } else {
      const name = document.getElementById('music-name').value.trim();
      const author = document.getElementById('music-author').value.trim();
      const artist = document.getElementById('music-artist').value.trim();
      const descEl = document.getElementById('music-desc');
      const desc = descEl ? descEl.value.trim() : '';
      const fileUrl = document.getElementById('music-file-url').value.trim();
      if (!name || !fileUrl) {
        toast('⚠️ 请填写歌曲名称和文件链接');
        return null;
      }
      const seq = galleryList().filter((i) => i.type === 'music').length + 1;
      code = buildMusicCode(seq, name, author, artist, desc, fileUrl, null, '');
      subject = `【音乐投稿】${name} - ${author||'匿名'}`;
      body = `投稿类型：音乐（单曲）${nl}名称：${name}${nl}投稿者：${author||'匿名'}${artist?nl+'原唱：'+artist:''}${desc?nl+'简介：'+desc:''}${nl}文件链接：${fileUrl}${nl}${nl}--- 数据条目 ---${nl}${code}`;
      rows = [{
        type: 'music',
        name,
        author_name: author || '匿名',
        artist: artist || null,
        description: desc || null,
        file_url: fileUrl,
        file_name: fileUrl.split('/').pop() || 'song.mp3',
        file_type: (fileUrl.split('.').pop() || 'mp3').toLowerCase(),
        is_album: false
      }];
    }
    fallbackId = 'music';
  } else {
    return null;
  }

  const warns = readWarningChecks(document.getElementById('warn-box-' + fallbackId));
  rows = rows.map((r) => Object.assign({}, r, { warnings: warns }));
  if (warns.length) {
    body += nl + nl + '预警标签：' + warns.join(', ');
  }

  return { subject, body, code, rows, fallbackId };
}

window.doSubmit = async function(type) {
  const collected = collectSubmit(type);
  if (!collected) return;

  const { rows } = collected;
  if (!window.SG || !SG.isConfigured || !SG.isConfigured()) {
    toast('站点未配置后端，暂时无法投稿');
    return;
  }
  if (!SG.getUser()) {
    toast('请先登录再投稿');
    SG.openAuth('login');
    return;
  }

  const urls = collectSubmitUrls(rows);
  if (urls.length) {
    toast('正在检测直链…', 1200);
    const results = await Promise.all(urls.map((u) => checkDirectUrl(u)));
    const bad = results.filter((r) => !r.ok);
    if (bad.length) {
      const sample = bad[0].url.length > 60 ? bad[0].url.slice(0, 60) + '…' : bad[0].url;
      const go = window.confirm(
        '有 ' +
          bad.length +
          ' 条直链可能无法访问（例如：' +
          sample +
          '）。\n仍要提交吗？点「取消」可回去修改。'
      );
      if (!go) return;
    }
  }

  toast('正在提交…', 1500);
  const { error } = await SG.submitItems(rows);
  if (error) {
    toast('投稿失败：' + error, 4500);
    return;
  }
  toast('✅ 投稿成功，等待审核');
};

function collectSubmitUrls(rows) {
  const out = [];
  (rows || []).forEach((r) => {
    if (!r) return;
    if (r.font_url) out.push(r.font_url);
    if (r.file_url) out.push(r.file_url);
    if (Array.isArray(r.track_list)) {
      r.track_list.forEach((t) => {
        if (t && t.url) out.push(t.url);
      });
    }
  });
  return [...new Set(out.filter(Boolean))];
}

async function checkDirectUrl(url) {
  const raw = String(url || '').trim();
  if (!raw) return { ok: false, url: raw, reason: 'empty' };
  if (!/^https?:\/\//i.test(raw)) {
    return { ok: false, url: raw, reason: 'not-http' };
  }
  try {
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;
    let res;
    try {
      res = await fetch(raw, {
        method: 'HEAD',
        mode: 'cors',
        signal: ctrl ? ctrl.signal : undefined
      });
    } catch (e1) {
      res = await fetch(raw, {
        method: 'GET',
        mode: 'cors',
        signal: ctrl ? ctrl.signal : undefined,
        headers: { Range: 'bytes=0-0' }
      });
    }
    if (timer) clearTimeout(timer);
    if (res && (res.ok || res.status === 206 || res.status === 304)) {
      return { ok: true, url: raw, status: res.status };
    }
    // 跨域 opaque / 403 不一定代表失效，再试 no-cors GET
    if (res && (res.type === 'opaque' || res.status === 0)) {
      return { ok: true, url: raw, status: 0, soft: 'opaque' };
    }
    if (res && res.status >= 400 && res.status < 500 && res.status !== 403 && res.status !== 405) {
      return { ok: false, url: raw, status: res.status };
    }
    return { ok: true, url: raw, status: res ? res.status : 0, soft: 'soft' };
  } catch (err) {
    try {
      await fetch(raw, { method: 'GET', mode: 'no-cors' });
      return { ok: true, url: raw, note: 'no-cors' };
    } catch (e2) {
      return { ok: false, url: raw, reason: (err && err.message) || 'fetch-failed' };
    }
  }
}
window.checkDirectUrl = checkDirectUrl;

function setWarnChecks(type, warnings) {
  const box = document.getElementById('warn-box-' + type);
  if (!box) return;
  const set = new Set(Array.isArray(warnings) ? warnings : []);
  box.querySelectorAll('input[data-warn-id]').forEach((input) => {
    input.checked = set.has(input.dataset.warnId);
  });
}

window.prefillSubmitFromItem = function (item) {
  if (!item || !item.type) {
    toast('无法载入投稿数据');
    return;
  }
  const type = item.type;
  if (typeof window.switchForm === 'function') window.switchForm(type);

  const setVal = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = v == null ? '' : String(v);
  };

  if (type === 'bubble') {
    setVal('bubble-name', item.name);
    setVal('bubble-author', item.author_name || item.author || '');
    setVal('bubble-series', item.series || '');
    setVal('bubble-group-id', item.group_id || item.group || '');
    setVal('bubble-css', item.css || '');
    const demos = Array.isArray(item.previews) ? item.previews : [];
    for (let i = 0; i < 4; i++) {
      setVal('p' + (i + 1), demos[i] && demos[i].v ? demos[i].v : '');
    }
  } else if (type === 'font') {
    setVal('font-name', item.name);
    setVal('font-author', item.author_name || item.author || '');
    setVal('font-url', item.font_url || item.url || '');
  } else if (type === 'card') {
    setVal('card-name', item.name);
    setVal('card-author', item.author_name || item.author || '');
    setVal('card-desc', item.description || item.desc || '');
    setVal('card-file-url', item.file_url || item.file || '');
  } else if (type === 'theme') {
    setVal('theme-name', item.name);
    setVal('theme-author', item.author_name || item.author || '');
    setVal('theme-desc', item.description || item.desc || '');
    setVal('theme-css', item.css || '');
    setVal('theme-colors', Array.isArray(item.colors) ? item.colors.join(', ') : '');
    setVal('theme-tags', Array.isArray(item.tags) ? item.tags.join(', ') : '');
  } else if (type === 'music') {
    const tracks = Array.isArray(item.track_list) ? item.track_list : null;
    const isAlbum = !!(item.is_album || (tracks && tracks.length) || item.album_title);
    if (typeof window.setMusicMode === 'function') window.setMusicMode(isAlbum ? 'album' : 'single');
    if (isAlbum) {
      setVal('music-album-title', item.album_title || item.name || '');
      setVal('music-album-author', item.author_name || item.author || '');
      setVal('music-album-group-id', item.group_id || item.group || '');
      setVal('music-album-desc', item.description || item.desc || '');
      const box = document.getElementById('music-tracks');
      if (box) {
        box.innerHTML = '';
        const list = tracks && tracks.length ? tracks : [{ name: item.name, url: item.file_url || item.file || '', artist: item.artist || '', desc: '' }];
        list.forEach(() => {
          if (typeof window.addMusicTrackRow === 'function') window.addMusicTrackRow();
        });
        const cards = [...box.querySelectorAll('.music-track-card')];
        list.forEach((t, i) => {
          const card = cards[i];
          if (!card || !t) return;
          const nameEl = card.querySelector('.music-inp-name');
          const urlEl = card.querySelector('.music-inp-url');
          const artistEl = card.querySelector('.music-inp-artist');
          const durEl = card.querySelector('.music-inp-dur');
          const descEl = card.querySelector('.music-inp-desc');
          if (nameEl) nameEl.value = t.name || '';
          if (urlEl) urlEl.value = t.url || t.file || '';
          if (artistEl) artistEl.value = t.artist || '';
          if (durEl) durEl.value = t.duration || '';
          if (descEl) descEl.value = t.desc || '';
        });
      }
    } else {
      setVal('music-name', item.name);
      setVal('music-author', item.author_name || item.author || '');
      setVal('music-artist', item.artist || '');
      setVal('music-desc', item.description || item.desc || '');
      setVal('music-file-url', item.file_url || item.file || '');
    }
  }

  setWarnChecks(type, item.warnings);
  toast('已填入被拒稿内容，修改后可重新提交');
  const form = document.getElementById('form-' + type);
  if (form && typeof form.scrollIntoView === 'function') {
    try {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      form.scrollIntoView(true);
    }
  }
};

(function() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  let dark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  function applyTheme() {
    root.classList.toggle('dark', dark);
    sunIcon.style.display = dark ? '' : 'none';
    moonIcon.style.display = dark ? 'none' : '';
  }
  applyTheme();
  btn.addEventListener('click', () => {
    dark = !dark;
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    applyTheme();
  });
})();


(function () {
  const ANNOUNCE_ID = '2026-09-for-love-v4';
  const LS_KEY = 'sg_announce_seen';
  const modal = document.getElementById('announce-modal');
  if (!modal) return;

  function seen() {
    try {
      return localStorage.getItem(LS_KEY) === ANNOUNCE_ID;
    } catch (e) {
      return false;
    }
  }

  function markSeen() {
    try {
      localStorage.setItem(LS_KEY, ANNOUNCE_ID);
    } catch (e) {}
  }

  function closeAnnounce() {
    markSeen();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
  }

  function openAnnounce() {
    if (seen()) return;
    modal.hidden = false;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  const ok = document.getElementById('announce-ok-btn');
  const backdrop = document.getElementById('announce-modal-backdrop');
  if (ok) ok.addEventListener('click', closeAnnounce);
  if (backdrop) backdrop.addEventListener('click', closeAnnounce);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(openAnnounce, 280));
  } else {
    setTimeout(openAnnounce, 280);
  }
})();

document.body.dataset.appTab = 'gallery';
const ws = document.getElementById('gallery-view');
if (ws) ws.classList.add('is-gallery');
mountWarningFields();
updateFavCounts();
updateFilterBtn();
renderCards();

window.SG_applyGalleryItems = function(extraItems) {
  const extras = Array.isArray(extraItems) ? extraItems : window.SG_LAST_REMOTE_ITEMS || [];
  if (Array.isArray(extraItems)) window.SG_LAST_REMOTE_ITEMS = extras;
  const map = new Map();
  extras.forEach((it) => {
    if (it && it.id != null) map.set(String(it.id), it);
  });
  ALL = [...map.values()];
  window.ALL = ALL;

  let style = document.getElementById('sg-remote-fonts');
  if (!style) {
    style = document.createElement('style');
    style.id = 'sg-remote-fonts';
    document.head.appendChild(style);
  }
  style.textContent = ALL.filter((it) => it && it.type === 'font' && it.url && it.family)
    .map(
      (it) =>
        `@font-face{font-family:'${String(it.family).replace(/'/g, '')}';src:url('${String(it.url).replace(/'/g, '%27')}') format('truetype');font-display:swap}`
    )
    .join('\n');

  if (typeof updateFavCounts === 'function') updateFavCounts();
  if (typeof updateFilterBtn === 'function') updateFilterBtn();
  if (typeof renderCards === 'function') renderCards();
};

window.SG_remergeGallery = function () {
  window.SG_applyGalleryItems(window.SG_LAST_REMOTE_ITEMS || []);
};

(function bindSubmitLinkChecks() {
  function ensureHint(input) {
    if (!input) return null;
    let hint = input.parentElement && input.parentElement.querySelector('.sv-link-check');
    if (!hint) {
      hint = document.createElement('div');
      hint.className = 'sv-link-check';
      hint.hidden = true;
      if (input.parentElement) input.parentElement.appendChild(hint);
    }
    return hint;
  }

  async function runCheck(input) {
    const hint = ensureHint(input);
    if (!hint) return;
    const url = (input.value || '').trim();
    if (!url) {
      hint.hidden = true;
      return;
    }
    hint.hidden = false;
    hint.className = 'sv-link-check pending';
    hint.textContent = '正在检测直链…';
    const res = await checkDirectUrl(url);
    if (res.ok) {
      hint.className = 'sv-link-check ok';
      hint.textContent = '直链看起来可以访问';
    } else {
      hint.className = 'sv-link-check bad';
      hint.textContent = '直链可能无法访问，请确认是可直连的 https 链接';
    }
  }

  const ids = ['font-url', 'card-file-url', 'music-file-url'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => runCheck(el));
  });

  document.addEventListener(
    'blur',
    (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains('music-inp-url')) runCheck(t);
    },
    true
  );
})();
