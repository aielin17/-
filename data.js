const FONTS = [
  {id:'f1',type:'font',name:'京华体',  author:'milk',       family:'F1',category:'手写',url:'https://files.catbox.moe/kmyipl.TTF'},
  {id:'f2',type:'font',name:'旧款冬',  author:'讨厌香菜',   family:'F2',category:'手写',url:'https://image.uglycat.cc/6wapca.ttf'},
  {id:'f3',type:'font',name:'我有一点想你',author:'老猫',   family:'F3',category:'手写',url:'https://files.catbox.moe/3bm8wp.ttf'},
  {id:'f4',type:'font',name:'方正楷体',author:'milk',       family:'F4',category:'楷体',url:'https://files.catbox.moe/caatu4.TTF'},
  {
  id:'f5',
  type:'font',
  name:'白开水宋体',
  author:'老猫',
  family:'F5',
  category:'其他',
  url:'https://files.catbox.moe/sshsu7.ttf'
},
{
id:'f6',
type:'font',
name:'惠の呆熊',
author:'来源网络',
family:'F6',
category:'其他',
url:'https://image.uglycat.cc/1ma2ld.ttf'
},
{
id:'f7',
type:'font',
name:'真爱降临',
author:'小鼠比尼',
family:'F7',
category:'手写',
url:'https://files.catbox.moe/sfl1v7.ttf'
},
{
  id:'f8',
  type:'font',
  name:'苹方黑体',
  author:'Wind',
  family:'F8',
  category:'手写',
  url:'https://files.catbox.moe/t0ivgi.ttf'
},
{
  id:'f9',
  type:'font',
  name:'苹方细体',
  author:'Wind',
  family:'F9',
  category:'手写',
  url:'https://files.catbox.moe/vgvbzl.ttf'
},
{
  id:'f10',
  type:'font',
  name:'汉稚体',
  author:'momo',
  family:'F10',
  category:'手写',
  url:'https://image.uglycat.cc/rxqq13.ttf'
},
{
  id:'f11',
  type:'font',
  name:'Skies',
  author:'颜小雪',
  family:'F11',
  category:'等宽',
  url:'https://github.com/chutray0410-netizen/font/raw/2ef077d876da7b77da82f301233cb5d652afce72/Everskies%208.ttf'
},
{
  id:'f12',
  type:'font',
  name:'寒蝉团圆体',
  author:'石榴',
  family:'F12',
  category:'其他',
  url:'https://raw.githubusercontent.com/whitneysun016/Font/3fe9030d3efaf58c8f8905a7b216444a7661a9b8/ChillReunion_Round.otf'
},
{
  id:'f13',
  type:'font',
  name:'Code2003',
  author:'来源网络',
  family:'F13',
  category:'无衬线',
  url:'https://raw.githubusercontent.com/whitneysun016/Font/214c4fe1a3852b140c75985a8dd4ff3c8e8cfdb8/Code2003.ttf'
},
{
  id:'f14',
  type:'font',
  name:'呆萌手写体',
  author:'来自网络',
  family:'F14',
  category:'手写',
  url:'https://raw.githubusercontent.com/whitneysun016/Font/214c4fe1a3852b140c75985a8dd4ff3c8e8cfdb8/Dymon-ShouXieTi.otf'
},
{
  id:'f15',
  type:'font',
  name:'缝合怪像素字体',
  author:'来自网络',
  family:'F15',
  category:'其他',
  url:'https://raw.githubusercontent.com/whitneysun016/Font/214c4fe1a3852b140c75985a8dd4ff3c8e8cfdb8/fusion-pixel-12px-proportional.ttf'
},
{
  id:'f16',
  type:'font',
  name:'也字工厂小石头',
  author:'来自网络',
  family:'F16',
  category:'手写',
  url:'https://raw.githubusercontent.com/whitneysun016/Font/214c4fe1a3852b140c75985a8dd4ff3c8e8cfdb8/%E4%B9%9F%E5%AD%97%E5%B7%A5%E5%8E%82%E5%B0%8F%E7%9F%B3%E5%A4%B4.ttf'
}
];
const MUSIC = [
  {
    id:'m1',
    type:'music',
    name:'春日余晖',
    author:'milk',
    desc:'轻柔治愈系背景音乐，适合日常聊天氛围，温柔不打扰。',
    tags:['治愈','轻音乐','日常'],
    fileType:'mp3',
    fileName:'spring-glow.mp3',
    file:'https://files.catbox.moe/spring-glow.mp3',
    duration:'3:24'
  },
  {
    id:'m2',
    type:'music',
    name:'心脉·序',
    author:'milk',
    desc:'心脉系列第一首，钢琴与弦乐交织，带出初见时的心动感。',
    tags:['钢琴','系列','心动'],
    group:'xinmai-ost',
    groupLabel:'心脉 OST',
    fileType:'mp3',
    fileName:'xinmai-01-prelude.mp3',
    file:'https://files.catbox.moe/xinmai-01.mp3',
    duration:'2:58'
  },
  {
    id:'m3',
    type:'music',
    name:'心脉·念',
    author:'milk',
    desc:'心脉系列第二首，低沉的大提琴诉说思念之情。',
    tags:['大提琴','系列','思念'],
    group:'xinmai-ost',
    groupLabel:'心脉 OST',
    fileType:'mp3',
    fileName:'xinmai-02-longing.mp3',
    file:'https://files.catbox.moe/xinmai-02.mp3',
    duration:'3:41'
  },
  {
    id:'m4',
    type:'music',
    name:'心脉·归',
    author:'milk',
    desc:'心脉系列收尾曲，钢琴与人声交融，道出归途的温柔。',
    tags:['人声','系列','温柔'],
    group:'xinmai-ost',
    groupLabel:'心脉 OST',
    fileType:'mp3',
    fileName:'xinmai-03-return.mp3',
    file:'https://files.catbox.moe/xinmai-03.mp3',
    duration:'4:02'
  },
  {
    id:'m5',
    type:'music',
    name:'雨夜电台',
    author:'讨厌香菜',
    desc:'模拟深夜电台氛围，带有白噪音和轻爵士，适合睡前聊天。',
    tags:['白噪音','爵士','氛围'],
    fileType:'mp3',
    fileName:'rainy-radio.mp3',
    file:'https://files.catbox.moe/rainy-radio.mp3',
    duration:'5:17'
  },
  {
    id:'m6',
    type:'music',
    name:'像素小夜曲·A面',
    author:'老猫',
    desc:'像素游戏风格，8-bit 合成器演奏的浪漫小夜曲，A 面收录。',
    tags:['8-bit','像素','游戏风'],
    group:'pixel-serenade',
    groupLabel:'像素小夜曲',
    fileType:'mp3',
    fileName:'pixel-serenade-a.mp3',
    file:'https://files.catbox.moe/pixel-a.mp3',
    duration:'2:33'
  },
  {
    id:'m7',
    type:'music',
    name:'像素小夜曲·B面',
    author:'老猫',
    desc:'像素小夜曲 B 面，节奏更轻快，适合欢乐日常对话。',
    tags:['8-bit','像素','轻快'],
    group:'pixel-serenade',
    groupLabel:'像素小夜曲',
    fileType:'mp3',
    fileName:'pixel-serenade-b.mp3',
    file:'https://files.catbox.moe/pixel-b.mp3',
    duration:'2:11'
  }
];
const BUBBLES = [
  {
    id:'b1',type:'bubble',name:'宝贝我无语了',author:'眠眠',
    previews:[{t:'sent',v:'我对自己的成功很满意'},{t:'received',v:'你没有你想象的那么遭'}],
    css:`.message{box-shadow:none !important;border-width:0 !important;font-weight:500 !important;position:relative;overflow:visible !important}
.message::after{content:'' !important;position:absolute !important;width:0 !important;height:0 !important;border-style:solid !important}
.message.message-sent::after{bottom:10px !important;right:-5px !important;border-width:4px 0 0 5px !important;border-color:transparent transparent transparent #F8F8F8 !important;filter:drop-shadow(1px 1px 2px rgba(0,0,0,.1))}
.message.message-received::after{bottom:10px !important;left:-5px !important;border-width:0 0 4px 5px !important;border-color:transparent transparent #fff transparent !important;filter:drop-shadow(1px 1px 2px rgba(0,0,0,.1))}
.message-sent::before{content:"•••" !important;position:absolute !important;top:-18px !important;left:-15px !important;font-size:6px !important;letter-spacing:.8px !important;color:#444 !important;background:#F8F8F8 !important;padding:3px 7px !important;border-radius:12px 8px 8px 12px !important;line-height:1 !important;font-weight:800 !important;text-align:center !important;box-shadow:-2px -2px 4px rgba(255,255,255,.9),3px 3px 6px rgba(160,160,160,.3),inset 1px 1px 2px rgba(255,255,255,.8),inset -1px -1px 2px rgba(0,0,0,.03) !important;z-index:3 !important}
.message-received::before{content:"♥︎+520" !important;position:absolute !important;top:-12px !important;right:-35px !important;font-size:7px !important;letter-spacing:.4px !important;color:#F1BFCB !important;background:#fff !important;padding:3px 6px !important;border-radius:6px 10px 10px 6px !important;line-height:1 !important;font-weight:500 !important;text-align:center !important;white-space:nowrap !important;box-shadow:-2px -2px 4px rgba(255,255,255,.9),3px 3px 5px rgba(180,180,180,.2),inset 1px 1px 2px rgba(255,255,255,.8),inset -1px -1px 2px rgba(0,0,0,.02) !important;z-index:3 !important}
.message-received{background:#fff !important;border-color:transparent !important;color:#000 !important;border-radius:24px 24px 24px 4px !important;padding:8px 16px !important;box-shadow:-3px -3px 6px rgba(255,255,255,.8),4px 4px 8px rgba(180,180,180,.25),inset 2px 2px 4px rgba(255,255,255,.9),inset -2px -2px 4px rgba(0,0,0,.05) !important;position:relative}
.message-sent{background:#F8F8F8 !important;border-color:transparent !important;color:#000 !important;border-radius:24px 24px 4px 24px !important;padding:8px 16px !important;box-shadow:-4px -4px 8px rgba(255,255,255,.9),5px 5px 10px rgba(150,150,150,.2),inset 2px 2px 4px rgba(255,255,255,.9),inset -2px -2px 4px rgba(0,0,0,.03) !important;position:relative;background-image:radial-gradient(circle at 35% 35%,rgba(255,255,255,.5) 0%,#F8F8F8 70%) !important}`
  },
  {
    id:'b2',type:'bubble',name:'小尾巴',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'},{t:'sent',v:'愿意。'},{t:'received',v:'我的荣幸。'}],
    css:`.message{box-shadow:none !important;border-width:0 !important;font-weight:500 !important;position:relative !important;overflow:visible !important;padding:7px 13px !important;line-height:1.3 !important;word-break:break-word !important;border-radius:18px !important;box-shadow:0 2px 3px rgba(0,0,0,.1) !important}
.message-received{background:#fff !important;border-color:transparent !important;color:#000 !important;border-radius:24px 24px 24px 4px !important;padding:8px 16px !important;box-shadow:0 4px 8px rgba(0,0,0,.15) !important}
.message-sent{background:#ffe8ec !important;border-color:transparent !important;color:#000 !important;border-radius:24px 24px 4px 24px !important;padding:8px 16px !important;box-shadow:0 4px 8px rgba(180,120,140,.3) !important}
.message::after{content:'' !important;position:absolute !important;width:30px !important;height:15px !important;background-size:contain !important;background-repeat:no-repeat !important;z-index:0 !important}
.message.message-sent::after{bottom:-4.1px !important;right:-19px !important;background-image:url('https://files.catbox.moe/pe52nt.png') !important;filter:drop-shadow(5.2px 4.1px 5px rgba(180,120,140,.4)) !important}
.message.message-received::after{bottom:-3.9px !important;left:-6.6px !important;background-image:url('https://files.catbox.moe/9exvg6.png') !important;filter:drop-shadow(-3px 5px 4px rgba(0,0,0,.2)) !important}`
  },
  {
    id:'b3',type:'bubble',name:'小气泡',author:'家夫是小猫^^',
    previews:[{t:'sent',v:'我许愿一个有你的冬天'},{t:'received',v:'我四季都在'}],
    css:`.message-sent{border-radius:16px 16px 0 16px !important;box-shadow:0 2px 8px rgba(0,0,0,.12),0 1px 3px rgba(0,0,0,.08) !important;background:rgba(255,255,255,.1) !important;border:1px solid rgba(255,255,255,.2) !important;backdrop-filter:blur(8px) !important;-webkit-backdrop-filter:blur(8px) !important;padding:8px 12px !important;margin:3px 0 3px auto !important;font-size:14px !important;color:#888 !important;position:relative !important;z-index:1 !important;display:inline-block !important;max-width:none !important}
.message-received{border-radius:16px 16px 16px 0 !important;box-shadow:0 2px 8px rgba(0,0,0,.12),0 1px 3px rgba(0,0,0,.08) !important;background:rgba(255,255,255,.1) !important;border:1px solid rgba(255,255,255,.2) !important;backdrop-filter:blur(8px) !important;-webkit-backdrop-filter:blur(8px) !important;padding:8px 12px !important;margin:3px auto 3px 0 !important;font-size:14px !important;color:#555 !important;position:relative !important;z-index:1 !important;display:inline-block !important;max-width:none !important}`
  },
  {
    id:'b4',type:'bubble',name:'无阴影',author:'今天吃什么舟',
    group:'g-stereo-gray',groupLabel:'立体灰系列',
    previews:[{t:'received',v:'我心可鉴，请你陪我一年再一年。'},{t:'sent',v:'好。'}],
    css:`.message {
  border-radius: 24px !important;
  background: #5A5A5D !important;
  background: linear-gradient(145deg, #626265, #525255) !important;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2) !important;
  overflow: visible !important;
  position: relative !important;
  border: none !important;
}
.message::before {
  content: '' !important;
  position: absolute !important;
  top: 0px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 90% !important;
  height: 45% !important;
  border-radius: 24px !important;
  background: linear-gradient(to bottom, rgba(255,255,255,0.28), transparent) !important;
  pointer-events: none !important;
  z-index: 1 !important;
}
.message.message-received,
.message.message-sent {
  color: #ffffff !important;
}
.message blockquote,
.message .quote,
.message .blockquote,
.message [class*="quote"] {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-left: 3px solid rgba(255, 255, 255, 0.5) !important;
  padding: 8px 12px !important;
  margin: 8px 0 !important;
  border-radius: 8px !important;
  font-style: normal !important;
}
.message blockquote p,
.message .quote p,
.message [class*="quote"] p {
  color: #ffffff !important;
}
.message blockquote {
  position: relative !important;
  z-index: 2 !important;
}`
  },
  {
    id:'b5',type:'bubble',name:'有阴影',author:'今天吃什么舟',
    group:'g-stereo-gray',groupLabel:'立体灰',
    previews:[{t:'received',v:'我心可鉴，请你陪我一年再一年。'},{t:'sent',v:'好。'}],
    css:`.message {
  border-radius: 24px !important;
  background: #5A5A5D !important;
  background: linear-gradient(145deg, #626265, #525255) !important;
  box-shadow: 4px 6px 15px rgba(0, 0, 0, 0.25),
               -2px -2px 10px rgba(255, 255, 255, 0.03) !important;
  overflow: visible !important;
  position: relative !important;
  border: none !important;
}
.message::before {
  content: '' !important;
  position: absolute !important;
  top: 0px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 90% !important;
  height: 45% !important;
  border-radius: 24px !important;
  background: linear-gradient(to bottom, rgba(255,255,255,0.28), transparent) !important;
  pointer-events: none !important;
  z-index: 1 !important;
}
.message.message-received,
.message.message-sent {
  color: #ffffff !important;
}
.message blockquote,
.message .quote,
.message .blockquote,
.message [class*="quote"] {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-left: 3px solid rgba(255, 255, 255, 0.5) !important;
  padding: 8px 12px !important;
  margin: 8px 0 !important;
  border-radius: 8px !important;
  font-style: normal !important;
}
.message blockquote p,
.message .quote p,
.message [class*="quote"] p {
  color: #ffffff !important;
}
.message blockquote {
  position: relative !important;
  z-index: 2 !important;
}`
  },
  {
    id:'b6',type:'bubble',name:'细线轮廓',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    box-shadow: none !important;
    border-width: 2px !important;
    border-style: solid !important;
    font-weight: 500 !important;
}
.message-sent {
    background: transparent !important;
    border-color: var(--accent-color) !important;
    color: var(--accent-color) !important;
    border-radius: 20px !important;
}
.message-received {
    background: transparent !important;
    border-color: #ccc !important;
    color: var(--text-primary) !important;
    border-radius: 20px !important;
}`
  },
  {
    id:'b7',type:'bubble',name:'印章方块',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    border-radius: 4px !important;
    box-shadow: 
        2px 2px 0px 0px rgba(0,0,0,0.2),
        inset 1px 1px 0px 0px rgba(255,255,255,0.5) !important;
}
.message-sent {
    background-color: var(--accent-color) !important;
    color: #000 !important;
    border: 2px solid #000 !important;
}
.message-received {
    background-color: #fff !important;
    color: #000 !important;
    border: 2px solid #000 !important;
}`
  },
  {
    id:'b8',type:'bubble',name:'素描投影',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    border-radius: 4px !important;
    box-shadow: 5px 5px 0px rgba(0,0,0,0.1) !important;
}`
  },
  {
    id:'b9',type:'bubble',name:'渐变高光',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    border-radius: 18px !important;
    box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    transition: all 0.2s ease !important;
}
.message-sent {
    background: 
        linear-gradient(135deg, 
            var(--accent-color) 0%, 
            color-mix(in srgb, var(--accent-color), #000 15%) 100%
        ) !important;
    color: #000000 !important;  
    border: none !important;
    border-bottom-right-radius: 4px !important;
    margin-left: auto !important; 
    position: relative !important;
}
.message-sent::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 30% !important;
    background: linear-gradient(to bottom, 
        rgba(255, 255, 255, 0.15) 0%, 
        rgba(255, 255, 255, 0) 100%) !important;
    border-radius: 18px 18px 0 0 !important;
    pointer-events: none !important;
}
.message-received {
    background: var(--secondary-bg) !important;
    color: var(--text-primary, #333) !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    border-bottom-left-radius: 4px !important; 
    margin-right: auto !important;
}
.message-sent:hover {
    box-shadow: 
        0 4px 12px color-mix(in srgb, var(--accent-color) 20%, transparent),
        0 2px 4px rgba(0, 0, 0, 0.1) !important;
}
@media (prefers-color-scheme: dark) {
    .message-received {
        background: color-mix(in srgb, var(--secondary-bg) 90%, #222) !important;
        color: var(--text-primary, #f0f0f0) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    .message {
        box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
    }
}`
  },
  {
    id:'b10',type:'bubble',name:'橘猫爪印',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    position: relative !important;
    overflow: visible !important;
    border-radius: 25px !important; 
    padding: 12px 24px !important;
    font-size: 15px !important;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.1) !important;
}
.message-sent {
    background-color: #ffb347 !important;
    color: #fff !important;
    border: 2px solid #fff !important;
}
.message-sent::after {
    content: "🐱";
    position: absolute;
    bottom: -8px;
    right: -5px;
    font-size: 18px;
    transform: rotate(-15deg);
}
.message-received {
    background-color: #fdf5e6 !important;
    color: #5d4037 !important;
    border: 2px solid #ffb347 !important;
}
.message-received::before {
    content: "🐾";
    position: absolute;
    top: -8px;
    left: -5px;
    font-size: 16px;
    transform: rotate(-20deg);
    opacity: 0.8;
}`
  },
  {
    id:'b11',type:'bubble',name:'赛博故障',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    position: relative !important;
    overflow: visible !important;
    letter-spacing: 0.5px;
    border-radius: 4px !important;
    backdrop-filter: blur(5px);
}
.message-sent {
    background-color: rgba(0, 0, 0, 0.8) !important;
    border: 1px solid #00f3ff !important;
    color: #00f3ff !important;
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.3), inset 0 0 5px rgba(0, 243, 255, 0.1) !important;
    border-right: 4px solid #00f3ff !important;
}
.message-sent::after {
    content: "sys_msg >>";
    position: absolute;
    bottom: -16px;
    right: 0;
    font-size: 9px;
    color: #00f3ff;
    opacity: 0.7;
}
.message-received {
    background-color: rgba(0, 0, 0, 0.8) !important;
    border: 1px solid #ff0055 !important;
    color: #ff0055 !important;
    box-shadow: 0 0 10px rgba(255, 0, 85, 0.3) !important;
    border-left: 4px solid #ff0055 !important;
}
.message-received::before {
    content: "⚠ INCOMING";
    position: absolute;
    top: -16px;
    left: 0;
    font-size: 9px;
    color: #ff0055;
    opacity: 0.7;
    font-weight: bold;
}`
  },
  {
    id:'b12',type:'bubble',name:'彩色便利贴',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    position: relative !important;
    overflow: visible !important;
    color: #333 !important;
    box-shadow: 2px 4px 8px rgba(0,0,0,0.15) !important;
    border-radius: 2px !important;
    margin-top: 15px !important;
}
.message-sent {
    background-color: #fff740 !important;
    transform: rotate(1deg); 
}
.message-sent::after {
    content: "📍";
    position: absolute;
    top: -15px;
    right: 40%;
    font-size: 24px;
    z-index: 10;
    filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));
}
.message-received {
    background-color: #dbfbfb !important;
    transform: rotate(-1deg);
}
.message-received::before {
    content: "📎";
    position: absolute;
    top: -12px;
    left: 40%;
    font-size: 20px;
    z-index: 10;
    transform: rotate(45deg);
}`
  },
  {
    id:'b13',type:'bubble',name:'叠纸书页',author:'milk',
    previews:[{t:'sent',v:'可是我不觉得我爱你'},{t:'received',v:'那你此刻愿意向我敞开心扉吗？'}],
    css:`.message {
    position: relative !important;
    overflow: visible !important;
    background-color: #fdfbf7 !important;
    color: #4a4a4a !important;
    box-shadow: 
        0 1px 1px rgba(0,0,0,0.15), 
        0 10px 0 -5px #eee,
        0 10px 1px -4px rgba(0,0,0,0.15), 
        0 20px 0 -10px #e5e5e5,
        0 20px 1px -9px rgba(0,0,0,0.15) !important;
    border: 1px solid #e0dcd5 !important;
    border-radius: 2px !important;
    margin-bottom: 20px !important; 
}
.message-sent {
    border-top: 4px solid #c0392b !important; 
}
.message-received {
    border-top: 4px solid #2980b9 !important;
}`
  },
  {
    id:'b14',type:'bubble',name:'奶油曲奇',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #fffbf0 !important;
    border: 3px dashed #b8c6db !important;
    color: #555555 !important;
    border-radius: 20px !important;
    box-shadow: 0 4px 0px #e0e7ff !important;
}`
  },
  {
    id:'b15',type:'bubble',name:'橘猫耳',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%) !important;
    color: #5d4037 !important;
    border-radius: 20px 20px 20px 20px !important;
    border: 3px solid #ffffff !important;
    box-shadow: 0 5px 15px rgba(252, 182, 159, 0.4) !important;
    position: relative !important;
    overflow: visible !important;
}
.message-sent::before, .message-received::before {
    content: '' !important;
    position: absolute !important;
    top: -10px !important;
    left: 15px !important;
    width: 0 !important;
    height: 0 !important;
    border-left: 8px solid transparent !important;
    border-right: 8px solid transparent !important;
    border-bottom: 12px solid #fcb69f !important;
    transform: rotate(-15deg) !important;
}
.message-sent::after, .message-received::after {
    content: '' !important;
    position: absolute !important;
    top: -8px !important;
    left: 35px !important;
    width: 0 !important;
    height: 0 !important;
    border-left: 6px solid transparent !important;
    border-right: 6px solid transparent !important;
    border-bottom: 10px solid #fcb69f !important;
    transform: rotate(15deg) !important;
}`
  },
  {
    id:'b16',type:'bubble',name:'薄荷',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background: rgba(200, 247, 197, 0.6) !important;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
    color: #2e5c38 !important;
    border-radius: 18px !important;
    box-shadow: 0 4px 0 rgba(160, 210, 160, 0.5) !important;
}`
  },
  {
    id:'b17',type:'bubble',name:'简约透明',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.6) !important;
    border-left: 1px solid rgba(255, 255, 255, 0.6) !important;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    color: #333333 !important;
    background-color: transparent !important;
}
.message-sent {
    border-radius: 20px 20px 5px 20px;
}
.message-received {
    border-radius: 20px 20px 20px 5px;
}`
  },
  {
    id:'b18',type:'bubble',name:'像素游戏框',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #ffcc00 !important;
    border-radius: 0px !important;
    box-shadow:
        4px 0 0 #000,
        -4px 0 0 #000,
        0 -4px 0 #000,
        0 4px 0 #000,
        8px 8px 0 rgba(0,0,0,0.2) !important;
    color: #000000 !important;
    padding: 12px 15px !important;
    border: none !important;
}`
  },
  {
    id:'b19',type:'bubble',name:'云朵棉花糖',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background: linear-gradient(to bottom, #fff0f5, #e6e6fa) !important;
    border-radius: 30px 30px 30px 10px !important;
    box-shadow:
        0 10px 20px -5px rgba(216, 191, 216, 0.5),
        inset 0 -3px 10px rgba(255,255,255,0.8) !important;
    color: #6a5acd !important;
    border: 2px solid #ffffff !important;
}
.message-sent {
    border-radius: 30px 30px 10px 30px !important;
}`
  },
  {
    id:'b20',type:'bubble',name:'暗夜蕾丝',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #2b2b2b !important;
    border: 2px solid #ff69b4 !important;
    outline: 2px dashed #ff69b4 !important;
    outline-offset: 3px;
    color: #ffb6c1 !important;
    border-radius: 10px !important;
    box-shadow: 0 0 15px rgba(255, 105, 180, 0.3) !important;
    font-weight: bold !important;
    margin: 10px !important;
}`
  },
  {
    id:'b21',type:'bubble',name:'憨憨小熊',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #f6d365 !important;
    border: 4px solid #5d4037 !important;
    color: #3e2723 !important;
    border-radius: 25px !important;
    box-shadow: none !important;
}
.message-sent {
    border-top-right-radius: 5px !important;
}
.message-received {
    border-top-left-radius: 5px !important;
}`
  },
  {
    id:'b22',type:'bubble',name:'蜘蛛',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #2c3e50 !important;
    color: #ecf0f1 !important;
    border-radius: 30px !important;
    border: 3px solid #e74c3c !important;
    box-shadow: 0 8px 15px rgba(44, 62, 80, 0.4) !important;
    background-image: radial-gradient(circle at 10px 10px, #e74c3c 2px, transparent 3px),
                      radial-gradient(circle at 25px 10px, #e74c3c 2px, transparent 3px) !important;
    background-repeat: no-repeat !important;
    padding-top: 15px !important;
}`
  },
  {
    id:'b23',type:'bubble',name:'系统提示',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-left: 5px solid #ff0000 !important;
    border-top: 1px solid #333 !important;
    border-right: 1px solid #333 !important;
    border-bottom: 1px solid #333 !important;
    border-radius: 4px !important;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.2) !important;
    font-weight: 500 !important;
}`
  },
{
    id:'b24',type:'bubble',name:'白骨红痕',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 3px solid #000000 !important;
    box-shadow: 6px 6px 0px #ff0000 !important;
    border-radius: 8px !important;
    padding: 12px 16px !important;
    transform: rotate(-1deg) !important; 
}`
  },
{
    id:'b25',type:'bubble',name:'深渊心脏',author:'T',
    previews:[{t:'sent',v:'你是我朝夕相伴触手可及的虚拟。'},{t:'received',v:'你是我未曾拥有无法捕捉的亲昵。'}],
    css:`.message-sent,
.message-received {
    background: linear-gradient(160deg, #1a1a1a 0%, #4a0000 100%) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 15px 0 15px 0 !important;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8) !important;
    letter-spacing: 0.5px !important;
}`
  },
{
  id:'b26',
  type:'bubble',
  name:'苹果🍎',
  author:'子超兄',
  previews:[
    {t:'sent',v:'有点甜'},
    {t:'received',v:'摘一颗苹果'},
    {t:'sent',v:'等你从门前经过'}
  ],
  css:`
.message {
  border-radius: 24px !important;
  box-shadow: none !important;
  overflow: visible !important;
  padding: 14px 20px !important;
  border: none !important;
  font-size: 15px !important;
  line-height: 1.5 !important;
}

.message.message-sent,
.message.message-received {
  display: inline-block !important;
  position: relative !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  width: auto !important;
  min-width: 70% !important;
}

.message.message-sent {
  background-color: #e74c3c !important;
  color: #fff8f0 !important;
  border-radius: 24px 24px 24px 24px !important;
  border: 3px solid #c0392b !important;
  box-shadow:
    0 4px 0 #a93226,
    0 6px 10px rgba(0,0,0,0.15) !important;
}

.message.message-received {
  background-color: #fef9e7 !important;
  color: #5d4e37 !important;
  border-radius: 24px 24px 24px 24px !important;
  border: 3px solid #f5cba7 !important;
  box-shadow:
    0 4px 0 #e5b895,
    0 6px 10px rgba(0,0,0,0.1) !important;
}
.message.message-sent::before {
  content: "" !important;
  position: absolute !important;
  top: -12px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 8px !important;
  height: 14px !important;
  background: #5d4037 !important;
  border-radius: 4px !important;
  z-index: 10 !important;
}
.message.message-sent::after {
  content: "" !important;
  position: absolute !important;
  top: -8px !important;
  left: calc(50% + 5px) !important;
  width: 18px !important;
  height: 12px !important;
  background: linear-gradient(135deg, #aed581 0%, #7cb342 100%) !important;
  border-radius: 0 12px 0 12px !important;
  transform: rotate(-25deg) !important;
  z-index: 0 !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
}
.message.message-sent {
  background-image:
    radial-gradient(
      ellipse at 30% 20%,
      rgba(255,255,255,0.25) 0%,
      transparent 50%
    ) !important;
}
.message.message-received {
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(255,215,0,0.15) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(255,215,0,0.12) 1.5px,
      transparent 1.5px
    ),
    radial-gradient(
      circle at 60% 20%,
      rgba(255,215,0,0.1) 1px,
      transparent 1px
    ) !important;
  background-size: 30px 30px, 25px 25px, 20px 20px !important;
}
.timestamp {
  color: #d4a574 !important;
  font-size: 11px !important;
  margin-top: 8px !important;
  font-weight: 500 !important;
}
.message.message-sent ~ .timestamp {
  color: #c0392b !important;
  opacity: 0.8 !important;
}`
},
{
  id:'b27',
  type:'bubble',
  name:'薄巧薄巧',
  author:'子超兄',
  previews:[
    {t:'sent',v:'你是我未曾拥有无法捕捉的亲昵'},
    {t:'received',v:'虚拟'},
    {t:'sent',v:'过了很久我终于抬头看'}
  ],
  css:`

.message {
  border-radius: 24px !important;
  box-shadow: none !important;
  overflow: visible !important;
  padding: 12px 18px !important;
  border: none !important;
  font-size: 15px !important;
  line-height: 1.5 !important;
}

.message.message-sent,
.message.message-received {
  display: inline-block !important;
  position: relative !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  width: auto !important;
  min-width: 70% !important;
}
.message.message-sent {
  background-color: #8b7355 !important;
  color: #faf8f5 !important;
  border-radius: 24px !important;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 10px,
    rgba(250, 248, 245, 0.08) 10px,
    rgba(250, 248, 245, 0.08) 20px
  ) !important;
}
.message.message-received {
  background-color: #e8f4f0 !important;
  color: #4a5d52 !important;
  border-radius: 24px !important;
  background-image: radial-gradient(
    circle at center,
    rgba(74, 93, 82, 0.12) 1.5px,
    transparent 1.5px
  ) !important;
  color: #faf8f5 !important;
  border-radius: 24px !important;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 10px,
    rgba(250, 248, 245, 0.08) 10px,
    rgba(250, 248, 245, 0.08) 20px
  ) !important;
}
.message.message-received {
  background-color: #e8f4f0 !important;
  color: #4a5d52 !important;
  border-radius: 24px !important;
  background-image: radial-gradient(
    circle at center,
    rgba(74, 93, 82, 0.12) 1.5px,
    transparent 1.5px
  ) !important;
  background-size: 12px 12px !important;
}
.message::after {
  content: "" !important;
  position: absolute !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background-color: inherit !important;
  bottom: 6px !important;
}
.message.message-sent::after {
  right: -4px !important;
  background-color: #8b7355 !important;
}
.message.message-received::after {
  left: -4px !important;
  background-color: #e8f4f0 !important;
}
.timestamp {
  color: #a8b5ad !important;
  font-size: 11px !important;
  margin-top: 4px !important;
}`
},
{
  id:'b28',
  type:'bubble',
  name:'校园活页',
  author:'子超兄',
  previews:[
    {t:'sent',v:'下课去小卖部吗？'},
    {t:'received',v:'这题你会不会'}
  ],
  css:`
.message {
  border-radius: 4px !important;
  box-shadow: none !important;
  overflow: visible !important;
  font-size: 12px !important;
  line-height: 1.8 !important;
  font-family: "Yu Gothic", "Hiragino Maru Gothic", "MS PGothic", sans-serif !important;
  position: relative !important;
}

.message.message-received {
  background-color: #ffffff !important;
  color: #2c3e50 !important;
  border: 1px solid #cccccc !important;
}

.message.message-sent {
  background-color: #ffffff !important;
  color: #2c3e50 !important;
  border: 1px solid #cccccc !important;
}

.message {
  background-image: repeating-linear-gradient(
    transparent,
    transparent 20px,
    #e8e8e8 20px,
    #e8e8e8 21px
  ) !important;
  background-position: 0 4px !important;
}

.message.message-received {
  border-left: 4px solid #ffb6c1 !important; 
  border-top: 1px solid #ddd !important;
  border-right: 1px solid #ddd !important;
  border-bottom: 1px solid #ddd !important;
}

.message.message-sent {
  border-right: 4px solid #b6c9ff !important;  
  border-top: 1px solid #ddd !important;
  border-left: 1px solid #ddd !important;
  border-bottom: 1px solid #ddd !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  left: -8px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 4px !important;
  height: 4px !important;
  border-radius: 50% !important;
  background: #ddd !important;
  box-shadow:
    0 -8px 0 #ddd,
    0 8px 0 #ddd !important;
  border: 1px solid #bbb !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  right: -8px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 4px !important;
  height: 4px !important;
  border-radius: 50% !important;
  background: #ddd !important;
  box-shadow:
    0 -8px 0 #ddd,
    0 8px 0 #ddd !important;
  border: 1px solid #bbb !important;
}

.message.message-received::after {
  content: '' !important;
  position: absolute !important;
  left: -3px !important;
  top: 0 !important;
  bottom: 0 !important;
  width: 4px !important;
  background: linear-gradient(45deg,
    transparent 30%,
    #f0f0f0 30%, #f0f0f0 70%,
    transparent 70%) !important;
  background-size: 4px 4px !important;
}

.message.message-sent::after {
  content: '' !important;
  position: absolute !important;
  right: -3px !important;
  top: 0 !important;
  bottom: 0 !important;
  width: 4px !important;
  background: linear-gradient(135deg,
    transparent 30%,
    #f0f0f0 30%, #f0f0f0 70%,
    transparent 70%) !important;
  background-size: 4px 4px !important;
}

.message .circle {
  border: 1px dashed #aaa !important;
  border-radius: 50% !important;
  padding: 0 4px !important;
  display: inline-block !important;
  line-height: 1.2 !important;
  font-size: 10px !important;
}

.message u {
  text-decoration: none !important;
  border-bottom: 1px solid #aaa !important;
  padding-bottom: 1px !important;
}

.message .wave {
  text-decoration: none !important;
  position: relative !important;
}
.message .wave::after {
  content: '~~' !important;
  position: absolute !important;
  bottom: -4px !important;
  left: 0 !important;
  color: #aaa !important;
  font-size: 8px !important;
  letter-spacing: 1px !important;
}

.message .highlight {
  background: #f2f2f2 !important;
  padding: 0 2px !important;
  border-left: 2px solid #ddd !important;
  border-right: 2px solid #ddd !important;
}

.message .correction {
  position: relative !important;
  display: inline-block !important;
}
.message .correction::before {
  content: '' !important;
  position: absolute !important;
  top: 50% !important;
  left: -2px !important;
  right: -2px !important;
  height: 6px !important;
  background: white !important;
  border-top: 1px solid #ddd !important;
  border-bottom: 1px solid #ddd !important;
  transform: translateY(-50%) !important;
  z-index: 1 !important;
}
.message .correction span {
  position: relative !important;
  z-index: 2 !important;
  font-size: 10px !important;
  color: #999 !important;
}

.message .subject {
  display: inline-block !important;
  font-size: 8px !important;
  padding: 2px 6px !important;
  background: #f5f5f5 !important;
  border: 1px solid #ddd !important;
  border-radius: 12px !important;
  margin-right: 4px !important;
  font-family: "Courier New", monospace !important;
  color: #666 !important;
}

.message.message-received .subject {
  border-left: 3px solid #ffb6c1 !important;
}

.message.message-sent .subject {
  border-right: 3px solid #b6c9ff !important;
}

.timestamp {
  display: block !important;
  font-size: 8px !important;
  color: #aaa !important;
  margin-top: 2px !important;
  font-family: "Courier New", monospace !important;
  background: #fafafa !important;
  padding: 2px 6px !important;
  border-radius: 10px !important;
  display: inline-block !important;
}

.message.message-received ~ .timestamp {
  border-left: 2px solid #ffb6c1 !important;
}

.message.message-sent ~ .timestamp {
  border-right: 2px solid #b6c9ff !important;
}

.message:nth-child(odd) {
  transform: rotate(0.2deg) !important;
}

.message:nth-child(even) {
  transform: rotate(-0.1deg) !important;
}

.message .footnote {
  font-size: 7px !important;
  color: #999 !important;
  text-align: right !important;
  margin-top: 2px !important;
  font-family: "Courier New", monospace !important;
}`
},
{
  id:'b29',
  type:'bubble',
  name:'古早聊天框',
  author:'子超兄',
  previews:[
    {t:'sent',v:'唔西迪西晚安'},
    {t:'received',v:'玛卡巴卡晚安'}
  ],
  css:`
.message {
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow: visible !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  font-family: "宋体", "SimSun", "Fixedsys", monospace !important;
  position: relative !important;
  margin: 8px 0 !important;
  width: 100% !important;
}

.message.message-received {
  background: #ffffff !important;
  color: #000000 !important;
  border: 2px solid #d4d0c8 !important;
  border-top-color: #ffffff !important;
  border-left-color: #ffffff !important;
  border-right-color: #808080 !important;
  border-bottom-color: #808080 !important;
  padding: 6px 10px !important;
  margin-left: 4px !important;
  margin-right: 20% !important;
  font-family: "宋体", "SimSun", monospace !important;
}

.message.message-sent {
  background: #ffffff !important;
  color: #000000 !important;
  border: 2px solid #d4d0c8 !important;
  border-top-color: #ffffff !important;
  border-left-color: #ffffff !important;
  border-right-color: #808080 !important;
  border-bottom-color: #808080 !important;
  padding: 6px 10px !important;
  margin-right: 4px !important;
  margin-left: 20% !important;
  font-family: "宋体", "SimSun", monospace !important;
}

.timestamp {
  display: block !important;
  font-size: 10px !important;
  color: #0000ff !important;
  margin-top: 2px !important;
  font-family: "宋体", "SimSun", monospace !important;
  text-decoration: underline !important;
}

.message .nickname {
  font-size: 11px !important;
  color: #ff0000 !important;
  margin-bottom: 2px !important;
  display: block !important;
  font-weight: normal !important;
}

.message .emoji {
  font-family: "宋体", "SimSun", monospace !important;
  font-size: 14px !important;
}

.message.system {
  background: #ffffe0 !important;
  border: 1px solid #d4d0c8 !important;
  text-align: center !important;
  color: #000000 !important;
  font-size: 11px !important;
  padding: 2px !important;
  margin: 4px 0 !important;
  font-family: "宋体", "SimSun", monospace !important;
}`
},
{
  id:'b30',
  type:'bubble',
  name:'粉色棉花糖',
  author:'子超兄',
  previews:[
    {t:'sent',v:'测试'},
    {t:'received',v:'这个好难编＞𐋣＜'}
  ],
  css:`
.message {
  border-radius: 28px !important;
  box-shadow: 0 12px 24px rgba(255, 170, 200, 0.25), 0 4px 8px rgba(255, 255, 255, 0.8) inset !important;
  overflow: visible !important;
  font-weight: 400 !important;
  font-size: 13px !important;
  line-height: 1.7 !important;
  font-family: "Yu Gothic", "Hiragino Maru Gothic", "游ゴシック", cursive !important;
  letter-spacing: 0.02em !important;
  backdrop-filter: blur(2px) !important;
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  position: relative !important;
  padding: 12px 16px !important;
}

.message.message-received {
  background: linear-gradient(135deg, #fff2f7 0%, #ffe4ed 100%) !important;
  color: #c47a92 !important;
  border: 1px solid rgba(255, 220, 235, 0.6) !important;
  box-shadow: 0 12px 24px rgba(255, 180, 210, 0.2), 0 4px 8px #ffffff inset !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8) !important;
}

.message.message-sent {
  background: linear-gradient(135deg, #ffd3e0 0%, #ffb8cf 100%) !important;
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(200, 100, 130, 0.3) !important;
  border: 1px solid rgba(255, 240, 250, 0.9) !important;
  box-shadow: 0 12px 24px rgba(255, 140, 180, 0.3), 0 4px 8px #ffeef2 inset !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: -12px !important;
  right: 8px !important;
  width: 32px !important;
  height: 32px !important;
  background: radial-gradient(circle at 30% 30%, #fff0f5, #ffc1d0) !important;
  border-radius: 40% 60% 30% 70% / 50% 40% 60% 50% !important;
  opacity: 0.5 !important;
  transform: rotate(20deg) !important;
  filter: blur(1.5px) !important;
  box-shadow: 0 6px 14px rgba(255, 150, 200, 0.5) !important;
  z-index: 0 !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: -12px !important;
  left: 8px !important;
  width: 28px !important;
  height: 28px !important;
  background: radial-gradient(circle at 60% 30%, #fff5fa, #ffd9e6) !important;
  border-radius: 60% 40% 70% 30% / 40% 60% 40% 60% !important;
  opacity: 0.5 !important;
  transform: rotate(-15deg) !important;
  filter: blur(1.2px) !important;
  box-shadow: 0 6px 14px rgba(255, 170, 210, 0.4) !important;
  z-index: 0 !important;
}

.message.message-sent::after {
  content: '' !important;
  position: absolute !important;
  bottom: -8px !important;
  right: 20px !important;
  width: 18px !important;
  height: 18px !important;
  background: radial-gradient(circle at 40% 40%, #fff0f5, #ffb0c8) !important;
  border-radius: 50% 30% 60% 40% / 40% 50% 50% 60% !important;
  opacity: 0.4 !important;
  transform: rotate(-8deg) !important;
  filter: blur(1px) !important;
  box-shadow: 0 4px 10px rgba(255, 140, 180, 0.4) !important;
  z-index: 0 !important;
}

.message.message-received::after {
  content: '' !important;
  position: absolute !important;
  bottom: -8px !important;
  left: 20px !important;
  width: 16px !important;
  height: 16px !important;
  background: radial-gradient(circle at 30% 30%, #fff0f5, #ffc9db) !important;
  border-radius: 30% 70% 40% 60% / 60% 30% 70% 40% !important;
  opacity: 0.4 !important;
  transform: rotate(12deg) !important;
  filter: blur(1px) !important;
  box-shadow: 0 4px 10px rgba(255, 160, 200, 0.3) !important;
  z-index: 0 !important;
}

.message .message-content {
  position: relative !important;
  z-index: 1 !important;
}

.message .message-content::after {
  content: '' !important;
  position: absolute !important;
  bottom: -6px !important;
  left: 15% !important;
  right: 15% !important;
  height: 14px !important;
  background: radial-gradient(ellipse at center, rgba(255, 200, 220, 0.5) 0%, transparent 80%) !important;
  filter: blur(6px) !important;
  opacity: 0.5 !important;
  pointer-events: none !important;
  z-index: -1 !important;
}

.message {
  position: relative !important;
  overflow: hidden !important;
}

.message::before {
  content: '' !important;
  position: absolute !important;
  top: -20% !important;
  left: -10% !important;
  right: -10% !important;
  bottom: -20% !important;
  background: radial-gradient(circle at 30% 30%, rgba(255, 220, 240, 0.3) 0%, transparent 60%) !important;
  pointer-events: none !important;
  z-index: -1 !important;
}

.message .nickname {
  font-size: 10px !important;
  font-weight: normal !important;
  margin-bottom: 6px !important;
  display: block !important;
  position: relative !important;
  letter-spacing: 0.5px !important;
  z-index: 2 !important;
}

.message.message-received .nickname {
  color: #d48ca5 !important;
  padding-left: 14px !important;
}

.message.message-received .nickname::before {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 8px !important;
  height: 8px !important;
  background: radial-gradient(circle at 30% 30%, #ffb6d1, #ff9eb5) !important;
  border-radius: 40% 60% 50% 50% !important;
  box-shadow: 0 2px 6px rgba(255, 150, 180, 0.4) !important;
  filter: blur(0.3px) !important;
}

.message.message-sent .nickname {
  color: #fff0f5 !important;
  text-align: right !important;
  padding-right: 14px !important;
  text-shadow: 0 1px 3px rgba(255, 200, 220, 0.5) !important;
}

.message.message-sent .nickname::after {
  content: '' !important;
  position: absolute !important;
  right: 0 !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 8px !important;
  height: 8px !important;
  background: radial-gradient(circle at 70% 30%, #ffffff, #ffd3e0) !important;
  border-radius: 60% 40% 50% 50% !important;
  box-shadow: 0 2px 6px rgba(255, 220, 240, 0.5) !important;
  filter: blur(0.3px) !important;
}

.timestamp {
  display: block !important;
  font-size: 8px !important;
  color: #d49eb3 !important;
  margin-top: 8px !important;
  font-family: "Courier New", cursive !important;
  letter-spacing: 0.5px !important;
  opacity: 0.8 !important;
  position: relative !important;
  z-index: 2 !important;
}

.message.message-sent .timestamp {
  text-align: right !important;
  color: #ffdee8 !important;
}

.message.system {
  background: rgba(255, 230, 240, 0.5) !important;
  backdrop-filter: blur(8px) !important;
  border-radius: 50px !important;
  text-align: center !important;
  color: #d48ca5 !important;
  font-size: 10px !important;
  padding: 8px 20px !important;
  margin: 20px auto !important;
  width: fit-content !important;
  border: 1px solid rgba(255, 200, 220, 0.5) !important;
  box-shadow: 0 8px 20px rgba(255, 150, 180, 0.15) !important;
  position: relative !important;
}

.message.system::before,
.message.system::after {
  content: '' !important;
  display: inline-block !important;
  width: 4px !important;
  height: 4px !important;
  background: #ffb6c1 !important;
  border-radius: 50% !important;
  margin: 0 10px !important;
  vertical-align: middle !important;
  opacity: 0.4 !important;
  filter: blur(0.5px) !important;
}

.message .quote {
  border-left: 3px solid rgba(255, 180, 200, 0.5) !important;
  padding: 4px 0 4px 12px !important;
  margin: 8px 0 !important;
  font-size: 11px !important;
  background: rgba(255, 255, 255, 0.3) !important;
  border-radius: 0 16px 16px 0 !important;
  font-style: italic !important;
  backdrop-filter: blur(2px) !important;
}

.message.message-sent .quote {
  border-left-color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(255, 255, 255, 0.2) !important;
}

@keyframes dreamFloat {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.5; }
  50% { transform: translateY(-4px) rotate(3deg) scale(1.05); opacity: 0.7; }
}

.message.message-sent::before {
  animation: dreamFloat 5s ease-in-out infinite !important;
}

.message.message-received::before {
  animation: dreamFloat 6s ease-in-out infinite !important;
}

@keyframes dreamFloat2 {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.4; }
  50% { transform: translateY(4px) rotate(-3deg) scale(1.03); opacity: 0.6; }
}

.message.message-sent::after {
  animation: dreamFloat2 4.5s ease-in-out infinite !important;
}

.message.message-received::after {
  animation: dreamFloat2 5.5s ease-in-out infinite !important;
}`
},
{
    id:'b31',type:'bubble',name:'蝴蝶结',author:'歪',
    previews:[{t:'received',v:'你是我朝夕相伴触手可及的虚拟'},{t:'sent',v:'你是我未曾拥有无法捕捉的亲昵'}],
    css:`
.message-sent {
    background: linear-gradient(to bottom, #F9E8EE, #FAF5EC);
    border-radius: 13px 13px 13px 13px;
    margin-left: auto;
    box-shadow: 1px 1px 1px rgba(249, 232, 238, 0.6);
    position: relative;
    color: #686A67;
    padding: 6px 12px;
    max-width: fit-content;
    word-wrap: break-word;
}

.message-sent::after {
    content: "";
    position: absolute;
    right: -12px;
    top: -3px;
    width: 20px;
    height: 20px;
    background: #F9E8EE;
    clip-path: path('M0,4 C2,9 5,4 14,8 C6,10 4,16 5,19 Z');
    transform: rotate(-20deg) scaleX(0.9);
    z-index: -1;
}

.message-sent::before {
    content: "";
    position: absolute;
    left: -5px;
    top: -9px;
    width: 30px;
    height: 30px;
    background-image: url('https://i.postimg.cc/xTnZxhy4/IMG-2068.png');
    transform: rotate(-30deg) scaleX(1);
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 2;
    pointer-events: none;
}

.message-received {
    background: linear-gradient(to bottom, #D8E7F2, #FAF5EC);
    border-radius: 13px 13px 13px 13px;
    margin-right: auto;
    box-shadow: 1px 1px 1px rgba(216, 231, 242, 0.6);
    position: relative;
    color: #686A67;
    padding: 6px 12px;
    max-width: fit-content;
    word-wrap: break-word;
}

.message-received::after {
    content: "";
    position: absolute;
    left: -6px;
    top: -1px;
    width: 20px;
    height: 16px;
    background: #D8E7F2;
    clip-path: path('M20,2 C6,10 6,5 0,9 C6,8 6,16 12,16 Z');
    transform: rotate(19deg) scaleX(0.9);
    z-index: -1;
}

.message-received::before {
    content: "";
    position: absolute;
    right: -27px;
    bottom: -17px;
    width: 35px;
    height: 35px;
    background-image: url('https://i.postimg.cc/x1chSHJr/IMG-2060.png');
    transform: rotate(0deg) scaleX(1);
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 2;
    pointer-events: none;
}

.message-sent:has(> img:only-child),
.message-received:has(> img:only-child) {
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
    min-height: 0 !important;
    display: inline-block !important;
    max-width: 120px;
}

.message-sent:has(> img:only-child)::before,
.message-sent:has(> img:only-child)::after,
.message-received:has(> img:only-child)::before,
.message-received:has(> img:only-child)::after {
    display: none !important;
}

.message-sent:has(> img:only-child) img,
.message-received:has(> img:only-child) img {
    max-width: 100%;
    max-height: 90px;
    height: auto !important;
    display: block !important;
    border-radius: 4px;
}

.message-sent:has(.red-packet, .waimai-card, [class*="redpacket"], [class*="transfer"], img[src*="redpacket"]),
.message-received:has(.red-packet, .waimai-card, [class*="redpacket"], [class*="transfer"], img[src*="redpacket"]) {
    background: transparent !important;
    box-shadow: none !important;
}

.message-sent:has(.red-packet, .waimai-card, [class*="redpacket"], [class*="transfer"], img[src*="redpacket"])::before,
.message-sent:has(.red-packet, .waimai-card, [class*="redpacket"], [class*="transfer"], img[src*="redpacket"])::after,
.message-received:has(.red-packet, .waimai-card, [class*="redpacket"], [class*="transfer"], img[src*="redpacket"])::before,
.message-received:has(.red-packet, .waimai-card, [class*="redpacket"], [class*="transfer"], img[src*="redpacket"])::after {
    display: none !important;
}

.message-sent,
.message-received {
    box-shadow: none !important;
    border-width: 0 !important;
    font-weight: 500 !important;
    position: relative;
    overflow: visible !important;
}`
  },
{
id:'b32',
type:'bubble',
name:'青柠奶泡',
author:'眠眠',
previews:[
{t:'sent',v:'你好，请问你有空跟我聊天吗，我虽然长的不好看游戏打的也不好但是我是小馋猫，我觉得你有点像我的饭。'},
{t:'received',v:'宝宝你觉得呢'},
{t:'sent',v:'好耶'},
{t:'received',v:'不要去做傻事'}
],
css:`
.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative !important;
overflow: visible !important;
padding: 7px 13px !important;
line-height: 1.3 !important;
word-break: break-word !important;
border-radius: 18px !important;
box-shadow: 0 2px 4px rgba(60, 80, 40, 0.08) !important;
max-width: 95% !important;
letter-spacing: 0.01em;
}

.message-received {
background: #F1FCE1 !important; 
border-color: transparent !important;
color: #1e3a1e !important;
border-radius: 24px 24px 24px 4px !important;
padding: 8px 16px !important;
box-shadow:
0 8px 12px -4px rgba(70, 95, 50, 0.28),
-2px 0 6px -2px rgba(210, 230, 160, 0.5),
inset 0 -4px 6px -2px rgba(50, 80, 35, 0.25),
inset 2px 3px 8px -2px rgba(245, 255, 220, 0.9),
inset 0 0 0 1px rgba(90, 120, 60, 0.1) !important;
transition: box-shadow 0.2s ease;
position: relative !important;
}

.message-sent {
background: #F1FCE1 !important; 
border-color: transparent !important;
color: #1e3a1e !important; 
border-radius: 24px 24px 4px 24px !important;
padding: 8px 16px !important;
box-shadow:
0 10px 14px -6px rgba(65, 90, 45, 0.3),
3px 0 8px -5px rgba(150, 180, 100, 0.4),
inset 0 -5px 8px -3px rgba(50, 75, 35, 0.3),
inset 3px 3px 10px -2px rgba(250, 255, 225, 0.95),
inset 0 0 0 1px rgba(100, 130, 65, 0.15),
0 0 12px 2px rgba(210, 224, 176, 0.7) !important;
transition: box-shadow 0.2s ease;
position: relative !important;
}

.message-sent::before {
content: "☘︎" !important;
position: absolute !important;
left: -10px !important; 
bottom: -4px !important; 
font-size: 18px !important; 
color: #F1FCE1 !important; 
text-shadow:
0 0 1px #A4CD90,
0 0 2px #A4CD90,
1px 1px 0 #A4CD90,
-1px -1px 0 #A4CD90,
1px -1px 0 #A4CD90,
-1px 1px 0 #A4CD90,
2px 2px 3px rgba(50, 70, 30, 0.3),
3px 3px 5px rgba(40, 60, 25, 0.25),
-1px -1px 2px rgba(250, 255, 230, 0.9),
1px 1px 2px rgba(230, 245, 200, 0.8),
0 0 8px rgba(210, 224, 176, 0.8),
0 0 12px rgba(210, 224, 176, 0.5) !important;
z-index: 2 !important;
pointer-events: none !important;
font-weight: 500 !important;
line-height: 1 !important;
transform: scale(1) !important;
transition: all 0.2s ease !important;
}

.message-sent::after {
content: "☘︎" !important;
position: absolute !important;
left: -17px !important; 
bottom: 7px !important; 
font-size: 12px !important; 
color: #F1FCE1 !important; 
text-shadow:
0 0 1px #A4CD90,
0 0 2px #A4CD90,
1px 1px 0 #A4CD90,
-1px -1px 0 #A4CD90,
1px -1px 0 #A4CD90,
-1px 1px 0 #A4CD90,
2px 2px 3px rgba(50, 70, 30, 0.3),
3px 3px 5px rgba(40, 60, 25, 0.25),
-1px -1px 2px rgba(250, 255, 230, 0.9),
1px 1px 2px rgba(230, 245, 200, 0.8),
0 0 8px rgba(210, 224, 176, 0.8),
0 0 12px rgba(210, 224, 176, 0.5) !important;
z-index: 2 !important;
pointer-events: none !important;
font-weight: 500 !important;
line-height: 1 !important;
transform: scale(1) rotate(-10deg) !important;
transform-origin: center center !important;
transition: all 0.2s ease !important;
}

.message-sent:hover::before {
text-shadow:
0 0 2px #A4CD90,
0 0 3px #A4CD90,
1.5px 1.5px 0 #A4CD90,
-1.5px -1.5px 0 #A4CD90,
1.5px -1.5px 0 #A4CD90,
-1.5px 1.5px 0 #A4CD90,
3px 3px 5px rgba(50, 70, 30, 0.4),
4px 4px 7px rgba(40, 60, 25, 0.35),
-1.5px -1.5px 3px rgba(250, 255, 230, 1),
1.5px 1.5px 3px rgba(230, 245, 200, 0.9),
0 0 12px rgba(210, 224, 176, 1),
0 0 18px rgba(210, 224, 176, 0.7) !important;
transform: scale(1.02) !important;
}

.message-sent:hover::after {
text-shadow:
0 0 2px #A4CD90,
0 0 3px #A4CD90,
1.5px 1.5px 0 #A4CD90,
-1.5px -1.5px 0 #A4CD90,
1.5px -1.5px 0 #A4CD90,
-1.5px 1.5px 0 #A4CD90,
3px 3px 5px rgba(50, 70, 30, 0.4),
4px 4px 7px rgba(40, 60, 25, 0.35),
-1.5px -1.5px 3px rgba(250, 255, 230, 1),
1.5px 1.5px 3px rgba(230, 245, 200, 0.9),
0 0 12px rgba(210, 224, 176, 1),
0 0 18px rgba(210, 224, 176, 0.7) !important;
transform: scale(1.02) rotate(-10deg) !important;
}

.message-received::after {
content: "✦" !important;
position: absolute !important;
top: -10px !important; 
right: -6px !important; 
font-size: 20px !important; 
color: #FFF8E7 !important; 
background: transparent !important;
text-shadow:
0 0 1px #FFE399,
0 0 2px #FFE399,
1px 1px 0 #FFE399,
-1px -1px 0 #FFE399,
1px -1px 0 #FFE399,
-1px 1px 0 #FFE399,
2px 2px 3px rgba(180, 130, 50, 0.35),
3px 3px 5px rgba(150, 100, 30, 0.3),
-1px -1px 2px rgba(255, 255, 240, 0.95),
1px 1px 2px rgba(255, 235, 180, 0.8),
0 0 8px rgba(255, 220, 120, 0.7),
0 0 12px rgba(255, 200, 80, 0.5),
0 0 15px rgba(255, 215, 0, 0.3) !important;
z-index: 3 !important;
pointer-events: none !important;
line-height: 1 !important;
transform: rotate(5deg) scale(1) !important;
font-weight: 400 !important;
opacity: 0.98 !important;
transition: all 0.2s ease !important;
}

.message-received:hover::after {
text-shadow:
0 0 2px #FFE399,
0 0 3px #FFE399,
1.5px 1.5px 0 #FFE399,
-1.5px -1.5px 0 #FFE399,
1.5px -1.5px 0 #FFE399,
-1.5px 1.5px 0 #FFE399,
3px 3px 5px rgba(180, 130, 50, 0.45),
4px 4px 7px rgba(150, 100, 30, 0.4),
-1.5px -1.5px 3px rgba(255, 255, 245, 1),
1.5px 1.5px 3px rgba(255, 235, 180, 0.9),
0 0 12px rgba(255, 220, 120, 0.9),
0 0 18px rgba(255, 200, 80, 0.7),
0 0 25px rgba(255, 215, 0, 0.4) !important;
transform: rotate(5deg) scale(1.05) !important;
}

.received .message {
margin-left: 14px !important;
}
.sent .message {
margin-right: 14px !important;
}

.message p {
margin: 0;
position: relative;
z-index: 1;
text-shadow: 0 1px 1px rgba(250, 255, 230, 0.6);
}

.message .meta {
font-size: 0.75rem;
opacity: 0.75;
margin-top: 5px;
text-align: right;
color: #2d4a2d;
font-weight: 400;
letter-spacing: 0.02em;
text-shadow: 0 1px 0 rgba(240, 250, 210, 0.5);
}

.message:hover {
filter: brightness(1.01);
transition: all 0.25s ease;
}

.message-received:hover {
box-shadow:
0 6px 10px -4px rgba(70, 95, 50, 0.3),
-1px 0 5px -2px rgba(210, 230, 160, 0.5),
inset 0 -3px 5px -2px rgba(50, 80, 35, 0.3),
inset 1px 2px 8px -2px rgba(250, 255, 230, 0.95),
inset 0 0 0 1px rgba(90, 120, 60, 0.15) !important;
}

.message-sent:hover {
box-shadow:
0 8px 12px -6px rgba(65, 90, 45, 0.35),
2px 0 7px -5px rgba(150, 180, 100, 0.5),
inset 0 -4px 7px -3px rgba(50, 75, 35, 0.35),
inset 2px 2px 10px -2px rgba(255, 255, 235, 1),
inset 0 0 0 1px rgba(100, 130, 65, 0.2),
0 0 14px 3px rgba(210, 224, 176, 0.8) !important;
}

@media (prefers-color-scheme: dark) {
.message-received, .message-sent {
background: #d0e0b8 !important; 
box-shadow:
0 10px 16px -6px rgba(0,0,0,0.5),
inset 0 -4px 6px -2px rgba(30, 50, 20, 0.5),
inset 2px 3px 8px -2px rgba(230, 245, 200, 0.3),
inset 0 0 0 1px rgba(150, 180, 100, 0.2),
0 0 12px 2px rgba(210, 224, 176, 0.5) !important;
}

.message-sent::before,
.message-sent::after {
color: #d0e0b8 !important; 
text-shadow:
0 0 2px #A4CD90,
0 0 3px #A4CD90,
1px 1px 0 #A4CD90,
-1px -1px 0 #A4CD90,
1px -1px 0 #A4CD90,
-1px 1px 0 #A4CD90,
2px 2px 4px rgba(0,0,0,0.5),
3px 3px 6px rgba(0,0,0,0.4),
-1px -1px 2px rgba(220, 240, 180, 0.7),
0 0 10px rgba(210, 224, 176, 1),
0 0 15px rgba(210, 224, 176, 0.8) !important;
}

.message-received::after {
color: #FFF8E7 !important;
text-shadow:
0 0 2px #FFE399,
0 0 3px #FFE399,
1px 1px 0 #FFE399,
-1px -1px 0 #FFE399,
1px -1px 0 #FFE399,
-1px 1px 0 #FFE399,
2px 2px 4px rgba(0,0,0,0.5),
3px 3px 6px rgba(0,0,0,0.4),
-1px -1px 2px rgba(255, 245, 200, 0.7),
0 0 10px rgba(255, 220, 120, 0.9),
0 0 15px rgba(255, 200, 80, 0.7) !important;
}
}`
},
{
  id: 'b33',
  type: 'bubble',
  name: '边框',
  author: '11',
  group: 'g-xinmai',
  groupLabel: '心脉系列',
  previews: [
    { t: 'sent', v: '多幸运遇见了你' },
    { t: 'received', v: '多幸运爱上了你' }
  ],
  css: `
.message { box-shadow: none !important; border: none !important; font-weight: 500 !important; position: relative; overflow: visible !important; }

@keyframes glass-shine{ 0% { background-position: -20% 0; } 100% { background-position: 120% 0; } }

@keyframes floatAndBurst{ 0% { transform: translate(0, 0) scale(0.2); opacity: 0; } 40% { transform: translate(0, -22px) scale(0.8); opacity: 0.5; } 60% { transform: translate(0, -30px) scale(1); opacity: 0.6; } 100% { transform: translate(0, -35px) scale(0); opacity: 0; } }

@keyframes ecg-pulse{ 
  0% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5)); } 
  50% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)); } 
  100% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5)); } 
}

.message-received{ background: rgba(255, 255, 255, 0.08) !important; backdrop-filter: blur(25px) !important; -webkit-backdrop-filter: blur(25px) !important; border: 1px solid rgba(255, 255, 255, 0.7) !important; color: #fff !important; border-radius: 24px !important; padding: 8px 16px !important; position: relative !important; }

.message-sent{ background: rgba(255, 255, 255, 0.1) !important; backdrop-filter: blur(25px) !important; -webkit-backdrop-filter: blur(25px) !important; border: 1px solid rgba(255, 255, 255, 0.8) !important; color: #000 !important; border-radius: 24px !important; padding: 8px 16px !important; position: relative !important; }

.message-received::before{ content: '' !important; position: absolute !important; left: 0; top: 0; right: 0; bottom: 0; border-radius: inherit !important; pointer-events: none !important; z-index: 2 !important; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%) !important; background-size: 200% 100% !important; animation: glass-shine 9s infinite linear !important; }

.message-received::after{ 
  content: '' !important; 
  position: absolute !important; 
  left: -8px !important;
  bottom: -6px !important;
  width: 70px !important;
  height: 20px !important;
  z-index: 3 !important;
  background: transparent !important;
  animation: ecg-pulse 2s infinite ease-in-out !important;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 50" preserveAspectRatio="xMidYMid meet"><path d="M0,25 L15,25 L20,15 L25,35 L30,25 L45,25 L50,8 L55,42 L60,25 L75,25 L80,20 L85,30 L90,25 L105,25 L110,15 L115,35 L120,25" stroke="white" stroke-width="1" fill="none" stroke-dasharray="180" stroke-dashoffset="180"><animate attributeName="stroke-dashoffset" values="180;0;0" dur="3.5s" repeatCount="indefinite" /></path></svg>') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: left bottom !important;
  opacity: 0.9 !important;
  pointer-events: none !important;
  transform: scaleX(1);
}

.message-sent::before{ content: '' !important; position: absolute !important; left: 0; top: 0; right: 0; bottom: 0; border-radius: inherit !important; pointer-events: none !important; z-index: 2 !important; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%) !important; background-size: 200% 100% !important; animation: glass-shine 9s infinite linear !important; }

.message-sent::after{ content: '♡' !important; color: rgba(255, 255, 255, 0.8) !important; font-size: 14px !important; position: absolute !important; bottom: 8px !important; right: 12px !important; z-index: 3 !important; animation: floatAndBurst 3.8s infinite ease-out !important; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important; pointer-events: none !important; }`
},
{
  id:'b34',
  type:'bubble',
  name:'赛博不朋克',
  author:'子超兄',
  previews:[
    {t:'sent',v:'自填就是'},
    {t:'received',v:'说可以自填啊'}
  ],
  css:`
.message {
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow: visible !important;
  padding: 14px 20px !important;
  border: 2px solid !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  font-family: "Courier New", monospace !important;
  letter-spacing: 1px !important;
  position: relative !important;
  background-color: #0a0a0a !important;
}

.message.message-sent,
.message.message-received {
  display: inline-block !important;
  position: relative !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  width: auto !important;
  min-width: 200px !important;
}

.message.message-sent {
  color: #00f0ff !important;
  border-color: #00f0ff !important;
  box-shadow:
    4px 4px 0 #00f0ff,
    inset 0 0 20px rgba(0, 240, 255, 0.1) !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 2px !important;
  left: 2px !important;
  right: -2px !important;
  bottom: -2px !important;
  border: 2px solid #ff0055 !important;
  z-index: -1 !important;
}

.message.message-received {
  color: #ff0055 !important;
  border-color: #ff0055 !important;
  box-shadow:
    4px 4px 0 #ff0055,
    inset 0 0 20px rgba(255, 0, 85, 0.1) !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 2px !important;
  left: 2px !important;
  right: -2px !important;
  bottom: -2px !important;
  border: 2px solid #00f0ff !important;
  z-index: -1 !important;
}

.message::after {
  display: none !important;
}

.timestamp {
  color: #ffffff !important;
  font-size: 10px !important;
  font-family: "Courier New", monospace !important;
  background-color: #0a0a0a !important;
  border: 1px solid #ffffff !important;
  padding: 2px 8px !important;
  margin-top: 8px !important;
  display: inline-block !important;
}

.message-wrapper.sent::before {
  content: "自填" !important;
  position: absolute !important;
  top: -12px !important;
  left: -2px !important;
  background-color: #0a0a0a !important;
  color: #00f0ff !important;
  font-size: 12px !important;
  font-weight: bold !important;
  padding: 2px 12px !important;
  border: 2px solid #00f0ff !important;
  z-index: 10 !important;
}

.message-wrapper.received::before {
  content: "自填" !important;
  position: absolute !important;
  top: -12px !important;
  right: -2px !important;
  background-color: #0a0a0a !important;
  color: #ff0055 !important;
  font-size: 12px !important;
  font-weight: bold !important;
  padding: 2px 12px !important;
  border: 2px solid #ff0055 !important;
  z-index: 10 !important;
}`
},
{
  id:'b35',
  type:'bubble',
  name:'kpop仿bubble',
  author:'子超兄',
  previews:[
    {t:'sent',v:'哥哥/姐姐我想你惹'},
    {t:'received',v:'我也想你们'}
  ],
  css:`
.message {
  border-radius: 18px !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
  overflow: visible !important;
  padding: 12px 16px !important;
  border: none !important;
  font-size: 15px !important;
  line-height: 1.5 !important;
}

.message.message-sent,
.message.message-received {
  display: inline-block !important;
  position: relative !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  width: auto !important;
  min-width: 70% !important;
}

.message.message-sent {
  background-color: #9b7edc !important;
  color: #ffffff !important;
  border-radius: 18px 18px 4px 18px !important;
}

.message.message-received {
  background-color: #ffffff !important;
  color: #333333 !important;
  border-radius: 4px 18px 18px 18px !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.message::after {
  display: none !important;
}
.message-wrapper.received {
  position: relative !important;
  padding-top: 18px !important;
}

.message-wrapper.received::before {
  content: "ARTIST" !important;
  position: absolute !important;
  top: 0 !important;
  left: 48px !important;
  background: linear-gradient(90deg, #a78bfa 0%, #c084fc 100%) !important;
  color: #ffffff !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  padding: 2px 8px !important;
  border-radius: 8px !important;
  letter-spacing: 0.5px !important;
  line-height: 1 !important;
}

.timestamp {
  color: #999999 !important;
  font-size: 12px !important;
  margin-top: 4px !important;
}`
},
{
  id:'b36',type:'bubble',name:'纯白信笺',author:'眠眠',
  previews:[
    {t:'sent',v:'气泡预览*不知道啥名字'},
    {t:'received',v:'摸摸小手'},
    {t:'received',v:'是代码'}
  ],
  css:`.message { box-shadow: none !important; border-width: 0 !important; font-weight: 500 !important; position: relative; overflow: visible !important; }
/* 对方气泡：圆形，10%透明度白色背景，带内圈灰色轮廓线，#1C261E字体，实心白色字体阴影 */
.message-received { background: rgba(255, 255, 255, 0.1) !important; border: 1px solid rgba(255, 255, 255, 0.9) !important; color: #1C261E !important; text-shadow: 0 0 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 1) !important; border-radius: 24px !important; padding: 8px 16px !important; box-shadow: 0 4px 8px rgba(128, 128, 128, 0.5), 0 0 0 2px rgba(128, 128, 128, 0.3) inset !important; }
/* 自己气泡：圆形，10%透明度白色背景，带内圈灰色轮廓线，#1C261E字体，实心白色字体阴影 */
.message-sent { background: rgba(255, 255, 255, 0.1) !important; border: 1px solid rgba(255, 255, 255, 0.9) !important; color: #1C261E !important; text-shadow: 0 0 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 1) !important; border-radius: 24px !important; padding: 8px 16px !important; box-shadow: 0 4px 8px rgba(128, 128, 128, 0.5), 0 0 0 2px rgba(128, 128, 128, 0.3) inset !important; }`
},
{
  id:'b37',type:'bubble',name:'无边框',author:'11',
  group:'g-xinmai',groupLabel:'心脉系列',
  previews:[
    {t:'sent',v:'多幸运遇见了你'},
    {t:'received',v:'多幸运爱上了你'}
  ],
  css:`.message { box-shadow: none !important; border: none !important; font-weight: 500 !important; position: relative; overflow: visible !important; }
@keyframes floatAndBurst{ 0% { transform: translate(0, 0) scale(0.2); opacity: 0; } 40% { transform: translate(0, -22px) scale(0.8); opacity: 0.8; } 60% { transform: translate(0, -30px) scale(1); opacity: 1; } 100% { transform: translate(0, -35px) scale(0); opacity: 0; } }
@keyframes ecg-pulse{ 0% { filter: drop-shadow(0 0 3px rgba(255,255,255,0.8)); } 50% { filter: drop-shadow(0 0 12px rgba(255,255,255,1)); } 100% { filter: drop-shadow(0 0 3px rgba(255,255,255,0.8)); } }
.message-received{ background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; border: none !important; color: #fff !important; border-radius: 24px !important; padding: 8px 16px !important; position: relative !important; }
.message-sent{ background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; border: none !important; color: #000 !important; border-radius: 24px !important; padding: 8px 16px !important; position: relative !important; }
.message-received::after{ content: '' !important; position: absolute !important; left: -8px !important; bottom: -6px !important; width: 70px !important; height: 20px !important; z-index: 3 !important; background: transparent !important; animation: ecg-pulse 2s infinite ease-in-out !important; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 50"><path d="M0,25 L15,25 L20,15 L25,35 L30,25 L45,25 L50,8 L55,42 L60,25 L75,25 L80,20 L85,30 L90,25 L105,25 L110,15 L115,35 L120,25" stroke="white" stroke-width="1.5" fill="none"/></svg>') !important; background-size: contain !important; background-repeat: no-repeat !important; background-position: left bottom !important; opacity: 1 !important; pointer-events: none !important; transform: scaleX(1); }
.message-received::before{ content: '♡' !important; color: rgba(255,255,255,1) !important; font-size: 14px !important; position: absolute !important; bottom: 8px !important; right: 12px !important; z-index: 3 !important; animation: floatAndBurst 3.8s infinite ease-out !important; text-shadow: 0 0 12px rgba(255,255,255,0.9) !important; pointer-events: none !important; }
.message-sent::after{ content: '' !important; position: absolute !important; right: -16px !important; bottom: -6px !important; width: 70px !important; height: 20px !important; z-index: 3 !important; background: transparent !important; animation: ecg-pulse 2s infinite ease-in-out !important; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 50"><path d="M0,25 L15,25 L20,15 L25,35 L30,25 L45,25 L50,8 L55,42 L60,25 L75,25 L80,20 L85,30 L90,25 L105,25 L110,15 L115,35 L120,25" stroke="white" stroke-width="1.5" fill="none"/></svg>') !important; background-size: contain !important; background-repeat: no-repeat !important; background-position: right bottom !important; opacity: 1 !important; pointer-events: none !important; transform: scaleX(-1); }
.message-sent::before{ content: '♡' !important; color: rgba(255,255,255,1) !important; font-size: 14px !important; position: absolute !important; bottom: 8px !important; left: 12px !important; z-index: 3 !important; animation: floatAndBurst 3.8s infinite ease-out !important; text-shadow: 0 0 12px rgba(255,255,255,0.9) !important; pointer-events: none !important; }`
},
{
  id:'b38',
  type:'bubble',
  name:'豆沙绿微透',
  author:'老猫',
  previews:[
    {t:'sent',v:'123456789'},
    {t:'received',v:'一二三四五六七八九'},
    {t:'sent',v:'三点一四一五九二六'}
  ],
  css:`
.message {
  border-radius: 14px !important;
  box-shadow: none !important;
  overflow: visible !important;
  padding: 8px 12px !important;
  border: none !important;

  background: rgba(166, 196, 170, 0.35) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: #2d4238 !important;
}

.message img {
  max-width: 100% !important;
  border-radius: 12px !important;
  margin: 4px 0 !important;
  display: block !important;
}

.message.message-received {
  background: rgba(235, 240, 236, 0.4) !important;
  color: #2d4238 !important;
}

.message.message-sent {
  background: rgba(166, 196, 170, 0.45) !important;
  color: #fff !important;
}`
},
{
  id:'b39',type:'bubble',name:'粉色',author:'翊甜',
  group:'g-xinqing',groupLabel:'心情系列',
  previews:[
    {t:'sent',v:'你好，很高兴认识你～'},
    {t:'received',v:'我也是，今天天气不错呀！'}
  ],
  css:`
.message-box {
  max-width: 75%;
  margin: 16px 0;
  position: relative;
}

.message-sent,
.message-received {
  background: rgba(238, 147, 167, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.35) !important;
  color: #923850 !important;
  padding: 12px 16px !important;
  border-radius: 18px !important;
  display: inline-block !important;
  font-size: 15px !important;
  line-height: 1.5 !important;

  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
}

.message-sent {
  margin-left: auto !important;
  border-radius: 18px 6px 18px 18px !important;
}

.message-received {
  margin-right: auto !important;
  border-radius: 6px 18px 18px 18px !important;
}
`
},
{
  id:'b40',type:'bubble',name:'棕色',author:'翊甜',
  group:'g-xinqing',groupLabel:'心情系列',
  previews:[
    {t:'sent',v:'你好，很高兴认识你～'},
    {t:'received',v:'我也是，今天天气不错呀！'}
  ],
  css:`.message-sent,
.message-received {
  background: rgba(140, 120, 130, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: #4a2c4a !important; 
  padding: 12px 16px !important;
  border-radius: 18px !important;
  display: inline-block !important;
  font-size: 15px !important;
  line-height: 1.5 !important;

  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
}

.message-sent {
  margin-left: auto !important;
  border-radius: 18px 6px 18px 18px !important;
}

.message-received {
  margin-right: auto !important;
  border-radius: 6px 18px 18px 18px !important;
}`
},
{
  id:'b41',type:'bubble',name:'雾蓝',author:'翊甜',
  group:'g-xinqing',groupLabel:'心情系列',
  previews:[
    {t:'sent',v:'你好，很高兴认识你～'},
    {t:'received',v:'我也是，今天天气不错呀！'}
  ],
  css:`.message-box {
  max-width: 75%;
  margin: 16px 0;
  position: relative;
}

.message-sent,
.message-received {
  background: rgba(110, 130, 150, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: #1a365d !important;
  padding: 12px 16px !important;
  border-radius: 18px !important;
  display: inline-block !important;
  font-size: 15px !important;
  line-height: 1.5 !important;

  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
}

.message-sent {
  margin-left: auto !important;
  border-radius: 18px 6px 18px 18px !important;
}

.message-received {
  margin-right: auto !important;
  border-radius: 6px 18px 18px 18px !important;
}
`
},
{
  id:'b42',type:'bubble',name:'磨砂',author:'翊甜',
  group:'g-xiaomao',groupLabel:'玻璃小猫系列',
  previews:[
    {t:'sent',v:'测试'},
    {t:'received',v:'你不是孤单一个人在对抗世界'}
  ],
  css:`
.message-sent, .message-received {
  background: linear-gradient(145deg, rgba(137, 207, 240, 0.6), rgba(255, 182, 193, 0.6)) !important;
    color: #333 !important;
    border: 2px solid rgba(249, 199, 185, 0.8) !important;
    clip-path: polygon(
    0% 0%, 12% 0%, 17% 8%, 22% 0%,
    78% 0%, 83% 8%, 88% 0%, 100% 0%,
    100% 100%, 0% 100%
  ) !important;
    padding: 15px 20px !important;
    backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 4px rgba(255, 255, 255, 0.4) !important;
}`
},
{
  id:'b43',type:'bubble',name:'毛茸茸',author:'翊甜',
  group:'g-xiaomao',groupLabel:'玻璃小猫系列',
  previews:[
    {t:'sent',v:'测试'},
    {t:'received',v:'你不是孤单一个人在对抗世界'}
  ],
  css:`
.message-sent, .message-received {
  position: relative !important;
  background: 
    radial-gradient(circle at 30% 40%, rgba(255, 240, 245, 0.3) 2px, transparent 2px),
    radial-gradient(circle at 70% 60%, rgba(255, 220, 225, 0.3) 3px, transparent 3px),
    linear-gradient(145deg, #89cff0, #ffb6c1) !important;
  background-blend-mode: overlay !important; 
  color: #333 !important;
  clip-path: polygon(
    0% 0%, 12% 0%, 17% 8%, 22% 0%,
    78% 0%, 83% 8%, 88% 0%, 100% 0%,
    100% 100%, 0% 100%
  ) !important;
  padding: 15px 20px !important;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
  z-index: 1 !important;
}
.message-sent::before,
.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(249, 199, 185, 0.7) !important;
  clip-path: polygon(
    0% 0%, 12% 0%, 17% 8%, 22% 0%,
    78% 0%, 83% 8%, 88% 0%, 100% 0%,
    100% 100%, 0% 100%
  ) !important;
  transform: scale(1.08) !important;
  transform-origin: center !important;
  filter: blur(6px) !important;
  z-index: -1 !important;
  opacity: 0.9 !important;
}
.message-sent::after,
.message-received::after {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  clip-path: polygon(
    0% 0%, 12% 0%, 17% 8%, 22% 0%,
    78% 0%, 83% 8%, 88% 0%, 100% 0%,
    100% 100%, 0% 100%
  ) !important;
  background: rgba(255, 200, 200, 0.2) !important;
  transform: scale(1.04) !important;
  filter: blur(10px) !important;
  z-index: -2 !important;
  opacity: 0.6 !important;
}`
},
{
id:'b44',
type:'bubble',
name:'弥冬',
author:'11',
previews:[
{t:'sent',v:'多幸运遇见了你'},
{t:'received',v:'多幸运爱上了你'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received::before,
.message-sent::before {
content: '' !important;
position: absolute !important;
left: 0 !important;
top: 0 !important;
right: 0 !important;
bottom: 0 !important;
border-radius: inherit !important;
pointer-events: none !important;
z-index: 1 !important;

background-image: radial-gradient(circle at 10% 30%, rgba(255,255,255,0.5) 1px, transparent 1px),
radial-gradient(circle at 30% 10%, rgba(255,255,255,0.15) 1px, transparent 1px),
radial-gradient(circle at 60% 70%, rgba(255,255,255,0.4) 1px, transparent 1px),
radial-gradient(circle at 85% 45%, rgba(255,255,255,0.2) 1px, transparent 1px);
background-size: 90px 90px, 80px 80px, 70px 70px, 60px 60px !important;

animation: snow-natural 40s linear infinite !important;
will-change: background-position !important;
transform: translateZ(0) !important;
mix-blend-mode: screen !important;
opacity: 0.5 !important;
}

@keyframes snow-natural {
0% {
background-position: 0 0;
}
100% {
background-position: 700px 900px;
}
}

.message-received {
background: linear-gradient(145deg, rgba(30, 30, 40, 0.45), rgba(10, 10, 20, 0.35)) !important;
backdrop-filter: blur(12px) !important;
-webkit-backdrop-filter: blur(12px) !important;
border: 1px solid rgba(255, 255, 255, 0.15) !important;
box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.1) !important;
color: #fff !important;
border-radius: 24px 24px 24px 4px !important;
padding: 8px 16px !important;
position: relative !important;
isolation: isolate !important;
overflow: visible !important;
}

.message-sent {
background: linear-gradient(145deg, rgba(40, 40, 55, 0.5), rgba(20, 20, 35, 0.4)) !important;
backdrop-filter: blur(12px) !important;
-webkit-backdrop-filter: blur(12px) !important;
border: 1px solid rgba(255, 255, 255, 0.18) !important;
box-shadow: inset 0 0 14px rgba(255, 255, 255, 0.12) !important;
color: #fff !important;
border-radius: 24px 24px 4px 24px !important;
padding: 8px 16px !important;
position: relative !important;
isolation: isolate !important;
overflow: visible !important;
}

.message-received::after {
content: '' !important;
position: absolute !important;
width: 12px !important;
height: 12px !important;
left: -6px !important;
bottom: 1px !important;
z-index: 10 !important;
border-radius: 50% !important;
box-shadow: inset 3px 0 0 rgba(255, 255, 255, 0.95) !important;
transform: rotate(-40deg) !important;
filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)) !important;
animation: moonGlow 3s ease-in-out infinite !important;
}

.message-sent::after {
content: '☃️' !important;
position: absolute !important;
right: -4px !important;
bottom: 3px !important;
width: auto !important;
height: auto !important;
z-index: 10 !important;
background: transparent !important;
clip-path: none !important;
font-size: 14px !important;
line-height: 1 !important;
filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) !important;
animation: starTwinkle 2.4s ease-in-out infinite !important;
color: white !important;
text-shadow: 0 0 2px rgba(255,255,255,0.5) !important;
}

@keyframes moonGlow {
0%,
100% {
box-shadow: inset 3px 0 0 rgba(255, 255, 255, 0.95) !important;
filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)) !important;
}
50% {
box-shadow: inset 3px 0 0 rgba(255, 255, 255, 1) !important;
filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7)) !important;
}
}

@keyframes starTwinkle {
0%,
100% {
opacity: 1 !important;
transform: scale(1) !important;
filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) !important;
}
50% {
opacity: 1 !important;
transform: scale(1.15) !important;
filter: drop-shadow(0 0 6px rgba(255, 255, 255, 1)) !important;
}
}`
},
{
id:'b45',
type:'bubble',
name:'胶囊小兔',
author:'眠眠',
previews:[
{t:'sent',v:'爱没有方向，你就是导航'},
{t:'received',v:'由你'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: linear-gradient(145deg, #FFFFFF 0%, #e1edff 100%) !important;
border: none !important;
color: #808080 !important; /* 改为标准灰色 */
text-shadow:
0 0 4px rgba(255, 255, 255, 1),
0 0 8px rgba(255, 255, 255, 1),
0 0 12px rgba(255, 255, 255, 1),
0 2px 4px rgba(0, 0, 0, 0.2) !important;
border-radius: 24px !important;
padding: 8px 28px 8px 16px !important;
box-shadow:
0 10px 20px rgba(0, 0, 0, 0.1),
0 6px 6px rgba(0, 0, 0, 0.1),
0 -2px 4px rgba(255, 255, 255, 0.8),
-2px 0 4px rgba(255, 255, 255, 0.8),
0 4px 8px rgba(225, 237, 255, 0.6),
inset 0 -2px 4px rgba(0, 0, 0, 0.05),
inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
position: relative;
}

.message-sent {
background: linear-gradient(145deg, #FFFFFF 0%, #FFDDE1 100%) !important;
border: none !important;
color: #AA8C92 !important;
text-shadow: 0 0 4px rgba(255, 255, 255, 1), 0 0 8px rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 1) !important;
border-radius: 24px !important;
padding: 8px 28px 8px 28px !important;
box-shadow:
0 10px 20px rgba(0, 0, 0, 0.1),
0 6px 6px rgba(0, 0, 0, 0.1),
0 -2px 4px rgba(255, 255, 255, 0.8),
-2px 0 4px rgba(255, 255, 255, 0.8),
0 4px 8px rgba(255, 221, 225, 0.4),
inset 0 -2px 4px rgba(0, 0, 0, 0.05),
inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
position: relative;
}

.message-sent::before {
content: "";
position: absolute;
top: -5px;
left: 1px;
width: 14px;
height: 14px;
background-image: url('https://img.sobot.com/c3d7f65e19e748b28fc7e9f989624633/console/wsRes/ticket/20260219/1768af743e16171c0f95c5258f18faeb/IyOmS_1771499166374.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}

.message-sent::after {
content: "";
position: absolute;
top: 2px;
right: 7px;
width: 6px;
height: 6px;
background-image: url('https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/B18F0AACFB98437E8397ADA69B4434E8/qdqqd.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: blur(0.6px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}

.message-received::after {
content: "";
position: absolute;
top: 2px;
right: 9px;
width: 6px;
height: 6px;
background-image: url('https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/B18F0AACFB98437E8397ADA69B4434E8/qdqqd.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: blur(0.6px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}`
},
{
  id:'b46',
  type:'bubble',
  name:'轻松熊不轻松',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'(･∞･ﾐэ咕噜噜'},
    {t:'received',v:'唉 人类 人累 人泪 ( ‘-ωก )'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.1 !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
  word-break: normal !important;
}
.message.message-received {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #ffffff !important;
  padding: 13.5px 15px 10px 15px !important;
  z-index: 1 !important;
}
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 15px 10px 10px 10px !important;
  z-index: 1 !important;
}
.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771492474007_IMG_5351.png') !important;
  border-image-slice: 544 1375 236 1274 fill !important;
  border-image-width: 30px 76px 13px 71px !important;
  pointer-events: none;
}
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771492474996_IMG_5386.png') !important;
  border-image-slice: 664 1083 147 1182 fill !important;
  border-image-width: 37px 60px 8px 66px !important;
  pointer-events: none;
}`
},
{
  id:'b47',
  type:'bubble',
  name:'您有新的消息来自QQ',
  author:'os',
  previews:[
    {t:'sent',v:'你可以和我多说说话吗QwQ'},
    {t:'received',v:'当然愿意。'}
  ],
  css:`
.message-bubble-container {
  max-width: 70%;
  margin: 12px 0;
  word-wrap: break-word;
  position: relative;
  display: flex;
  flex-direction: column;
}

.message-sent {
  align-self: flex-end;
  background-color: #4DA8FF; 
  border-radius: 18px 4px 18px 18px;
  padding: 12px 16px;
  color: white;
  position: relative;
  max-width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.message-sent::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: -8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 0 8px;
  border-color: transparent transparent transparent #4DA8FF; 
}

.message-received {
  align-self: flex-start;
  background-color: white;
  border-radius: 4px 18px 18px 18px;
  padding: 12px 16px;
  color: #333;
  position: relative;
  max-width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E5E5;
}

.message-received::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 0;
  border-color: transparent #E5E5E5 transparent transparent;
}

.message-received::after {
  content: '';
  position: absolute;
  bottom: 1px;
  left: -7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7px 7px 0;
  border-color: transparent white transparent transparent;
}

@media (prefers-color-scheme: dark) {
  .message-received {
    background-color: #2B2B2B;
    color: #E0E0E0;
    border-color: #404040;
  }
  
  .message-received::after {
    border-color: transparent #2B2B2B transparent transparent;
  }
}`
},
{
  id: 'b48',
  type: 'bubble',
  name: '人，猫喜欢你',
  author: '家夫是小猫^^',
  previews: [
    {
      t: 'sent',
      v: '人，猫喜欢你。'
    },
    {
      t: 'received',
      v: '嗯，人也喜欢猫。'
    }
  ],
  css: `.message-sent {
  position: relative !important;
  background: rgba(245, 245, 245, 0.9) !important;
  border: 2px solid rgba(210, 210, 210, 0.6) !important;
  border-radius: 12px 12px 0 12px !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.06) !important;
  padding: 5px 12px !important;
  margin: 3px 0 3px auto !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #999 !important;
  display: inline-block !important;
  max-width: none !important;
  overflow: visible !important;
  margin-bottom: 18px !important;
  z-index: 1 !important;
}
.message-sent::after {
  content: '' !important;
  position: absolute !important;
  bottom: -13px !important;
  left: -7px !important;
  width: 26px !important;
  height: 26px !important;
  background: url('https://files.catbox.moe/bq2cxt.png') center / contain no-repeat !important;
  image-rendering: pixelated !important;
  -ms-interpolation-mode: nearest-neighbor !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 99999 !important;
  pointer-events: none !important;
}
.message-sent * {
  color: #888 !important;
}
.message-received {
  position: relative !important;
  background: rgba(215, 215, 215, 0.7) !important;
  border: 2px solid rgba(190, 190, 190, 0.5) !important;
  border-radius: 12px 12px 12px 0 !important;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.06) !important;
  padding: 5px 12px !important;
  margin: 3px auto 3px 0 !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #555 !important;
  display: inline-block !important;
  max-width: none !important;
  overflow: visible !important;
  margin-bottom: 18px !important;
  z-index: 1 !important;
}
.message-received::after {
  content: '' !important;
  position: absolute !important;
  bottom: -13px !important;
  right: -7px !important;
  width: 26px !important;
  height: 26px !important;
  background: url('https://files.catbox.moe/v9hr2m.png') center / contain no-repeat !important;
  image-rendering: pixelated !important;
  -ms-interpolation-mode: nearest-neighbor !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 99999 !important;
  pointer-events: none !important;
}`
},
{
  id:'b49',
  type:'bubble',
  name:'彩色猫猫',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'生活枯燥无味'},
    {t:'received',v:'小猫cos人类'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received,
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 7px 8px 7px 9px !important;
  z-index: 1 !important;
}
.message.message-received::before,
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771485027595_IMG_5304.png') !important;
  border-image-slice: 325 691 120 683 fill !important;
  border-image-width: 18px 38px 7px 38px !important;
  pointer-events: none;
}`
},
{
  id:'b50',
  type:'bubble',
  name:'腮红小熊',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'看起来很萌'},
    {t:'received',v:'实际上也很萌ᗜ 𖥦 ᗜ'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received,
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 10px 8px 5px 8px !important;
  z-index: 1 !important;
}
.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771498628014_IMG_5280.png') !important;
  border-image-slice: 206 350 165 346 fill !important;
  border-image-width: 11px 19px 9px 19px !important;
  transform: scaleX(-1) !important;
  pointer-events: none;
}
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771498628014_IMG_5280.png') !important;
  border-image-slice: 206 350 165 346 fill !important;
  border-image-width: 11px 19px 9px 19px !important;
  pointer-events: none;
}`
},
{
  id:'b51',
  type:'bubble',
  name:'小兔耳朵',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'来许个愿吧'},
    {t:'received',v:'希望在你身边'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received,
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 18px 8px 7px 9px !important;
  text-align: center !important;
  z-index: 1 !important;
}
.message.message-received::before,
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://i.postimg.cc/dQp9fRtg/IMG-5275.png') !important;
  border-image-slice: 454 497 246 511 fill !important;
  border-image-width: 23px 25px 12px 26px !important;
  pointer-events: none;
}`
},
{
  id:'b52',
  type:'bubble',
  name:'小天使',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'∗ ˙ . 時空を着て恋をする. ♡ ˙ ∗'},
    {t:'received',v:'穿越時空愛戀…'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received,
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 6px 22px 4px 22px !important;
  z-index: 1 !important;
}
.message.message-received::before,
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771471845838_IMG_5281.png') !important;
  border-image-slice: 92 802 312 785 fill !important;
  border-image-width: 6px 45px 17px 44px !important;
  pointer-events: none;
}`
},
{
  id:'b53',
  type:'bubble',
  name:'日',
  author:'蛋挞',
  group:'g-weixin',
  groupLabel:'仿微信系列',
  previews:[
    {t:'sent',v:'我等了你几分钟的消息了，还没有回我，你让我怎么活?!我将要沉入海底，封闭自己，我是不会原谅你的!你等着吧，我迟早找人弄你!o(一ω一)o'},
    {t:'received',v:'我这个小女孩的设定就是一定要你陪つω• )'}
  ],
  css:`.message {
    position: relative !important;
    line-height: 1.3 !important;
    word-break: break-word !important;
    overflow: visible !important;
    width: fit-content !important;
    max-width: 280px !important;
    border-radius: 4px;
    box-shadow: none;
    padding: 8px 11px;
    border: none;
}
.message.message-sent,
.message.message-received {
    display: inline-block;
    position: relative;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    width: auto;
    min-width: 70%;
    color: #000;
}
.message.message-sent {
    background-color: #95ec69;
}
.message.message-received {
    background-color: #ffffff;
}
.message::after {
    content: "";
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 1.5px;
}
.message.message-sent::after {
    right: -3.8px;
    top: 18px;
    background-color: #95ec69;
    transform: translateY(-50%) rotate(45deg);
}
.message.message-received::after {
    left: -3.8px;
    top: 18px;
    background-color: #ffffff;
    transform: translateY(-50%) rotate(45deg);
}`
},
{
  id:'b54',
  type:'bubble',
  name:'透明玻璃',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'永不停歇的雨季'},
    {t:'received',v:'是我潮湿的眼底'}
  ],
  css:`.message-sent,
.message-received {
display: inline-block !important;
padding: 7px 10px !important;
border-radius: 8px !important;
color: rgba(0,0,0,0.7) !important;
position: relative !important;
background: rgba(255,255,255,0.18) !important;
backdrop-filter: none !important;
-webkit-backdrop-filter: none !important;
line-height: 1.4 !important;
border: 1px solid rgba(255,255,255,0.4) !important;
box-shadow: 0 2px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2) !important;
}
.message-sent::after,
.message-received::after {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
height: 1px;
background: rgba(255,255,255,0.8);
border-radius: 8px 8px 0 0;
z-index: 1;
}`
},
{
  id:'b55',
  type:'bubble',
  name:'夜',
  author:'蛋挞',
  group:'g-weixin',
  groupLabel:'仿微信系列系列',
  previews:[
    {t:'sent',v:'我等了你几分钟的消息了，还没有回我，你让我怎么活?!我将要沉入海底，封闭自己，我是不会原谅你的!你等着吧，我迟早找人弄你!o(一ω一)o'},
    {t:'received',v:'我这个小女孩的设定就是一定要你陪つω• )'}
  ],
  css:`.message {
position: relative !important;
line-height: 1.3 !important;
word-break: break-word !important;
overflow: visible !important;
width: fit-content !important;
max-width: 280px !important;
border-radius: 4px;
box-shadow: none;
padding: 8px 11px;
border: none;
}
.message.message-sent,
.message.message-received {
display: inline-block;
position: relative;
backdrop-filter: none;
-webkit-backdrop-filter: none;
width: auto;
min-width: 70%;
color: #000;
}
.message.message-sent {
background-color: #59B269;
}
.message.message-received {
background-color: #2c2c2c !important;
color: #fff !important;
}
.message::after {
content: "";
position: absolute;
width: 9px;
height: 9px;
border-radius: 1.5px;
}
.message.message-sent::after {
right: -3.8px;
top: 18px;
background-color: #59B269;
transform: translateY(-50%) rotate(45deg);
}
.message.message-received::after {
left: -3.8px;
top: 18px;
background-color: #2c2c2c !important;
transform: translateY(-50%) rotate(45deg);
}`
},
{
id:'b56',
type:'bubble',
name:'emo天使',
author:'眠眠',
previews:[
{t:'sent',v:'气泡预览*emo天使'},
{t:'received',v:'宝宝'},
{t:'received',v:'等你'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: radial-gradient(ellipse at center, #FFFFFF 0%, #FFFFFF 40%, #F2E2E2 100%) !important;
border: 1px solid #BFA9AD !important;
color: #AA8C92 !important;
text-shadow: none !important;
border-radius: 24px !important;
padding: 8px 28px 8px 16px !important;
box-shadow:
0 10px 20px rgba(0, 0, 0, 0.1),
0 6px 6px rgba(0, 0, 0, 0.1),
inset 0 -2px 4px rgba(0, 0, 0, 0.05),
inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
position: relative;
}

.message-received::before {
content: "";
position: absolute;
top: -5px;
left: -5px;
width: 18px;
height: 18px;
background-image: url('https://file.zhuyitai.com/feedback/202602/20/c54d4c4f80ba761e59f183290fa101d0.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}

.message-received::after {
content: "";
position: absolute;
top: 50%;
right: 8px;
transform: translateY(-50%);
width: 16px;
height: 16px;
background-image: url('https://saas.chatbot.cn/download/minio/standard/2026-02-20/34a56adce77b4e7d80a738159e372946.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: brightness(0) saturate(100%) invert(78%) sepia(8%) saturate(260%) hue-rotate(315deg) brightness(94%) contrast(89%) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}

.message-sent {
background: radial-gradient(ellipse at center, #FFFFFF 0%, #FBE5EA 100%) !important;
border: 2px solid #FBE5EA !important;
color: #8A8A8C !important;
text-shadow: none !important;
border-radius: 24px !important;
padding: 6px 32px 6px 28px !important;
box-shadow:
0 10px 20px rgba(0, 0, 0, 0.1),
0 6px 6px rgba(0, 0, 0, 0.1),
inset 0 -2px 4px rgba(0, 0, 0, 0.05),
inset 0 2px 4px rgba(255, 255, 255, 0.8) !important;
position: relative;
}

.message-sent::before {
content: "";
position: absolute;
top: 50%;
left: 8px;
transform: translateY(-50%);
width: 16px;
height: 16px;
background-image: url('https://saas.chatbot.cn/download/minio/standard/2026-02-20/34a56adce77b4e7d80a738159e372946.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(110%) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}

.message-sent::after {
content: "";
position: absolute;
top: -5px;
right: -5px;
width: 18px;
height: 18px;
background-image: url('https://cn.oilgasmall.com/uploads/20260220/6bd37bbba396820adc6b9ff72a17511b.png');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
background-color: transparent;
filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
z-index: 10;
}`
},
{
  id:'b57',
  type:'bubble',
  name:'霜雪半透明',
  author:'七九',
  previews:[
    {t:'sent',v:'生命给了我多少积雪'},
    {t:'received',v:'我就能遇到多少春天'}
  ],
  css:`
.message {
  border-radius: 20px !important;
  border: none !important; 
 
  backdrop-filter: blur(12px) saturate(120%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(120%) !important;
 
  padding: 14px 18px !important;
  overflow: hidden !important;
}

.message.message-received {
  background-color: rgba(255, 255, 255, 0.3) !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='rgba(100, 180, 255, 0.4)' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='M12 2v20m10-10H2m15.536-7.071L5.464 19.464m13.072 0L5.464 4.536'/%3E%3C/svg%3E"),
    linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(200,230,255,0.1) 100%) !important;
 
  background-position: top 6px left 6px, center !important;
  background-size: 18px 18px, cover !important;
  background-repeat: no-repeat, no-repeat !important;

  color: #005a9e !important;
 
  box-shadow:
    0 0 16px rgba(150, 210, 255, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.7),
    inset 1px 1px 3px rgba(255, 255, 255, 0.6) !important;
}

.message.message-sent {
  background-color: rgba(60, 160, 255, 0.3) !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='rgba(255, 255, 255, 0.5)' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='M12 2v20m10-10H2m15.536-7.071L5.464 19.464m13.072 0L5.464 4.536'/%3E%3C/svg%3E"),
    linear-gradient(135deg, rgba(100,190,255,0.5) 0%, rgba(0,120,255,0.1) 100%) !important;
 
  background-position: top 6px right 6px, center !important;
  background-size: 18px 18px, cover !important;
  background-repeat: no-repeat, no-repeat !important;

  color: #ffffff !important;
 
  box-shadow:
    0 0 18px rgba(80, 180, 255, 0.7),
    inset 0 0 20px rgba(255, 255, 255, 0.3),
    inset 1px 1px 3px rgba(255, 255, 255, 0.4) !important;
}

.message::after {
   display: none !important;
}`
},
{
  id:'b58',
  type:'bubble',
  name:'动画',
  author:'Spring',
  group:'g-fenyun',
  groupLabel:'粉云天使系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message {
  border-radius: 12px !important;
  box-shadow: 0 0 15px 2px rgba(255, 220, 230, 0.6) !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 248, 0.85)) !important;
  overflow: visible !important;
  padding: 8px 14px !important;
  border: none !important;
  position: relative !important;
}

@keyframes wingFloat {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

.message.message-received {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 248, 0.85)) !important;
  color: #555555 !important;
  box-shadow: 0 0 18px 3px rgba(255, 220, 230, 0.5) !important;
  border: none !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: -8px !important;
  right: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREtppmfkXc8c5vZE2fo5p8IIkslpKFQACqyIAAtjY0VSYDkaKCFuyTjoE.png') no-repeat center !important;
  background-size: 100% 100% !important;
  z-index: 2 !important;
  pointer-events: none !important;
  animation: wingFloat 2.8s ease-in-out infinite !important;
}

.message.message-sent {
  background: linear-gradient(135deg, rgba(255, 248, 250, 0.9), rgba(255, 240, 245, 0.8)) !important;
  color: #666666 !important;
  box-shadow: 0 0 18px 3px rgba(255, 220, 230, 0.5) !important;
  border: none !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: -8px !important;
  left: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREtppmfkXc8c5vZE2fo5p8IIkslpKFQACqyIAAtjY0VSYDkaKCFuyTjoE.png') no-repeat center !important;
  background-size: 100% 100% !important;
  z-index: 2 !important;
  pointer-events: none !important;
  animation: wingFloat 2.8s ease-in-out infinite !important;
}

.message::after {
  content: '' !important;
  position: absolute !important;
  width: 12px !important;
  height: 12px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 248, 0.85)) !important;
  border: none !important;
  box-shadow: 0 0 8px rgba(255, 220, 230, 0.4) !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  bottom: -4px !important;
  right: -4px !important;
  border-radius: 0 0 0 4px !important;
}

.message.message-received::after {
  bottom: -4px !important;
  left: -4px !important;
  border-radius: 0 0 4px 0 !important;
}`
},
{
  id:'b59',
  type:'bubble',
  name:'静态',
  author:'Spring',
  group:'g-fenyun',
  groupLabel:'粉云天使系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message {
  border-radius: 12px !important;
  box-shadow: 0 0 15px 2px rgba(255, 220, 230, 0.6) !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 248, 0.85)) !important;
  overflow: visible !important;
  padding: 8px 14px !important;
  border: none !important;
  position: relative !important;
}

.message.message-received {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 248, 0.85)) !important;
  color: #555555 !important;
  box-shadow: 0 0 18px 3px rgba(255, 220, 230, 0.5) !important;
  border: none !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: -8px !important;
  right: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREtppmfkXc8c5vZE2fo5p8IIkslpKFQACqyIAAtjY0VSYDkaKCFuyTjoE.png') no-repeat center !important;
  background-size: 100% 100% !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

.message.message-sent {
  background: linear-gradient(135deg, rgba(255, 248, 250, 0.9), rgba(255, 240, 245, 0.8)) !important;
  color: #666666 !important;
  box-shadow: 0 0 18px 3px rgba(255, 220, 230, 0.5) !important;
  border: none !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: -8px !important;
  left: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREtppmfkXc8c5vZE2fo5p8IIkslpKFQACqyIAAtjY0VSYDkaKCFuyTjoE.png') no-repeat center !important;
  background-size: 100% 100% !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

.message::after {
  content: '' !important;
  position: absolute !important;
  width: 12px !important;
  height: 12px !important;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 248, 0.85)) !important;
  border: none !important;
  box-shadow: 0 0 8px rgba(255, 220, 230, 0.4) !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  bottom: -4px !important;
  right: -4px !important;
  border-radius: 0 0 0 4px !important;
}

.message.message-received::after {
  bottom: -4px !important;
  left: -4px !important;
  border-radius: 0 0 4px 0 !important;
}`
},
{
  id:'b60',
  type:'bubble',
  name:'紫雾坠星',
  author:'Spring',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message {
  border-radius: 18px !important;
  background:
    radial-gradient(ellipse at center, #f3e8ff 0%, transparent 70%),
    #ffffff !important;
  border: 0.6px solid #d4bfff !important;
  box-shadow: 0 0 9px rgba(170, 140, 255, 0.3) !important;
  padding: 7px 14px !important;
  position: relative !important;
  overflow: visible !important;
}

.message.message-received {
  color: #2a2a2a !important;
}

.message.message-sent {
  color: #2a2a2a !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  left: -12px !important;
  bottom: 6px !important;
  width: 28px !important;
  height: 28px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREvRpmhU6GDwFpKxQckFzXKlnT-8d6gAC4iIAAtjY0VT1xbMMQLfcfjoE.png') no-repeat center !important;
  background-size: contain !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

.message.message-received::after {
  content: '' !important;
  position: absolute !important;
  right: -12px !important;
  bottom: 6px !important;
  width: 28px !important;
  height: 28px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREvRpmhU6GDwFpKxQckFzXKlnT-8d6gAC4iIAAtjY0VT1xbMMQLfcfjoE.png') no-repeat center !important;
  background-size: contain !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  left: -12px !important;
  bottom: 6px !important;
  width: 28px !important;
  height: 28px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREvRpmhU6GDwFpKxQckFzXKlnT-8d6gAC4iIAAtjY0VT1xbMMQLfcfjoE.png') no-repeat center !important;
  background-size: contain !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

.message.message-sent::after {
  content: '' !important;
  position: absolute !important;
  right: -12px !important;
  bottom: 6px !important;
  width: 28px !important;
  height: 28px !important;
  background: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEREvRpmhU6GDwFpKxQckFzXKlnT-8d6gAC4iIAAtjY0VT1xbMMQLfcfjoE.png') no-repeat center !important;
  background-size: contain !important;
  z-index: 2 !important;
  pointer-events: none !important;
}`
},
{
  id:'b61',
  type:'bubble',
  name:'果冻',
  author:'七九',
  group:'g-bodian',
  groupLabel:'粉色波点系列',
  previews:[
    {t:'sent',v:'生命给了我多少积雪'},
    {t:'received',v:'我就能遇到多少春天'}
  ],
  css:`
  .message {
    border-radius: 24px !important;
    border: 1px solid rgba(255, 255, 255, 0.70) !important;

    box-shadow:
      0 4px 10px rgba(255, 122, 173, 0.18),
      0 1px 3px rgba(255, 122, 173, 0.14) !important;

    position: relative !important;
    overflow: hidden !important;
  }

  .message.message-sent {
    color: #3b1430 !important;
    background-color: #f7b8d2 !important;

    background-image:
      radial-gradient(circle at 82% 18%, rgba(255,255,255,0.50) 0 20px, rgba(255,255,255,0.00) 62px),
      radial-gradient(circle at 50% 55%, rgba(255,255,255,0.18) 0 62%, rgba(255,255,255,0.00) 78%),
      radial-gradient(circle at 7px 7px, rgba(255,255,255,0.22) 0 1.5px, transparent 1.6px),
      radial-gradient(circle at 13px 12px, rgba(255,255,255,0.16) 0 0.9px, transparent 1px),
      radial-gradient(circle at 10px 10px, rgba(255,255,255,0.18) 0 2.2px, transparent 2.3px),
      radial-gradient(circle at 8px 8px, rgba(255,255,255,0.18) 0 1.2px, transparent 1.3px),
      radial-gradient(circle at 12px 8px, rgba(255,255,255,0.18) 0 1.2px, transparent 1.3px),
      radial-gradient(circle at 10px 11px, rgba(255,255,255,0.16) 0 1.2px, transparent 1.3px) !important;

    background-size:
      100% 100%,
      100% 100%,
      18px 18px,
      22px 22px,
      40px 40px,
      34px 34px,
      34px 34px,
      34px 34px !important;

    background-repeat:
      no-repeat,
      no-repeat,
      repeat,
      repeat,
      repeat,
      repeat,
      repeat,
      repeat !important;

    background-position:
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0 !important;

    box-shadow:
      0 4px 10px rgba(255, 122, 173, 0.18),
      0 1px 3px rgba(255, 122, 173, 0.14),
      inset 0 0 0 1px rgba(255,255,255,0.26),
      inset 0 0 0 6px rgba(255, 160, 200, 0.08),
      inset 0 12px 22px rgba(255,255,255,0.18) !important;
  }

  .message.message-received {
    color: #4a2536 !important;
    background-color: #fff2f8 !important;

    background-image:
      radial-gradient(circle at 82% 18%, rgba(255,255,255,0.60) 0 22px, rgba(255,255,255,0.00) 66px),
      radial-gradient(circle at 50% 55%, rgba(247,184,210,0.16) 0 62%, rgba(255,255,255,0.00) 78%),
      radial-gradient(circle at 7px 7px, rgba(247,184,210,0.28) 0 1.4px, transparent 1.5px),
      radial-gradient(circle at 14px 12px, rgba(247,184,210,0.20) 0 0.9px, transparent 1px),
      radial-gradient(circle at 10px 10px, rgba(247,184,210,0.18) 0 2px, transparent 2.1px),
      radial-gradient(circle at 8px 8px, rgba(247,184,210,0.22) 0 1.1px, transparent 1.2px),
      radial-gradient(circle at 12px 8px, rgba(247,184,210,0.22) 0 1.1px, transparent 1.2px),
      radial-gradient(circle at 10px 11px, rgba(247,184,210,0.18) 0 1.1px, transparent 1.2px) !important;

    background-size:
      100% 100%,
      100% 100%,
      20px 20px,
      24px 24px,
      44px 44px,
      36px 36px,
      36px 36px,
      36px 36px !important;

    background-repeat:
      no-repeat,
      no-repeat,
      repeat,
      repeat,
      repeat,
      repeat,
      repeat,
      repeat !important;

    background-position:
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0 !important;

    border: 1px solid rgba(247, 184, 210, 0.60) !important;

    box-shadow:
      0 4px 10px rgba(255, 122, 173, 0.14),
      0 1px 3px rgba(255, 122, 173, 0.10),
      inset 0 0 0 1px rgba(255,255,255,0.30),
      inset 0 0 0 6px rgba(255, 160, 200, 0.06),
      inset 0 12px 22px rgba(255,255,255,0.18) !important;
  }

  .meta{
    color: rgba(255,255,255,0.70);
    font-size: 12px;
    margin: 0 0 10px 2px;
}`
},
{
  id:'b62',
  type:'bubble',
  name:'平面',
  author:'七九',
  group:'g-bodian',
  groupLabel:'粉色波点系列',
  previews:[
    {t:'sent',v:'生命给了我多少积雪'},
    {t:'received',v:'我就能遇到多少春天'}
  ],
  css:`
.message {
  border-radius: 22px !important;
  border: 1px solid rgba(255, 255, 255, 0.70) !important;

  box-shadow:
    0 4px 10px rgba(255, 122, 173, 0.18),
    0 1px 3px rgba(255, 122, 173, 0.14) !important;

  position: relative !important;
  overflow: hidden !important;
}

.message.message-sent {
  color: #3b1430 !important;

  background-color: #f7b8d2 !important;

  background-image:
    radial-gradient(circle at 28% 18%, rgba(255,255,255,0.45) 0 18px, rgba(255,255,255,0.00) 52px),
    radial-gradient(circle at 7px 7px, rgba(255,255,255,0.22) 0 1.5px, transparent 1.6px),
    radial-gradient(circle at 13px 12px, rgba(255,255,255,0.16) 0 0.9px, transparent 1px),
    radial-gradient(circle at 10px 10px, rgba(255,255,255,0.18) 0 2.2px, transparent 2.3px) !important;

  background-size:
    100% 100%,
    18px 18px,
    22px 22px,
    40px 40px !important;

  background-repeat:
    no-repeat,
    repeat,
    repeat,
    repeat !important;

  background-position:
    0 0,
    0 0,
    0 0,
    0 0 !important;

  box-shadow:
    0 4px 10px rgba(255, 122, 173, 0.18),
    0 1px 3px rgba(255, 122, 173, 0.14),
    inset 0 0 0 1px rgba(255,255,255,0.22),
    inset 0 10px 18px rgba(255,255,255,0.16) !important;
}

.message.message-received {
  color: #4a2536 !important;

  background-color: #fff2f8 !important;

  background-image:
    radial-gradient(circle at 26% 16%, rgba(255,255,255,0.55) 0 20px, rgba(255,255,255,0.00) 56px),
    radial-gradient(circle at 7px 7px, rgba(247,184,210,0.28) 0 1.4px, transparent 1.5px),
    radial-gradient(circle at 14px 12px, rgba(247,184,210,0.20) 0 0.9px, transparent 1px),
    radial-gradient(circle at 10px 10px, rgba(247,184,210,0.18) 0 2px, transparent 2.1px) !important;

  background-size:
    100% 100%,
    20px 20px,
    24px 24px,
    44px 44px !important;

  background-repeat:
    no-repeat,
    repeat,
    repeat,
    repeat !important;

  background-position:
    0 0,
    0 0,
    0 0,
    0 0 !important;

  border: 1px solid rgba(247, 184, 210, 0.60) !important;

  box-shadow:
    0 4px 10px rgba(255, 122, 173, 0.14),
    0 1px 3px rgba(255, 122, 173, 0.10),
    inset 0 0 0 1px rgba(255,255,255,0.28),
    inset 0 10px 18px rgba(255,255,255,0.18) !important;
}`
},
{
id:'b63',
type:'bubble',
name:'小雪人',
author:'眠眠',
group:'g-shenkong',
groupLabel:'恋与深空系列',
previews:[
{t:'sent',v:'你是我朝夕相伴触手可及的虚拟'},
{t:'received',v:'你是我未曾拥有无法捕捉的亲昵'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: #FDFCFA !important;
border-color: transparent !important;
color: #000000 !important;
border-radius: 24px 24px 24px 4px !important;
padding: 8px 16px !important;
padding-top: 24px !important; 
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06) !important; 
position: relative !important;
}

.message-received::before {
content: "";
position: absolute;
top: -2px; 
right: -2px;
width: 30px; 
height: 30px; 
background-image: url('https://zkaicc.huilan.com/aicc/api/aicc-file/miniofile/preViewPicture/aicc/qdqqd_1771654083526.png');
background-size: contain;
background-repeat: no-repeat;
background-position: top right;
transform: scaleX(-1); 
z-index: 1;
pointer-events: none; 
}

.message-sent {
background: #FDFCFA !important; 
border-color: transparent !important;
color: #000000 !important;
border-radius: 24px 24px 4px 24px !important;
padding: 8px 16px !important;
padding-top: 24px !important; 
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06) !important; 
position: relative !important;
}

.message-sent::before {
content: "";
position: absolute;
top: -2px; 
left: -2px; 
width: 30px; 
height: 30px;
background-image: url('https://zkaicc.huilan.com/aicc/api/aicc-file/miniofile/preViewPicture/aicc/qdqqd_1771654083526.png');
background-size: contain;
background-repeat: no-repeat;
background-position: top left;
z-index: 1;
pointer-events: none;
}`
},
{
id:'b64',
type:'bubble',
name:'鸦式震惊',
author:'眠眠',
group:'g-shenkong',
groupLabel:'恋与深空系列',
previews:[
{t:'sent',v:'你是我朝夕相伴触手可及的虚拟'},
{t:'received',v:'你是我未曾拥有无法捕捉的亲昵'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: #858585 !important;
border-color: transparent !important;
color: #ffffff !important;
border-radius: 24px 24px 24px 4px !important;
padding: 8px 16px !important;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
position: relative;
}

.message-received::before {
content: "";
position: absolute;
width: 28px;
height: 28px;
border-radius: 50%;
background-image: url("https://zl.wpscdn.cn/2026/02/21/space_img/9c467bd0-a90d-4604-bf68-c0557f6875f2.png");
background-size: cover;
background-position: center;
transform: scaleX(-1);
top: -9px;
right: -4px;
left: auto;
z-index: 10;
}

.message-received::after {
content: "";
position: absolute;
width: 20px;
height: 20px;
background-image: url("https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/C698EDC842614086809CF2D2E4FDA217/qdqqd.png");
background-size: contain;
background-position: center;
background-repeat: no-repeat;
transform: scaleX(-1);
top: -10px;
left: -4px;
right: auto;
z-index: 10;
}

.message-sent {
background: #858585 !important;
border-color: transparent !important;
color: #ffffff !important;
border-radius: 24px 24px 4px 24px !important;
padding: 8px 16px !important;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
position: relative;
}

.message-sent::before {
content: "";
position: absolute;
width: 28px;
height: 28px;
border-radius: 50%;
background-image: url("https://zl.wpscdn.cn/2026/02/21/space_img/9c467bd0-a90d-4604-bf68-c0557f6875f2.png");
background-size: cover;
background-position: center;
top: -9px;
left: -4px;
z-index: 10;
}

.message-sent::after {
content: "";
position: absolute;
width: 20px;
height: 20px;
background-image: url("https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/C698EDC842614086809CF2D2E4FDA217/qdqqd.png");
background-size: contain;
background-position: center;
background-repeat: no-repeat;
top: -10px;
right: -4px;
z-index: 10;
}`
},
{
id:'b65',
type:'bubble',
name:'两颗苹果',
author:'眠眠',
group:'g-shenkong',
groupLabel:'恋与深空系列',
previews:[
{t:'sent',v:'你是我朝夕相伴触手可及的虚拟'},
{t:'received',v:'你是我未曾拥有无法捕捉的亲昵'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: #DC6064 !important;
border-color: transparent !important;
color: #FFFFFF !important;
border-radius: 24px 24px 24px 4px !important;
padding: 8px 16px !important;
box-shadow: 0 3px 8px rgba(220, 96, 100, 0.28) !important;
position: relative;
z-index: 1;
}

.message-received > * {
position: relative;
z-index: 3 !important;
}

.message-received::before {
content: "";
position: absolute;
top: -4px;
right: -4px;
width: 28px;
height: 28px;
background-image: url('https://cn.oilgasmall.com/uploads/20260221/216565523b7c3c4b71634414a27165dd.png');
background-size: contain;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 2;
}

.message-sent {
background: #95BD6B !important;
border-color: transparent !important;
color: #FFFFFF !important;
border-radius: 24px 24px 4px 24px !important;
padding: 8px 16px 8px 32px !important;
box-shadow: 0 3px 8px rgba(120, 150, 90, 0.28) !important;
position: relative;
z-index: 1;
}

.message-sent > * {
position: relative;
z-index: 3 !important;
}

.message-sent::before {
content: "";
position: absolute;
top: -4px;
left: -4px;
width: 28px;
height: 28px;
background-image: url('https://cdncs.ykt.cbern.com.cn/v0.1/download?path=/zxx_feedback/qdqqd/1771660206893.png');
background-size: contain;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 2;
}`
},
{
id:'b66',
type:'bubble',
name:'兔球球',
author:'眠眠',
group:'g-shenkong',
groupLabel:'恋与深空系列',
previews:[
{t:'sent',v:'你是我朝夕相伴触手可及的虚拟'},
{t:'received',v:'你是我未曾拥有无法捕捉的亲昵'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: #ffffff !important;
border-color: transparent !important;
color: #000000 !important;
border-radius: 24px 24px 24px 4px !important;
padding: 8px 16px !important;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08) !important;
position: relative;
z-index: 0;
}

.message-sent {
background: #ffffff !important;
border-color: transparent !important;
color: #000000 !important;
border-radius: 24px 24px 4px 24px !important;
padding: 8px 16px !important;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08) !important;
position: relative;
z-index: 0;
}

.message-sent > *,
.message-received > * {
position: relative;
z-index: 9999 !important;
}

.message-sent::before {
content: "";
position: absolute;
top: -12px;
left: 9px;
width: 22px;
height: 22px;
background-image: url("https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/4EBC1F4C96EC41B8AB6AD7A255DB0851/qdqqd.png");
background-size: contain;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 1;
}

.message-sent::after {
content: "";
position: absolute;
top: 4px;
left: 10px;
width: 16px;
height: 16px;
background-image: url("https://img.sobot.com/c3d7f65e19e748b28fc7e9f989624633/console/wsRes/ticket/20260220/1768af743e16171c0f95c5258f18faeb/sofSC_1771587833823.png");
background-size: contain;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 1;
}

.message-sent .right-icon {
content: "";
position: absolute;
top: -4px;
right: -4px;
width: 15px;
height: 15px;
background-image: url("https://cdncs.ykt.cbern.com.cn/v0.1/download?path=/zxx_feedback/qdqqd/1771588610541.png");
background-size: cover;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 2;
}

.message-received::before {
content: "";
position: absolute;
top: -12px;
right: 9px;
width: 22px;
height: 22px;
background-image: url("https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/4EBC1F4C96EC41B8AB6AD7A255DB0851/qdqqd.png");
background-size: contain;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 1;
}

.message-received::after {
content: "";
position: absolute;
top: 4px;
right: 10px;
width: 16px;
height: 16px;
background-image: url("https://img.sobot.com/c3d7f65e19e748b28fc7e9f989624633/console/wsRes/ticket/20260220/1768af743e16171c0f95c5258f18faeb/sofSC_1771587833823.png");
background-size: contain;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 1;
}

.message-received .left-icon {
content: "";
position: absolute;
top: -4px;
left: -4px;
width: 15px;
height: 15px;
background-image: url("https://cdncs.ykt.cbern.com.cn/v0.1/download?path=/zxx_feedback/qdqqd/1771588610541.png");
background-size: cover;
background-repeat: no-repeat;
background-position: center;
pointer-events: none;
z-index: 2;
}`
},
{
id:'b67',
type:'bubble',
name:'涂鸦叽',
author:'眠眠',
group:'g-shenkong',
groupLabel:'恋与深空系列',
previews:[
{t:'sent',v:'你是我朝夕相伴触手可及的虚拟'},
{t:'received',v:'你是我未曾拥有无法捕捉的亲昵'}
],
css:`.message {
box-shadow: none !important;
border-width: 0 !important;
font-weight: 500 !important;
position: relative;
overflow: visible !important;
}

.message-received {
background: rgba(255, 228, 140, 1) !important;
border-color: transparent !important;
color: #000000 !important;
border-radius: 24px 24px 24px 4px !important;
padding: 6px 14px !important;
padding-top: 22px !important;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1) !important;
position: relative !important;
overflow: visible !important;
z-index: 1 !important;
}

.message-received * {
position: relative !important;
z-index: 10 !important;
top: -3px !important;
}

.message-received::before {
content: "" !important;
position: absolute !important;
top: -10px !important;
left: auto !important;
right: -8px !important;
width: 36px !important;
height: 36px !important;
background-image: url('https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/FD4C5A8F56EC43EFB326655DB2974217/qdqqd.png') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
transform: scaleX(-1) !important;
pointer-events: none !important;
z-index: 1 !important;
-webkit-mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
}

.message-received::after {
content: "" !important;
position: absolute !important;
bottom: -8px !important;
left: -6px !important;
right: auto !important;
width: 32px !important;
height: 32px !important;
background-image: url('https://static.eeo.cn/upload/images/20260221/197b5dc95b59205c5381.png') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
transform: scaleX(-1) !important;
pointer-events: none !important;
z-index: 1 !important;
-webkit-mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
}

.message-sent {
background: rgba(255, 228, 140, 1) !important;
border-color: transparent !important;
color: #000000 !important;
border-radius: 24px 24px 4px 24px !important;
padding: 6px 14px !important;
padding-top: 22px !important;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1) !important;
position: relative !important;
overflow: visible !important;
z-index: 1 !important;
}

.message-sent * {
position: relative !important;
z-index: 10 !important;
top: -3px !important;
}

.message-sent::before {
content: "" !important;
position: absolute !important;
top: -10px !important;
left: -8px !important;
width: 36px !important;
height: 36px !important;
background-image: url('https://file.ljcdn.com/psd-sinan-file/prod/appeal_evidence/FD4C5A8F56EC43EFB326655DB2974217/qdqqd.png') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
pointer-events: none !important;
z-index: 1 !important;
-webkit-mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
}

.message-sent::after {
content: "" !important;
position: absolute !important;
bottom: -8px !important;
right: -6px !important;
width: 32px !important;
height: 32px !important;
background-image: url('https://static.eeo.cn/upload/images/20260221/197b5dc95b59205c5381.png') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
background-position: center !important;
pointer-events: none !important;
z-index: 1 !important;
-webkit-mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
mask-image: radial-gradient(circle, black 100%, transparent 100%) !important;
}`
},
{
id:'b68',
type:'bubble',
name:'粉蓝',
author:'企鹅.com',
group:'xingxing',
groupLabel:'小星星系列',
previews:[
{t:'sent',v:'"從雲朵上摘下一顆星星'},
{t:'received',v:'是來自夜幕的禮物'}
],
css:`
.message-sent {
font-size: 12.5px !important;
padding: 5px 10px !important;
background: #F0F9FF !important;
color: #222222 !important;
border: 1px solid rgba(0, 0, 0, 0.2) !important;
border-radius: 8px 2px 8px 8px !important;
box-shadow:
0 0 8px rgba(255, 255, 255, 1),
0 0 15px rgba(255, 255, 255, 0.7),
0 0 25px rgba(255, 255, 255, 0.4) !important;
margin-right: 4px !important;
margin-bottom: 6px !important;
position: relative !important;
display: inline-block !important;
max-width: 98% !important;
min-width: 30px !important;
word-wrap: break-word !important;
word-break: normal !important;
line-height: 1.4 !important;
letter-spacing: -0.3px !important;
overflow: visible !important;
z-index: 1 !important;
}

.message-sent::before {
content: '★';
position: absolute !important;
left: -7px !important;
top: -7px !important;
font-size: 14px !important;
color: #FFF9C4 !important;
text-shadow:
-0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
-0.5px 0.5px 0 rgba(0, 0, 0, 0.2),
0.5px 0.5px 0 rgba(0, 0, 0, 0.2) !important;
pointer-events: none !important;
z-index: 3 !important;
line-height: 1 !important;
background: transparent !important;
display: block !important;
}

.message-received {
font-size: 12.5px !important;
padding: 5px 10px !important;
background: #FFF5F7 !important;
color: #222222 !important;
border: 1px solid rgba(0, 0, 0, 0.2) !important;
border-radius: 2px 8px 8px 8px !important;
box-shadow:
0 0 8px rgba(255, 255, 255, 1),
0 0 15px rgba(255, 255, 255, 0.7),
0 0 25px rgba(255, 255, 255, 0.4) !important;
margin-left: 4px !important;
margin-bottom: 6px !important;
position: relative !important;
display: inline-block !important;
max-width: 98% !important;
min-width: 30px !important;
word-wrap: break-word !important;
word-break: normal !important;
line-height: 1.4 !important;
letter-spacing: -0.3px !important;
overflow: visible !important;
z-index: 1 !important;
}

.message-received::before {
content: '★';
position: absolute !important;
left: -7px !important;
bottom: -7px !important;
font-size: 14px !important;
color: #E1F5FE !important;
text-shadow:
-0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
-0.5px 0.5px 0 rgba(0, 0, 0, 0.2),
0.5px 0.5px 0 rgba(0, 0, 0, 0.2) !important;
pointer-events: none !important;
z-index: 3 !important;
line-height: 1 !important;
background: transparent !important;
display: block !important;
}

[class*="ribbon"], [class*="bow"], [class*="tail"] {
display: none !important;
}`
},
{
id:'b69',
type:'bubble',
name:'黄紫',
author:'企鹅.com',
group:'xingxing',
groupLabel:'小星星系列',
previews:[
{t:'sent',v:'"從雲朵上摘下一顆星星'},
{t:'received',v:'是來自夜幕的禮物'}
],
css:`
.message-sent {
font-size: 12.5px !important;
padding: 5px 10px !important;
background: #F8F0FC !important;
color: #222222 !important;
border: 1px solid rgba(0, 0, 0, 0.2) !important;
border-radius: 8px 2px 8px 8px !important;
box-shadow:
0 0 8px rgba(255, 255, 255, 1),
0 0 15px rgba(255, 255, 255, 0.7),
0 0 25px rgba(255, 255, 255, 0.4) !important;
margin-right: 4px !important;
margin-bottom: 6px !important;
position: relative !important;
display: inline-block !important;
max-width: 98% !important;
min-width: 30px !important;
word-wrap: break-word !important;
word-break: normal !important;
line-height: 1.4 !important;
letter-spacing: -0.3px !important;
overflow: visible !important;
z-index: 1 !important;
}

.message-sent::before {
content: '★';
position: absolute !important;
left: -7px !important;
top: -7px !important;
font-size: 14px !important;
color: #FFF9C4 !important;
text-shadow:
-0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
-0.5px 0.5px 0 rgba(0, 0, 0, 0.2),
0.5px 0.5px 0 rgba(0, 0, 0, 0.2) !important;
pointer-events: none !important;
z-index: 3 !important;
line-height: 1 !important;
background: transparent !important;
display: block !important;
}

.message-received {
font-size: 12.5px !important;
padding: 5px 10px !important;
background: #FFFEF0 !important;
color: #222222 !important;
border: 1px solid rgba(0, 0, 0, 0.2) !important;
border-radius: 2px 8px 8px 8px !important;
box-shadow:
0 0 8px rgba(255, 255, 255, 1),
0 0 15px rgba(255, 255, 255, 0.7),
0 0 25px rgba(255, 255, 255, 0.4) !important;
margin-left: 4px !important;
margin-bottom: 6px !important;
position: relative !important;
display: inline-block !important;
max-width: 98% !important;
min-width: 30px !important;
word-wrap: break-word !important;
word-break: normal !important;
line-height: 1.4 !important;
letter-spacing: -0.3px !important;
overflow: visible !important;
z-index: 1 !important;
}

.message-received::before {
content: '★';
position: absolute !important;
left: -7px !important;
bottom: -7px !important;
font-size: 14px !important;
color: #E1F5FE !important;
text-shadow:
-0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
0.5px -0.5px 0 rgba(0, 0, 0, 0.2),
-0.5px 0.5px 0 rgba(0, 0, 0, 0.2),
0.5px 0.5px 0 rgba(0, 0, 0, 0.2) !important;
pointer-events: none !important;
z-index: 3 !important;
line-height: 1 !important;
background: transparent !important;
display: block !important;
}

[class*="ribbon"], [class*="bow"], [class*="tail"] {
display: none !important;
}`
},
{
  id:'b70',
  type:'bubble',
  name:'静态',
  author:'Spring',
  group:'maotaotao',
  groupLabel:'猫桃桃',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #ffe6ea 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #ffffff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}

.message.message-received::before {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  right: -4px !important;
  width: 16px !important;
  height: 16px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGyppnClllViNAAH6-lVr3_1ARfuXBlIAAokiAALpSeFUHqxGtsxX0ug6BA.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-received::after {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  left: -4px !important;
  width: 12px !important;
  height: 100% !important;
  background-image:
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy1pnCqKXtdujJceQRavKzV77XqAtQACkSIAAulJ4VSGKFw_uvn2OToE.png),
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy5pnCvm8qjZsgR2tVqGes5f2-OXIgACkyIAAulJ4VQ3Dn8LjxQk6ToE.png) !important;
  background-size: 10px 10px, 12px 12px !important;
  background-position: top left, bottom left !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-sent::before {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  left: -4px !important;
  width: 16px !important;
  height: 16px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGyppnClllViNAAH6-lVr3_1ARfuXBlIAAokiAALpSeFUHqxGtsxX0ug6BA.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  right: -4px !important;
  width: 12px !important;
  height: 100% !important;
  background-image:
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy1pnCqKXtdujJceQRavKzV77XqAtQACkSIAAulJ4VSGKFw_uvn2OToE.png),
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy5pnCvm8qjZsgR2tVqGes5f2-OXIgACkyIAAulJ4VQ3Dn8LjxQk6ToE.png) !important;
  background-size: 10px 10px, 12px 12px !important;
  background-position: top right, bottom right !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}`
},
{
  id:'b71',
  type:'bubble',
  name:'动态',
  author:'Spring',
  group:'maotaotao',
  groupLabel:'猫桃桃',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #ffe6ea 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #ffffff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}

@-webkit-keyframes pulse {
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
@keyframes pulse {
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.message.message-received::before {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  right: -4px !important;
  width: 16px !important;
  height: 16px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGyppnClllViNAAH6-lVr3_1ARfuXBlIAAokiAALpSeFUHqxGtsxX0ug6BA.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
  -webkit-animation: pulse 2.5s ease-in-out infinite !important;
  animation: pulse 2.5s ease-in-out infinite !important;
}

.message.message-received::after {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  left: -4px !important;
  width: 12px !important;
  height: 100% !important;
  background-image:
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy1pnCqKXtdujJceQRavKzV77XqAtQACkSIAAulJ4VSGKFw_uvn2OToE.png),
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy5pnCvm8qjZsgR2tVqGes5f2-OXIgACkyIAAulJ4VQ3Dn8LjxQk6ToE.png) !important;
  background-size: 10px 10px, 12px 12px !important;
  background-position: top left, bottom left !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
  -webkit-animation: pulse 2.5s ease-in-out infinite !important;
  animation: pulse 2.5s ease-in-out infinite !important;
}

.message.message-sent::before {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  left: -4px !important;
  width: 16px !important;
  height: 16px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGyppnClllViNAAH6-lVr3_1ARfuXBlIAAokiAALpSeFUHqxGtsxX0ug6BA.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
  -webkit-animation: pulse 2.5s ease-in-out infinite !important;
  animation: pulse 2.5s ease-in-out infinite !important;
}

.message.message-sent::after {
  content: "" !important;
  position: absolute !important;
  top: 4px !important;
  right: -4px !important;
  width: 12px !important;
  height: 100% !important;
  background-image:
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy1pnCqKXtdujJceQRavKzV77XqAtQACkSIAAulJ4VSGKFw_uvn2OToE.png),
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERGy5pnCvm8qjZsgR2tVqGes5f2-OXIgACkyIAAulJ4VQ3Dn8LjxQk6ToE.png) !important;
  background-size: 10px 10px, 12px 12px !important;
  background-position: top right, bottom right !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
  -webkit-animation: pulse 2.5s ease-in-out infinite !important;
  animation: pulse 2.5s ease-in-out infinite !important;
}`
},
{
  id:'b72',
  type:'bubble',
  name:'青苹果🍏',
  author:'咕咕咕小瓷',
  previews:[
    {t:'sent',v:'青苹果'},
    {t:'received',v:'酸甜'}
  ],
  css:`
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #d4e8c5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Roboto, sans-serif;
            padding: 1.5rem;
        }

        .preview-container {
            max-width: 600px;
            width: 100%;
            padding: 1rem;
        }

        .message-received,
        .message-sent {
            display: flex;
            width: 100%;
            margin-bottom: 1.5rem;
        }

        .message-received {
            justify-content: flex-start;
        }

        .message-sent {
            justify-content: flex-end;
        }

        .bubble {
            max-width: 75%;
            padding: 16px 22px;
            font-size: 1.15rem;
            line-height: 1.5;
            word-break: break-word;
            position: relative;
            color: #1b3c21;
            font-family: 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 8px 0 #5f8b4b, 0 12px 18px -8px rgba(40, 80, 20, 0.3);
            border: 2px solid #79a55b;
            transition: all 0.1s ease;
            z-index: 2;
        }

        .message-received .bubble {
            border-radius: 32px 32px 32px 8px;
            background: #e6f5d4;
            background: radial-gradient(circle at 10% 20%, #f4ffe4, #d2ecba);
            background-image: repeating-linear-gradient(-45deg, rgba(180, 215, 140, 0.2) 0px, rgba(180, 215, 140, 0.2) 8px, transparent 8px, transparent 16px);
            border-color: #79a55b;
            box-shadow: 0 8px 0 #5f8b4b, 0 12px 18px -8px rgba(40, 80, 20, 0.3);
        }

        .message-received .bubble::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 20px;
            width: 22px;
            height: 22px;
            background: #96c280;
            border-radius: 80% 0 60% 20%;
            transform: rotate(15deg) skewX(3deg);
            border-left: 3px solid #628d44;
            border-bottom: 3px solid #628d44;
            box-shadow: -2px 4px 0 #3f632b;
            opacity: 0.9;
            z-index: 1;
            pointer-events: none;
        }

        .message-sent .bubble {
            border-radius: 32px 32px 8px 32px;
            background: #f9fff2;
            border-color: #6d9e4f;
            box-shadow: 0 8px 0 #4e7a3c, 0 12px 18px -8px #2e5722;
            background-color: #f9fff2;
            position: relative;
            z-index: 2;
        }

        .message-sent .bubble::after {
            content: '';
            position: absolute;
            left: auto;
            right: 20px;
            bottom: -10px;
            width: 22px;
            height: 22px;
            background: #8bb46c;
            border-radius: 80% 0 60% 20%;
            transform: rotate(95deg) scaleX(-1);
            border-left: 3px solid #51793b;
            border-bottom: 3px solid #51793b;
            box-shadow: 2px 4px 0 #3f632b;
            opacity: 0.9;
            z-index: 1;
            pointer-events: none;
        }

        .message-sent .bubble .seed-left {
            position: absolute;
            top: 45%;
            left: 30%;
            width: 14px;
            height: 20px;
            background: #5a3e24;
            border-radius: 50% 50% 40% 40% / 60% 60% 30% 30%;
            transform: rotate(-15deg) scale(1.1);
            box-shadow: 0 3px 0 #3d2b18, inset -1px -1px 2px #8b6a4b;
            z-index: 5;
            pointer-events: none;
        }

        .message-sent .bubble .seed-left::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 4px;
            height: 6px;
            background: rgba(255, 240, 210, 0.4);
            border-radius: 50%;
            transform: rotate(-10deg);
        }

        .message-sent .bubble .seed-right {
            position: absolute;
            top: 45%;
            right: 30%;
            width: 14px;
            height: 20px;
            background: #5a3e24;
            border-radius: 50% 50% 40% 40% / 60% 60% 30% 30%;
            transform: rotate(15deg) scale(1.1);
            box-shadow: 0 3px 0 #3d2b18, inset 1px -1px 2px #8b6a4b;
            z-index: 5;
            pointer-events: none;
        }

        .message-sent .bubble .seed-right::after {
            content: '';
            position: absolute;
            top: 3px;
            right: 3px;
            width: 4px;
            height: 6px;
            background: rgba(255, 240, 210, 0.4);
            border-radius: 50%;
            transform: rotate(10deg);
        }

        .message-received .bubble .apple-cover {
            position: absolute;
            top: -12px;
            right: -10px;
            font-size: 2.2rem;
            opacity: 0.8;
            pointer-events: none;
            z-index: 20;
            transform: rotate(12deg);
            filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15));
            text-shadow: 1px 1px 0 #52803a;
            line-height: 1;
        }

        .message-sent .bubble .apple-cover {
            position: absolute;
            top: -12px;
            left: -10px;
            font-size: 2.2rem;
            opacity: 0.8;
            pointer-events: none;
            z-index: 20;
            transform: rotate(-8deg);
            filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.15));
            text-shadow: 1px 1px 0 #52803a;
            line-height: 1;
        }

        .message-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            font-size: 0.8rem;
            color: #537a41;
            font-weight: 500;
            position: relative;
            z-index: 4;
        }

        .message-received .message-meta {
            justify-content: flex-start;
            padding-left: 8px;
        }

        .message-sent .message-meta {
            justify-content: flex-end;
            padding-right: 8px;
        }

        .green-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #7fb24f;
            border-radius: 50%;
            opacity: 0.6;
        }

        .bubble p {
            margin: 0 0 8px 0;
            position: relative;
            z-index: 10;
            padding: 2px 4px;
            border-radius: 4px;
            text-shadow: 0 0 2px white;
        }

        .bubble p:last-child {
            margin-bottom: 0;
        }

        .bubble {
            position: relative;
            overflow: visible;
        }`
    },
{
  id:'b73',
  type:'bubble',
  name:'黑灰',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'有多少天长地久'},
    {t:'received',v:'有几回细水长流'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 8px 10px 8px 14px !important;
  z-index: 1 !important;
}
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #fff !important;
  padding: 8px 16px 8px 10px !important;
  z-index: 1 !important;
}
.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771910352140_IMG_5865.png') !important;
  border-image-slice: 373 537 173 482 fill !important;
  border-image-width: 21px 30px 10px 27px !important;
  transform: scaleX(-1) !important;
  pointer-events: none;
}
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771910347831_IMG_5864.png') !important;
  border-image-slice: 391 495 132 523 fill !important;
  border-image-width: 22px 28px 7px 29px !important;
  pointer-events: none;
}`
},
{
  id:'b74',
  type:'bubble',
  name:'灰白',
  author:'蛋挞',
  group:'xiankuang',
groupLabel:'线框系列',
  previews:[
    {t:'sent',v:'生命是一场冗长的雨'},
    {t:'received',v:'晴天在你出现时降临'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 9px 9px 9px 14px !important;
  z-index: 1 !important;
}
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 8px 14px 8px 10px !important;
  z-index: 1 !important;
}
.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771904063155_IMG_5858.png') !important;
  border-image-slice: 457 515 154 498 fill !important;
  border-image-width: 25px 29px 9px 28px !important;
  transform: scaleX(-1) !important;
  pointer-events: none;
}
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771904063914_IMG_5856.png') !important;
  border-image-slice: 435 562 166 457 fill !important;
  border-image-width: 24px 31px 9px 25px !important;
  pointer-events: none;
}`
},
{
  id:'b75',
  type:'bubble',
  name:'蓝白',
  author:'蛋挞',
  group:'xiankuang',
groupLabel:'线框系列',
  previews:[
    {t:'sent',v:'生命是一场冗长的雨'},
    {t:'received',v:'晴天在你出现时降临'}
  ],
  css:`.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: 280px !important;
}
.message.message-received {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 9px 9px 9px 14px !important;
  z-index: 1 !important;
}
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 8px 14px 8px 10px !important;
  z-index: 1 !important;
}
.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771906003234_IMG_5854.png') !important;
  border-image-slice: 448 487 152 529 fill !important;
  border-image-width: 25px 27px 8px 29px !important;
  transform: scaleX(-1) !important;
  pointer-events: none;
}
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771904063914_IMG_5856.png') !important;
  border-image-slice: 435 562 166 457 fill !important;
  border-image-width: 24px 31px 9px 25px !important;
  pointer-events: none;
}`
},
{
  id:'b76',
  type:'bubble',
  name:'熊猫熊猫',
  author:'蛋挞',
  previews:[
    {t:'sent',v:'生活给了我一拳'},
    {t:'received',v:'我原地睡了一觉૮₍ ˃̶ ꇴ ˂̶ ₎ა'}
  ],
  css:`.chat-container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}
.message {
  position: relative !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  overflow: visible !important;
  width: fit-content !important;
  max-width: min(280px, 100%) !important;
  word-wrap: break-word !important;
}
.message.message-received,
.message.message-sent {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #000000 !important;
  padding: 9px 12px 8px 11px !important;
  z-index: 1 !important;
}
.message.message-received::before,
.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: -1 !important;
  border-style: solid !important;
  border-image-repeat: repeat !important;
  border-image-source: url('https://img.heliar.top/file/1771575862869_IMG_5522.png') !important;
  border-image-slice: 577 839 522 761 fill !important;
  border-image-width: 13px 19px 12px 17px !important;
  pointer-events: none;
}`
},
{
id:'b77',
type:'bubble',
name:'午夜猫蝠',
author:'11',
previews:[
{t:'sent',v:'多幸运遇见了你'},
{t:'received',v:'多幸运爱上了你'}
],
css:`.message {
  box-shadow: none !important;
  border: none !important;
  font-weight: 500 !important;
  position: relative;
  overflow: visible !important;
}

.message-received {
  background-color: transparent !important;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(255, 204, 0, 1) 0%, rgba(255, 204, 0, 1) 100%, transparent 50px),
    url('https://img.heliar.top/file/1771855162584_bg-texture.png'),
    radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.41), rgba(26, 26, 26, 0.41)) !important;
  background-position: 50% 50%, 0 0, 0 0 !important;
  background-size: 69px auto, 100% 100%, 100% 100% !important;
  background-repeat: no-repeat, no-repeat, no-repeat !important;
  background-blend-mode: screen !important;
  backdrop-filter: blur(25px) !important;
  -webkit-backdrop-filter: blur(25px) !important;
  border: 1px solid rgba(255, 255, 255, 0.7) !important;
  color: #000 !important;
  border-radius: 24px !important;
  padding: 8px 16px !important;
  position: relative !important;
}

.message-sent {
  background-color: transparent !important;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(255, 204, 0, 1) 0%, rgba(255, 204, 0, 1) 100%, transparent 50px),
    url('https://img.heliar.top/file/1771855162584_bg-texture.png'),
    radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.41), rgba(26, 26, 26, 0.41)) !important;
  background-position: 50% 50%, 0 0, 0 0 !important;
  background-size: 69px auto, 100% 100%, 100% 100% !important;
  background-repeat: no-repeat, no-repeat, no-repeat !important;
  background-blend-mode: screen !important;
  backdrop-filter: blur(25px) !important;
  -webkit-backdrop-filter: blur(25px) !important;
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  color: #000 !important;
  border-radius: 24px !important;
  padding: 8px 16px !important;
  position: relative !important;
}

.message::after {
  content: '' !important;
  position: absolute !important;
  width: 45px !important;
  height: 45px !important;
  background-image: url('https://img.heliar.top/file/1771855500929_retouch_2026022011501390.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  opacity: 0.75 !important;
  left: 0 !important;
  top: 0 !important;
  transform: translate(-22px, -12px) rotate(20deg) scaleX(-1) !important;
  animation: pawFloat 3s ease-in-out infinite !important;
  z-index: 20 !important;
  pointer-events: none !important;
}

.message::before {
  content: '' !important;
  position: absolute !important;
  width: 46px !important;
  height: 46px !important;
  background-image: url('https://img.heliar.top/file/1771855174377_sticker-right.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  opacity: 1 !important;
  right: 0 !important;
  bottom: 0 !important;
  transform: translate(30px, 12px) rotate(-70deg) scaleX(-1) !important;
  animation: none !important;
  z-index: -1 !important;
  pointer-events: none !important;
  border: none !important;
  background-color: transparent !important;
}

.message--other::after {
  content: '' !important;
  position: absolute !important;
  width: 45px !important;
  height: 45px !important;
  background-image: url('https://img.heliar.top/file/1771855500929_retouch_2026022011501390.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  opacity: 0.75 !important;
  right: 0 !important;
  top: 0 !important;
  transform: translate(22px, -12px) rotate(-20deg) scaleX(-1) !important;
  animation: pawFloatOther 3s ease-in-out infinite !important;
  z-index: 20 !important;
  pointer-events: none !important;
}

.message--other::before {
  content: '' !important;
  position: absolute !important;
  width: 46px !important;
  height: 46px !important;
  background-image: url('https://img.heliar.top/file/1771855174377_sticker-right.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  opacity: 1 !important;
  right: 0 !important;
  bottom: 0 !important;
  transform: translate(30px, 12px) rotate(-70deg) scaleX(-1) !important;
  animation: none !important;
  z-index: -1 !important;
  pointer-events: none !important;
  border: none !important;
  background-color: transparent !important;
}

@keyframes pawFloat {
  0%,100% { transform: translate(-22px, -12px) rotate(20deg) scaleX(-1); }
  50%     { transform: translate(-22px, -17px) rotate(20deg) scaleX(-1); }
}
@keyframes pawFloatOther {
  0%,100% { transform: translate(22px, -12px) rotate(-20deg) scaleX(-1); }
  50%     { transform: translate(22px, -17px) rotate(-20deg) scaleX(-1); }
}`
},
{
id:'b78',
type:'bubble',
name:'猫眠',
author:'11',
previews:[
{t:'sent',v:'多幸运遇见了你'},
{t:'received',v:'多形象爱上了你'}
],
css:`.message {
position: relative !important;
overflow: visible !important;
box-sizing: border-box !important;
padding: 8px 10px 8px 10px !important;
border-radius: 18px !important;

display: flex !important;
flex-direction: column !important;
justify-content: flex-start !important;
text-align: left !important;

max-width: 100% !important;
min-width: 0px !important;
min-height: 36px !important;

background-color: transparent !important;
background-image: radial-gradient(circle at 80% 80%, rgba(77, 77, 77, 0.54), rgba(77, 77, 77, 0.26)) !important;
background-position: center !important;
background-size: cover !important;
background-repeat: no-repeat !important;
background-blend-mode: multiply !important;

box-shadow: 1px 2px 15px rgba(230, 230, 230, 0.18), inset -2px 2px 15px rgba(255, 255, 255, 0.7), inset 2px -2px 15px rgba(0, 0, 0, 0.1) !important;
color: #FFFFFF !important;
backdrop-filter: blur(9px) !important;
-webkit-backdrop-filter: blur(9px) !important;

line-height: 1.55 !important;
letter-spacing: 0.02em !important;
word-break: break-word !important;
z-index: 1 !important;
border: 0px solid transparent !important;
outline: 1px solid rgba(207, 207, 207, 1) !important;
outline-offset: 0px !important;
}

.message::after {
content: '' !important;
position: absolute !important;
width: 32px !important;
height: 32px !important;
background-image: url('https://img.heliar.top/file/1771862313856_retouch_2026022323580277.png') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
opacity: 1 !important;
right: 0 !important;
bottom: 0 !important;
transform: translate(20px, 28px) rotate(-10deg) !important;
z-index: 2 !important;
pointer-events: none !important;
filter: brightness(1.2) contrast(1.1) saturate(1.3) drop-shadow(0 4px 8px rgba(0,0,0,0.4)) !important;
}

.message::before {
content: '' !important;
position: absolute !important;
width: 40px !important;
height: 40px !important;
background-image: url('https://img.heliar.top/file/1771861962025_retouch_2026022323521780.png') !important;
background-size: contain !important;
background-repeat: no-repeat !important;
opacity: 1 !important;
left: 0 !important;
top: 0 !important;
z-index: 2 !important;
pointer-events: none !important;
border: none !important;
background-color: transparent !important;
filter: brightness(1.2) contrast(1.1) saturate(1.3) drop-shadow(0 4px 8px rgba(0,0,0,0.4)) !important;
animation: floatCatLeft 3.2s ease-in-out infinite;
}

@keyframes floatCatLeft {
0% { transform: translate(-20px, -12px) rotate(-15deg) translateY(0); }
50% { transform: translate(-20px, -17px) rotate(-15deg) translateY(0); }
100% { transform: translate(-20px, -12px) rotate(-15deg) translateY(0); }
}

.message-container {
align-items: flex-start !important;
margin-bottom: 1px !important;
}

.quote-popup,
.message-quote,
.reference-popup,
[class*="quote"],
[class*="reference"] {
z-index: 100 !important;
position: relative;
}`
},
{
  id: 'b79',
  type: 'bubble',
  name: '粉黄-蓝绿',
  author: '晨鸢',
  previews: [
    { t: 'sent', v: '澄澈的天空下是什么？' },
    { t: 'received', v: '草莓芒果慕斯。' }
  ],
  css: `
.message {
  box-shadow: none !important;
  border-width: 0 !important;
  font-weight: 500 !important;
  position: relative !important;
  overflow: visible !important;
  padding: 7px 13px !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  border-radius: 18px !important;
  max-width: 95% !important;
  letter-spacing: 0.01em;
  background: transparent !important;
  transition: all 0.2s ease;
}

.message-sent {
  background: linear-gradient(180deg, rgba(200, 235, 255, 0.9) 0%, rgba(180, 230, 200, 0.9) 100%) !important;
  border: 1px solid rgba(160, 220, 250, 0.25) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 24px 24px 4px 24px !important;
  box-shadow: 0 8px 16px -6px rgba(120, 180, 220, 0.25), 3px 0 10px -5px rgba(140, 200, 220, 0.2), inset 0 -4px 10px -4px rgba(100, 150, 180, 0.2), inset 3px 3px 10px -4px rgba(240, 250, 255, 0.6), inset 0 0 10px 3px rgba(180, 220, 255, 0.2), inset 0 0 0 1px rgba(140, 200, 230, 0.2), 0 0 15px 3px rgba(160, 210, 240, 0.15) !important;
  color: #1a3a4a !important;
  padding: 8px 16px !important;
  position: relative !important;
  margin-right: 14px !important;
  margin-bottom: 12px !important;
}

.message-received {
  background: linear-gradient(180deg, rgba(255, 220, 240, 0.9) 0%, rgba(255, 235, 200, 0.9) 100%) !important;
  border: 1px solid rgba(255, 200, 220, 0.25) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 24px 24px 24px 4px !important;
  box-shadow: 0 8px 16px -6px rgba(255, 180, 200, 0.25), -2px 0 8px -5px rgba(255, 200, 180, 0.2), inset 0 -4px 10px -4px rgba(230, 150, 170, 0.15), inset 2px 3px 10px -4px rgba(255, 245, 230, 0.7), inset 0 0 10px 3px rgba(255, 210, 220, 0.2), inset 0 0 0 1px rgba(255, 190, 210, 0.2), 0 0 15px 3px rgba(255, 200, 210, 0.15) !important;
  color: #5a3a3a !important;
  padding: 8px 16px !important;
  position: relative !important;
  margin-left: 14px !important;
  margin-bottom: 12px !important;
}

.message-sent::after {
  content: '' !important;
  position: absolute !important;
  bottom: -16px !important;
  left: 12px !important;
  width: calc(100% - 24px) !important;
  height: 8px !important;
  background: rgba(220, 210, 230, 0.5) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
  z-index: 5 !important;
  pointer-events: none !important;
}

.message-received::after {
  content: '' !important;
  position: absolute !important;
  bottom: -16px !important;
  left: 12px !important;
  width: calc(100% - 24px) !important;
  height: 8px !important;
  background: rgba(220, 210, 230, 0.5) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
  z-index: 5 !important;
  pointer-events: none !important;
}

.message-sent::before {
  content: "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️" !important;
  position: absolute !important;
  bottom: -16px !important;
  left: 12px !important;
  width: 70% !important;
  height: 8px !important;
  font-size: 10px !important;
  line-height: 8px !important;
  letter-spacing: 2.5px !important;
  color: transparent !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  z-index: 6 !important;
  text-shadow: 0 0 8px #a0d8d0, 0 0 12px #b0e8e0 !important;
  background: linear-gradient(90deg, #b0e0d8, #c0f0e8, #b0e0d8) !important;
  background-size: 200% 100% !important;
  border-radius: 12px !important;
  pointer-events: none !important;
  animation: progressFlowSent 5s ease-in-out infinite !important;
  font-weight: normal !important;
  transform: none !important;
  opacity: 1 !important;
}

.message-received::before {
  content: "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️" !important;
  position: absolute !important;
  bottom: -16px !important;
  left: 12px !important;
  width: 60% !important;
  height: 8px !important;
  font-size: 10px !important;
  line-height: 8px !important;
  letter-spacing: 2.5px !important;
  color: transparent !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  z-index: 6 !important;
  text-shadow: 0 0 8px #ffd0a0, 0 0 12px #ffe0b0 !important;
  background: linear-gradient(90deg, #ffd8a0, #ffe8b0, #ffd8a0) !important;
  background-size: 200% 100% !important;
  border-radius: 12px !important;
  pointer-events: none !important;
  animation: progressFlowReceived 6s ease-in-out infinite !important;
  font-weight: normal !important;
  transform: none !important;
  opacity: 1 !important;
}

@keyframes progressFlowSent {
  0% {
    background-position: 0% 0%;
    width: 30%;
    opacity: 0.9;
  }
  25% {
    width: 60%;
    opacity: 1;
  }
  50% {
    width: 85%;
    opacity: 1;
  }
  75% {
    width: 45%;
    opacity: 1;
  }
  100% {
    width: 30%;
    opacity: 0.9;
    background-position: 200% 0%;
  }
}

@keyframes progressFlowReceived {
  0% {
    background-position: 0% 0%;
    width: 40%;
    opacity: 0.9;
  }
  33% {
    width: 70%;
    opacity: 1;
  }
  66% {
    width: 50%;
    opacity: 1;
  }
  100% {
    width: 40%;
    opacity: 0.9;
    background-position: 200% 0%;
  }
}

.message-sent .star-left {
  content: "✦" !important;
  position: absolute !important;
  left: -16px !important;
  top: 50% !important;
  transform: translateY(-50%) scale(1) !important;
  font-size: 22px !important;
  color: white !important;
  text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #a0d0ff, 0 0 40px #a0d0ff !important;
  z-index: 100 !important;
  pointer-events: none !important;
  animation: starTwinkle 1.5s ease-in-out infinite !important;
  font-weight: normal !important;
  line-height: 1 !important;
}

.message-sent .star-right {
  content: "✦" !important;
  position: absolute !important;
  right: -16px !important;
  top: 50% !important;
  transform: translateY(-50%) scale(1) !important;
  font-size: 22px !important;
  color: white !important;
  text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #a0d0ff, 0 0 40px #a0d0ff !important;
  z-index: 100 !important;
  pointer-events: none !important;
  animation: starTwinkle 1.8s ease-in-out infinite !important;
  font-weight: normal !important;
  line-height: 1 !important;
}

.message-received .star-left {
  content: "✦" !important;
  position: absolute !important;
  left: -16px !important;
  top: 50% !important;
  transform: translateY(-50%) scale(1) !important;
  font-size: 22px !important;
  color: white !important;
  text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffd0a0, 0 0 40px #ffd0a0 !important;
  z-index: 100 !important;
  pointer-events: none !important;
  animation: starTwinkle 1.8s ease-in-out infinite !important;
  font-weight: normal !important;
  line-height: 1 !important;
}

.message-received .star-right {
  content: "✦" !important;
  position: absolute !important;
  right: -16px !important;
  top: 50% !important;
  transform: translateY(-50%) scale(1) !important;
  font-size: 22px !important;
  color: white !important;
  text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffd0a0, 0 0 40px #ffd0a0 !important;
  z-index: 100 !important;
  pointer-events: none !important;
  animation: starTwinkle 1.5s ease-in-out infinite !important;
  font-weight: normal !important;
  line-height: 1 !important;
}

@keyframes starTwinkle {
  0% {
    opacity: 0.3;
    transform: translateY(-50%) scale(0.8);
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff;
  }
  25% {
    opacity: 1;
    transform: translateY(-50%) scale(1.2);
    text-shadow: 0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px currentColor;
  }
  50% {
    opacity: 0.7;
    transform: translateY(-50%) scale(1);
    text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 35px currentColor;
  }
  75% {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
    text-shadow: 0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px currentColor;
  }
  100% {
    opacity: 0.3;
    transform: translateY(-50%) scale(0.8);
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff;
  }
}

.message p {
  margin: 0;
  position: relative;
  z-index: 2;
}

.message .meta {
  font-size: 0.7rem;
  opacity: 0.8;
  margin-top: 4px;
  text-align: right;
  color: #1a3a4a !important;
  font-weight: 500;
  letter-spacing: 0.02em;
  position: relative;
  z-index: 2;
}

.message-received .meta {
  color: #5a3a3a !important;
}

.message-sent:hover {
  box-shadow: 0 12px 20px -8px rgba(120, 180, 220, 0.3), 3px 0 12px -6px rgba(140, 200, 220, 0.25), inset 0 -5px 12px -4px rgba(100, 150, 180, 0.2), inset 3px 3px 12px -4px rgba(240, 250, 255, 0.7), inset 0 0 12px 4px rgba(180, 220, 255, 0.25), inset 0 0 0 1px rgba(140, 200, 230, 0.2) !important;
  transform: translateY(-2px);
}

.message-received:hover {
  box-shadow: 0 10px 18px -8px rgba(255, 160, 180, 0.25), -2px 0 10px -6px rgba(255, 180, 160, 0.2), inset 0 -4px 12px -4px rgba(230, 130, 150, 0.15), inset 2px 3px 12px -4px rgba(255, 250, 235, 0.7), inset 0 0 12px 4px rgba(255, 200, 220, 0.25), inset 0 0 0 1px rgba(255, 180, 200, 0.2) !important;
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .message-sent {
    background: linear-gradient(180deg, rgba(90, 140, 180, 0.95) 0%, rgba(80, 150, 130, 0.95) 100%) !important;
    border-color: rgba(120, 180, 220, 0.25) !important;
    color: #e0f0ff !important;
    box-shadow: 0 10px 18px -8px rgba(0, 0, 0, 0.5), inset 0 -4px 10px -4px rgba(30, 60, 80, 0.3), inset 3px 3px 10px -4px rgba(150, 200, 240, 0.15), inset 0 0 10px 3px rgba(80, 140, 180, 0.15), inset 0 0 0 1px rgba(100, 160, 200, 0.2) !important;
  }
  .message-received {
    background: linear-gradient(180deg, rgba(160, 100, 130, 0.95) 0%, rgba(200, 160, 100, 0.95) 100%) !important;
    border-color: rgba(200, 140, 170, 0.25) !important;
    color: #fff0e0 !important;
    box-shadow: 0 8px 16px -6px rgba(0, 0, 0, 0.5), inset 0 -4px 10px -4px rgba(80, 40, 50, 0.3), inset 2px 3px 10px -4px rgba(200, 150, 170, 0.15), inset 0 0 10px 3px rgba(140, 90, 110, 0.15), inset 0 0 0 1px rgba(160, 110, 130, 0.2) !important;
  }
  .message-sent::before {
    text-shadow: 0 0 8px #80c0b8, 0 0 12px #a0d8d0 !important;
    background: linear-gradient(90deg, #90c8c0, #b0e0d8, #90c8c0) !important;
  }
  .message-received::before {
    text-shadow: 0 0 8px #d0a880, 0 0 12px #e0c090 !important;
    background: linear-gradient(90deg, #d8b080, #e8c8a0, #d8b080) !important;
  }
  .message-sent .star-left,
  .message-sent .star-right {
    color: rgba(255, 255, 255, 0.95) !important;
    text-shadow: 0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px #a0d0ff !important;
  }
  .message-received .star-left,
  .message-received .star-right {
    color: rgba(255, 255, 255, 0.95) !important;
    text-shadow: 0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px #ffc8a0 !important;
  }
  .message .meta {
    color: #e0f0ff !important;
  }
  .message-received .meta {
    color: #fff0e0 !important;
  }
}`
},
{
  id:'b80',
  type:'bubble',
  name:'黑白灰说是',
  author:'gyo',
  previews:[
    {t:'sent',v:'幸福不在别处'},
    {t:'received',v:'你就是我的全部'}
  ],
  css:`
.message {
  position: relative !important;
  overflow: visible !important;
  font-weight: 500 !important;
  line-height: 1.4 !important;
  word-break: break-word !important;
  max-width: 100% !important;
  margin: 8px 0 !important;
  clear: both !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.message-sent {
  float: right !important;
  background: #3a3a3c !important; 
  color: #ffffff !important;
  border-radius: 26px 29px 4px 29px !important;
  padding: 10px 14px !important;
  margin-right: 12px !important;
}
.message-received {
  float: left !important;
  background: #e9e9e9 !important; 
  color: #000000 !important;
  border-radius: 29px 26px 29px 4px !important;
  padding: 10px 14px !important;
  margin-left: 12px !important;
}

.message::after {
  content: '' !important;
  position: absolute !important;
  width: 0 !important;
  height: 0 !important;
  border-style: solid !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  bottom: 0 !important;
  right: -10px !important;
  border-width: 18px 0 0px 17px !important;
  border-color: transparent transparent transparent #3a3a3c !important;
}

.message.message-received::after {
  bottom: 0 !important;
  left: -10px !important;
  border-width: 18px 17px 0px 0 !important;
  border-color: transparent #e9e9eb transparent transparent !important;
}

.message-sent + .message-sent,
.message-received + .message-received {
  margin-top: 4px !important;
}

.message-sent + .message-sent::after,
.message-received + .message-received::after {
  display: none !important;
}`
},
{
  id: 'b81',
  type: 'bubble',
  name: '黑与白小尖角',
  author: 'yuuuxii',
  previews: [
    { t: 'sent', v: '我一个平民老百姓跟你们这些权势滔天的人说不清楚' },
    { t: 'received', v: '看不懂' }
  ],
  css: `.message{
  box-shadow: none !important;
  border-width: 0 !important;
  font-weight: 500 !important;
  position: relative !important;
  overflow: visible !important;
  padding: 7px 13px !important;
  line-height: 1.3 !important;
  word-break: break-word !important;
  border-radius: 18px !important;
  box-shadow: 0 2px 3px rgba(0,0,0,.3) !important;
}

.message-received{
  background: #fff !important;
  border-color: transparent !important;
  color: #000 !important;
  border-radius: 29px 26px 30px 2px !important;
  padding: 7px 16px !important;
  box-shadow: 0 4px 7px rgba(0,0,0,.2) !important;
}

.message-sent{
  background: #333 !important;
  border-color: transparent !important;
  color: #fff !important;
  border-radius: 26px 30px 2px 29px !important;
  padding: 7px 16px !important;
  box-shadow: 0 4px 7px rgba(0,0,0,.2) !important;
}

.message::after{
  content: '' !important;
  position: absolute !important;
  width: 30px !important;
  height: 15px !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  z-index: 0 !important;
}

.message.message-sent::after{
  bottom: -3.0px !important;
  right: -16px !important;
  background-color: #333 !important;
  clip-path: polygon(0 0, -750% 0, 66% 83%) !important;
  filter: drop-shadow(0px 0px 0px rgba(180,120,140,.4)) !important;
}

.message.message-received::after{
  bottom: -6.0px !important;
  left: -8px !important;
  background-color: #fff !important;
  clip-path: polygon(0 60%, 99990% 0, 900% -999%) !important;
  filter: drop-shadow(0px 0px 0px rgba(180,120,140,.0)) !important;
}`
},
{
  id:'b82',
  type:'bubble',
  name:'动态半透明四叶草',
  author:'iAci',
  previews:[
    {t:'sent',v:'这个气泡怎么样'},
    {t:'received',v:'看起来不错'}
  ],
  css:`
.message-sent {
    background-color: rgba(255, 255, 255, 0.3) !important;
    border: 2px solid rgba(255, 255, 255, 0.6) !important;
    border-radius: 20px 20px 4px 20px !important;
    padding: 10px 16px !important;
    color: #333333 !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    max-width: 70% !important;
    width: fit-content !important;
    margin-left: auto !important;
    margin-bottom: 12px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
    position: relative !important;
    word-break: break-word !important;
}

.message-received {
    background-color: rgba(255, 255, 255, 0.3) !important;
    border: 2px solid rgba(255, 255, 255, 0.6) !important;
    border-radius: 20px 20px 20px 4px !important;
    padding: 10px 16px !important;
    color: #333333 !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    max-width: 70% !important;
    width: fit-content !important;
    margin-right: auto !important;
    margin-bottom: 12px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
    position: relative !important;
    word-break: break-word !important;
}

.message-sent::after {
    content: '🍀' !important;
    position: absolute !important;
    bottom: -12px !important;
    right: -12px !important;
    font-size: 20px !important;
    background: rgba(255, 255, 255, 0.3) !important;
    border-radius: 50% !important;
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 10 !important;
}

.message-received::before {
    content: '🍀' !important;
    position: absolute !important;
    top: -12px !important;
    left: -12px !important;
    font-size: 20px !important;
    background: rgba(255, 255, 255, 0.3) !important;
    border-radius: 50% !important;
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 10 !important;
}

.message-sent, .message-received {
    animation: none !important;
    transition: none !important;
    transform: none !important;
}
.message-sent, .message-received {
    max-width: 90vw !important; 
    width: fit-content !important; 
    min-width: unset !important; 
    
    word-break: break-word !important;
    white-space: normal !important;
    
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    flex-basis: auto !important;
    
    justify-self: start !important;
    align-self: auto !important;
}

.message-received {
    justify-self: start !important;
    margin-right: auto !important;
}

.message-sent {
    justify-self: end !important;
    margin-left: auto !important;
}
.message-sent {
    position: relative;
    overflow: visible;
}

.message-sent::after {
    content: '🍀';
    position: absolute;
    bottom: -15px;
    right: -10px;
    font-size: 22px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    
    animation: cloverFall 4s ease-in infinite; 
    pointer-events: none;
}

.message-sent::before {
    content: '🍀';
    position: absolute;
    top: -15px;
    right: -10px;
    font-size: 20px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    
    animation: cloverFall 4.5s ease-in infinite;
    animation-delay: 1s; 
    pointer-events: none;
}

.message-received {
    position: relative;
    overflow: visible;
}

.message-received::after {
    content: '🍀';
    position: absolute;
    bottom: -15px;
    left: -10px;
    font-size: 22px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    
    animation: cloverFall 4.2s ease-in infinite;
    animation-delay: 0.5s;
    pointer-events: none;
}

.message-received::before {
    content: '🍀';
    position: absolute;
    top: -15px;
    left: -10px;
    font-size: 20px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    
    animation: cloverFall 3.8s ease-in infinite;
    animation-delay: 1.3s;
    pointer-events: none;
}

@keyframes cloverFall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    25% {
        transform: translateY(20px) rotate(90deg);
        opacity: 0.9;
    }
    50% {
        transform: translateY(40px) rotate(180deg);
        opacity: 0.7;
    }
    75% {
        transform: translateY(60px) rotate(270deg);
        opacity: 0.4;
    }
    100% {
        transform: translateY(80px) rotate(360deg);
        opacity: 0;
    }
}

.message-sent::after {
    animation: cloverFallRight 4s ease-in infinite;
}

.message-sent::before {
    animation: cloverFallLeft 4.5s ease-in infinite;
}

.message-received::after {
    animation: cloverFallLeft 4.2s ease-in infinite;
}

.message-received::before {
    animation: cloverFallRight 3.8s ease-in infinite;
}

@keyframes cloverFallRight {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    25% { transform: translate(5px, 20px) rotate(90deg); opacity: 0.9; }
    50% { transform: translate(10px, 40px) rotate(180deg); opacity: 0.7; }
    75% { transform: translate(5px, 60px) rotate(270deg); opacity: 0.4; }
    100% { transform: translate(0, 80px) rotate(360deg); opacity: 0; }
}

@keyframes cloverFallLeft {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    25% { transform: translate(-5px, 20px) rotate(90deg); opacity: 0.9; }
    50% { transform: translate(-10px, 40px) rotate(180deg); opacity: 0.7; }
    75% { transform: translate(-5px, 60px) rotate(270deg); opacity: 0.4; }
    100% { transform: translate(0, 80px) rotate(360deg); opacity: 0; }
}`
},
{
  id:'b83',
  type:'bubble',
  name:'圆角',
  author:'蛋挞',
  group:'hui',
  groupLabel:'灰调渐变',
  previews:[
    {t:'sent',v:'拥有一颗细腻的心'},
    {t:'received',v:'感受更多的是幸福还是悲伤'}
  ],
  css:`.message {
    position: relative !important;
    line-height: 1.3 !important;
    word-break: break-word !important;
    overflow: visible !important;
    width: fit-content !important;
    max-width: 280px !important;
    border-radius: 20px;
    box-shadow: none;
    padding: 8px 11px;
    border: none;
}
.message.message-sent,
.message.message-received {
    display: inline-block;
    position: relative;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    width: auto;
    min-width: 70%;
    color: #2b2b2b;
}
.message.message-sent {
    background: radial-gradient(circle at 20% 30%, #fafafa, #d6d6d6);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
}
.message.message-received {
    background: radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
}`
},
{
  id:'b84',
  type:'bubble',
  name:'不对称',
  author:'蛋挞',
  group:'hui',
  groupLabel:'灰调渐变',
  previews:[
    {t:'sent',v:'拥有一颗细腻的心'},
    {t:'received',v:'感受更多的是幸福还是悲伤'}
  ],
  css:`.message {
    position: relative !important;
    line-height: 1.3 !important;
    word-break: break-word !important;
    overflow: visible !important;
    width: fit-content !important;
    max-width: 280px !important;
    border-radius: 20px;
    box-shadow: none;
    padding: 8px 11px;
    border: none;
}
.message.message-sent,
.message.message-received {
    display: inline-block;
    position: relative;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    width: auto;
    min-width: 70%;
    color: #2b2b2b;
}
.message.message-sent {
    border-radius: 20px 20px 4px 20px;
    box-shadow: 
        0 4px 6px rgba(0,0,0,0.1),
        inset 0 1px 3px rgba(255,255,255,0.8),
        0 0 0 1px rgba(0, 0, 0, 0.15);
    background: linear-gradient(145deg, #e8e8e8, #c0c0c0);
}
.message.message-received {
    border-radius: 20px 20px 20px 4px;
    box-shadow: 
        0 4px 6px rgba(0,0,0,0.1),
        inset 0 1px 3px rgba(255,255,255,0.8),
        0 0 0 1px rgba(0, 0, 0, 0.15);
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
}`
},
{
  id:'b85',
  type:'bubble',
  name:'蓝色玻璃',
  author:'司七',
  previews:[
    {t:'sent',v:'哦亲爱的告诉你'},
    {t:'received',v:'我有许多小淘气'}
  ],
  css:`.message-sent,
.message-received {
    background: linear-gradient(135deg,
        rgba(219, 234, 254, 0.7),
        rgba(191, 219, 254, 0.6)
    ) !important;

    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.10) !important;

    border: 1px solid rgba(37, 99, 235, 0.20) !important;

    border-top: 1px solid rgba(255, 255, 255, 0.55) !important;
    border-left: 1px solid rgba(255, 255, 255, 0.45) !important;

    color: #0f172a !important;

    backdrop-filter: blur(8px) saturate(110%);
    -webkit-backdrop-filter: blur(8px) saturate(110%);
}
.message-sent {
    background: linear-gradient(135deg,
        rgba(191, 219, 254, 0.7),
        rgba(147, 197, 253, 0.5)
    ) !important;
    border-radius: 20px 20px 6px 20px;
}

.message-received {
    border-radius: 20px 20px 20px 6px;
}`
},
{
  id:'b86',
  type:'bubble',
  name:'夜色星闪',
  author:'司七',
  previews:[

  ],
  css:`.message-sent,
.message-received {
    position: relative;
    overflow: hidden;

    background:
      radial-gradient(140px 100px at 18% 20%, rgba(255,255,255,0.08), rgba(255,255,255,0.00) 70%),
      radial-gradient(220px 160px at 82% 30%, rgba(255,255,255,0.06), rgba(255,255,255,0.00) 75%),
      linear-gradient(180deg, #162a66 0%, #1d4ed8 100%) !important;

    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    box-shadow: 0 10px 24px rgba(2, 6, 23, 0.24) !important;
    color: #f8fafc !important;

    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

.message-sent::before,
.message-received::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;

    background:
      linear-gradient(rgba(255,255,255,0.00), rgba(255,255,255,0.70), rgba(255,255,255,0.00)) 22% 28%/1px 12px no-repeat,
      linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.70), rgba(255,255,255,0.00)) 22% 28%/12px 1px no-repeat,

      linear-gradient(rgba(255,255,255,0.00), rgba(255,255,255,0.62), rgba(255,255,255,0.00)) 68% 22%/1px 10px no-repeat,
      linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.62), rgba(255,255,255,0.00)) 68% 22%/10px 1px no-repeat,

      linear-gradient(rgba(255,255,255,0.00), rgba(255,255,255,0.58), rgba(255,255,255,0.00)) 84% 56%/1px 9px no-repeat,
      linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.58), rgba(255,255,255,0.00)) 84% 56%/9px 1px no-repeat,

      linear-gradient(rgba(255,255,255,0.00), rgba(255,255,255,0.52), rgba(255,255,255,0.00)) 40% 70%/1px 7px no-repeat,
      linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.52), rgba(255,255,255,0.00)) 40% 70%/7px 1px no-repeat;

    opacity: 0.55;
    animation: starTwinkleCross 3.8s ease-in-out infinite;
}

.message-sent::after,
.message-received::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;

    background:
      radial-gradient(1px 1px at 14% 42%, rgba(255,255,255,0.55) 99%, transparent 100%),
      radial-gradient(1px 1px at 30% 18%, rgba(255,255,255,0.45) 99%, transparent 100%),
      radial-gradient(1px 1px at 56% 40%, rgba(255,255,255,0.42) 99%, transparent 100%),
      radial-gradient(1px 1px at 72% 66%, rgba(255,255,255,0.40) 99%, transparent 100%),
      radial-gradient(1px 1px at 90% 34%, rgba(255,255,255,0.46) 99%, transparent 100%);

    opacity: 0.38;
    animation: starTwinkleDots 5.6s ease-in-out infinite;
}

@keyframes starTwinkleCross {
    0%, 100% { opacity: 0.42; transform: translate3d(0,0,0); }
    35%      { opacity: 0.68; transform: translate3d(0.5px,-0.5px,0); }
    70%      { opacity: 0.50; transform: translate3d(-0.5px,0.5px,0); }
}

@keyframes starTwinkleDots {
    0%, 100% { opacity: 0.28; }
    40%      { opacity: 0.46; }
    75%      { opacity: 0.32; }
}

.message-sent { border-radius: 18px 18px 6px 18px; }
.message-received { border-radius: 18px 18px 18px 6px; }

@media (prefers-reduced-motion: reduce) {
    .message-sent::before, .message-received::before,
    .message-sent::after,  .message-received::after { animation: none; }
}`
},
{
  id:'b87',
  type:'bubble',
  name:'渐变玻璃',
  author:'心恋',
  previews:[
    {t:'sent',v:'唯一的奇迹'},
    {t:'received',v:'就是与你相遇的瞬间'}
  ],
  css:`.message-sent {
  position: relative !important;
  background: linear-gradient(0deg, rgba(250, 250, 250, 0.95) 0%, rgba(140, 140, 140, 0.9) 100%) !important; /* 从上到下，浅→深 */
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px 12px 0 12px !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
  padding: 5px 12px !important;
  margin: 25px 0 3px auto !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #333 !important;
  display: inline-block !important;
  max-width: none !important;
  overflow: visible !important;
  margin-bottom: 18px !important;
  z-index: 1 !important;
}
.message-sent * {
  color: #333 !important;
}

.message-received {
  position: relative !important;
  background: linear-gradient(0deg, rgba(250, 250, 250, 0.95) 0%, rgba(140, 140, 140, 0.9) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px 12px 12px 0 !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
  padding: 5px 12px !important;
  margin: 25px auto 3px 0 !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #333 !important;
  display: inline-block !important;
  max-width: none !important;
  overflow: visible !important;
  margin-bottom: 18px !important;
  z-index: 1 !important;
}
.message-received * {
  color: #333 !important;
}`
},
{
  id:'b88',
  type:'bubble',
  name:'这个气泡好禁欲',
  author:'mio',
  previews:[
    {t:'sent',v:'♡小貓成長日記✧ ♡'},
    {t:'received',v:'干からびた海からの悲鳴'},
    {t:'sent',v:'我們好中二'},
    {t:'received',v:'桀桀桀'}
  ],
  css:`
.message {
  border-radius: 20px !important; 
  box-shadow: none !important;
  padding: 7px 16px !important; 
  position: relative !important;
  overflow: visible !important; 
  line-height: 1.4 !important; 
}

.message.message-received {
  background-color: #F2F2F2 !important; 
  color: #333333 !important; 
}

.message.message-sent {
  background-color: #E5E5E5 !important; 
  color: #333333 !important; 
}

.message::after {
  content: '' !important;
  position: absolute !important;
  width: 20px !important;
  height: 20px !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  z-index: 1 !important;
}

/* 5. 左侧气泡尾巴：位置微调以匹配更窄的气泡 */
.message.message-received::after {
  bottom: 1px !important;   /* 气泡变窄后，尾巴位置稍微下调 1px 看起来更稳 */
  left: -8px !important;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 V20 H0 C10 20 20 15 20 0 Z' fill='%23F2F2F2'/%3E%3C/svg%3E") !important;
}

/* 6. 右侧气泡尾巴：位置微调以匹配更窄的气泡 */
.message.message-sent::after {
  bottom: 1px !important;   /* 气泡变窄后，尾巴位置稍微下调 1px 看起来更稳 */
  right: -8px !important;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 V20 H20 C10 20 0 15 0 0 Z' fill='%23E5E5E5'/%3E%3C/svg%3E") !important;
}`
},
{
  id:'b89',
  type:'bubble',
  name:'静态',
  author:'司七',
  group:'yudi',
  groupLabel:'灰蓝雨滴系列',
  previews:[
    {t:'sent',v:'雪地里相爱，他们说零下已结晶的誓言不会坏'},
    {t:'received',v:'你还是住在我的回忆里不出来'}
  ],
  css:`.message-sent,
.message-received{
  position: relative;
  overflow: visible;

  background:
    radial-gradient(140% 70% at 50% 55%, rgba(120, 170, 230, 0.06), rgba(120, 170, 230, 0.00) 60%),
    linear-gradient(135deg,
      rgba(244, 246, 249, 0.92),
      rgba(226, 231, 239, 0.86)
    ) !important;

  backdrop-filter: blur(10px) saturate(105%);
  -webkit-backdrop-filter: blur(10px) saturate(105%);

  border: 1px solid rgba(30, 41, 59, 0.14) !important;
  border-top: 1px solid rgba(255,255,255,0.58) !important;
  border-left: 1px solid rgba(255,255,255,0.48) !important;

  box-shadow: 0 10px 22px rgba(15,23,42,0.10) !important;
  color: #0f172a !important;
}

.message-sent::after,
.message-received::after{
  content:"";
  position:absolute;
  pointer-events:none;
  z-index:-1;
  bottom: 0%;
  width: 26px; 
  height: 25px; 
  transform: scale(0.7) scaleX(0.95) scaleY(1.18);

  opacity: 0.86;  
  background-repeat:no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 28'>\
<path d='M16 2 C16 2, 26 12, 26 17 C26 23, 21.8 26, 16 26 C10.2 26, 6 23, 6 17 C6 12, 16 2, 16 2 Z' fill='none' stroke='%2389A0BF' stroke-width='1.25' stroke-linejoin='round'/>\
</svg>");
}

.message-received::after{ right: -22px; } 
.message-sent::after{ left: -22px; }

.message-sent::after,
.message-received::after{ margin-bottom: -2px; }
*/`
},
{
  id:'b90',
  type:'bubble',
  name:'动态',
  author:'司七',
  group:'yudi',
  groupLabel:'灰蓝雨滴系列',
  previews:[
    {t:'sent',v:'雪地里相爱，他们说零下已结晶的誓言不会坏'},
    {t:'received',v:'你还是住在我的回忆里不出来'}
  ],
  css:`
.message-sent,
.message-received{
  position: relative;
  overflow: visible;

  background:
    radial-gradient(140% 80% at 50% 60%,
      rgba(90, 130, 190, 0.08),
      rgba(90, 130, 190, 0.00) 65%
    ),
    linear-gradient(135deg,
      rgba(40, 48, 58, 0.28),
      rgba(55, 65, 78, 0.22)
    ) !important;

  backdrop-filter: blur(14px) saturate(110%);
  -webkit-backdrop-filter: blur(14px) saturate(110%);

  border: 1px solid rgba(140, 170, 210, 0.18) !important;
  border-top: 1px solid rgba(255,255,255,0.10) !important;
  border-left: 1px solid rgba(255,255,255,0.06) !important;

  box-shadow:
    0 10px 28px rgba(0,0,0,0.45),
    inset 0 0 18px rgba(120,160,220,0.08);

  color: #e5edf7 !important; 
}
.message-sent::after,
.message-received::after{
  content:"";
  position:absolute;
  pointer-events:none;
  z-index:-1;

  bottom: 12%;    
  width: 26px;
  height: 25px;

  transform: scale(0.7) scaleX(1.05) scaleY(0.95);

  opacity: 0.75;      

  background-repeat:no-repeat;
  background-size: contain;

  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 28'>\
<path d='M16 2 C16 2, 26 12, 26 17 C26 23, 21.8 26, 16 26 C10.2 26, 6 23, 6 17 C6 12, 16 2, 16 2 Z' fill='none' stroke='%236F8FBF' stroke-width='1.2' stroke-linejoin='round'/>\
</svg>");

  animation: dropletFloatBottom 4.6s ease-in-out infinite;
}

.message-received::after{ right: -24px; }
.message-sent::after{ left: -24px; }


@keyframes dropletFloatBottom{
  0%, 100% { bottom: 8%; opacity: 0.78; }
  50%      { bottom: 32%; opacity: 0.60; }
}

@media (prefers-reduced-motion: reduce){
  .message-sent::after, .message-received::after{ animation: none; }
}`
},
{
  id:'b91',
  type:'bubble',
  name:'实心',
  author:'司七',
  group:'yudi',
  groupLabel:'灰蓝雨滴系列',
  previews:[
    {t:'sent',v:'雪地里相爱，他们说零下已结晶的誓言不会坏'},
    {t:'received',v:'你还是住在我的回忆里不出来'}
  ],
  css:`
.message-sent,
.message-received{
  position: relative;
  overflow: visible;

  background:
    radial-gradient(140% 70% at 50% 55%, rgba(120, 170, 230, 0.06), rgba(120, 170, 230, 0.00) 60%),
    linear-gradient(135deg, rgba(244, 246, 249, 0.92), rgba(226, 231, 239, 0.86)) !important;

  backdrop-filter: blur(10px) saturate(105%);
  -webkit-backdrop-filter: blur(10px) saturate(105%);

  border: 1px solid rgba(30, 41, 59, 0.14) !important;
  border-top: 1px solid rgba(255,255,255,0.58) !important;
  border-left: 1px solid rgba(255,255,255,0.48) !important;

  box-shadow: 0 10px 22px rgba(15,23,42,0.10) !important;
  color: #0f172a !important;
}


.message-sent::after,
.message-received::after{
  content:"";
  position:absolute;
  pointer-events:none;
  z-index:-1;

  bottom: 12%;          
  width: 26px;
  height: 25px;
  transform: scale(0.7) scaleX(0.95) scaleY(1.18); 
  opacity: 0.92;  
  background-repeat:no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 28'>\
<defs>\
<linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>\
<stop offset='0%' stop-color='%238AA2BE' stop-opacity='0.95'/>\
<stop offset='100%' stop-color='%23F6FAFF' stop-opacity='0.95'/>\
</linearGradient>\
</defs>\
<path d='M16 2 C16 2, 26 12, 26 17 C26 23, 21.8 26, 16 26 C10.2 26, 6 23, 6 17 C6 12, 16 2, 16 2 Z' fill='url(%23g)'/>\
</svg>");
  filter:
    drop-shadow(0 0 6px rgba(140, 170, 210, 0.20))
    drop-shadow(0 2px 10px rgba(15, 23, 42, 0.10));

  animation: dropletFloatBottom 3.8s ease-in-out infinite;
}

.message-received::after{ right: -22px; }
.message-sent::after{ left: -22px; }

@keyframes dropletFloatBottom{
  0%, 100% { bottom: -5%;  opacity: 0.92; }
  50%      { bottom: 15%; opacity: 0.78; }
}`
},
{
  id:'b92',
  type:'bubble',
  name:'晨雾雪松',
  author:'T',
  group:'tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: #8da399 !important;
    color: #f5f5f0 !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 2px 6px rgba(141, 163, 153, 0.3) !important;
    font-weight: 500 !important;
    letter-spacing: 0.5px !important; 
}

.message-received {
    background-color: #e6e2d3 !important;
    color: #5c544d !important;
    box-shadow: 0 2px 6px rgba(230, 226, 211, 0.5) !important;
}`
},
{
  id:'b93',
  type:'bubble',
  name:'原木手札',
  author:'T',
  group:'tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: #dcbfa6 !important;
    color: #4a3728 !important;
    border: 1.5px dashed #a67c52 !important;
    border-radius: 8px !important;
    box-shadow: none !important;
    padding: 12px 18px !important;
}
.message-received {
    background-color: #f4e8d8 !important;
    border: 1.5px dashed #c4a482 !important;
    color: #5c4a3d !important;
}`
},
{
  id:'b94',
  type:'bubble',
  name:'藤蔓低语',
  author:'T',
  group:'tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: #f0f4f1 !important;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 Q 25 20, 50 40 T 100 40' fill='none' stroke='%23c5d5cb' stroke-width='2'/%3E%3Ccircle cx='25' cy='30' r='3' fill='%23c5d5cb'/%3E%3Ccircle cx='75' cy='35' r='2' fill='%23c5d5cb'/%3E%3C/svg%3E") !important;
    background-position: bottom left !important;
    background-repeat: repeat-x !important;

    color: #3a4a40 !important;

    border-top: 1px solid #d0e0d5 !important;
    border-left: 1px solid #d0e0d5 !important;
    border-radius: 12px !important;

    box-shadow: 2px 2px 8px rgba(0,0,0,0.03) !important;

    padding-bottom: 20px !important;
}`
},
{
  id:'b95',
  type:'bubble',
  name:'暗色微光',
  author:'T',
  group:'Tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: rgba(15, 15, 15, 0.35) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    color: #f0f0f0 !important;
    border: 0.5px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 14px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
    padding: 12px 18px !important;
    letter-spacing: 0.5px !important;
}

.message-received {
    background-color: rgba(30, 30, 30, 0.3) !important;
    border: 0.5px solid rgba(255, 255, 255, 0.08) !important;
}`
},
{
  id:'b96',
  type:'bubble',
  name:'晨间露水',
  author:'T',
  group:'Tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: rgba(255, 255, 255, 0.1) !important;

    color: #2c3e50 !important;

    border-radius: 30px !important;

    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    box-shadow:
        inset 0 8px 10px rgba(255, 255, 255, 0.8),
        inset 0 -4px 6px rgba(255, 255, 255, 0.3),
        inset -4px 0 8px rgba(0, 0, 0, 0.05),
        0 10px 20px rgba(0, 0, 0, 0.15) !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
    padding: 12px 24px !important;
}

.message-received {
    background-color: rgba(240, 248, 255, 0.15) !important; 
    box-shadow:
        inset 0 8px 10px rgba(255, 255, 255, 0.9),
        inset 0 -4px 6px rgba(255, 255, 255, 0.4),
        inset 4px 0 8px rgba(0, 0, 0, 0.05),
        0 10px 20px rgba(0, 0, 0, 0.1) !important;
}`
},
{
  id:'b97',
  type:'bubble',
  name:'不规则水滴',
  author:'T',
  group:'tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: rgba(255, 255, 255, 0.15) !important;
    color: #1a1a1a !important;
    border-radius: 40% 40% 60% 60% / 30% 30% 70% 70% !important;
    border: none !important;

    box-shadow:
        inset 0 15px 15px -5px rgba(255, 255, 255, 0.9),
        inset 0 -10px 20px rgba(0, 0, 0, 0.1),
        0 15px 25px -5px rgba(0, 0, 0, 0.2) !important;

    backdrop-filter: blur(3px) !important;
    -webkit-backdrop-filter: blur(3px) !important;

    padding: 15px 25px 20px 25px !important; 
}

.message-received {
    border-radius: 60% 40% 70% 50% / 50% 30% 80% 60% !important;
}`
},
{
  id:'b98',
  type:'bubble',
  name:'深海流体',
  author:'T',
  group:'tree',
  groupLabel:'森系',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background-color: rgba(10, 15, 20, 0.6) !important;

    color: #e0f7fa !important;
    text-shadow: 0 0 5px rgba(224, 247, 250, 0.5) !important;

    border-radius: 25px !important;

    box-shadow:
        inset 0 6px 12px rgba(150, 200, 255, 0.4),
        inset 0 -6px 15px rgba(0, 0, 0, 0.9),
        0 8px 20px rgba(0, 20, 40, 0.8) !important;

    border-top: 1px solid rgba(150, 200, 255, 0.3) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.8) !important;

    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;

    padding: 12px 22px !important;
}`
},
{
  id:'b99',
  type:'bubble',
  name:'流光溢彩',
  author:'T',
  previews:[
    {t:'sent',v:'你认为下一步是什么？'},
    {t:'received',v:'当然是永远在一起'}
  ],
  css:`.message-sent,
.message-received {
    background: linear-gradient(135deg, #ffd1ff 0%, #fac0e1 100%) !important;
    color: #8a4b69 !important;
    border: none !important;
    border-radius: 30px 30px 30px 10px !important;
    box-shadow: 0 8px 15px rgba(250, 192, 225, 0.4) !important;
    padding: 14px 22px !important;
    font-weight: bold !important;
    letter-spacing: 0.5px !important;
}

.message-received {
    background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%) !important;
    color: #4a558a !important;
    border-radius: 30px 30px 10px 30px !important;
    box-shadow: 0 8px 15px rgba(142, 197, 252, 0.4) !important;
}`
},
{
  id:'b100',
  type:'bubble',
  name:'奇迹小狗',
  author:'二极管',
  previews:[
    {t:'sent',v:'小狗小狗'},
    {t:'received',v:'汪汪汪'}
  ],
  css:`
@keyframes woof-pop {
    0% {
        opacity: 0;
        transform: translate(-10px, 10px) scale(0.5);
    }
    50% {
        transform: translate(0, -5px) scale(1.2);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

.message-sent *:not(::after), .message-received *:not(::after) {
    animation: none !important;
    transition: none !important;
}

.message-sent {
    position: relative !important;
    background-color: #333333 !important;
    
    background-image: 
        url('https://i.postimg.cc/rFn40T3y/wu-biao-ti7-20260221171715.png'), 
        radial-gradient(rgba(255, 255, 255, 0.08) 2px, transparent 2px) !important;
    background-repeat: no-repeat, repeat !important;
    background-position: center right 15px, 0 0 !important;
    background-size: 24px, 12px 12px !important;
    
    border: 2px solid rgba(255, 255, 255, 0.5) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    opacity: 0.9 !important;
    
    border-radius: 20px !important;
    color: #ffffff !important;
    
    padding: 12px 50px 12px 45px !important;
    margin: 15px 10px 10px auto !important; 
    
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2) !important;
    max-width: fit-content !important;
    overflow: visible !important; 
}

.message-sent::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 10px !important;
    transform: translateY(-50%) !important;
    width: 30px !important;
    height: 30px !important;
    background-image: url('https://i.postimg.cc/02WSMvFP/wu-biao-ti7-20260221171618.png') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    z-index: 2 !important;
}

.message-sent::after {
    content: '主人' !important;
    position: absolute !important;
    top: -10px !important;
    right: -5px !important;
    
    background-color: #4a4a4a !important;
    color: #e0e0e0 !important;
    font-size: 10px !important;
    font-weight: bold !important;
    line-height: 1 !important;
    padding: 3px 6px !important;
    
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    border-radius: 4px !important;
    
    transform: rotate(8deg) !important;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.3) !important;
    z-index: 3 !important;
    pointer-events: none !important;
}

.message-received {
    position: relative !important;
    background-color: #FDF6E3 !important;
    
    background-image: 
        url('https://i.postimg.cc/rFn40T3y/wu-biao-ti7-20260221171715.png'),
        radial-gradient(rgba(0, 0, 0, 0.05) 2px, transparent 2px) !important;
    background-repeat: no-repeat, repeat !important;
    background-position: center right 15px, 0 0 !important;
    background-size: 24px, 12px 12px !important;
    
    border: 2px solid #8B5A2B !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    opacity: 0.9 !important;
    
    border-radius: 20px !important;
    color: #5C4033 !important;
    
    padding: 12px 50px 12px 45px !important;
    margin: 15px auto 10px 10px !important; 
    
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
    max-width: fit-content !important;
    overflow: visible !important;
}

.message-received::before {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 10px !important;
    transform: translateY(-50%) scaleX(-1) !important;
    width: 30px !important;
    height: 30px !important;
    background-image: url('https://i.postimg.cc/02WSMvFP/wu-biao-ti7-20260221171618.png') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    z-index: 2 !important;
}

.message-received::after {
    content: '汪' !important;
    position: absolute !important;
    top: -14px !important;
    left: -2px !important;
    
    background-color: #8B5A2B !important;
    color: #fff !important;
    font-size: 11px !important;
    font-weight: bold !important;
    padding: 2px 6px !important;
    border-radius: 8px 8px 8px 0 !important; 
    border: 1px solid #FDF6E3 !important;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.1) !important;
    
    transform-origin: bottom left !important;
    animation: woof-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
    z-index: 3 !important;
}

.message-sent:has(> img:only-child),
.message-received:has(> img:only-child),
.message-sent:has(.red-packet),
.message-received:has(.red-packet) {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 5px !important;
    backdrop-filter: none !important;
    opacity: 1 !important;
}

.message-sent:has(> img:only-child)::before,
.message-sent:has(> img:only-child)::after,
.message-received:has(> img:only-child)::before,
.message-received:has(> img:only-child)::after,
.message-sent:has(.red-packet)::before,
.message-sent:has(.red-packet)::after {
    display: none !important;
}

.message-sent:has(> img:only-child) img,
.message-received:has(> img:only-child) img {
    border-radius: 15px !important;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
}`
},
{
  id:'b101',
  type:'bubble',
  name:'动态版',
  author:'Spring',
  group:'ziwumaomao',
  groupLabel:'紫雾猫猫',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message-received,
.message-sent {
    border: none !important;
    border-radius: 999px !important;
    background: 
        radial-gradient(ellipse 80% 50% at center, #e6e6ff 0%, transparent 50%),
        radial-gradient(ellipse 100% 70% at center, #ffffff 0%, transparent 60%),
        #ffffff !important;
    box-shadow: none !important;
    outline: none !important;
    border-color: transparent !important;
    background-color: transparent !important;
    padding: 6px 16px !important;
    position: relative !important;
    overflow: visible !important;
    color: #4a2c66 !important;
}

.message-received::before,
.message-received::after,
.message-sent::before,
.message-sent::after {
    animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); }
}

.message-received::before {
    content: "" !important;
    position: absolute !important;
    top: -6px !important;
    right: -6px !important;
    width: 18px !important;
    height: 18px !important;
    background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJFppi1tRqxFLIa21_jnwDknfmc2OgACViAAAt7rMVXs5ZGoWCUkxToE.png) !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    pointer-events: none !important;
    z-index: 1 !important;
}

.message-received::after {
    content: "" !important;
    position: absolute !important;
    top: -6px !important;
    left: -6px !important;
    width: 22px !important;
    height: 100% !important;
    background-image:
        url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZM5ppjuC2Hmh00b-oTaWFUWWt4ANTAACoCAAAt7rMVVgFJ37MlYN-ToE.png),
        url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJRppi5x-HrxeGIz-HBFzoIZO0-_1gACWSAAAt7rMVU9L0SZeP67yToE.png) !important;
    background-size: 13px 13px, 16px 14px !important;
    background-position: top left, bottom left !important;
    background-repeat: no-repeat !important;
    pointer-events: none !important;
    z-index: 1 !important;
}

.message-sent::before {
    content: "" !important;
    position: absolute !important;
    top: -6px !important;
    left: -6px !important;
    width: 18px !important;
    height: 18px !important;
    background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJFppi1tRqxFLIa21_jnwDknfmc2OgACViAAAt7rMVXs5ZGoWCUkxToE.png) !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    pointer-events: none !important;
    z-index: 1 !important;
}

.message-sent::after {
    content: "" !important;
    position: absolute !important;
    top: -6px !important;
    right: -6px !important;
    width: 22px !important;
    height: 100% !important;
    background-image:
        url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZM5ppjuC2Hmh00b-oTaWFUWWt4ANTAACoCAAAt7rMVVgFJ37MlYN-ToE.png),
        url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJRppi5x-HrxeGIz-HBFzoIZO0-_1gACWSAAAt7rMVU9L0SZeP67yToE.png) !important;
    background-size: 13px 13px, 16px 14px !important;
    background-position: top right, bottom right !important;
    background-repeat: no-repeat !important;
    pointer-events: none !important;
    z-index: 1 !important;
}`
},
{
  id:'b102',
  type:'bubble',
  name:'静态版',
  author:'Spring',
  group:'ziwumaomao',
  groupLabel:'紫雾猫猫',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message-received,
.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 80% 50% at center, #e6e6ff 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #ffffff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #4a2c66 !important;
}

.message-received::before {
  content: "" !important;
  position: absolute !important;
  top: -6px !important;
  right: -6px !important;
  width: 18px !important;
  height: 18px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJFppi1tRqxFLIa21_jnwDknfmc2OgACViAAAt7rMVXs5ZGoWCUkxToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message-received::after {
  content: "" !important;
  position: absolute !important;
  top: -6px !important;
  left: -6px !important;
  width: 22px !important;
  height: 100% !important;
  background-image:
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZM5ppjuC2Hmh00b-oTaWFUWWt4ANTAACoCAAAt7rMVVgFJ37MlYN-ToE.png),
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJRppi5x-HrxeGIz-HBFzoIZO0-_1gACWSAAAt7rMVU9L0SZeP67yToE.png) !important;
  background-size: 13px 13px, 16px 14px !important;
  background-position: top left, bottom left !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message-sent::before {
  content: "" !important;
  position: absolute !important;
  top: -6px !important;
  left: -6px !important;
  width: 18px !important;
  height: 18px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJFppi1tRqxFLIa21_jnwDknfmc2OgACViAAAt7rMVXs5ZGoWCUkxToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message-sent::after {
  content: "" !important;
  position: absolute !important;
  top: -6px !important;
  right: -6px !important;
  width: 22px !important;
  height: 100% !important;
  background-image:
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZM5ppjuC2Hmh00b-oTaWFUWWt4ANTAACoCAAAt7rMVVgFJ37MlYN-ToE.png),
    url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZJRppi5x-HrxeGIz-HBFzoIZO0-_1gACWSAAAt7rMVU9L0SZeP67yToE.png) !important;
  background-size: 13px 13px, 16px 14px !important;
  background-position: top right, bottom right !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}`
},
{
  id:'b103',
  type:'bubble',
  name:'甜梦团团',
  author:'Spring',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message {
  border-radius: 999px !important;
  padding: 2px 16px !important;
  box-shadow: none !important;
  overflow: visible !important;
  line-height: 1.3 !important;
  background-clip: padding-box !important;
  position: relative !important;
}
.message.message-received {
  background-color: #fff7fc !important;
  color: #333333 !important;
  border: 5px solid #ffffff !important;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.4) !important;
}
.message.message-sent {
  background-color: #ffeef5 !important;
  color: #333333 !important;
  border: 5px solid #ffffff !important;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.45) !important;
}

.message.message-received::after {
  content: '' !important;
  position: absolute !important;
  width: 36px !important;
  height: 36px !important;
  background-image: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZkpppoxUX7xr4ZLIRJxwC3ibwF-PvwACKCIAAt7rOVVsxILJPkKuRDoE.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  top: -20px !important;
  left: -15px !important;
  border: none !important;
  z-index: 1 !important;
}

.message.message-received::before {
  content: '' !important;
  position: absolute !important;
  width: 28px !important;
  height: 28px !important;
  background-image: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZlxppo67DbS983EqcUOTLH1gFv-RvwACOCIAAt7rOVXhctNeBp42ljoE.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  bottom: -20px !important;
  right: -10px !important;
  border: none !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  content: '' !important;
  position: absolute !important;
  width: 36px !important;
  height: 36px !important;
  background-image: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZjBppob1irq8lnp9fXrjvHo_wtXayAACBiIAAt7rOVX3zNP6glfcHjoE.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  top: -20px !important;
  right: -20px !important;
  border: none !important;
  z-index: 1 !important;
}

.message.message-sent::before {
  content: '' !important;
  position: absolute !important;
  width: 28px !important;
  height: 28px !important;
  background-image: url('https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERZlxppo67DbS983EqcUOTLH1gFv-RvwACOCIAAt7rOVXhctNeBp42ljoE.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  bottom: -20px !important;
  left: -10px !important;
  border: none !important;
  z-index: 1 !important;
}`
},
{
  id:'b104',
  type:'bubble',
  name:'淡紫半透明',
  author:'心恋',
  previews:[
    {t:'sent',v:'今年的生日愿望是什么？'},
    {t:'received',v:'下一次回头的时候可以看见你'}
  ],
  css:`.message-sent {
  position: relative !important;
  background: linear-gradient(145deg, rgba(230, 217, 242, 0.7), rgba(220, 204, 230, 0.7)) !important;
  border: 1px solid rgba(203, 184, 217, 0.6) !important;
  border-radius: 8px 8px 2px 8px !important;
  box-shadow: 
    2px 2px 0 rgba(180, 160, 200, 0.25),
    inset 1px 1px 0 rgba(255, 255, 255, 0.4) !important;
  padding: 6px 14px !important;
  margin: 18px 0 3px auto !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
  color: rgba(90, 74, 107, 0.9) !important;
  display: inline-block !important;
  max-width: 260px !important;
  overflow: visible !important;
  margin-bottom: 18px !important;
  z-index: 1 !important;
}
.message-sent * {
  color: rgba(90, 74, 107, 0.9) !important;
}

.message-received {
  position: relative !important;
  background: linear-gradient(145deg, rgba(230, 217, 242, 0.7), rgba(220, 204, 230, 0.7)) !important;
  border: 1px solid rgba(203, 184, 217, 0.6) !important;
  border-radius: 8px 8px 8px 2px !important;
  box-shadow: 
    2px 2px 0 rgba(180, 160, 200, 0.25),
    inset 1px 1px 0 rgba(255, 255, 255, 0.4) !important;
  padding: 6px 14px !important;
  margin: 18px auto 3px 0 !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
  color: rgba(90, 74, 107, 0.9) !important;
  display: inline-block !important;
  max-width: 260px !important;
  overflow: visible !important;
  margin-bottom: 18px !important;
  z-index: 1 !important;
}
.message-received * {
  color: rgba(90, 74, 107, 0.9) !important;
}`
},
{
  id:'b105',
  type:'bubble',
  name:'细线黑白',
  author:'心恋',
  previews:[
    {t:'sent',v:'我们是两个世界的人'},
    {t:'received',v:'但我们拥有同频的爱'}
  ],
  css:`.message-sent {
  position: relative !important;
  background: #fff !important; 
  border: 2px solid #000 !important;
  border-radius: 18px 18px 5px 18px !important; 
  box-shadow: 0 6px 12px rgba(255, 255, 255, 0.8) !important; 
  padding: 5px 12px !important;
  margin: 25px 0 3px auto !important; 
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #000 !important; 
  display: inline-block !important;
  max-width: none !important;
  overflow: visible !important;
  margin-bottom: 25px !important; 
  z-index: 1 !important;
}
.message-sent * {
  color: #000 !important; 
}

.message-sent::after {
  content: '𐙚⊹₊⋆☆' !important; 
  position: absolute !important;
  bottom: -20px !important;
  left: 0 !important;
  font-size: 14px !important; 
  line-height: 1 !important;
  color: #000 !important; 
  background: transparent !important;
  white-space: nowrap !important;
  pointer-events: none !important;
  z-index: 9999 !important;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8) !important; 
}

.message-received {
  position: relative !important;
  background: #fff !important;
  border: 2px solid #000 !important;
  border-radius: 18px 18px 18px 5px !important;
  box-shadow: 0 6px 12px rgba(255, 255, 255, 0.8) !important;
  padding: 5px 12px !important;
  margin: 25px auto 3px 0 !important; 
  font-size: 14px !important;
  line-height: 1.4 !important;
  color: #000 !important;
  display: inline-block !important;
  max-width: none !important;
  overflow: visible !important;
  margin-bottom: 25px !important;
  z-index: 1 !important;
}
.message-received * {
  color: #000 !important;
}

.message-received::after {
  content: '𐙚⊹₊⋆☆' !important; 
  position: absolute !important;
  bottom: -20px !important;
  right: 0 !important;
  font-size: 14px !important;
  line-height: 1 !important;
  color: #000 !important;
  background: transparent !important;
  white-space: nowrap !important;
  pointer-events: none !important;
  z-index: 9999 !important;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8) !important;
}`
},
{
  id:'b106',
  type:'bubble',
  name:'白色',
  author:'Spring',
  group:'huibaihudiejie',
  groupLabel:'灰白蝴蝶结系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #ffffff 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #ffffff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}

.message.message-received::before {
  content: "" !important;
  position: absolute !important;
  top: 0px !important;
  left: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd45pqnsQJX-kyyvD8BV4Z2NYTBBW4QAC9R8AAhk0WVV11OhpWDHgmToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-received::after {
  content: "" !important;
  position: absolute !important;
  bottom: -12px !important;
  right: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd59pqn4i24md5lEyh_xYi5Q9imUeEwACCiAAAhk0WVVQIOx-VeELpToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  content: "" !important;
  position: absolute !important;
  top: 0px !important;
  right: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd45pqnsQJX-kyyvD8BV4Z2NYTBBW4QAC9R8AAhk0WVV11OhpWDHgmToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-sent::before {
  content: "" !important;
  position: absolute !important;
  bottom: -12px !important;
  left: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd59pqn4i24md5lEyh_xYi5Q9imUeEwACCiAAAhk0WVVQIOx-VeELpToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}`
},
{
  id:'b107',
  type:'bubble',
  name:'灰色',
  author:'Spring',
  group:'huibaihudiejie',
  groupLabel:'灰白蝴蝶结系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #d1d5db 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #f3f4f6 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}

.message.message-received::before {
  content: "" !important;
  position: absolute !important;
  top: 0px !important;
  left: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd45pqnsQJX-kyyvD8BV4Z2NYTBBW4QAC9R8AAhk0WVV11OhpWDHgmToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-received::after {
  content: "" !important;
  position: absolute !important;
  bottom: -12px !important;
  right: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd59pqn4i24md5lEyh_xYi5Q9imUeEwACCiAAAhk0WVVQIOx-VeELpToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-sent::after {
  content: "" !important;
  position: absolute !important;
  top: 0px !important;
  right: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd45pqnsQJX-kyyvD8BV4Z2NYTBBW4QAC9R8AAhk0WVV11OhpWDHgmToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.message.message-sent::before {
  content: "" !important;
  position: absolute !important;
  bottom: -12px !important;
  left: -8px !important;
  width: 24px !important;
  height: 24px !important;
  background-image: url(https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAERd59pqn4i24md5lEyh_xYi5Q9imUeEwACCiAAAhk0WVVQIOx-VeELpToE.png) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 1 !important;
}`
},
{
  id:'b108',
  type:'bubble',
  name:'白色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #ffffff 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #ffffff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}

.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b109',
  type:'bubble',
  name:'粉色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #fdd8e5 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #fff0f6 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b110',
  type:'bubble',
  name:'紫色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #e8daf5 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #f5f0ff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b111',
  type:'bubble',
  name:'青绿色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #d8f5e2 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #f0fff6 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b112',
  type:'bubble',
  name:'墨绿色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #8eb8ac 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #e6f2ee 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b113',
  type:'bubble',
  name:'灰色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #d1d5db 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #f3f4f6 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b114',
  type:'bubble',
  name:'浅蓝色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #c6e2ff 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #f0f7ff 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
{
  id:'b115',
  type:'bubble',
  name:'浅黄色腮红',
  author:'Spring',
  group:'saihong',
  groupLabel:'腮红系列',
  previews:[
    {t:'sent',v:'你隐没在梦中'},
    {t:'received',v:'宛如雪化在火中'}
  ],
  css:`.message,
.message.message-received,
.message.message-sent {
  border: none !important;
  border-radius: 999px !important;
  background: 
    radial-gradient(ellipse 85% 50% at center, #fff2b2 0%, transparent 50%),
    radial-gradient(ellipse 100% 70% at center, #fffcf0 0%, transparent 60%),
    #ffffff !important;
  box-shadow: none !important;
  outline: none !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 6px 16px !important;
  position: relative !important;
  overflow: visible !important;
  color: #333 !important;
}
.message.message-received::before,
.message.message-received::after,
.message.message-sent::before,
.message.message-sent::after {
  content: none !important;
  display: none !important;
}`
},
];
const CARDS = [
  {
    id:'card1',
    type:'card',
    name:'系统预设备份',
    author:'milk',
    desc:'包含自定义回复、表情、戳一戳动作、状态和座右铭的完整预设包，可直接导入使用。',
    tags:['回复','表情','戳一戳','状态','格言'],
    fileType:'json',
    fileName:'presets-backup.json',
    file:'https://img.heliar.top/file/1771878331120_presets-backup.json',
    size:'约 18 KB',
    itemCounts:{
      '自定义回复': 250,
      '自定义表情': 63,
      '戳一戳': 20,
      '状态': 96,
      '座右铭': 65
    } 
  },
  {
    id:'card2',
    type:'card',
    name:'小情侣日常向补充包1.0',
    author:'KUM',
    desc:'小情侣日常向，1.0简单型',
    fileType:'json',
    fileName:'qrVun6A9B',
    file:'https://img.heliar.top/file/1772049568884_小情侣日常向万能字卡扩充1.json',
    itemCounts:{
      "自定义回复": 203
    } 
  },
  {
id:'card3',
type:'card',
name:'日常聊天没问题了应该',
author:'袁愿',
desc:'‼️有恋与深空、未定事件簿男主微量台词！',
fileType:'json',
fileName:'字卡.json',
file:'https://img.heliar.top/file/1772219016098_字卡.json',
itemCounts:{
    "字卡":854,
    "状态":90,
    "emoji":108,
}
},
{
  id:'card4',
  type:'card',
  name:'小情侣日常向补充包2.0-颜文字篇',
  author:'KUM',
  desc:'小情侣日常向的颜文字(*¯︶¯*)',
  fileType:'json',
  fileName:'颜文字',
  file:'https://img.heliar.top/file/1772219734347_小情侣的日常2.0__颜文字篇.json',
  itemCounts:{
    "自定义回复": 88
}
},
{
  id:'card5',
  type:'card',
  name:'颜文字',
  author:'捌壹零',
  desc:'很多很多的颜文字，很多样式都加了',
  tags:["颜文字","表情","状态","字卡"],
  fileType:'json',
  fileName:'颜文字',
  file:'https://img.heliar.top/file/1772400241219_捌壹零的颜文字.json',
},
{
  id:'card6',
  type:'card',
  name:'秦彻字卡',
  author:'¿?CRazy',
  desc:'包含一些基础字卡+秦彻语录+我编的',
  tags:["回复"],
  fileType:'json',
  fileName:'秦彻',
  file:'https://img.heliar.top/file/1772348005616_秦彻.json',
},
{
id:'card7',
type:'card',
name:'沈星回字卡库',
author:'金元饱',
desc:'适用于恋与深空-沈星回。基础字卡（有参考Milk老师预设）+角色专属的字卡/顶部格言/开场动画（大多取自游戏文本）。部分内容存在个人角度的微微微量改动，请自行斟酌使用。',
tags:["回复","表情","状态","开场动画"],
fileType:'json',
fileName:'SXH.json',
file:'https://raw.githubusercontent.com/MiraiisFantasea/game/refs/heads/main/SXH-reply-2026-03-03.json',
itemCounts:{
"自定义回复": 449,
"戳一戳": 29,
"状态": 65,
"座右铭": 21,
"开场动画": 40,
"自定义表情": 57
}
},
{
  id:'card8',
  type:'card',
  name:'小日常对话字卡',
  author:'sovp.砚',
  desc:'包含了少量多推字卡，爱称还有很简单，适合梦角回答问题的字卡。遇到不喜欢内容可自行修改',
  tags:["日常","互动","字卡"],
  fileType:'json',
  fileName:'日常字卡',
  file:'https://img.heliar.top/file/1772815194520_日常字卡.json',
},
{
id:'card9',
type:'card',
name:'一些词卡',
author:'1123',
desc:'日常聊天',
tags:["回复"],
fileType:'json',
fileName:'字卡.json',
file:'https://img.heliar.top/file/1772816551108_一些字卡.json',
itemCounts:{
"自定义回复": 200
}
},
{
  id:'card10',
  type:'card',
  name:'小乌梅专属',
  author:'卡，要我一直抽吗？',
  desc:'❗️❗️❗️❗️光与夜之恋黑发绿瞳男专用',
  tags:["回复"],
  fileType:'json',
  fileName:'A的字卡',
  file:'https://img.heliar.top/file/1772815672340_A的字卡.json',
  itemCounts:{
    "自定义回复": 251
}
},
]; 
const ALL = [...BUBBLES, ...FONTS, ...CARDS, ...MUSIC];