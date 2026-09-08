/* Style Gallery × Supabase：登录 / 投稿入库 / 管理审核 */
(function () {
  const cfg = window.SG_CONFIG || {};
  const ready =
    typeof cfg.url === 'string' &&
    cfg.url.indexOf('https://') === 0 &&
    typeof cfg.anonKey === 'string' &&
    cfg.anonKey.length > 20;

  let client = null;
  let user = null;
  let profile = null;

  function toast(msg, dur) {
    if (typeof window.toast === 'function') window.toast(msg, dur);
    else alert(msg);
  }

  function isConfigured() {
    return !!(ready && client);
  }

  function getUser() {
    return user;
  }

  function isStaff() {
    return !!(profile && (profile.role === 'owner' || profile.role === 'moderator') && !profile.is_banned);
  }

  function isOwner() {
    return !!(profile && profile.role === 'owner' && !profile.is_banned);
  }

  function normalizeUrl(raw) {
    return String(raw || '')
      .trim()
      .replace(/\/+$/, '')
      .replace(/\/rest\/v1$/i, '');
  }

  function initClient() {
    if (!ready) return null;
    if (!window.supabase || !window.supabase.createClient) {
      console.error('[SG] Supabase SDK 未加载');
      return null;
    }
    const url = normalizeUrl(cfg.url);
    client = window.supabase.createClient(url, cfg.anonKey);
    return client;
  }

  function warningDefs() {
    return window.SG_WARNING_DEFS || [
      { id: 'character', label: '角色相关', hint: '' },
      { id: 'sensitive', label: '敏感内容', hint: '' }
    ];
  }

  function mapDbItemToGallery(row) {
    if (!row) return null;
    const id = 'remote-' + row.id;
    const base = {
      id,
      remoteId: row.id,
      type: row.type,
      name: row.name,
      author: row.author_name || '匿名',
      desc: row.description || '',
      warnings: Array.isArray(row.warnings) ? row.warnings : [],
      submitterId: row.submitter_id || null,
      legacyId: row.legacy_id || null,
      reviewerId: row.reviewer_id || null,
      reviewedAt: row.reviewed_at || null,
      likeCount: row.like_count || 0,
      createdAt: row.created_at ? Date.parse(row.created_at) || 0 : 0,
      fromRemote: true
    };
    if (row.type === 'bubble') {
      return Object.assign(base, {
        css: row.css || '',
        previews: row.previews || [],
        group: row.group_id || undefined,
        groupLabel: row.series || row.group_id || undefined
      });
    }
    if (row.type === 'font') {
      return Object.assign(base, {
        family: row.font_family || id,
        url: row.font_url || '',
        category: row.font_category || '其他'
      });
    }
    if (row.type === 'card') {
      return Object.assign(base, {
        file: row.file_url || '',
        fileName: row.file_name || '',
        fileType: row.file_type || 'json'
      });
    }
    if (row.type === 'theme') {
      return Object.assign(base, {
        css: row.css || '',
        tags: row.tags || [],
        colors: row.colors || []
      });
    }
    if (row.type === 'music') {
      if (row.is_album && Array.isArray(row.track_list) && row.track_list.length) {
        return row.track_list.map((t, i) =>
          Object.assign({}, base, {
            id: id + '-t' + i,
            name: t.name || row.name,
            artist: t.artist || '',
            desc: t.desc || row.description || '',
            file: t.url || '',
            fileName: (t.url || '').split('/').pop() || 'song.mp3',
            fileType: ((t.url || '').split('.').pop() || 'mp3').toLowerCase(),
            group: row.group_id || undefined,
            groupLabel: row.album_title || row.name,
            duration: t.duration || ''
          })
        );
      }
      return Object.assign(base, {
        artist: row.artist || '',
        file: row.file_url || '',
        fileName: row.file_name || '',
        fileType: row.file_type || 'mp3',
        group: row.group_id || undefined,
        groupLabel: row.album_title || undefined
      });
    }
    return base;
  }

  async function loadApprovedIntoGallery() {
    if (!client) return;
    const { data, error } = await client
      .from('items')
      .select('*')
      .eq('status', 'approved')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    if (error) {
      const fallback = await client
        .from('items')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      if (fallback.error) {
        console.warn('[SG] 拉取已通过作品失败', fallback.error);
        return;
      }
      applyMapped(fallback.data || []);
      return;
    }
    applyMapped(data || []);
  }

  function applyMapped(rows) {
    const mapped = [];
    (rows || []).forEach((row) => {
      if (row.deleted_at) return;
      const m = mapDbItemToGallery(row);
      if (!m) return;
      if (Array.isArray(m)) mapped.push(...m);
      else mapped.push(m);
    });
    if (typeof window.SG_applyGalleryItems === 'function') {
      window.SG_applyGalleryItems(mapped);
    }
    const reviewerIds = [];
    (rows || []).forEach((row) => {
      if (row && row.reviewer_id) reviewerIds.push(row.reviewer_id);
    });
    if (reviewerIds.length) fetchProfilesByIds(reviewerIds).catch(() => {});
  }

  function getDisplayName(p, u) {
    const prof = p || profile;
    const usr = u || user;
    if (prof && (prof.display_name || prof.username)) return prof.display_name || prof.username;
    if (usr && usr.email) return usr.email.split('@')[0];
    return '';
  }

  const AUTHOR_FIELD_IDS = [
    'bubble-author',
    'font-author',
    'card-author',
    'theme-author',
    'music-author',
    'music-album-author'
  ];

  function fillSubmitAuthors(opts) {
    const name = getDisplayName();
    if (!name) return;
    const previous = opts && opts.previous ? String(opts.previous) : '';
    AUTHOR_FIELD_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const v = (el.value || '').trim();
      if (!v || (previous && v === previous)) el.value = name;
    });
  }

  async function refreshProfile() {
    profile = null;
    if (!client || !user) return null;
    let { data, error } = await client
      .from('profiles')
      .select('id, username, display_name, role, is_banned, bio, avatar_url, cover_url, created_at')
      .eq('id', user.id)
      .maybeSingle();
    if (error) {
      const fallback = await client
        .from('profiles')
        .select('id, username, display_name, role, is_banned, bio, avatar_url, created_at')
        .eq('id', user.id)
        .maybeSingle();
      if (fallback.error) {
        const bare = await client
          .from('profiles')
          .select('id, username, display_name, role, is_banned, avatar_url, created_at')
          .eq('id', user.id)
          .maybeSingle();
        if (bare.error) {
          console.warn('[SG] 读取资料失败', error);
          return null;
        }
        data = bare.data ? Object.assign({ bio: '', cover_url: null }, bare.data) : null;
      } else {
        data = fallback.data ? Object.assign({ cover_url: null }, fallback.data) : null;
      }
      error = null;
    }
    profile = data;
    fillSubmitAuthors();
    return profile;
  }

  function updateAuthUI() {
    const loginBtn = document.getElementById('auth-login-btn');
    const menu = document.getElementById('auth-user-menu');
    const toggle = document.getElementById('auth-account-toggle');
    const roleEl = document.getElementById('auth-role-badge');
    const adminTab = document.getElementById('nav-admin');
    const mineTab = document.getElementById('nav-mine');
    const setupBanner = document.getElementById('sg-setup-banner');

    if (setupBanner) {
      setupBanner.hidden = isConfigured();
    }

    if (!loginBtn || !menu) return;

    if (user) {
      loginBtn.hidden = true;
      menu.hidden = false;
      if (toggle) toggle.textContent = getDisplayName() || '用户';
      if (roleEl) {
        const name = (getDisplayName() || '').trim();
        if (profile && profile.role === 'owner') {
          // 昵称已是「站长」时不再重复显示徽章
          if (name === '站长') {
            roleEl.hidden = true;
            roleEl.textContent = '';
          } else {
            roleEl.hidden = false;
            roleEl.textContent = '站长';
          }
        } else if (profile && profile.role === 'moderator') {
          if (name === '管理' || name === '管理员') {
            roleEl.hidden = true;
            roleEl.textContent = '';
          } else {
            roleEl.hidden = false;
            roleEl.textContent = '管理';
          }
        } else {
          roleEl.hidden = true;
        }
      }
      if (mineTab) mineTab.hidden = false;
      if (adminTab) adminTab.hidden = !isStaff();
      const dmBtn = document.getElementById('auth-dm-btn');
      if (dmBtn) {
        dmBtn.hidden = !!(profile && profile.is_banned);
        dmBtn.textContent = profile && profile.role === 'owner' ? '私信箱' : '联系站长';
      }
      const redeemBtn = document.getElementById('auth-redeem-btn');
      if (redeemBtn) {
        // 邀请兑换是低频入口，已是管理员就不必再露出
        redeemBtn.hidden = !!(profile && (profile.role === 'owner' || profile.role === 'moderator'));
      }
      // 非管理员若停在管理页，会看到空白——自动回画廊
      const adminView = document.getElementById('admin-view');
      if (adminView && adminView.classList.contains('active') && !isStaff()) {
        switchMainTab('gallery');
      } else if (isStaff()) {
        updateAdminHead();
      }
    } else {
      loginBtn.hidden = false;
      menu.hidden = true;
      if (mineTab) mineTab.hidden = true;
      if (adminTab) adminTab.hidden = true;
      const accountMenu = document.getElementById('auth-account-menu');
      if (accountMenu) accountMenu.hidden = true;
      const adminView = document.getElementById('admin-view');
      const profileView = document.getElementById('profile-view');
      const mineView = document.getElementById('mine-view');
      if (
        (adminView && adminView.classList.contains('active')) ||
        (profileView && profileView.classList.contains('active')) ||
        (mineView && mineView.classList.contains('active'))
      ) {
        switchMainTab('gallery');
      }
    }
  }

  async function fetchPublicProfile(userId) {
    if (!client || !userId) return { error: '无效用户', data: null };
    let { data, error } = await client
      .from('profiles')
      .select('id, username, display_name, bio, avatar_url, cover_url, role, created_at, is_banned')
      .eq('id', userId)
      .maybeSingle();
    if (error) {
      const fallback = await client
        .from('profiles')
        .select('id, username, display_name, bio, avatar_url, role, created_at, is_banned')
        .eq('id', userId)
        .maybeSingle();
      if (fallback.error) {
        const bare = await client
          .from('profiles')
          .select('id, username, display_name, avatar_url, role, created_at, is_banned')
          .eq('id', userId)
          .maybeSingle();
        if (bare.error) return { error: error.message, data: null };
        data = bare.data ? Object.assign({ bio: '', cover_url: null }, bare.data) : null;
      } else {
        data = fallback.data ? Object.assign({ cover_url: null }, fallback.data) : null;
      }
      error = null;
    }
    if (!data) return { error: '用户不存在', data: null };
    return { data };
  }

  async function updateMyProfile(patch) {
    if (!isConfigured()) return { error: '未配置后端' };
    if (!user) return { error: '请先登录' };
    const next = {};
    if (typeof patch.display_name === 'string') {
      const name = patch.display_name.trim();
      if (!name) return { error: '昵称不能为空' };
      if (name.length > 40) return { error: '昵称最多 40 字' };
      next.display_name = name;
    }
    if (typeof patch.bio === 'string') {
      next.bio = patch.bio.replace(/\r\n/g, '\n').trim().slice(0, 500);
    }
    if (typeof patch.avatar_url === 'string') {
      const url = patch.avatar_url.trim();
      if (url && !/^https?:\/\//i.test(url)) return { error: '头像请使用 http(s) 外链' };
      next.avatar_url = url || null;
    }
    if (typeof patch.cover_url === 'string') {
      const url = patch.cover_url.trim();
      if (url && !/^https?:\/\//i.test(url)) return { error: '背景图请使用 http(s) 外链' };
      next.cover_url = url || null;
    }
    if (!Object.keys(next).length) return { error: '没有可保存的修改' };

    let { data, error } = await client
      .from('profiles')
      .update(next)
      .eq('id', user.id)
      .select('id, username, display_name, role, is_banned, bio, avatar_url, cover_url, created_at')
      .maybeSingle();
    if (error && next.cover_url !== undefined) {
      const withoutCover = Object.assign({}, next);
      delete withoutCover.cover_url;
      const retry = await client
        .from('profiles')
        .update(withoutCover)
        .eq('id', user.id)
        .select('id, username, display_name, role, is_banned, bio, avatar_url, created_at')
        .maybeSingle();
      if (!retry.error) {
        data = retry.data ? Object.assign({ cover_url: null }, retry.data) : null;
        error = null;
        toast('资料已保存；请先在数据库添加 cover_url 列后再设背景图', 4500);
      }
    }
    if (error) return { error: error.message };
    const previous = getDisplayName();
    profile = data || Object.assign({}, profile, next);
    fillSubmitAuthors({ previous });
    updateAuthUI();
    return { data: profile };
  }

  function galleryItemsForProfile(userId, authorName, identityNames) {
    const list = Array.isArray(window.ALL) ? window.ALL : [];
    const names = new Set(
      []
        .concat(identityNames || [])
        .concat(authorName ? [authorName] : [])
        .map((n) => String(n || '').trim())
        .filter(Boolean)
    );

    if (userId) {
      return list.filter((item) => {
        if (!item) return false;
        const credit = String(item.author || '匿名').trim();
        // 署名对得上：算这个人的作品
        if (names.size && names.has(credit)) return true;
        // 本人真实投稿：署名也属于自己，或署名为空/匿名时才按上传者归属
        // （避免站长代发/导入的「别人的署名」全堆进站长主页）
        if (item.submitterId === userId && !item.legacyId) {
          if (!credit || credit === '匿名') return true;
          if (names.size && names.has(credit)) return true;
          return false;
        }
        return false;
      });
    }

    const name = String(authorName || '').trim();
    if (!name) return [];
    return list.filter((item) => item && String(item.author || '匿名').trim() === name);
  }

  function typeLabelShort(type) {
    return (
      {
        bubble: '气泡',
        font: '字体',
        card: '字卡',
        theme: '主题',
        music: '音乐'
      }[type] || type || ''
    );
  }

  let profileState = { userId: null, authorName: null, isOwn: false };

  function showProfileEdit(show) {
    const box = document.getElementById('profile-edit');
    if (box) box.hidden = !show;
  }

  function renderProfileHero(info) {
    const hero = document.getElementById('profile-hero');
    if (!hero) return;
    const name = escapeHtml(info.name || '匿名');
    const initial = escapeHtml((info.name || '?').trim().slice(0, 1) || '?');
    const bio = info.bio
      ? '<p class="profile-bio">' + escapeHtml(info.bio) + '</p>'
      : '<p class="profile-bio muted">' + (info.localOnly ? '这位作者还没有留下简介。' : '还没写简介。') + '</p>';
    const avatar = info.avatarUrl
      ? '<img class="profile-avatar-img" src="' +
        escapeHtml(info.avatarUrl) +
        '" alt="" referrerpolicy="no-referrer">'
      : '<div class="profile-avatar-fallback">' + initial + '</div>';
    const role =
      info.role === 'owner'
        ? '<span class="profile-role">站长</span>'
        : info.role === 'moderator'
          ? '<span class="profile-role">管理</span>'
          : info.localOnly
            ? '<span class="profile-role ghost">署名</span>'
            : '';
    const joined = info.createdAt
      ? '<span class="profile-joined">加入于 ' + escapeHtml(new Date(info.createdAt).toLocaleDateString('zh-CN')) + '</span>'
      : info.localOnly
        ? '<span class="profile-joined">画廊署名作者</span>'
        : '';
    const banned = info.isBanned ? '<span class="profile-banned">已封禁</span>' : '';
    const editBtn = info.isOwn
      ? '<button type="button" class="profile-btn primary" id="profile-edit-toggle">编辑资料</button>'
      : '';
    const followBtn =
      !info.isOwn && info.userId && !info.localOnly
        ? '<button type="button" class="profile-btn ' +
          (info.isFollowing ? 'ghost' : 'primary') +
          '" id="profile-follow-btn" data-following="' +
          (info.isFollowing ? '1' : '0') +
          '">' +
          (info.isFollowing ? '取消关注' : '关注') +
          '</button>'
        : '';

    const coverClass = info.coverUrl ? 'profile-hero-banner has-cover' : 'profile-hero-banner';

    hero.innerHTML =
      '<div class="' +
      coverClass +
      '" aria-hidden="true"></div>' +
      '<div class="profile-hero-card">' +
      '<div class="profile-avatar">' +
      avatar +
      '</div>' +
      '<div class="profile-hero-main">' +
      '<div class="profile-name-row"><h2 class="profile-name">' +
      name +
      '</h2>' +
      role +
      banned +
      '</div>' +
      bio +
      '<div class="profile-meta-line">' +
      (joined || '') +
      '</div>' +
      '<div class="profile-stats">' +
      '<div class="profile-stat"><b>' +
      (info.workCount || 0) +
      '</b><span>作品</span></div>' +
      '<div class="profile-stat"><b>' +
      (info.likeTotal || 0) +
      '</b><span>获赞</span></div>' +
      '<div class="profile-stat"><b>' +
      (info.followers || 0) +
      '</b><span>粉丝</span></div>' +
      '<div class="profile-stat"><b>' +
      (info.following || 0) +
      '</b><span>关注</span></div>' +
      '</div>' +
      '<div class="profile-hero-actions">' +
      editBtn +
      followBtn +
      '</div></div></div>';

    if (info.coverUrl) {
      const banner = hero.querySelector('.profile-hero-banner');
      if (banner) banner.style.backgroundImage = 'url("' + String(info.coverUrl).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '")';
    }

    const toggle = document.getElementById('profile-edit-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const edit = document.getElementById('profile-edit');
        const opening = edit && edit.hidden;
        if (opening) {
          const nameInput = document.getElementById('profile-edit-name');
          const bioInput = document.getElementById('profile-edit-bio');
          const avatarInput = document.getElementById('profile-edit-avatar');
          const coverInput = document.getElementById('profile-edit-cover');
          if (nameInput) nameInput.value = info.name || '';
          if (bioInput) bioInput.value = info.bio || '';
          if (avatarInput) avatarInput.value = info.avatarUrl || '';
          if (coverInput) coverInput.value = info.coverUrl || '';
        }
        showProfileEdit(opening);
      });
    }

    const followEl = document.getElementById('profile-follow-btn');
    if (followEl) {
      followEl.addEventListener('click', async () => {
        if (!user) {
          openAuth('login');
          return;
        }
        followEl.disabled = true;
        const was = followEl.dataset.following === '1';
        const { error } = was ? await unfollowUser(info.userId) : await followUser(info.userId);
        followEl.disabled = false;
        if (error) {
          toast(error);
          return;
        }
        toast(was ? '已取消关注' : '✅ 已关注');
        await openProfile({ userId: info.userId });
      });
    }
  }

  function renderProfileWorks(items) {
    const box = document.getElementById('profile-works');
    const meta = document.getElementById('profile-works-meta');
    if (meta) meta.textContent = items.length ? items.length + ' 件' : '暂无';
    if (!box) return;
    if (!items.length) {
      box.innerHTML =
        '<div class="profile-works-empty">' +
        '<div class="profile-works-empty-ico" aria-hidden="true"></div>' +
        '<p>这里还空着</p><span>公开作品会显示在这里</span></div>';
      return;
    }
    const seen = new Set();
    const unique = [];
    items.forEach((item) => {
      const key = item.remoteId || item.id;
      if (seen.has(key)) return;
      seen.add(key);
      unique.push(item);
    });
    box.innerHTML = unique
      .map((item) => {
        const type = item.type || '';
        return (
          '<button type="button" class="profile-work-card type-' +
          escapeHtml(type) +
          '" data-item-id="' +
          escapeHtml(item.id) +
          '">' +
          '<span class="profile-work-mark" aria-hidden="true"></span>' +
          '<span class="profile-work-type">' +
          escapeHtml(typeLabelShort(type)) +
          '</span>' +
          '<strong class="profile-work-name">' +
          escapeHtml(item.name || '未命名') +
          '</strong>' +
          '<span class="profile-work-likes">♥ ' +
          (item.likeCount || 0) +
          '</span></button>'
        );
      })
      .join('');

    box.querySelectorAll('.profile-work-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.itemId;
        const item = (Array.isArray(window.ALL) ? window.ALL : []).find((x) => x.id === id);
        if (item && typeof window.openModal === 'function') window.openModal(item);
        else if (item && typeof openModal === 'function') openModal(item);
      });
    });
  }

  async function findProfileByAuthorName(name) {
    if (!client || !isConfigured() || !name) return null;
    const n = String(name).trim();
    if (!n || n === '匿名') return null;
    try {
      let { data, error } = await client
        .from('profiles')
        .select('id, username, display_name, bio, avatar_url, role, created_at, is_banned')
        .eq('display_name', n)
        .limit(2);
      if (error) return null;
      if (data && data.length === 1) return data[0];
      if (data && data.length > 1) {
        // 重名时不强行猜，走署名页
        return null;
      }
      const byUser = await client
        .from('profiles')
        .select('id, username, display_name, bio, avatar_url, role, created_at, is_banned')
        .eq('username', n)
        .maybeSingle();
      if (byUser.error) return null;
      return byUser.data || null;
    } catch (e) {
      return null;
    }
  }

  async function openProfile(opts) {
    let userId = opts && opts.userId ? opts.userId : null;
    const authorName = opts && opts.authorName ? String(opts.authorName).trim() : '';
    if (!userId && !authorName) {
      toast('无法打开主页');
      return;
    }

    // 点署名进入：先精确匹配同名账号；匹配不到就只按署名展示作品，绝不回落到当前登录用户
    if (!userId && authorName) {
      const matched = await findProfileByAuthorName(authorName);
      if (matched && matched.id) userId = matched.id;
    }

    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop && backdrop.classList.contains('open')) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (typeof window.SG_switchTab === 'function') window.SG_switchTab('profile');
    showProfileEdit(false);

    const hero = document.getElementById('profile-hero');
    const works = document.getElementById('profile-works');
    if (hero) hero.innerHTML = '<div class="profile-loading">加载中…</div>';
    if (works) works.innerHTML = '';

    const isOwn = !!(user && userId && user.id === userId);
    profileState = { userId: userId || null, authorName: authorName || null, isOwn };

    let info = {
      userId: userId || null,
      name: authorName || '匿名',
      bio: '',
      avatarUrl: '',
      coverUrl: '',
      role: 'user',
      createdAt: null,
      isBanned: false,
      isOwn: false,
      localOnly: !userId,
      isFollowing: false,
      followers: 0,
      following: 0,
      workCount: 0,
      likeTotal: 0
    };

    if (userId) {
      if (!isConfigured()) {
        if (hero) hero.innerHTML = '<div class="admin-empty">未配置后端，无法加载账号主页</div>';
        return;
      }
      const { data, error } = await fetchPublicProfile(userId);
      if (error || !data) {
        // 账号加载失败时，若有署名则退回署名页，避免停在上一次的站长主页
        if (authorName) {
          userId = null;
          profileState = { userId: null, authorName, isOwn: false };
          info = {
            userId: null,
            name: authorName,
            bio: '',
            avatarUrl: '',
            coverUrl: '',
            role: 'user',
            createdAt: null,
            isBanned: false,
            isOwn: false,
            localOnly: true,
            isFollowing: false,
            followers: 0,
            following: 0,
            workCount: 0,
            likeTotal: 0
          };
        } else {
          if (hero) hero.innerHTML = '<div class="admin-empty">' + escapeHtml(error || '加载失败') + '</div>';
          return;
        }
      } else {
        const counts = await getFollowCounts(userId);
        info = {
          userId,
          name: data.display_name || data.username || '用户',
          username: data.username || '',
          bio: data.bio || '',
          avatarUrl: data.avatar_url || '',
          coverUrl: data.cover_url || '',
          role: data.role,
          createdAt: data.created_at,
          isBanned: !!data.is_banned,
          isOwn,
          localOnly: false,
          isFollowing: isFollowing(userId),
          followers: counts.followers,
          following: counts.following,
          workCount: 0,
          likeTotal: 0
        };
      }
    }

    const items = galleryItemsForProfile(
      userId,
      authorName || info.name,
      userId ? [info.name, info.username, authorName].filter(Boolean) : []
    );
    const seenRemote = new Set();
    const uniqueItems = [];
    items.forEach((item) => {
      const key = item.remoteId || item.id;
      if (seenRemote.has(key)) return;
      seenRemote.add(key);
      uniqueItems.push(item);
    });
    info.workCount = uniqueItems.length;
    info.likeTotal = uniqueItems.reduce((sum, item) => sum + (item.likeCount || 0), 0);

    renderProfileHero(info);
    renderProfileWorks(uniqueItems);
  }

  async function openMyProfile() {
    if (!user) {
      openAuth('login');
      return;
    }
    await openProfile({ userId: user.id });
  }

  function openAuth(mode) {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('open');
    setAuthMode(mode === 'signup' ? 'signup' : 'login');
    const err = document.getElementById('auth-error');
    if (err) {
      err.hidden = true;
      err.textContent = '';
    }
  }

  function closeAuth() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('open');
  }

  function setAuthMode(mode) {
    const isSignup = mode === 'signup';
    const title = document.getElementById('auth-modal-title');
    const submit = document.getElementById('auth-submit-btn');
    const switchBtn = document.getElementById('auth-switch-btn');
    const nameWrap = document.getElementById('auth-name-wrap');
    if (title) title.textContent = isSignup ? '注册账号' : '登录';
    if (submit) {
      submit.textContent = isSignup ? '注册' : '登录';
      submit.dataset.mode = isSignup ? 'signup' : 'login';
    }
    if (switchBtn) {
      switchBtn.textContent = isSignup ? '已有账号？去登录' : '没有账号？去注册';
      switchBtn.dataset.mode = isSignup ? 'login' : 'signup';
    }
    if (nameWrap) nameWrap.hidden = !isSignup;
  }

  function showAuthError(msg) {
    const err = document.getElementById('auth-error');
    if (!err) {
      toast(msg);
      return;
    }
    err.hidden = false;
    err.textContent = msg;
  }

  async function handleAuthSubmit() {
    if (!isConfigured()) {
      showAuthError('请先在 config.js 里填写 Supabase 地址和密钥');
      return;
    }
    const email = (document.getElementById('auth-email') || {}).value?.trim() || '';
    const password = (document.getElementById('auth-password') || {}).value || '';
    const displayName = (document.getElementById('auth-display-name-input') || {}).value?.trim() || '';
    const mode = (document.getElementById('auth-submit-btn') || {}).dataset?.mode || 'login';

    if (!email || !password) {
      showAuthError('请填写邮箱和密码');
      return;
    }
    if (password.length < 6) {
      showAuthError('密码至少 6 位');
      return;
    }

    const btn = document.getElementById('auth-submit-btn');
    if (btn) btn.disabled = true;

    try {
      if (mode === 'signup') {
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName || email.split('@')[0] }
          }
        });
        if (error) throw error;
        if (data.session) {
          toast('✅ 注册成功，已登录');
          closeAuth();
        } else {
          toast('📧 注册成功，请去邮箱点确认链接后再登录', 5000);
          setAuthMode('login');
        }
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast('✅ 登录成功');
        closeAuth();
      }
    } catch (e) {
      showAuthError(e.message || '登录失败');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  async function signOut() {
    if (!client) return;
    await client.auth.signOut();
    toast('已退出登录');
  }

  async function submitItems(rows) {
    if (!isConfigured()) return { error: '未配置 Supabase' };
    if (!user) return { error: '请先登录' };
    if (profile && profile.is_banned) return { error: '账号已被封禁，无法投稿' };

    const payload = rows.map((row) =>
      Object.assign({}, row, {
        status: 'pending',
        submitter_id: user.id
      })
    );

    const { data, error } = await client.from('items').insert(payload).select('id');
    if (error) return { error: error.message || '写入失败' };
    return { data };
  }

  async function loadPending() {
    if (!isConfigured() || !isStaff()) return { error: '无权限', data: [] };
    const { data, error } = await client
      .from('items')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (error) return { error: error.message, data: [] };
    return { data: data || [] };
  }

  let mineTab = 'pending';

  async function loadMyItems(status) {
    if (!isConfigured()) return { error: '未配置后端', data: [] };
    if (!user) return { error: '请先登录', data: [] };
    const st = status || mineTab || 'pending';
    let query = client
      .from('items')
      .select('*')
      .eq('submitter_id', user.id)
      .eq('status', st)
      .order('created_at', { ascending: false });
    if (st === 'approved') {
      query = query.is('deleted_at', null);
    }
    const { data, error } = await query;
    if (error) {
      if (st === 'approved') {
        const fallback = await client
          .from('items')
          .select('*')
          .eq('submitter_id', user.id)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        if (fallback.error) return { error: fallback.error.message, data: [] };
        return { data: (fallback.data || []).filter((row) => !row.deleted_at) };
      }
      return { error: error.message, data: [] };
    }
    return { data: data || [] };
  }

  function statusLabelMine(st) {
    return ({ pending: '待审', approved: '已通过', rejected: '被拒', removed: '已下架' }[st] || st || '');
  }

  function deskEmptyHTML(msg) {
    return (
      '<div class="desk-empty">' +
      '<span class="desk-empty-mark" aria-hidden="true"></span>' +
      '<p class="desk-empty-text">' +
      escapeHtml(msg) +
      '</p></div>'
    );
  }

  function updateMineHead() {
    const title = document.getElementById('mine-title');
    const sub = document.getElementById('mine-sub');
    const map = {
      pending: ['待审投稿', '已提交、等待审核的作品。通过后会出现在画廊与个人主页。'],
      approved: ['已通过', '已上架的作品。可打开画廊查看详情。'],
      rejected: ['被拒投稿', '未通过审核的作品，以及站长留下的原因。']
    };
    const t = map[mineTab] || map.pending;
    if (title) title.textContent = t[0];
    if (sub) sub.textContent = t[1];
    document.querySelectorAll('[data-mine-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mineTab === mineTab);
    });
  }

  async function renderMineList() {
    const box = document.getElementById('mine-list');
    if (!box) return;
    updateMineHead();

    if (!isConfigured()) {
      box.innerHTML = deskEmptyHTML('未配置后端');
      return;
    }
    if (!user) {
      box.innerHTML = deskEmptyHTML('请先登录后查看投稿');
      return;
    }

    box.innerHTML = deskEmptyHTML('加载中…');
    const { data, error } = await loadMyItems(mineTab);
    if (error) {
      box.innerHTML = deskEmptyHTML('加载失败：' + error);
      return;
    }
    if (!data.length) {
      const emptyHint =
        mineTab === 'pending'
          ? '暂无待审投稿。去「投稿」提交新作品吧。'
          : mineTab === 'approved'
            ? '还没有已通过的作品。'
            : '没有被拒的投稿。';
      box.innerHTML = deskEmptyHTML(emptyHint);
      return;
    }

    await fetchProfilesByIds(data.map((item) => item.reviewer_id).filter(Boolean));

    box.innerHTML = data
      .map((item) => {
        const warns = Array.isArray(item.warnings) ? item.warnings : [];
        const warnText = warns.length
          ? warns
              .map((w) => {
                const def = warningDefs().find((d) => d.id === w);
                return def ? def.label : w;
              })
              .join(' · ')
          : '';
        const reviewerProf = item.reviewer_id ? profileCache.get(String(item.reviewer_id)) : null;
        const reviewText =
          (mineTab === 'approved' || mineTab === 'rejected') && reviewerProf
            ? formatReviewerText(reviewerProf, item.reviewed_at)
            : (mineTab === 'approved' || mineTab === 'rejected') && item.reviewer_id
              ? '审核 · 已记录'
              : '';
        const metaBits = [
          typeLabel(item.type),
          item.author_name || '匿名',
          item.created_at ? new Date(item.created_at).toLocaleString() : '',
          mineTab === 'approved' ? '♥ ' + (item.like_count || 0) : '',
          reviewText
        ].filter(Boolean);
        const reason =
          mineTab === 'rejected' && item.reject_reason
            ? '<p class="mine-reject desk-reject">' + escapeHtml(item.reject_reason) + '</p>'
            : '';
        const actions =
          mineTab === 'approved'
            ? '<div class="admin-actions desk-actions"><button type="button" class="admin-btn ok" data-mine-act="open" data-remote-id="' +
              escapeHtml(item.id) +
              '">在画廊查看</button></div>'
            : '';
        const desc = item.description
          ? '<p class="admin-desc desk-desc">' + escapeHtml(String(item.description).slice(0, 160)) + '</p>'
          : '';
        return (
          '<article class="admin-card desk-card mine-card" data-id="' +
          escapeHtml(item.id) +
          '" data-type="' +
          escapeHtml(item.type || '') +
          '">' +
          '<div class="desk-card-rail" aria-hidden="true"></div>' +
          '<div class="desk-card-body">' +
          '<div class="desk-card-top">' +
          '<div class="desk-card-heading">' +
          '<h3>' +
          escapeHtml(item.name || '未命名') +
          '</h3>' +
          '<div class="desk-card-meta">' +
          metaBits.map((m) => '<span>' + escapeHtml(m) + '</span>').join('') +
          (warnText ? '<span class="desk-warn-chip">预警 · ' + escapeHtml(warnText) + '</span>' : '') +
          '</div></div>' +
          '<span class="mine-status desk-badge desk-badge-' +
          escapeHtml(mineTab) +
          '">' +
          escapeHtml(statusLabelMine(mineTab)) +
          '</span></div>' +
          desc +
          reason +
          actions +
          '</div></article>'
        );
      })
      .join('');
  }

  async function setItemStatus(id, status, rejectReason, warnings, opts) {
    if (!isConfigured() || !isStaff()) return { error: '无权限' };
    const patch = {
      status,
      reviewer_id: user.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    if (status === 'rejected') patch.reject_reason = rejectReason || '';
    if (status === 'removed') {
      patch.deleted_at = new Date().toISOString();
      patch.deleted_by = user.id;
    }
    if (status === 'approved') {
      patch.deleted_at = null;
      patch.deleted_by = null;
    }
    if (Array.isArray(warnings)) patch.warnings = warnings;
    const { error } = await client.from('items').update(patch).eq('id', id);
    if (error) return { error: error.message };
    const skipGallery = opts && opts.skipGalleryReload;
    if (!skipGallery && (status === 'approved' || status === 'removed')) {
      await loadApprovedIntoGallery();
    }
    return {};
  }

  async function batchSetItemStatus(entries, status, rejectReason) {
    if (!isConfigured() || !isStaff()) return { error: '无权限', ok: 0, fail: 0 };
    let ok = 0;
    let fail = 0;
    const errors = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const { error } = await setItemStatus(
        entry.id,
        status,
        rejectReason,
        entry.warnings,
        { skipGalleryReload: true }
      );
      if (error) {
        fail += 1;
        errors.push(error);
      } else {
        ok += 1;
      }
    }
    if (status === 'approved' || status === 'removed') {
      await loadApprovedIntoGallery();
    }
    return { ok, fail, error: fail ? errors[0] : null };
  }

  async function softDeleteItem(id, reason) {
    return setItemStatus(id, 'removed', reason || '管理员删除', null);
  }

  async function updateItemWarnings(id, warnings) {
    if (!isConfigured() || !isStaff()) return { error: '无权限' };
    if (!id) return { error: '无效作品' };
    const patch = {
      warnings: Array.isArray(warnings) ? warnings.filter((w) => w !== 'pair') : [],
      updated_at: new Date().toISOString()
    };
    const { error } = await client.from('items').update(patch).eq('id', id);
    if (error) return { error: error.message };
    await loadApprovedIntoGallery();
    return {};
  }

  async function restoreItem(id) {
    return setItemStatus(id, 'approved', '', null);
  }

  async function loadRecycleBin() {
    if (!isStaff()) return { error: '无权限', data: [] };
    const { data, error } = await client
      .from('items')
      .select('*')
      .eq('status', 'removed')
      .order('deleted_at', { ascending: false });
    if (error) return { error: error.message, data: [] };
    return { data: data || [] };
  }

  async function purgeExpiredDeleted() {
    if (!isStaff()) return { error: '无权限' };
    const before = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
    const { data, error } = await client
      .from('items')
      .delete()
      .eq('status', 'removed')
      .lt('deleted_at', before)
      .select('id');
    if (error) return { error: error.message };
    return { data: data || [] };
  }

  function daysLeftInBin(deletedAt) {
    if (!deletedAt) return 0;
    const end = new Date(deletedAt).getTime() + 7 * 24 * 3600 * 1000;
    return Math.max(0, Math.ceil((end - Date.now()) / (24 * 3600 * 1000)));
  }

  function typeLabel(t) {
    return (
      {
        bubble: '气泡',
        font: '字体',
        card: '字卡',
        theme: '主题',
        music: '音乐'
      }[t] || t
    );
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const profileCache = new Map();

  function staffRoleLabel(role) {
    if (role === 'owner') return '站长';
    if (role === 'moderator') return '管理';
    return '成员';
  }

  function currentStaffLabel() {
    if (!profile) return '';
    const role = staffRoleLabel(profile.role);
    const name = getDisplayName() || '未命名';
    return role + ' · ' + name;
  }

  function formatReviewerText(prof, reviewedAt) {
    if (!prof) return '';
    const role = staffRoleLabel(prof.role);
    const name = prof.display_name || prof.username || '未知';
    const when = reviewedAt ? new Date(reviewedAt).toLocaleString() : '';
    return '审核 · ' + role + ' ' + name + (when ? ' · ' + when : '');
  }

  async function fetchProfilesByIds(ids) {
    const uniq = [...new Set((ids || []).filter(Boolean).map(String))];
    const missing = uniq.filter((id) => !profileCache.has(id));
    if (missing.length && client) {
      const { data, error } = await client
        .from('profiles')
        .select('id, display_name, username, role')
        .in('id', missing);
      if (!error) {
        (data || []).forEach((p) => profileCache.set(String(p.id), p));
      }
      missing.forEach((id) => {
        if (!profileCache.has(id)) profileCache.set(id, null);
      });
    }
    return uniq.map((id) => profileCache.get(id) || null);
  }

  let blockedIds = new Set();
  let adminTab = 'pending';
  let pendingTypeFilter = 'all';
  let dmPeerId = null;
  let ownerProfileCache = null;

  async function getOwnerProfile() {
    if (!client) return null;
    if (ownerProfileCache) return ownerProfileCache;
    const { data, error } = await client
      .from('profiles')
      .select('id, display_name, username, role')
      .eq('role', 'owner')
      .limit(1)
      .maybeSingle();
    if (error || !data) {
      console.warn('[SG] 未找到站长资料', error);
      return null;
    }
    ownerProfileCache = data;
    return data;
  }

  async function loadDmThread(peerId, hubId) {
    if (!client || !user || !peerId) return { error: '请先登录', data: [] };
    const hub = hubId || user.id;
    const { data, error } = await client
      .from('messages')
      .select(
        'id, sender_id, recipient_id, body, created_at, read_at, sender:profiles!messages_sender_id_fkey(id, display_name, username)'
      )
      .or(
        'and(sender_id.eq.' +
          hub +
          ',recipient_id.eq.' +
          peerId +
          '),and(sender_id.eq.' +
          peerId +
          ',recipient_id.eq.' +
          hub +
          ')'
      )
      .order('created_at', { ascending: true })
      .limit(200);
    if (error) return { error: error.message, data: [] };
    return { data: data || [] };
  }

  async function markDmRead(peerId, hubId) {
    if (!client || !user || !peerId) return;
    const recipient = hubId || user.id;
    await client
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('recipient_id', recipient)
      .eq('sender_id', peerId)
      .is('read_at', null);
  }

  async function sendDm(recipientId, body) {
    if (!client || !user) return { error: '请先登录' };
    if (profile && profile.is_banned) return { error: '账号已封禁，无法发私信' };
    const text = String(body || '').trim();
    if (!text) return { error: '请输入内容' };
    if (text.length > 1000) return { error: '最多 1000 字' };
    if (!recipientId || recipientId === user.id) return { error: '无效收件人' };
    const { error } = await client.from('messages').insert({
      sender_id: user.id,
      recipient_id: recipientId,
      body: text
    });
    if (error) return { error: error.message };
    return {};
  }

  async function loadDmInbox() {
    if (!client || !user || !isStaff()) return { error: '无权限', data: [] };
    const owner = await getOwnerProfile();
    if (!owner) return { error: '未找到站长', data: [] };
    const hubId = owner.id;
    const { data, error } = await client
      .from('messages')
      .select(
        'id, sender_id, recipient_id, body, created_at, read_at, sender:profiles!messages_sender_id_fkey(id, display_name, username), recipient:profiles!messages_recipient_id_fkey(id, display_name, username)'
      )
      .or('sender_id.eq.' + hubId + ',recipient_id.eq.' + hubId)
      .order('created_at', { ascending: false })
      .limit(400);
    if (error) return { error: error.message, data: [] };

    const map = new Map();
    (data || []).forEach((m) => {
      const peerId = m.sender_id === hubId ? m.recipient_id : m.sender_id;
      if (!peerId || peerId === hubId) return;
      const peer =
        m.sender_id === peerId
          ? m.sender
          : m.recipient_id === peerId
            ? m.recipient
            : null;
      const existing = map.get(peerId);
      const unread = m.recipient_id === hubId && !m.read_at ? 1 : 0;
      if (!existing) {
        map.set(peerId, {
          peerId,
          peerName: (peer && (peer.display_name || peer.username)) || peerId.slice(0, 8),
          lastBody: m.body,
          lastAt: m.created_at,
          unread
        });
      } else {
        existing.unread += unread;
      }
    });
    return { data: [...map.values()] };
  }

  function renderDmBubbles(list) {
    if (!list.length) {
      return (
        '<div class="dm-thread-empty">' +
        '<span class="dm-thread-empty-mark" aria-hidden="true"></span>' +
        '<p>还没有消息</p>' +
        '<p class="dm-thread-empty-sub">打个招呼，或说说需要站长帮忙的事。</p>' +
        '</div>'
      );
    }
    return list
      .map((m) => {
        const mine = m.sender_id === (user && user.id);
        const name =
          (m.sender && (m.sender.display_name || m.sender.username)) ||
          (mine ? '我' : '站长');
        const time = m.created_at ? new Date(m.created_at).toLocaleString() : '';
        return (
          '<div class="dm-bubble' +
          (mine ? ' mine' : ' theirs') +
          '"><div class="dm-bubble-meta">' +
          '<span class="dm-bubble-name">' +
          escapeHtml(name) +
          '</span>' +
          (time ? '<time>' + escapeHtml(time) + '</time>' : '') +
          '</div><div class="dm-bubble-body">' +
          escapeHtml(m.body) +
          '</div></div>'
        );
      })
      .join('');
  }

  async function refreshDmThreadEl(threadEl, peerId, hubId) {
    if (!threadEl || !peerId) return;
    threadEl.innerHTML =
      '<div class="dm-thread-empty"><p>加载中…</p></div>';
    const { data, error } = await loadDmThread(peerId, hubId);
    if (error) {
      threadEl.innerHTML =
        '<div class="dm-thread-empty"><p>加载失败：' +
        escapeHtml(error) +
        '</p><p class="dm-thread-empty-sub">请确认 messages 相关表已建好。</p></div>';
      return;
    }
    await markDmRead(peerId, hubId);
    threadEl.innerHTML = renderDmBubbles(data);
    threadEl.scrollTop = threadEl.scrollHeight;
  }

  function openDmModal() {
    const modal = document.getElementById('dm-modal');
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
  }

  function closeDmModal() {
    const modal = document.getElementById('dm-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
  }

  async function openOwnerDm() {
    if (!isConfigured()) {
      toast('未配置后端');
      return;
    }
    if (!user) {
      openAuth('login');
      return;
    }
    if (profile && profile.role === 'owner') {
      toast('站长请到管理后台「私信」查看与回复');
      switchMainTab('admin');
      adminTab = 'messages';
      dmPeerId = null;
      renderAdminList();
      return;
    }
    const owner = await getOwnerProfile();
    if (!owner) {
      toast('暂时找不到站长账号');
      return;
    }
    dmPeerId = owner.id;
    openDmModal();
    const thread = document.getElementById('dm-thread');
    await refreshDmThreadEl(thread, owner.id);
  }

  async function likeItem(remoteId) {
    if (!client || !user) return { error: '请先登录' };
    const { error } = await client.from('likes').insert({ user_id: user.id, item_id: remoteId });
    if (error && error.code !== '23505') return { error: error.message };
    return {};
  }

  async function unlikeItem(remoteId) {
    if (!client || !user) return { error: '请先登录' };
    const { error } = await client.from('likes').delete().eq('user_id', user.id).eq('item_id', remoteId);
    if (error) return { error: error.message };
    return {};
  }

  async function syncLikesFromCloud() {
    if (!client || !user) return;
    const { data, error } = await client.from('likes').select('item_id').eq('user_id', user.id);
    if (error) {
      console.warn('[SG] 同步喜欢失败', error);
      return;
    }
    const remoteFavs = (data || []).map((r) => 'remote-' + r.item_id);
    if (typeof window.SG_mergeRemoteFavs === 'function') {
      window.SG_mergeRemoteFavs(remoteFavs);
    }
  }

  async function reportItem(remoteId, reason, detail, commentId) {
    if (!client || !user) return { error: '请先登录' };
    if (!reason) return { error: '请填写原因' };
    const row = {
      reporter_id: user.id,
      item_id: remoteId,
      reason,
      detail: detail || null,
      status: 'open'
    };
    if (commentId) row.comment_id = commentId;
    const { error } = await client.from('reports').insert(row);
    if (error) return { error: error.message };
    return {};
  }

  let followingIds = new Set();

  async function loadFollows() {
    followingIds = new Set();
    if (!client || !user) return;
    const { data, error } = await client.from('follows').select('following_id').eq('follower_id', user.id);
    if (error) {
      console.warn('[SG] 读取关注失败', error);
      return;
    }
    (data || []).forEach((r) => followingIds.add(r.following_id));
  }

  function isFollowing(userId) {
    return !!(userId && followingIds.has(userId));
  }

  async function followUser(targetUserId) {
    if (!client || !user) return { error: '请先登录' };
    if (!targetUserId) return { error: '无法关注' };
    if (targetUserId === user.id) return { error: '不能关注自己' };
    if (profile && profile.is_banned) return { error: '账号已被封禁' };
    const { error } = await client.from('follows').insert({
      follower_id: user.id,
      following_id: targetUserId
    });
    if (error && error.code !== '23505') return { error: error.message };
    followingIds.add(targetUserId);
    return {};
  }

  async function unfollowUser(targetUserId) {
    if (!client || !user) return { error: '请先登录' };
    const { error } = await client
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId);
    if (error) return { error: error.message };
    followingIds.delete(targetUserId);
    return {};
  }

  async function getFollowCounts(userId) {
    if (!client || !userId) return { followers: 0, following: 0 };
    const [a, b] = await Promise.all([
      client.from('follows').select('follower_id', { count: 'exact', head: true }).eq('following_id', userId),
      client.from('follows').select('following_id', { count: 'exact', head: true }).eq('follower_id', userId)
    ]);
    return {
      followers: a.count || 0,
      following: b.count || 0
    };
  }

  async function loadComments(itemId) {
    if (!client || !itemId) return { error: '无效作品', data: [] };
    const { data, error } = await client
      .from('comments')
      .select('id, item_id, user_id, body, created_at, profiles:user_id(display_name, username, avatar_url)')
      .eq('item_id', itemId)
      .is('deleted_at', null)
      .order('created_at', { ascending: true });
    if (error) {
      const fallback = await client
        .from('comments')
        .select('id, item_id, user_id, body, created_at')
        .eq('item_id', itemId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });
      if (fallback.error) return { error: fallback.error.message, data: [] };
      return { data: fallback.data || [] };
    }
    return { data: data || [] };
  }

  async function postComment(itemId, body) {
    if (!client || !user) return { error: '请先登录' };
    if (profile && profile.is_banned) return { error: '账号已被封禁' };
    const text = String(body || '').trim();
    if (!text) return { error: '请输入评论' };
    if (text.length > 500) return { error: '评论最多 500 字' };
    const { data, error } = await client
      .from('comments')
      .insert({ item_id: itemId, user_id: user.id, body: text })
      .select('id, item_id, user_id, body, created_at')
      .maybeSingle();
    if (error) return { error: error.message };
    return { data };
  }

  async function deleteComment(commentId) {
    if (!client || !user) return { error: '请先登录' };
    const { error } = await client
      .from('comments')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.id })
      .eq('id', commentId);
    if (error) return { error: error.message };
    return {};
  }

  async function reportComment(itemId, commentId, reason, detail) {
    return reportItem(itemId, reason || '不当评论', detail, commentId);
  }

  async function adminDeleteUser(targetUserId) {
    if (!isConfigured() || !isStaff()) return { error: '无权限' };
    if (!targetUserId) return { error: '无效用户' };
    const { data, error } = await client.rpc('admin_delete_user', { target_id: targetUserId });
    if (error) return { error: error.message };
    await loadApprovedIntoGallery();
    return { data };
  }

  async function mountStaffPanel(container, item) {
    if (!container) return;
    let host = container.querySelector('#sg-staff-panel');
    if (host) host.remove();
    if (!item || !item.remoteId || !isStaff()) return;

    host = document.createElement('details');
    host.id = 'sg-staff-panel';
    host.className = 'sg-staff-panel';
    const currentWarns = Array.isArray(item.warnings) ? item.warnings : [];
    const myRole = staffRoleLabel(profile && profile.role);
    let reviewLine = '';
    if (item.reviewerId) {
      await fetchProfilesByIds([item.reviewerId]);
      const rp = profileCache.get(String(item.reviewerId));
      reviewLine = formatReviewerText(rp, item.reviewedAt);
    }
    host.innerHTML =
      '<summary class="sg-staff-summary"><span>' +
      escapeHtml(myRole) +
      '工具</span><small>预警与下架</small></summary>' +
      '<div class="sg-staff-body">' +
      (reviewLine
        ? '<p class="sg-staff-reviewer">' + escapeHtml(reviewLine) + '</p>'
        : '<p class="sg-staff-reviewer muted">尚未记录审核人（旧数据或未走审核流）</p>') +
      '<div class="sg-toggle-row sg-staff-warns">' +
      warningDefs()
        .map((w) => {
          const on = currentWarns.includes(w.id);
          return (
            '<button type="button" class="sg-toggle' +
            (on ? ' on' : '') +
            '" data-staff-warn-id="' +
            w.id +
            '" aria-pressed="' +
            (on ? 'true' : 'false') +
            '">' +
            escapeHtml(w.label) +
            '</button>'
          );
        })
        .join('') +
      '</div>' +
      '<div class="sg-staff-actions">' +
      '<button type="button" class="admin-btn ok" data-staff-act="save-warns">保存预警</button>' +
      '<button type="button" class="admin-btn no" data-staff-act="unpublish">下架</button>' +
      '</div></div>';

    const tools = container.querySelector('.modal-tools');
    const comments = container.querySelector('#sg-comments');
    if (comments) container.insertBefore(host, comments);
    else if (tools && tools.nextSibling) container.insertBefore(host, tools.nextSibling);
    else container.appendChild(host);

    host.querySelectorAll('.sg-toggle[data-staff-warn-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('aria-pressed') !== 'true';
        btn.classList.toggle('on', next);
        btn.setAttribute('aria-pressed', next ? 'true' : 'false');
      });
    });

    host.querySelectorAll('[data-staff-act]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const act = btn.dataset.staffAct;
        btn.disabled = true;
        if (act === 'save-warns') {
          const warns = [...host.querySelectorAll('.sg-toggle[data-staff-warn-id][aria-pressed="true"]')].map(
            (el) => el.dataset.staffWarnId
          );
          const { error } = await updateItemWarnings(item.remoteId, warns);
          btn.disabled = false;
          if (error) {
            toast('保存失败：' + error);
            return;
          }
          item.warnings = warns;
          if (window.currentModalItem && window.currentModalItem.remoteId === item.remoteId) {
            window.currentModalItem.warnings = warns;
          }
          toast('预警已更新');
          return;
        }
        if (act === 'unpublish') {
          const ok = window.confirm(
            '下架「' + (item.name || '') + '」并移入回收站？7 天内可在管理后台恢复。'
          );
          if (!ok) {
            btn.disabled = false;
            return;
          }
          const { error } = await softDeleteItem(item.remoteId, '预览页下架');
          btn.disabled = false;
          if (error) {
            toast('下架失败：' + error);
            return;
          }
          toast('已下架并进入回收站');
          const backdrop = document.getElementById('modal-backdrop');
          if (backdrop) backdrop.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }

  async function mountComments(container, item) {
    if (!container) return;
    let host = container.querySelector('#sg-comments');
    if (host) host.remove();
    host = document.createElement('section');
    host.id = 'sg-comments';
    host.className = 'sg-comments';
    container.appendChild(host);

    if (!item || !item.remoteId) {
      host.innerHTML = '<div class="sg-comments-empty">本地旧作品暂不支持评论</div>';
      return;
    }
    if (!isConfigured()) {
      host.innerHTML = '<div class="sg-comments-empty">未配置后端，无法评论</div>';
      return;
    }

    host.innerHTML =
      '<div class="sg-comments-head"><h3 class="sg-comments-title">评论</h3><span class="sg-comments-count" id="sg-comments-count"></span></div>' +
      '<div class="sg-comments-list" id="sg-comments-list"><div class="sg-comments-empty">加载中…</div></div>' +
      '<div class="sg-comments-compose">' +
      '<textarea class="sg-comment-input" id="sg-comment-input" rows="2" maxlength="500" placeholder="说点什么（登录后可发）"></textarea>' +
      '<button type="button" class="sg-comment-send" id="sg-comment-send">发送</button>' +
      '</div>';

    const listEl = host.querySelector('#sg-comments-list');
    const countEl = host.querySelector('#sg-comments-count');
    const input = host.querySelector('#sg-comment-input');
    const sendBtn = host.querySelector('#sg-comment-send');

    async function refresh() {
      const { data, error } = await loadComments(item.remoteId);
      if (error) {
        listEl.innerHTML = '<div class="sg-comments-empty">加载失败：' + escapeHtml(error) + '</div>';
        return;
      }
      if (countEl) countEl.textContent = data.length ? data.length + ' 条' : '';
      if (!data.length) {
        listEl.innerHTML = '<div class="sg-comments-empty">还没有评论，来抢沙发吧</div>';
        return;
      }
      listEl.innerHTML = data
        .map((c) => {
          const author =
            (c.profiles && (c.profiles.display_name || c.profiles.username)) ||
            '用户';
          const initial = String(author).trim().slice(0, 1) || '用';
          const canDel = !!(user && (user.id === c.user_id || isStaff()));
          return (
            '<article class="sg-comment" data-comment-id="' +
            escapeHtml(c.id) +
            '"><div class="sg-comment-avatar" aria-hidden="true">' +
            escapeHtml(initial) +
            '</div><div class="sg-comment-main"><div class="sg-comment-top"><button type="button" class="sg-comment-author" data-profile-id="' +
            escapeHtml(c.user_id) +
            '">' +
            escapeHtml(author) +
            '</button><time>' +
            escapeHtml(c.created_at ? new Date(c.created_at).toLocaleString() : '') +
            '</time></div><p class="sg-comment-body">' +
            escapeHtml(c.body) +
            '</p><div class="sg-comment-actions">' +
            (user
              ? '<button type="button" class="sg-comment-act" data-c-act="report">举报</button>'
              : '') +
            (canDel ? '<button type="button" class="sg-comment-act danger" data-c-act="delete">删除</button>' : '') +
            '</div></div></article>'
          );
        })
        .join('');

      listEl.querySelectorAll('[data-profile-id]').forEach((btn) => {
        btn.addEventListener('click', () => openProfile({ userId: btn.dataset.profileId }));
      });
      listEl.querySelectorAll('[data-c-act]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const card = btn.closest('.sg-comment');
          const cid = card && card.dataset.commentId;
          if (!cid) return;
          if (btn.dataset.cAct === 'delete') {
            const ok = window.confirm('删除这条评论？');
            if (!ok) return;
            const { error: err } = await deleteComment(cid);
            if (err) toast('删除失败：' + err);
            else {
              toast('已删除');
              refresh();
            }
          } else if (btn.dataset.cAct === 'report') {
            if (!user) {
              openAuth('login');
              return;
            }
            const reason = window.prompt('举报原因', '不当评论');
            if (!reason) return;
            const detail = window.prompt('补充说明（可留空）', '') || '';
            const { error: err } = await reportComment(item.remoteId, cid, reason, detail);
            if (err) toast('举报失败：' + err);
            else toast('✅ 已提交举报');
          }
        });
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', async () => {
        if (!user) {
          openAuth('login');
          return;
        }
        sendBtn.disabled = true;
        const { error } = await postComment(item.remoteId, input && input.value);
        sendBtn.disabled = false;
        if (error) {
          toast(error);
          return;
        }
        if (input) input.value = '';
        toast('✅ 已发送');
        refresh();
      });
    }

    refresh();
  }

  async function loadBlocks() {
    blockedIds = new Set();
    if (!client || !user) return;
    const { data, error } = await client.from('blocks').select('blocked_id').eq('blocker_id', user.id);
    if (error) {
      console.warn('[SG] 读取拉黑失败', error);
      return;
    }
    (data || []).forEach((r) => blockedIds.add(r.blocked_id));
  }

  function isAuthorBlocked(item) {
    if (!item || !item.submitterId) return false;
    return blockedIds.has(item.submitterId);
  }

  async function blockUser(targetUserId) {
    if (!client || !user) return { error: '请先登录' };
    if (!targetUserId) return { error: '无法拉黑：对方不是站内账号投稿' };
    if (targetUserId === user.id) return { error: '不能拉黑自己' };
    const { error } = await client.from('blocks').insert({ blocker_id: user.id, blocked_id: targetUserId });
    if (error && error.code !== '23505') return { error: error.message };
    blockedIds.add(targetUserId);
    if (typeof window.renderCards === 'function') window.renderCards();
    return {};
  }

  async function unblockUser(targetUserId) {
    if (!client || !user) return { error: '请先登录' };
    const { error } = await client.from('blocks').delete().eq('blocker_id', user.id).eq('blocked_id', targetUserId);
    if (error) return { error: error.message };
    blockedIds.delete(targetUserId);
    if (typeof window.renderCards === 'function') window.renderCards();
    return {};
  }

  async function setUserBanned(targetUserId, banned, reason) {
    if (!isStaff()) return { error: '无权限' };
    const { error } = await client
      .from('profiles')
      .update({ is_banned: !!banned, ban_reason: banned ? reason || '' : null })
      .eq('id', targetUserId);
    if (error) return { error: error.message };
    return {};
  }

  async function createModInvite() {
    if (!isOwner() || !user) return { error: '仅站长可生成邀请码' };
    const code = 'MOD-' + Math.random().toString(36).slice(2, 8).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
    const { data, error } = await client
      .from('mod_invites')
      .insert({
        code,
        created_by: user.id,
        expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString()
      })
      .select('code, expires_at')
      .single();
    if (error) return { error: error.message };
    return { data };
  }

  async function redeemModInvite(code) {
    if (!client || !user) return { error: '请先登录' };
    const { data, error } = await client.rpc('redeem_mod_invite', { invite_code: String(code || '').trim() });
    if (error) return { error: error.message };
    await refreshProfile();
    updateAuthUI();
    return { data };
  }

  async function loadOpenReports() {
    if (!isStaff()) return { error: '无权限', data: [] };
    const { data, error } = await client
      .from('reports')
      .select('*, items(name, type, author_name, submitter_id), comments:comment_id(id, body, user_id)')
      .eq('status', 'open')
      .order('created_at', { ascending: false });
    if (error) {
      const fallback = await client
        .from('reports')
        .select('*, items(name, type, author_name, submitter_id)')
        .eq('status', 'open')
        .order('created_at', { ascending: false });
      if (fallback.error) return { error: fallback.error.message, data: [] };
      return { data: fallback.data || [] };
    }
    return { data: data || [] };
  }

  async function resolveReport(reportId, status) {
    if (!isStaff()) return { error: '无权限' };
    const { error } = await client
      .from('reports')
      .update({ status, handled_by: user.id })
      .eq('id', reportId);
    if (error) return { error: error.message };
    return {};
  }

  async function loadRecentUsers() {
    if (!isStaff()) return { error: '无权限', data: [] };
    const { data, error } = await client
      .from('profiles')
      .select('id, display_name, username, role, is_banned, ban_reason, created_at')
      .order('created_at', { ascending: false })
      .limit(80);
    if (error) return { error: error.message, data: [] };
    return { data: data || [] };
  }

  function updateAdminHead() {
    const title = document.getElementById('admin-title');
    const sub = document.getElementById('admin-sub');
    const kicker = document.getElementById('admin-kicker');
    const chip = document.getElementById('admin-staff-chip');
    const map = {
      pending: ['待审投稿', '可勾选多条批量处理；通过时可加预警标签。操作会记录审核人身份。'],
      messages: ['站长私信', '用户私信汇总；点开会话可回复（仅站长可回）。'],
      recycle: ['回收站', '已下架作品约保留 7 天，可恢复；过期可彻底清除。'],
      reports: ['举报处理', '处理作品或评论举报：忽略、下架、删评或封禁。'],
      users: ['用户管理', '可封禁，或彻底删除账号（作品进回收站）。'],
      invites: ['管理员邀请', '仅站长可生成邀请码；对方登录后在「兑换邀请」填写。']
    };
    const t = map[adminTab] || map.pending;
    if (title) title.textContent = t[0];
    if (sub) sub.textContent = t[1];
    if (kicker) {
      kicker.textContent = profile && profile.role === 'owner' ? 'OWNER' : 'MODERATOR';
    }
    if (chip) {
      const label = currentStaffLabel();
      if (label) {
        chip.hidden = false;
        chip.innerHTML =
          '<span class="desk-staff-role">' +
          escapeHtml(staffRoleLabel(profile && profile.role)) +
          '</span><span>' +
          escapeHtml(getDisplayName() || '') +
          '</span>';
      } else {
        chip.hidden = true;
      }
    }
    document.querySelectorAll('[data-admin-tab]').forEach((b) => {
      b.classList.toggle('active', b.dataset.adminTab === adminTab);
    });
  }

  function updatePendingSelectedCount(box) {
    const root = box || document.getElementById('admin-list');
    if (!root) return;
    const n = root.querySelectorAll('input[data-select-item]:checked').length;
    const el = root.querySelector('#pending-selected-count');
    if (el) el.textContent = '已选 ' + n;
    const all = root.querySelector('#pending-select-all');
    const items = root.querySelectorAll('input[data-select-item]');
    if (all && items.length) {
      all.checked = n === items.length;
      all.indeterminate = n > 0 && n < items.length;
    }
  }

  function bindPendingSelectionUI(box) {
    if (!box) return;
    const all = box.querySelector('#pending-select-all');
    if (all) {
      all.addEventListener('change', () => {
        box.querySelectorAll('input[data-select-item]').forEach((el) => {
          el.checked = all.checked;
        });
        updatePendingSelectedCount(box);
      });
    }
    box.querySelectorAll('input[data-select-item]').forEach((el) => {
      el.addEventListener('change', () => updatePendingSelectedCount(box));
    });
    updatePendingSelectedCount(box);
  }

  function getSelectedPendingEntries(box, batchWarns) {
    const cards = [...box.querySelectorAll('input[data-select-item]:checked')]
      .map((el) => el.closest('.admin-card'))
      .filter(Boolean);
    const useBatch = Array.isArray(batchWarns) && batchWarns.length > 0;
    return cards.map((card) => ({
      id: card.dataset.id,
      card,
      warnings: useBatch
        ? batchWarns.slice()
        : [...card.querySelectorAll('input[data-warn-id]:checked')].map((el) => el.dataset.warnId)
    }));
  }

  function readBatchWarns(box) {
    return [...box.querySelectorAll('input[data-batch-warn-id]:checked')].map((el) => el.dataset.batchWarnId);
  }

  async function renderAdminList(opts) {
    const box = document.getElementById('admin-list');
    if (!box) return;
    const quiet = !!(opts && opts.quiet);
    updateAdminHead();
    if (!quiet) box.innerHTML = deskEmptyHTML('加载中…');

    if (adminTab === 'pending') {
      const { data, error } = await loadPending();
      if (error) {
        box.innerHTML = deskEmptyHTML('加载失败：' + error);
        return;
      }
      if (!data.length) {
        box.innerHTML = deskEmptyHTML('暂无待审投稿');
        return;
      }
      const typeCounts = { all: data.length, bubble: 0, font: 0, card: 0, theme: 0, music: 0 };
      data.forEach((item) => {
        if (typeCounts[item.type] != null) typeCounts[item.type] += 1;
      });
      const filtered =
        pendingTypeFilter === 'all' ? data : data.filter((item) => item.type === pendingTypeFilter);
      const filterBar =
        '<div class="admin-filter-bar desk-filter" id="pending-type-filter">' +
        ['all', 'bubble', 'font', 'card', 'theme', 'music']
          .map((t) => {
            const label = t === 'all' ? '全部' : typeLabel(t);
            const n = typeCounts[t] || 0;
            return (
              '<button type="button" class="desk-chip' +
              (pendingTypeFilter === t ? ' active' : '') +
              '" data-pending-type="' +
              t +
              '"><span>' +
              label +
              '</span><b>' +
              n +
              '</b></button>'
            );
          })
          .join('') +
        '</div>';
      const batchBar =
        '<div class="admin-batch-bar desk-batch" id="pending-batch-bar">' +
        '<div class="desk-batch-row">' +
        '<label class="admin-batch-check desk-check"><input type="checkbox" id="pending-select-all"><span>全选当前列表</span></label>' +
        '<span class="admin-batch-count desk-batch-count" id="pending-selected-count">已选 0</span>' +
        '</div>' +
        '<div class="admin-batch-warns desk-batch-warns">' +
        '<span class="admin-batch-warn-label">批量预警</span>' +
        warningDefs()
          .map(
            (w) =>
              '<label class="warn-check compact"><input type="checkbox" data-batch-warn-id="' +
              w.id +
              '"><span><b>' +
              escapeHtml(w.label) +
              '</b></span></label>'
          )
          .join('') +
        '</div>' +
        '<div class="admin-batch-actions desk-actions">' +
        '<button type="button" class="admin-btn ok" data-act="batch-approve">批量通过</button>' +
        '<button type="button" class="admin-btn no" data-act="batch-reject">批量拒绝</button>' +
        '<button type="button" class="admin-btn no" data-act="batch-delete">批量删除</button>' +
        '</div>' +
        '<p class="admin-batch-hint">勾选多条后一次处理；批量预警有勾选时会覆盖各条目自己的预警。</p>' +
        '</div>';
      if (!filtered.length) {
        box.innerHTML = filterBar + deskEmptyHTML('该类型暂无待审');
        return;
      }
      box.innerHTML =
        filterBar +
        batchBar +
        filtered
          .map((item) => {
            const metaBits = [
              typeLabel(item.type),
              item.author_name || '匿名',
              item.created_at ? new Date(item.created_at).toLocaleString() : ''
            ].filter(Boolean);
            const previewBits = [];
            if (item.type === 'bubble') {
              if (item.series || item.group_id) {
                previewBits.push(
                  '<div class="admin-link desk-link">系列 · ' +
                    escapeHtml(item.series || item.group_id) +
                    (item.group_id && item.series ? '（' + escapeHtml(item.group_id) + '）' : '') +
                    '</div>'
                );
              }
            } else if (item.type === 'theme' && item.css) {
              previewBits.push(
                '<pre class="admin-code desk-code">' +
                  escapeHtml(item.css.slice(0, 800)) +
                  (item.css.length > 800 ? '…' : '') +
                  '</pre>'
              );
            } else if (item.css && item.type !== 'bubble') {
              previewBits.push(
                '<pre class="admin-code desk-code">' +
                  escapeHtml(item.css.slice(0, 800)) +
                  (item.css.length > 800 ? '…' : '') +
                  '</pre>'
              );
            }
            if (item.font_url)
              previewBits.push(
                '<div class="admin-link desk-link">字体 · ' + escapeHtml(item.font_url) + '</div>'
              );
            if (item.file_url)
              previewBits.push(
                '<div class="admin-link desk-link">文件 · ' + escapeHtml(item.file_url) + '</div>'
              );
            if (item.type === 'music' && item.artist) {
              previewBits.push(
                '<div class="admin-link desk-link">原唱 · ' + escapeHtml(item.artist) + '</div>'
              );
            }
            if (item.type === 'music' && item.file_url) {
              previewBits.push(
                '<div class="admin-audio-wrap"><audio class="admin-audio" controls preload="none" src="' +
                  escapeHtml(item.file_url) +
                  '"></audio></div>'
              );
            }
            if (item.track_list && item.track_list.length) {
              const tracks = item.track_list;
              previewBits.push(
                '<details class="admin-tracks">' +
                  '<summary class="admin-tracks-summary">' +
                  '<span>曲目 ' +
                  tracks.length +
                  ' 首 · ' +
                  escapeHtml(item.album_title || item.name || '合辑') +
                  '</span>' +
                  '<span class="admin-tracks-toggle"></span>' +
                  '</summary>' +
                  '<ol class="admin-track-list">' +
                  tracks
                    .map((t, i) => {
                      const title = (t && t.name) || '未命名曲目';
                      const artist = (t && t.artist) || '';
                      const dur = (t && t.duration) || '';
                      const url = (t && (t.url || t.file)) || '';
                      const desc = (t && t.desc) || '';
                      return (
                        '<li class="admin-track">' +
                        '<div class="admin-track-head">' +
                        '<span class="admin-track-idx">' +
                        (i + 1) +
                        '</span>' +
                        '<div class="admin-track-main">' +
                        '<strong>' +
                        escapeHtml(title) +
                        '</strong>' +
                        '<div class="admin-track-meta">' +
                        [artist, dur].filter(Boolean).map((x) => '<span>' + escapeHtml(x) + '</span>').join('') +
                        '</div>' +
                        (desc
                          ? '<p class="admin-track-desc">' + escapeHtml(desc) + '</p>'
                          : '') +
                        (url
                          ? '<a class="admin-track-url" href="' +
                            escapeHtml(url) +
                            '" target="_blank" rel="noopener noreferrer">' +
                            escapeHtml(url) +
                            '</a>'
                          : '<span class="admin-track-url muted">无直链</span>') +
                        (url
                          ? '<audio class="admin-audio" controls preload="none" src="' +
                            escapeHtml(url) +
                            '"></audio>'
                          : '') +
                        '</div></div></li>'
                      );
                    })
                    .join('') +
                  '</ol></details>'
              );
            }
            if (item.description)
              previewBits.push(
                '<p class="admin-desc desk-desc">' + escapeHtml(item.description) + '</p>'
              );
            const currentWarns = Array.isArray(item.warnings) ? item.warnings : [];
            const warnEdit =
              '<div class="admin-warn-edit desk-warn-edit"><div class="warn-box-title">预警标签</div><div class="warn-checks">' +
              warningDefs()
                .map((w) => {
                  const on = currentWarns.includes(w.id) ? ' checked' : '';
                  return (
                    '<label class="warn-check"><input type="checkbox" data-warn-id="' +
                    w.id +
                    '"' +
                    on +
                    '><span><b>' +
                    escapeHtml(w.label) +
                    '</b></span></label>'
                  );
                })
                .join('') +
              '</div></div>';
            return (
              '<article class="admin-card desk-card" data-id="' +
              escapeHtml(item.id) +
              '" data-type="' +
              escapeHtml(item.type || '') +
              '">' +
              '<div class="desk-card-rail" aria-hidden="true"></div>' +
              '<div class="desk-card-body">' +
              '<div class="desk-card-top admin-card-top">' +
              '<label class="admin-select desk-select"><input type="checkbox" data-select-item><span></span></label>' +
              '<div class="admin-card-heading desk-card-heading">' +
              '<h3>' +
              escapeHtml(item.name || '未命名') +
              '</h3>' +
              '<div class="desk-card-meta">' +
              metaBits.map((m) => '<span>' + escapeHtml(m) + '</span>').join('') +
              '</div></div></div>' +
              previewBits.join('') +
              warnEdit +
              '<div class="admin-actions desk-actions">' +
              '<button type="button" class="admin-btn ok" data-act="approve">通过</button>' +
              '<button type="button" class="admin-btn no" data-act="reject">拒绝</button>' +
              '<button type="button" class="admin-btn no" data-act="soft-delete">删除</button>' +
              '</div></div></article>'
            );
          })
          .join('');
      bindPendingSelectionUI(box);
      return;
    }

    if (adminTab === 'messages') {
      const owner = await getOwnerProfile();
      if (!owner) {
        box.innerHTML = deskEmptyHTML('未找到站长账号');
        return;
      }
      const canReply = !!(profile && profile.role === 'owner');
      if (dmPeerId) {
        const { data: inbox } = await loadDmInbox();
        const peer = (inbox || []).find((x) => x.peerId === dmPeerId);
        const title = (peer && peer.peerName) || dmPeerId.slice(0, 8);
        box.innerHTML =
          '<div class="admin-card desk-card desk-dm-panel dm-admin-thread">' +
          '<div class="desk-dm-head">' +
          '<button type="button" class="admin-btn desk-back" data-act="dm-back">返回列表</button>' +
          '<div><p class="desk-kicker">THREAD</p><h3 class="desk-dm-title">与 ' +
          escapeHtml(title) +
          ' 的对话</h3></div></div>' +
          '<div class="dm-thread admin-dm-thread" id="admin-dm-thread"><div class="sg-comments-empty">加载中…</div></div>' +
          (canReply
            ? '<div class="dm-compose desk-dm-compose">' +
              '<textarea class="sg-comment-input" id="admin-dm-input" rows="3" maxlength="1000" placeholder="回复用户…"></textarea>' +
              '<button type="button" class="admin-btn ok" data-act="dm-reply">发送回复</button>' +
              '</div>'
            : '<p class="admin-desc desk-desc">仅站长可回复；管理员可查看会话。</p>') +
          '</div>';
        await refreshDmThreadEl(document.getElementById('admin-dm-thread'), dmPeerId, owner.id);
        return;
      }
      const { data, error } = await loadDmInbox();
      if (error) {
        box.innerHTML = deskEmptyHTML(
          '加载失败：' + error + '（请先跑 supabase-patch.sql 里的 messages 段）'
        );
        return;
      }
      if (!data.length) {
        box.innerHTML = deskEmptyHTML('暂无私信');
        return;
      }
      box.innerHTML = data
        .map((c) => {
          const metaBits = [
            c.lastAt ? new Date(c.lastAt).toLocaleString() : '',
            c.unread ? '未读 ' + c.unread : ''
          ].filter(Boolean);
          return (
            '<article class="admin-card desk-card desk-msg-card" data-peer-id="' +
            escapeHtml(c.peerId) +
            '">' +
            '<div class="desk-card-rail" aria-hidden="true"></div>' +
            '<div class="desk-card-body">' +
            '<div class="desk-card-top">' +
            '<div class="desk-card-heading">' +
            '<h3>' +
            escapeHtml(c.peerName) +
            '</h3>' +
            '<div class="desk-card-meta">' +
            metaBits.map((m) => '<span>' + escapeHtml(m) + '</span>').join('') +
            '</div></div>' +
            (c.unread ? '<span class="mine-status desk-badge desk-badge-pending">新</span>' : '') +
            '</div>' +
            '<p class="admin-desc desk-desc">' +
            escapeHtml((c.lastBody || '').slice(0, 120)) +
            '</p>' +
            '<div class="admin-actions desk-actions">' +
            '<button type="button" class="admin-btn ok" data-act="dm-open">打开会话</button>' +
            '</div></div></article>'
          );
        })
        .join('');
      return;
    }

    if (adminTab === 'recycle') {
      const { data, error } = await loadRecycleBin();
      if (error) {
        box.innerHTML = deskEmptyHTML('加载失败：' + error + '（请先跑 supabase-patch.sql）');
        return;
      }
      const head =
        '<div class="admin-card desk-toolbar">' +
        '<div class="desk-toolbar-copy">' +
        '<p class="desk-kicker">RECYCLE BIN</p>' +
        '<p class="admin-desc">已下架作品约保留 7 天，可随时恢复；超过期限可彻底清除。</p>' +
        '</div>' +
        '<div class="admin-actions desk-actions">' +
        '<button type="button" class="admin-btn no" data-act="purge-expired">清除超过 7 天</button>' +
        '</div></div>';
      if (!data.length) {
        box.innerHTML = head + deskEmptyHTML('回收站是空的');
        return;
      }
      await fetchProfilesByIds(data.map((item) => item.deleted_by || item.reviewer_id).filter(Boolean));
      box.innerHTML =
        head +
        data
          .map((item) => {
            const left = daysLeftInBin(item.deleted_at);
            const actorId = item.deleted_by || item.reviewer_id;
            const actor = actorId ? profileCache.get(String(actorId)) : null;
            const actorText = actor
              ? '下架 · ' + staffRoleLabel(actor.role) + ' ' + (actor.display_name || actor.username || '')
              : '';
            const metaBits = [
              typeLabel(item.type),
              item.author_name || '匿名',
              '剩余 ' + left + ' 天',
              actorText
            ].filter(Boolean);
            return (
              '<article class="admin-card desk-card" data-id="' +
              escapeHtml(item.id) +
              '" data-type="' +
              escapeHtml(item.type || '') +
              '">' +
              '<div class="desk-card-rail" aria-hidden="true"></div>' +
              '<div class="desk-card-body">' +
              '<div class="desk-card-top">' +
              '<div class="desk-card-heading">' +
              '<h3>' +
              escapeHtml(item.name || '未命名') +
              '</h3>' +
              '<div class="desk-card-meta">' +
              metaBits.map((m) => '<span>' + escapeHtml(m) + '</span>').join('') +
              '</div></div>' +
              '<span class="desk-badge desk-badge-rejected">已下架</span>' +
              '</div>' +
              '<div class="admin-actions desk-actions">' +
              '<button type="button" class="admin-btn ok" data-act="restore">恢复上架</button>' +
              '</div></div></article>'
            );
          })
          .join('');
      return;
    }

    if (adminTab === 'reports') {
      const { data, error } = await loadOpenReports();
      if (error) {
        box.innerHTML = deskEmptyHTML('加载失败：' + error);
        return;
      }
      if (!data.length) {
        box.innerHTML = deskEmptyHTML('暂无待处理举报');
        return;
      }
      box.innerHTML = data
        .map((r) => {
          const item = r.items || {};
          const comment = r.comments || null;
          const isComment = !!(r.comment_id || (comment && comment.id));
          const title = isComment
            ? '评论举报 · ' + (item.name || '作品')
            : item.name || '作品';
          const commentBody =
            isComment && comment && comment.body
              ? '<p class="admin-desc desk-desc"><strong>评论 · </strong>' +
                escapeHtml(comment.body) +
                '</p>'
              : '';
          const actions = isComment
            ? '<button type="button" class="admin-btn ok" data-act="dismiss-report">忽略</button>' +
              '<button type="button" class="admin-btn no" data-act="delete-comment">删除评论</button>' +
              '<button type="button" class="admin-btn no" data-act="ban-submitter">封禁作者</button>'
            : '<button type="button" class="admin-btn ok" data-act="dismiss-report">忽略</button>' +
              '<button type="button" class="admin-btn no" data-act="remove-item">下架作品</button>' +
              '<button type="button" class="admin-btn no" data-act="ban-submitter">封禁作者</button>';
          const metaBits = [
            item.type ? typeLabel(item.type) : '',
            item.author_name || '',
            r.reason || ''
          ].filter(Boolean);
          return (
            '<article class="admin-card desk-card" data-report-id="' +
            escapeHtml(r.id) +
            '" data-item-id="' +
            escapeHtml(r.item_id || '') +
            '" data-comment-id="' +
            escapeHtml(r.comment_id || (comment && comment.id) || '') +
            '" data-submitter="' +
            escapeHtml((isComment && comment && comment.user_id) || item.submitter_id || '') +
            '">' +
            '<div class="desk-card-rail desk-rail-alert" aria-hidden="true"></div>' +
            '<div class="desk-card-body">' +
            '<div class="desk-card-top">' +
            '<div class="desk-card-heading">' +
            '<h3>' +
            escapeHtml(title) +
            '</h3>' +
            '<div class="desk-card-meta">' +
            metaBits.map((m) => '<span>' + escapeHtml(m) + '</span>').join('') +
            '</div></div>' +
            '<span class="desk-badge desk-badge-pending">待处理</span>' +
            '</div>' +
            commentBody +
            '<p class="admin-desc desk-desc">' +
            escapeHtml(r.detail || '无补充说明') +
            '</p>' +
            '<div class="admin-actions desk-actions">' +
            actions +
            '</div></div></article>'
          );
        })
        .join('');
      return;
    }

    if (adminTab === 'users') {
      const { data, error } = await loadRecentUsers();
      if (error) {
        box.innerHTML = deskEmptyHTML('加载失败：' + error);
        return;
      }
      if (!data.length) {
        box.innerHTML = deskEmptyHTML('暂无用户');
        return;
      }
      box.innerHTML = data
        .map((u) => {
          const name = u.display_name || u.username || u.id;
          const initial = String(name).trim().slice(0, 1) || '?';
          const metaBits = [
            u.role === 'owner' ? '站长' : u.role === 'moderator' ? '管理' : '用户',
            u.is_banned ? '已封禁' : '',
            u.created_at ? new Date(u.created_at).toLocaleDateString('zh-CN') : ''
          ].filter(Boolean);
          return (
            '<article class="admin-card desk-card desk-user-card" data-user-id="' +
            escapeHtml(u.id) +
            '" data-user-role="' +
            escapeHtml(u.role || 'user') +
            '">' +
            '<div class="desk-user-avatar" aria-hidden="true">' +
            escapeHtml(initial) +
            '</div>' +
            '<div class="desk-card-body">' +
            '<div class="desk-card-top">' +
            '<div class="desk-card-heading">' +
            '<h3>' +
            escapeHtml(name) +
            '</h3>' +
            '<div class="desk-card-meta">' +
            metaBits.map((m) => '<span>' + escapeHtml(m) + '</span>').join('') +
            '</div></div>' +
            (u.is_banned ? '<span class="desk-badge desk-badge-rejected">封禁</span>' : '') +
            '</div>' +
            '<div class="admin-actions desk-actions">' +
            (u.role === 'owner'
              ? '<span class="admin-meta desk-locked">站长不可操作</span>'
              : u.role === 'moderator' && !isOwner()
                ? '<span class="admin-meta desk-locked">仅站长可管理其他管理员</span>'
                : (u.is_banned
                    ? '<button type="button" class="admin-btn ok" data-act="unban-user">解除封禁</button>'
                    : '<button type="button" class="admin-btn no" data-act="ban-user">封禁</button>') +
                  '<button type="button" class="admin-btn no" data-act="delete-user">删除用户</button>') +
            '</div></div></article>'
          );
        })
        .join('');
      return;
    }

    if (adminTab === 'invites') {
      const canInvite = isOwner();
      box.innerHTML =
        '<div class="admin-card desk-card desk-invite">' +
        '<div class="desk-card-body">' +
        '<p class="desk-kicker">INVITE</p>' +
        '<h3 class="desk-invite-title">管理员邀请码</h3>' +
        '<p class="admin-desc desk-desc">' +
        (canInvite
          ? '生成 7 天有效的邀请码，发给你信任的人。对方需先注册登录，再在右上角菜单「兑换邀请」填写。'
          : '仅站长可生成邀请码。管理员可正常审核投稿，但不能自行扩权。') +
        '</p>' +
        (canInvite
          ? '<div class="admin-actions desk-actions">' +
            '<button type="button" class="admin-btn ok" data-act="create-invite">生成邀请码</button>' +
            '</div>' +
            '<pre class="admin-code desk-code" id="invite-code-out" style="display:none"></pre>'
          : '') +
        '</div></div>';
      return;
    }

  }

  function switchMainTab(tab) {
    const btn = document.querySelector('.nav-btn[data-tab="' + tab + '"]');
    if (btn) btn.click();
    else if (typeof window.SG_switchTab === 'function') window.SG_switchTab(tab);
  }

  function bindUI() {
    const loginBtn = document.getElementById('auth-login-btn');
    if (loginBtn) loginBtn.addEventListener('click', () => openAuth('login'));

    const logoutBtn = document.getElementById('auth-logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => signOut());

    const accountToggle = document.getElementById('auth-account-toggle');
    const accountMenu = document.getElementById('auth-account-menu');
    function closeAccountMenu() {
      if (!accountMenu) return;
      accountMenu.hidden = true;
      if (accountToggle) accountToggle.setAttribute('aria-expanded', 'false');
    }
    function toggleAccountMenu() {
      if (!accountMenu) return;
      const open = accountMenu.hidden;
      accountMenu.hidden = !open;
      if (accountToggle) accountToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (accountToggle) {
      accountToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAccountMenu();
      });
    }
    if (accountMenu) {
      accountMenu.addEventListener('click', () => {
        // close after choosing an item
        setTimeout(closeAccountMenu, 0);
      });
    }
    document.addEventListener('click', (e) => {
      const wrap = document.getElementById('auth-account');
      if (!wrap || !accountMenu || accountMenu.hidden) return;
      if (!wrap.contains(e.target)) closeAccountMenu();
    });

    const myProfileBtn = document.getElementById('auth-display-name');
    if (myProfileBtn) {
      myProfileBtn.addEventListener('click', () => openMyProfile());
    }

    const dmBtn = document.getElementById('auth-dm-btn');
    if (dmBtn) dmBtn.addEventListener('click', () => openOwnerDm());

    const dmClose = document.getElementById('dm-modal-close');
    if (dmClose) dmClose.addEventListener('click', closeDmModal);
    const dmBackdrop = document.getElementById('dm-modal-backdrop');
    if (dmBackdrop) dmBackdrop.addEventListener('click', closeDmModal);
    const dmSend = document.getElementById('dm-send-btn');
    if (dmSend) {
      dmSend.addEventListener('click', async () => {
        const owner = await getOwnerProfile();
        if (!owner) {
          toast('暂时找不到站长账号');
          return;
        }
        const input = document.getElementById('dm-input');
        const body = input ? input.value : '';
        dmSend.disabled = true;
        const { error } = await sendDm(owner.id, body);
        dmSend.disabled = false;
        if (error) {
          toast('发送失败：' + error);
          return;
        }
        if (input) input.value = '';
        toast('已发送');
        await refreshDmThreadEl(document.getElementById('dm-thread'), owner.id);
      });
    }

    const profileBack = document.getElementById('profile-back-btn');
    if (profileBack) {
      profileBack.addEventListener('click', () => switchMainTab('gallery'));
    }

    const profileSave = document.getElementById('profile-save-btn');
    if (profileSave) {
      profileSave.addEventListener('click', async () => {
        const nameInput = document.getElementById('profile-edit-name');
        const bioInput = document.getElementById('profile-edit-bio');
        const avatarInput = document.getElementById('profile-edit-avatar');
        const coverInput = document.getElementById('profile-edit-cover');
        profileSave.disabled = true;
        const { error } = await updateMyProfile({
          display_name: (nameInput && nameInput.value) || '',
          bio: (bioInput && bioInput.value) || '',
          avatar_url: (avatarInput && avatarInput.value) || '',
          cover_url: (coverInput && coverInput.value) || ''
        });
        profileSave.disabled = false;
        if (error) {
          toast('保存失败：' + error);
          return;
        }
        toast('✅ 资料已更新');
        showProfileEdit(false);
        if (profileState.userId) await openProfile({ userId: profileState.userId });
      });
    }

    const profileCancel = document.getElementById('profile-cancel-edit-btn');
    if (profileCancel) {
      profileCancel.addEventListener('click', () => showProfileEdit(false));
    }

    const redeemBtn = document.getElementById('auth-redeem-btn');
    if (redeemBtn) {
      redeemBtn.addEventListener('click', async () => {
        if (!getUser()) {
          openAuth('login');
          return;
        }
        const code = window.prompt('请输入管理员邀请码');
        if (!code) return;
        const { error } = await redeemModInvite(code);
        if (error) toast('兑换失败：' + error);
        else toast('✅ 已成为管理员');
      });
    }

    const closeBtn = document.getElementById('auth-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeAuth);

    const backdrop = document.getElementById('auth-modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeAuth);

    const submitBtn = document.getElementById('auth-submit-btn');
    if (submitBtn) submitBtn.addEventListener('click', handleAuthSubmit);

    const switchBtn = document.getElementById('auth-switch-btn');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => setAuthMode(switchBtn.dataset.mode || 'signup'));
    }

    ['auth-email', 'auth-password', 'auth-display-name-input'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAuthSubmit();
      });
    });

    document.querySelectorAll('[data-admin-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        adminTab = btn.dataset.adminTab || 'pending';
        if (adminTab !== 'messages') dmPeerId = null;
        renderAdminList();
      });
    });

    document.querySelectorAll('[data-mine-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        mineTab = btn.dataset.mineTab || 'pending';
        renderMineList();
      });
    });

    const mineRefresh = document.getElementById('mine-refresh-btn');
    if (mineRefresh) mineRefresh.addEventListener('click', () => renderMineList());

    const mineList = document.getElementById('mine-list');
    if (mineList) {
      mineList.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-mine-act]');
        if (!btn) return;
        if (btn.dataset.mineAct === 'open') {
          const rid = btn.dataset.remoteId;
          const item = (Array.isArray(window.ALL) ? window.ALL : []).find(
            (x) => x && (x.remoteId === rid || String(x.remoteId) === String(rid))
          );
          if (item && typeof window.openModal === 'function') {
            switchMainTab('gallery');
            window.openModal(item);
          } else {
            toast('画廊里暂未找到该作品，可能尚未同步，请刷新后再试');
          }
        }
      });
    }

    const adminList = document.getElementById('admin-list');
    if (adminList) {
      adminList.addEventListener('click', async (e) => {
        const pendingTypeBtn = e.target.closest('[data-pending-type]');
        if (pendingTypeBtn) {
          pendingTypeFilter = pendingTypeBtn.dataset.pendingType || 'all';
          renderAdminList({ quiet: true });
          return;
        }

        const btn = e.target.closest('[data-act]');
        if (!btn) return;
        const act = btn.dataset.act;
        btn.disabled = true;

        if (act === 'dm-open') {
          const card = btn.closest('[data-peer-id]');
          dmPeerId = card && card.dataset.peerId ? card.dataset.peerId : null;
          btn.disabled = false;
          await renderAdminList();
          return;
        }

        if (act === 'dm-back') {
          dmPeerId = null;
          btn.disabled = false;
          await renderAdminList();
          return;
        }

        if (act === 'dm-reply') {
          if (!dmPeerId || !(profile && profile.role === 'owner')) {
            toast('仅站长可回复');
            btn.disabled = false;
            return;
          }
          const input = document.getElementById('admin-dm-input');
          const body = input ? input.value : '';
          const { error } = await sendDm(dmPeerId, body);
          if (error) {
            toast('发送失败：' + error);
            btn.disabled = false;
            return;
          }
          if (input) input.value = '';
          toast('已回复');
          const owner = await getOwnerProfile();
          await refreshDmThreadEl(
            document.getElementById('admin-dm-thread'),
            dmPeerId,
            owner && owner.id
          );
          btn.disabled = false;
          return;
        }

        if (act === 'batch-approve' || act === 'batch-reject' || act === 'batch-delete') {
          const batchWarns = readBatchWarns(adminList);
          const entries = getSelectedPendingEntries(adminList, batchWarns);
          if (!entries.length) {
            toast('请先勾选要处理的作品');
            btn.disabled = false;
            return;
          }
          const who = currentStaffLabel();
          if (act === 'batch-approve') {
            const ok = window.confirm('批量通过选中的 ' + entries.length + ' 条？');
            if (!ok) {
              btn.disabled = false;
              return;
            }
            toast('正在批量通过…', 2000);
            const { ok: n, fail, error } = await batchSetItemStatus(entries, 'approved', '');
            if (fail) toast('通过 ' + n + ' 条，失败 ' + fail + (error ? '：' + error : ''), 4500);
            else toast('✅ 已通过 ' + n + ' 条' + (who ? ' · ' + who : ''));
          } else if (act === 'batch-reject') {
            const reason = window.prompt('拒绝原因（可留空，将用于全部选中项）', '') || '';
            const ok = window.confirm('批量拒绝选中的 ' + entries.length + ' 条？');
            if (!ok) {
              btn.disabled = false;
              return;
            }
            toast('正在批量拒绝…', 2000);
            const { ok: n, fail, error } = await batchSetItemStatus(entries, 'rejected', reason);
            if (fail) toast('拒绝 ' + n + ' 条，失败 ' + fail + (error ? '：' + error : ''), 4500);
            else toast('已拒绝 ' + n + ' 条' + (who ? ' · ' + who : ''));
          } else if (act === 'batch-delete') {
            const ok = window.confirm(
              '批量删除选中的 ' + entries.length + ' 条到回收站（7 天内可恢复）？'
            );
            if (!ok) {
              btn.disabled = false;
              return;
            }
            toast('正在批量删除…', 2000);
            const { ok: n, fail, error } = await batchSetItemStatus(
              entries.map((e) => ({ id: e.id, warnings: null })),
              'removed',
              '批量删除'
            );
            if (fail) toast('删除 ' + n + ' 条，失败 ' + fail + (error ? '：' + error : ''), 4500);
            else toast('已移入回收站 ' + n + ' 条' + (who ? ' · ' + who : ''));
          }
          await renderAdminList({ quiet: true });
          return;
        }

        if (act === 'approve' || act === 'reject' || act === 'soft-delete') {
          const card = btn.closest('.admin-card');
          const id = card && card.dataset.id;
          const warns = [...(card ? card.querySelectorAll('input[data-warn-id]:checked') : [])].map((el) => el.dataset.warnId);
          const who = currentStaffLabel();
          if (act === 'approve') {
            const { error } = await setItemStatus(id, 'approved', '', warns);
            if (error) toast('操作失败：' + error);
            else toast('✅ 已通过' + (who ? ' · ' + who : ''));
          } else if (act === 'reject') {
            const reason = window.prompt('拒绝原因（可留空）', '') || '';
            const { error } = await setItemStatus(id, 'rejected', reason, warns);
            if (error) toast('操作失败：' + error);
            else toast('已拒绝' + (who ? ' · ' + who : ''));
          } else if (act === 'soft-delete') {
            const ok = window.confirm('删除后将进入回收站，7 天内可恢复。确定？');
            if (!ok) {
              btn.disabled = false;
              return;
            }
            const { error } = await softDeleteItem(id, who ? who + ' 删除' : '管理员删除');
            if (error) toast('删除失败：' + error);
            else toast('已移入回收站' + (who ? ' · ' + who : ''));
          }
          await renderAdminList({ quiet: true });
          return;
        }

        if (act === 'restore') {
          const card = btn.closest('.admin-card');
          const id = card && card.dataset.id;
          const { error } = await restoreItem(id);
          if (error) toast('恢复失败：' + error);
          else toast('✅ 已恢复上架');
          await renderAdminList();
          return;
        }

        if (act === 'purge-expired') {
          const ok = window.confirm('将彻底删除回收站中超过 7 天的作品，不可恢复。继续？');
          if (!ok) {
            btn.disabled = false;
            return;
          }
          const { data, error } = await purgeExpiredDeleted();
          if (error) toast('清理失败：' + error);
          else toast('已清除 ' + (data ? data.length : 0) + ' 条过期删除');
          await renderAdminList();
          return;
        }

        if (act === 'dismiss-report' || act === 'remove-item' || act === 'ban-submitter' || act === 'delete-comment') {
          const card = btn.closest('.admin-card');
          const reportId = card && card.dataset.reportId;
          const itemId = card && card.dataset.itemId;
          const commentId = card && card.dataset.commentId;
          const submitter = card && card.dataset.submitter;
          if (act === 'dismiss-report') {
            const { error } = await resolveReport(reportId, 'dismissed');
            if (error) toast(error);
            else toast('已忽略');
          } else if (act === 'remove-item') {
            if (itemId) await softDeleteItem(itemId, '举报下架');
            await resolveReport(reportId, 'resolved');
            toast('已下架并进入回收站');
          } else if (act === 'delete-comment') {
            if (commentId) {
              const { error } = await deleteComment(commentId);
              if (error) toast('删评论失败：' + error);
            }
            await resolveReport(reportId, 'resolved');
            toast('已删除评论');
          } else if (act === 'ban-submitter') {
            if (submitter) {
              const reason = window.prompt('封禁原因', '举报处理') || '举报处理';
              const { error } = await setUserBanned(submitter, true, reason);
              if (error) toast(error);
            }
            await resolveReport(reportId, 'resolved');
            toast('已处理');
          }
          await renderAdminList();
          return;
        }

        if (act === 'ban-user' || act === 'unban-user' || act === 'delete-user') {
          const card = btn.closest('.admin-card');
          const uid = card && card.dataset.userId;
          const targetRole = (card && card.dataset.userRole) || '';
          if ((targetRole === 'moderator' || targetRole === 'owner') && !isOwner()) {
            toast('仅站长可管理其他管理员');
            btn.disabled = false;
            return;
          }
          if (targetRole === 'owner') {
            toast('站长不可操作');
            btn.disabled = false;
            return;
          }
          if (act === 'ban-user') {
            const reason = window.prompt('封禁原因', '') || '';
            const { error } = await setUserBanned(uid, true, reason);
            if (error) toast(error);
            else toast('已封禁');
          } else if (act === 'unban-user') {
            const { error } = await setUserBanned(uid, false, '');
            if (error) toast(error);
            else toast('已解封');
          } else if (act === 'delete-user') {
            const ok = window.confirm(
              '将彻底删除该账号（Auth），其作品会进入回收站。此操作不可恢复。确定？'
            );
            if (!ok) {
              btn.disabled = false;
              return;
            }
            const { error } = await adminDeleteUser(uid);
            if (error) toast('删除失败：' + error);
            else toast('已删除用户');
          }
          await renderAdminList();
          return;
        }

        if (act === 'create-invite') {
          if (!isOwner()) {
            toast('仅站长可生成邀请码');
            btn.disabled = false;
            return;
          }
          const { data, error } = await createModInvite();
          const out = document.getElementById('invite-code-out');
          if (error) toast('生成失败：' + error);
          else if (out) {
            out.style.display = 'block';
            out.textContent = '邀请码：' + data.code + '\n有效期至：' + new Date(data.expires_at).toLocaleString();
            toast('已生成，请复制发给对方');
          }
          btn.disabled = false;
        }
      });
    }

    const refreshBtn = document.getElementById('admin-refresh-btn');
    if (refreshBtn) refreshBtn.addEventListener('click', () => renderAdminList());

    const reportBtn = document.getElementById('modal-report-btn');
    if (reportBtn) {
      reportBtn.addEventListener('click', async () => {
        const item = window.currentModalItem;
        if (!isConfigured()) {
          toast('未配置后端');
          return;
        }
        if (!getUser()) {
          openAuth('login');
          return;
        }
        if (!item || !item.remoteId) {
          toast('本地旧作品暂不支持举报，仅站内投稿可举报');
          return;
        }
        const reason = window.prompt('举报原因（必填）', '不当内容');
        if (!reason) return;
        const detail = window.prompt('补充说明（可留空）', '') || '';
        const { error } = await reportItem(item.remoteId, reason, detail);
        if (error) toast('举报失败：' + error);
        else toast('✅ 已提交举报');
      });
    }

    const blockBtn = document.getElementById('modal-block-btn');
    if (blockBtn) {
      blockBtn.addEventListener('click', async () => {
        const item = window.currentModalItem;
        if (!getUser()) {
          openAuth('login');
          return;
        }
        if (!item || !item.submitterId) {
          toast('无法拉黑：该作品没有站内投稿账号');
          return;
        }
        if (isAuthorBlocked(item)) {
          const { error } = await unblockUser(item.submitterId);
          if (error) toast(error);
          else {
            toast('已取消拉黑');
            blockBtn.title = '拉黑作者';
          }
        } else {
          const ok = window.confirm('拉黑后将隐藏该作者的站内投稿，确定？');
          if (!ok) return;
          const { error } = await blockUser(item.submitterId);
          if (error) toast(error);
          else {
            toast('已拉黑该作者');
            blockBtn.title = '取消拉黑';
          }
        }
      });
    }

    const unpubBtn = document.getElementById('modal-unpublish-btn');
    if (unpubBtn) {
      unpubBtn.addEventListener('click', async () => {
        if (!isStaff()) {
          toast('仅管理员可下架');
          return;
        }
        const item = window.currentModalItem;
        if (!item || !item.remoteId) {
          toast('仅能下架站内投稿作品');
          return;
        }
        const ok = window.confirm(
          '下架「' + (item.name || '') + '」并进入回收站（7 天内可恢复）？'
        );
        if (!ok) return;
        const { error } = await softDeleteItem(item.remoteId, '预览页下架');
        if (error) toast('下架失败：' + error);
        else {
          toast('已下架并进入回收站');
          const backdrop = document.getElementById('modal-backdrop');
          if (backdrop) backdrop.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  async function onSessionReady() {
    await loadBlocks();
    await loadFollows();
    await syncLikesFromCloud();
  }

  async function boot() {
    bindUI();
    if (!ready) {
      updateAuthUI();
      console.warn('[SG] 未配置 config.js');
      return;
    }
    if (!initClient()) {
      updateAuthUI();
      return;
    }

    client.auth.onAuthStateChange(async (_event, session) => {
      user = session && session.user ? session.user : null;
      await refreshProfile();
      updateAuthUI();
      await onSessionReady();
      const adminView = document.getElementById('admin-view');
      if (adminView && adminView.classList.contains('active')) {
        if (isStaff()) renderAdminList();
        else switchMainTab('gallery');
      }
      // 登录态变化后重新拉画廊，避免停在空列表
      if (isConfigured()) await loadApprovedIntoGallery();
    });

    const { data } = await client.auth.getSession();
    user = data.session && data.session.user ? data.session.user : null;
    await refreshProfile();
    updateAuthUI();
    await loadApprovedIntoGallery();
    await onSessionReady();
  }

  window.SG = {
    isConfigured,
    getUser,
    isStaff,
    isOwner,
    openAuth,
    closeAuth,
    submitItems,
    loadPending,
    renderAdminList,
    refreshProfile,
    loadApprovedIntoGallery,
    likeItem,
    unlikeItem,
    syncLikesFromCloud,
    reportItem,
    blockUser,
    unblockUser,
    isAuthorBlocked,
    softDeleteItem,
    restoreItem,
    loadRecycleBin,
    purgeExpiredDeleted,
    redeemModInvite,
    fillSubmitAuthors,
    openProfile,
    openMyProfile,
    updateMyProfile,
    loadMyItems,
    renderMineList,
    mountComments,
    mountStaffPanel,
    updateItemWarnings,
    followUser,
    unfollowUser,
    isFollowing,
    adminDeleteUser,
    openOwnerDm,
    getDisplayName: () => getDisplayName(),
    getProfile: () => profile
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
